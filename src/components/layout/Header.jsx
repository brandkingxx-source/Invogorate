import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ChefHat, Instagram, Menu, X } from "lucide-react";
import { NAV_LINKS, AUDIT_METADATA } from "../../data/siteData";
import MagneticButton from "../animations/MagneticButton";

export default function Header({ onBookClick }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [location.pathname]);

  return (
    <>
      <motion.header
        className={`site-header ${scrolled ? "site-header--scrolled" : ""}`}
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="container header-inner">
          <Link to="/" className="brand-lockup">
            <motion.img
              src="/Logo.jpeg"
              alt="Invigourate Catering Logo"
              className="brand-logo"
              whileHover={{ scale: 1.05, rotate: 3 }}
              transition={{ type: "spring", stiffness: 400 }}
            />
            <div>
              <span className="brand-name">INVIGOURATE</span>
              <span className="brand-tag">Wholefoods & Organic Catering</span>
            </div>
          </Link>

          <nav className="desktop-nav" aria-label="Main navigation">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`nav-link ${location.pathname === link.path ? "nav-link--active" : ""}`}
              >
                {link.label}
                {location.pathname === link.path && (
                  <motion.span
                    layoutId="nav-underline"
                    className="nav-underline"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </Link>
            ))}
          </nav>

          <div className="header-actions">
            <MagneticButton
              href={AUDIT_METADATA.contact.instagramUrl}
              className="btn-ghost btn-sm hide-mobile"
            >
              <Instagram size={16} /> {AUDIT_METADATA.contact.instagram}
            </MagneticButton>
            <MagneticButton className="btn-primary btn-sm" onClick={onBookClick}>
              <ChefHat size={16} /> Book Us
            </MagneticButton>
            <button
              type="button"
              className="mobile-menu-btn"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
            >
              {menuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="mobile-drawer"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          >
            <nav className="mobile-nav">
              {NAV_LINKS.map((link, i) => (
                <motion.div
                  key={link.path}
                  initial={{ opacity: 0, x: -24 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06 }}
                >
                  <Link
                    to={link.path}
                    className={`mobile-nav-link ${location.pathname === link.path ? "active" : ""}`}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <MagneticButton
                href={AUDIT_METADATA.contact.instagramUrl}
                className="btn-accent mobile-dm-btn"
              >
                <Instagram size={18} /> DM on Instagram
              </MagneticButton>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
