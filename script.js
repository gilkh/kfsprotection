/**
 * KFS Protection - Main JavaScript
 * Handles dynamic content loading, animations, and interactions
 */

// ============================================
// DOM Elements
// ============================================
const navbar = document.getElementById('navbar');
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');
const servicesGrid = document.getElementById('servicesGrid');
const productsGrid = document.getElementById('productsGrid');
const productsFilter = document.getElementById('productsFilter');
const contactForm = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');

// ============================================
// Data Storage - Embedded for performance
// ============================================
const servicesData = [
    {
        "id": "installation",
        "title": "System Installation",
        "description": "Complete installation of fire protection systems including sprinklers, fire alarms, suppression systems, and emergency lighting for commercial and residential properties.",
        "icon": "🔧",
        "image": "images/service-installation.png",
        "features": [
            "Fire Sprinkler Systems",
            "Fire Alarm Systems",
            "Suppression Systems",
            "Emergency Lighting"
        ]
    },
    {
        "id": "inspection",
        "title": "Fire Safety Inspection",
        "description": "Comprehensive fire safety inspections to ensure your systems meet all local and national fire codes. Our certified inspectors provide detailed reports and recommendations.",
        "icon": "🔍",
        "image": "images/service-inspection.png",
        "features": [
            "Code Compliance Checks",
            "Detailed Reports",
            "Risk Assessment",
            "Certification Documentation"
        ]
    },
    {
        "id": "testing",
        "title": "System Testing",
        "description": "Regular testing of all fire protection equipment to guarantee optimal performance when you need it most. We test alarms, sprinklers, extinguishers, and more.",
        "icon": "✓",
        "image": "images/service-testing.png",
        "features": [
            "Alarm Testing",
            "Sprinkler Testing",
            "Extinguisher Testing",
            "Emergency System Tests"
        ]
    },
    {
        "id": "maintenance",
        "title": "Preventive Maintenance",
        "description": "Scheduled maintenance programs to keep your fire safety systems in peak condition. Prevent costly repairs and ensure continuous protection.",
        "icon": "🛠",
        "image": "images/service-maintenance.png",
        "features": [
            "Scheduled Service Plans",
            "Component Replacement",
            "System Updates",
            "24/7 Support"
        ]
    },
    {
        "id": "consultation",
        "title": "Safety Consultation",
        "description": "Expert consultation services to help you design the perfect fire protection strategy for your building. We assess risks and recommend tailored solutions.",
        "icon": "📋",
        "image": "images/service-consultation.png",
        "features": [
            "Risk Analysis",
            "System Design",
            "Budget Planning",
            "Compliance Guidance"
        ]
    },
    {
        "id": "emergency",
        "title": "Emergency Response",
        "description": "24/7 emergency services for urgent fire safety issues. Our rapid response team is always ready to address critical system failures and repairs.",
        "icon": "🚨",
        "image": "images/service-emergency.png",
        "features": [
            "24/7 Availability",
            "Rapid Response",
            "Emergency Repairs",
            "Priority Service"
        ]
    }
];

const productsData = [
    {
        "id": "ext-abc-5kg",
        "name": "ABC Dry Powder Extinguisher",
        "category": "Fire Extinguishers",
        "description": "Multi-purpose dry chemical fire extinguisher suitable for Class A, B, and C fires. Ideal for offices, homes, and vehicles.",
        "specs": {
            "capacity": "5 kg",
            "rating": "3A:40B:C",
            "range": "4-6 meters",
            "discharge": "15-20 seconds"
        },
        "price": "From $45",
        "image": "images/extinguisher.png",
        "featured": true
    },
    {
        "id": "ext-co2-5kg",
        "name": "CO2 Fire Extinguisher",
        "category": "Fire Extinguishers",
        "description": "Carbon dioxide extinguisher for electrical fires and flammable liquids. Leaves no residue, perfect for server rooms and laboratories.",
        "specs": {
            "capacity": "5 kg",
            "rating": "55B",
            "range": "1-3 meters",
            "discharge": "10-15 seconds"
        },
        "price": "From $85",
        "image": "images/extinguisher.png",
        "featured": true
    },
    {
        "id": "detector-smoke-optical",
        "name": "Optical Smoke Detector",
        "category": "Smoke Detectors",
        "description": "Advanced optical smoke detector with LED indicator and low battery warning. Suitable for bedrooms, living areas, and corridors.",
        "specs": {
            "power": "9V Battery / 240V Mains",
            "coverage": "Up to 60m²",
            "sensitivity": "EN 14604 Compliant",
            "alarm": "85dB at 3m"
        },
        "price": "From $25",
        "image": "images/smoke-detector.png",
        "featured": true
    },
    {
        "id": "detector-heat",
        "name": "Heat Detector",
        "category": "Smoke Detectors",
        "description": "Fixed temperature heat detector ideal for kitchens and garages where smoke detectors may cause false alarms.",
        "specs": {
            "trigger": "57°C Fixed Temperature",
            "coverage": "Up to 50m²",
            "certification": "EN 54-5",
            "alarm": "85dB at 3m"
        },
        "price": "From $35",
        "image": "images/smoke-detector.png",
        "featured": false
    },
    {
        "id": "alarm-panel-4zone",
        "name": "4-Zone Fire Alarm Panel",
        "category": "Alarm Panels",
        "description": "Conventional 4-zone fire alarm control panel with battery backup. Perfect for small to medium commercial buildings.",
        "specs": {
            "zones": "4 Zones",
            "backup": "24hr Battery Backup",
            "outputs": "2 Sounder Circuits",
            "certification": "EN 54-2/4"
        },
        "price": "From $320",
        "image": "images/alarm-panel.png",
        "featured": true
    },
    {
        "id": "alarm-panel-8zone",
        "name": "8-Zone Fire Alarm Panel",
        "category": "Alarm Panels",
        "description": "Expandable 8-zone fire alarm control panel with advanced features including event logging and network connectivity.",
        "specs": {
            "zones": "8 Zones (Expandable)",
            "backup": "72hr Battery Backup",
            "outputs": "4 Sounder Circuits",
            "certification": "EN 54-2/4"
        },
        "price": "From $580",
        "image": "images/alarm-panel.png",
        "featured": false
    },
    {
        "id": "hose-reel-25m",
        "name": "Fire Hose Reel - 25m",
        "category": "Fire Hoses",
        "description": "Wall-mounted fire hose reel with 25 meters of 19mm hose. Manual or automatic swing arm options available.",
        "specs": {
            "length": "25 meters",
            "diameter": "19mm",
            "pressure": "12 Bar Max",
            "nozzle": "Adjustable Spray/Jet"
        },
        "price": "From $180",
        "image": "images/hose-reel.png",
        "featured": true
    },
    {
        "id": "hose-cabinet",
        "name": "Fire Hose Cabinet",
        "category": "Fire Hoses",
        "description": "Steel fire hose cabinet with safety glass door. Can accommodate hose reel and extinguisher.",
        "specs": {
            "material": "Powder Coated Steel",
            "size": "600x800x250mm",
            "door": "Safety Glass with Break Rod",
            "finish": "Red RAL 3000"
        },
        "price": "From $95",
        "image": "images/hose-reel.png",
        "featured": false
    },
    {
        "id": "emergency-light-led",
        "name": "LED Emergency Light",
        "category": "Emergency Lighting",
        "description": "High-output LED emergency light with 3-hour battery backup. Self-testing function with LED status indicator.",
        "specs": {
            "lumens": "400 lm",
            "battery": "3hr Lithium Backup",
            "testing": "Auto Self-Test",
            "certification": "EN 60598-2-22"
        },
        "price": "From $65",
        "image": "images/emergency-light.png",
        "featured": true
    },
    {
        "id": "exit-sign-led",
        "name": "Illuminated Exit Sign",
        "category": "Emergency Lighting",
        "description": "LED illuminated exit sign with emergency battery backup. Surface or recessed mounting options.",
        "specs": {
            "type": "LED Illuminated",
            "battery": "3hr Backup",
            "mounting": "Surface/Recessed",
            "visibility": "Up to 30m"
        },
        "price": "From $45",
        "image": "images/emergency-light.png",
        "featured": false
    },
    {
        "id": "sprinkler-head-pendent",
        "name": "Pendent Sprinkler Head",
        "category": "Sprinkler Systems",
        "description": "Standard response pendent sprinkler head for commercial and residential fire suppression systems.",
        "specs": {
            "response": "Standard Response",
            "temperature": "68°C (155°F)",
            "kFactor": "K5.6",
            "finish": "Chrome/White/Brass"
        },
        "price": "From $12",
        "image": "images/sprinkler.png",
        "featured": false
    },
    {
        "id": "fire-blanket-1m",
        "name": "Fire Blanket 1m x 1m",
        "category": "Fire Safety Equipment",
        "description": "Woven glass fiber fire blanket for smothering small fires. Essential for kitchens and workshops.",
        "specs": {
            "size": "1m x 1m",
            "material": "Woven Glass Fiber",
            "temperature": "Up to 550°C",
            "case": "Wall Mount PVC Case"
        },
        "price": "From $22",
        "image": "images/extinguisher.png",
        "featured": false
    }
];

// ============================================
// Optimized Image Helper
// ============================================
/**
 * Converts an image path to use optimized web versions
 * @param {string} imagePath - Original image path like 'images/hero.png'
 * @returns {object} Object with webp and png paths for optimized versions
 */
function getOptimizedImagePaths(imagePath) {
    if (!imagePath || !imagePath.startsWith('images/')) {
        return { webp: imagePath, png: imagePath, original: imagePath };
    }

    // Extract filename without extension
    const match = imagePath.match(/images\/(.+)\.(png|jpg|jpeg)$/i);
    if (!match) {
        return { webp: imagePath, png: imagePath, original: imagePath };
    }

    const baseName = match[1];
    return {
        webp: `images/web/${baseName}.webp`,
        png: `images/web/${baseName}.png`,
        original: imagePath
    };
}

/**
 * Creates a <picture> element HTML for optimized images with fallbacks
 * @param {string} imagePath - Original image path
 * @param {string} alt - Alt text for the image
 * @param {string} className - Optional CSS class for the img element
 * @returns {string} HTML string for picture element
 */
function createOptimizedImage(imagePath, alt, className = '') {
    const paths = getOptimizedImagePaths(imagePath);
    const classAttr = className ? `class="${className}"` : '';

    return `
        <picture>
            <source srcset="${paths.webp}" type="image/webp">
            <source srcset="${paths.png}" type="image/png">
            <img src="${paths.png}" alt="${alt}" loading="lazy" ${classAttr} onload="this.classList.add('loaded')">
        </picture>
    `;
}

// ============================================
// Initialize Application
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    initScrollEffects();
    initAnimations();
    loadServices();
    loadProducts();
    initContactForm();
});

// ============================================
// Navigation
// ============================================
function initNavigation() {
    // Mobile menu toggle
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('open');
    });

    // Close menu when clicking a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('open');
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!navMenu.contains(e.target) && !navToggle.contains(e.target)) {
            navMenu.classList.remove('open');
        }
    });

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offset = 80; // Navbar height
                const position = target.getBoundingClientRect().top + window.scrollY - offset;
                window.scrollTo({
                    top: position,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ============================================
// Scroll Effects
// ============================================
function initScrollEffects() {
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.scrollY;

        // Navbar background on scroll
        if (currentScroll > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Active nav link based on section
        updateActiveNavLink();

        lastScroll = currentScroll;
    });
}

function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const scrollPosition = window.scrollY + 100;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            document.querySelectorAll('.nav-link').forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

// ============================================
// Scroll Animations
// ============================================
function initAnimations() {
    const animatedElements = document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right, .scale-in, .stagger-children');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    animatedElements.forEach(el => observer.observe(el));
}

// ============================================
// Load Services Data
// ============================================
// ============================================
// Load Services Data
// ============================================
// Data is now embedded for performance
function loadServices() {
    renderServices();
}

function renderServices() {
    servicesGrid.innerHTML = servicesData.map(service => `
        <div class="service-card">
            <div class="service-image">
                ${createOptimizedImage(service.image || 'images/logo.png', service.title)}
            </div>
            <div class="service-content">
                <div class="service-icon">${service.icon}</div>
                <h3>${service.title}</h3>
                <p>${service.description}</p>
                <div class="service-features">
                    ${service.features.map(feature => `
                        <span class="service-feature">${feature}</span>
                    `).join('')}
                </div>
            </div>
        </div>
    `).join('');

    // Re-initialize animations for new elements
    initAnimations();
}

function renderServicesPlaceholder() {
    const placeholderServices = [
        { icon: '🔧', title: 'System Installation', description: 'Complete installation of fire protection systems including sprinklers, alarms, and emergency lighting.', features: ['Fire Sprinklers', 'Fire Alarms', 'Suppression Systems'] },
        { icon: '🔍', title: 'Fire Safety Inspection', description: 'Comprehensive inspections to ensure your systems meet all fire codes and safety standards.', features: ['Code Compliance', 'Detailed Reports', 'Risk Assessment'] },
        { icon: '✓', title: 'System Testing', description: 'Regular testing of all fire protection equipment to ensure optimal performance.', features: ['Alarm Testing', 'Sprinkler Testing', 'Extinguisher Testing'] },
        { icon: '🛠', title: 'Preventive Maintenance', description: 'Scheduled maintenance programs to keep your fire safety systems in peak condition.', features: ['Scheduled Service', 'Component Replacement', '24/7 Support'] },
        { icon: '📋', title: 'Safety Consultation', description: 'Expert consultation to help you design the perfect fire protection strategy.', features: ['Risk Analysis', 'System Design', 'Compliance Guidance'] },
        { icon: '🚨', title: 'Emergency Response', description: '24/7 emergency services for urgent fire safety issues and system failures.', features: ['24/7 Availability', 'Rapid Response', 'Emergency Repairs'] }
    ];

    servicesData = placeholderServices;
    renderServices();
}

// ============================================
// Load Products Data
// ============================================
// ============================================
// Load Products Data
// ============================================
// Data is now embedded for performance
function loadProducts() {
    renderProducts('all');
    initProductFilters();
}

function initProductFilters() {
    const filterButtons = productsFilter.querySelectorAll('.filter-btn');

    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active state
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            // Filter products
            const filter = btn.dataset.filter;
            renderProducts(filter);
        });
    });
}

function renderProducts(filter = 'all') {
    const filteredProducts = filter === 'all'
        ? productsData
        : productsData.filter(p => p.category === filter);

    productsGrid.innerHTML = filteredProducts.map(product => `
        <div class="product-card" data-category="${product.category}">
            <div class="product-image">
                ${product.featured ? '<span class="product-badge">Featured</span>' : ''}
                ${product.image && product.image.startsWith('images/')
            ? createOptimizedImage(product.image, product.name)
            : `<div class="product-image-placeholder">${getProductIcon(product.category)}</div>`
        }
            </div>
            <div class="product-content">
                <div class="product-category">${product.category}</div>
                <h4>${product.name}</h4>
                <p>${product.description}</p>
                <div class="product-specs">
                    ${Object.entries(product.specs).map(([key, value]) => `
                        <div class="product-spec">
                            <div class="product-spec-label">${formatSpecLabel(key)}</div>
                            <div class="product-spec-value">${value}</div>
                        </div>
                    `).join('')}
                </div>
                <div class="product-footer">
                    <div class="product-price">${product.price}</div>
                    <a href="#contact" class="product-action">Inquire</a>
                </div>
            </div>
        </div>
    `).join('');

    // Re-initialize animations
    initAnimations();
}

function getProductIcon(category) {
    const icons = {
        'Fire Extinguishers': '🧯',
        'Smoke Detectors': '🔔',
        'Alarm Panels': '📟',
        'Fire Hoses': '💧',
        'Emergency Lighting': '💡',
        'Sprinkler Systems': '💦',
        'Fire Safety Equipment': '🔥'
    };
    return icons[category] || '🔥';
}

function formatSpecLabel(key) {
    return key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
}

function renderProductsPlaceholder() {
    const placeholderProducts = [
        { id: 'ext1', name: 'ABC Dry Powder Extinguisher', category: 'Fire Extinguishers', description: 'Multi-purpose fire extinguisher for Class A, B, and C fires.', specs: { capacity: '5 kg', rating: '3A:40B:C' }, price: 'From $45', featured: true },
        { id: 'det1', name: 'Optical Smoke Detector', category: 'Smoke Detectors', description: 'Advanced smoke detector with LED indicator.', specs: { power: '9V Battery', coverage: 'Up to 60m²' }, price: 'From $25', featured: true },
        { id: 'pan1', name: '4-Zone Fire Alarm Panel', category: 'Alarm Panels', description: 'Conventional fire alarm control panel with battery backup.', specs: { zones: '4 Zones', backup: '24hr Battery' }, price: 'From $320', featured: true }
    ];

    productsData = placeholderProducts;
    renderProducts('all');
    initProductFilters();
}

// ============================================
// Contact Form
// ============================================
function initContactForm() {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData.entries());

        // Validate form
        if (!validateForm(data)) {
            showFormMessage('Please fill in all required fields.', 'error');
            return;
        }

        // Simulate form submission
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;

        try {
            // Send to backend
            await saveFormSubmission(data);

            showFormMessage('Thank you! We\'ll get back to you within 24 hours.', 'success');
            contactForm.reset();
        } catch (error) {
            showFormMessage('Something went wrong. Please try again.', 'error');
        } finally {
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }
    });
}

function validateForm(data) {
    const required = ['firstName', 'lastName', 'email', 'phone', 'message'];
    return required.every(field => data[field] && data[field].trim() !== '');
}

function showFormMessage(message, type) {
    formMessage.textContent = message;
    formMessage.className = `form-message ${type}`;

    // Auto-hide after 5 seconds
    setTimeout(() => {
        formMessage.className = 'form-message';
    }, 5000);
}

async function saveFormSubmission(data) {
    const response = await fetch('/api/requests', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });

    if (!response.ok) {
        throw new Error('Failed to submit form');
    }
}

// ============================================
// Utility Functions
// ============================================
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// ============================================
// Export for Admin (if needed)
// ============================================
window.KFSProtection = {
    getServices: () => servicesData,
    getProducts: () => productsData,
    getSubmissions: () => JSON.parse(localStorage.getItem('kfs_submissions') || '[]')
};
