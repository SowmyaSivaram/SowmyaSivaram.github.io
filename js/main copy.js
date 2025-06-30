// Immediately Invoked Function Expression (IIFE) to avoid global scope pollution
(function() {
    'use strict';

    // DOM Elements
    const menuToggle = document.getElementById('menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    const contactForm = document.getElementById('contact-form');
    const sections = document.querySelectorAll('section');
    const projectCards = document.querySelectorAll('.project-card');
    const heroElements = document.querySelectorAll('.animate-slide-up');

    // Initialize Intersection Observer for sections
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('section-fade-in', 'visible');
                // Add glass effect when section becomes visible
                if (entry.target.classList.contains('glass-on-visible')) {
                    entry.target.classList.add('glass');
                }
                sectionObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all sections
    sections.forEach(section => {
        section.classList.add('section-fade-in');
        sectionObserver.observe(section);
    });

    // Hero section animations
    window.addEventListener('load', () => {
        heroElements.forEach((element, index) => {
            setTimeout(() => {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }, index * 200);
        });
    });

    // Parallax effect for hero section
    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                const scrolled = window.pageYOffset;
                const heroSection = document.querySelector('#hero');
                if (heroSection) {
                    const speed = 0.5;
                    const yPos = -(scrolled * speed);
                    heroSection.style.backgroundPosition = `50% ${yPos}px`;
                }
                ticking = false;
            });
            ticking = true;
        }
    });

    // Mobile Menu Toggle with enhanced animations
    if (menuToggle && mobileMenu) {
        menuToggle.addEventListener('click', () => {
            const isHidden = mobileMenu.classList.contains('hidden');
            
            if (isHidden) {
                // Show menu
                mobileMenu.classList.remove('hidden');
                mobileMenu.classList.add('mobile-menu-enter');
                requestAnimationFrame(() => {
                    mobileMenu.classList.add('mobile-menu-enter-active');
                    menuToggle.innerHTML = '<i class="fas fa-times"></i>';
                });
            } else {
                // Hide menu
                mobileMenu.classList.add('mobile-menu-exit');
                mobileMenu.classList.add('mobile-menu-exit-active');
                setTimeout(() => {
                    mobileMenu.classList.add('hidden');
                    menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
                }, 300);
            }
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!mobileMenu.contains(e.target) && !menuToggle.contains(e.target) && !mobileMenu.classList.contains('hidden')) {
                mobileMenu.classList.add('mobile-menu-exit');
                mobileMenu.classList.add('mobile-menu-exit-active');
                setTimeout(() => {
                    mobileMenu.classList.add('hidden');
                    menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
                }, 300);
            }
        });
    }

    // Smooth Scrolling with offset for fixed header
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            const headerOffset = 80;
            
            if (targetElement) {
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });

                // Close mobile menu if open
                if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
                    mobileMenu.classList.add('hidden');
                    menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
                }
            }
        });
    });

    // Enhanced Form Validation and Submission
    if (contactForm) {
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            // Reset previous states
            clearMessages();
            
            // Get form fields
            const name = document.getElementById('name');
            const email = document.getElementById('email');
            const message = document.getElementById('message');
            const submitButton = contactForm.querySelector('button[type="submit"]');
            
            // Validate fields
            let isValid = true;
            
            if (!name.value.trim()) {
                showError(name, 'Name is required');
                isValid = false;
            }
            
            if (!email.value.trim()) {
                showError(email, 'Email is required');
                isValid = false;
            } else if (!isValidEmail(email.value)) {
                showError(email, 'Please enter a valid email address');
                isValid = false;
            }
            
            if (!message.value.trim()) {
                showError(message, 'Message is required');
                isValid = false;
            }
            
            if (isValid) {
                // Show loading state
                const originalButtonText = submitButton.innerHTML;
                submitButton.innerHTML = '<span class="loading"></span>';
                submitButton.disabled = true;
                contactForm.classList.add('opacity-50');
                
                try {
                    // Simulate form submission
                    await new Promise(resolve => setTimeout(resolve, 1500));
                    
                    // Show success message
                    contactForm.reset();
                    showSuccess('Message sent successfully! We\'ll get back to you soon.');
                    
                    // Reset button
                    submitButton.innerHTML = originalButtonText;
                    submitButton.disabled = false;
                    contactForm.classList.remove('opacity-50');
                } catch (error) {
                    console.error('Error submitting form:', error);
                    showError(submitButton, 'Failed to send message. Please try again.');
                    submitButton.innerHTML = originalButtonText;
                    submitButton.disabled = false;
                    contactForm.classList.remove('opacity-50');
                }
            }
        });
    }

    // Project card hover effects
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.classList.add('transform', 'scale-105', 'shadow-xl');
        });

        card.addEventListener('mouseleave', () => {
            card.classList.remove('transform', 'scale-105', 'shadow-xl');
        });
    });

    // Helper Functions
    function showError(input, message) {
        const formControl = input.parentElement;
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message text-red-500 text-sm mt-1';
        errorDiv.innerText = message;
        formControl.appendChild(errorDiv);
        
        // Add error class to input
        input.classList.add('border-red-500');
        
        // Animate error message
        setTimeout(() => errorDiv.classList.add('show'), 10);
    }

    function showSuccess(message) {
        const successDiv = document.createElement('div');
        successDiv.className = 'success-message text-green-500 text-sm mt-4 text-center';
        successDiv.innerText = message;
        contactForm.appendChild(successDiv);
        
        // Animate success message
        setTimeout(() => successDiv.classList.add('show'), 10);
        
        // Remove success message after delay
        setTimeout(() => {
            successDiv.classList.remove('show');
            setTimeout(() => successDiv.remove(), 300);
        }, 5000);
    }

    function clearMessages() {
        // Remove all error and success messages
        document.querySelectorAll('.error-message, .success-message').forEach(message => {
            message.classList.remove('show');
            setTimeout(() => message.remove(), 300);
        });
        
        // Remove error classes from inputs
        document.querySelectorAll('.border-red-500').forEach(input => {
            input.classList.remove('border-red-500');
        });
    }

    function isValidEmail(email) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    // Initialize animations on page load
    document.addEventListener('DOMContentLoaded', () => {
        // Add initial animations to elements
        document.querySelectorAll('.animate-on-load').forEach((element, index) => {
            setTimeout(() => {
                element.classList.add('animate-fade-in');
            }, index * 200);
        });
    });

})();
