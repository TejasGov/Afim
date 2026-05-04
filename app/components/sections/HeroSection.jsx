"use client";

import { useRef, useLayoutEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import gsap from "gsap";
import { Sparkles, Zap, MoveRight } from "lucide-react";
import BrutalButton from "@/app/components/ui/BrutalButton";
import DrawSVG from "@/app/components/ui/DrawSVG";

export default function HeroSection() {
  const heroRef = useRef(null);
  const { scrollY } = useScroll();
  const imgY = useTransform(scrollY, [0, 800], [0, -400]);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Mouse parallax
      const handler = (e) => {
        const x = e.clientX / window.innerWidth - 0.5;
        const y = e.clientY / window.innerHeight - 0.5;
        gsap.to(".parallax-layer", { x: x * 50, y: y * 50, duration: 1 });
        gsap.to(".parallax-layer-rev", { x: x * -40, y: y * -40, duration: 1 });
      };
      window.addEventListener("mousemove", handler);

      // Intro animation
      const tl = gsap.timeline();
      tl.from(".hero-char", {
        y: 200, rotate: 10, opacity: 0, stagger: 0.04, duration: 0.9, ease: "back.out(1.7)",
      }).from(".hero-tag", {
        scale: 0, rotation: -180, duration: 0.6, ease: "elastic.out(1, 0.5)",
      }, "-=0.5");

      return () => window.removeEventListener("mousemove", handler);
    }, heroRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={heroRef} className="relative min-h-screen flex flex-col justify-center items-center overflow-hidden pt-20">
      {/* Background image + overlays */}
      <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
        <motion.img
          src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=2000"
          alt=""
          style={{ y: imgY }}
          className="w-full h-[120%] object-cover object-center"
          fetchPriority="high"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#05070f]/60 via-[#05070f]/40 to-[#05070f]" />
      </div>

      {/* Brand Logo */}
      <div className="absolute top-8 left-8 md:left-14 z-50">
        <a href="#" className="text-3xl md:text-4xl font-black uppercase tracking-tighter hover:text-[#ccff00] transition-colors duration-300">
          ΛFIM
        </a>
      </div>

      {/* Background Grid */}
      <div
        className="absolute inset-0 z-[1] opacity-[0.06]"
        aria-hidden="true"
        style={{
          backgroundImage: "linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)",
          backgroundSize: "50px 50px",
        }}
      />

      {/* Floating Elements (Parallax) */}
      <div className="parallax-layer-rev absolute top-28 left-10 md:left-32 z-10">
        <div className="bg-[#b084ff] border-2 border-white/20 p-4 rotate-[-6deg] shadow-[4px_4px_0px_rgba(255,255,255,0.15)]">
          <Sparkles size={32} className="text-white" />
        </div>
      </div>
      <div className="parallax-layer absolute bottom-32 right-10 md:right-32 z-10">
        <div className="bg-[#ccff00] border-2 border-white/20 rounded-full p-4 rotate-[12deg] shadow-[4px_4px_0px_rgba(255,255,255,0.15)]">
          <Zap size={32} className="text-black" />
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-20 text-center">
        <div className="hero-tag inline-block mb-6 bg-[#ccff00] text-black px-4 py-1 font-mono text-xs uppercase rotate-2 font-bold tracking-wider">
          Context That Never Dies
        </div>

        <h1 className="text-[4rem] md:text-[8rem] lg:text-[10rem] leading-[0.85] font-bold uppercase tracking-tighter">
          <div className="overflow-hidden">
            {"NEVER".split("").map((c, i) => (
              <span key={i} className="hero-char inline-block">{c}</span>
            ))}
            {" "}
            {"LOSE".split("").map((c, i) => (
              <span key={`l${i}`} className="hero-char inline-block">{c}</span>
            ))}
          </div>
          <div className="overflow-hidden relative">
            <span className="text-outline-white absolute top-0 left-0 w-full z-0 translate-x-1 translate-y-1 opacity-30">CONTEXT</span>
            {"CONTEXT".split("").map((c, i) => (
              <span key={i} className="hero-char inline-block text-[#ff5e00]">{c}</span>
            ))}
            <DrawSVG path="M10,50 C30,90 170,90 190,50 C170,10 30,10 10,50" className="w-[120%] -left-[10%] -top-2 text-[#ccff00]" />
          </div>
        </h1>

        <p className="max-w-xl mx-auto mt-8 font-mono text-lg md:text-xl text-white/60 relative">
          <span className="font-marker text-2xl text-[#b084ff] absolute -left-8 -top-6 -rotate-12">v1.0</span>
          ΛFIM captures every AI conversation — decisions, context, and history — so your chats keep building on each other.
        </p>

        <div className="mt-12 flex flex-col md:flex-row gap-6 justify-center items-center">
          <BrutalButton>Add to Chrome</BrutalButton>
          <div className="flex items-center gap-2 font-bold text-white/70 underline decoration-wavy decoration-[#ff5e00] cursor-pointer hover:text-white transition-colors">
            View Demo <MoveRight size={18} />
          </div>
        </div>
      </div>


      {/* SVG Filter for wobble effects */}
      <svg style={{ position: "absolute", width: 0, height: 0 }}>
        <filter id="rough-edges">
          <feTurbulence type="fractalNoise" baseFrequency="0.05" numOctaves="2" result="noise" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="3" />
        </filter>
      </svg>
    </section>
  );
}
