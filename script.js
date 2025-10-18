document.addEventListener('DOMContentLoaded', function() {
            // Ensure pure white body in light mode and pure dark in dark mode
            const applyBodyBg = () => {
                if (document.documentElement.classList.contains('dark')) {
                    document.body.style.backgroundColor = '#111827';
                } else {
                    document.body.style.backgroundColor = '#ffffff';
                }
            };
            applyBodyBg();
            
            // Theme Management
            const themeToggle = document.getElementById('theme-toggle');
            const htmlElement = document.documentElement;
            const currentTheme = localStorage.getItem('theme') || 'light';
            
            if (currentTheme === 'dark') { htmlElement.classList.add('dark'); }
            applyBodyBg();
            
            themeToggle.addEventListener('click', function() {
                htmlElement.classList.toggle('dark');
                const theme = htmlElement.classList.contains('dark') ? 'dark' : 'light';
                localStorage.setItem('theme', theme);
                applyBodyBg();
                
                themeToggle.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    themeToggle.style.transform = 'scale(1)';
                }, 150);
            });
            
            // Mobile Navigation
            const mobileMenuBtn = document.getElementById('mobile-menu-btn');
            const mobileMenu = document.getElementById('mobile-menu');
            const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
            
            mobileMenuBtn.addEventListener('click', function() {
                const isHidden = mobileMenu.classList.contains('hidden');
                
                if (isHidden) {
                    mobileMenu.classList.remove('hidden');
                    mobileMenu.style.opacity = '0';
                    mobileMenu.style.transform = 'translateY(-10px)';
                    
                    setTimeout(() => {
                        mobileMenu.style.transition = 'all 0.3s ease';
                        mobileMenu.style.opacity = '1';
                        mobileMenu.style.transform = 'translateY(0)';
                    }, 10);
                    
                    mobileMenuBtn.innerHTML = '<i class="fas fa-times"></i>';
                } else {
                    mobileMenu.style.transition = 'all 0.3s ease';
                    mobileMenu.style.opacity = '0';
                    mobileMenu.style.transform = 'translateY(-10px)';
                    
                    setTimeout(() => {
                        mobileMenu.classList.add('hidden');
                    }, 300);
                    
                    mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
                }
            });
            
            mobileNavLinks.forEach(link => {
                link.addEventListener('click', () => {
                    mobileMenu.classList.add('hidden');
                    mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
                });
            });
            
            // Smooth Scrolling Navigation
            const navLinks = document.querySelectorAll('a[href^="#"]');
            
            navLinks.forEach(link => {
                link.addEventListener('click', function(e) {
                    e.preventDefault();
                    
                    const targetId = this.getAttribute('href');
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
            
            // Dynamic Navbar
            const navbar = document.getElementById('navbar');
            
            window.addEventListener('scroll', function() {
                const scrollTop = window.pageYOffset;
                if (scrollTop > 10) {
                    navbar.classList.add('shadow-2xl');
                } else {
                    navbar.classList.remove('shadow-2xl');
                }
            });
            
            // Active Link Highlighting
            const sections = document.querySelectorAll('section[id]');
            const navLinkElements = document.querySelectorAll('.nav-link');
            
            function updateActiveNavLink() {
                const scrollPosition = window.scrollY + 100;
                
                sections.forEach(section => {
                    const sectionTop = section.offsetTop;
                    const sectionHeight = section.offsetHeight;
                    const sectionId = section.getAttribute('id');
                    
                    if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                        navLinkElements.forEach(link => {
                            link.classList.remove('text-indigo-600', 'dark:text-indigo-400', 'font-semibold');
                            link.classList.add('text-gray-700', 'dark:text-gray-300');
                        });
                        
                        const activeLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
                        if (activeLink) {
                            activeLink.classList.add('text-indigo-600', 'dark:text-indigo-400', 'font-semibold');
                            activeLink.classList.remove('text-gray-700', 'dark:text-gray-300');
                        }
                    }
                });
            }
            
            window.addEventListener('scroll', updateActiveNavLink);
            
            // Contact Form Handling
            const contactForm = document.querySelector('#contact form');
            
            if (contactForm) {
                contactForm.addEventListener('submit', function(e) {
                    e.preventDefault();
                    
                    const formData = new FormData(this);
                    const name = formData.get('name');
                    const email = formData.get('email');
                    const subject = formData.get('subject');
                    const message = formData.get('message');
                    
                    if (!name || !email || !subject || !message) {
                        showNotification('Please fill in all fields', 'error');
                        return;
                    }
                    
                    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    if (!emailRegex.test(email)) {
                        showNotification('Please enter a valid email address', 'error');
                        return;
                    }
                    
                    const submitBtn = this.querySelector('button[type="submit"]');
                    const originalText = submitBtn.innerHTML;
                    
                    submitBtn.innerHTML = 'Sending...';
                    submitBtn.disabled = true;
                    
                    setTimeout(() => {
                        showNotification('Thank you! Your message has been sent successfully.', 'success');
                        this.reset();
                        submitBtn.innerHTML = originalText;
                        submitBtn.disabled = false;
                    }, 2000);
                });
            }
            
            // Notification System
            function showNotification(message, type = 'info') {
                const existingNotification = document.querySelector('.notification');
                if (existingNotification) {
                    existingNotification.remove();
                }
                
                const notification = document.createElement('div');
                notification.className = `notification fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg max-w-md transform translate-x-full transition-transform duration-300`;
                
                switch (type) {
                    case 'success':
                        notification.classList.add('bg-green-500', 'text-white');
                        break;
                    case 'error':
                        notification.classList.add('bg-red-500', 'text-white');
                        break;
                    default:
                        notification.classList.add('bg-blue-500', 'text-white');
                }
                
                notification.innerHTML = `
                    <div class="flex items-center">
                        <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'} mr-3"></i>
                        <span>${message}</span>
                        <button onclick="this.parentElement.parentElement.remove()" class="ml-4 text-white/80 hover:text-white">
                            <i class="fas fa-times"></i>
                        </button>
                    </div>
                `;
                
                document.body.appendChild(notification);
                
                setTimeout(() => {
                    notification.classList.remove('translate-x-full');
                }, 100);
                
                setTimeout(() => {
                    notification.classList.add('translate-x-full');
                    setTimeout(() => {
                        if (notification.parentNode) {
                            notification.remove();
                        }
                    }, 300);
                }, 5000);
            }
            
            // Statistics Counter Animation
            function animateCounters() {
                const counters = document.querySelectorAll('.counter');
                
                counters.forEach(counter => {
                    const target = parseInt(counter.getAttribute('data-target'));
                    const duration = 2000;
                    const increment = target / (duration / 16);
                    let current = 0;
                    
                    const updateCounter = () => {
                        current += increment;
                        counter.textContent = Math.floor(current);
                        
                        if (current < target) {
                            requestAnimationFrame(updateCounter);
                        } else {
                            counter.textContent = target;
                        }
                    };
                    
                    const counterObserver = new IntersectionObserver((entries) => {
                        entries.forEach(entry => {
                            if (entry.isIntersecting) {
                                updateCounter();
                                counterObserver.unobserve(entry.target);
                            }
                        });
                    });
                    
                    counterObserver.observe(counter);
                });
            }
            
            animateCounters();
            
            // Scroll to Top Button
            const scrollToTopBtn = document.createElement('button');
            scrollToTopBtn.innerHTML = '<i class="fas fa-chevron-up"></i>';
            scrollToTopBtn.className = 'fixed bottom-8 right-8 z-50 w-12 h-12 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full shadow-lg transition-all duration-300 transform scale-0';
            scrollToTopBtn.setAttribute('aria-label', 'Scroll to top');
            
            document.body.appendChild(scrollToTopBtn);
            
            window.addEventListener('scroll', () => {
                if (window.pageYOffset > 300) {
                    scrollToTopBtn.classList.remove('scale-0');
                    scrollToTopBtn.classList.add('scale-100');
                } else {
                    scrollToTopBtn.classList.remove('scale-100');
                    scrollToTopBtn.classList.add('scale-0');
                }
            });
            
            scrollToTopBtn.addEventListener('click', () => {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            });
            
            // Keyboard Navigation Support
            document.addEventListener('keydown', function(e) {
                if (e.key === 'Escape' && !mobileMenu.classList.contains('hidden')) {
                    mobileMenu.classList.add('hidden');
                    mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
                }
            });
            
            // Focus Management
            mobileMenuBtn.addEventListener('click', function() {
                if (!mobileMenu.classList.contains('hidden')) {
                    const firstLink = mobileMenu.querySelector('a');
                    if (firstLink) {
                        setTimeout(() => firstLink.focus(), 100);
                    }
                }
            });
        });

        // Initialize AOS
        AOS.init({
            duration: 1000,
            once: true,
            offset: 100
        });