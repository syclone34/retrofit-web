/**
 * Knight Heating & Air Conditioning, Inc.
 * Modern Interactive Application Logic
 */

document.addEventListener('DOMContentLoaded', () => {
  initStickyHeader();
  initMobileNav();
  initHeroCard();
  initServiceWizard();
  initServiceTabs();
  initServiceAreaChecker();
  initGalleryModal();
  initFaqAccordion();
  initGeneralModals();
});

/* ==========================================================================
   Sticky Header & Scroll Effects
   ========================================================================== */
function initStickyHeader() {
  const header = document.querySelector('.site-header');
  if (!header) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }, { passive: true });
}

/* ==========================================================================
   Mobile Navigation Drawer
   ========================================================================== */
function initMobileNav() {
  const toggleBtn = document.querySelector('.mobile-toggle');
  const navMenu = document.querySelector('.nav-menu');
  
  if (!toggleBtn || !navMenu) return;

  toggleBtn.addEventListener('click', () => {
    const isOpen = navMenu.classList.contains('mobile-active');
    if (isOpen) {
      navMenu.classList.remove('mobile-active');
      toggleBtn.innerHTML = '<i class="fa-solid fa-bars"></i>';
      document.body.style.overflow = '';
    } else {
      navMenu.classList.add('mobile-active');
      toggleBtn.innerHTML = '<i class="fa-solid fa-xmark"></i>';
      document.body.style.overflow = 'hidden';
    }
  });

  // Close when clicking nav link
  navMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('mobile-active');
      toggleBtn.innerHTML = '<i class="fa-solid fa-bars"></i>';
      document.body.style.overflow = '';
    } );
  });
}

/* ==========================================================================
   Hero Quick Dispatch Selector
   ========================================================================== */
function initHeroCard() {
  const optionBtns = document.querySelectorAll('.hero-card .service-option-btn');
  const heroForm = document.getElementById('heroDispatchForm');

  optionBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      optionBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
    });
  });

  if (heroForm) {
    heroForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const phoneInput = heroForm.querySelector('input[type="tel"]');
      const activeOption = document.querySelector('.hero-card .service-option-btn.active');
      const serviceName = activeOption ? activeOption.innerText.trim() : 'HVAC Service';

      if (!phoneInput || !phoneInput.value.trim()) {
        alert('Please enter your contact phone number.');
        return;
      }

      showToast(`Priority dispatch request received for ${serviceName}! A Knight technician will call ${phoneInput.value} shortly.`);
      heroForm.reset();
    });
  }
}

/* ==========================================================================
   Multi-Step Interactive Service Wizard
   ========================================================================== */
function initServiceWizard() {
  const steps = [
    document.getElementById('wizardStep1'),
    document.getElementById('wizardStep2'),
    document.getElementById('wizardStep3')
  ];
  
  const stepIndicators = [
    document.getElementById('indicatorStep1'),
    document.getElementById('indicatorStep2'),
    document.getElementById('indicatorStep3')
  ];

  let currentStep = 0;
  const wizardData = {
    service: 'Furnace Repair & Safety Inspection',
    urgency: 'Emergency (Same-Day / Immediate)',
    property: 'Residential Home',
    name: '',
    phone: '',
    city: 'Otsego',
    notes: ''
  };

  // Step 1 cards
  const serviceCards = document.querySelectorAll('#wizardStep1 .wizard-card');
  serviceCards.forEach(card => {
    card.addEventListener('click', () => {
      serviceCards.forEach(c => c.classList.remove('selected'));
      card.classList.add('selected');
      wizardData.service = card.getAttribute('data-service') || card.querySelector('.wizard-card-title').innerText;
    });
  });

  // Step 2 cards (Urgency & Property)
  const urgencyCards = document.querySelectorAll('#wizardStep2 .urgency-card');
  urgencyCards.forEach(card => {
    card.addEventListener('click', () => {
      urgencyCards.forEach(c => c.classList.remove('selected'));
      card.classList.add('selected');
      wizardData.urgency = card.getAttribute('data-urgency') || card.innerText;
    });
  });

  // Wizard Navigation
  const toStep2Btn = document.getElementById('wizardToStep2');
  const backToStep1Btn = document.getElementById('wizardBackToStep1');
  const toStep3Btn = document.getElementById('wizardToStep3');
  const backToStep2Btn = document.getElementById('wizardBackToStep2');
  const wizardSubmitBtn = document.getElementById('wizardSubmit');

  function updateSteps(newStep) {
    steps.forEach((step, idx) => {
      if (step) {
        step.classList.toggle('active', idx === newStep);
      }
    });

    stepIndicators.forEach((ind, idx) => {
      if (ind) {
        ind.classList.toggle('active', idx === newStep);
        ind.classList.toggle('completed', idx < newStep);
      }
    });

    currentStep = newStep;
  }

  if (toStep2Btn) {
    toStep2Btn.addEventListener('click', () => updateSteps(1));
  }
  if (backToStep1Btn) {
    backToStep1Btn.addEventListener('click', () => updateSteps(0));
  }
  if (toStep3Btn) {
    toStep3Btn.addEventListener('click', () => {
      const summaryText = document.getElementById('wizardReviewSummary');
      if (summaryText) {
        summaryText.innerHTML = `<strong>Selected Need:</strong> ${wizardData.service} &bull; <strong>Urgency:</strong> ${wizardData.urgency}`;
      }
      updateSteps(2);
    });
  }
  if (backToStep2Btn) {
    backToStep2Btn.addEventListener('click', () => updateSteps(1));
  }

  if (wizardSubmitBtn) {
    wizardSubmitBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const name = document.getElementById('wizardName')?.value.trim();
      const phone = document.getElementById('wizardPhone')?.value.trim();
      const city = document.getElementById('wizardCity')?.value.trim();
      const notes = document.getElementById('wizardNotes')?.value.trim();

      if (!name || !phone) {
        alert('Please provide your name and phone number so our team can confirm dispatch.');
        return;
      }

      wizardData.name = name;
      wizardData.phone = phone;
      wizardData.city = city || 'Otsego area';
      wizardData.notes = notes;

      const refCode = 'KN-' + Math.floor(100000 + Math.random() * 900000);

      // Show confirmation modal or toast
      showBookingConfirmation({
        refCode,
        service: wizardData.service,
        urgency: wizardData.urgency,
        name: wizardData.name,
        phone: wizardData.phone,
        city: wizardData.city
      });

      // Reset wizard
      updateSteps(0);
      document.getElementById('wizardForm')?.reset();
    });
  }
}

/* ==========================================================================
   Service Tabs Filter
   ========================================================================== */
function initServiceTabs() {
  const tabBtns = document.querySelectorAll('.service-tab-btn');
  const serviceCards = document.querySelectorAll('.service-card');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      tabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      serviceCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/* ==========================================================================
   Interactive Service Area Checker
   ========================================================================== */
function initServiceAreaChecker() {
  const input = document.getElementById('areaSearchInput');
  const checkBtn = document.getElementById('areaCheckBtn');
  const resultAlert = document.getElementById('areaResultAlert');
  const cityPills = document.querySelectorAll('.city-pill');

  const coveredCities = [
    'otsego', 'elk river', 'rogers', 'maple grove', 'plymouth',
    'albertville', 'st. michael', 'st michael', 'monticello', 'champlin',
    'ramsey', 'zimmerman', 'big lake', 'becker', 'anoka',
    'coon rapids', 'corcoran', 'crystal', 'hanover', 'new hope',
    'nowthen', 'osseo', 'princeton', 'robinsdale', 'robbinsdale',
    'clearwater', 'clearlake', 'dayton'
  ];

  function evaluateCity(city) {
    if (!city) return;
    const cleanCity = city.trim().toLowerCase();
    
    // Check if covered
    const isCovered = coveredCities.some(c => cleanCity.includes(c) || c.includes(cleanCity));

    resultAlert.className = 'area-result-alert';
    if (isCovered) {
      resultAlert.classList.add('success');
      resultAlert.innerHTML = `<i class="fa-solid fa-circle-check"></i> <strong>Yes! We proudly service ${capitalize(city)}!</strong> Knight technicians are frequently in your area. Zero travel surcharges & 24/7 priority emergency dispatch available.`;
    } else {
      resultAlert.classList.add('info');
      resultAlert.innerHTML = `<i class="fa-solid fa-location-dot"></i> We regularly service Otsego, Wright County, Sherburne County, and Northern Hennepin County. Call us at <strong>(763) 274-9945</strong> to confirm immediate dispatch to ${capitalize(city)}!`;
    }
  }

  if (checkBtn && input) {
    checkBtn.addEventListener('click', () => evaluateCity(input.value));
    input.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') evaluateCity(input.value);
    });
  }

  cityPills.forEach(pill => {
    pill.addEventListener('click', () => {
      cityPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      const cityName = pill.innerText.trim();
      if (input) input.value = cityName;
      evaluateCity(cityName);
    });
  });
}

function capitalize(str) {
  return str.replace(/\b\w/g, l => l.toUpperCase());
}

/* ==========================================================================
   Real Past Jobs Gallery Modal
   ========================================================================== */
function initGalleryModal() {
  const galleryCards = document.querySelectorAll('.gallery-card');
  const modalBackdrop = document.getElementById('galleryModal');
  const modalImg = document.getElementById('galleryModalImg');
  const modalCaption = document.getElementById('galleryModalCaption');
  const modalClose = document.getElementById('galleryModalClose');

  if (!modalBackdrop || !modalImg) return;

  galleryCards.forEach(card => {
    card.addEventListener('click', () => {
      const img = card.querySelector('img');
      const caption = card.querySelector('.gallery-caption')?.innerText || 'HVAC Installation';
      const loc = card.querySelector('.gallery-location-tag')?.innerText || '';

      modalImg.src = img.src;
      modalImg.alt = caption;
      if (modalCaption) {
        modalCaption.innerHTML = `<strong>${caption}</strong> - <span style="color: var(--gold-500);">${loc}</span>`;
      }

      modalBackdrop.classList.add('active');
    });
  });

  if (modalClose) {
    modalClose.addEventListener('click', () => {
      modalBackdrop.classList.remove('active');
    });
  }

  modalBackdrop.addEventListener('click', (e) => {
    if (e.target === modalBackdrop) {
      modalBackdrop.classList.remove('active');
    }
  });
}

/* ==========================================================================
   FAQ Accordion
   ========================================================================== */
function initFaqAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const header = item.querySelector('.faq-header');
    if (!header) return;

    header.addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      
      // Close others
      faqItems.forEach(i => i.classList.remove('active'));

      if (!isActive) {
        item.classList.add('active');
      }
    });
  });
}

/* ==========================================================================
   General Booking & Contact Modals
   ========================================================================== */
function initGeneralModals() {
  // Booking / Schedule Modal
  const scheduleButtons = document.querySelectorAll('.trigger-schedule-modal');
  const modal = document.getElementById('bookingModal');
  const closeBtn = document.getElementById('bookingModalClose');
  const bookingForm = document.getElementById('generalBookingForm');

  scheduleButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      if (modal) modal.classList.add('active');
    });
  });

  if (closeBtn && modal) {
    closeBtn.addEventListener('click', () => {
      modal.classList.remove('active');
    });

    modal.addEventListener('click', (e) => {
      if (e.target === modal) modal.classList.remove('active');
    });
  }

  if (bookingForm) {
    bookingForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('modalName')?.value;
      const phone = document.getElementById('modalPhone')?.value;
      const service = document.getElementById('modalService')?.value;
      const urgency = document.getElementById('modalUrgency')?.value || 'Standard Priority';
      const city = document.getElementById('modalCity')?.value || 'Otsego Area';

      if (modal) modal.classList.remove('active');
      bookingForm.reset();

      showBookingConfirmation({
        refCode: 'KNT-' + Math.floor(100000 + Math.random() * 900000),
        name: name,
        phone: phone,
        service: service,
        urgency: urgency,
        city: city
      });
      showToast(`Thank you, ${name}! Your request has been received.`);
    });
  }

  // Financing Consultation Modal
  const financingButtons = document.querySelectorAll('.trigger-financing-modal');
  const financeModal = document.getElementById('financingModal');
  const financeCloseBtn = document.getElementById('financingModalClose');
  const financeForm = document.getElementById('financingInquiryForm');

  financingButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      if (financeModal) financeModal.classList.add('active');
    });
  });

  if (financeCloseBtn && financeModal) {
    financeCloseBtn.addEventListener('click', () => {
      financeModal.classList.remove('active');
    });

    financeModal.addEventListener('click', (e) => {
      if (e.target === financeModal) financeModal.classList.remove('active');
    });
  }

  if (financeForm) {
    financeForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const equipment = document.getElementById('financeEquipment')?.value || 'High-Efficiency HVAC System';
      const plan = document.getElementById('financePlan')?.value || 'Flexible Monthly Payment';
      const name = document.getElementById('financeName')?.value;
      const phone = document.getElementById('financePhone')?.value;
      const city = document.getElementById('financeCity')?.value || 'Otsego / Surrounding Area';

      if (financeModal) financeModal.classList.remove('active');
      financeForm.reset();

      showBookingConfirmation({
        refCode: 'FIN-' + Math.floor(100000 + Math.random() * 900000),
        name: name,
        phone: phone,
        service: `Financing Consultation: ${equipment}`,
        urgency: `Plan: ${plan}`,
        city: city
      });
      showToast(`Financing inquiry submitted! A Knight financing specialist will contact you at ${phone}.`);
    });
  }
}

/* ==========================================================================
   Booking Confirmation Dialog
   ========================================================================== */
function showBookingConfirmation(details) {
  const confModal = document.getElementById('confirmationModal');
  const confBody = document.getElementById('confirmationDetails');
  const confClose = document.getElementById('confirmationModalClose');

  if (confModal && confBody) {
    confBody.innerHTML = `
      <div style="text-align: center; margin-bottom: 1.5rem;">
        <div style="width: 64px; height: 64px; border-radius: 50%; background: #dcfce7; color: #16a34a; font-size: 2rem; display: inline-flex; align-items: center; justify-content: center; margin-bottom: 1rem;">
          <i class="fa-solid fa-check"></i>
        </div>
        <h3 style="font-size: 1.5rem; margin-bottom: 0.25rem;">Dispatch Request Received!</h3>
        <p style="color: var(--slate-600); font-size: 0.95rem;">Confirmation #: <strong>${details.refCode}</strong></p>
      </div>
      <div style="background: var(--slate-50); border: 1px solid var(--slate-200); border-radius: var(--radius-md); padding: 1.25rem; font-size: 0.9rem; line-height: 1.7; margin-bottom: 1.5rem;">
        <div><strong>Customer:</strong> ${details.name}</div>
        <div><strong>Contact Phone:</strong> <a href="tel:${details.phone}" style="color: var(--gold-600); font-weight: 700;">${details.phone}</a></div>
        <div><strong>Service Requested:</strong> ${details.service}</div>
        <div><strong>Urgency:</strong> <span style="color: var(--gold-600); font-weight: 600;">${details.urgency}</span></div>
        <div><strong>Location:</strong> ${details.city}</div>
      </div>
      <p style="font-size: 0.85rem; color: var(--slate-500); text-align: center; margin-bottom: 1rem;">
        Need immediate emergency service right now? Call our on-duty dispatcher directly at <a href="tel:7632749945" style="color: var(--navy-950); font-weight: 700;">(763) 274-9945</a>.
      </p>
    `;
    confModal.classList.add('active');

    if (confClose) {
      confClose.onclick = () => confModal.classList.remove('active');
    }
  } else {
    showToast(`Request #${details.refCode} booked! We will call ${details.phone} shortly.`);
  }
}

/* ==========================================================================
   Toast Notification Helper
   ========================================================================== */
function showToast(message) {
  let toast = document.getElementById('siteToast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'siteToast';
    toast.className = 'toast-notice';
    toast.innerHTML = `
      <div class="toast-icon"><i class="fa-solid fa-circle-check"></i></div>
      <div>
        <div class="toast-title">Knight Heating & Air</div>
        <div class="toast-desc" id="siteToastDesc"></div>
      </div>
    `;
    document.body.appendChild(toast);
  }

  const desc = document.getElementById('siteToastDesc');
  if (desc) desc.innerText = message;

  toast.classList.add('show');
  setTimeout(() => {
    toast.classList.remove('show');
  }, 6000);
}
