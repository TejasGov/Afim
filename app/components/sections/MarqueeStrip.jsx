"use client";

import { useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Star } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function MarqueeStrip() {
  const containerRef = useRef(null);
  const textRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(textRef.current, {
        xPercent: -30, // Adjust this to control how far it moves
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom", 
          end: "bottom top",
          scrub: 1, // Smooth scrub effect
        },
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="py-8 bg-[#ccff00] border-y-2 border-white/20 overflow-hidden -rotate-1 my-12 relative z-20">
      <div ref={textRef} className="flex gap-12 whitespace-nowrap w-max">
        {[...Array(12)].map((_, i) => (
          <div key={i} className="text-4xl md:text-6xl font-black uppercase flex items-center gap-8 text-black">
            <span>Never Lose</span>
            <span style={{ WebkitTextStroke: "2px black", color: "transparent" }}>Context</span>
            <Star fill="black" className="w-8 h-8 animate-spin-slow" />
          </div>
        ))}
      </div>
    </div>
  );
}
