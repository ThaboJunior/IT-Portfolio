// Initialize the portfolio when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializePortfolio();
});

function initializePortfolio() {
    // Initialize Lucide icons
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
    
    // Initialize navigation
    initializeNavigation();
    
    // Initialize scroll animations
    initializeScrollAnimations();
    
    // Initialize skill bar animations
    initializeSkillBars();
    
    // Add smooth scrolling for buttons
    initializeSmoothScrolling();
}

// Navigation functionality
function initializeNavigation() {
    const navItems = document.querySelectorAll('.nav-item');
    const sections = document.querySelectorAll('section[id]');
    
    // Handle scroll to highlight active navigation item
    function updateActiveNavigation() {
        const scrollPosition = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                // Remove active class from all nav items
                navItems.forEach(item => item.classList.remove('active'));
                
                // Add active class to current section's nav item
                const activeNavItem = document.querySelector(`[data-target="${sectionId}"]`);
                if (activeNavItem) {
                    activeNavItem.classList.add('active');
                }
            }
        });
    }
    
    // Add scroll event listener
    window.addEventListener('scroll', throttle(updateActiveNavigation, 100));
    
    // Handle navigation clicks
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            const targetId = this.getAttribute('data-target');
            scrollToSection(targetId);
        });
    });
}

// Smooth scrolling functionality
function initializeSmoothScrolling() {
    const scrollButtons = document.querySelectorAll('[data-target]');
    
    scrollButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('data-target');
            scrollToSection(targetId);
        });
    });
}

function scrollToSection(sectionId) {
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        const offsetTop = targetSection.offsetTop - 80; // Account for fixed header
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    }
}

// Skill bar animations
function initializeSkillBars() {
    const skillItems = document.querySelectorAll('.skill-item');
    const skillsSection = document.getElementById('skills');
    let skillsAnimated = false;
    
    function animateSkillBars() {
        if (skillsAnimated) return;
        
        const skillsSectionTop = skillsSection.offsetTop;
        const skillsSectionHeight = skillsSection.offsetHeight;
        const scrollPosition = window.scrollY + window.innerHeight;
        
        if (scrollPosition >= skillsSectionTop + skillsSectionHeight * 0.3) {
            skillsAnimated = true;
            
            skillItems.forEach((item, index) => {
                const skillPercentage = item.getAttribute('data-skill');
                const progressBar = item.querySelector('.skill-progress');
                
                setTimeout(() => {
                    progressBar.style.width = skillPercentage + '%';
                    progressBar.classList.add('animated');
                }, index * 100);
            });
        }
    }
    
    window.addEventListener('scroll', throttle(animateSkillBars, 100));
}

// Scroll animations for elements
function initializeScrollAnimations() {
    const animatedElements = document.querySelectorAll('.soft-skill-item');
    
    function checkScrollAnimation() {
        animatedElements.forEach((element, index) => {
            const elementTop = element.offsetTop;
            const elementHeight = element.offsetHeight;
            const scrollPosition = window.scrollY + window.innerHeight;
            
            if (scrollPosition >= elementTop + elementHeight * 0.1) {
                setTimeout(() => {
                    element.classList.add('fade-in-up');
                }, index * 50);
            }
        });
    }
    
    window.addEventListener('scroll', throttle(checkScrollAnimation, 100));
}

// Utility function to throttle scroll events
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Add hover effects to interactive elements
function addHoverEffects() {
    const interactiveElements = document.querySelectorAll('.tool-item, .soft-skill-item, .social-link');
    
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
        });
        
        element.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });
}

// Initialize hover effects after DOM is loaded
document.addEventListener('DOMContentLoaded', addHoverEffects);

// Handle mobile menu (if needed in future)
function initializeMobileMenu() {
    // This function can be expanded to handle mobile navigation
    // For now, the navigation is hidden on mobile in CSS
}

// Add loading animation
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
});

// Add parallax effect to hero section (optional enhancement)
function addParallaxEffect() {
    const heroSection = document.querySelector('.hero-section');
    
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        if (heroSection) {
            heroSection.style.transform = `translateY(${rate}px)`;
        }
    });
}

// Smooth scroll polyfill for older browsers
if (!window.CSS || !CSS.supports('scroll-behavior', 'smooth')) {
    // Add smooth scroll polyfill if needed
    function smoothScrollPolyfill() {
        const links = document.querySelectorAll('[data-target]');
        
        links.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const targetId = this.getAttribute('data-target');
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    const targetPosition = targetElement.offsetTop - 80;
                    window.scrollTo(0, targetPosition);
                }
            });
        });
    }
    
    smoothScrollPolyfill();
}

// Add intersection observer for better performance (modern browsers)
if ('IntersectionObserver' in window) {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
            }
        });
    }, observerOptions);
    
    // Observe elements that should animate in
    document.querySelectorAll('.tool-item, .reference-card').forEach(element => {
        observer.observe(element);
    });

    //mobile-nav

    const toggle = document.getElementById('nav-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    const navItems = mobileMenu.querySelectorAll('.nav-item');

    toggle.addEventListener('click', () => {
        mobileMenu.classList.toggle('active');
    });

    navItems.forEach(item => {
        item.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
        });
    });


}