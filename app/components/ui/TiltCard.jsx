"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function TiltCard({ children, className, glowColor = "rgba(96,130,255,0.35)", ...motionProps }) {
  const ref = useRef(null);
  const rotX = useMotionValue(0);
  const rotY = useMotionValue(0);
  const sRotX = useSpring(rotX, { stiffness: 220, damping: 28 });
  const sRotY = useSpring(rotY, { stiffness: 220, damping: 28 });

  const handleMouseMove = (e) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    rotY.set(((e.clientX - rect.left) / rect.width - 0.5) * 16);
    rotX.set(((e.clientY - rect.top) / rect.height - 0.5) * -16);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => { rotX.set(0); rotY.set(0); }}
      whileHover={{ y: -6, borderColor: glowColor }}
      style={{ rotateX: sRotX, rotateY: sRotY, transformPerspective: 1200, willChange: "transform", borderColor: "rgba(255,255,255,0.10)" }}
      className={className}
      {...motionProps}
    >
      {children}
    </motion.div>
  );
}
