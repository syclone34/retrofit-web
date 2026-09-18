import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Paintbrush,
  Hammer,
  Home,
  ArrowRight,
  Phone,
  MapPin,
  CheckCircle2,
  Star,
  ShieldCheck,
  Sparkles,
  Clock,
  ChevronDown,
  DollarSign,
  SlidersHorizontal,
  Send,
  X,
  Award
} from 'lucide-react';
import './index.css';

export default function App() {
  const [isQuoteOpen, setIsQuoteOpen] = useState(false);

  return (
    <div className="app-wrapper">
      <TopBar />
      <Navbar onOpenQuote={() => setIsQuoteOpen(true)} />
      <main>
        <Hero onOpenQuote={() => setIsQuoteOpen(true)} />
        <TrustStrip />
        <BeforeAfterSlider />
        <Services onOpenQuote={() => setIsQuoteOpen(true)} />
        <Portfolio />
        <SavingsComparison onOpenQuote={() => setIsQuoteOpen(true)} />
        <MeetRachael onOpenQuote={() => setIsQuoteOpen(true)} />
        <Testimonials />
        <ServiceAreas />
        <FAQ />
        <QuoteBanner onOpenQuote={() => setIsQuoteOpen(true)} />
      </main>
      <Footer onOpenQuote={() => setIsQuoteOpen(true)} />

      <AnimatePresence>
        {isQuoteOpen && <QuoteModal onClose={() => setIsQuoteOpen(false)} />}
      </AnimatePresence>
    </div>
  );
}

/* ============================================================
   TOP BAR & NAVBAR
   ============================================================ */
function TopBar() {
  return (
    <div className="topbar">
      <div className="container topbar-container">
        <div className="topbar-left">
          <div className="topbar-item">
            <MapPin size={14} />
            <span>Serving Elk River, Rogers, St. Michael & NW Metro</span>
          </div>
          <div className="topbar-item">
            <Award size={14} />
            <span>100% Recommended on Facebook</span>
          </div>
        </div>
        <div className="topbar-right">
          <a href="tel:7633002920" className="topbar-phone">
            <Phone size={14} />
            <span>(763) 300-2920</span>
          </a>
        </div>
      </div>
    </div>
  );
}

function Navbar({ onOpenQuote }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="container nav-container">
        <a href="#" className="brand-logo">
          <div className="logo-monogram">SR</div>
          <div className="brand-text">
            <span className="brand-title">Simply Rachael</span>
            <span className="brand-subtitle">Custom Kitchens & Woodwork</span>
          </div>
        </a>

        <div className="nav-menu">
          <a href="#transformations">Transformations</a>
          <a href="#services">Services</a>
          <a href="#portfolio">Our Work</a>
          <a href="#comparison">Why Refinish</a>
          <a href="#about">Meet Rachael</a>
          <a href="#reviews">Reviews</a>
          <a href="#faq">FAQ</a>
        </div>

        <div className="nav-actions">
          <a href="tel:7633002920" className="btn-outline-gold" style={{ padding: '0.65rem 1.1rem', fontSize: '0.8rem' }}>
            <Phone size={14} /> Call Now
          </a>
          <button onClick={onOpenQuote} className="btn-gold" style={{ padding: '0.65rem 1.25rem', fontSize: '0.8rem' }}>
            Get a Quote
          </button>
        </div>
      </div>
    </nav>
  );
}

/* ============================================================
   HERO SECTION
   ============================================================ */
function Hero({ onOpenQuote }) {
  return (
    <section className="hero">
      <div className="hero-background-art">
        <img src="/hero.jpg" alt="Custom Kitchen Woodwork" />
      </div>

      <div className="container hero-grid">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="hero-badge">
            <Star size={14} className="star-icon" fill="#f59e0b" />
            <span>100% Recommendation Rate • 5-Star Facebook Contractor</span>
          </div>

          <h1 className="hero-title">
            High-End Custom Kitchens. <br />
            <span className="gold-text">Without The High-End Cost.</span>
          </h1>

          <p className="hero-description">
            We specialize in transformational kitchen cabinet makeovers, woodwork painting, and staircase railing refinishing across Elk River and the NW Twin Cities. Factory-durable craftsmanship at a fraction of full replacement.
          </p>

          <div className="hero-cta-group">
            <button onClick={onOpenQuote} className="btn-gold">
              Get Your Free Estimate <ArrowRight size={16} />
            </button>
            <a href="#transformations" className="btn-outline-gold">
              View Before & Afters
            </a>
          </div>

          <div className="hero-stats-row">
            <div className="stat-item">
              <span className="stat-number">75%</span>
              <span className="stat-label">Saved vs. New Cabinets</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">3-5 Days</span>
              <span className="stat-label">Average Project Turnaround</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">100%</span>
              <span className="stat-label">Satisfaction Guaranteed</span>
            </div>
          </div>
        </motion.div>

        <motion.div
          className="hero-card-wrapper"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="hero-card-glow"></div>
          <div className="hero-main-card">
            <div className="hero-floating-badge">
              <Sparkles size={14} /> Signature Refinishing
            </div>
            <img src="/hero.jpg" alt="Simply Rachael Custom Kitchen" className="hero-card-img" />
            <div className="hero-card-overlay">
              <div>
                <p className="hero-card-tag">Recent Transformation</p>
                <h3 className="hero-card-title">Custom Kitchen Island & Cabinets</h3>
              </div>
              <a href="#transformations" className="btn-outline-gold" style={{ padding: '0.45rem 0.9rem', fontSize: '0.75rem' }}>
                Explore
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ============================================================
   TRUST STRIP
   ============================================================ */
function TrustStrip() {
  const items = [
    {
      icon: <ShieldCheck size={22} />,
      title: 'Factory-Durable Hardened Enamel',
      desc: 'No brush strokes, chips, or yellowing'
    },
    {
      icon: <Clock size={22} />,
      title: 'Minimal Household Disruption',
      desc: 'Doors sprayed off-site in dust-free booths'
    },
    {
      icon: <DollarSign size={22} />,
      title: 'Fraction of Replacement Cost',
      desc: 'Keep your solid hardwood cabinets'
    },
    {
      icon: <MapPin size={22} />,
      title: 'Elk River & NW Metro Local',
      desc: 'Woman-owned & hands-on craftsmanship'
    }
  ];

  return (
    <div className="trust-strip">
      <div className="container">
        <div className="trust-grid">
          {items.map((item, idx) => (
            <div key={idx} className="trust-card">
              <div className="trust-icon-box">{item.icon}</div>
              <div className="trust-info">
                <h4>{item.title}</h4>
                <p>{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   INTERACTIVE BEFORE & AFTER SLIDER
   ============================================================ */
function BeforeAfterSlider() {
  const [sliderPos, setSliderPos] = useState(50);
  const containerRef = useRef(null);
  const isDragging = useRef(false);

  const handleMove = (clientX) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const pos = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPos(pos);
  };

  const handleTouchMove = (e) => {
    handleMove(e.touches[0].clientX);
  };

  const handleMouseDown = () => {
    isDragging.current = true;
  };

  useEffect(() => {
    const handleMouseUp = () => {
      isDragging.current = false;
    };
    const handleMouseMove = (e) => {
      if (isDragging.current) {
        handleMove(e.clientX);
      }
    };

    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <section id="transformations" className="transformation-section">
      <div className="container">
        <div className="section-header-center">
          <span className="section-eyebrow">Real Transformations</span>
          <h2 className="section-title">See The Difference In Every Detail</h2>
          <p className="section-subtitle">
            Don't rip out quality wood. Our industrial bonding primers and factory enamel finishes turn tired 90s woodwork into sleek, modern centerpieces.
          </p>
        </div>

        <div className="comparison-wrapper">
          <div className="comparison-meta-row">
            <div className="project-pill">
              <Sparkles size={14} /> Featured Project: St. Michael Staircase & Railing Makeover
            </div>
            <div className="comparison-stats-bar">
              <div className="c-stat">
                <span>Before:</span> <strong>Dated Honey Oak</strong>
              </div>
              <div className="c-stat">
                <span>After:</span> <strong>Modern Espresso & Crisp White</strong>
              </div>
              <div className="c-stat">
                <span>Client Saved:</span> <strong>~$7,500 vs New Railing</strong>
              </div>
            </div>
          </div>

          <div
            ref={containerRef}
            className="slider-container"
            onMouseDown={handleMouseDown}
            onTouchMove={handleTouchMove}
            onClick={(e) => handleMove(e.clientX)}
          >
            {/* Base Image (After) */}
            <img src="/service2.jpg" alt="After: Modern Staircase Railing Makeover" className="slider-img" />

            {/* Clipped Layer (Before) */}
            <div className="slider-after-layer" style={{ width: `${sliderPos}%` }}>
              <img
                src="/service1.jpg"
                alt="Before: Dated Oak Railing"
                style={{ width: containerRef.current ? `${containerRef.current.clientWidth}px` : '100%' }}
              />
            </div>

            {/* Divider Handle */}
            <div className="slider-divider" style={{ left: `${sliderPos}%` }}>
              <div className="slider-handle">
                <SlidersHorizontal size={18} />
              </div>
            </div>

            <div className="badge-tag badge-before">BEFORE (Honey Oak)</div>
            <div className="badge-tag badge-after">AFTER (Simply Rachael)</div>
          </div>

          <div className="slider-hint">
            <SlidersHorizontal size={14} /> Drag the gold slider left and right to reveal the full transformation
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   SERVICES SECTION (LIGHT EDITORIAL DESIGN)
   ============================================================ */
function Services({ onOpenQuote }) {
  const serviceList = [
    {
      icon: <Paintbrush size={28} />,
      title: 'Kitchen Cabinet Refinishing',
      desc: 'Give your dated oak, maple, or dark cherry cabinets an ultra-smooth, factory-grade finish in any custom color from Benjamin Moore or Sherwin-Williams.',
      features: [
        'Doors sprayed off-site in controlled booth',
        'Industrial bonding primer prevents peeling',
        'Cabinet bases meticulously hand-prepped',
        'New hardware & soft-close hinge installation'
      ]
    },
    {
      icon: <Hammer size={28} />,
      title: 'Staircase & Railing Makeovers',
      desc: 'Staircases are the focal point of your entryway. We paint oak spindles crisp white and stain or paint newel posts and handrails for a stunning architectural upgrade.',
      features: [
        'Two-tone designer contrast finishes',
        'Meticulous masking of carpet and flooring',
        'Ultra-durable, scuff-resistant enamel',
        'Completed in as little as 3 to 4 days'
      ]
    },
    {
      icon: <Home size={28} />,
      title: 'Vanities, Trim & Built-in Woodwork',
      desc: 'From bathroom vanities and laundry room cabinetry to fireplace mantels, window trim, and interior doors, we renew every wooden feature in your home.',
      features: [
        'Bathroom & powder room vanity updates',
        'Fireplace mantel and surround refinishing',
        'Built-in bookshelves and entertainment centers',
        'Full home interior trim and door packages'
      ]
    }
  ];

  return (
    <section id="services" className="services-section">
      <div className="container">
        <div className="section-header-center">
          <span className="section-eyebrow">Our Specialization</span>
          <h2 className="section-title">Craftsmanship Dedicated to Detail</h2>
          <p className="section-subtitle">
            Every home update is personally executed with meticulous precision, premium coatings, and clean-jobsite respect.
          </p>
        </div>

        <div className="services-cards-grid">
          {serviceList.map((srv, idx) => (
            <motion.div
              key={idx}
              className="service-box"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
            >
              <div className="service-box-icon">{srv.icon}</div>
              <h3>{srv.title}</h3>
              <p>{srv.desc}</p>
              <ul className="service-features-list">
                {srv.features.map((feat, fIdx) => (
                  <li key={fIdx}>
                    <CheckCircle2 size={16} /> {feat}
                  </li>
                ))}
              </ul>
              <button onClick={onOpenQuote} className="service-action-link">
                Request a Quote for this <ArrowRight size={14} />
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   PORTFOLIO SHOWCASE
   ============================================================ */
function Portfolio() {
  const [filter, setFilter] = useState('all');

  const galleryItems = [
    {
      category: 'railings',
      title: 'Modern Two-Tone Railing Makeover',
      location: 'St. Michael, MN',
      img: '/service2.jpg'
    },
    {
      category: 'kitchens',
      title: 'Custom Rustic Kitchen Island & Granite',
      location: 'Elk River, MN',
      img: '/hero.jpg'
    },
    {
      category: 'railings',
      title: 'Grand Entryway Staircase Transformation',
      location: 'Otsego, MN',
      img: '/railing_staircase.jpg'
    },
    {
      category: 'railings',
      title: 'St. Michael Open Staircase Angle',
      location: 'St. Michael, MN',
      img: '/railing_after_angle.jpg'
    },
    {
      category: 'railings',
      title: 'Original Honey Oak Railing (Before)',
      location: 'St. Michael, MN',
      img: '/service1.jpg'
    },
    {
      category: 'kitchens',
      title: 'Signature Kitchen Island & Hardwood',
      location: 'Rogers, MN',
      img: '/hero.jpg'
    }
  ];

  const filtered = filter === 'all' ? galleryItems : galleryItems.filter((i) => i.category === filter);

  return (
    <section id="portfolio" className="portfolio-section">
      <div className="container">
        <div className="section-header-center">
          <span className="section-eyebrow">Project Gallery</span>
          <h2 className="section-title">Recent Work Across the NW Metro</h2>
          <p className="section-subtitle">
            Take a look at genuine projects completed for our Minnesota neighbors. Every project is backed by our signature warranty and factory-smooth standard.
          </p>
        </div>

        <div className="portfolio-filter-tabs">
          <button className={`tab-btn ${filter === 'all' ? 'active' : ''}`} onClick={() => setFilter('all')}>
            All Projects
          </button>
          <button className={`tab-btn ${filter === 'kitchens' ? 'active' : ''}`} onClick={() => setFilter('kitchens')}>
            Kitchen Cabinets
          </button>
          <button className={`tab-btn ${filter === 'railings' ? 'active' : ''}`} onClick={() => setFilter('railings')}>
            Railings & Stairs
          </button>
          <button className={`tab-btn ${filter === 'vanities' ? 'active' : ''}`} onClick={() => setFilter('vanities')}>
            Vanities & Woodwork
          </button>
        </div>

        <div className="portfolio-masonry">
          {filtered.map((item, idx) => (
            <motion.div
              key={idx}
              className="portfolio-card"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
            >
              <div className="portfolio-thumb-wrapper">
                <img src={item.img} alt={item.title} />
                <div className="portfolio-overlay">
                  <span className="portfolio-meta-tag">{item.category}</span>
                  <h4 className="portfolio-title">{item.title}</h4>
                  <div className="portfolio-location">
                    <MapPin size={12} /> {item.location}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   SAVINGS COMPARISON
   ============================================================ */
function SavingsComparison({ onOpenQuote }) {
  const comparisonData = [
    {
      feature: 'Average Total Cost',
      simply: '$3,500 – $6,500',
      cabinet: '$22,000 – $45,000+'
    },
    {
      feature: 'Kitchen Downtime',
      simply: '3 to 5 Days (Kitchen stays functional)',
      cabinet: '4 to 8 Weeks (Full tear-out mess)'
    },
    {
      feature: 'Keeps High-Quality Hardwood',
      simply: 'Yes (Preserves solid oak / maple)',
      cabinet: 'No (Replaced with MDF / particle board)'
    },
    {
      feature: 'Plumbing & Countertops Safe',
      simply: '100% Untouched & Preserved',
      cabinet: 'Often requires new counters & sinks'
    },
    {
      feature: 'Durability & Cleanability',
      simply: 'Hardened commercial enamel finish',
      cabinet: 'Standard factory foil or laminate'
    }
  ];

  return (
    <section id="comparison" className="savings-section">
      <div className="container">
        <div className="section-header-center">
          <span className="section-eyebrow">Smart Home Investment</span>
          <h2 className="section-title">Why Refinish Instead of Replace?</h2>
          <p className="section-subtitle">
            Most 90s and 2000s homes have exceptional solid-wood cabinet boxes. Tearing them out wastes tens of thousands of dollars.
          </p>
        </div>

        <div className="comparison-table-wrapper">
          <div className="table-row table-header">
            <div>Comparison Point</div>
            <div style={{ color: 'var(--gold-light)' }}>Simply Rachael Refinishing</div>
            <div>Full Cabinet Replacement</div>
          </div>

          {comparisonData.map((row, idx) => (
            <div key={idx} className={`table-row ${idx === 0 ? 'highlight-row' : ''}`}>
              <div className="col-feature">{row.feature}</div>
              <div className="col-simply">
                <CheckCircle2 size={16} /> {row.simply}
              </div>
              <div className="col-cabinet">{row.cabinet}</div>
            </div>
          ))}
        </div>

        <div style={{ textAlign: 'center', marginTop: '3rem' }}>
          <button onClick={onOpenQuote} className="btn-gold">
            Calculate Your Kitchen Savings <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   MEET RACHAEL SECTION
   ============================================================ */
function MeetRachael({ onOpenQuote }) {
  return (
    <section id="about" className="about-section">
      <div className="container">
        <div className="about-grid">
          <div className="about-image-column">
            <div className="about-image-frame">
              <img src="/logo.jpg" alt="Rachael - Owner & Craftswoman at Simply Rachael" />
              <div className="about-image-caption">
                <span className="script-accent" style={{ fontSize: '2rem', display: 'block' }}>Simply Rachael</span>
                <span style={{ fontSize: '0.85rem', color: '#e5e7eb' }}>Elk River, Minnesota • Hands-On Contractor</span>
              </div>
            </div>
            <div className="about-badge-card">
              <div className="badge-icon">
                <Award size={22} />
              </div>
              <div>
                <h5>Locally Owned & Operated</h5>
                <p>Elk River, MN & Surrounding Areas</p>
              </div>
            </div>
          </div>

          <div className="about-text-column">
            <span className="section-eyebrow">The Artisan Behind the Brand</span>
            <h2>Meet Rachael</h2>
            <p className="about-narrative">
              I started <strong>Simply Rachael</strong> with a straightforward belief: every homeowner deserves a magazine-worthy, custom kitchen without taking out a second mortgage.
            </p>
            <p className="about-narrative">
              Too many contractors try to push full demolitions and cheap replacement cabinets. I believe in preserving the solid craftsmanship already in your home, elevating it with modern designer colors, durable multi-stage prep, and hardened enamel coatings that stand up to real family life.
            </p>

            <div className="quote-highlight">
              "I personally oversee every brush stroke and spray application. When I work in your home, I treat your kitchen and woodwork like it belongs to my own family."
            </div>

            <div className="about-checklist">
              <div className="about-checklist-item">
                <CheckCircle2 size={18} /> Licensed & Insured MN Contractor
              </div>
              <div className="about-checklist-item">
                <CheckCircle2 size={18} /> Free In-Home or Virtual Consultations
              </div>
              <div className="about-checklist-item">
                <CheckCircle2 size={18} /> Professional Dust-Free Spray Containment
              </div>
              <div className="about-checklist-item">
                <CheckCircle2 size={18} /> 100% 5-Star Recommendation Track Record
              </div>
            </div>

            <div style={{ display: 'flex', gap: '1.25rem', alignItems: 'center', flexWrap: 'wrap' }}>
              <button onClick={onOpenQuote} className="btn-gold">
                Schedule a Consultation with Rachael
              </button>
              <a href="tel:7633002920" className="btn-outline-gold">
                <Phone size={16} /> (763) 300-2920
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   REVIEWS & TESTIMONIALS
   ============================================================ */
function Testimonials() {
  const reviews = [
    {
      name: 'Sarah & Mark M.',
      location: 'St. Michael, MN',
      project: 'Staircase & Railing Makeover',
      quote:
        'Rachael transformed our ugly 90s orange oak staircase into the most gorgeous modern black-and-white feature in our home. We were quoted over $9,000 for replacement. Rachael did it in 3 days, spotless cleanup, and it looks like it belongs in Architectural Digest!'
    },
    {
      name: 'Jennifer K.',
      location: 'Elk River, MN',
      project: 'Full Kitchen Cabinet Refinishing',
      quote:
        'I was nervous about painting my oak cabinets because I had seen DIY peel jobs. Rachael’s process is industrial grade. Smooth as glass, no brush marks, and so durable with our three kids and two dogs. Simply Rachael is the real deal.'
    },
    {
      name: 'David & Lisa T.',
      location: 'Rogers, MN',
      project: 'Kitchen Island & Bathroom Vanity',
      quote:
        'Rachael is prompt, communicative, and insanely talented. She painted our kitchen island in a deep contrast navy and refreshed two bathroom vanities. Saved us thousands and increased our home appraisal instantly.'
    }
  ];

  return (
    <section id="reviews" className="reviews-section">
      <div className="container">
        <div className="section-header-center">
          <span className="section-eyebrow">Homeowner Feedback</span>
          <h2 className="section-title">Loved by Minnesota Homeowners</h2>
          <p className="section-subtitle">
            100% of our Facebook reviewers recommend Simply Rachael. Read how we transformed their everyday living spaces.
          </p>
        </div>

        <div className="reviews-grid">
          {reviews.map((rev, idx) => (
            <div key={idx} className="review-card">
              <div>
                <div className="review-stars">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={16} fill="#f59e0b" />
                  ))}
                </div>
                <p className="review-text">"{rev.quote}"</p>
              </div>
              <div className="reviewer-meta">
                <div>
                  <div className="reviewer-name">{rev.name}</div>
                  <div className="reviewer-location">{rev.location} • {rev.project}</div>
                </div>
                <div className="verified-badge">
                  <CheckCircle2 size={14} /> Verified Client
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   SERVICE AREAS
   ============================================================ */
function ServiceAreas() {
  const cities = [
    'Elk River, MN',
    'St. Michael, MN',
    'Albertville, MN',
    'Rogers, MN',
    'Otsego, MN',
    'Ramsey, MN',
    'Monticello, MN',
    'Big Lake, MN',
    'Zimmerman, MN',
    'Nowthen, MN',
    'Maple Grove, MN',
    'Anoka, MN'
  ];

  return (
    <section className="service-areas-section">
      <div className="container" style={{ textAlign: 'center' }}>
        <span className="section-eyebrow">Local Service Radius</span>
        <h3 style={{ fontSize: '2.4rem', color: '#ffffff', marginBottom: '0.75rem' }}>
          Proudly Serving The Northwest Twin Cities Metro
        </h3>
        <p style={{ color: 'var(--text-light-muted)', maxWidth: '650px', margin: '0 auto' }}>
          Based centrally in Elk River, MN (55330), we provide on-site estimates and turnkey cabinet refinishing across Wright, Sherburne, and Hennepin counties.
        </p>

        <div className="areas-pills-wrap">
          {cities.map((city, idx) => (
            <div key={idx} className="area-pill">
              <MapPin size={14} /> {city}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   FAQ ACCORDION
   ============================================================ */
function FAQ() {
  const [openIdx, setOpenIdx] = useState(0);

  const faqs = [
    {
      q: 'Will the painted finish chip or peel over time?',
      a: 'No. We do not use ordinary latex wall paint. We utilize a multi-stage industrial coating system starting with heavy-duty bonding primer and finishing with catalyzed, hardened commercial enamel. This creates an impermeable, washable, and chemical-resistant barrier identical to factory cabinet manufacturing.'
    },
    {
      q: 'How long does a typical kitchen cabinet makeover take?',
      a: 'Most kitchen makeovers take only 3 to 5 business days from start to finish. Cabinet doors and drawer fronts are removed and sprayed in our off-site dust-controlled booth, while face frames and islands are prepped and sprayed in your home with zero-dust containment.'
    },
    {
      q: 'Do I have to empty out my cabinet interiors?',
      a: 'In most cases, no! Because only the exterior face frames, doors, and drawer fronts are being prepped and sprayed, you can usually leave your everyday dishes, food, and pots right inside your cabinets during the process.'
    },
    {
      q: 'Can you fill grain in heavy oak cabinets?',
      a: 'Yes! Dated 90s oak has deep prominent grain. We offer grain-fill packages that smooth out the oak texture prior to priming, resulting in a sleek modern flat-shaker appearance.'
    },
    {
      q: 'Can you install new handles, knobs, or soft-close hinges?',
      a: 'Absolutely. We can fill old hardware holes, drill for modern pulls or bar handles, and upgrade your doors with soft-close hidden hinges for a true luxury feel.'
    }
  ];

  return (
    <section id="faq" className="faq-section">
      <div className="container">
        <div className="section-header-center">
          <span className="section-eyebrow">Common Questions</span>
          <h2 className="section-title">Everything You Need to Know</h2>
          <p className="section-subtitle">
            Have questions about the cabinet or railing transformation process? Here are answers to our most frequent homeowner inquiries.
          </p>
        </div>

        <div className="faq-list">
          {faqs.map((f, idx) => (
            <div key={idx} className={`faq-item ${openIdx === idx ? 'active' : ''}`}>
              <button
                className="faq-question"
                onClick={() => setOpenIdx(openIdx === idx ? -1 : idx)}
              >
                <span>{f.q}</span>
                <ChevronDown size={20} />
              </button>
              {openIdx === idx && <div className="faq-answer">{f.a}</div>}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   CALL TO ACTION BANNER
   ============================================================ */
function QuoteBanner({ onOpenQuote }) {
  return (
    <section className="quote-banner">
      <div className="container">
        <div className="banner-content">
          <span className="section-eyebrow">Ready For Your Dream Home?</span>
          <h2 className="banner-title">
            Transform Your Space This Month. <br />
            <span className="gold-text">Save Thousands vs. Replacement.</span>
          </h2>
          <p className="banner-subtitle">
            Get in touch with Rachael today for a complimentary, no-pressure consultation and estimate for your kitchen, railing, or woodwork.
          </p>
          <div className="banner-actions">
            <button onClick={onOpenQuote} className="btn-gold">
              Get Your Free Estimate <ArrowRight size={16} />
            </button>
            <a href="tel:7633002920" className="btn-outline-gold">
              <Phone size={16} /> Call (763) 300-2920
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   FOOTER
   ============================================================ */
function Footer({ onOpenQuote }) {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-col">
            <div className="brand-logo" style={{ marginBottom: '1.25rem' }}>
              <div className="logo-monogram">SR</div>
              <div className="brand-text">
                <span className="brand-title">Simply Rachael</span>
                <span className="brand-subtitle">Custom Kitchens & Woodwork</span>
              </div>
            </div>
            <p style={{ color: 'var(--text-light-muted)', lineHeight: 1.7, marginBottom: '1.5rem' }}>
              High-end custom kitchen cabinet painting, staircase railing updates, and woodwork refinishing in Elk River, MN and the NW Twin Cities.
            </p>
            <div style={{ color: 'var(--gold-light)', fontWeight: 600, fontSize: '0.85rem' }}>
              Licensed & Insured Minnesota Contractor
            </div>
          </div>

          <div className="footer-col">
            <h4>Quick Links</h4>
            <ul>
              <li><a href="#transformations">Transformations</a></li>
              <li><a href="#services">Our Services</a></li>
              <li><a href="#portfolio">Recent Projects</a></li>
              <li><a href="#comparison">Cost Comparison</a></li>
              <li><a href="#about">About Rachael</a></li>
              <li><a href="#faq">Frequently Asked Questions</a></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Our Services</h4>
            <ul>
              <li><a href="#services">Kitchen Cabinet Painting</a></li>
              <li><a href="#services">Staircase & Railing Refinishing</a></li>
              <li><a href="#services">Bathroom Vanity Makeovers</a></li>
              <li><a href="#services">Laundry Room Cabinetry</a></li>
              <li><a href="#services">Hardware & Hinge Upgrades</a></li>
              <li><a href="#services">Trim & Interior Woodwork</a></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Contact Rachael</h4>
            <div className="footer-contact-list">
              <div className="footer-contact-item">
                <Phone size={16} />
                <div>
                  <a href="tel:7633002920" style={{ color: '#ffffff', fontWeight: 600 }}>
                    (763) 300-2920
                  </a>
                  <p style={{ fontSize: '0.78rem', color: 'var(--text-light-muted)' }}>Call or Text for Estimates</p>
                </div>
              </div>
              <div className="footer-contact-item">
                <MapPin size={16} />
                <div>
                  <span style={{ color: '#ffffff' }}>Elk River, MN 55330</span>
                  <p style={{ fontSize: '0.78rem', color: 'var(--text-light-muted)' }}>Serving All NW Metro Suburbs</p>
                </div>
              </div>
              <div style={{ marginTop: '0.5rem' }}>
                <button onClick={onOpenQuote} className="btn-gold" style={{ width: '100%', justifyContent: 'center' }}>
                  Request Estimate
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <div>
            © {new Date().getFullYear()} Simply Rachael Creations LLC. All Rights Reserved.
          </div>
          <div style={{ color: 'var(--gold-primary)' }}>
            100% Customer Recommendation Rate on Facebook
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ============================================================
   ESTIMATE REQUEST MODAL
   ============================================================ */
function QuoteModal({ onClose }) {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    city: 'Elk River',
    service: 'Kitchen Cabinets',
    timeline: 'Within 2-4 Weeks',
    notes: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <motion.div
        className="modal-dialog"
        onClick={(e) => e.stopPropagation()}
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
      >
        <button className="modal-close-btn" onClick={onClose}>
          <X size={20} />
        </button>

        {!submitted ? (
          <div>
            <div className="modal-header">
              <span className="section-eyebrow">Free & Fast Consultation</span>
              <h3>Get Your Project Estimate</h3>
              <p>
                Tell us about your home. Rachael will review your project details and get back to you with a personalized, no-obligation estimate.
              </p>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="form-grid-2">
                <div className="form-group">
                  <label className="form-label">Full Name *</label>
                  <input
                    type="text"
                    required
                    className="form-input"
                    placeholder="e.g. Sarah Miller"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Phone Number *</label>
                  <input
                    type="tel"
                    required
                    className="form-input"
                    placeholder="(763) 000-0000"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                </div>
              </div>

              <div className="form-grid-2">
                <div className="form-group">
                  <label className="form-label">Email Address *</label>
                  <input
                    type="email"
                    required
                    className="form-input"
                    placeholder="sarah@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Your City / Suburb</label>
                  <select
                    className="form-select"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  >
                    <option value="Elk River">Elk River, MN</option>
                    <option value="St. Michael">St. Michael, MN</option>
                    <option value="Albertville">Albertville, MN</option>
                    <option value="Rogers">Rogers, MN</option>
                    <option value="Otsego">Otsego, MN</option>
                    <option value="Ramsey">Ramsey, MN</option>
                    <option value="Monticello">Monticello, MN</option>
                    <option value="Big Lake">Big Lake, MN</option>
                    <option value="Zimmerman">Zimmerman, MN</option>
                    <option value="Other">Other NW Metro Area</option>
                  </select>
                </div>
              </div>

              <div className="form-grid-2">
                <div className="form-group">
                  <label className="form-label">Service Needed</label>
                  <select
                    className="form-select"
                    value={formData.service}
                    onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                  >
                    <option value="Kitchen Cabinets">Kitchen Cabinet Refinishing</option>
                    <option value="Staircase & Railing">Staircase & Railing Makeover</option>
                    <option value="Bathroom Vanity">Bathroom / Laundry Vanity</option>
                    <option value="Full Woodwork Package">Whole Home Woodwork / Trim</option>
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">Desired Timeline</label>
                  <select
                    className="form-select"
                    value={formData.timeline}
                    onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
                  >
                    <option value="Immediately">As soon as possible</option>
                    <option value="Within 2-4 Weeks">Within 2 to 4 weeks</option>
                    <option value="1-2 Months">Next 1 to 2 months</option>
                    <option value="Planning Ahead">Just gathering quotes</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Project Details (e.g. approximate cabinet doors or wood type)</label>
                <textarea
                  className="form-textarea"
                  rows={3}
                  placeholder="Tell us about your space (honey oak, dark cherry, desired white/navy color, etc.)"
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                ></textarea>
              </div>

              <button type="submit" className="btn-gold" style={{ width: '100%', justifyContent: 'center', marginTop: '0.5rem' }}>
                <Send size={16} /> Send Estimate Request
              </button>

              <p style={{ textAlign: 'center', fontSize: '0.78rem', color: 'var(--text-light-muted)', marginTop: '1rem' }}>
                🔒 Your information is confidential. We never spam or share your contact details.
              </p>
            </form>
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: '2rem 1rem' }}>
            <div
              style={{
                width: '64px',
                height: '64px',
                borderRadius: '50%',
                background: 'rgba(34, 197, 94, 0.15)',
                border: '2px solid #22c55e',
                color: '#22c55e',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1.5rem'
              }}
            >
              <CheckCircle2 size={36} />
            </div>
            <h3 style={{ fontSize: '2.2rem', color: '#ffffff', marginBottom: '0.75rem' }}>
              Thank You, {formData.name || 'Friend'}!
            </h3>
            <p style={{ color: 'var(--text-light-muted)', fontSize: '1.05rem', lineHeight: 1.6, marginBottom: '2rem' }}>
              Your estimate request for <strong>{formData.service}</strong> in <strong>{formData.city}</strong> has been received. Rachael will reach out to you within 24 business hours to discuss your project and next steps!
            </p>
            <button onClick={onClose} className="btn-gold">
              Return to Website
            </button>
          </div>
        )}
      </motion.div>
    </div>
  );
}
