/* ===================================================
   MANIKANDAN N — Portfolio Script
   =================================================== */

document.addEventListener('DOMContentLoaded', () => {

    // ─────────────────────────────────────
    // 1. AOS (Animate On Scroll) Init
    // ─────────────────────────────────────
    AOS.init({
        duration: 800,
        easing: 'ease-out-cubic',
        once: true,
        offset: 80,
    });

    // ─────────────────────────────────────
    // 2. Theme Toggle (Dark / Light)
    // ─────────────────────────────────────
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    const themeIcon = themeToggle.querySelector('i');

    // Restore saved theme
    const savedTheme = localStorage.getItem('theme') || 'dark';
    body.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);

    themeToggle.addEventListener('click', () => {
        const current = body.getAttribute('data-theme');
        const next = current === 'dark' ? 'light' : 'dark';
        body.setAttribute('data-theme', next);
        localStorage.setItem('theme', next);
        updateThemeIcon(next);
    });

    function updateThemeIcon(theme) {
        themeIcon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
    }

    // ─────────────────────────────────────
    // 3. Hamburger Menu (Mobile)
    // ─────────────────────────────────────
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('nav-links');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    // Close menu on link click
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });

    // ─────────────────────────────────────
    // 4. Navbar Scroll Effect
    // ─────────────────────────────────────
    const navbar = document.getElementById('navbar');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // ─────────────────────────────────────
    // 5. Active Navigation Link
    // ─────────────────────────────────────
    const sections = document.querySelectorAll('section[id]');
    const navItems = navLinks.querySelectorAll('a');

    function highlightNav() {
        const scrollY = window.scrollY + 120;
        sections.forEach(section => {
            const top = section.offsetTop;
            const height = section.offsetHeight;
            const id = section.getAttribute('id');
            const link = navLinks.querySelector(`a[href="#${id}"]`);

            if (link) {
                if (scrollY >= top && scrollY < top + height) {
                    navItems.forEach(a => a.classList.remove('active'));
                    link.classList.add('active');
                }
            }
        });
    }

    window.addEventListener('scroll', highlightNav);
    highlightNav();

    // ─────────────────────────────────────
    // 6. Smooth Scroll for Nav Links
    // ─────────────────────────────────────
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offset = 80;
                const top = target.getBoundingClientRect().top + window.scrollY - offset;
                window.scrollTo({ top, behavior: 'smooth' });
            }
        });
    });

    // ─────────────────────────────────────
    // 7. Typing Animation (Hero Subtitle)
    // ─────────────────────────────────────
    const typedOutput = document.getElementById('typed-output');
    const titles = [
        'Technical Support Engineer',
        'Azure Administrator Associate',
        'Endpoint Management Specialist',
        'AI Enthusiast & Creator',
        'IT Infrastructure Expert',
    ];
    let titleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 80;

    function typeEffect() {
        const current = titles[titleIndex];

        if (isDeleting) {
            typedOutput.textContent = current.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 40;
        } else {
            typedOutput.textContent = current.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 80;
        }

        if (!isDeleting && charIndex === current.length) {
            typingSpeed = 2000; // Pause at end
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            titleIndex = (titleIndex + 1) % titles.length;
            typingSpeed = 400; // Pause before next word
        }

        setTimeout(typeEffect, typingSpeed);
    }

    // Start typing after a brief delay
    setTimeout(typeEffect, 1200);

    // ─────────────────────────────────────
    // 8. Counter Animation (Stats Section)
    // ─────────────────────────────────────
    const counters = document.querySelectorAll('.stat-number');
    let countersAnimated = false;

    function animateCounters() {
        if (countersAnimated) return;

        const statsSection = document.querySelector('.stats-bar');
        if (!statsSection) return;

        const rect = statsSection.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
            countersAnimated = true;

            counters.forEach(counter => {
                const target = +counter.getAttribute('data-target');
                const duration = 2000; // ms
                const steps = 60;
                const increment = target / steps;
                let current = 0;
                const stepTime = duration / steps;

                const timer = setInterval(() => {
                    current += increment;
                    if (current >= target) {
                        counter.textContent = target;
                        clearInterval(timer);
                    } else {
                        counter.textContent = Math.ceil(current);
                    }
                }, stepTime);
            });
        }
    }

    window.addEventListener('scroll', animateCounters);
    animateCounters(); // Check on load

    // ─────────────────────────────────────
    // 9. Particle Background (Hero)
    // ─────────────────────────────────────
    const particlesContainer = document.getElementById('particles');

    function createParticles() {
        if (!particlesContainer) return;
        const count = window.innerWidth < 768 ? 20 : 40;

        for (let i = 0; i < count; i++) {
            const particle = document.createElement('div');
            particle.classList.add('particle');
            particle.style.left = Math.random() * 100 + '%';
            particle.style.top = Math.random() * 100 + '%';
            particle.style.width = particle.style.height = Math.random() * 4 + 1 + 'px';
            particle.style.animationDelay = Math.random() * 6 + 's';
            particle.style.animationDuration = Math.random() * 8 + 6 + 's';
            particlesContainer.appendChild(particle);
        }
    }

    createParticles();

});
