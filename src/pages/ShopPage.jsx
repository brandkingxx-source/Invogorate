import { Instagram, ShoppingBag } from "lucide-react";
import { motion } from "framer-motion";
import { BEAUTY_PRODUCTS, AUDIT_METADATA } from "../data/siteData";
import SplitText from "../components/animations/SplitText";
import Reveal from "../components/animations/Reveal";
import MagneticButton from "../components/animations/MagneticButton";

export default function ShopPage() {
  return (
    <div className="page page--shop">
      <section className="page-hero page-hero--compact">
        <div className="page-hero-bg">
          <img
            src="https://images.unsplash.com/photo-1596755389378-c31d37e6e281?auto=format&fit=crop&w=1600&q=80"
            alt=""
            aria-hidden="true"
          />
        </div>
        <div className="container page-hero-content">
          <span className="section-eyebrow section-eyebrow--light">Invigourate Shop</span>
          <SplitText text="Organic Skincare & Artisan Wholefoods" className="page-hero-title" />
          <p>
            Beyond catering — cold-pressed botanical skincare and seed-oil free baked goods, all handmade
            with organic ingredients.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <Reveal className="shop-notice">
            <ShoppingBag size={20} />
            <p>
              To order any product, send us a direct message on Instagram at{" "}
              <strong>{AUDIT_METADATA.contact.instagram}</strong>. We'll confirm availability and delivery.
            </p>
          </Reveal>

          <div className="card-grid card-grid--3">
            {BEAUTY_PRODUCTS.map((prod, i) => (
              <Reveal key={prod.title} delay={i * 0.1} direction="up">
                <motion.article className="shop-card" whileHover={{ y: -12 }}>
                  <div className="shop-card-img">
                    <img src={prod.image} alt={prod.title} />
                    <motion.div
                      className="shop-card-overlay"
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                    >
                      <MagneticButton
                        href={AUDIT_METADATA.contact.instagramUrl}
                        className="btn-accent btn-sm"
                      >
                        <Instagram size={16} /> Order via DM
                      </MagneticButton>
                    </motion.div>
                  </div>
                  <div className="shop-card-body">
                    <span className="badge-organic">{prod.badge}</span>
                    <h4>{prod.title}</h4>
                    <p>{prod.subtitle}</p>
                    <div className="shop-card-footer">
                      <span className="shop-price">{prod.price}</span>
                      <MagneticButton
                        href={AUDIT_METADATA.contact.instagramUrl}
                        className="btn-primary btn-sm"
                      >
                        Inquire
                      </MagneticButton>
                    </div>
                  </div>
                </motion.article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--cream">
        <div className="container split-section">
          <Reveal direction="left">
            <div className="split-image">
              <img
                src="https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=1200&q=80"
                alt="Artisan seed-oil free sourdough baked goods"
              />
            </div>
          </Reveal>
          <Reveal direction="right" className="split-text">
            <span className="section-eyebrow">Baked Goods</span>
            <h3 className="section-subtitle">Artisan Seed-Oil Free Sourdough</h3>
            <p>
              Our famous retreat table bread — fermented slow over 24 hours for optimal digestion. Focaccia,
              sourdough loaves, and seasonal baked goods available for events and private orders.
            </p>
            <MagneticButton href={AUDIT_METADATA.contact.instagramUrl} className="btn-outline">
              <Instagram size={16} /> Order Baked Goods
            </MagneticButton>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
