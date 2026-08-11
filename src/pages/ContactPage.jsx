import { useState } from "react";
import { Instagram, ChevronDown, ExternalLink } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { AUDIT_METADATA, FAQ_DATA } from "../data/siteData";
import SplitText from "../components/animations/SplitText";
import Reveal from "../components/animations/Reveal";
import MagneticButton from "../components/animations/MagneticButton";

export default function ContactPage() {
  const [openFaq, setOpenFaq] = useState(null);
  const [formSent, setFormSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormSent(true);
    setTimeout(() => setFormSent(false), 3000);
  };

  return (
    <div className="page page--contact">
      <section className="page-hero page-hero--compact">
        <div className="page-hero-bg">
          <img
            src="https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1600&q=80"
            alt=""
            aria-hidden="true"
          />
        </div>
        <div className="container page-hero-content">
          <span className="section-eyebrow section-eyebrow--light">Get In Touch</span>
          <SplitText text="Contact Invigourate Catering" className="page-hero-title" />
          <p>{AUDIT_METADATA.contact.bookingMethod}</p>
        </div>
      </section>

      <section className="section">
        <div className="container contact-grid">
          <Reveal direction="left" className="contact-primary">
            <div className="contact-card contact-card--featured">
              <Instagram size={32} color="var(--brand-accent)" />
              <h3>Instagram — Primary Contact</h3>
              <p>
                As listed in our profile: send a direct message to book retreats, private chef services,
                festival pop-ups, or product orders.
              </p>
              <a
                href={AUDIT_METADATA.contact.instagramUrl}
                target="_blank"
                rel="noreferrer"
                className="contact-handle"
              >
                {AUDIT_METADATA.contact.instagram}
                <ExternalLink size={16} />
              </a>
              <MagneticButton href={AUDIT_METADATA.contact.instagramUrl} className="btn-accent btn-full">
                <Instagram size={18} /> Open Instagram & DM Us
              </MagneticButton>
            </div>

            <div className="contact-card">
              <h4>Business Details</h4>
              <dl className="contact-details">
                <div>
                  <dt>Account</dt>
                  <dd>{AUDIT_METADATA.accountName}</dd>
                </div>
                <div>
                  <dt>Category</dt>
                  <dd>{AUDIT_METADATA.contact.category}</dd>
                </div>
                <div>
                  <dt>Instagram</dt>
                  <dd>
                    <a href={AUDIT_METADATA.contact.instagramUrl} target="_blank" rel="noreferrer">
                      {AUDIT_METADATA.contact.instagram}
                    </a>
                  </dd>
                </div>
                <div>
                  <dt>Booking</dt>
                  <dd>{AUDIT_METADATA.contact.bookingMethod}</dd>
                </div>
              </dl>
            </div>
          </Reveal>

          <Reveal direction="right" className="contact-form-wrap">
            <div className="contact-card">
              <h3>Send a Message</h3>
              <p className="text-muted" style={{ marginBottom: "20px" }}>
                We'll receive your inquiry and follow up via Instagram DM at{" "}
                {AUDIT_METADATA.contact.instagram}.
              </p>

              {formSent ? (
                <div className="form-success">
                  <p>Message sent! For fastest response, also DM us on Instagram.</p>
                  <MagneticButton href={AUDIT_METADATA.contact.instagramUrl} className="btn-accent btn-full">
                    <Instagram size={16} /> DM Now
                  </MagneticButton>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="contact-form">
                  <input required type="text" placeholder="Your Name" />
                  <input type="text" placeholder="Your Instagram Handle" />
                  <select defaultValue="Catering Inquiry">
                    <option>Catering Inquiry</option>
                    <option>Retreat Private Chef</option>
                    <option>Product Order</option>
                    <option>Recipe Question</option>
                    <option>Other</option>
                  </select>
                  <textarea required rows={5} placeholder="Tell us about your event or inquiry..." />
                  <button type="submit" className="btn-primary btn-full">
                    Send Message
                  </button>
                </form>
              )}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section section--cream">
        <div className="container">
          <Reveal className="text-center section-intro">
            <SplitText text="Frequently Asked Questions" className="section-title" />
          </Reveal>

          <div className="faq-list">
            {FAQ_DATA.map((item, i) => (
              <Reveal key={item.q} delay={i * 0.06}>
                <div className={`faq-item ${openFaq === i ? "faq-item--open" : ""}`}>
                  <button
                    type="button"
                    className="faq-question"
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  >
                    {item.q}
                    <motion.span animate={{ rotate: openFaq === i ? 180 : 0 }}>
                      <ChevronDown size={20} />
                    </motion.span>
                  </button>
                  <AnimatePresence>
                    {openFaq === i && (
                      <motion.div
                        className="faq-answer"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                      >
                        <p>{item.a}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
