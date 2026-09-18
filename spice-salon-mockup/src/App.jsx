import React, { useEffect, useState, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { MapPin, Phone, ArrowRight, Menu, X, Scissors } from 'lucide-react';
import './index.css';

// Animation Variants
const staggerContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15
    }
  }
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
};

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="container nav-container">
        <div className="nav-logo">
          <img src="/logo.png" alt="Spice Salon" className="custom-ss-logo" />
          <h1>Spice Salon</h1>
        </div>
        
        <div className="nav-links">
          <a href="#services" className="nav-link">Services</a>
          <a href="#contact" className="nav-link">Contact</a>
        </div>

        <div style={{display: 'flex', gap: '1rem', alignItems: 'center'}}>
          <a href="https://www.vagaro.com/spicesalon1" target="_blank" rel="noreferrer" className="btn btn-outline" style={{ display: window.innerWidth > 768 ? 'inline-flex' : 'none', padding: '0.6rem 1.5rem', fontSize: '0.75rem' }}>
            <span>Book</span>
          </a>
          <button className="btn-outline" style={{ border:'none', background:'none', color:'var(--text-primary)', cursor:'pointer', display: window.innerWidth > 768 ? 'none' : 'block'}} onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            style={{ position: 'absolute', top: '100%', left: 0, width: '100%', background: 'rgba(3,3,3,0.95)', padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.5rem', borderBottom: '1px solid var(--border-color)' }}
          >
            <a href="#services" onClick={() => setMobileMenuOpen(false)} style={{ color: 'var(--text-primary)', textTransform: 'uppercase', letterSpacing: '0.15em', fontSize: '0.9rem' }}>Services</a>
            <a href="#contact" onClick={() => setMobileMenuOpen(false)} style={{ color: 'var(--text-primary)', textTransform: 'uppercase', letterSpacing: '0.15em', fontSize: '0.9rem' }}>Contact</a>
            <a href="https://www.vagaro.com/spicesalon1" target="_blank" rel="noreferrer" className="btn btn-outline" style={{width: 'fit-content'}}>Book Now</a>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = () => {
  const { scrollY } = useScroll();
  const yImage = useTransform(scrollY, [0, 1000], [0, 250]);
  const opacityText = useTransform(scrollY, [0, 400], [1, 0]);

  return (
    <section className="hero container">
      <div className="hero-grid">
        <motion.div 
          className="hero-text"
          variants={staggerContainer}
          initial="hidden"
          animate="show"
          style={{ opacity: opacityText }}
        >
          <motion.h1 variants={fadeUp}>
            Modern Hair. <span className="gold">Refined.</span>
          </motion.h1>
          <motion.p variants={fadeUp}>
            A boutique luxury salon in Rogers, MN specializing in dimensional color, hand-painted balayage, and precision cutting.
          </motion.p>
          <motion.div variants={fadeUp}>
            <a href="https://www.vagaro.com/spicesalon1" target="_blank" rel="noreferrer" className="btn">
              <span>Book Appointment</span>
            </a>
          </motion.div>
        </motion.div>
        
        <motion.div 
          className="hero-image-wrapper"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <motion.img 
            style={{ y: yImage }}
            src="/hero.jpg" 
            alt="Spice Salon Interior" 
            className="hero-image"
          />
          <div className="hero-image-overlay"></div>
        </motion.div>
      </div>
    </section>
  );
};

const Services = () => {
  const services = [
    {
      title: 'Balayage & Color',
      price: 'From $180',
      description: 'Our signature service. Hand-painted, dimensional color tailored specifically to your skin tone and lifestyle. Designed to grow out seamlessly for a lived-in, effortless aesthetic.',
      image: '/service.jpg'
    },
    {
      title: 'Precision Cutting',
      price: 'From $65',
      description: 'More than just a trim. A bespoke haircutting experience focused on your unique bone structure and natural hair texture to create a shape that practically styles itself.',
      image: '/service2.jpg'
    }
  ];

  return (
    <section id="services" className="section-editorial">
      <div className="container">
        <div className="editorial-header">
          <motion.h2 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            The Menu
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            Curated Services
          </motion.p>
        </div>

        {services.map((service, index) => (
          <div className="service-row" key={index}>
            <motion.div 
              className="service-img-col"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="service-img-container">
                <img src={service.image} alt={service.title} />
              </div>
            </motion.div>
            
            <motion.div 
              className="service-info-col"
              variants={staggerContainer}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-100px" }}
            >
              <div className="service-info">
                <motion.h3 variants={fadeUp}>{service.title}</motion.h3>
                <motion.span variants={fadeUp} className="service-price">{service.price}</motion.span>
                <motion.p variants={fadeUp}>{service.description}</motion.p>
                <motion.div variants={fadeUp}>
                  <a href="https://www.vagaro.com/spicesalon1" target="_blank" rel="noreferrer" className="btn btn-outline">
                    <span>Reserve</span>
                  </a>
                </motion.div>
              </div>
            </motion.div>
          </div>
        ))}
      </div>
    </section>
  );
};

const Marquee = () => {
  return (
    <div className="marquee-container">
      <motion.div 
        className="marquee-text"
        animate={{ x: [0, -1000] }}
        transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
      >
        ELEVATE YOUR AESTHETIC &nbsp; • &nbsp; BOOK YOUR APPOINTMENT &nbsp; • &nbsp; ELEVATE YOUR AESTHETIC &nbsp; • &nbsp; BOOK YOUR APPOINTMENT
      </motion.div>
    </div>
  );
}

const Footer = () => {
  return (
    <footer id="contact" className="footer">
      <div className="container">
        <motion.div 
          className="footer-top"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2>Ready for a change?</h2>
          <a href="https://www.vagaro.com/spicesalon1" target="_blank" rel="noreferrer" className="btn">
            <span>Book Now</span>
          </a>
        </motion.div>

        <div className="footer-grid">
          <div className="footer-col">
            <h4>Spice Salon</h4>
            <p>A luxury boutique hair salon located in the heart of Rogers, MN.</p>
          </div>
          
          <div className="footer-col">
            <h4>Contact</h4>
            <p>Rogers, MN 55374</p>
            <p>(555) 123-4567</p>
            <a href="mailto:hello@spicesalon.mn">hello@spicesalon.mn</a>
          </div>
          
          <div className="footer-col">
            <h4>Hours</h4>
            <p>Tue - Thu: 9AM - 7PM</p>
            <p>Fri - Sat: 9AM - 3PM</p>
            <p>Sun - Mon: Closed</p>
          </div>

          <div className="footer-col">
            <h4>Socials</h4>
            <a href="https://www.instagram.com/spicesalon.mn" target="_blank" rel="noreferrer" style={{display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
              Instagram
            </a>
            <a href="https://www.facebook.com/profile.php?id=61566124961749" target="_blank" rel="noreferrer" style={{display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
              Facebook
            </a>
          </div>
        </div>
        
        <div className="footer-bottom">
          <span>&copy; {new Date().getFullYear()} Spice Salon.</span>
          <span>Designed with precision.</span>
        </div>
      </div>
    </footer>
  );
};

function App() {
  return (
    <>
      <div className="noise-overlay"></div>
      <div className="ambient-glow"></div>
      <Navbar />
      <main>
        <Hero />
        <Services />
        <Marquee />
      </main>
      <Footer />
    </>
  );
}

export default App;
