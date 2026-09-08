/**
 * FLOWSEAL SURFACE MAINTENANCE - INTERACTIVE APPLICATION
 * Modernized Mockup by RetroFit Web Design
 */

document.addEventListener('DOMContentLoaded', () => {
  initMobileNav();
  initEstimatorCalculator();
  initComparisonSlider();
  initPastWorkGallery();
  initServiceAreaChecker();
  initFastQuoteForm();
});

/* ==========================================================================
   MOBILE NAVIGATION
   ========================================================================== */
function initMobileNav() {
  const hamburger = document.getElementById('hamburgerToggle');
  const navMenu = document.getElementById('navLinksMenu');

  if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
      navMenu.classList.toggle('active');
      const isOpen = navMenu.classList.contains('active');
      hamburger.setAttribute('aria-expanded', isOpen);
      hamburger.innerHTML = isOpen
        ? '<svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/></svg>'
        : '<svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16"/></svg>';
    });

    navMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16"/></svg>';
      });
    });
  }
}

/* ==========================================================================
   INTERACTIVE ASPHALT & LOT ESTIMATOR CALCULATOR
   ========================================================================== */
function initEstimatorCalculator() {
  const tabResidential = document.getElementById('tabModeResidential');
  const tabCommercial = document.getElementById('tabModeCommercial');
  const sizeGrid = document.getElementById('sizeButtonGrid');
  const serviceSelect = document.getElementById('calcServiceSelect');
  const calcPropertyText = document.getElementById('calcPropertyText');
  const calcServiceText = document.getElementById('calcServiceText');
  const calcEstimatePrice = document.getElementById('calcEstimatePrice');
  const btnApplyEstimate = document.getElementById('btnApplyEstimate');
  const curingNotice = document.getElementById('curingNotice');

  let currentMode = 'residential';
  let currentSize = 'res-2car';

  const residentialSizes = [
    { id: 'res-2car', label: '2-Car Driveway', sqft: '600–900 sq ft' },
    { id: 'res-3car', label: '3-Car Driveway', sqft: '1,000–1,500 sq ft' },
    { id: 'res-large', label: 'Large / Circular', sqft: '1,800–2,800 sq ft' },
    { id: 'res-acreage', label: 'Acreage Lane (3,000+)', sqft: '3,000+ sq ft' }
  ];

  const commercialSizes = [
    { id: 'com-small', label: 'Small Lot (10–25 Stalls)', sqft: '4,000–8,000 sq ft' },
    { id: 'com-med', label: 'Medium Plaza (30–75)', sqft: '10,000–25,000 sq ft' },
    { id: 'com-large', label: 'Large Retail (80–200)', sqft: '30,000–75,000 sq ft' },
    { id: 'com-industrial', label: 'Industrial Complex', sqft: '80,000+ sq ft' }
  ];

  const pricingMatrix = {
    residential: {
      'res-2car': {
        'sealcoat-crack': '$285 – $385',
        'full-pave': '$4,200 – $6,200',
        'infrared-patch': '$350 – $650',
        'apron-replace': '$850 – $1,400'
      },
      'res-3car': {
        'sealcoat-crack': '$395 – $550',
        'full-pave': '$6,500 – $9,800',
        'infrared-patch': '$450 – $850',
        'apron-replace': '$1,100 – $1,800'
      },
      'res-large': {
        'sealcoat-crack': '$650 – $980',
        'full-pave': '$11,500 – $17,000',
        'infrared-patch': '$600 – $1,200',
        'apron-replace': '$1,400 – $2,400'
      },
      'res-acreage': {
        'sealcoat-crack': '$1,150 – $1,850',
        'full-pave': '$18,000 – $28,000+',
        'infrared-patch': '$850 – $1,800',
        'apron-replace': '$1,800 – $3,200'
      }
    },
    commercial: {
      'com-small': {
        'sealcoat-crack': '$950 – $1,800',
        'full-pave': '$18,000 – $32,000',
        'infrared-patch': '$800 – $1,600',
        'striping': '$450 – $750'
      },
      'com-med': {
        'sealcoat-crack': '$2,200 – $4,500',
        'full-pave': '$42,000 – $85,000',
        'infrared-patch': '$1,500 – $3,200',
        'striping': '$750 – $1,400'
      },
      'com-large': {
        'sealcoat-crack': '$5,500 – $12,000',
        'full-pave': 'Custom Bid ($90k+)',
        'infrared-patch': '$2,800 – $5,500',
        'striping': '$1,400 – $2,800'
      },
      'com-industrial': {
        'sealcoat-crack': 'Custom Commercial Scope',
        'full-pave': 'Engineered Site Bid',
        'infrared-patch': 'Custom Commercial Scope',
        'striping': 'Custom Commercial Scope'
      }
    }
  };

  function renderSizeButtons() {
    const list = currentMode === 'residential' ? residentialSizes : commercialSizes;
    sizeGrid.innerHTML = '';

    list.forEach((item, index) => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = `btn-size-opt ${index === 0 ? 'active' : ''}`;
      btn.textContent = item.label;
      btn.dataset.id = item.id;
      btn.dataset.label = item.label;

      btn.addEventListener('click', () => {
        sizeGrid.querySelectorAll('.btn-size-opt').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentSize = item.id;
        updateEstimate();
      });

      sizeGrid.appendChild(btn);
    });

    currentSize = list[0].id;
    updateServiceOptions();
    updateEstimate();
  }

  function updateServiceOptions() {
    if (currentMode === 'residential') {
      serviceSelect.innerHTML = `
        <option value="sealcoat-crack" selected>Rubberized Emulsion Sealcoat + Hot-Pour Crack Fill</option>
        <option value="full-pave">Full Asphalt Paving / Total Driveway Replacement</option>
        <option value="infrared-patch">Infrared Seamless Patching &amp; Pothole Repair</option>
        <option value="apron-replace">Concrete/Asphalt Garage Apron Replacement</option>
      `;
    } else {
      serviceSelect.innerHTML = `
        <option value="sealcoat-crack" selected>Commercial Sealcoating + Hot Rubberized Sealing</option>
        <option value="striping">Parking Stall Striping &amp; ADA Compliant Markings</option>
        <option value="full-pave">Commercial Asphalt Overlay / Full Repave</option>
        <option value="infrared-patch">Infrared Pothole Repair &amp; Catch Basin Infiltration Fix</option>
      `;
    }
  }

  function updateEstimate() {
    const serviceVal = serviceSelect.value;
    const selectedOptionText = serviceSelect.options[serviceSelect.selectedIndex].text;
    const activeBtn = sizeGrid.querySelector('.btn-size-opt.active');
    const propertyLabel = activeBtn ? activeBtn.dataset.label : 'Standard Property';

    calcPropertyText.textContent = propertyLabel;
    calcServiceText.textContent = selectedOptionText;

    const rates = pricingMatrix[currentMode][currentSize] || {};
    const priceText = rates[serviceVal] || 'Contact for Estimate';
    calcEstimatePrice.textContent = priceText;

    // Dynamic curing guidance
    if (serviceVal.includes('sealcoat')) {
      curingNotice.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
        <span><strong>Curing Reminder:</strong> Walk on sealcoat in <strong>24 hours</strong>; drive on it in <strong>48 hours</strong>.</span>
      `;
    } else if (serviceVal.includes('full-pave')) {
      curingNotice.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
        <span><strong>New Pavement Care:</strong> Wait <strong>7 days</strong> to drive and <strong>12 days</strong> to park on fresh asphalt.</span>
      `;
    } else {
      curingNotice.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/></svg>
        <span><strong>Fast Turnaround:</strong> Infrared thermal repairs bond seamlessly and are traffic-ready within 2–4 hours.</span>
      `;
    }
  }

  tabResidential.addEventListener('click', () => {
    tabResidential.classList.add('active');
    tabCommercial.classList.remove('active');
    currentMode = 'residential';
    renderSizeButtons();
  });

  tabCommercial.addEventListener('click', () => {
    tabCommercial.classList.add('active');
    tabResidential.classList.remove('active');
    currentMode = 'commercial';
    renderSizeButtons();
  });

  serviceSelect.addEventListener('change', updateEstimate);

  // Apply Estimate to Form
  if (btnApplyEstimate) {
    btnApplyEstimate.addEventListener('click', () => {
      const quoteSection = document.getElementById('quote-contact');
      const formService = document.getElementById('formServiceSelect');
      const formNotes = document.getElementById('formNotes');

      if (formService) {
        formService.value = serviceSelect.value;
      }
      if (formNotes) {
        formNotes.value = `Estimated for: ${calcPropertyText.textContent} (${calcServiceText.textContent}). Approx Budget: ${calcEstimatePrice.textContent}.`;
      }

      if (quoteSection) {
        quoteSection.scrollIntoView({ behavior: 'smooth' });
      }

      showToast('✓ Estimate parameters applied to quote form below!');
    });
  }

  // Initial render
  renderSizeButtons();
}

/* ==========================================================================
   INTERACTIVE BEFORE / AFTER SLIDER
   ========================================================================== */
function initComparisonSlider() {
  const container = document.getElementById('comparisonSlider');
  const afterLayer = document.getElementById('sliderAfterLayer');
  const handle = document.getElementById('sliderHandle');

  if (!container || !afterLayer || !handle) return;

  let isDragging = false;

  function updateSliderPosition(clientX) {
    const rect = container.getBoundingClientRect();
    let offsetX = clientX - rect.left;

    // Clamp between 5% and 95%
    const minX = rect.width * 0.05;
    const maxX = rect.width * 0.95;
    offsetX = Math.max(minX, Math.min(offsetX, maxX));

    const percentage = (offsetX / rect.width) * 100;
    container.style.setProperty('--slider-pos', `${percentage}%`);
    afterLayer.style.clipPath = `inset(0 calc(100% - ${percentage}%) 0 0)`;
    handle.style.left = `${percentage}%`;
  }

  container.addEventListener('mousedown', (e) => {
    isDragging = true;
    updateSliderPosition(e.clientX);
  });

  window.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    updateSliderPosition(e.clientX);
  });

  window.addEventListener('mouseup', () => {
    isDragging = false;
  });

  // Touch Support for Mobile
  container.addEventListener('touchstart', (e) => {
    isDragging = true;
    if (e.touches.length > 0) {
      updateSliderPosition(e.touches[0].clientX);
    }
  }, { passive: true });

  window.addEventListener('touchmove', (e) => {
    if (!isDragging) return;
    if (e.touches.length > 0) {
      updateSliderPosition(e.touches[0].clientX);
    }
  }, { passive: true });

  window.addEventListener('touchend', () => {
    isDragging = false;
  });
}

/* ==========================================================================
   INTERACTIVE SERVICE AREA / ZIP CODE CHECKER
   ========================================================================= */
function initServiceAreaChecker() {
  const zipInput = document.getElementById('zipInputField');
  const btnCheck = document.getElementById('btnZipCheck');
  const resultMsg = document.getElementById('zipResultMessage');
  const chips = document.querySelectorAll('.city-chip');

  const coveredZipCodes = [
    // Wright County
    '55330', '55362', '55376', '55301', '55313', '55341', '55358', '55363',
    // Sherburne County
    '55398', '55309', '55308', '55319', '55377',
    // Hennepin County
    '55311', '55369', '55441', '55442', '55446', '55447', '55391', '55356', '55345', '55343', '55344', '55416', '55426', '55427', '55428', '55429', '55443', '55444', '55445',
    // Anoka County
    '55303', '55304', '55433', '55434', '55448', '55449', '55014', '55070', '55092'
  ];

  const coveredCities = [
    'otsego', 'elk river', 'zimmerman', 'rogers', 'st. michael', 'st michael', 
    'albertville', 'monticello', 'maple grove', 'plymouth', 'minnetonka', 
    'wayzata', 'osseo', 'champlin', 'brooklyn park', 'anoka', 'ramsey', 
    'andover', 'coon rapids', 'blaine', 'ham lake', 'becker', 'big lake'
  ];

  function evaluateLocation(query) {
    if (!query) {
      resultMsg.style.color = '#f59e0b';
      resultMsg.textContent = 'Please enter a 5-digit zip code or Minnesota city name.';
      return;
    }

    const clean = query.trim().toLowerCase();
    const isZipMatch = coveredZipCodes.includes(clean);
    const isCityMatch = coveredCities.some(city => clean.includes(city) || city.includes(clean));

    if (isZipMatch || isCityMatch) {
      resultMsg.style.color = '#a3e635';
      resultMsg.innerHTML = `✓ <strong>Confirmed Route Coverage:</strong> We provide full asphalt paving, sealcoating, and maintenance in <strong>${query.trim().toUpperCase()}</strong>!`;
    } else {
      resultMsg.style.color = '#38bdf8';
      resultMsg.innerHTML = `ℹ️ <strong>Nearby Territory:</strong> We frequently accommodate commercial lots & larger residential projects in <strong>${query.trim()}</strong>. Call (763) 501-9923 for immediate dispatch confirmation.`;
    }
  }

  if (btnCheck && zipInput) {
    btnCheck.addEventListener('click', () => evaluateLocation(zipInput.value));
    zipInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        evaluateLocation(zipInput.value);
      }
    });
  }

  chips.forEach(chip => {
    chip.addEventListener('click', () => {
      const city = chip.dataset.city || chip.textContent.trim();
      if (zipInput) {
        zipInput.value = city;
        evaluateLocation(city);
      }
    });
  });
}

/* ==========================================================================
   FAST DIRECT QUOTE FORM
   ========================================================================== */
function initFastQuoteForm() {
  const form = document.getElementById('fastQuoteForm');

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('formName').value;
      const phone = document.getElementById('formPhone').value;

      if (!name || !phone) {
        showToast('⚠️ Please enter your name and phone number.');
        return;
      }

      showToast(`✓ Thank you, ${name}! Your quote request has been transmitted to FlowSeal.`);
      form.reset();
    });
  }
}

/* ==========================================================================
   TOAST NOTIFICATION UTILITY
   ========================================================================== */
function showToast(message) {
  let toast = document.getElementById('flowsealToast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'flowsealToast';
    toast.className = 'toast-msg';
    document.body.appendChild(toast);
  }

  toast.textContent = message;
  toast.classList.add('show');

  setTimeout(() => {
    toast.classList.remove('show');
  }, 4000);
}

/* ==========================================================================
   OFFICIAL PAST WORK PHOTO GALLERY & LIGHTBOX
   ========================================================================== */
function initPastWorkGallery() {
  const filterBtns = document.querySelectorAll('.gallery-filter-btn');
  const cards = document.querySelectorAll('.past-work-card');
  const modal = document.getElementById('galleryModalOverlay');
  const modalImg = document.getElementById('galleryModalImg');
  const modalTitle = document.getElementById('galleryModalTitle');
  const modalDesc = document.getElementById('galleryModalDesc');
  const closeBtn = document.getElementById('galleryModalCloseBtn');

  // Filter tabs
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.dataset.filter;

      cards.forEach(card => {
        if (filter === 'all' || card.dataset.category === filter) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // Modal open
  cards.forEach(card => {
    card.addEventListener('click', () => {
      if (!modal || !modalImg) return;
      modalImg.src = card.dataset.img;
      modalImg.alt = card.dataset.title;
      if (modalTitle) modalTitle.textContent = card.dataset.title;
      if (modalDesc) modalDesc.textContent = card.dataset.desc;
      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });

  function closeModal() {
    if (!modal) return;
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (closeBtn) {
    closeBtn.addEventListener('click', closeModal);
  }

  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        closeModal();
      }
    });
  }

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal && modal.classList.contains('active')) {
      closeModal();
    }
  });
}

