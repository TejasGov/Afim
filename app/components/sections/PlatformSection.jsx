"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import SectionBackground from "@/app/components/ui/SectionBackground";
import { PLATFORM_LINKS } from "@/app/data";

export default function PlatformSection() {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "start start"],
  });

  const clipPath = useTransform(scrollYProgress, [0, 1], [
    "inset(12vh 4vw 0 4vw round 80px 80px 0 0)",
    "inset(0vh 0vw 0 0vw round 0px 0px 0 0)",
  ]);

  return (
    <motion.section
      ref={containerRef}
      style={{ clipPath }}
      className="relative py-40 px-6 md:px-14 text-center overflow-hidden z-10 bg-[#05070f]"
    >
      <SectionBackground
        url="https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=2400&q=80"
        loading="eager"
      />

      <div className="relative z-10 max-w-4xl mx-auto">
        {/* Label */}
        <p className="text-[10px] tracking-[0.35em] uppercase text-white/40 mb-6 font-bold">
          Where ΛFIM Works
        </p>

        {/* Headline */}
        <div className="mb-6 overflow-hidden">
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-black text-[#f0ece4] leading-[1.08] tracking-tighter uppercase">
            Browser-first.
            <br />
            <span className="text-outline-white">Where all your work lives.</span>
          </h2>
        </div>

        {/* Subtitle */}
        <p className="text-white/40 text-base md:text-lg leading-relaxed max-w-xl mx-auto mb-20 font-mono uppercase">
          ΛFIM captures every AI conversation you have, across the tools you already use.
        </p>

        {/* Platform glass cards */}
        <div className="flex flex-wrap justify-center gap-5">
          {PLATFORM_LINKS.map(({ icon, label, status, dot, delay }) => (
            <div
              key={label}
              className="relative group"
            >
              {/* Offset shadow */}
              <div className="absolute inset-0 translate-x-2 translate-y-2 border-2 border-white/10 bg-white/5 rounded-xl" />
              {/* Card */}
              <div className="relative backdrop-blur-xl bg-white/5 border-2 border-white/15 rounded-xl px-8 py-7 w-36 cursor-default hover:-translate-y-1 hover:-translate-x-1 transition-transform duration-300">
                <div className="flex flex-col items-center gap-3">
                  <span className="text-2xl">{icon}</span>
                  <span className="text-sm text-white/70 font-bold tracking-wide uppercase">{label}</span>
                  <div className="flex items-center gap-1.5">
                    <span className={`w-1.5 h-1.5 rounded-full ${dot} ${dot === "bg-green-400" ? "animate-pulse" : ""}`} />
                    <span className="text-[10px] tracking-wide text-white/30 font-mono">{status}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
