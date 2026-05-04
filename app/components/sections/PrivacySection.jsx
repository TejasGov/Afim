"use client";

import { motion } from "framer-motion";
import PrivacyIcon from "@/app/components/ui/PrivacyIcon";
import { PRIVACY_FEATURES, COMPLIANCE_BADGES } from "@/app/data";
import { UiloraHologram } from "@/app/components/ui/UiloraHologram";

function ShieldVisual() {
  return (
    <div className="relative w-full max-w-[380px] aspect-square select-none">
      {/* Hologram background */}
      <UiloraHologram color="#ccff00" bloomIntensity={1.2} rotationSpeed={0.35} />

      {/* Lock icon overlaid on top, centered */}
      <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
        <svg viewBox="0 0 60 60" width="52" height="52">
          <rect x="11" y="31" width="38" height="28" rx="4" fill="black" stroke="white" strokeWidth="2.5" />
          <path d="M 18 31 v-10 a12 12 0 0 1 24 0 v10" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
          <circle cx="30" cy="46" r="3.5" fill="white" />
        </svg>
      </div>
    </div>
  );
}

export default function PrivacySection() {
  return (
    <section className="relative w-full px-6 md:px-14 py-28 max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-20">
        <div className="flex items-center gap-4 mb-8">
          <span className="font-marker text-4xl text-[#ccff00] -rotate-6">LOCKED DOWN_</span>
          <div className="h-[3px] bg-white/20 flex-1 -rotate-1" />
        </div>
        <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-4 leading-none">
          Own Your <span className="text-outline-white">Intelligence</span>.
        </h2>
        <p className="text-white/40 text-base font-mono uppercase max-w-md">
          Every conversation is yours. Encrypted, private, exportable — always.
        </p>
      </div>

      {/* Two-column: shield + features */}
      <div className="grid md:grid-cols-[1fr_1px_1fr] gap-0 items-center mb-20">
        <div className="flex justify-center pb-16 md:pb-0 md:pr-16">
          <ShieldVisual />
        </div>
        <div className="hidden md:block self-stretch bg-white/[0.08]" />
        <div className="md:pl-16">
          {PRIVACY_FEATURES.map(({ label, title, body, icon }, i) => (
            <div key={title}>
              <div className="flex items-start gap-4 py-7 group">
                <PrivacyIcon type={icon} />
                <div>
                  <p className="text-[10px] tracking-[0.28em] uppercase text-[#ccff00]/50 mb-1.5 font-bold">{label}</p>
                  <h3 className="text-xl font-black text-[#e8e4dc] mb-1.5 leading-snug uppercase tracking-tight">{title}</h3>
                  <p className="text-sm text-white/50 leading-relaxed font-mono">{body}</p>
                </div>
              </div>
              {i < PRIVACY_FEATURES.length - 1 && <div className="border-t border-white/[0.07]" />}
            </div>
          ))}
        </div>
      </div>

      {/* Compliance badges */}
      <div className="text-center">
        <p className="text-[9px] tracking-[0.35em] uppercase text-white/30 mb-5 font-bold">Compliance</p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          {COMPLIANCE_BADGES.map((badge) => (
            <span key={badge} className="bg-white/[0.04] border-2 border-white/10 px-5 py-2 text-[11px] text-white/55 rounded-full uppercase tracking-wider font-bold hover:border-[#ccff00]/30 hover:text-[#ccff00]/70 transition-colors">
              {badge}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
