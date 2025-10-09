// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Enhanced scroll effect for navbar
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        const scrolled = window.scrollY;
        
        if (scrolled > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe feature cards for animation
    const featureCards = document.querySelectorAll('.feature-card');
    featureCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });

    // Beat detection simulation for robot
    function simulateBeatDetection() {
        const beatBars = document.querySelectorAll('.beat-bar');
        beatBars.forEach((bar, index) => {
            const randomHeight = Math.random() * 40 + 10;
            bar.style.height = randomHeight + 'px';
            bar.style.animationDelay = (index * 0.1) + 's';
        });
    }

    // Start beat simulation
    setInterval(simulateBeatDetection, 500);

    // Form submission handling
    const contactForm = document.querySelector('.contact-form form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const name = this.querySelector('input[type="text"]').value;
            const email = this.querySelector('input[type="email"]').value;
            const message = this.querySelector('textarea').value;
            
            // Simple validation
            if (!name || !email || !message) {
                alert('Please fill in all fields');
                return;
            }
            
            // Simulate form submission
            const submitBtn = this.querySelector('.btn-primary');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                alert('Thank you for your message! We\'ll get back to you soon.');
                this.reset();
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, 2000);
        });
    }

    // Add parallax effect to hero section
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        const robotContainer = document.querySelector('.robot-container');
        
        if (hero && robotContainer) {
            const rate = scrolled * -0.5;
            robotContainer.style.transform = `translateY(${rate}px)`;
        }
    });

    // Add typing effect to hero title
    function typeWriter(element, text, speed = 100) {
        let i = 0;
        element.innerHTML = '';
        
        function type() {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }
        
        type();
    }

    // Initialize typing effect
    const heroTitle = document.querySelector('.hero-title .glow-text');
    if (heroTitle) {
        const originalText = heroTitle.textContent;
        setTimeout(() => {
            typeWriter(heroTitle, originalText, 150);
        }, 1000);
    }

    // Add glow effect on mouse move
    document.addEventListener('mousemove', function(e) {
        const glowElements = document.querySelectorAll('.glow-text, .logo-text');
        glowElements.forEach(element => {
            const rect = element.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            if (x >= 0 && x <= rect.width && y >= 0 && y <= rect.height) {
                element.style.filter = 'drop-shadow(0 0 30px rgba(255, 140, 0, 1))';
            } else {
                element.style.filter = 'drop-shadow(0 0 20px rgba(255, 140, 0, 0.6))';
            }
        });
    });

    // Add particle effect to hero section
    function createParticle() {
        const particle = document.createElement('div');
        particle.style.position = 'absolute';
        particle.style.width = '2px';
        particle.style.height = '2px';
        particle.style.background = '#ff8c00';
        particle.style.borderRadius = '50%';
        particle.style.pointerEvents = 'none';
        particle.style.boxShadow = '0 0 10px rgba(255, 140, 0, 0.8)';
        
        const startX = Math.random() * window.innerWidth;
        const startY = window.innerHeight + 10;
        
        particle.style.left = startX + 'px';
        particle.style.top = startY + 'px';
        
        document.querySelector('.hero').appendChild(particle);
        
        const animation = particle.animate([
            { transform: 'translateY(0px)', opacity: 1 },
            { transform: `translateY(-${window.innerHeight + 100}px)`, opacity: 0 }
        ], {
            duration: Math.random() * 3000 + 2000,
            easing: 'linear'
        });
        
        animation.onfinish = () => {
            particle.remove();
        };
    }

    // Create particles periodically
    setInterval(createParticle, 200);

    // Team slider functionality
    const teamSlider = document.querySelector('.team-slider');
    const teamCards = document.querySelectorAll('.team-card');
    
    if (teamSlider && teamCards.length > 0) {
        // Clone cards for seamless loop
        const originalCards = Array.from(teamCards);
        originalCards.forEach(card => {
            const clone = card.cloneNode(true);
            teamSlider.appendChild(clone);
        });

        // Pause animation on hover
        teamSlider.addEventListener('mouseenter', function() {
            this.style.animationPlayState = 'paused';
        });

        teamSlider.addEventListener('mouseleave', function() {
            this.style.animationPlayState = 'running';
        });

        // Add click functionality to cards
        teamCards.forEach(card => {
            card.addEventListener('click', function() {
                // Remove active class from all cards
                teamCards.forEach(c => c.classList.remove('active'));
                // Add active class to clicked card
                this.classList.add('active');
            });
        });

        // Add touch support for mobile
        let startX = 0;
        let currentX = 0;
        let isDragging = false;

        teamSlider.addEventListener('touchstart', function(e) {
            startX = e.touches[0].clientX;
            isDragging = true;
            this.style.animationPlayState = 'paused';
        });

        teamSlider.addEventListener('touchmove', function(e) {
            if (!isDragging) return;
            currentX = e.touches[0].clientX;
            const diffX = startX - currentX;
            this.style.transform = `translateX(${diffX}px)`;
        });

        teamSlider.addEventListener('touchend', function() {
            if (!isDragging) return;
            isDragging = false;
            this.style.animationPlayState = 'running';
            this.style.transform = '';
        });
    }

    // Timeline functionality
    const timelineSection = document.querySelector('.timeline-section');
    const timelineProgress = document.querySelector('.timeline-progress');
    const timelineItems = document.querySelectorAll('.timeline-item');
    const timelineMarkers = document.querySelectorAll('.marker-circle');
    
    if (timelineSection && timelineProgress && timelineItems.length > 0) {
        // Timeline scroll progress
        function updateTimelineProgress() {
            const sectionTop = timelineSection.offsetTop;
            const sectionHeight = timelineSection.offsetHeight;
            const windowHeight = window.innerHeight;
            const scrollTop = window.pageYOffset;
            
            const sectionStart = sectionTop - windowHeight;
            const sectionEnd = sectionTop + sectionHeight;
            const scrollProgress = Math.max(0, Math.min(1, (scrollTop - sectionStart) / (sectionEnd - sectionStart)));
            
            // Update progress bar - check if mobile for horizontal vs vertical
            if (window.innerWidth <= 768) {
                timelineProgress.style.width = (scrollProgress * 100) + '%';
                timelineProgress.style.height = '100%';
            } else {
                timelineProgress.style.height = (scrollProgress * 100) + '%';
                timelineProgress.style.width = '100%';
            }
            
            // Update markers based on scroll position
            timelineItems.forEach((item, index) => {
                const itemTop = item.offsetTop + sectionTop;
                const itemProgress = Math.max(0, Math.min(1, (scrollTop - itemTop + windowHeight * 0.5) / (windowHeight * 0.8)));
                
                if (itemProgress > 0.3) {
                    item.classList.add('animate-in');
                    const marker = item.querySelector('.marker-circle');
                    if (marker) {
                        marker.classList.add('active');
                    }
                }
            });
        }
        
        // Initial call
        updateTimelineProgress();
        
        // Update on scroll
        window.addEventListener('scroll', updateTimelineProgress);
        
        // Intersection Observer for timeline items
        const timelineObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                    const marker = entry.target.querySelector('.marker-circle');
                    if (marker) {
                        setTimeout(() => {
                            marker.classList.add('active');
                        }, 300);
                    }
                }
            });
        }, { 
            threshold: 0.3,
            rootMargin: '0px 0px -100px 0px'
        });
        
        timelineItems.forEach(item => {
            timelineObserver.observe(item);
        });
        
        // Add click functionality to timeline markers
        timelineMarkers.forEach((marker, index) => {
            marker.addEventListener('click', function() {
                const targetItem = timelineItems[index];
                if (targetItem) {
                    targetItem.scrollIntoView({
                        behavior: 'smooth',
                        block: 'center'
                    });
                }
            });
        });
        
        // Add hover effects to timeline cards
        const timelineCards = document.querySelectorAll('.timeline-card');
        timelineCards.forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-10px) scale(1.02)';
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0) scale(1)';
            });
        });
    }

    // Enhanced scroll-triggered animations
    const animateOnScroll = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                
                // Add different animation classes based on element type
                if (element.classList.contains('feature-card')) {
                    element.classList.add('animate-in');
                } else if (element.classList.contains('about-content')) {
                    element.classList.add('fade-in-left');
                } else if (element.classList.contains('contact-content')) {
                    element.classList.add('fade-in-right');
                } else if (element.classList.contains('team-card')) {
                    element.classList.add('scale-in');
                } else {
                    element.classList.add('animate-in');
                }
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    // Observe elements for scroll animations
    const animatedElements = document.querySelectorAll('.feature-card, .about-content, .contact-content, .team-card, .timeline-card');
    animatedElements.forEach(el => {
        animateOnScroll.observe(el);
    });

    // Add loading screen functionality
    window.addEventListener('load', function() {
        const loadingScreen = document.querySelector('.loading-screen');
        if (loadingScreen) {
            setTimeout(() => {
                loadingScreen.classList.add('hidden');
                setTimeout(() => {
                    loadingScreen.remove();
                }, 500);
            }, 1500);
        }
    });

    // Add smooth scroll enhancement
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
});

// Add CSS for enhanced animations
const style = document.createElement('style');
style.textContent = `
    .animate-in {
        animation: fadeInUp 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
    }
    
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(50px) scale(0.95);
        }
        to {
            opacity: 1;
            transform: translateY(0) scale(1);
        }
    }
    
    .fade-in-left {
        animation: fadeInLeft 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
    }
    
    @keyframes fadeInLeft {
        from {
            opacity: 0;
            transform: translateX(-50px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
    
    .fade-in-right {
        animation: fadeInRight 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
    }
    
    @keyframes fadeInRight {
        from {
            opacity: 0;
            transform: translateX(50px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
    
    .scale-in {
        animation: scaleIn 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
    }
    
    @keyframes scaleIn {
        from {
            opacity: 0;
            transform: scale(0.8);
        }
        to {
            opacity: 1;
            transform: scale(1);
        }
    }
    
    .pulse-glow {
        animation: pulseGlow 2s ease-in-out infinite alternate;
    }
    
    @keyframes pulseGlow {
        from {
            box-shadow: 0 0 20px rgba(255, 140, 0, 0.4);
        }
        to {
            box-shadow: 0 0 40px rgba(255, 140, 0, 0.8);
        }
    }
`;
document.head.appendChild(style);
