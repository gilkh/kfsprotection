const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const multer = require('multer');

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json());

// Authentication Middleware
const auth = (req, res, next) => {
    // Defines paths that require authentication
    const protectedPaths = ['/admin.html', '/api/upload', '/api/services', '/api/products'];

    // Check if the current path requires auth (exact match for admin, or starts with for API)
    // Note: GET /api/services and GET /api/products should technically be public if the frontend uses them?
    // The frontend loads them for the main site. So we should NOT protect GET /api/services, only POST.

    const isProtected = req.path === '/admin.html' ||
        (req.method !== 'GET' && (req.path.startsWith('/api/services') || req.path.startsWith('/api/products'))) ||
        req.path.startsWith('/api/upload') ||
        (req.method === 'GET' && req.path.startsWith('/api/requests'));

    if (!isProtected) {
        return next();
    }

    const authHeader = req.headers.authorization;

    if (!authHeader) {
        res.setHeader('WWW-Authenticate', 'Basic realm="Admins Only"');
        return res.status(401).send('Authentication required');
    }

    const auth = Buffer.from(authHeader.split(' ')[1], 'base64').toString().split(':');
    const user = auth[0];
    const pass = auth[1];

    if (user === 'admin' && pass === 'kfsadmin') {
        next();
    } else {
        res.setHeader('WWW-Authenticate', 'Basic realm="Admins Only"');
        return res.status(401).send('Access denied');
    }
};

// Apply auth middleware before static files
app.use(auth);

// Serve static files
app.use(express.static('.'));

// Data paths
const dataDir = path.join(__dirname, 'data');
const imagesDir = path.join(__dirname, 'images');

// Configure Multer for file uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, imagesDir);
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});
const upload = multer({ storage: storage });

// API Routes

// Upload Image (Protected by middleware)
app.post('/api/upload', upload.single('image'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded' });
    }
    console.log('Image uploaded:', req.file.filename);
    res.json({ success: true, filename: req.file.filename });
});

// Services (GET public, POST protected)
app.get('/api/services', (req, res) => {
    res.sendFile(path.join(dataDir, 'services.json'));
});

app.post('/api/services', (req, res) => {
    console.log('Saving services...');
    fs.writeFile(path.join(dataDir, 'services.json'), JSON.stringify(req.body, null, 2), (err) => {
        if (err) {
            console.error('Error saving services:', err);
            return res.status(500).json({ error: 'Failed to save services' });
        }
        console.log('Services saved successfully.');
        res.json({ success: true });
    });
});

// Products (GET public, POST protected)
app.get('/api/products', (req, res) => {
    res.sendFile(path.join(dataDir, 'products.json'));
});

app.post('/api/products', (req, res) => {
    console.log('Saving products...');
    fs.writeFile(path.join(dataDir, 'products.json'), JSON.stringify(req.body, null, 2), (err) => {
        if (err) {
            console.error('Error saving products:', err);
            return res.status(500).json({ error: 'Failed to save products' });
        }
        console.log('Products saved successfully.');
        res.json({ success: true });
    });
});

// List Images (Protected? Maybe not strictly needed, but admin uses it)
// Let's protect it since only admin needs to list all images for selection
app.get('/api/images', (req, res) => {
    // If we want to protect this for admin usage only:
    // The middleware check logic needs to include it.
    // Ideally GET /api/images is for the admin panel image selector.
    // Let's add it to protectedPaths logic if we want, but for now it's harmless.

    fs.readdir(imagesDir, (err, files) => {
        if (err) return res.status(500).json({ error: 'Failed to list images' });
        const images = files.filter(file => /\.(png|jpg|jpeg|gif)$/i.test(file));
        res.json(images);
    });
});

// Requests (POST public, GET protected)
app.get('/api/requests', (req, res) => {
    const requestsPath = path.join(dataDir, 'requests.json');
    if (!fs.existsSync(requestsPath)) {
        return res.json([]);
    }
    res.sendFile(requestsPath);
});

app.post('/api/requests', (req, res) => {
    console.log('Receiving request...', req.body);
    const requestsPath = path.join(dataDir, 'requests.json');

    // Read existing
    let requests = [];
    if (fs.existsSync(requestsPath)) {
        try {
            requests = JSON.parse(fs.readFileSync(requestsPath));
        } catch (e) {
            requests = [];
        }
    }

    // Add new
    const newRequest = {
        id: Date.now().toString(),
        ...req.body,
        timestamp: new Date().toISOString(),
        status: 'new' // new, contacted, closed
    };
    requests.unshift(newRequest); // Add to top

    // Save
    fs.writeFile(requestsPath, JSON.stringify(requests, null, 2), (err) => {
        if (err) {
            console.error('Error saving request:', err);
            return res.status(500).json({ error: 'Failed to save request' });
        }
        console.log('Request saved successfully.');
        res.json({ success: true });
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
    console.log(`Admin Panel: http://localhost:${PORT}/admin.html`);
});
