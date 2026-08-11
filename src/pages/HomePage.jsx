import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import {
  ArrowRight,
  ChefHat,
  Instagram,
  Leaf,
  Sparkles,
  Star,
  ShieldCheck,
  Play,
  Pause,
} from "lucide-react";
import {
  AUDIT_METADATA,
  RECIPES_DATA,
  BEAUTY_PRODUCTS,
  AUDIT_TESTIMONIALS,
  CATERING_PACKAGES,
} from "../data/siteData";
import SplitText from "../components/animations/SplitText";
import Reveal from "../components/animations/Reveal";
import Marquee from "../components/animations/Marquee";
import ParallaxImage from "../components/animations/ParallaxImage";
import MagneticButton from "../components/animations/MagneticButton";
import PageTransition from "../components/animations/PageTransition";
import TiltCard from "../components/animations/TiltCard";

// Stable stock video URLs — swap with your own branded footage at any time
const HERO_VIDEO =
  "https://cdn.pixabay.com/video/2022/09/28/133023-757157799_large.mp4";
const REEL_VIDEO =
  "https://cdn.pixabay.com/video/2020/05/21/39914-424419563_large.mp4";

export default function HomePage({ onOpenRecipe, onBookClick }) {
  const heroRef = useRef(null);
  const reelVideoRef = useRef(null);
  const [playing, setPlaying] = useState(false);

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

  const togglePlay = () => {
    if (!reelVideoRef.current) return;
    if (playing) {
      reelVideoRef.current.pause();
      setPlaying(false);
    } else {
      reelVideoRef.current.play();
      setPlaying(true);
    }
  };

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

          <Reveal delay={0.2}>
            <div className="video-reel-wrap" onClick={togglePlay} role="button" aria-label={playing ? "Pause video" : "Play video"}>
              <video
                ref={reelVideoRef}
                preload="metadata"
                loop
                playsInline
                muted={false}
                poster="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=1600&q=80"
              >
                <source src={REEL_VIDEO} type="video/mp4" />
              </video>

              {/* Play overlay */}
              <div className={`video-play-btn ${playing ? "hidden" : ""}`}>
                <motion.div
                  className="video-play-icon"
                  whileHover={{ scale: 1.12 }}
                  whileTap={{ scale: 0.96 }}
                >
                  <Play size={32} color="white" fill="white" style={{ marginLeft: 4 }} />
                </motion.div>
                <span className="video-play-label">Watch Our Process</span>
              </div>

              {/* Pause overlay (shows briefly on click when playing) */}
              {playing && (
                <motion.button
                  style={{
                    position: "absolute",
                    bottom: 80,
                    right: 24,
                    zIndex: 5,
                    width: 44,
                    height: 44,
                    borderRadius: "50%",
                    background: "rgba(0,0,0,0.5)",
                    backdropFilter: "blur(8px)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    border: "1px solid rgba(255,255,255,0.2)",
                    cursor: "pointer",
                    color: "white",
                  }}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  whileHover={{ scale: 1.1 }}
                  onClick={(e) => { e.stopPropagation(); togglePlay(); }}
                >
                  <Pause size={18} />
                </motion.button>
              )}

              {/* Bottom overlay info */}
              <div className="video-reel-overlay">
                <div className="video-reel-overlay-left">
                  <span className="video-reel-title">Invigourate Catering Reel</span>
                  <span className="video-reel-sub">Organic · Seed-Oil Free · 5★ Certified</span>
                </div>
                <span className="badge-seed-oil">Live Demo</span>
              </div>
            </div>
          </Reveal>

          {/* Stats strip below video */}
          <Reveal delay={0.35}>
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: 24,
              maxWidth: 1100,
              margin: "40px auto 0",
            }}>
              {[
                { icon: "🌿", val: "100%", label: "Seed-Oil Free Cooking" },
                { icon: "🏆", val: "5★", label: "Hygiene Rating Certified" },
                { icon: "🤝", val: "500+", label: "Events Catered" },
              ].map((s, i) => (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 + 0.3 }}
                  style={{
                    background: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    borderRadius: "var(--radius-xl)",
                    padding: "28px 24px",
                    textAlign: "center",
                    backdropFilter: "blur(8px)",
                  }}
                >
                  <div style={{ fontSize: "2rem", marginBottom: 8 }}>{s.icon}</div>
                  <div style={{
                    fontFamily: "var(--font-serif)",
                    fontSize: "2.2rem",
                    fontWeight: 800,
                    background: "linear-gradient(135deg, #fff, var(--brand-accent-soft))",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                    lineHeight: 1,
                    marginBottom: 8,
                  }}>{s.val}</div>
                  <div style={{ color: "rgba(255,255,255,0.6)", fontSize: "0.88rem", fontWeight: 600 }}>{s.label}</div>
                </motion.div>
              ))}
            </div>
          </Reveal>
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
