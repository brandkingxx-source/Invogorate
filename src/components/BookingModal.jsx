import { useState, useEffect } from "react";
import { X, Instagram, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { AUDIT_METADATA } from "../data/siteData";
import MagneticButton from "./animations/MagneticButton";

export default function BookingModal({ isOpen, onClose }) {
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (isOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 2500);
  };

  return (
    <AnimatePresence>
      <motion.div
        className="modal-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="booking-modal"
          initial={{ opacity: 0, y: 32, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 16 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          onClick={(e) => e.stopPropagation()}
        >
          <button type="button" className="modal-close modal-close--abs" onClick={onClose}>
            <X size={20} />
          </button>

          {submitted ? (
            <div className="booking-success">
              <CheckCircle2 size={48} color="var(--brand-sage)" />
              <h3>Request Received!</h3>
              <p>
                For fastest booking, also send us a DM on Instagram at{" "}
                <strong>{AUDIT_METADATA.contact.instagram}</strong>
              </p>
            </div>
          ) : (
            <>
              <span className="section-eyebrow">Private Chef & Catering</span>
              <h3>Book Invigourate</h3>
              <p className="booking-note">
                {AUDIT_METADATA.contact.bookingMethod}. Fill in your details below and we'll follow up via Instagram.
              </p>

              <form onSubmit={handleSubmit} className="booking-form">
                <input required type="text" placeholder="Full Name" />
                <input required type="text" placeholder="Instagram Handle (optional)" />
                <select defaultValue="Retreat Chef">
                  <option>Retreat Private Chef</option>
                  <option>Private Dining Experience</option>
                  <option>Festival / Corporate Pop-Up</option>
                  <option>Other Event</option>
                </select>
                <input required type="text" placeholder="Event Date & Location" />
                <textarea rows={3} placeholder="Guest count, dietary requirements & notes..." required />
                <button type="submit" className="btn-primary btn-full">
                  Submit Booking Request
                </button>
              </form>

              <div className="booking-divider">or</div>

              <MagneticButton href={AUDIT_METADATA.contact.instagramUrl} className="btn-accent btn-full">
                <Instagram size={18} /> DM {AUDIT_METADATA.contact.instagram}
              </MagneticButton>
            </>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
