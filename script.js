// Cinematic Loading Screen
function initCinematicLoader() {
    const loader = document.getElementById('cinematic-loader');

    // Fast loading time - 1.5 seconds
    const minLoadTime = 1500;
    const startTime = Date.now();

    // Hide loader when page is fully loaded
    window.addEventListener('load', () => {
        const elapsedTime = Date.now() - startTime;
        const remainingTime = Math.max(0, minLoadTime - elapsedTime);

        setTimeout(() => {
            loader.classList.add('fade-out');

            // Remove loader from DOM after fade out
            setTimeout(() => {
                if (loader && loader.parentNode) {
                    loader.parentNode.removeChild(loader);
                }

                // Initialize page animations after loader is gone
                initPageAnimations();
            }, 800);
        }, remainingTime);
    });

    // Fallback: Remove loader after maximum time (2 seconds)
    setTimeout(() => {
        if (loader && !loader.classList.contains('fade-out')) {
            loader.classList.add('fade-out');
            setTimeout(() => {
                if (loader && loader.parentNode) {
                    loader.parentNode.removeChild(loader);
                }
                initPageAnimations();
            }, 800);
        }
    }, 2000);
}

// Initialize page animations after loading
function initPageAnimations() {
    // Initialize AOS and other animations
    initAOS();

    // Observe elements for animation - FIXED SELECTOR for stats
    const animateElements = document.querySelectorAll('.service-card, .event-card, .story-text, .hero-stats-overlay');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
        observer.observe(el);
    });

    // Add fade-in animation to body
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 1s ease';

    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
}

// Enhanced Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

hamburger?.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');

    // Prevent body scroll when menu is open
    document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger?.classList.remove('active');
        navMenu?.classList.remove('active');
        document.body.style.overflow = '';
    });
});

// Enhanced Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// PERFORMANCE OPTIMIZATION: Replaced heavy scroll listeners with IntersectionObserver
document.addEventListener('DOMContentLoaded', () => {
    setupIntersectionObservers();
});

function setupIntersectionObservers() {
    const navbar = document.querySelector('.navbar');
    const sections = document.querySelectorAll('section[id], .hero');
    const navLinks = document.querySelectorAll('.nav-link');

    // Observer for Active Section Highlighting & Navbar Style
    const sectionObserverOptions = {
        threshold: 0.2, // Trigger when 20% of section is visible
        rootMargin: "-10% 0px -40% 0px" // Adjust calculation area
    };

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const currentSection = entry.target;
                const sectionId = currentSection.getAttribute('id') || 'home';

                // Update Active Link
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });

                // Update Navbar Style based on Section Type
                navbar.classList.remove('on-hero', 'on-dark-section', 'on-light-section', 'scrolled');

                if (currentSection.classList.contains('hero')) {
                    navbar.classList.add('on-hero');
                    // Add scroll listener ONLY for hero transparency fade
                    // This is much lighter than global scroll detection
                    const heroScrollHandler = () => {
                        if (window.scrollY > 50) {
                            navbar.classList.remove('on-hero');
                            navbar.classList.add('scrolled');
                        } else {
                            navbar.classList.add('on-hero');
                            navbar.classList.remove('scrolled');
                        }
                    };
                    window.addEventListener('scroll', heroScrollHandler, { passive: true });
                } else if (currentSection.classList.contains('story-section') || currentSection.classList.contains('events-section')) {
                    // Light sections (About, Events)
                    navbar.classList.add('on-light-section');
                } else if (currentSection.classList.contains('dark-section') || currentSection.classList.contains('contact-section')) {
                    // Dark sections (Contact)
                    navbar.classList.add('scrolled'); // Use standard scrolled style which handles dark/light text well
                } else {
                    // Standard white sections (Services)
                    navbar.classList.add('scrolled');
                }
            }
        });
    }, sectionObserverOptions);

    // Observer for Service Rows Animation
    const serviceRowObserverObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Optional: Stop observing once visible
                serviceRowObserverObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.2,
        rootMargin: "0px"
    });

    // Observe service rows
    const serviceRows = document.querySelectorAll('.service-row');
    serviceRows.forEach(row => {
        serviceRowObserverObserver.observe(row);
    });

    sections.forEach(section => {
        sectionObserver.observe(section);
    });
}

// Mobile-optimized contact form Gmail handler
function handleContactFormSubmission(contactData) {
    console.log('Contact form submitted:', contactData);

    // Create email content
    const subject = `New Contact Inquiry - ${contactData.eventType}`;
    const body = `Dear WINORAA GLOBAL Team,

I hope this message finds you well.

I am writing to inquire about your event management services for an upcoming ${contactData.eventType.toLowerCase()}. Please find my details below for your reference:

Client Name: ${contactData.name}
Email Address: ${contactData.email}
Contact Number: ${contactData.phone}
Event Type: ${contactData.eventType}
Inquiry Date: ${new Date().toLocaleDateString()}

Event Vision & Requirements:
${contactData.message}

Kindly get in touch with me at your convenience to discuss my requirements and share a customized proposal.

Thank you for your time and support. I look forward to hearing from you.

Best regards,
${contactData.name}`;

    // Detect mobile device
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
    const isAndroid = /Android/i.test(navigator.userAgent);

    console.log('Device detection for contact form:', { isMobile, isIOS, isAndroid });

    // Create different URLs for different platforms
    const mailtoLink = `mailto:winoraaglobal@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    const gmailWebUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=winoraaglobal@gmail.com&subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    const gmailAppUrl = `googlegmail://co?to=winoraaglobal@gmail.com&subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    console.log('Opening Gmail for contact form - mobile device');

    // Mobile-optimized Gmail opening for contact form
    if (isMobile) {
        try {
            if (isIOS) {
                // iOS: Try Gmail app first, then fallback to mailto
                console.log('iOS detected - trying Gmail app for contact');
                window.location.href = gmailAppUrl;

                // Fallback to mailto after short delay if Gmail app doesn't open
                setTimeout(() => {
                    window.location.href = mailtoLink;
                }, 500);

            } else if (isAndroid) {
                // Android: Try Gmail app first, then web Gmail, then mailto
                console.log('Android detected - trying Gmail app for contact');

                // Try to open Gmail app
                const intent = `intent://send?to=winoraaglobal@gmail.com&subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}#Intent;scheme=mailto;package=com.google.android.gm;end`;
                window.location.href = intent;

                // Fallback to web Gmail after short delay
                setTimeout(() => {
                    window.location.href = gmailWebUrl;
                }, 300);

            } else {
                // Other mobile devices - use mailto
                console.log('Other mobile device - using mailto for contact');
                window.location.href = mailtoLink;
            }
        } catch (error) {
            console.log('Mobile Gmail opening failed for contact, using mailto fallback:', error);
            window.location.href = mailtoLink;
        }
    } else {
        // Desktop: Use web Gmail
        try {
            console.log('Desktop detected - opening web Gmail for contact');
            window.location.href = gmailWebUrl;
        } catch (error) {
            console.log('Desktop Gmail opening failed for contact, using mailto fallback:', error);
            window.location.href = mailtoLink;
        }
    }

    // Reset form
    const form = document.querySelector('.modal-contact-form');
    if (form) {
        form.reset();
    }
}

// Direct email opening function for contact email link
function openDirectEmail(emailAddress) {
    console.log('Opening direct email to:', emailAddress);

    // Detect mobile device
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
    const isAndroid = /Android/i.test(navigator.userAgent);

    console.log('Device detection for direct email:', { isMobile, isIOS, isAndroid });

    // Create different URLs for different platforms
    const mailtoLink = `mailto:${emailAddress}`;
    const gmailWebUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${emailAddress}`;
    const gmailAppUrl = `googlegmail://co?to=${emailAddress}`;

    console.log('Opening Gmail for direct email');

    // Mobile-optimized Gmail opening for direct email
    if (isMobile) {
        try {
            if (isIOS) {
                // iOS: Try Gmail app first, then fallback to mailto
                console.log('iOS detected - trying Gmail app for direct email');
                window.location.href = gmailAppUrl;

                // Fallback to mailto after short delay if Gmail app doesn't open
                setTimeout(() => {
                    window.location.href = mailtoLink;
                }, 500);

            } else if (isAndroid) {
                // Android: Try Gmail app first, then web Gmail, then mailto
                console.log('Android detected - trying Gmail app for direct email');

                // Try to open Gmail app
                const intent = `intent://send?to=${emailAddress}#Intent;scheme=mailto;package=com.google.android.gm;end`;
                window.location.href = intent;

                // Fallback to web Gmail after short delay
                setTimeout(() => {
                    window.location.href = gmailWebUrl;
                }, 300);

            } else {
                // Other mobile devices - use mailto
                console.log('Other mobile device - using mailto for direct email');
                window.location.href = mailtoLink;
            }
        } catch (error) {
            console.log('Mobile Gmail opening failed for direct email, using mailto fallback:', error);
            window.location.href = mailtoLink;
        }
    } else {
        // Desktop: Use web Gmail
        try {
            console.log('Desktop detected - opening web Gmail for direct email');
            window.location.href = gmailWebUrl;
        } catch (error) {
            console.log('Desktop Gmail opening failed for direct email, using mailto fallback:', error);
            window.location.href = mailtoLink;
        }
    }
}

// Email validation helper
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Professional timer-like counter animation with mobile compatibility
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number-overlay[data-target]');

    if (counters.length === 0) {
        console.error('No counters found!');
        return;
    }

    counters.forEach((counter, index) => {
        const target = parseInt(counter.getAttribute('data-target'));
        const plusSign = counter.nextElementSibling;
        const hasPlus = plusSign && plusSign.classList.contains('stat-plus');

        // Mobile detection
        const isMobile = window.innerWidth <= 768 || /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

        // Use simpler animation for mobile or fallback to ensure compatibility
        if (isMobile || !document.createElement('div').style.transform) {
            // Mobile-optimized simple counter
            mobileOptimizedCounter(counter, target, hasPlus, plusSign, index);
        } else {
            // Desktop timer roller
            try {
                desktopTimerRoller(counter, target, hasPlus, plusSign, index);
            } catch (error) {
                console.warn('Desktop timer failed, using mobile fallback:', error);
                mobileOptimizedCounter(counter, target, hasPlus, plusSign, index);
            }
        }
    });
}

// Standard counting animation for all devices
function desktopTimerRoller(counter, target, hasPlus, plusSign, index) {
    // Reset counter
    counter.textContent = '0';
    counter.classList.remove('rolling-active', 'small-number-rolling', 'timer-complete', 'small-number-complete');

    // Start delay based on index
    const startDelay = index * 200;

    setTimeout(() => {
        let startTimestamp = null;
        const duration = 2000; // 2 seconds duration

        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);

            // Ease out quart function for smooth slowing down
            const easeOutQuart = 1 - Math.pow(1 - progress, 4);

            const currentCount = Math.floor(easeOutQuart * target);
            counter.textContent = currentCount;

            if (progress < 1) {
                window.requestAnimationFrame(step);
            } else {
                counter.textContent = target; // Ensure it ends on exact target

                // Show plus sign
                if (hasPlus) {
                    plusSign.style.opacity = '1';
                    plusSign.style.transform = 'translateY(2px) scale(1)';
                }
            }
        };

        window.requestAnimationFrame(step);
    }, startDelay);
}

// Mobile-optimized counter with reliable animation
function mobileOptimizedCounter(counter, target, hasPlus, plusSign, index) {
    // Reset counter
    counter.textContent = '0';
    counter.classList.add('mobile-counter');

    let current = 0;
    const startDelay = index * 150;

    setTimeout(() => {
        // Faster animation for mobile
        const speed = target <= 3 ? 80 : target > 50 ? 15 : target > 10 ? 25 : 40;

        const timer = setInterval(() => {
            current++;

            // Add mobile rolling effect
            counter.style.transform = 'scale(1.05)';
            counter.style.transition = 'transform 0.1s ease';
            counter.classList.add('mobile-rolling');

            setTimeout(() => {
                counter.textContent = current;
                counter.style.transform = 'scale(1)';
            }, speed / 3);

            if (current >= target) {
                clearInterval(timer);

                // Mobile completion effect
                counter.classList.remove('mobile-rolling');
                counter.classList.add('mobile-complete');

                // Final flash effect
                counter.style.transform = 'scale(1.1)';
                setTimeout(() => {
                    counter.style.transform = 'scale(1)';
                }, 200);

                // Show plus sign
                if (hasPlus) {
                    setTimeout(() => {
                        plusSign.style.opacity = '1';
                        plusSign.style.transform = 'translateY(0) scale(1)';
                        plusSign.style.transition = 'all 0.3s ease-out';
                    }, 250);
                }
            }
        }, speed);
    }, startDelay);
}

// Initialize counter animation when hero stats come into view
function initCounterAnimation() {
    const heroStats = document.querySelector('.hero-stats-overlay');

    if (!heroStats) {
        console.error('Hero stats overlay not found!');
        return;
    }

    let animationTriggered = false;

    // Check if element is already visible
    const rect = heroStats.getBoundingClientRect();
    const isVisible = rect.top < window.innerHeight && rect.bottom > 0;

    if (isVisible && !animationTriggered) {
        animationTriggered = true;
        setTimeout(() => {
            animateCounters();
        }, 500); // Small delay to ensure page is ready
    }

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !animationTriggered) {
                animationTriggered = true;
                // Small delay to ensure elements are visible
                setTimeout(() => {
                    animateCounters();
                }, 200);
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1, // Lower threshold to trigger earlier
        rootMargin: '0px 0px -50px 0px' // Trigger when element is 50px from bottom of viewport
    });

    observer.observe(heroStats);

    // Fallback: trigger animation after 3 seconds if intersection observer doesn't work
    setTimeout(() => {
        if (!animationTriggered) {
            animationTriggered = true;
            animateCounters();
        }
    }, 3000);

    // Additional fallback for mobile - trigger on scroll
    let scrollTriggered = false;
    const scrollHandler = () => {
        if (!animationTriggered && !scrollTriggered) {
            const rect = heroStats.getBoundingClientRect();
            if (rect.top < window.innerHeight * 0.8) {
                scrollTriggered = true;
                animationTriggered = true;
                animateCounters();
                window.removeEventListener('scroll', scrollHandler);
            }
        }
    };

    window.addEventListener('scroll', scrollHandler, { passive: true });
}

// Enhanced Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';

            // Add animate class for story sections
            if (entry.target.classList.contains('story-text')) {
                entry.target.classList.add('animate');
            }
        }
    });
}, observerOptions);

// Simple AOS (Animate On Scroll) implementation
function initAOS() {
    const elements = document.querySelectorAll('[data-aos]');

    elements.forEach(element => {
        const animationType = element.getAttribute('data-aos');
        const delay = element.getAttribute('data-aos-delay') || 0;

        element.style.transitionDelay = `${delay}ms`;

        observer.observe(element);
    });
}

// Events filter functionality
const filterButtons = document.querySelectorAll('.filter-btn');
const eventCards = document.querySelectorAll('.event-card');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        const filter = button.getAttribute('data-filter');

        // Update active button
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');

        // Filter events
        eventCards.forEach(card => {
            const category = card.getAttribute('data-category');

            if (filter === 'all' || category === filter) {
                card.style.display = 'block';
                card.style.animation = 'fadeInUp 0.5s ease forwards';
            } else {
                card.style.display = 'none';
            }
        });
    });
});

// Newsletter signup
const newsletterForm = document.querySelector('.newsletter-signup');
if (newsletterForm) {
    const input = newsletterForm.querySelector('.newsletter-input');
    const button = newsletterForm.querySelector('.newsletter-btn');

    button.addEventListener('click', (e) => {
        e.preventDefault();
        const email = input.value.trim();

        if (!email || !isValidEmail(email)) {
            alert('Please enter a valid email address');
            return;
        }

        // Simulate subscription
        button.textContent = 'Subscribing...';
        button.disabled = true;

        setTimeout(() => {
            alert('Thank you for subscribing to our newsletter!');
            input.value = '';
            button.textContent = 'Subscribe';
            button.disabled = false;
        }, 1500);
    });
}

// Enhanced play button functionality
const playButton = document.querySelector('.play-button');
if (playButton) {
    playButton.addEventListener('click', () => {
        alert('Video player would open here. In a real implementation, you would embed your video player.');
    });
}

// Parallax effect for hero section
let ticking = false;

function updateParallax() {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    const heroHeight = hero?.offsetHeight || 0;

    if (scrolled < heroHeight) {
        const rate = scrolled * -0.5;
        hero.style.transform = `translateY(${rate}px)`;
    }

    ticking = false;
}

function requestParallaxUpdate() {
    if (!ticking) {
        requestAnimationFrame(updateParallax);
        ticking = true;
    }
}

window.addEventListener('scroll', requestParallaxUpdate);

// Video background handling
function initVideoBackground() {
    const video = document.querySelector('.hero-video-bg');
    const heroGradient = document.querySelector('.hero-gradient');

    if (video) {
        console.log('Video element found, attempting to load...');

        // Force show gradient background initially
        if (heroGradient) {
            heroGradient.style.background = 'linear-gradient(135deg, rgba(0, 0, 0, 0.3) 0%, rgba(26, 35, 126, 0.2) 50%, rgba(13, 71, 161, 0.3) 100%)';
        }

        // Handle video load success
        video.addEventListener('loadeddata', () => {
            console.log('Video loaded successfully');
            video.style.opacity = '1';
            video.style.display = 'block';
        });

        // Handle video can play through
        video.addEventListener('canplaythrough', () => {
            console.log('Video can play through');
            video.style.opacity = '1';
            video.play().catch(e => {
                console.log('Video autoplay failed:', e);
                showGradientFallback();
            });
        });

        // Handle video load error
        video.addEventListener('error', (e) => {
            console.log('Video failed to load:', e);
            console.log('Video error details:', video.error);
            showGradientFallback();
        });

        // Handle video load start
        video.addEventListener('loadstart', () => {
            console.log('Video load started');
        });

        // Handle video stalled
        video.addEventListener('stalled', () => {
            console.log('Video loading stalled');
            showGradientFallback();
        });

        // Set initial state
        video.style.opacity = '0';
        video.style.transition = 'opacity 1s ease-in-out';
        video.style.display = 'block';

        // Force load attempt
        video.load();

        // Fallback timeout - if video doesn't load in 3 seconds, show gradient
        setTimeout(() => {
            if (video.readyState < 3) { // HAVE_FUTURE_DATA
                console.log('Video loading timeout, falling back to gradient');
                showGradientFallback();
            }
        }, 3000);

        function showGradientFallback() {
            if (heroGradient) {
                heroGradient.style.background = 'linear-gradient(135deg, #000000 0%, #1a237e 50%, #0d47a1 100%)';
            }
            video.style.display = 'none';
        }

    } else {
        console.log('Video element not found');
    }
}

// Career Application Modal Functions
function openApplicationForm(position) {
    const modal = document.getElementById('applicationModal');
    const selectedPositionElement = document.getElementById('selectedPosition');
    const positionSelect = document.getElementById('applicantPosition');

    if (modal && selectedPositionElement) {
        // Update the modal title with selected position
        selectedPositionElement.textContent = `Apply for ${position}`;

        // Pre-select the position in the dropdown
        if (positionSelect) {
            const positionValue = position.toLowerCase().replace(/\s+/g, '-').replace('&', '');
            positionSelect.value = positionValue;
        }

        // Show the modal
        modal.classList.add('show');
        document.body.style.overflow = 'hidden';

        // Focus on first input after animation
        setTimeout(() => {
            const firstInput = modal.querySelector('input[type="text"]');
            if (firstInput) {
                firstInput.focus();
            }
        }, 400);
    }
}

function closeApplicationForm() {
    const modal = document.getElementById('applicationModal');

    if (modal) {
        modal.classList.remove('show');
        document.body.style.overflow = '';

        // Reset form after modal is hidden
        setTimeout(() => {
            const form = document.getElementById('careerApplicationForm');
            if (form) {
                form.reset();
                // Reset file input label
                const fileInputText = document.querySelector('.file-input-text');
                if (fileInputText) {
                    fileInputText.textContent = 'Choose file or drag and drop';
                }
            }
        }, 400);
    }
}

// Simple career application handler - opens Gmail with application details
function handleCareerApplication(formData) {
    console.log('handleCareerApplication called');

    const name = formData.get('name');
    const email = formData.get('email');
    const phone = formData.get('phone');
    const position = formData.get('position');
    const experience = formData.get('experience');
    const message = formData.get('message');

    console.log('Application data:', { name, email, phone, position, experience });

    // Create email content
    const subject = `New Career Application - ${position} Position`;
    const body = `Dear HR Team,

We are pleased to inform you that a new career application has been successfully submitted through the WINORAA GLOBAL website. The applicant's details are as follows:

Position Applied For: ${position}
Applicant Name: ${name}
Email Address: ${email}
Contact Number: ${phone}
Experience: ${experience}
Application Date: ${new Date().toLocaleDateString()}

Cover Letter: ${message}

Kindly review the application and contact the candidate to proceed with the next steps of the hiring process.

Note: The resume will need to be attached manually for further evaluation.

Best regards,
WINORAA GLOBAL Career Portal`;

    // Detect mobile device
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
    const isAndroid = /Android/i.test(navigator.userAgent);

    console.log('Device detection:', { isMobile, isIOS, isAndroid });

    // Create different URLs for different platforms
    const mailtoLink = `mailto:hr.winoraaglobalevents@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    const gmailWebUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=hr.winoraaglobalevents@gmail.com&subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    const gmailAppUrl = `googlegmail://co?to=hr.winoraaglobalevents@gmail.com&subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    console.log('Opening Gmail for mobile device');

    // Mobile-optimized Gmail opening
    if (isMobile) {
        try {
            if (isIOS) {
                // iOS: Try Gmail app first, then fallback to mailto
                console.log('iOS detected - trying Gmail app');
                window.location.href = gmailAppUrl;

                // Fallback to mailto after short delay if Gmail app doesn't open
                setTimeout(() => {
                    window.location.href = mailtoLink;
                }, 500);

            } else if (isAndroid) {
                // Android: Try Gmail app first, then web Gmail, then mailto
                console.log('Android detected - trying Gmail app');

                // Try to open Gmail app
                const intent = `intent://send?to=hr.winoraaglobalevents@gmail.com&subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}#Intent;scheme=mailto;package=com.google.android.gm;end`;
                window.location.href = intent;

                // Fallback to web Gmail after short delay
                setTimeout(() => {
                    window.location.href = gmailWebUrl;
                }, 300);

            } else {
                // Other mobile devices - use mailto
                console.log('Other mobile device - using mailto');
                window.location.href = mailtoLink;
            }
        } catch (error) {
            console.log('Mobile Gmail opening failed, using mailto fallback:', error);
            window.location.href = mailtoLink;
        }
    } else {
        // Desktop: Use web Gmail
        try {
            console.log('Desktop detected - opening web Gmail');
            window.location.href = gmailWebUrl;
        } catch (error) {
            console.log('Desktop Gmail opening failed, using mailto fallback:', error);
            window.location.href = mailtoLink;
        }
    }

    // Close form immediately
    closeApplicationForm();
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initCinematicLoader();
    initVideoBackground();

    // Handle career application form
    const applicationForm = document.getElementById('careerApplicationForm');
    if (applicationForm) {
        applicationForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const formData = new FormData(this);
            const name = formData.get('name');
            const email = formData.get('email');
            const phone = formData.get('phone');
            const position = formData.get('position');
            const experience = formData.get('experience');
            const resume = formData.get('resume');
            const message = formData.get('message');

            // Basic validation
            if (!name || name.length < 2) {
                alert('Please enter a valid name (at least 2 characters)');
                return;
            }

            if (!email || !isValidEmail(email)) {
                alert('Please enter a valid email address');
                return;
            }

            if (!phone || phone.length < 10) {
                alert('Please enter a valid phone number');
                return;
            }

            if (!position) {
                alert('Please select a position');
                return;
            }

            if (!experience) {
                alert('Please select your years of experience');
                return;
            }

            if (!resume || resume.size === 0) {
                alert('Please upload your resume');
                return;
            }

            if (!message || message.trim().length < 10) {
                alert('Please write a cover letter/message (at least 10 characters)');
                return;
            }

            // Check file type
            const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
            if (!allowedTypes.includes(resume.type)) {
                alert('Please upload a PDF or Word document for your resume');
                return;
            }

            // Check file size (5MB limit)
            if (resume.size > 5 * 1024 * 1024) {
                alert('Resume file size should be less than 5MB');
                return;
            }

            // Handle the application
            console.log('Submitting application for:', name, position);
            handleCareerApplication(formData);
        });
    }

    // Handle file input change
    const fileInput = document.getElementById('applicantResume');
    const fileInputText = document.querySelector('.file-input-text');

    if (fileInput && fileInputText) {
        fileInput.addEventListener('change', function () {
            if (this.files && this.files[0]) {
                const fileName = this.files[0].name;
                const fileSize = (this.files[0].size / 1024 / 1024).toFixed(2);
                fileInputText.textContent = `${fileName} (${fileSize} MB)`;
            } else {
                fileInputText.textContent = 'Choose file or drag and drop';
            }
        });
    }

    // Close modal when clicking outside
    const modal = document.getElementById('applicationModal');
    if (modal) {
        modal.addEventListener('click', function (e) {
            if (e.target === modal) {
                closeApplicationForm();
            }
        });

        // Close modal with Escape key
        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape' && modal.classList.contains('show')) {
                closeApplicationForm();
            }
        });
    }
});

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded, initializing...');
    initCinematicLoader();
    initVideoBackground();
    initCounterAnimation();
});

// Error handling for failed resources
window.addEventListener('error', (e) => {
    console.warn('Resource failed to load:', e.target.src || e.target.href);
});

// Contact Details Modal Functions
function openContactDetailsModal() {
    const modal = document.getElementById('contactDetailsModal');
    modal.classList.add('show');
    document.body.style.overflow = 'hidden';

    // Reset animations
    const animatedElements = modal.querySelectorAll('.animate-slide-in, .animate-fade-in');
    animatedElements.forEach(el => {
        el.style.animation = 'none';
        el.offsetHeight; // Trigger reflow
        el.style.animation = null;
    });
}

function closeContactDetailsModal() {
    const modal = document.getElementById('contactDetailsModal');
    modal.classList.remove('show');
    document.body.style.overflow = '';
}

// Contact Modal Functions
function openContactModal() {
    const modal = document.getElementById('contactModal');
    modal.classList.add('show');
    document.body.style.overflow = 'hidden';

    // Focus on first input after animation
    setTimeout(() => {
        const firstInput = modal.querySelector('input[type="text"]');
        if (firstInput) {
            firstInput.focus();
        }
    }, 400);
}

function closeContactModal() {
    const modal = document.getElementById('contactModal');
    modal.classList.remove('show');
    document.body.style.overflow = '';

    // Reset form after modal is hidden
    setTimeout(() => {
        const form = document.querySelector('.modal-contact-form');
        if (form) {
            form.reset();
        }
    }, 400);
}

// Initialize modal contact form when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Handle modal contact form
    const modalContactForm = document.querySelector('.modal-contact-form');
    if (modalContactForm) {
        modalContactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const formData = new FormData(this);
            const name = formData.get('name');
            const email = formData.get('email');
            const phone = formData.get('phone');
            const eventType = formData.get('event-type');
            const message = formData.get('message');

            // Enhanced validation
            if (!name || name.length < 2) {
                alert('Please enter a valid name (at least 2 characters)');
                return;
            }

            if (!email || !isValidEmail(email)) {
                alert('Please enter a valid email address');
                return;
            }

            if (!message || message.length < 10) {
                alert('Please enter a message (at least 10 characters)');
                return;
            }

            // Handle modal contact form submission with mobile-optimized Gmail
            handleContactFormSubmission({
                name: name,
                email: email,
                phone: phone || 'Not provided',
                eventType: eventType || 'Not specified',
                message: message
            });

            // Close modal after submission
            closeContactModal();
        });
    }

    // Close modal when clicking outside
    const modal = document.getElementById('contactModal');
    if (modal) {
        modal.addEventListener('click', function (e) {
            if (e.target === modal) {
                closeContactModal();
            }
        });

        // Close modal with Escape key
        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape' && modal.classList.contains('show')) {
                closeContactModal();
            }
        });
    }

    // Close contact details modal when clicking outside
    const contactDetailsModal = document.getElementById('contactDetailsModal');
    if (contactDetailsModal) {
        contactDetailsModal.addEventListener('click', function (e) {
            if (e.target === contactDetailsModal) {
                closeContactDetailsModal();
            }
        });

        // Close contact details modal with Escape key
        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape' && contactDetailsModal.classList.contains('show')) {
                closeContactDetailsModal();
            }
        });
    }
});