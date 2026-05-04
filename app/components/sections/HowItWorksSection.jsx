"use client";

import { motion } from "framer-motion";
import { Circle } from "lucide-react";
import TiltCard from "@/app/components/ui/TiltCard";
import NodeGraph from "@/app/components/mockups/NodeGraph";
import DecisionLog from "@/app/components/mockups/DecisionLog";
import DrawSVG from "@/app/components/ui/DrawSVG";

export default function HowItWorksSection() {
  return (
    <section id="product" className="relative w-full py-32 px-6 max-w-6xl mx-auto overflow-hidden">
      {/* Doodle accent */}
      <div className="absolute -left-10 top-20 text-[#ccff00]">
        <DrawSVG path="M0,0 Q50,50 10,100" className="w-32 h-32 rotate-12" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center mb-20">
        {/* Left — accent block */}
        <div className="relative">
          <div className="aspect-square bg-[#b084ff] border-2 border-white/20 shadow-[8px_8px_0px_rgba(255,255,255,0.1)] rotate-2 overflow-hidden group">
            <div className="absolute inset-0 flex items-center justify-center text-9xl font-black opacity-20 group-hover:scale-150 transition-transform duration-700 text-white">
              ?
            </div>
          </div>
          {/* Sticker */}
          <div className="absolute -bottom-10 -right-10 bg-[#ff5e00] text-white p-6 rounded-full border-2 border-white/20 rotate-12 font-marker text-xl shadow-[4px_4px_0px_rgba(255,255,255,0.1)]">
            TWO LAYERS
          </div>
        </div>

        {/* Right — copy */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400/70" />
            <p className="text-[10px] tracking-[0.35em] uppercase text-white/40">How it works</p>
          </div>

          <h2 className="text-5xl md:text-7xl font-bold uppercase mb-8">
            Two{" "}
            <span className="relative inline-block">
              Layers
              <svg className="absolute w-full h-full left-0 top-0 text-[#ccff00] -z-10 mix-blend-screen" viewBox="0 0 100 40">
                <path d="M0,20 Q50,0 100,20 L100,40 Q50,60 0,40 Z" fill="currentColor" />
              </svg>
            </span>
            .
            <br />
            <span className="text-white/40">Total clarity.</span>
          </h2>

          <p className="font-mono text-lg leading-relaxed mb-8 text-white/60">
            ΛFIM captures what was said, and what was decided —{" "}
            <span className="font-bold bg-[#ccff00] px-1 text-black">two layers of context</span>{" "}
            that{" "}
            <span className="font-bold bg-[#b084ff] px-1 mx-1 text-black">compound over time</span>.
          </p>

          <ul className="space-y-4 font-bold text-xl uppercase">
            {["Every message tracked", "Decisions captured", "Context compounds"].map((item, i) => (
              <li key={i} className="flex items-center gap-4 text-white/80">
                <Circle className="w-4 h-4 fill-[#ccff00] text-[#ccff00]" /> {item}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Cards */}
      <div className="relative z-10 grid md:grid-cols-2 gap-6">
        <TiltCard
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
          glowColor="rgba(255,255,255,0.15)"
          className="relative overflow-hidden border-4 border-white/10 bg-white/[0.03] rounded-xl p-8 flex flex-col gap-8 shadow-[8px_8px_0px_rgba(204,255,0,0.15)] hover:shadow-none hover:translate-x-2 hover:translate-y-2 transition-all duration-300"
        >
          <NodeGraph />
          <div className="relative z-10">
            <span className="inline-block text-[10px] tracking-widest uppercase text-[#ccff00] bg-[#ccff00]/10 border border-[#ccff00]/30 px-3 py-1 rounded-full mb-4 font-bold">
              Conversation Graph
            </span>
            <h3 className="text-2xl md:text-3xl font-bold text-[#e8e4dc] mb-3 leading-snug uppercase tracking-tight">
              The full record of every AI conversation.
            </h3>
            <p className="text-sm text-white/40 leading-relaxed font-mono">
              Every message, decision, and change — organized into entities, timelines, and dependencies.
            </p>
          </div>
        </TiltCard>

        <TiltCard
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          glowColor="rgba(255,255,255,0.15)"
          className="relative overflow-hidden border-4 border-white/10 bg-white/[0.03] rounded-xl p-8 flex flex-col gap-8 shadow-[8px_8px_0px_rgba(176,132,255,0.15)] hover:shadow-none hover:translate-x-2 hover:translate-y-2 transition-all duration-300"
        >
          <DecisionLog />
          <div className="relative z-10">
            <span className="inline-block text-[10px] tracking-widest uppercase text-[#b084ff] bg-[#b084ff]/10 border border-[#b084ff]/30 px-3 py-1 rounded-full mb-4 font-bold">
              Decision Manual
            </span>
            <h3 className="text-2xl md:text-3xl font-bold text-[#e8e4dc] mb-3 leading-snug uppercase tracking-tight">
              The evolving understanding of what the AI decided.
            </h3>
            <p className="text-sm text-white/40 leading-relaxed font-mono">
              Your priorities, open loops, and context — captured automatically as you chat.
            </p>
          </div>
        </TiltCard>
      </div>
    </section>
  );
}
