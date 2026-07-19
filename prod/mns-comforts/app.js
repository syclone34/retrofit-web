document.addEventListener('DOMContentLoaded', () => {

    // ==========================================
    // 1. Sticky Header Shadow on Scroll
    // ==========================================
    const header = document.getElementById('mainHeader');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 60) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // ==========================================
    // 2. Mobile Hamburger Menu
    // ==========================================
    const hamburger = document.getElementById('hamburger');
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileOverlay = document.getElementById('mobileOverlay');
    const mobileClose = document.getElementById('mobileClose');
    const mobileLinks = document.querySelectorAll('.mobile-nav-link');

    function openMenu() {
        hamburger.classList.add('open');
        mobileMenu.classList.add('open');
        mobileOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeMenu() {
        hamburger.classList.remove('open');
        mobileMenu.classList.remove('open');
        mobileOverlay.classList.remove('active');
        document.body.style.overflow = '';
    }

    hamburger.addEventListener('click', () => {
        if (mobileMenu.classList.contains('open')) closeMenu();
        else openMenu();
    });

    mobileClose.addEventListener('click', closeMenu);
    mobileOverlay.addEventListener('click', closeMenu);
    mobileLinks.forEach(link => link.addEventListener('click', closeMenu));

    // ==========================================
    // 3. Smooth Scroll for anchor links
    // ==========================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                e.preventDefault();
                const offset = 80;
                const top = target.getBoundingClientRect().top + window.scrollY - offset;
                window.scrollTo({ top, behavior: 'smooth' });
            }
        });
    });

    // ==========================================
    // 4. Scroll Reveal Animations
    // ==========================================
    const revealElements = document.querySelectorAll(
        '.service-card, .testimonial-card, .badge-item, .area-card, .why-stats-panel'
    );

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, i) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, i * 60);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    revealElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(24px)';
        el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(el);
    });

    // ==========================================
    // 5. Contact Form Submission
    // ==========================================
    const quoteForm = document.getElementById('quoteForm');
    const formSuccess = document.getElementById('formSuccess');

    if (quoteForm && formSuccess) {
        quoteForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const submitBtn = document.getElementById('formSubmitBtn');

            if (!quoteForm.checkValidity()) {
                quoteForm.reportValidity();
                return;
            }

            submitBtn.textContent = 'Sending Request...';
            submitBtn.disabled = true;

            const formData = new FormData(quoteForm);
            Promise.all([
                fetch('/', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                    body: new URLSearchParams(formData).toString()
                }),
                new Promise(resolve => setTimeout(resolve, 1200))
            ])
            .then(() => {
                quoteForm.classList.add('hidden');
                formSuccess.classList.remove('hidden');
            })
            .catch(() => {
                submitBtn.textContent = 'Send My Request';
                submitBtn.disabled = false;
                alert('There was a problem submitting your request. Please call us directly at 763-291-1615.');
            });
        });
    }
});
