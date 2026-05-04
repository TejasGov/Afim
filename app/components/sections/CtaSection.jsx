"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import BrutalButton from "@/app/components/ui/BrutalButton";

export default function CtaSection() {
  const ctaRef = useRef(null);
  const { scrollYProgress: ctaProgress } = useScroll({
    target: ctaRef,
    offset: ["start end", "end start"],
  });
  const ctaBgY = useTransform(ctaProgress, [0, 1], ["-8%", "8%"]);

  return (
    <>
      {/* ══ FINAL CTA ══════════════════════════════════════════════════════════ */}
      <section
        id="early-access"
        ref={ctaRef}
        className="relative min-h-screen flex items-center justify-center text-center px-6"
      >
        {/* Bridge background */}
        <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
          <motion.div
            className="absolute inset-0"
            style={{ y: ctaBgY }}
            animate={{ scale: [1, 1.08] }}
            transition={{ duration: 20, repeat: Infinity, repeatType: "reverse", ease: "linear" }}
          >
            <Image
              src="/bridge.webp"
              alt=""
              fill
              style={{ objectFit: "cover", objectPosition: "center 60%" }}
              priority={false}
            />
          </motion.div>
          <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-[#05070f] to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/50" />
          <div className="absolute inset-0 bg-amber-900/15" />
          <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#05070f] to-transparent" />
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-2xl mx-auto py-32">
          <div className="mb-8 rotate-6 inline-block">
            <div className="bg-[#ccff00] text-black px-6 py-2 font-marker text-xl border-2 border-white/20 shadow-[4px_4px_0px_rgba(255,255,255,0.15)]">
              Get Early Access!
            </div>
          </div>

          <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-6 leading-none">
            Supercharge <br />
            <span className="text-[#ff5e00]">Your Workflow</span>
          </h2>

          <p className="text-white/50 text-base mb-12 leading-relaxed font-mono uppercase">
            Be first to try ΛFIM. Free during early access.
          </p>

          <BrutalButton href="#">Add to Chrome</BrutalButton>
        </div>
      </section>

      {/* ══ FOOTER ═══════════════════════════════════════════════════════════════ */}
      <footer className="relative pt-20 pb-12 px-6 border-t-2 border-white/10 bg-[#05070f]">
        <div className="max-w-7xl mx-auto flex flex-col items-center text-center">
          <a href="#" className="text-[10vw] font-black uppercase leading-none hover:text-[#ccff00] transition-colors duration-300 tracking-tighter">
            ΛFIM
          </a>

          <div className="w-full flex flex-col md:flex-row justify-between items-end mt-20 border-t border-white/10 pt-8 font-mono text-sm uppercase">
            <div className="text-left text-white/30">
              <p>Made with ❤️ + ☕️</p>
              <p>Next.js / GSAP / Tailwind</p>
            </div>
            <div className="flex gap-6 mt-6 md:mt-0">
              <a href="#" className="text-white/40 hover:underline decoration-[#ff5e00] hover:text-white/70 transition-colors">Twitter</a>
              <a href="#" className="text-white/40 hover:underline decoration-[#b084ff] hover:text-white/70 transition-colors">LinkedIn</a>
              <a href="#" className="text-white/40 hover:underline decoration-[#ccff00] hover:text-white/70 transition-colors">GitHub</a>
            </div>
          </div>
        </div>

        {/* Abstract corner shapes */}
        <div className="absolute top-0 right-0 w-32 h-32 border-l-2 border-b-2 border-white/10" />
        <div className="absolute bottom-0 left-0 w-32 h-32 border-r-2 border-t-2 border-white/10" />
      </footer>
    </>
  );
}
