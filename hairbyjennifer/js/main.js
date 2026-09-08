document.addEventListener('DOMContentLoaded', () => {
  // Before / After Slider Interaction
  const sliderInput = document.getElementById('baRange');
  const afterLayer = document.querySelector('.ba-layer-after');
  const handleLine = document.querySelector('.ba-handle-line');

  if (sliderInput && afterLayer && handleLine) {
    const updateSlider = (val) => {
      // Invert for inset left clip-path or use width
      afterLayer.style.clipPath = `inset(0 0 0 ${val}%)`;
      handleLine.style.left = `${val}%`;
    };

    sliderInput.addEventListener('input', (e) => {
      updateSlider(e.target.value);
    });
  }

  // Service Menu Category Tabs
  const tabBtns = document.querySelectorAll('.tab-btn');
  const serviceGroups = document.querySelectorAll('.menu-group');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      tabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const targetCategory = btn.dataset.category;

      serviceGroups.forEach(group => {
        if (targetCategory === 'all' || group.dataset.category === targetCategory) {
          group.style.display = 'block';
        } else {
          group.style.display = 'none';
        }
      });
    });
  });

  // Mobile navigation toggle
  const mobileToggle = document.querySelector('.mobile-toggle');
  const navMenu = document.querySelector('.nav-menu');

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      navMenu.classList.toggle('mobile-open');
    });

    const navLinks = navMenu.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('mobile-open');
      });
    });
  }

  // FAQ Accordion Interaction
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    if (question) {
      question.addEventListener('click', () => {
        const isOpen = item.classList.contains('active');
        faqItems.forEach(i => i.classList.remove('active'));
        if (!isOpen) {
          item.classList.add('active');
        }
      });
    }
  });

  // Booking Form Submission feedback
  const bookingForm = document.getElementById('bookingForm');
  if (bookingForm) {
    bookingForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = bookingForm.querySelector('.btn-submit');
      const originalText = btn.innerHTML;
      btn.innerHTML = `<span>✓ Request Sent to Jennifer!</span>`;
      btn.style.background = '#2e7d32';

      setTimeout(() => {
        alert('Thank you for reaching out! Jennifer will review her private studio calendar and text or call you shortly to confirm your appointment.');
        bookingForm.reset();
        btn.innerHTML = originalText;
        btn.style.background = '';
      }, 600);
    });
  }
});
