import { useState, useMemo } from "react";
import { ArrowRight, CheckCircle2, Scale, ChefHat } from "lucide-react";
import { motion } from "framer-motion";
import { CATERING_PACKAGES } from "../data/siteData";
import SplitText from "../components/animations/SplitText";
import Reveal from "../components/animations/Reveal";
import ParallaxImage from "../components/animations/ParallaxImage";
import MagneticButton from "../components/animations/MagneticButton";

export default function CateringPage({ onBookClick }) {
  const [calcPackage, setCalcPackage] = useState(CATERING_PACKAGES[0]);
  const [calcGuests, setCalcGuests] = useState(15);
  const [calcDays, setCalcDays] = useState(3);

  const totalCost = useMemo(() => {
    const days = calcPackage.title.includes("Retreat") ? calcDays : 1;
    return calcPackage.pricePerPerson * calcGuests * days;
  }, [calcPackage, calcGuests, calcDays]);

  return (
    <div className="page page--catering">
      <section className="page-hero">
        <div className="video-hero-bg">
          <video autoPlay muted loop playsInline preload="metadata" aria-hidden="true">
            <source src="https://cdn.pixabay.com/video/2022/09/28/133023-757157799_large.mp4" type="video/mp4" />
          </video>
        </div>
        <div className="hero-glow hero-glow--1" />
        <div className="hero-grain" />
        <div className="container page-hero-content">
          <span className="section-eyebrow section-eyebrow--light">Organic Catering & Private Chef</span>
          <SplitText text="Wellness Retreats & Private Dining" className="page-hero-title" />
          <p>
            5-Star Hygiene Rated, 100% Seed-Oil Free organic catering tailored to your retreat, festival, or
            private event.
          </p>
          <MagneticButton className="btn-accent" onClick={onBookClick}>
            <ChefHat size={18} /> Book Private Chef
          </MagneticButton>
        </div>
      </section>

      {/* Calculator */}
      <section className="section">
        <div className="container">
          <Reveal>
            <div className="calculator-card">
              <h3>
                <Scale size={22} /> Interactive Event Price Estimator
              </h3>

              <div className="calculator-grid">
                <div className="calculator-inputs">
                  <label>
                    Select Catering Package
                    <select
                      value={calcPackage.title}
                      onChange={(e) =>
                        setCalcPackage(CATERING_PACKAGES.find((p) => p.title === e.target.value))
                      }
                    >
                      {CATERING_PACKAGES.map((p) => (
                        <option key={p.title}>{p.title}</option>
                      ))}
                    </select>
                  </label>

                  <label>
                    Number of Guests: <strong>{calcGuests}</strong>
                    <input
                      type="range"
                      min="5"
                      max="100"
                      value={calcGuests}
                      onChange={(e) => setCalcGuests(parseInt(e.target.value))}
                    />
                  </label>

                  {calcPackage.title.includes("Retreat") && (
                    <label>
                      Retreat Duration: <strong>{calcDays} Days</strong>
                      <input
                        type="range"
                        min="1"
                        max="14"
                        value={calcDays}
                        onChange={(e) => setCalcDays(parseInt(e.target.value))}
                      />
                    </label>
                  )}
                </div>

                <motion.div
                  className="calculator-result"
                  key={totalCost}
                  initial={{ scale: 0.95, opacity: 0.5 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <span className="section-eyebrow">Estimated Total</span>
                  <div className="calculator-price">£{totalCost.toLocaleString()}</div>
                  <p>
                    Includes ingredient sourcing, kitchen prep, and 5-star hygiene cleanup. Final quote
                    confirmed via Instagram DM.
                  </p>
                  <MagneticButton className="btn-primary btn-full" onClick={onBookClick}>
                    Request Formal Quote <ArrowRight size={16} />
                  </MagneticButton>
                </motion.div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Packages */}
      <section className="section section--cream">
        <div className="container">
          <Reveal className="text-center section-intro">
            <SplitText text="Catering Packages" className="section-title" />
          </Reveal>

          <div className="card-grid card-grid--3">
            {CATERING_PACKAGES.map((pkg, i) => (
              <Reveal key={pkg.title} delay={i * 0.12} direction="up">
                <motion.article className="package-card" whileHover={{ y: -10 }}>
                  <ParallaxImage src={pkg.image} alt={pkg.title} className="package-img" speed={0.1} />
                  <div className="package-body">
                    <h4>{pkg.title}</h4>
                    <p>{pkg.description}</p>
                    <ul>
                      {pkg.highlights.map((h) => (
                        <li key={h}>
                          <CheckCircle2 size={16} /> {h}
                        </li>
                      ))}
                    </ul>
                    <div className="package-footer">
                      <span>From £{pkg.pricePerPerson}/person</span>
                      <button type="button" className="btn-outline btn-sm" onClick={onBookClick}>
                        Book Package
                      </button>
                    </div>
                  </div>
                </motion.article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="section">
        <div className="container">
          <Reveal className="text-center section-intro">
            <SplitText text="How Booking Works" className="section-title" />
          </Reveal>
          <div className="process-steps">
            {[
              { step: "01", title: "DM on Instagram", desc: "Message @invigouratecatering with your event details, dates, and guest count." },
              { step: "02", title: "Custom Menu Design", desc: "We craft a seed-oil free, organic menu tailored to your dietary requirements." },
              { step: "03", title: "Chef On-Site", desc: "Our 5★ hygiene certified team arrives, cooks, serves, and cleans — you relax." },
            ].map((s, i) => (
              <Reveal key={s.step} delay={i * 0.15} direction="up">
                <div className="process-step">
                  <span className="process-num">{s.step}</span>
                  <h4>{s.title}</h4>
                  <p>{s.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
