"use client";

import { Plus } from "lucide-react";
import AgentsMockup from "@/app/components/mockups/AgentsMockup";
import BrowserMockup from "@/app/components/mockups/BrowserMockup";
import NetworkMockup from "@/app/components/mockups/NetworkMockup";
import DrawSVG from "@/app/components/ui/DrawSVG";
import { SMALL_CARDS } from "@/app/data";

const CAPS = [
  { title: "Autonomous Agents", body: SMALL_CARDS[0].body, soon: true, Mockup: AgentsMockup, color: "bg-[#ccff00]/10 border-[#ccff00]/30" },
  { title: "Browser Control", body: SMALL_CARDS[1].body, soon: false, Mockup: BrowserMockup, color: "bg-[#b084ff]/10 border-[#b084ff]/30" },
  { title: "Context Anywhere", body: SMALL_CARDS[2].body, soon: false, Mockup: NetworkMockup, color: "bg-[#ff5e00]/10 border-[#ff5e00]/30" },
];

const ACCENT_COLORS = ["border-[#ccff00]/40", "border-[#b084ff]/40", "border-[#ff5e00]/40"];
const SHADOW_COLORS = [
  "shadow-[12px_12px_0px_rgba(204,255,0,0.12)]",
  "shadow-[12px_12px_0px_rgba(176,132,255,0.12)]",
  "shadow-[12px_12px_0px_rgba(255,94,0,0.12)]",
];

export default function CapabilitiesSection() {
  return (
    <section className="relative w-full px-6 md:px-14 py-28 max-w-6xl mx-auto overflow-hidden">
      {/* Section header */}
      <div className="flex items-center gap-4 mb-16">
        <span className="font-marker text-4xl text-[#ff5e00] -rotate-6">WHAT WE BUILD_</span>
        <div className="h-[3px] bg-white/20 flex-1 -rotate-1" />
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {CAPS.map((cap, i) => (
          <div
            key={cap.title}
            className={`relative p-8 border-4 ${ACCENT_COLORS[i]} bg-white/[0.03] ${SHADOW_COLORS[i]} hover:translate-x-2 hover:translate-y-2 hover:shadow-none transition-all duration-300 group overflow-hidden rounded-xl`}
          >
            {/* Plus icon */}
            <div className="absolute top-4 right-4 text-white/10 group-hover:text-white/40 transition-colors">
              <Plus size={36} strokeWidth={3} />
            </div>

            {/* Mockup */}
            <div className="relative h-44 rounded-lg bg-white/[0.02] border border-white/[0.06] overflow-hidden mb-6">
              <cap.Mockup fast={false} />
            </div>

            {/* Text */}
            <div className="flex items-center gap-2.5 mb-3">
              <h3 className="text-2xl font-black uppercase tracking-tight text-[#e8e4dc]">
                {cap.title}
              </h3>
              {cap.soon && (
                <span className="text-[10px] tracking-widest uppercase bg-[#ff5e00]/20 border border-[#ff5e00]/40 text-[#ff5e00] px-2.5 py-0.5 rounded-full font-bold">
                  Soon
                </span>
              )}
            </div>
            <p className="font-mono text-sm text-white/50 leading-relaxed uppercase">{cap.body}</p>

            {/* Doodle */}
            <div className="mt-6">
              <DrawSVG path="M0,0 Q50,20 100,0" className="w-32 h-8 text-white/20 opacity-30 group-hover:opacity-100 transition-opacity" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
