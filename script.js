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
// Data Storage
// ============================================
let servicesData = [];
let productsData = [];

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
async function loadServices() {
    try {
        const response = await fetch('data/services.json');
        servicesData = await response.json();
        renderServices();
    } catch (error) {
        console.error('Error loading services:', error);
        renderServicesPlaceholder();
    }
}

function renderServices() {
    servicesGrid.innerHTML = servicesData.map(service => `
        <div class="service-card">
            <div class="service-image">
                <img src="${service.image || 'images/logo.png'}" alt="${service.title}" loading="lazy">
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
async function loadProducts() {
    try {
        const response = await fetch('data/products.json');
        productsData = await response.json();
        renderProducts('all');
        initProductFilters();
    } catch (error) {
        console.error('Error loading products:', error);
        renderProductsPlaceholder();
    }
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
            ? `<img src="${product.image}" alt="${product.name}" loading="lazy">`
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
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1500));

            // Store submission locally (for demo purposes)
            saveFormSubmission(data);

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

function saveFormSubmission(data) {
    // Store submissions in localStorage for demo
    const submissions = JSON.parse(localStorage.getItem('kfs_submissions') || '[]');
    submissions.push({
        ...data,
        timestamp: new Date().toISOString()
    });
    localStorage.setItem('kfs_submissions', JSON.stringify(submissions));
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
