document.addEventListener('DOMContentLoaded', () => {
    
    // ==========================================
    // 1. Mobile Menu Toggle
    // ==========================================
    const navToggle = document.getElementById('navToggle');
    const nav = document.querySelector('.nav');

    if (navToggle && nav) {
        navToggle.addEventListener('click', () => {
            nav.classList.toggle('active');
            // Toggle hamburger animation
            navToggle.classList.toggle('open');
        });

        // Close menu when clicking links
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                nav.classList.remove('active');
                navToggle.classList.remove('open');
            });
        });
    }

    // ==========================================
    // 2. Before/After Image Slider
    // ==========================================
    const slider = document.getElementById('comparisonSlider');
    const afterImage = document.getElementById('afterImageLayer');
    const handle = document.getElementById('sliderHandle');

    if (slider && afterImage && handle) {
        let isResizing = false;

        function setSliderPos(xPosition) {
            const rect = slider.getBoundingClientRect();
            // Calculate percentage from left side of slider
            let position = ((xPosition - rect.left) / rect.width) * 100;
            
            // Constrain between 0% and 100%
            if (position < 0) position = 0;
            if (position > 100) position = 100;
            
            // Update widths
            afterImage.style.width = `${position}%`;
            handle.style.left = `${position}%`;
        }

        // Mouse Down
        handle.addEventListener('mousedown', (e) => {
            isResizing = true;
            e.preventDefault();
        });

        // Touch Start
        handle.addEventListener('touchstart', (e) => {
            isResizing = true;
            e.preventDefault();
        });

        // Mouse Move on Window
        window.addEventListener('mousemove', (e) => {
            if (!isResizing) return;
            setSliderPos(e.clientX);
        });

        // Touch Move on Window
        window.addEventListener('touchmove', (e) => {
            if (!isResizing) return;
            if (e.touches && e.touches[0]) {
                setSliderPos(e.touches[0].clientX);
            }
        });

        // Mouse Up / Touch End
        window.addEventListener('mouseup', () => { isResizing = false; });
        window.addEventListener('touchend', () => { isResizing = false; });
        
        // Handle window resizing to keep image layers aligned
        window.addEventListener('resize', () => {
            const rect = slider.getBoundingClientRect();
            const afterImageTag = afterImage.querySelector('img');
            if (afterImageTag) {
                afterImageTag.style.width = `${rect.width}px`;
            }
        });
        
        // Initial set
        const rect = slider.getBoundingClientRect();
        const afterImageTag = afterImage.querySelector('img');
        if (afterImageTag) {
            afterImageTag.style.width = `${rect.width}px`;
        }
    }

    // ==========================================
    // 3. Website Audit Scanner
    // ==========================================
    const analyzeBtn = document.getElementById('analyzeBtn');
    const websiteUrlInput = document.getElementById('websiteUrl');
    const inputForm = document.getElementById('analyzerInputForm');
    const scannerRunning = document.getElementById('analysisRunning');
    const scannerResults = document.getElementById('analysisResults');
    const terminalText = document.getElementById('terminalText');
    const reportedUrlSpan = document.getElementById('reportedUrl');
    const scrollQuoteBtn = document.getElementById('scrollQuoteBtn');

    if (analyzeBtn && websiteUrlInput) {
        analyzeBtn.addEventListener('click', (e) => {
            e.preventDefault();
            const urlVal = websiteUrlInput.value.trim();
            if (!urlVal) {
                websiteUrlInput.reportValidity();
                return;
            }

            // Hide input, show running status
            inputForm.classList.add('hidden');
            scannerRunning.classList.remove('hidden');
            reportedUrlSpan.textContent = urlVal.replace(/^(https?:\/\/)?(www\.)?/, '');

            // Simulate scanner terminal logs
            const logSteps = [
                { text: `> Connecting to server resolved to IP: 198.51.100.41... OK`, delay: 300 },
                { text: `> Scanning stylesheets and layout templates...`, delay: 900 },
                { text: `> ALERT: Static desktop layouts found. No mobile viewport tags configured.`, delay: 1500 },
                { text: `> Inspecting images... Found 14 uncompressed assets totaling 4.8MB.`, delay: 2100 },
                { text: `> Crawling scripts... Found outdated framework scripts and 2 broken links.`, delay: 2700 },
                { text: `> SEO Check: Missing Title and Alt tags on 6 major assets.`, delay: 3300 },
                { text: `> Scan finalized. Formatting report card...`, delay: 3800 }
            ];

            logSteps.forEach(step => {
                setTimeout(() => {
                    const line = document.createElement('div');
                    line.textContent = step.text;
                    terminalText.appendChild(line);
                    terminalText.scrollTop = terminalText.scrollHeight;
                }, step.delay);
            });

            // Transition to results state
            setTimeout(() => {
                scannerRunning.classList.add('hidden');
                scannerResults.classList.remove('hidden');
            }, 4500);
        });

        if (scrollQuoteBtn) {
            scrollQuoteBtn.addEventListener('click', () => {
                document.getElementById('pricing').scrollIntoView({ behavior: 'smooth' });
            });
        }
    }

    // ==========================================
    // 4. Custom Quote Estimator
    // ==========================================
    const pageSlider = document.getElementById('pageCount');
    const pageDisplay = document.getElementById('pageCountDisplay');
    const bookingCb = document.getElementById('bookingFeature');
    const seoCb = document.getElementById('seoFeature');
    const cmsCb = document.getElementById('cmsFeature');
    const ecommerceCb = document.getElementById('ecommerceFeature');
    const adsCb = document.getElementById('adsFeature');
    const estimatedPriceText = document.getElementById('estimatedPrice');
    const claimQuoteBtn = document.getElementById('claimQuoteBtn');

    function calculateEstimate() {
        if (!pageSlider) return;

        const pages = parseInt(pageSlider.value);
        pageDisplay.textContent = pages;

        // Math: $399 base + $60 per page + checkbox additions
        let total = 399 + (pages * 60);

        if (bookingCb && bookingCb.checked) total += parseInt(bookingCb.value);
        if (seoCb && seoCb.checked) total += parseInt(seoCb.value);
        if (cmsCb && cmsCb.checked) total += parseInt(cmsCb.value);
        if (ecommerceCb && ecommerceCb.checked) total += parseInt(ecommerceCb.value);
        if (adsCb && adsCb.checked) total += parseInt(adsCb.value);

        estimatedPriceText.textContent = `$${total}`;
    }

    if (pageSlider) {
        pageSlider.addEventListener('input', calculateEstimate);
        [bookingCb, seoCb, cmsCb, ecommerceCb, adsCb].forEach(cb => {
            if (cb) cb.addEventListener('change', calculateEstimate);
        });
        
        // Run initial load
        calculateEstimate();
    }

    if (claimQuoteBtn) {
        claimQuoteBtn.addEventListener('click', () => {
            const packageSelect = document.getElementById('chosenPackage');
            if (packageSelect) {
                packageSelect.value = 'Custom Estimator Plan';
            }
            
            const messageArea = document.getElementById('clientMessage');
            if (messageArea && pageSlider) {
                const pages = pageSlider.value;
                const features = [];
                if (bookingCb && bookingCb.checked) features.push('Booking/Ordering');
                if (seoCb && seoCb.checked) features.push('Local SEO Boost');
                if (cmsCb && cmsCb.checked) features.push('Content Management (CMS)');
                if (ecommerceCb && ecommerceCb.checked) features.push('E-Commerce Catalog');
                if (adsCb && adsCb.checked) features.push('Google Ads Campaign Setup');
                
                messageArea.value = `I calculated my custom refurbish quote: Estimated ${pages} pages. Additional features: ${features.join(', ') || 'None'}. Please verify my quote!`;
            }

            document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
        });
    }

    // ==========================================
    // 5. Select Package Button Routing
    // ==========================================
    const selectPackageBtns = document.querySelectorAll('.select-package');
    selectPackageBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const packName = btn.getAttribute('data-package');
            const packageSelect = document.getElementById('chosenPackage');
            if (packageSelect && packName) {
                packageSelect.value = packName;
            }
        });
    });

    // ==========================================
    // 6. Contact Form Processing
    // ==========================================
    const refurbishForm = document.getElementById('refurbishForm');
    const formSuccess = document.getElementById('formSuccess');

    if (refurbishForm && formSuccess) {
        refurbishForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const submitBtn = document.getElementById('formSubmitBtn');
            
            // Validate form fields
            if (!refurbishForm.checkValidity()) {
                refurbishForm.reportValidity();
                return;
            }

            // Show submission status
            submitBtn.textContent = 'Analyzing Site & Packaging Quote...';
            submitBtn.disabled = true;

            // Submit to forms endpoint (or gracefully display success on Cloudflare Pages)
            const formData = new FormData(refurbishForm);
            Promise.all([
                fetch('/', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                    body: new URLSearchParams(formData).toString()
                }).catch(() => {}),
                new Promise(resolve => setTimeout(resolve, 1500))
            ])
            .then(() => {
                refurbishForm.classList.add('hidden');
                formSuccess.classList.remove('hidden');
            });
        });
    }
});
