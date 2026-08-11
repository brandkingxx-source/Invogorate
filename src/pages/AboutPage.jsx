import { Instagram, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { AUDIT_METADATA } from "../data/siteData";
import SplitText from "../components/animations/SplitText";
import Reveal from "../components/animations/Reveal";
import ParallaxImage from "../components/animations/ParallaxImage";
import MagneticButton from "../components/animations/MagneticButton";

export default function AboutPage() {
  return (
    <div className="page page--about">
      <section className="page-hero page-hero--compact">
        <div className="video-hero-bg">
          <video autoPlay muted loop playsInline preload="metadata" aria-hidden="true">
            <source src="https://cdn.pixabay.com/video/2020/05/21/39914-424419563_large.mp4" type="video/mp4" />
          </video>
        </div>
        <div className="hero-glow hero-glow--2" />
        <div className="hero-grain" />
        <div className="container page-hero-content">
          <span className="section-eyebrow section-eyebrow--light">The Invigourate Mission</span>
          <SplitText text="Why 100% Seed-Oil Free Wholefoods Matter" className="page-hero-title" />
        </div>
      </section>

      <section className="section">
        <div className="container split-section">
          <Reveal direction="left" className="split-text">
            <h3 className="section-subtitle">Our Story & Culinary Ethos</h3>
            <p>
              Invigourate was founded on a singular standard: to prove that high-end culinary catering and
              vibrant home cooking do not need industrial seed oils, refined sugars, or artificial
              preservatives.
            </p>
            <p className="text-muted">
              We partner directly with organic UK farms to source nutrient-dense heirloom vegetables,
              activated nuts, cold-pressed stone-ground sesame tahini, and cold-pressed extra virgin olive
              oils. Every dish served on our retreats is 5★ hygiene certified and designed for max
              digestibility.
            </p>
            <p className="text-muted">{AUDIT_METADATA.valueProposition}</p>
          </Reveal>
          <Reveal direction="right">
            <ParallaxImage
              src="https://images.unsplash.com/photo-1473093295043-cdd812d0e601?q=80&w=1200"
              alt="Chef preparing organic wholefood dishes"
              className="split-image"
            />
          </Reveal>
        </div>
      </section>

      <section className="section section--cream">
        <div className="container">
          <Reveal className="text-center section-intro">
            <SplitText text="What We Offer" className="section-title" />
          </Reveal>
          <div className="offerings-grid">
            {AUDIT_METADATA.offerings.map((item, i) => (
              <Reveal key={item} delay={i * 0.08} direction="scale">
                <div className="offering-pill">{item}</div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <Reveal className="text-center section-intro">
            <SplitText text="Our Story Archetypes" className="section-title" />
            <p className="text-muted section-desc">
              How we show up for our community — drawn from our Instagram content strategy.
            </p>
          </Reveal>

          <div className="card-grid card-grid--3">
            {AUDIT_METADATA.storyArchetypes.map((archetype, i) => {
              const [title, desc] = archetype.split(" — ");
              return (
                <Reveal key={title} delay={i * 0.12} direction="up">
                  <article className="archetype-card">
                    <span className="archetype-num">0{i + 1}</span>
                    <h4>{title}</h4>
                    <p>{desc}</p>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section section--dark">
        <div className="container split-section">
          <Reveal direction="left">
            <ParallaxImage
              src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=1200"
              alt="Organic kitchen preparation"
              className="split-image"
            />
          </Reveal>
          <Reveal direction="right" className="split-text">
            <span className="section-eyebrow section-eyebrow--light">Content Pillars</span>
            <h3 className="section-title section-title--light">Food, Wellness & Education</h3>
            <div className="pillar-list">
              {AUDIT_METADATA.contentPillars.map((pillar) => (
                <span key={pillar} className="pillar-chip">
                  {pillar}
                </span>
              ))}
            </div>
            <p style={{ color: "#a3b18a", marginTop: "24px" }}>
              Our audience — home cooks and food enthusiasts aged 22–45 — wants easy, impressive recipes
              and restaurant-quality results without professional skill. That's exactly what we deliver.
            </p>
            <Link to="/menus" className="btn-outline btn-outline--light" style={{ marginTop: "24px" }}>
              Browse Recipes <ArrowRight size={16} />
            </Link>
          </Reveal>
        </div>
      </section>

      <section className="cta-banner">
        <div className="container cta-inner">
          <Reveal>
            <h2>Join our {AUDIT_METADATA.followersDisplay} strong community</h2>
            <p>Follow along for wholefood recipes, retreat catering, and invigourating wellness content.</p>
          </Reveal>
          <MagneticButton href={AUDIT_METADATA.contact.instagramUrl} className="btn-accent btn-lg">
            <Instagram size={20} /> Follow {AUDIT_METADATA.contact.instagram}
          </MagneticButton>
        </div>
      </section>
    </div>
  );
}
