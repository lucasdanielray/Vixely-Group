// Mobile navigation toggle
document.addEventListener('DOMContentLoaded', function() {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            
            // Animate hamburger menu
            const spans = navToggle.querySelectorAll('span');
            spans.forEach((span, index) => {
                if (navMenu.classList.contains('active')) {
                    if (index === 0) span.style.transform = 'rotate(45deg) translate(5px, 5px)';
                    if (index === 1) span.style.opacity = '0';
                    if (index === 2) span.style.transform = 'rotate(-45deg) translate(7px, -6px)';
                } else {
                    span.style.transform = '';
                    span.style.opacity = '';
                }
            });
        });
    }
    
    // Close mobile menu when clicking on a link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                
                // Reset hamburger menu
                const spans = navToggle.querySelectorAll('span');
                spans.forEach(span => {
                    span.style.transform = '';
                    span.style.opacity = '';
                });
            }
        });
    });
    
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 80; // Account for fixed header
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Header scroll effect
    let lastScroll = 0;
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            header.style.background = 'rgba(255, 255, 255, 0.98)';
            header.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.boxShadow = 'none';
        }
        
        lastScroll = currentScroll;
    });
    
    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    
    // Add fade-in class to elements
    const animateElements = document.querySelectorAll('.service-card, .stat-item, .section-header');
    animateElements.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });
    
    // Counter animation for stats
    const statNumbers = document.querySelectorAll('.stat-number');
    const counterObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
                entry.target.classList.add('counted');
                const target = entry.target.textContent;
                const isPlus = target.includes('+');
                const number = parseInt(target.replace(/\D/g, ''));
                let current = 0;
                const increment = number / 50;
                const timer = setInterval(() => {
                    current += increment;
                    if (current >= number) {
                        current = number;
                        clearInterval(timer);
                    }
                    entry.target.textContent = Math.floor(current) + (isPlus ? '+' : '');
                }, 30);
            }
        });
    }, { threshold: 0.5 });
    
    statNumbers.forEach(stat => {
        counterObserver.observe(stat);
    });
    
    // Parallax effect for hero section
    const heroBackground = document.querySelector('.hero-background');
    if (heroBackground) {
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            heroBackground.style.transform = `translateY(${rate}px)`;
        });
    }
    
    // Service cards hover effect
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Button ripple effect
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
    
    // Add ripple styles dynamically
    const style = document.createElement('style');
    style.textContent = `
        .btn {
            position: relative;
            overflow: hidden;
        }
        
        .ripple {
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.5);
            transform: scale(0);
            animation: ripple-animation 0.6s ease-out;
            pointer-events: none;
        }
        
        @keyframes ripple-animation {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
    
    // Newsletter form submission handler
    const newsletterForms = document.querySelectorAll('.newsletter-form');
    newsletterForms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const emailInput = this.querySelector('input[name="email"]');
            const successMessage = this.querySelector('.newsletter-success');
            const submitBtn = this.querySelector('.newsletter-btn');
            
            // Simple validation
            if (!emailInput.value.trim() || !emailInput.validity.valid) {
                emailInput.style.borderColor = '#ef4444';
                return;
            }
            
            // Show loading state
            submitBtn.textContent = 'Subscribing...';
            submitBtn.disabled = true;
            
            // Simulate form submission (replace with actual Formspree submission)
            setTimeout(() => {
                // Show success message
                successMessage.classList.add('show');
                
                // Reset form
                emailInput.value = '';
                emailInput.style.borderColor = '';
                
                // Reset button
                submitBtn.textContent = 'Subscribe';
                submitBtn.disabled = false;
                
                // Hide success message after 5 seconds
                setTimeout(() => {
                    successMessage.classList.remove('show');
                }, 5000);
            }, 1000);
        });
    });
    
    // Contact form submission handler
    const contactForms = document.querySelectorAll('.contact-form');
    contactForms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Simple validation
            const inputs = this.querySelectorAll('input, textarea, select');
            let isValid = true;
            
            inputs.forEach(input => {
                if (!input.value.trim()) {
                    isValid = false;
                    input.style.borderColor = '#ef4444';
                } else {
                    input.style.borderColor = '';
                }
            });
            
            if (isValid) {
                // Show success message
                const successMessage = document.createElement('div');
                successMessage.textContent = 'Thank you for your message! We will get back to you soon.';
                successMessage.style.cssText = `
                    background: #10b981;
                    color: white;
                    padding: 1rem;
                    border-radius: 8px;
                    margin-top: 1rem;
                    text-align: center;
                `;
                
                this.appendChild(successMessage);
                this.reset();
                
                setTimeout(() => {
                    successMessage.remove();
                }, 5000);
            }
        });
    });
    
    // Loading animation for images
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('load', function() {
            this.style.animation = 'fadeIn 0.5s ease-in';
        });
    });
    
    // Add loading styles
    const loadingStyle = document.createElement('style');
    loadingStyle.textContent = `
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        
        img {
            opacity: 0;
            transition: opacity 0.5s ease-in;
        }
        
        img.loaded {
            opacity: 1;
        }
    `;
    document.head.appendChild(loadingStyle);
    
    // Mark loaded images
    images.forEach(img => {
        if (img.complete) {
            img.classList.add('loaded');
        } else {
            img.addEventListener('load', () => img.classList.add('loaded'));
        }
    });
    
    // Smooth reveal animation for sections
    const sections = document.querySelectorAll('section');
    const sectionObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });
    
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(50px)';
        section.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        sectionObserver.observe(section);
    });
    
    // Add hover effect to social links
    const socialLinks = document.querySelectorAll('.social-link');
    socialLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-4px) rotate(5deg)';
        });
        
        link.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) rotate(0)';
        });
    });
    
    // Dynamic year in footer
    const yearElements = document.querySelectorAll('[data-year]');
    const currentYear = new Date().getFullYear();
    yearElements.forEach(el => {
        el.textContent = currentYear;
    });
    
    // Performance optimization: Debounce scroll events
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
    
    // Apply debounce to scroll events
    const debouncedScroll = debounce(function() {
        // Scroll-related operations
    }, 100);
    
    window.addEventListener('scroll', debouncedScroll);
    
    // Age Verification System
    const ageVerificationModal = document.getElementById('ageVerificationModal');
    const ageVerifyEnterBtn = document.getElementById('ageVerifyEnter');
    const ageVerifyLeaveBtn = document.getElementById('ageVerifyLeave');
    
    // Check if user has already verified age within 24 hours
    function checkAgeVerification() {
        const verificationTime = localStorage.getItem('ageVerified');
        const currentTime = Date.now();
        const twentyFourHours = 24 * 60 * 60 * 1000; // 24 hours in milliseconds
        
        if (verificationTime && (currentTime - parseInt(verificationTime)) < twentyFourHours) {
            return true; // User is verified
        }
        return false; // User needs to verify
    }
    
    // Show age verification modal
    function showAgeVerification() {
        if (ageVerificationModal) {
            ageVerificationModal.classList.add('active');
            document.body.style.overflow = 'hidden'; // Prevent scrolling
        }
    }
    
    // Hide age verification modal
    function hideAgeVerification() {
        if (ageVerificationModal) {
            ageVerificationModal.classList.remove('active');
            document.body.style.overflow = ''; // Restore scrolling
        }
    }
    
    // Handle "Enter" button click
    if (ageVerifyEnterBtn) {
        ageVerifyEnterBtn.addEventListener('click', function() {
            // Store verification time in localStorage
            localStorage.setItem('ageVerified', Date.now().toString());
            hideAgeVerification();
        });
    }
    
    // Handle "Leave" button click
    if (ageVerifyLeaveBtn) {
        ageVerifyLeaveBtn.addEventListener('click', function() {
            // Redirect to home page
            window.location.href = 'index.html';
        });
    }
    
    // Check for direct access to entertainment.html
    function checkEntertainmentAccess() {
        const currentPage = window.location.pathname.split('/').pop();
        
        // If on entertainment page and not verified, redirect to home
        if (currentPage === 'entertainment.html' && !checkAgeVerification()) {
            // Store the intended destination
            localStorage.setItem('intendedDestination', 'entertainment.html');
            window.location.href = 'index.html';
            return false;
        }
        return true;
    }
    
    // Handle entertainment links and cards
    function setupEntertainmentLinks() {
        // Find all links to entertainment.html
        const entertainmentLinks = document.querySelectorAll('a[href="entertainment.html"]');
        const entertainmentCards = document.querySelectorAll('.service-card');
        
        entertainmentLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                
                if (!checkAgeVerification()) {
                    // Show age verification modal
                    showAgeVerification();
                    
                    // Store the intended destination
                    localStorage.setItem('intendedDestination', 'entertainment.html');
                } else {
                    // User is verified, proceed to entertainment page
                    window.location.href = 'entertainment.html';
                }
            });
        });
        
        // Handle entertainment service card clicks
        entertainmentCards.forEach((card, index) => {
            const cardTitle = card.querySelector('.service-title');
            if (cardTitle && cardTitle.textContent.includes('Adult Entertainment')) {
                // Remove onclick attribute if it exists
                card.removeAttribute('onclick');
                
                // Add click handler
                card.addEventListener('click', function(e) {
                    e.preventDefault();
                    
                    if (!checkAgeVerification()) {
                        showAgeVerification();
                        localStorage.setItem('intendedDestination', 'entertainment.html');
                    } else {
                        window.location.href = 'entertainment.html';
                    }
                });
                
                // Also handle the "Learn More" button in this card
                const learnMoreBtn = card.querySelector('.btn-outline');
                if (learnMoreBtn) {
                    learnMoreBtn.addEventListener('click', function(e) {
                        e.preventDefault();
                        e.stopPropagation();
                        
                        if (!checkAgeVerification()) {
                            showAgeVerification();
                            localStorage.setItem('intendedDestination', 'entertainment.html');
                        } else {
                            window.location.href = 'entertainment.html';
                        }
                    });
                }
            }
        });
    }
    
    // Check if user was trying to access entertainment page
    function checkIntendedDestination() {
        const intendedDestination = localStorage.getItem('intendedDestination');
        
        if (intendedDestination === 'entertainment.html' && checkAgeVerification()) {
            // Clear the stored destination
            localStorage.removeItem('intendedDestination');
            
            // Redirect to entertainment page
            window.location.href = 'entertainment.html';
        }
    }
    
    // Initialize age verification system
    function initAgeVerification() {
        // Check if current page is entertainment and user is not verified
        if (!checkEntertainmentAccess()) {
            return; // Will redirect to home
        }
        
        // Setup entertainment links
        setupEntertainmentLinks();
        
        // Check if user was trying to access entertainment
        checkIntendedDestination();
    }
    
    // Initialize on page load
    initAgeVerification();
});
