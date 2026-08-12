import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

/**
 * Signature scroll-driven horizontal gallery (warmnfuzzy / sensiq style).
 *
 * Desktop: a tall pinned section where vertical scrolling drives the card
 * track horizontally, with a progress bar. Mobile / tablet: a native
 * swipeable, snap-scrolling row (better UX, zero pointer-jacking).
 */
function useMediaQuery(query) {
  const [matches, setMatches] = useState(() =>
    typeof window !== "undefined" && window.matchMedia(query).matches
  );
  useEffect(() => {
    const mql = window.matchMedia(query);
    const onChange = () => setMatches(mql.matches);
    mql.addEventListener("change", onChange);
    setMatches(mql.matches);
    return () => mql.removeEventListener("change", onChange);
  }, [query]);
  return matches;
}

export default function HorizontalGallery({ items, header, renderItem, className = "" }) {
  const isDesktop = useMediaQuery("(min-width: 1025px)");
  const wrapRef = useRef(null);
  const trackRef = useRef(null);
  const [range, setRange] = useState(0);

  const { scrollYProgress } = useScroll({
    target: isDesktop ? wrapRef : null,
    offset: ["start start", "end end"],
  });

  useEffect(() => {
    if (!isDesktop) return;
    const track = trackRef.current;
    if (!track) return;
    const measure = () => {
      setRange(Math.max(0, track.scrollWidth - window.innerWidth + 48));
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [isDesktop, items.length]);

  const x = useTransform(scrollYProgress, [0, 1], [0, -range]);

  if (!isDesktop) {
    return (
      <section className={`horizontal-gallery horizontal-gallery--mobile ${className}`}>
        <div className="container hg-mobile-header">{header}</div>
        <div className="hg-swipe-track">
          {items.map((item, i) => (
            <div key={i} className="hg-swipe-item">
              {renderItem(item, i)}
            </div>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section ref={wrapRef} className={`horizontal-gallery ${className}`}>
      <div className="hg-sticky">
        <div className="container hg-header">{header}</div>
        <motion.div ref={trackRef} className="hg-track" style={{ x }}>
          {items.map((item, i) => (
            <div key={i} className="hg-card">
              {renderItem(item, i)}
            </div>
          ))}
          <div className="hg-card hg-card--cta" aria-hidden="true" />
        </motion.div>
        <div className="hg-progress">
          <motion.div className="hg-progress-bar" style={{ scaleX: scrollYProgress }} />
        </div>
      </div>
    </section>
  );
}
