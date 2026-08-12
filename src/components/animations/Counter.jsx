import { useEffect, useRef, useState } from "react";
import { useInView, useMotionValue, useSpring } from "framer-motion";

/**
 * Animated count-up number that springs to life when scrolled into view.
 * Supports decimals and suffixes: <Counter value={378} /> or <Counter value={3.2} decimals={2} suffix="%" />
 */
export default function Counter({
  value,
  decimals = 0,
  suffix = "",
  prefix = "",
  duration = 1.8,
  className = "",
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const motionValue = useMotionValue(0);
  const spring = useSpring(motionValue, { stiffness: 60, damping: 20, mass: 1 });
  const [display, setDisplay] = useState("0");

  useEffect(() => {
    if (!inView) return;
    motionValue.set(value);
    const unsubscribe = spring.on("change", (latest) => {
      setDisplay(latest.toFixed(decimals));
    });
    return unsubscribe;
  }, [inView, value, decimals, motionValue, spring]);

  return (
    <span ref={ref} className={`counter ${className}`}>
      {prefix}
      {display}
      {suffix}
    </span>
  );
}
