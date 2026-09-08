/**
 * A & D SERVICES - INTERACTIVE APPLICATION LOGIC
 * Modernized by RetroFit Web Design
 */

document.addEventListener('DOMContentLoaded', () => {
  initMobileNav();
  initAcreageCalculator();
  initServiceAreaChecker();
  initPaymentsPortal();
  initContactForm();
  initSmoothScroll();
});

/* ==========================================================================
   MOBILE NAVIGATION
   ========================================================================== */
function initMobileNav() {
  const hamburgerBtn = document.getElementById('hamburgerBtn');
  const navMenu = document.getElementById('navMenu');

  if (hamburgerBtn && navMenu) {
    hamburgerBtn.addEventListener('click', () => {
      navMenu.classList.toggle('active');
      const isOpen = navMenu.classList.contains('active');
      hamburgerBtn.setAttribute('aria-expanded', isOpen);
      hamburgerBtn.innerHTML = isOpen 
        ? '<svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/></svg>'
        : '<svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16"/></svg>';
    });

    // Close menu when clicking nav links
    navMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburgerBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16"/></svg>';
      });
    });
  }
}

/* ==========================================================================
   INTERACTIVE ACREAGE ESTIMATOR CALCULATOR
   ========================================================================== */
function initAcreageCalculator() {
  const acreageButtons = document.querySelectorAll('.btn-acreage-opt');
  const serviceSelect = document.getElementById('calcServiceSelect');
  const calcAcreageText = document.getElementById('calcAcreageText');
  const calcProgramText = document.getElementById('calcProgramText');
  const calcEstimateRange = document.getElementById('calcEstimateRange');
  const btnApplyEstimate = document.getElementById('btnApplyEstimate');

  // Pricing matrix based on acreage & service
  const pricingData = {
    '0.5-1.0': {
      label: '1/2 to 1 Acre',
      rates: {
        'weed-feed': '$85 – $115 / app',
        'broadleaf': '$65 – $85 / app',
        'commercial': '$220 – $380 / season',
        'mosquito': '$75 – $95 / app'
      }
    },
    '1.0-2.0': {
      label: '1 to 2 Acres',
      rates: {
        'weed-feed': '$125 – $165 / app',
        'broadleaf': '$95 – $125 / app',
        'commercial': '$380 – $580 / season',
        'mosquito': '$95 – $120 / app'
      }
    },
    '2.0-3.0': {
      label: '2 to 3 Acres',
      rates: {
        'weed-feed': '$175 – $230 / app',
        'broadleaf': '$135 – $170 / app',
        'commercial': '$550 – $850 / season',
        'mosquito': '$125 – $160 / app'
      }
    },
    '3.0+': {
      label: '3 to 5+ Acres',
      rates: {
        'weed-feed': '$240 – $360+ / app',
        'broadleaf': '$185 – $260+ / app',
        'commercial': '$800 – $1,400+ / season',
        'mosquito': '$160 – $220+ / app'
      }
    }
  };

  let selectedAcreage = '0.5-1.0';

  function updateCalculator() {
    const serviceVal = serviceSelect ? serviceSelect.value : 'weed-feed';
    const data = pricingData[selectedAcreage];
    
    if (data && calcAcreageText && calcProgramText && calcEstimateRange) {
      calcAcreageText.textContent = data.label;
      
      const programNames = {
        'weed-feed': '4-Step Weed & Feed (May–Sept)',
        'broadleaf': 'Broadleaf Only (May & Sept)',
        'commercial': 'Commercial Bare-Ground Barrier',
        'mosquito': 'Mosquito Barrier Suppression'
      };
      
      calcProgramText.textContent = programNames[serviceVal] || '4-Step Weed & Feed';
      calcEstimateRange.textContent = data.rates[serviceVal] || '$85 – $115 / app';
    }
  }

  acreageButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      acreageButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      selectedAcreage = btn.dataset.size || '0.5-1.0';
      updateCalculator();
    });
  });

  if (serviceSelect) {
    serviceSelect.addEventListener('change', updateCalculator);
  }

  // Pre-fill contact form on click
  if (btnApplyEstimate) {
    btnApplyEstimate.addEventListener('click', () => {
      const contactSection = document.getElementById('contact');
      const formAcreage = document.getElementById('quoteAcreage');
      const serviceVal = serviceSelect ? serviceSelect.value : 'weed-feed';

      if (formAcreage) {
        formAcreage.value = selectedAcreage;
      }

      // Check corresponding service checkbox
      const serviceCheckbox = document.querySelector(`input[name="services"][value="${serviceVal}"]`);
      if (serviceCheckbox) {
        serviceCheckbox.checked = true;
      }

      if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' });
        showToast(`Applied: ${pricingData[selectedAcreage].label} estimate. Enter your address to request visit!`);
      }
    });
  }

  // Initialize display
  updateCalculator();
}

/* ==========================================================================
   SERVICE AREA & ZIP CODE CHECKER
   ========================================================================== */
function initServiceAreaChecker() {
  const input = document.getElementById('areaSearchInput');
  const btn = document.getElementById('btnCheckArea');
  const feedback = document.getElementById('areaFeedback');

  // Covered cities & zip codes in Otsego / Wright / Sherburne / Anoka / Isanti / Mille Lacs
  const serviceAreaMap = {
    'otsego': '55330',
    'elk river': '55330',
    'andover': '55304',
    'anoka': '55303',
    'cambridge': '55008',
    'ham lake': '55304',
    'isanti': '55040',
    'milaca': '56353',
    'princeton': '55371',
    'rogers': '55374',
    'st. michael': '55376',
    'st michael': '55376',
    'albertville': '55301',
    'ramsey': '55303',
    'zimmerman': '55398',
    'big lake': '55309',
    'monticello': '55362',
    'becker': '55308',
    'nowthen': '55303',
    'east bethel': '55011'
  };

  const zipList = ['55330', '55304', '55303', '55008', '55040', '56353', '55371', '55374', '55376', '55301', '55398', '55309', '55362', '55308', '55011'];

  function checkLocation() {
    if (!input || !feedback) return;
    const query = input.value.trim().toLowerCase();

    if (!query) {
      feedback.innerHTML = '<span style="color: #f87171;">Please enter a Minnesota city name or 5-digit zip code.</span>';
      return;
    }

    const isZipMatch = zipList.includes(query);
    const isCityMatch = Object.keys(serviceAreaMap).some(city => query.includes(city));

    if (isZipMatch || isCityMatch) {
      feedback.innerHTML = `<span style="color: #4ade80;">✔ Great news! <strong>${input.value}</strong> is within our direct acreage and commercial service route! Properties must measure 1/2 acre or larger with 48" gate access.</span>`;
    } else {
      feedback.innerHTML = `<span style="color: #fbbf24;">📍 We frequently expand our routes to properties near <strong>${input.value}</strong>. Call David & Amy at (763) 274-1275 for immediate route availability.</span>`;
    }
  }

  if (btn && input) {
    btn.addEventListener('click', checkLocation);
    input.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        checkLocation();
      }
    });
  }

  // Clicking city tags populates input and runs check
  document.querySelectorAll('.city-tag').forEach(tag => {
    tag.addEventListener('click', () => {
      if (input) {
        input.value = tag.textContent.trim();
        checkLocation();
      }
    });
  });
}

/* ==========================================================================
   PAYMENT PORTAL TAB SWITCHER
   ========================================================================== */
function initPaymentsPortal() {
  const payTypeBtns = document.querySelectorAll('.pay-type-btn');
  const payForLabel = document.getElementById('payForLabel');
  const payNote = document.getElementById('payNote');
  const btnPayPal = document.getElementById('btnPayPalCheckout');
  const payForm = document.getElementById('paymentStationForm');

  payTypeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      payTypeBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const type = btn.dataset.type || 'invoice';

      if (payForLabel) {
        if (type === 'invoice') {
          payForLabel.textContent = 'Invoice Number *';
          if (payNote) payNote.textContent = 'Enter the invoice # shown on your email or mailed billing ticket.';
        } else if (type === 'statement') {
          payForLabel.textContent = 'Account / Statement Number *';
          if (payNote) payNote.textContent = 'Enter your customer account number or property address.';
        } else {
          payForLabel.textContent = 'Property Address / Season Quote # *';
          if (payNote) payNote.textContent = 'Paying for the full season? A 5% pre-pay discount has been applied!';
        }
      }
    });
  });

  if (btnPayPal && payForm) {
    btnPayPal.addEventListener('click', (e) => {
      e.preventDefault();
      const acctInput = document.getElementById('payAccountNum');
      const amountInput = document.getElementById('payAmount');

      if (!acctInput || !acctInput.value.trim()) {
        showToast('Please enter your Account or Invoice number');
        acctInput?.focus();
        return;
      }

      if (!amountInput || !amountInput.value.trim() || parseFloat(amountInput.value) <= 0) {
        showToast('Please enter a valid payment amount');
        amountInput?.focus();
        return;
      }

      showToast(`Redirecting to Secure PayPal Checkout for $${parseFloat(amountInput.value).toFixed(2)}...`);
      setTimeout(() => {
        alert(`[Demo Payment Flow]\n\nA & D Services Merchant: David & Amy Floy\nAccount / Invoice: ${acctInput.value}\nAmount: $${parseFloat(amountInput.value).toFixed(2)}\n\nIn production, this redirects directly to A & D Services' verified PayPal Merchant gateway (Hosted Button ID: 99DF8AP5ZL7NJ).`);
      }, 700);
    });
  }
}

/* ==========================================================================
   CONTACT / ESTIMATE FORM SUBMISSION
   ========================================================================== */
function initContactForm() {
  const form = document.getElementById('leadQuoteForm');

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('quoteName')?.value;
      const phone = document.getElementById('quotePhone')?.value;
      const address = document.getElementById('quoteAddress')?.value;

      if (!name || !phone || !address) {
        showToast('Please fill in your Name, Phone, and Property Address.');
        return;
      }

      showToast('Thank you! Your estimate request has been sent to David & Amy Floy.');
      
      setTimeout(() => {
        alert(`Thank you, ${name}!\n\nDavid & Amy Floy at A & D Services have received your property details for ${address}.\n\nThey will measure your acreage via GIS aerial mapping and follow up with you at ${phone} within 24 hours.\n\nReminder: Residential properties require 1/2+ acre and 48" gate clearance.`);
        form.reset();
      }, 500);
    });
  }
}

/* ==========================================================================
   SMOOTH SCROLL
   ========================================================================== */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId && targetId !== '#') {
        const targetEl = document.querySelector(targetId);
        if (targetEl) {
          e.preventDefault();
          targetEl.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      }
    });
  });
}

/* ==========================================================================
   TOAST NOTIFICATION HELPER
   ========================================================================== */
function showToast(message) {
  let toast = document.getElementById('siteToast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'siteToast';
    toast.className = 'toast-notice';
    document.body.appendChild(toast);
  }

  toast.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="#4ade80" stroke-width="2.5">
      <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
    </svg>
    <span>${message}</span>
  `;

  toast.classList.add('show');
  setTimeout(() => {
    toast.classList.remove('show');
  }, 4000);
}
