// TomFit Coaching - JavaScript Application

// DOM Elements
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('.section');
const ctaButtons = document.querySelectorAll('.cta-button');
const cookieBanner = document.getElementById('cookie-banner');
const contactForm = document.getElementById('contact-form');
const reviewForm = document.getElementById('review-form');
const starRating = document.getElementById('star-rating');
const reviewsList = document.getElementById('reviews-list');

// App State
let currentSection = 'accueil';
let currentRating = 0;
let lightboxIndex = 0;

// Gallery data for lightbox
const galleryItems = [
    { title: 'Espace cardio', description: 'Équipements professionnels pour le travail cardiovasculaire' },
    { title: 'Zone musculation', description: 'Salle équipée pour le renforcement musculaire' },
    { title: 'Entraînement fonctionnel', description: 'Exercices avec le poids du corps' },
    { title: 'Séance duo', description: 'Entraînement à deux pour plus de motivation' },
    { title: 'Coaching extérieur', description: 'Séances en plein air selon la météo' },
    { title: 'Rééducation', description: 'Reprise progressive après blessure' }
];

// Initial testimonials data
const initialReviews = [
    { name: 'Sophie M.', rating: 5, comment: 'Excellent coach ! J\'ai perdu 8kg en 3 mois avec un suivi personnalisé.' },
    { name: 'Marc L.', rating: 5, comment: 'Très professionnel, m\'a aidé à reprendre le sport après une blessure.' },
    { name: 'Julie K.', rating: 5, comment: 'Les séances duo avec mon mari sont parfaites, on progresse ensemble !' }
];

// Profanity filter (basic)
const profanityWords = ['merde', 'putain', 'con', 'connard', 'salaud', 'crétin', 'imbécile'];

// Initialize app
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, initializing app...');
    
    initializeNavigation();
    initializeCookieBanner();
    initializeContactForm();
    initializeReviewSystem();
    initializeStarRating();
    loadReviews();
    
    // Update page title and meta description based on current section
    updatePageMeta();
    
    // Show cookie banner if no preference is set
    if (!getCookieConsent()) {
        showCookieBanner();
    }
    
    // Initialize with home section
    navigateToSection('accueil', false);
});

// Navigation Functions
function initializeNavigation() {
    console.log('Initializing navigation...');
    
    // Mobile menu toggle
    if (navToggle) {
        navToggle.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('Nav toggle clicked');
            const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
            navToggle.setAttribute('aria-expanded', !isExpanded);
            navToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }
    
    // Navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const sectionId = this.getAttribute('data-section');
            console.log('Nav link clicked:', sectionId);
            if (sectionId) {
                navigateToSection(sectionId);
                closeMobileMenu();
            }
        });
    });
    
    // CTA buttons
    ctaButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const sectionId = this.getAttribute('data-section');
            console.log('CTA button clicked:', sectionId);
            if (sectionId) {
                navigateToSection(sectionId);
                closeMobileMenu();
            }
        });
    });
    
    // Handle browser back/forward
    window.addEventListener('popstate', function(e) {
        if (e.state && e.state.section) {
            navigateToSection(e.state.section, false);
        }
    });
}

function navigateToSection(sectionId, pushState = true) {
    console.log('Navigating to section:', sectionId);
    
    // Hide all sections
    sections.forEach(section => {
        section.classList.remove('section--active');
        section.style.display = 'none';
    });
    
    // Show target section
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.classList.add('section--active');
        targetSection.style.display = 'block';
        currentSection = sectionId;
        
        console.log('Section activated:', sectionId);
        
        // Update navigation
        updateActiveNavLink(sectionId);
        
        // Update URL
        if (pushState) {
            const url = sectionId === 'accueil' ? '/' : `#${sectionId}`;
            history.pushState({section: sectionId}, '', url);
        }
        
        // Update page meta
        updatePageMeta();
        
        // Scroll to top
        window.scrollTo(0, 0);
    } else {
        console.error('Section not found:', sectionId);
    }
}

function updateActiveNavLink(sectionId) {
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('data-section') === sectionId) {
            link.classList.add('active');
        }
    });
}

function closeMobileMenu() {
    if (navToggle) {
        navToggle.setAttribute('aria-expanded', 'false');
        navToggle.classList.remove('active');
        navMenu.classList.remove('active');
    }
}

function updatePageMeta() {
    const titles = {
        'accueil': 'TomFit Coaching - Coach Sportif Personnalisé | Cardio, Musculation, Remise en Forme',
        'seances-tarifs': 'Séances & Tarifs - TomFit Coaching | Coaching Sportif Personnalisé',
        'galerie': 'Galerie - TomFit Coaching | Photos et Vidéos d\'Entraînement',
        'avis': 'Avis Clients - TomFit Coaching | Témoignages de Clients Satisfaits',
        'contact': 'Contact - TomFit Coaching | Réserver une Séance de Coaching',
        'mentions-legales': 'Mentions Légales - TomFit Coaching',
        'politique-confidentialite': 'Politique de Confidentialité - TomFit Coaching'
    };
    
    const descriptions = {
        'accueil': 'Coaching sportif personnalisé pour progresser vite et en sécurité: cardio, poids du corps & bodybuilding, remise en forme et rééducation.',
        'seances-tarifs': 'Découvrez nos tarifs de coaching sportif personnalisé. Formules individuelles et duo adaptées à vos besoins et votre budget.',
        'galerie': 'Découvrez nos espaces d\'entraînement et nos méthodes de coaching à travers notre galerie photos et vidéos.',
        'avis': 'Lisez les témoignages de nos clients satisfaits et partagez votre expérience avec TomFit Coaching.',
        'contact': 'Contactez TomFit Coaching pour réserver votre séance de coaching sportif personnalisé. Réponse sous 24-48h.',
        'mentions-legales': 'Mentions légales du site TomFit Coaching - Informations légales et conditions d\'utilisation.',
        'politique-confidentialite': 'Politique de confidentialité de TomFit Coaching - Protection de vos données personnelles.'
    };
    
    if (titles[currentSection]) {
        document.title = titles[currentSection];
    }
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription && descriptions[currentSection]) {
        metaDescription.setAttribute('content', descriptions[currentSection]);
    }
}

// Cookie Functions
function initializeCookieBanner() {
    // Set up cookie banner buttons if they exist
    window.acceptCookies = function() {
        setCookieConsent('accepted');
        hideCookieBanner();
    };
    
    window.refuseCookies = function() {
        setCookieConsent('refused');
        hideCookieBanner();
    };
    
    window.customizeCookies = function() {
        setCookieConsent('accepted');
        hideCookieBanner();
        alert('Préférences de cookies sauvegardées');
    };
    
    window.showCookieSettings = function() {
        showCookieBanner();
    };
}

function getCookieConsent() {
    // Since localStorage is not available, return null to always show banner
    return null;
}

function setCookieConsent(value) {
    // Since localStorage is not available, we'll just log the consent
    console.log('Cookie consent:', value);
}

function showCookieBanner() {
    if (cookieBanner) {
        cookieBanner.classList.remove('hidden');
    }
}

function hideCookieBanner() {
    if (cookieBanner) {
        cookieBanner.classList.add('hidden');
    }
}

// Contact Form Functions
function initializeContactForm() {
    if (contactForm) {
        console.log('Contact form found, adding event listeners');
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            console.log('Contact form submitted');
            handleContactFormSubmit();
        });
        
        // Fix for dropdown
        const goalSelect = document.getElementById('contact-goal');
        if (goalSelect) {
            goalSelect.addEventListener('click', function() {
                console.log('Goal select clicked');
            });
        }
    }
}

function handleContactFormSubmit() {
    console.log('Handling contact form submit');
    
    const formData = {
        name: document.getElementById('contact-name')?.value || '',
        email: document.getElementById('contact-email')?.value || '',
        phone: document.getElementById('contact-phone')?.value || '',
        goal: document.getElementById('contact-goal')?.value || '',
        message: document.getElementById('contact-message')?.value || '',
        consent: document.getElementById('contact-consent')?.checked || false
    };
    
    console.log('Form data:', formData);
    
    // Validate form
    if (!validateContactForm(formData)) {
        return;
    }
    
    // Hide any existing messages
    hideContactMessages();
    
    // Show loading state
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    if (submitBtn) {
        submitBtn.textContent = 'Envoi en cours...';
        submitBtn.disabled = true;
    }
    
    // Simulate form submission
    setTimeout(() => {
        console.log('Contact form processing complete');
        
        // Reset button
        if (submitBtn) {
            submitBtn.textContent = 'Envoyer ma demande';
            submitBtn.disabled = false;
        }
        
        // Show success message
        showContactSuccess();
        
        // Reset form
        contactForm.reset();
    }, 1000);
}

function validateContactForm(data) {
    const errors = [];
    
    if (!data.name.trim()) {
        errors.push('Le nom est requis');
    }
    
    if (!data.email.trim() || !isValidEmail(data.email)) {
        errors.push('Un email valide est requis');
    }
    
    if (!data.phone.trim()) {
        errors.push('Le téléphone est requis');
    }
    
    if (!data.goal) {
        errors.push('Veuillez sélectionner un objectif');
    }
    
    if (!data.consent) {
        errors.push('Vous devez accepter la politique de confidentialité');
    }
    
    if (errors.length > 0) {
        alert('Erreurs dans le formulaire:\n' + errors.join('\n'));
        return false;
    }
    
    return true;
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showContactSuccess() {
    const successElement = document.getElementById('contact-success');
    if (successElement) {
        successElement.classList.remove('hidden');
        successElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
}

function showContactError() {
    const errorElement = document.getElementById('contact-error');
    if (errorElement) {
        errorElement.classList.remove('hidden');
    }
}

function hideContactMessages() {
    const successElement = document.getElementById('contact-success');
    const errorElement = document.getElementById('contact-error');
    
    if (successElement) {
        successElement.classList.add('hidden');
    }
    if (errorElement) {
        errorElement.classList.add('hidden');
    }
}

// Review System Functions
function initializeReviewSystem() {
    if (reviewForm) {
        console.log('Review form found');
        reviewForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleReviewSubmit();
        });
    }
}

function initializeStarRating() {
    if (starRating) {
        console.log('Star rating found');
        const stars = starRating.querySelectorAll('.star');
        
        stars.forEach((star, index) => {
            star.addEventListener('click', function(e) {
                e.preventDefault();
                currentRating = index + 1;
                updateStarRating(currentRating);
                document.getElementById('rating-value').value = currentRating;
                console.log('Rating selected:', currentRating);
            });
            
            star.addEventListener('mouseover', function() {
                updateStarRating(index + 1);
            });
        });
        
        starRating.addEventListener('mouseleave', function() {
            updateStarRating(currentRating);
        });
    }
}

function updateStarRating(rating) {
    if (!starRating) return;
    
    const stars = starRating.querySelectorAll('.star');
    stars.forEach((star, index) => {
        if (index < rating) {
            star.classList.add('active');
        } else {
            star.classList.remove('active');
        }
    });
}

function handleReviewSubmit() {
    console.log('Handling review submit');
    
    const reviewData = {
        name: document.getElementById('review-name')?.value || '',
        rating: parseInt(document.getElementById('rating-value')?.value || '0'),
        comment: document.getElementById('review-comment')?.value || '',
        consent: document.getElementById('review-consent')?.checked || false,
        date: new Date().toISOString()
    };
    
    console.log('Review data:', reviewData);
    
    // Validate review
    if (!validateReview(reviewData)) {
        return;
    }
    
    // Check for profanity
    if (containsProfanity(reviewData.comment)) {
        alert('Votre commentaire contient des mots inappropriés. Veuillez le modifier.');
        return;
    }
    
    // Save review to memory (since localStorage isn't available)
    saveReviewToMemory(reviewData);
    
    // Reset form
    reviewForm.reset();
    currentRating = 0;
    updateStarRating(0);
    
    // Reload reviews
    loadReviews();
    
    alert('Merci ! Votre avis a été publié avec succès.');
}

function validateReview(data) {
    const errors = [];
    
    if (!data.name.trim()) {
        errors.push('Le prénom est requis');
    }
    
    if (!data.rating || data.rating < 1 || data.rating > 5) {
        errors.push('Veuillez donner une note de 1 à 5 étoiles');
    }
    
    if (!data.comment.trim()) {
        errors.push('Le commentaire est requis');
    }
    
    if (!data.consent) {
        errors.push('Vous devez accepter que votre avis soit publié');
    }
    
    if (errors.length > 0) {
        alert('Erreurs dans le formulaire:\n' + errors.join('\n'));
        return false;
    }
    
    return true;
}

function containsProfanity(text) {
    const lowerText = text.toLowerCase();
    return profanityWords.some(word => lowerText.includes(word));
}

// In-memory storage for reviews (since localStorage is not available)
let memoryReviews = [];

function saveReviewToMemory(review) {
    memoryReviews.push(review);
    console.log('Review saved to memory:', review);
}

function getStoredReviews() {
    return memoryReviews;
}

function loadReviews() {
    if (!reviewsList) {
        console.log('Reviews list element not found');
        return;
    }
    
    const storedReviews = getStoredReviews();
    const allReviews = [...initialReviews, ...storedReviews];
    
    // Sort by date (newest first)
    allReviews.sort((a, b) => {
        const dateA = new Date(a.date || '2025-01-01');
        const dateB = new Date(b.date || '2025-01-01');
        return dateB - dateA;
    });
    
    reviewsList.innerHTML = '';
    
    allReviews.forEach(review => {
        const reviewElement = createReviewElement(review);
        reviewsList.appendChild(reviewElement);
    });
    
    console.log('Loaded', allReviews.length, 'reviews');
}

function createReviewElement(review) {
    const reviewDiv = document.createElement('div');
    reviewDiv.className = 'review-item fade-in';
    
    const stars = '★'.repeat(review.rating) + '☆'.repeat(5 - review.rating);
    
    reviewDiv.innerHTML = `
        <div class="review-header">
            <div class="review-name">${escapeHtml(review.name)}</div>
            <div class="review-stars">${stars}</div>
        </div>
        <div class="review-comment">"${escapeHtml(review.comment)}"</div>
    `;
    
    return reviewDiv;
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Gallery Functions
window.openLightbox = function(index) {
    console.log('Opening lightbox for image:', index);
    lightboxIndex = index;
    const lightbox = document.getElementById('lightbox');
    const lightboxText = document.getElementById('lightbox-text');
    
    if (lightbox && lightboxText) {
        const item = galleryItems[index];
        lightboxText.innerHTML = `<h3>${item.title}</h3><p>${item.description}</p>`;
        lightbox.classList.remove('hidden');
        
        // Prevent body scroll
        document.body.style.overflow = 'hidden';
    }
};

window.closeLightbox = function() {
    const lightbox = document.getElementById('lightbox');
    if (lightbox) {
        lightbox.classList.add('hidden');
        document.body.style.overflow = '';
    }
    console.log('Lightbox closed');
};

window.nextImage = function() {
    lightboxIndex = (lightboxIndex + 1) % galleryItems.length;
    openLightbox(lightboxIndex);
};

window.prevImage = function() {
    lightboxIndex = (lightboxIndex - 1 + galleryItems.length) % galleryItems.length;
    openLightbox(lightboxIndex);
};

// Keyboard navigation for lightbox
document.addEventListener('keydown', function(e) {
    const lightbox = document.getElementById('lightbox');
    if (lightbox && !lightbox.classList.contains('hidden')) {
        switch(e.key) {
            case 'Escape':
                closeLightbox();
                break;
            case 'ArrowLeft':
                prevImage();
                break;
            case 'ArrowRight':
                nextImage();
                break;
        }
    }
});

// Handle initial page load with hash
window.addEventListener('load', function() {
    console.log('Window loaded');
    const hash = window.location.hash.slice(1);
    if (hash && document.getElementById(hash)) {
        navigateToSection(hash, false);
    } else {
        navigateToSection('accueil', false);
    }
});

// Utility Functions
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

// Lazy Loading Simulation
function simulateLazyLoading() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '50px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe gallery items and cards
    document.querySelectorAll('.gallery-item, .card, .step').forEach(el => {
        observer.observe(el);
    });
}

// Initialize lazy loading when DOM is ready
document.addEventListener('DOMContentLoaded', simulateLazyLoading);

// Performance optimization: Preload critical sections
function preloadCriticalSections() {
    console.log('Preloading critical sections...');
}

// Export functions for testing (if in a module environment)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        navigateToSection,
        validateContactForm,
        validateReview,
        containsProfanity,
        isValidEmail
    };
}