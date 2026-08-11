import { useRef, useState } from "react";
import { motion } from "framer-motion";

export default function MagneticButton({ children, className = "", onClick, href, type = "button" }) {
  const ref = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setPosition({ x: x * 0.25, y: y * 0.25 });
  };

  const handleLeave = () => setPosition({ x: 0, y: 0 });

  const shared = {
    ref,
    className,
    onMouseMove: handleMove,
    onMouseLeave: handleLeave,
    animate: { x: position.x, y: position.y },
    transition: { type: "spring", stiffness: 350, damping: 15, mass: 0.5 },
  };

  if (href) {
    return (
      <motion.a href={href} target="_blank" rel="noreferrer" {...shared}>
        {children}
      </motion.a>
    );
  }

  return (
    <motion.button type={type} onClick={onClick} {...shared}>
      {children}
    </motion.button>
  );
}
