"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function DrawSVG({ path, className }) {
  const pathRef = useRef(null);

  useEffect(() => {
    if (!pathRef.current) return;
    gsap.fromTo(
      pathRef.current,
      { strokeDasharray: 1000, strokeDashoffset: 1000 },
      {
        strokeDashoffset: 0,
        duration: 1.5,
        ease: "power2.out",
        scrollTrigger: { trigger: pathRef.current, start: "top 80%" },
      }
    );
  }, []);

  return (
    <svg viewBox="0 0 200 100" className={`absolute pointer-events-none overflow-visible ${className}`}>
      <path
        ref={pathRef}
        d={path}
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        style={{ vectorEffect: "non-scaling-stroke" }}
      />
    </svg>
  );
}
