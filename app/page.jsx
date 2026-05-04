"use client";

import NeuralSwarmBackground from "@/app/components/ui/NeuralSwarmBackground";
import SectionBackground    from "@/app/components/ui/SectionBackground";
import HeroSection          from "@/app/components/sections/HeroSection";
import MarqueeStrip         from "@/app/components/sections/MarqueeStrip";
import PlatformSection      from "@/app/components/sections/PlatformSection";
import HowItWorksSection    from "@/app/components/sections/HowItWorksSection";
import CapabilitiesSection  from "@/app/components/sections/CapabilitiesSection";
import IntegrationsSection  from "@/app/components/sections/IntegrationsSection";
import StatsSection         from "@/app/components/sections/StatsSection";
import TestimonialsSection  from "@/app/components/sections/TestimonialsSection";
import PrivacySection       from "@/app/components/sections/PrivacySection";
import CtaSection           from "@/app/components/sections/CtaSection";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#05070f] text-[#e8e4dc] overflow-x-hidden selection:bg-[#ccff00] selection:text-black">
      {/* Noise overlay */}
      <div className="noise" />

      {/* ══ HERO ════════════════════════════════════════════════════════════════ */}
      <HeroSection />

      {/* ══ MARQUEE ═════════════════════════════════════════════════════════════ */}
      <MarqueeStrip />

      {/* ══ PLATFORM STRIP ══════════════════════════════════════════════════════ */}
      <PlatformSection />

      {/* ══ HOW IT WORKS + CAPABILITIES (shared neural swarm bg) ════════════ */}
      <div className="relative overflow-hidden">
        <NeuralSwarmBackground />
        <HowItWorksSection />
        <CapabilitiesSection />
      </div>

      {/* ══ INTEGRATIONS (horizontal sticky scroll) ═════════════════════════ */}
      <IntegrationsSection />

      {/* ══ STATS ═══════════════════════════════════════════════════════════════ */}
      <StatsSection />

      {/* ══ TESTIMONIALS ════════════════════════════════════════════════════════ */}
      <div className="relative overflow-hidden">
        <SectionBackground url="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=2400&q=80" />
        <TestimonialsSection />
      </div>

      {/* ══ PRIVACY ═════════════════════════════════════════════════════════════ */}
      <div className="relative overflow-hidden">
        <SectionBackground url="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=2400&q=80" />
        <PrivacySection />
      </div>

      {/* ══ CTA + FOOTER ════════════════════════════════════════════════════════ */}
      <CtaSection />
    </main>
  );
}
