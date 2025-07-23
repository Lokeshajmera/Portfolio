// Enhanced Portfolio JavaScript with Advanced Animations and Interactions

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initializeNavigation();
    initializeScrollAnimations();
    initializeTypewriter();
    initializeSkillCards();
    initializeStatCounters();
    initializeContactForm();
    initializeProgressBar();
    initializeFloatingElements();
});

// Navigation functionality
function initializeNavigation() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelectorAll('.nav-link');

    // Toggle mobile menu
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking on links
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Navbar scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

// Progress bar
function initializeProgressBar() {
    const progressBar = document.getElementById('progressBar');
    
    window.addEventListener('scroll', () => {
        const totalScroll = document.documentElement.scrollTop;
        const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scroll = `${(totalScroll / windowHeight) * 100}%`;
        progressBar.style.width = scroll;
    });
}

// Scroll animations
function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                
                // Trigger skill progress bars
                if (entry.target.classList.contains('skills')) {
                    animateSkillBars();
                }
                
                // Trigger stat counters
                if (entry.target.classList.contains('about')) {
                    animateCounters();
                }
            }
        });
    }, observerOptions);

    // Observe all sections
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.classList.add('animate-on-scroll');
        observer.observe(section);
    });

    // Observe individual cards
    const cards = document.querySelectorAll('.skill-card, .project-card, .sketch-card, .contact-card, .stat-card');
    cards.forEach((card, index) => {
        card.classList.add('animate-on-scroll');
        card.style.animationDelay = `${index * 0.1}s`;
        observer.observe(card);
    });
}

// Enhanced typewriter effect
function initializeTypewriter() {
    const typewriterElement = document.getElementById('typewriter');
    const phrases = [
        "a Creative Developer 🎨",
        "a UI/UX Designer ✨",
        "a Problem Solver 🚀",
        "a Tech Enthusiast 💻",
        "a Visual Storyteller 📚"
    ];
    
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let isTyping = false;

    function typeWriter() {
        if (isTyping) return;
        isTyping = true;

        const currentPhrase = phrases[phraseIndex];
        const displayText = isDeleting 
            ? currentPhrase.substring(0, charIndex - 1)
            : currentPhrase.substring(0, charIndex + 1);

        typewriterElement.innerHTML = `I'm <span class="highlight">${displayText}</span><span class="cursor">|</span>`;

        let typeSpeed = isDeleting ? 50 : 100;

        if (!isDeleting && charIndex === currentPhrase.length) {
            typeSpeed = 2000; // Pause at end
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            typeSpeed = 500; // Pause before next phrase
        }

        charIndex += isDeleting ? -1 : 1;
        isTyping = false;

        setTimeout(typeWriter, typeSpeed);
    }

    // Add cursor blinking CSS
    const style = document.createElement('style');
    style.textContent = `
        .cursor {
            animation: blink 1s infinite;
        }
        @keyframes blink {
            0%, 50% { opacity: 1; }
            51%, 100% { opacity: 0; }
        }
    `;
    document.head.appendChild(style);

    typeWriter();
}

// Skill cards interactions
function initializeSkillCards() {
    const skillCards = document.querySelectorAll('.skill-card');
    const skillDescription = document.getElementById('skillDescription');
    
    const skillDescriptions = {
        'Frontend': 'I create responsive, interactive user interfaces using modern HTML5, CSS3, and JavaScript. My focus is on clean code, accessibility, and performance optimization.',
        'React': 'Building dynamic, component-based applications with React. I leverage hooks, context, and modern patterns to create scalable frontend solutions.',
        'Node.js': 'Developing robust backend services and APIs using Node.js and Express. I work with authentication, databases, and real-time communication.',
        'Design': 'Passionate about creating beautiful, intuitive user experiences. I work with design systems, prototyping, and user-centered design principles.',
        'Database': 'Working with both SQL and NoSQL databases to design efficient data models and optimize query performance for scalable applications.',
        'Git': 'Using Git for version control, collaboration, and maintaining clean project history. Experienced with branching strategies and code review processes.'
    };

    skillCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            const skillName = card.querySelector('h3').textContent;
            const description = skillDescriptions[skillName] || 'Hover over a skill to learn more about my expertise in this area.';
            
            skillDescription.innerHTML = `<p><strong>${skillName}:</strong> ${description}</p>`;
            skillDescription.style.opacity = '1';
            
            // Add glow effect
            card.style.boxShadow = '0 0 30px rgba(99, 102, 241, 0.3)';
        });

        card.addEventListener('mouseleave', () => {
            skillDescription.innerHTML = '<p>Hover over a skill to learn more about my expertise</p>';
            skillDescription.style.opacity = '0.7';
            
            // Remove glow effect
            card.style.boxShadow = '';
        });
    });
}

// Animate skill progress bars
function animateSkillBars() {
    const progressBars = document.querySelectorAll('.progress-bar-fill');
    
    progressBars.forEach((bar, index) => {
        setTimeout(() => {
            const percent = bar.getAttribute('data-percent');
            bar.style.width = percent + '%';
        }, index * 200);
    });
}

// Animated counters for statistics
function initializeStatCounters() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    window.animateCounters = function() {
        statNumbers.forEach(stat => {
            const target = parseInt(stat.getAttribute('data-target'));
            const duration = 2000;
            const increment = target / (duration / 16);
            let current = 0;
            
            const updateCounter = () => {
                current += increment;
                if (current < target) {
                    stat.textContent = Math.floor(current);
                    requestAnimationFrame(updateCounter);
                } else {
                    stat.textContent = target === 100 ? '∞' : target + '+';
                }
            };
            
            updateCounter();
        });
    };
}

// Enhanced contact form
function initializeContactForm() {
    const form = document.getElementById('contactForm');
    const inputs = form.querySelectorAll('input, textarea');
    
    // Real-time validation
    inputs.forEach(input => {
        input.addEventListener('blur', () => validateField(input));
        input.addEventListener('input', () => clearError(input));
    });
    
    form.addEventListener('submit', handleFormSubmit);
}

function validateField(field) {
    const value = field.value.trim();
    const fieldName = field.name;
    const errorElement = document.getElementById(fieldName + 'Error');
    
    let isValid = true;
    let errorMessage = '';
    
    // Required field validation
    if (!value) {
        isValid = false;
        errorMessage = `${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)} is required`;
    }
    
    // Email validation
    if (fieldName === 'email' && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            isValid = false;
            errorMessage = 'Please enter a valid email address';
        }
    }
    
    // Message length validation
    if (fieldName === 'message' && value && value.length < 10) {
        isValid = false;
        errorMessage = 'Message must be at least 10 characters long';
    }
    
    // Display error
    if (errorElement) {
        errorElement.textContent = errorMessage;
        errorElement.classList.toggle('show', !isValid);
    }
    
    // Update field styling
    field.style.borderColor = isValid ? '' : '#ef4444';
    
    return isValid;
}

function clearError(field) {
    const errorElement = document.getElementById(field.name + 'Error');
    if (errorElement) {
        errorElement.classList.remove('show');
    }
    field.style.borderColor = '';
}

function handleFormSubmit(e) {
    e.preventDefault();
    
    const form = e.target;
    const submitBtn = form.querySelector('button[type="submit"]');
    const inputs = form.querySelectorAll('input, textarea');
    
    // Validate all fields
    let isFormValid = true;
    inputs.forEach(input => {
        if (!validateField(input)) {
            isFormValid = false;
        }
    });
    
    if (!isFormValid) {
        showNotification('Please fix the errors before submitting', 'error');
        return;
    }
    
    // Show loading state
    submitBtn.classList.add('loading');
    submitBtn.disabled = true;
    
    // Simulate form submission
    setTimeout(() => {
        submitBtn.classList.remove('loading');
        submitBtn.disabled = false;
        
        showNotification('✅ Message sent successfully! I\'ll get back to you soon.', 'success');
        form.reset();
        
        // Clear any remaining errors
        inputs.forEach(input => clearError(input));
    }, 2000);
}

// Notification system
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span>${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Add notification styles
    const style = `
        .notification {
            position: fixed;
            top: 100px;
            right: 20px;
            background: white;
            border-radius: 10px;
            padding: 1rem;
            box-shadow: 0 10px 25px rgba(0,0,0,0.1);
            z-index: 10000;
            transform: translateX(400px);
            transition: transform 0.3s ease;
            max-width: 400px;
            border-left: 4px solid var(--primary-color);
        }
        .notification-success { border-left-color: var(--accent-color); }
        .notification-error { border-left-color: #ef4444; }
        .notification.show { transform: translateX(0); }
        .notification-content { display: flex; justify-content: space-between; align-items: center; }
        .notification-close {
            background: none;
            border: none;
            font-size: 1.2rem;
            cursor: pointer;
            color: var(--text-light);
            margin-left: 1rem;
        }
    `;
    
    if (!document.querySelector('#notification-styles')) {
        const styleElement = document.createElement('style');
        styleElement.id = 'notification-styles';
        styleElement.textContent = style;
        document.head.appendChild(styleElement);
    }
    
    document.body.appendChild(notification);
    
    // Show notification
    setTimeout(() => notification.classList.add('show'), 100);
    
    // Auto hide after 5 seconds
    const autoHide = setTimeout(() => hideNotification(notification), 5000);
    
    // Manual close
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        clearTimeout(autoHide);
        hideNotification(notification);
    });
}

function hideNotification(notification) {
    notification.classList.remove('show');
    setTimeout(() => {
        if (notification.parentNode) {
            notification.parentNode.removeChild(notification);
        }
    }, 300);
}

// Floating elements animation
function initializeFloatingElements() {
    const shapes = document.querySelectorAll('.shape');
    const floatingIcons = document.querySelectorAll('.floating-icon');
    
    // Add random animation delays
    shapes.forEach((shape, index) => {
        shape.style.animationDelay = `${index * 0.5}s`;
        shape.style.animationDuration = `${6 + Math.random() * 4}s`;
    });
    
    floatingIcons.forEach((icon, index) => {
        icon.style.animationDelay = `${index * 0.8}s`;
        icon.style.animationDuration = `${4 + Math.random() * 2}s`;
    });
}

// Parallax scrolling effect
function initializeParallax() {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.parallax');
        
        parallaxElements.forEach(element => {
            const speed = element.dataset.speed || 0.5;
            const yPos = -(scrolled * speed);
            element.style.transform = `translateY(${yPos}px)`;
        });
    });
}

// Image lazy loading for better performance
function initializeLazyLoading() {
    const images = document.querySelectorAll('img[loading="lazy"]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.classList.add('loaded');
                    observer.unobserve(img);
                }
            });
        });
        
        images.forEach(img => imageObserver.observe(img));
    }
}

// Initialize additional features
document.addEventListener('DOMContentLoaded', function() {
    initializeParallax();
    initializeLazyLoading();
});

// Smooth reveal animations for page load
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    
    // Animate hero elements on load
    const heroElements = document.querySelectorAll('.hero-title, .hero-subtitle, .hero-buttons, .profile-card');
    heroElements.forEach((element, index) => {
        setTimeout(() => {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, index * 200);
    });
});

// Add CSS for load animations
const loadAnimationCSS = `
    .hero-title, .hero-subtitle, .hero-buttons, .profile-card {
        opacity: 0;
        transform: translateY(30px);
        transition: all 0.6s ease;
    }
    
    img[loading="lazy"] {
        opacity: 0;
        transition: opacity 0.3s ease;
    }
    
    img[loading="lazy"].loaded {
        opacity: 1;
    }
`;

const loadStyleElement = document.createElement('style');
loadStyleElement.textContent = loadAnimationCSS;
document.head.appendChild(loadStyleElement);
