"use client";

import { useRef, useEffect } from "react";
import { motion, animate, useMotionValue } from "framer-motion";
import { Star } from "lucide-react";
import { TESTIMONIALS, SOCIAL_LOGOS, T_SLOT, T_SINGLE_W } from "@/app/data";
import { StrokeFill } from "@/app/components/ui/StrokeFill";

function TestimonialCard({ quote, name, role, floatDelay }) {
  const initial = name.charAt(0);
  return (
    <div
      style={{ width: 400, flexShrink: 0, margin: "0 12px" }}
      className="group cursor-default"
    >
      {/* Card with brutal border */}
      <div className="relative">
        <div className="absolute inset-0 translate-x-2 translate-y-2 border-2 border-white/10 bg-white/5 rounded-xl" />
        <div className="relative bg-white/[0.04] border-2 border-white/15 rounded-xl p-8 flex flex-col gap-6 hover:-translate-y-1 hover:-translate-x-1 transition-transform duration-300">
          <p className="text-lg text-white/80 leading-relaxed flex-1 font-mono">
            &ldquo;{quote}&rdquo;
          </p>
          <div className="border-t border-white/10 pt-5 flex items-center gap-3">
            <div
              className="w-12 h-12 rounded-full flex-shrink-0 flex items-center justify-center text-sm font-black text-black bg-[#ccff00] border-2 border-white/20 select-none"
            >
              {initial}
            </div>
            <div>
              <p className="text-sm font-bold text-white/85 leading-tight uppercase tracking-wide">{name}</p>
              <p className="text-xs text-white/40 mt-0.5 font-mono">{role}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function TestimonialsSection() {
  const x = useMotionValue(0);
  const ctrlRef = useRef(null);

  useEffect(() => {
    ctrlRef.current = animate(x, -T_SINGLE_W, {
      duration: 40,
      ease: "linear",
      repeat: Infinity,
    });
    return () => ctrlRef.current?.stop();
  }, [x]);

  const doubled = [...TESTIMONIALS, ...TESTIMONIALS];

  return (
    <section className="relative py-28 overflow-hidden">
      {/* Section header */}
      <div className="px-6 md:px-14 max-w-6xl mx-auto mb-16">
        <div className="flex items-center gap-4 mb-8">
          <span className="font-marker text-4xl text-[#b084ff] -rotate-6">REAL TALK_</span>
          <div className="h-[3px] bg-white/20 flex-1 -rotate-1" />
        </div>
        <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-4 leading-none">
          Trusted by{" "}
          <span className="text-outline-white">People</span>
        </h2>
        <p className="text-white/40 text-base font-mono uppercase max-w-md">
          Who live in their AI chats. Early users tell us what it actually feels like.
        </p>
      </div>

      {/* Marquee */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.8 }}
        className="relative"
        onMouseEnter={() => ctrlRef.current?.pause?.()}
        onMouseLeave={() => ctrlRef.current?.play?.()}
        style={{
          maskImage: "linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)",
          WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)",
        }}
      >
        <motion.div className="flex py-4" style={{ x }}>
          {doubled.map((t, i) => (
            <TestimonialCard key={i} {...t} floatDelay={(i % TESTIMONIALS.length) * 0.55} />
          ))}
        </motion.div>
      </motion.div>

      {/* Social proof strip replaced by StrokeFill */}
      <div className="mt-16 border-t-2 border-white/5 pt-16">
        <StrokeFill text="CONTEXT NEVER DIES" />
      </div>
    </section>
  );
}
