// Custom JavaScript for VizeKit HTML Version

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    // Initialize form handlers
    initializeHeroForm();
    initializeConsultationForm();
    
    // Initialize UI components
    initializeAnimations();
    initializeTooltips();
    
    // Set active navigation
    setActiveNavigation();
}

// Hero form handler
function initializeHeroForm() {
    const heroForm = document.getElementById('heroForm');
    if (heroForm) {
        heroForm.addEventListener('submit', handleHeroFormSubmit);
    }
}

async function handleHeroFormSubmit(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const data = {
        action: 'visa_check',
        fromCountry: formData.get('fromCountry'),
        toCountry: formData.get('toCountry'),
        purpose: formData.get('purpose')
    };
    
    // Validate form
    if (!data.toCountry || !data.purpose) {
        showToast('Lütfen tüm alanları doldurun.', 'error');
        return;
    }
    
    // Show loading state
    const submitBtn = e.target.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Kontrol ediliyor...';
    submitBtn.disabled = true;
    
    try {
        const response = await fetch('includes/functions.php', {
            method: 'POST',
            body: new URLSearchParams(data)
        });
        
        const result = await response.json();
        
        // Redirect to results page or show modal
        if (result) {
            sessionStorage.setItem('visaCheckResult', JSON.stringify(result));
            window.location.href = 'visa-result.php';
        }
        
    } catch (error) {
        console.error('Error:', error);
        showToast('Bir hata oluştu. Lütfen tekrar deneyin.', 'error');
    } finally {
        // Reset button
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
    }
}

// Consultation form handler
function initializeConsultationForm() {
    const consultationForm = document.getElementById('consultationForm');
    if (consultationForm) {
        consultationForm.addEventListener('submit', handleConsultationFormSubmit);
    }
}

async function handleConsultationFormSubmit(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const data = {
        action: 'consultation',
        firstName: formData.get('firstName'),
        lastName: formData.get('lastName'),
        email: formData.get('email'),
        phone: formData.get('phone'),
        destinationCountry: formData.get('destinationCountry'),
        message: formData.get('message')
    };
    
    // Validate required fields
    const requiredFields = ['firstName', 'lastName', 'email', 'phone', 'destinationCountry'];
    for (const field of requiredFields) {
        if (!data[field]) {
            showToast('Lütfen tüm gerekli alanları doldurun.', 'error');
            return;
        }
    }
    
    // Validate email
    if (!isValidEmail(data.email)) {
        showToast('Lütfen geçerli bir e-posta adresi girin.', 'error');
        return;
    }
    
    // Show loading state
    const submitBtn = e.target.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Gönderiliyor...';
    submitBtn.disabled = true;
    
    try {
        const response = await fetch('includes/functions.php', {
            method: 'POST',
            body: new URLSearchParams(data)
        });
        
        const result = await response.json();
        
        if (result.success) {
            showToast(result.message, 'success');
            e.target.reset(); // Clear form
        } else {
            showToast(result.message || 'Bir hata oluştu.', 'error');
        }
        
    } catch (error) {
        console.error('Error:', error);
        showToast('Bir hata oluştu. Lütfen tekrar deneyin.', 'error');
    } finally {
        // Reset button
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
    }
}

// Toast notification system
function showToast(message, type = 'info') {
    // Remove existing toasts
    const existingToasts = document.querySelectorAll('.toast');
    existingToasts.forEach(toast => toast.remove());
    
    // Create toast container if it doesn't exist
    let toastContainer = document.querySelector('.toast-container');
    if (!toastContainer) {
        toastContainer = document.createElement('div');
        toastContainer.className = 'toast-container';
        document.body.appendChild(toastContainer);
    }
    
    // Create toast element
    const toast = document.createElement('div');
    toast.className = `toast ${type} show`;
    toast.setAttribute('role', 'alert');
    
    const iconMap = {
        success: 'fas fa-check-circle',
        error: 'fas fa-exclamation-circle',
        warning: 'fas fa-exclamation-triangle',
        info: 'fas fa-info-circle'
    };
    
    toast.innerHTML = `
        <div class="toast-header">
            <i class="${iconMap[type]} me-2"></i>
            <strong class="me-auto">${type === 'success' ? 'Başarılı' : type === 'error' ? 'Hata' : 'Bilgi'}</strong>
            <button type="button" class="btn-close" data-bs-dismiss="toast"></button>
        </div>
        <div class="toast-body">
            ${message}
        </div>
    `;
    
    toastContainer.appendChild(toast);
    
    // Auto hide after 5 seconds
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 300);
    }, 5000);
    
    // Manual close handler
    const closeBtn = toast.querySelector('.btn-close');
    closeBtn.addEventListener('click', () => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 300);
    });
}

// Animations
function initializeAnimations() {
    // Fade in animation for elements
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe elements with animation classes
    const animatedElements = document.querySelectorAll('.card, .service-card, .country-card');
    animatedElements.forEach(el => observer.observe(el));
}

// Initialize Bootstrap tooltips
function initializeTooltips() {
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });
}

// Set active navigation
function setActiveNavigation() {
    const currentPath = window.location.pathname.split('/').pop();
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPath || (currentPath === '' && href === 'index.php')) {
            link.classList.add('active');
        }
    });
}

// Utility functions
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function formatCurrency(amount, currency = 'USD') {
    return new Intl.NumberFormat('tr-TR', {
        style: 'currency',
        currency: currency
    }).format(amount);
}

function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('tr-TR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

// Search functionality
function initializeSearch() {
    const searchInputs = document.querySelectorAll('.search-input');
    
    searchInputs.forEach(input => {
        input.addEventListener('input', function(e) {
            const searchTerm = e.target.value.toLowerCase();
            const searchContainer = e.target.closest('.search-container');
            const targetSelector = searchContainer.dataset.target;
            const items = document.querySelectorAll(targetSelector);
            
            items.forEach(item => {
                const text = item.textContent.toLowerCase();
                if (text.includes(searchTerm)) {
                    item.style.display = '';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
}

// Country filtering
function filterCountries(region) {
    const countryCards = document.querySelectorAll('.country-card');
    
    countryCards.forEach(card => {
        const cardRegion = card.dataset.region;
        if (region === 'all' || cardRegion === region) {
            card.closest('.col-lg-3').style.display = '';
        } else {
            card.closest('.col-lg-3').style.display = 'none';
        }
    });
    
    // Update active filter button
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.filter === region) {
            btn.classList.add('active');
        }
    });
}

// Modal handlers
function openVisaApplicationModal(countryCode, purpose, fee) {
    // This would open a modal for visa application
    // Implementation depends on specific requirements
    console.log('Opening visa application modal', { countryCode, purpose, fee });
}

// Form validation helpers
function validateForm(form) {
    let isValid = true;
    const requiredFields = form.querySelectorAll('[required]');
    
    requiredFields.forEach(field => {
        if (!field.value.trim()) {
            field.classList.add('is-invalid');
            isValid = false;
        } else {
            field.classList.remove('is-invalid');
        }
    });
    
    return isValid;
}

// Loading states
function showLoading(element) {
    element.classList.add('loading');
    element.disabled = true;
}

function hideLoading(element) {
    element.classList.remove('loading');
    element.disabled = false;
}

// Local storage helpers
function saveToLocalStorage(key, data) {
    try {
        localStorage.setItem(key, JSON.stringify(data));
    } catch (error) {
        console.error('Error saving to localStorage:', error);
    }
}

function getFromLocalStorage(key) {
    try {
        const data = localStorage.getItem(key);
        return data ? JSON.parse(data) : null;
    } catch (error) {
        console.error('Error reading from localStorage:', error);
        return null;
    }
}

// Export functions for global use
window.VizeKit = {
    showToast,
    filterCountries,
    openVisaApplicationModal,
    validateForm,
    showLoading,
    hideLoading,
    saveToLocalStorage,
    getFromLocalStorage
};