import { Instagram, ShoppingBag, ArrowRight, BookOpen } from "lucide-react";
import { motion } from "framer-motion";
import {
  BEAUTY_PRODUCTS,
  AUDIT_METADATA,
  JOURNAL_FEATURES,
  VIDEO_MEDIA,
  VIDEO_POSTERS,
} from "../data/siteData";
import SplitText from "../components/animations/SplitText";
import Reveal from "../components/animations/Reveal";
import MagneticButton from "../components/animations/MagneticButton";
import VideoReel from "../components/animations/VideoReel";

export default function ShopPage() {
  return (
    <div className="page page--shop">
      <section className="page-hero page-hero--compact">
        <div className="page-hero-bg">
          <img
            src="https://images.pexels.com/photos/1482803/pexels-photo-1482803.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
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
                src="https://images.pexels.com/photos/2083163/pexels-photo-2083163.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
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

      {/* ── From the journal ── */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <Reveal>
              <span className="section-eyebrow">The Journal</span>
              <SplitText text="Recipes, Retreats & Wholefood Thinking" className="section-title" />
            </Reveal>
            <Reveal delay={0.1}>
              <MagneticButton href={AUDIT_METADATA.contact.instagramUrl} className="btn-outline">
                <BookOpen size={16} /> More on Instagram
              </MagneticButton>
            </Reveal>
          </div>

          <VideoReel
            src={VIDEO_MEDIA.journalReel}
            poster={VIDEO_POSTERS.journalReel}
            title="From the Invigourate Kitchen"
            subtitle="Garden-led prep · Seed-oil free · Organic"
            badge="Journal Reel"
          />

          <div className="journal-grid" style={{ marginTop: "48px" }}>
            {JOURNAL_FEATURES.map((post, i) => (
              <Reveal key={post.title} delay={(i % 3) * 0.1} direction="up">
                <motion.article
                  className="journal-card"
                  whileHover={{ y: -8 }}
                  transition={{ type: "spring", stiffness: 260, damping: 22 }}
                >
                  <div className="journal-card-img">
                    <motion.img
                      src={post.image}
                      alt={post.title}
                      loading="lazy"
                      whileHover={{ scale: 1.06 }}
                      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    />
                    <span className="journal-card-category">{post.category}</span>
                  </div>
                  <div className="journal-card-body">
                    <h4>{post.title}</h4>
                    <p>{post.excerpt}</p>
                    <ul className="journal-points">
                      {post.points.map((pt) => (
                        <li key={pt}>{pt}</li>
                      ))}
                    </ul>
                    <span className="card-link">
                      Read the Story <ArrowRight size={14} />
                    </span>
                  </div>
                </motion.article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
