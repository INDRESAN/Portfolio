  // Animated background particles
        function createParticles() {
            const bgAnimation = document.getElementById('bgAnimation');
            const particleCount = 50;

            for (let i = 0; i < particleCount; i++) {
                const particle = document.createElement('div');
                particle.className = 'particle';
                particle.style.left = Math.random() * 100 + '%';
                particle.style.top = Math.random() * 100 + '%';
                particle.style.width = Math.random() * 4 + 2 + 'px';
                particle.style.height = particle.style.width;
                particle.style.animationDelay = Math.random() * 6 + 's';
                particle.style.animationDuration = (Math.random() * 10 + 5) + 's';
                bgAnimation.appendChild(particle);
            }
        }

        // Typing effect for the tagline
        function typeWriter(element, text, speed = 100) {
            let i = 0;
            element.innerHTML = '';
            function typing() {
                if (i < text.length) {
                    element.innerHTML += text.charAt(i);
                    i++;
                    setTimeout(typing, speed);
                }
            }
            typing();
        }

        // Navbar scroll effect
        window.addEventListener('scroll', () => {
            const navbar = document.getElementById('navbar');
            if (window.scrollY > 100) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });

        // Parallax effect for particles
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const particles = document.querySelectorAll('.particle');
            particles.forEach((particle, index) => {
                const speed = (index % 3 + 1) * 0.1;
                particle.style.transform = `translateY(${scrolled * speed}px)`;
            });
        });

        // Smooth scrolling for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });

        // Mobile menu toggle
        const mobileMenu = document.getElementById('mobileMenu');
        const navLinks = document.getElementById('navLinks');

        mobileMenu.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });

        // Interactive cursor effect
        document.addEventListener('mousemove', (e) => {
            const cursor = document.querySelector('.cursor');
            if (!cursor) {
                const newCursor = document.createElement('div');
                newCursor.className = 'cursor';
                newCursor.style.cssText = `
                    position: fixed;
                    width: 20px;
                    height: 20px;
                    background: rgba(79, 172, 254, 0.3);
                    border-radius: 50%;
                    pointer-events: none;
                    z-index: 9999;
                    transition: transform 0.1s ease;
                `;
                document.body.appendChild(newCursor);
            }
            
            const currentCursor = document.querySelector('.cursor');
            currentCursor.style.left = e.clientX - 10 + 'px';
            currentCursor.style.top = e.clientY - 10 + 'px';
        });

        // Initialize
        document.addEventListener('DOMContentLoaded', () => {
            createParticles();
            
            // Start typing effect after a delay
            setTimeout(() => {
                const taglineElement = document.getElementById('tagline');
                const originalText = taglineElement.textContent;
                typeWriter(taglineElement, originalText, 50);
            }, 2000);
        });

        // Button hover effects
        document.querySelectorAll('.btn').forEach(btn => {
            btn.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-3px) scale(1.05)';
            });
            
            btn.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0) scale(1)';
            });
        });

        // Dynamic background color change on scroll
        window.addEventListener('scroll', () => {
            const scrollPercent = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
            const darkness = Math.max(10, 20 - (scrollPercent * 5));
            document.body.style.background = `linear-gradient(135deg, 
                hsl(240, 70%, ${darkness}%) 0%, 
                hsl(233, 60%, ${darkness + 5}%) 50%, 
                hsl(226, 55%, ${darkness + 10}%) 100%)`;
        });

// Contact form handling
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    
    // Simple form validation
    if (!name || !email || !message) {
        alert('Please fill in all fields.');
        return;
    }
    
    // Show loading state
    const submitBtn = this.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;
    
    // Create FormData object
    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('message', message);
    
    // Send form data to Flask backend
    fetch('/contact', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert('Thank you for your message! I\'ll get back to you soon.');
            this.reset();
        } else {
            alert('Error: ' + data.message);
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Failed to send message. Please try again.');
    })
    .finally(() => {
        // Reset button state
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    });
});

// Mobile menu toggle (basic implementation)
document.querySelector('.mobile-menu').addEventListener('click', function() {
    const navLinks = document.querySelector('.nav-links');
    navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
});

// Add some interactive hover effects for project cards
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Add a subtle glow effect to the profile image
const profileContainer = document.querySelector('.profile-container');
if (profileContainer) {
    profileContainer.addEventListener('mouseenter', function() {
        this.style.filter = 'drop-shadow(0 0 20px rgba(79, 172, 254, 0.5))';
    });
    
    profileContainer.addEventListener('mouseleave', function() {
        this.style.filter = 'none';
    });
}

// Service cards hover effect
document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.background = 'rgba(79, 172, 254, 0.1)';
        this.style.borderColor = 'rgba(79, 172, 254, 0.5)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.background = 'rgba(255, 255, 255, 0.05)';
        this.style.borderColor = 'rgba(255, 255, 255, 0.1)';
    });
});

// Add CSS animation for level fill
const style = document.createElement('style');
style.textContent = `
    @keyframes fillLevel {
        from {
            transform: scaleX(0);
        }
        to {
            transform: scaleX(1);
        }
    }
`;
document.head.appendChild(style);

// Add interactive tooltips for skill levels
document.querySelectorAll('.tech-skill-item').forEach(item => {
    item.addEventListener('mouseenter', function() {
        const level = this.querySelector('.tech-level').textContent;
        const tooltip = document.createElement('div');
        tooltip.className = 'skill-tooltip';
        tooltip.textContent = `Proficiency: ${level}`;
        tooltip.style.cssText = `
            position: absolute;
            top: -40px;
            left: 50%;
            transform: translateX(-50%);
            background: rgba(0, 0, 0, 0.9);
            color: white;
            padding: 8px 12px;
            border-radius: 6px;
            font-size: 12px;
            white-space: nowrap;
            z-index: 1000;
            pointer-events: none;
            opacity: 0;
            transition: opacity 0.3s ease;
        `;
        this.appendChild(tooltip);
        setTimeout(() => tooltip.style.opacity = '1', 10);
    });

    item.addEventListener('mouseleave', function() {
        const tooltip = this.querySelector('.skill-tooltip');
        if (tooltip) {
            tooltip.remove();
        }
    });
});

// MAIN INITIALIZATION - All page load events consolidated here
window.addEventListener('load', function() {
    // Add loading animation
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease-in-out';
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);

    // Initialize particles
    createParticles();
    
    // Trigger initial fade-in for hero section
    document.querySelectorAll('.fade-in').forEach(el => {
        if (el.getBoundingClientRect().top < window.innerHeight) {
            el.classList.add('visible');
        }
    });

    // Initialize typing effect after a delay
    setTimeout(() => {
        const tagline = document.querySelector('.tagline');
        if (tagline) {
            const originalText = tagline.textContent;
            typeWriter(tagline, originalText, 50);
        }
    }, 1000);

    // Stagger animation for skill items
    const skillItems = document.querySelectorAll('.tech-skill-item');
    skillItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            item.style.transition = 'all 0.6s ease';
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
        }, index * 100);
    });

    // Animate level indicators on scroll
    const skillObserverOptions = {
        threshold: 0.3,
        rootMargin: '0px 0px -50px 0px'
    };

    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const levelFill = entry.target.querySelector('.level-fill');
                if (levelFill) {
                    levelFill.style.animation = 'fillLevel 1.5s ease forwards';
                }
            }
        });
    }, skillObserverOptions);

    skillItems.forEach(item => {
        skillObserver.observe(item);
    });
});