import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import {
  ArrowRight,
  ChefHat,
  Instagram,
  Leaf,
  Sparkles,
  Star,
  ShieldCheck,
} from "lucide-react";
import {
  AUDIT_METADATA,
  RECIPES_DATA,
  BEAUTY_PRODUCTS,
  AUDIT_TESTIMONIALS,
  CATERING_PACKAGES,
  VIDEO_MEDIA,
  VIDEO_POSTERS,
} from "../data/siteData";
import SplitText from "../components/animations/SplitText";
import Reveal from "../components/animations/Reveal";
import Marquee from "../components/animations/Marquee";
import ParallaxImage from "../components/animations/ParallaxImage";
import MagneticButton from "../components/animations/MagneticButton";
import TiltCard from "../components/animations/TiltCard";
import VideoReel from "../components/animations/VideoReel";
import Counter from "../components/animations/Counter";

const HERO_VIDEO = VIDEO_MEDIA.homeHero;
const REEL_VIDEO = VIDEO_MEDIA.chefsReel;
const REEL_POSTER = VIDEO_POSTERS.chefsReel;

// Photo gallery strip — more vibrant wholefood imagery on the home page
const GALLERY = [
  {
    src: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=900&q=80",
    alt: "Colourful organic bowl with fresh greens",
    label: "Garden bowls",
  },
  {
    src: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&w=900&q=80",
    alt: "Fresh seasonal vegetables on a wooden table",
    label: "Seasonal produce",
  },
  {
    src: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=900&q=80",
    alt: "Elegant plated wholefood dish",
    label: "Private dining",
  },
  {
    src: "https://images.unsplash.com/photo-1550581190-9c1c48d21d6c?auto=format&fit=crop&w=900&q=80",
    alt: "Wholesome breakfast table spread",
    label: "Retreat mornings",
  },
  {
    src: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=900&q=80",
    alt: "Vibrant vegan bowl with seeds and grains",
    label: "Seed-oil free",
  },
  {
    src: "https://images.unsplash.com/photo-1466637574441-749b8f19452f?auto=format&fit=crop&w=900&q=80",
    alt: "Healthy cooking ingredients arranged flat",
    label: "Wholefood kitchen",
  },
];

export default function HomePage({ onOpenRecipe, onBookClick }) {
  const heroRef = useRef(null);

  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const marqueeItems = [
    "100% Seed-Oil Free",
    "Organic Wholefoods",
    "5★ Hygiene Certified",
    "Vegan Catering",
    "Retreat Private Chef",
    "Festival Pop-Ups",
    "Cold-Pressed Oils Only",
    "DM to Book",
  ];

  return (
    <div className="home-page">
      {/* ── Hero ── */}
      <section className="hero" ref={heroRef}>
        {/* Ambient video background */}
        <div className="video-hero-bg">
          <video
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            aria-hidden="true"
            poster={VIDEO_POSTERS.homeHero}
            style={{ opacity: 0 }}
            onCanPlay={(e) => {
              e.currentTarget.style.opacity = 1;
            }}
          >
            <source src={HERO_VIDEO} type="video/mp4" />
          </video>
        </div>

        <div className="hero-glow hero-glow--1" />
        <div className="hero-glow hero-glow--2" />
        <div className="hero-grain" />

        <motion.div className="container hero-grid" style={{ y: heroY, opacity: heroOpacity }}>
          <div className="hero-content">
            <motion.div
              className="hero-chip"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              style={{ color: "white", background: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.22)", backdropFilter: "blur(12px)" }}
            >
              <Sparkles size={14} />
              {AUDIT_METADATA.hygieneRating} · {AUDIT_METADATA.guarantee}
            </motion.div>

            <SplitText
              text="Elevated Vegan Wholefoods & Private Chef Catering"
              as="h1"
              className="hero-title"
              delay={0.3}
              style={{ color: "white" }}
            />

            <motion.p
              className="hero-desc"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.7 }}
              style={{ color: "rgba(255,255,255,0.82)" }}
            >
              {AUDIT_METADATA.bio.replace(/\n/g, " ")}
            </motion.p>

            <motion.div
              className="hero-cta"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.7 }}
            >
              <MagneticButton className="btn-accent" onClick={() => onBookClick()}>
                <ChefHat size={18} /> Book Private Chef
              </MagneticButton>
              <Link to="/menus" className="btn-outline btn-outline--light">
                Explore Recipes <ArrowRight size={18} />
              </Link>
            </motion.div>
          </div>

          <motion.div
            className="hero-visual"
            initial={{ opacity: 0, x: 60, rotateY: -8 }}
            animate={{ opacity: 1, x: 0, rotateY: 0 }}
            transition={{ delay: 0.5, duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="hero-image-frame">
              <img
                src="https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=1200&q=80"
                alt="Vibrant organic wholefood spread by Invigourate"
                loading="eager"
              />
              <div className="hero-image-overlay">
                <span className="badge-seed-oil">Chef Spotlight</span>
                <h3>Golden Turmeric & Roasted Chickpea Curry</h3>
                <p>Anti-inflammatory wholefood spices · Seed-oil free</p>
              </div>
            </div>
            <motion.div
              className="hero-float-card"
              animate={{ y: [0, -12, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            >
              <Leaf size={20} color="var(--brand-sage)" />
              <div>
                <strong>Organic Only</strong>
                <span>Cold-pressed · No seed oils</span>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>

        <div className="hero-scroll-indicator">
          <motion.span animate={{ y: [0, 8, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
            Scroll
          </motion.span>
        </div>
      </section>

      <Marquee items={marqueeItems} speed={35} className="marquee--dark" />

      {/* ── Metrics ── */}
      <section className="metrics-bar">
        <div className="container metrics-grid">
          {[
            { val: AUDIT_METADATA.followersDisplay, label: "Instagram Community" },
            { val: AUDIT_METADATA.engagementRate, label: "Audience Engagement" },
            { val: AUDIT_METADATA.totalPosts, label: "Wholefood Posts" },
            { val: "5★", label: "Hygiene Certified" },
          ].map((m, i) => (
            <Reveal key={m.label} delay={i * 0.08} direction="up" className="metric-cell">
              <motion.div
                className="metric-val"
                initial={{ scale: 0.5 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ type: "spring", stiffness: 200, delay: i * 0.1 }}
              >
                {m.val}
              </motion.div>
              <span className="metric-lbl">{m.label}</span>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── Value prop ── */}
      <section className="section section--cream">
        <div className="container split-section">
          <Reveal direction="left" className="split-text">
            <span className="section-eyebrow">Why Invigourate</span>
            <SplitText text="Health, Ethics & Taste — Without Compromise" className="section-title" />
            <p>{AUDIT_METADATA.valueProposition}</p>
            <p className="text-muted">
              Captions repeatedly lean on health &amp; ethics language — vegan, organic, natural — paired with
              restaurant-quality taste. That combination is our promise to every guest.
            </p>
            <Link to="/about" className="btn-outline">
              Read Our Story <ArrowRight size={16} />
            </Link>
          </Reveal>
          <Reveal direction="right">
            <ParallaxImage
              src="https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&w=1200&q=80"
              alt="Fresh organic vegetables and wholefoods"
              className="split-image"
              speed={0.15}
            />
          </Reveal>
        </div>
      </section>

      {/* ── Recipes spotlight ── */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <Reveal>
              <span className="section-eyebrow">Signature Wholefood Dishes</span>
              <SplitText text="Popular Seed-Oil Free Recipes" className="section-title" />
            </Reveal>
            <Link to="/menus" className="btn-outline">
              View All {RECIPES_DATA.length} Recipes <ArrowRight size={16} />
            </Link>
          </div>

          <div className="card-grid card-grid--3">
            {RECIPES_DATA.slice(0, 3).map((recipe, i) => (
              <Reveal key={recipe.id} delay={i * 0.1} direction="up">
                <TiltCard
                  key={recipe.id}
                  className="recipe-card"
                  onClick={() => onOpenRecipe(recipe)}
                >
                  <div className="recipe-card-img">
                    <img src={recipe.image} alt={recipe.title} loading="lazy" />
                    <span className="badge-seed-oil">Seed-Oil Free</span>
                  </div>
                  <div className="recipe-card-body">
                    <div className="recipe-rating">
                      <Star size={14} fill="var(--brand-accent)" color="var(--brand-accent)" />
                      {recipe.rating} ({recipe.reviewsCount})
                    </div>
                    <h4>{recipe.title}</h4>
                    <p>{recipe.subtitle}</p>
                    <span className="card-link">
                      Cook Mode &amp; Calculator <ArrowRight size={14} />
                    </span>
                  </div>
                </TiltCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Catering preview ── */}
      <section className="section section--dark">
        <div className="container">
          <Reveal className="text-center section-intro">
            <span className="section-eyebrow section-eyebrow--light">Organic Catering &amp; Private Chef</span>
            <SplitText
              text="Wellness Retreats, Private Dining & Festivals"
              className="section-title section-title--light"
            />
          </Reveal>

          <div className="card-grid card-grid--3">
            {CATERING_PACKAGES.map((pkg, i) => (
              <Reveal key={pkg.title} delay={i * 0.12} direction="up">
                <article className="catering-card">
                  <img src={pkg.image} alt={pkg.title} loading="lazy" />
                  <TiltCard key={pkg.title} className="catering-card-body glass-card-hover">
                    <h4>{pkg.title}</h4>
                    <p>{pkg.description}</p>
                    <span className="catering-price">From £{pkg.pricePerPerson}/person</span>
                  </TiltCard>
                </article>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.3} className="text-center" style={{ marginTop: "48px" }}>
            <MagneticButton className="btn-accent" onClick={onBookClick}>
              <ChefHat size={18} /> Request a Quote
            </MagneticButton>
          </Reveal>
        </div>
      </section>

      {/* ── VIDEO SHOWCASE ── */}
      <section className="video-showcase">
        <div className="container video-showcase-inner">
          <Reveal className="video-showcase-header">
            <span className="section-eyebrow section-eyebrow--light">Behind the Scenes</span>
            <SplitText
              text="Watch Our Chefs in Action"
              className="section-title section-title--light"
            />
            <p style={{ color: "rgba(255,255,255,0.65)", marginTop: "12px", fontSize: "1.05rem", maxWidth: 600, margin: "12px auto 0" }}>
              From organic ingredient prep to the final plated dish — see the craft, care, and passion that goes into every Invigourate experience.
            </p>
          </Reveal>

          <VideoReel
            src={REEL_VIDEO}
            poster={REEL_POSTER}
            title="Invigourate Catering Reel"
            subtitle="Organic · Seed-Oil Free · 5★ Certified"
            badge="Live Demo"
          />

          {/* Stats strip below video */}
          <Reveal delay={0.35}>
            <div className="video-stats-strip">
              {[
                { icon: "🌿", val: <Counter value={100} suffix="%" />, label: "Seed-Oil Free Cooking" },
                { icon: "🏆", val: <Counter value={5} suffix="★" />, label: "Hygiene Rating Certified" },
                { icon: "🤝", val: <Counter value={500} suffix="+" />, label: "Events Catered" },
              ].map((s, i) => (
                <motion.div
                  key={s.label}
                  className="video-stat-card"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 + 0.3 }}
                >
                  <div className="video-stat-icon">{s.icon}</div>
                  <div className="video-stat-val">{s.val}</div>
                  <div className="video-stat-label">{s.label}</div>
                </motion.div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Photo gallery ── */}
      <section className="section gallery-section">
        <div className="container">
          <Reveal className="text-center section-intro">
            <span className="section-eyebrow">A Feast for the Eyes</span>
            <SplitText
              text="Vibrant Moments From Our Tables"
              className="section-title"
            />
            <p className="section-desc" style={{ margin: "0 auto" }}>
              Every Invigourate experience is a visual story — seasonal produce, bold colour and
              plates designed to feel as good as they taste.
            </p>
          </Reveal>

          <div className="gallery-grid">
            {GALLERY.map((item, i) => (
              <Reveal
                key={item.src}
                delay={(i % 3) * 0.1}
                direction={i % 2 === 0 ? "up" : "scale"}
                className={`gallery-item gallery-item--${i + 1}`}
              >
                <motion.figure
                  className="gallery-figure"
                  whileHover={{ scale: 1.03 }}
                  transition={{ type: "spring", stiffness: 260, damping: 22 }}
                >
                  <motion.img
                    src={item.src}
                    alt={item.alt}
                    loading="lazy"
                    initial={{ scale: 1.12 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
                  />
                  <motion.figcaption
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.25, duration: 0.5 }}
                  >
                    {item.label}
                  </motion.figcaption>
                </motion.figure>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Shop preview ── */}
      <section className="section section--cream">
        <div className="container">
          <div className="section-header">
            <Reveal>
              <span className="section-eyebrow">Invigourate Offerings</span>
              <SplitText text="Organic Food, Baked Goods & Skincare" className="section-title" />
            </Reveal>
            <Link to="/journal" className="btn-outline">
              Visit Shop <ArrowRight size={16} />
            </Link>
          </div>

          <div className="card-grid card-grid--3">
            {BEAUTY_PRODUCTS.map((prod, i) => (
              <Reveal key={prod.title} delay={i * 0.1} direction="scale">
                <TiltCard className="product-card">
                  <img src={prod.image} alt={prod.title} loading="lazy" />
                  <span className="badge-organic">{prod.badge}</span>
                  <h4>{prod.title}</h4>
                  <p>{prod.subtitle}</p>
                  <div className="product-footer">
                    <span>{prod.price}</span>
                    <Link to="/contact" className="btn-primary btn-sm">
                      Inquire
                    </Link>
                  </div>
                </TiltCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Testimonials ── */}
      <section className="section">
        <div className="container">
          <Reveal className="text-center section-intro">
            <SplitText
              text="Trusted by Retreat Organizers & Private Dining Guests"
              className="section-title"
            />
          </Reveal>

          <div className="card-grid card-grid--3">
            {AUDIT_TESTIMONIALS.map((t, i) => (
              <Reveal key={t.name} delay={i * 0.1} direction="up">
                <blockquote className="testimonial-card">
                  <p>"{t.quote}"</p>
                  <footer>
                    <img src={t.avatar} alt={t.name} loading="lazy" />
                    <div>
                      <strong>{t.name}</strong>
                      <span>{t.role}</span>
                    </div>
                  </footer>
                </blockquote>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="cta-banner">
        <div className="container cta-inner">
          <Reveal direction="left">
            <ShieldCheck size={40} color="var(--brand-sage)" />
            <h2>Ready to invigourate your next event?</h2>
            <p>{AUDIT_METADATA.contact.bookingMethod}</p>
          </Reveal>
          <Reveal direction="right" delay={0.15}>
            <MagneticButton href={AUDIT_METADATA.contact.instagramUrl} className="btn-accent btn-lg">
              <Instagram size={20} /> DM {AUDIT_METADATA.contact.instagram}
            </MagneticButton>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
