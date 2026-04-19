"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

// ── DATA ──────────────────────────────────────────────────────────────────────

const TRUSTED_BY = ["POSTMAN", "RIO", "DOORDASH", "CAPITAL.COM", "AFRIEX"];

const PLATFORM_LINKS = [
  { icon: "🌐", label: "Chrome" },
  { icon: "💬", label: "iMessage" },
  { icon: "#", label: "Slack" },
  { icon: "🖥", label: "Desktop", soon: true },
];

const BIG_CARDS = [
  {
    tag: "Conversation Graph",
    headline: "The full record of every AI conversation.",
    body: "Every message, decision, and change — organized into entities, timelines, and dependencies. Nothing falls through the cracks.",
    accent: "from-blue-950/60 to-transparent",
  },
  {
    tag: "Decision Manual",
    headline: "The evolving understanding of what the AI decided.",
    body: "Your priorities, open loops, and context — captured automatically as you chat. Always up to date, always yours.",
    accent: "from-indigo-950/60 to-transparent",
  },
];

const SMALL_CARDS = [
  {
    icon: "⟁",
    title: "Autonomous Agents",
    body: "3 AI agents debate and decide on the best fix so you don't have to.",
    soon: true,
  },
  {
    icon: "◎",
    title: "Browser Control",
    body: "Works directly inside ChatGPT, Claude, and Gemini — no copy-paste required.",
  },
  {
    icon: "◈",
    title: "Bring Your Context Anywhere",
    body: "Full SDK and MCP support so your summaries travel with you.",
  },
];

const APP_LOGOS = [
  { emoji: "🤖", label: "ChatGPT" },
  { emoji: "✦", label: "Claude" },
  { emoji: "💎", label: "Gemini" },
  { emoji: "🔍", label: "Perplexity" },
  { emoji: "🧠", label: "Copilot" },
];

const TESTIMONIALS = [
  {
    quote:
      "Afim is the extension I didn't know I needed. My Claude conversations used to hit a wall — now they keep building on each other.",
    name: "Priya S.",
    role: "Product Lead, Postman",
  },
  {
    quote:
      "The conversation graph alone is worth installing. I can finally see the shape of a long debugging session at a glance.",
    name: "Marcus T.",
    role: "Senior Engineer, Afriex",
  },
  {
    quote:
      "Elegant, fast, and invisible until you need it. This is how browser tooling should work.",
    name: "Elena R.",
    role: "Founder, Rio Labs",
  },
];

const PRIVACY_CARDS = [
  { icon: "🔐", title: "256-bit Encryption", body: "End-to-end encrypted at rest and in transit." },
  { icon: "☁️", title: "Private Cloud", body: "Your summaries never touch a shared server." },
  { icon: "🛡", title: "Multi-factor Auth", body: "Hardware key and biometric support built in." },
  { icon: "⚙️", title: "Full Data Control", body: "Export or delete everything, any time." },
];

// ── ANIMATION HELPERS ─────────────────────────────────────────────────────────

const fadeUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-100px" },
  transition: { duration: 0.8, ease: "easeOut" },
};

// ── COMPONENTS ────────────────────────────────────────────────────────────────

function NavDropdown({ label }) {
  return (
    <button className="flex items-center gap-1 text-sm text-white/60 hover:text-white/90 transition-colors duration-150">
      {label}
      <svg className="w-3 h-3 mt-px opacity-50" viewBox="0 0 10 6" fill="none">
        <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    </button>
  );
}

// ── PAGE ──────────────────────────────────────────────────────────────────────

export default function Home() {
  const heroRef = useRef(null);
  const { scrollY } = useScroll();
  // Parallax: image moves up at 0.5x scroll speed
  const imgY = useTransform(scrollY, [0, 800], [0, -400]);

  return (
    <main className="min-h-screen bg-[#05070f] text-[#e8e4dc] overflow-x-hidden" style={{ fontFamily: "var(--font-sans)" }}>

      {/* ══ HERO ══════════════════════════════════════════════════════════════ */}
      <section ref={heroRef} className="relative min-h-screen flex flex-col">

        {/* Background image + overlays */}
        <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
          <motion.img
            src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=2000"
            alt=""
            style={{ y: imgY }}
            className="w-full h-[120%] object-cover object-center"
            fetchPriority="high"
          />
          <div className="absolute inset-0 bg-[#05070f]/60" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-[#05070f]" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#05070f] via-transparent to-transparent" />
        </div>

        {/* NAV */}
        <nav className="relative z-20 flex items-center justify-between px-8 md:px-14 py-6">
          <span className="text-lg tracking-widest uppercase text-white" style={{ fontFamily: "var(--font-serif)" }}>
            Afim
          </span>

          <div className="hidden md:flex items-center gap-8">
            <NavDropdown label="Product" />
            <NavDropdown label="Company" />
          </div>

          <div className="flex items-center gap-3">
            <button className="text-sm text-white/60 hover:text-white/90 transition-colors px-3 py-1.5">
              Sign in
            </button>
            <motion.a
              href="#early-access"
              whileHover={{ scale: 1.05 }}
              className="text-sm text-[#05070f] bg-white hover:bg-white/90 transition-colors px-5 py-2 rounded-full font-medium"
            >
              Talk to us
            </motion.a>
          </div>
        </nav>

        {/* HERO BODY */}
        <div className="relative z-10 flex flex-col items-center justify-center flex-1 text-center px-6 pb-24 pt-8">

          {/* Badge */}
          <motion.div
            {...fadeUp}
            className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/15 text-white/75 text-xs tracking-widest uppercase px-4 py-2 rounded-full mb-10"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
            Afim v1.0 — Chrome Extension
          </motion.div>

          {/* Headline — scale-in on page load */}
          <motion.h1
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, ease: "easeOut", delay: 0.1 }}
            className="text-6xl md:text-8xl lg:text-[96px] font-normal leading-[1.05] tracking-tight text-white mb-7 max-w-4xl"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            Never lose context
            <br />
            in long AI chats.
          </motion.h1>

          {/* Sub-headline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.25 }}
            className="text-base md:text-lg text-white/50 max-w-md leading-relaxed mb-10"
          >
            Afim turns endless conversations into structured summaries —
            powered&nbsp;by&nbsp;Claude.
          </motion.p>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.35 }}
          >
            <motion.a
              href="#"
              whileHover={{ scale: 1.05 }}
              className="inline-flex items-center gap-2 bg-white text-[#05070f] text-sm font-medium px-6 py-2.5 rounded-full hover:bg-white/90 transition-colors"
            >
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                <circle cx="12" cy="12" r="10" />
                <path d="M8 12l4-4 4 4M12 8v8" />
              </svg>
              Add to Chrome
            </motion.a>
          </motion.div>

          {/* Trusted by */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.5 }}
            className="mt-16 flex flex-col items-center gap-4"
          >
            <p className="text-xs tracking-[0.25em] uppercase text-white/25">Trusted by teams at</p>
            <div className="flex flex-wrap justify-center items-center gap-8">
              {TRUSTED_BY.map((name) => (
                <span key={name} className="text-sm tracking-widest text-white/30 font-medium">
                  {name}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ══ PLATFORM STRIP ════════════════════════════════════════════════════ */}
      <motion.section {...fadeUp} className="px-6 md:px-14 py-24 max-w-5xl mx-auto text-center">
        <h2
          className="text-4xl md:text-5xl font-normal text-[#f0ece4] leading-snug mb-14 max-w-2xl mx-auto"
          style={{ fontFamily: "var(--font-serif)" }}
        >
          Browser-first. Where all your work already lives.
        </h2>

        <div className="flex flex-wrap justify-center gap-4">
          {PLATFORM_LINKS.map(({ icon, label, soon }) => (
            <div
              key={label}
              className="flex items-center gap-2.5 border border-[#1a1e30] bg-[#08091a] px-6 py-3 rounded-full text-sm text-[#9d9a93]"
            >
              <span>{icon}</span>
              <span>{label}</span>
              {soon && (
                <span className="text-[9px] tracking-wider uppercase border border-[#2a3050] text-[#4a5878] px-1.5 py-0.5 rounded-full">
                  Soon
                </span>
              )}
            </div>
          ))}
        </div>
      </motion.section>

      {/* ══ HOW IT WORKS — 2 BIG CARDS ════════════════════════════════════════ */}
      <section id="product" className="px-6 md:px-14 py-10 max-w-6xl mx-auto">
        <motion.div {...fadeUp}>
          <p className="text-xs tracking-[0.3em] uppercase text-[#4a5070] mb-3">How it works</p>
          <h2
            className="text-4xl md:text-5xl font-normal text-[#f0ece4] mb-12 max-w-xl leading-snug"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            Two layers. Total clarity.
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-4">
          {BIG_CARDS.map((card, i) => (
            <motion.div
              key={card.tag}
              {...fadeUp}
              transition={{ duration: 0.8, ease: "easeOut", delay: i * 0.1 }}
              className={`relative overflow-hidden border border-[#1a1e30] rounded-2xl p-10 bg-gradient-to-br ${card.accent} bg-[#08091a] hover:border-[#2a3050] transition-colors duration-300 min-h-[280px] flex flex-col justify-between`}
            >
              <div>
                <span className="inline-block text-xs tracking-[0.2em] uppercase text-[#4a6090] border border-[#1e2840] px-3 py-1 rounded-full mb-6">
                  {card.tag}
                </span>
                <h3
                  className="text-2xl md:text-3xl font-normal text-[#e8e4dc] mb-4 leading-snug"
                  style={{ fontFamily: "var(--font-serif)" }}
                >
                  {card.headline}
                </h3>
                <p className="text-sm text-[#4a4840] leading-relaxed">{card.body}</p>
              </div>
              <div className="absolute bottom-0 right-0 w-40 h-40 rounded-full bg-blue-900/10 blur-3xl pointer-events-none" />
            </motion.div>
          ))}
        </div>
      </section>

      {/* ══ 3 SMALL FEATURE CARDS ═════════════════════════════════════════════ */}
      <section className="px-6 md:px-14 py-10 max-w-6xl mx-auto">
        <div className="grid sm:grid-cols-3 gap-4">
          {SMALL_CARDS.map((card, i) => (
            <motion.div
              key={card.title}
              {...fadeUp}
              transition={{ duration: 0.8, ease: "easeOut", delay: i * 0.1 }}
              className="border border-[#1a1e30] bg-[#08091a] rounded-2xl p-8 hover:border-[#2a3050] transition-colors duration-300"
            >
              <span className="text-xl text-[#2a3560] block mb-5">{card.icon}</span>
              <h3
                className="text-lg font-normal text-[#e8e4dc] mb-2 flex items-center gap-2"
                style={{ fontFamily: "var(--font-serif)" }}
              >
                {card.title}
                {card.soon && (
                  <span className="text-[9px] tracking-wider uppercase border border-[#2a3050] text-[#4a5878] px-1.5 py-0.5 rounded-full">
                    Soon
                  </span>
                )}
              </h3>
              <p className="text-sm text-[#4a4840] leading-relaxed">{card.body}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ══ ACROSS YOUR FAVORITE APPS ═════════════════════════════════════════ */}
      <motion.section {...fadeUp} id="features" className="px-6 md:px-14 py-28 max-w-5xl mx-auto text-center">
        <p className="text-xs tracking-[0.3em] uppercase text-[#4a5070] mb-4">Integrations</p>
        <h2
          className="text-4xl md:text-5xl font-normal text-[#f0ece4] mb-16 leading-snug"
          style={{ fontFamily: "var(--font-serif)" }}
        >
          Across your favorite apps.
        </h2>

        <div className="flex flex-wrap justify-center items-center gap-6">
          {APP_LOGOS.map(({ emoji, label }) => (
            <div key={label} className="flex flex-col items-center gap-2 group">
              <div className="w-16 h-16 flex items-center justify-center rounded-2xl border border-[#1a1e30] bg-[#08091a] text-2xl group-hover:border-[#2a3050] transition-colors duration-200">
                {emoji}
              </div>
              <span className="text-xs text-[#3a3830] tracking-wide">{label}</span>
            </div>
          ))}
        </div>
      </motion.section>

      {/* ══ TESTIMONIALS ══════════════════════════════════════════════════════ */}
      <section className="px-6 md:px-14 py-10 max-w-6xl mx-auto">
        <motion.p {...fadeUp} className="text-xs tracking-[0.3em] uppercase text-[#4a5070] mb-12">
          What people say
        </motion.p>

        <div className="grid sm:grid-cols-3 gap-4">
          {TESTIMONIALS.map((t, i) => (
            <motion.div
              key={t.name}
              {...fadeUp}
              transition={{ duration: 0.8, ease: "easeOut", delay: i * 0.1 }}
              className="border border-[#1a1e30] bg-[#08091a] rounded-2xl p-8 flex flex-col justify-between gap-8"
            >
              <p className="text-sm text-[#6a6860] leading-relaxed italic">"{t.quote}"</p>
              <div>
                <p className="text-sm text-[#c0bdb5] font-medium">{t.name}</p>
                <p className="text-xs text-[#4a4840] mt-0.5">{t.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ══ PRIVACY ═══════════════════════════════════════════════════════════ */}
      <section className="px-6 md:px-14 py-28 max-w-6xl mx-auto">
        <motion.div {...fadeUp}>
          <p className="text-xs tracking-[0.3em] uppercase text-[#4a5070] mb-4">Privacy & Security</p>
          <h2
            className="text-4xl md:text-5xl font-normal text-[#f0ece4] mb-16 max-w-lg leading-snug"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            Own your intelligence.
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {PRIVACY_CARDS.map((card, i) => (
            <motion.div
              key={card.title}
              {...fadeUp}
              transition={{ duration: 0.8, ease: "easeOut", delay: i * 0.08 }}
              className="border border-[#1a1e30] bg-[#08091a] rounded-2xl p-7"
            >
              <span className="text-2xl block mb-5">{card.icon}</span>
              <h3
                className="text-base font-normal text-[#e8e4dc] mb-2"
                style={{ fontFamily: "var(--font-serif)" }}
              >
                {card.title}
              </h3>
              <p className="text-sm text-[#4a4840] leading-relaxed">{card.body}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ══ FINAL CTA ═════════════════════════════════════════════════════════ */}
      <section id="early-access" className="relative px-6 py-40 text-center overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] rounded-full bg-blue-900/15 blur-[120px]" />
        </div>

        <motion.div {...fadeUp} className="relative z-10 max-w-2xl mx-auto">
          <p className="text-xs tracking-[0.3em] uppercase text-[#4a5070] mb-6">Early Access</p>
          <h2
            className="text-5xl md:text-6xl font-normal text-[#f0ece4] mb-6 leading-tight"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            Get Early Access
          </h2>
          <p className="text-[#4a4840] text-base mb-12 leading-relaxed">
            Be first to try Afim. Free during early access.
          </p>
          <motion.a
            href="#"
            whileHover={{ scale: 1.05 }}
            className="inline-flex items-center gap-2 bg-white text-[#05070f] text-sm font-medium px-6 py-2.5 rounded-full hover:bg-white/90 transition-colors"
          >
            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
              <circle cx="12" cy="12" r="10" />
              <path d="M8 12l4-4 4 4M12 8v8" />
            </svg>
            Add to Chrome
          </motion.a>
        </motion.div>
      </section>

      {/* ══ FOOTER ════════════════════════════════════════════════════════════ */}
      <footer className="px-8 md:px-14 py-8 border-t border-[#0f1120] flex flex-col md:flex-row items-center justify-between gap-4">
        <span className="text-sm tracking-widest uppercase text-[#2a2e40]" style={{ fontFamily: "var(--font-serif)" }}>
          Afim
        </span>
        <p className="text-xs text-[#2a2e40] tracking-wide">© 2026 Afim. All rights reserved.</p>
      </footer>
    </main>
  );
}
