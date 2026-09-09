/**
 * Daytona Golf Club - Modern Rescue Mockup Logic
 * Prepared by RetroFit Web Design (Cole Fuller)
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Mobile Menu Toggle
  const menuToggle = document.querySelector('.menu-toggle');
  const mobileDrawer = document.getElementById('mobile-drawer');
  const drawerClose = document.getElementById('drawer-close');

  if (menuToggle && mobileDrawer) {
    menuToggle.addEventListener('click', () => {
      mobileDrawer.style.display = mobileDrawer.style.display === 'flex' ? 'none' : 'flex';
    });
  }

  if (drawerClose && mobileDrawer) {
    drawerClose.addEventListener('click', () => {
      mobileDrawer.style.display = 'none';
    });
  }

  // Close mobile drawer when clicking any link
  document.querySelectorAll('.drawer-link').forEach(link => {
    link.addEventListener('click', () => {
      if (mobileDrawer) mobileDrawer.style.display = 'none';
    });
  });

  // 2. Interactive 2026 Golf Rate Calculator
  const calcPlayers = document.getElementById('calc-players');
  const calcHoles = document.getElementById('calc-holes');
  const calcDay = document.getElementById('calc-day');
  const calcCart = document.getElementById('calc-cart');
  const calcCategory = document.getElementById('calc-category');
  const calcTotalDisplay = document.getElementById('calc-total');
  const calcPerPersonDisplay = document.getElementById('calc-per-person');

  function calculateRates() {
    if (!calcPlayers || !calcHoles || !calcDay || !calcCart || !calcCategory) return;

    const players = parseInt(calcPlayers.value) || 1;
    const holes = calcHoles.value; // '18', '9', '5'
    const day = calcDay.value; // 'weekday', 'weekend'
    const cart = calcCart.value === 'ride';
    const category = calcCategory.value; // 'regular', 'senior', 'junior'

    let baseRate = 0;

    if (holes === '5') {
      // 5-Hole Loop
      baseRate = cart ? 26.00 : 16.00;
    } else if (category === 'senior') {
      // Senior (55+) M-F before 2pm, Sat/Sun after 2pm
      if (holes === '18') {
        baseRate = cart ? 44.00 : 28.50;
      } else {
        baseRate = cart ? 32.00 : 22.00;
      }
    } else if (category === 'junior') {
      // Junior (18 & under)
      if (holes === '18') {
        baseRate = cart ? 41.00 : 23.00;
      } else {
        baseRate = cart ? 29.00 : 18.00;
      }
    } else {
      // Regular Adult
      if (day === 'weekday') {
        if (holes === '18') {
          baseRate = cart ? 56.50 : 38.50;
        } else {
          baseRate = cart ? 38.00 : 26.00;
        }
      } else {
        // Weekend / Holiday before 1pm
        if (holes === '18') {
          baseRate = cart ? 61.50 : 43.50;
        } else {
          baseRate = cart ? 47.00 : 32.00;
        }
      }
    }

    const total = baseRate * players;
    calcPerPersonDisplay.textContent = `$${baseRate.toFixed(2)}`;
    calcTotalDisplay.textContent = `$${total.toFixed(2)}`;
  }

  [calcPlayers, calcHoles, calcDay, calcCart, calcCategory].forEach(el => {
    if (el) el.addEventListener('change', calculateRates);
  });
  calculateRates();

  // 3. Contact Form Submission Feedback
  const contactForm = document.getElementById('inquiry-form');
  const formSuccess = document.getElementById('form-success');

  if (contactForm && formSuccess) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      contactForm.style.display = 'none';
      formSuccess.style.display = 'block';
    });
  }

  // 4. Booking Modal Helper
  const bookingModal = document.getElementById('booking-modal');
  const openModalBtns = document.querySelectorAll('.trigger-booking-modal');
  const closeModalBtn = document.getElementById('modal-close');

  openModalBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      if (bookingModal) {
        bookingModal.classList.add('active');
      }
    });
  });

  if (closeModalBtn && bookingModal) {
    closeModalBtn.addEventListener('click', () => {
      bookingModal.classList.remove('active');
    });
  }

  if (bookingModal) {
    bookingModal.addEventListener('click', (e) => {
      if (e.target === bookingModal) {
        bookingModal.classList.remove('active');
      }
    });
  }
});
