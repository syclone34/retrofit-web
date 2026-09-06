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

                // If clicking a city card, pre-fill city in quote form
                const cityName = this.getAttribute('data-city');
                const cityInput = document.getElementById('cityLocation');
                if (cityName && cityInput) {
                    cityInput.value = cityName + ', MN';
                    setTimeout(() => {
                        cityInput.focus();
                    }, 500);
                }
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
                }).catch(() => {}),
                new Promise(resolve => setTimeout(resolve, 1200))
            ])
            .then(() => {
                quoteForm.classList.add('hidden');
                formSuccess.classList.remove('hidden');
            });
        });
    }

    // ==========================================
    // 6. Area Cards Navigation
    // ==========================================
    // City cards (<a>) navigate directly to dedicated local city landing pages.

    // ==========================================
    // 7. Desktop Phone Interceptor & Toast
    // ==========================================
    const isMobileDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || (window.innerWidth <= 768 && ('ontouchstart' in window));

    if (!isMobileDevice) {
        document.querySelectorAll('a[href^="tel:"]').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault(); // Stop desktop browser from launching apps or secondary browsers
                
                const rawTel = link.getAttribute('href').replace('tel:', '');
                const formattedTel = rawTel.length === 10 ? `${rawTel.slice(0,3)}-${rawTel.slice(3,6)}-${rawTel.slice(6)}` : rawTel;
                
                // Copy to clipboard
                if (navigator.clipboard) {
                    navigator.clipboard.writeText(formattedTel);
                }
                
                // Show clean toast
                showPhoneToast(`Copied ${formattedTel} to clipboard!`);
            });
        });
    }

    function showPhoneToast(message) {
        let existingToast = document.querySelector('.phone-toast');
        if (existingToast) existingToast.remove();

        const toast = document.createElement('div');
        toast.className = 'phone-toast';
        toast.innerHTML = `<span>${message}</span>`;
        document.body.appendChild(toast);

        setTimeout(() => {
            toast.style.opacity = '0';
            toast.style.transition = 'opacity 0.4s ease';
            setTimeout(() => toast.remove(), 400);
        }, 3000);
    }

    // ==========================================
    // 8. SMS Widget Toggle & Interactive Logic
    // ==========================================
    const smsTrigger = document.getElementById('smsTrigger');
    const smsDrawer = document.getElementById('smsDrawer');
    const smsClose = document.getElementById('smsClose');
    const smsWidgetForm = document.getElementById('smsWidgetForm');
    const smsSuccessMsg = document.getElementById('smsSuccessMsg');
    const smsTargetNumber = document.getElementById('smsTargetNumber');

    if (smsTrigger && smsDrawer) {
        smsTrigger.addEventListener('click', () => {
            smsDrawer.classList.toggle('hidden');
        });
    }

    if (smsClose) {
        smsClose.addEventListener('click', (e) => {
            e.stopPropagation();
            smsDrawer.classList.add('hidden');
        });
    }

    if (smsWidgetForm) {
        smsWidgetForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const phoneInput = document.getElementById('smsPhone');
            if (phoneInput && smsTargetNumber) {
                smsTargetNumber.textContent = phoneInput.value;
            }

            const formData = new FormData(smsWidgetForm);
            Promise.all([
                fetch('/', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                    body: new URLSearchParams(formData).toString()
                }).catch(() => {}),
                new Promise(resolve => setTimeout(resolve, 800))
            ])
            .then(() => {
                smsWidgetForm.classList.add('hidden');
                if (smsSuccessMsg) smsSuccessMsg.classList.remove('hidden');
            });
        });
    }
});
