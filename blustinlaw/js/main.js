/**
 * BLUSTIN & ASSOCIATES, PLLC - INTERACTIVE CLIENT LOGIC
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Header scroll effect
  const header = document.querySelector('.site-header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // 2. Mobile menu toggle
  const mobileToggle = document.getElementById('mobileToggle');
  const navMenu = document.getElementById('navMenu');
  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      const isOpen = navMenu.classList.toggle('open');
      mobileToggle.setAttribute('aria-expanded', isOpen);
    });

    // Close menu when clicking links
    navMenu.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        mobileToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // 3. Practice Areas Category Filtering
  const tabButtons = document.querySelectorAll('.practice-tabs-bar .tab-btn');
  const practiceCards = document.querySelectorAll('.practice-grid .practice-card');

  tabButtons.forEach(button => {
    button.addEventListener('click', () => {
      tabButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');

      const targetCategory = button.getAttribute('data-filter');

      practiceCards.forEach(card => {
        const cardCategory = card.getAttribute('data-category');
        if (targetCategory === 'all' || cardCategory === targetCategory) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 20);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(10px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 250);
        }
      });
    });
  });

  // 4. Advisory Content Data & Modal
  const advisoryData = {
    pfml: {
      title: "Minnesota Paid Family & Medical Leave Act (PFML)",
      effective: "Effective: January 1, 2026 (Statutory Guidance)",
      body: `
        <p style="margin-bottom: 14px;">The Minnesota Paid Family and Medical Leave (PFML) Law represents one of the most substantial regulatory additions for Minnesota employers in decades. Beginning January 1, 2026, covered employers must participate in the state-administered paid leave program.</p>
        <h4 style="color: var(--gold-primary); margin: 16px 0 8px; font-size: 1.05rem;">Core Requirements for Employers:</h4>
        <ul style="padding-left: 20px; margin-bottom: 16px; color: var(--slate-300); display: flex; flex-direction: column; gap: 8px;">
          <li><strong>Wage Reporting & Premium Contributions:</strong> Required quarterly wage reporting and split premium schedules between employers and employees.</li>
          <li><strong>Up to 20 Weeks Total Leave:</strong> Eligible employees may qualify for up to 12 weeks of medical leave (own serious health condition) and up to 12 weeks of bonding/family care leave, capped at 20 weeks combined per 52-week benefit year.</li>
          <li><strong>Job Protection & Anti-Retaliation:</strong> Strict statutory provisions protecting an employee's exact or equivalent position upon return.</li>
          <li><strong>Private Plan Substitution:</strong> Employers may apply for an exemption by offering an approved private plan that meets or exceeds state statutory benefits.</li>
        </ul>
        <p style="font-size: 0.92rem; color: var(--slate-400); font-style: italic;">Need an operational policy audit or private plan compliance review? Contact Blustin & Associates for strategic business planning.</p>
      `
    },
    startup: {
      title: "Minnesota Start-Up & Entity Formation Roadmap",
      effective: "Comprehensive Checklist for Entrepreneurs",
      body: `
        <p style="margin-bottom: 14px;">Launching a new commercial venture requires diligent structural planning to shield personal assets and maximize tax and operational flexibility.</p>
        <h4 style="color: var(--gold-primary); margin: 16px 0 8px; font-size: 1.05rem;">Key Formation Steps:</h4>
        <ul style="padding-left: 20px; margin-bottom: 16px; color: var(--slate-300); display: flex; flex-direction: column; gap: 8px;">
          <li><strong>Entity Selection:</strong> Evaluating LLC vs. S-Corp vs. C-Corp based on capitalization, liability, and pass-through taxation.</li>
          <li><strong>Operating & Shareholder Agreements:</strong> Clear governance, voting thresholds, capital call obligations, and buy-sell provisions to prevent future owner deadlocks.</li>
          <li><strong>Intellectual Property Assignment:</strong> Ensuring all trademarks, proprietary code, product designs, and trade secrets are legally vested in the company.</li>
          <li><strong>State & Local Permitting:</strong> Obtaining state tax IDs, employer registration with DEED, municipal zoning approvals, and commercial licenses.</li>
        </ul>
        <p style="font-size: 0.92rem; color: var(--slate-400); font-style: italic;">Blustin & Associates guides start-ups through drafting customized, dispute-resistant foundational documents.</p>
      `
    },
    commercial_lease: {
      title: "Commercial Leases & Real Estate Transactions",
      effective: "Due Diligence Guide for Business Tenants & Buyers",
      body: `
        <p style="margin-bottom: 14px;">Commercial leases and property acquisitions are long-term capital commitments. Standard landlord-drafted lease agreements consistently favor the property owner unless heavily negotiated.</p>
        <h4 style="color: var(--gold-primary); margin: 16px 0 8px; font-size: 1.05rem;">Critical Terms to Scrutinize:</h4>
        <ul style="padding-left: 20px; margin-bottom: 16px; color: var(--slate-300); display: flex; flex-direction: column; gap: 8px;">
          <li><strong>CAM & Operating Expense Caps:</strong> Restricting controllable Common Area Maintenance expense increases and auditing calculation formulas.</li>
          <li><strong>Exclusivity & Use Restrictions:</strong> Protecting your retail or automotive footprint against direct competitors on the same parcel.</li>
          <li><strong>Personal Guarantees & Good Guy Clauses:</strong> Negotiating limited liability sunset provisions to protect personal estates.</li>
          <li><strong>Assignment & Subletting Rights:</strong> Essential flexibility if your business is acquired, merged, or needs to sublet excess square footage.</li>
        </ul>
        <p style="font-size: 0.92rem; color: var(--slate-400); font-style: italic;">Attorney Sholly Blustin provides rigorous contract review and lease negotiation before you sign.</p>
      `
    }
  };

  const modalBackdrop = document.getElementById('advisoryModal');
  const modalTitle = document.getElementById('modalTitle');
  const modalSubtitle = document.getElementById('modalSubtitle');
  const modalContent = document.getElementById('modalContent');
  const modalClose = document.getElementById('modalClose');

  document.querySelectorAll('.open-advisory-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const key = btn.getAttribute('data-advisory');
      const data = advisoryData[key];
      if (data && modalBackdrop) {
        modalTitle.textContent = data.title;
        modalSubtitle.textContent = data.effective;
        modalContent.innerHTML = data.body;
        modalBackdrop.classList.add('open');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  if (modalClose && modalBackdrop) {
    modalClose.addEventListener('click', () => {
      modalBackdrop.classList.remove('open');
      document.body.style.overflow = '';
    });

    modalBackdrop.addEventListener('click', (e) => {
      if (e.target === modalBackdrop) {
        modalBackdrop.classList.remove('open');
        document.body.style.overflow = '';
      }
    });
  }

  // 5. Consultation Form Handling
  const formsToHandle = [
    document.getElementById('consultForm'),
    document.getElementById('consultationForm')
  ].filter(Boolean);
  const toast = document.getElementById('toastNotice');

  formsToHandle.forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('clientName')?.value || document.getElementById('fullName')?.value || 'Client';
      const phone = document.getElementById('clientPhone')?.value || document.getElementById('phone')?.value || '';

      // Show toast
      if (toast) {
        toast.querySelector('.toast-text').innerHTML = `
          <strong>Inquiry Received!</strong><br>
          Thank you, ${name}. Attorney Sholly Blustin will review your inquiry and follow up at ${phone} promptly.
        `;
        toast.classList.add('show');
        setTimeout(() => {
          toast.classList.remove('show');
        }, 5000);
      }

      form.reset();
    });
  });

  // 6. About Us Bio Tabs Switching
  const aboutTabButtons = document.querySelectorAll('.about-tabs-nav .about-tab-btn');
  const aboutTabPanes = document.querySelectorAll('.about-tab-pane');

  if (aboutTabButtons.length && aboutTabPanes.length) {
    aboutTabButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        aboutTabButtons.forEach(b => b.classList.remove('active'));
        aboutTabPanes.forEach(pane => pane.classList.remove('active'));

        btn.classList.add('active');
        const targetId = btn.getAttribute('data-tab');
        const targetPane = document.getElementById(targetId);
        if (targetPane) {
          targetPane.classList.add('active');
        }
      });
    });
  }
});
