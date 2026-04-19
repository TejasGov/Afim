"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";

// ── DATA ──────────────────────────────────────────────────────────────────────

const TRUSTED_BY = ["POSTMAN", "RIO", "DOORDASH", "CAPITAL.COM", "AFRIEX"];

const PLATFORM_LINKS = [
  { icon: "🌐", label: "Chrome",   status: "Live",        dot: "bg-green-400",  delay: 0 },
  { icon: "💬", label: "iMessage", status: "Live",        dot: "bg-green-400",  delay: 0.1 },
  { icon: "#",  label: "Slack",    status: "Live",        dot: "bg-green-400",  delay: 0.2 },
  { icon: "🖥", label: "Desktop",  status: "Coming soon", dot: "bg-amber-400",  delay: 0.3, soon: true },
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
  // Parallax: hero image moves up at 0.5x scroll speed
  const imgY = useTransform(scrollY, [0, 800], [0, -400]);

  // CTA section parallax
  const ctaRef = useRef(null);
  const { scrollYProgress: ctaProgress } = useScroll({
    target: ctaRef,
    offset: ["start end", "end start"],
  });
  const ctaBgY = useTransform(ctaProgress, [0, 1], ["-8%", "8%"]);

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
      <section className="relative py-40 px-6 md:px-14 text-center overflow-hidden">
        {/* Atmospheric nebula glow */}
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] rounded-full bg-blue-700/10 blur-[120px]" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[250px] rounded-full bg-violet-700/8 blur-[80px]" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto">
          {/* Label */}
          <motion.p
            {...fadeUp}
            className="text-[10px] tracking-[0.35em] uppercase text-white/40 mb-6"
          >
            Where Afim Works
          </motion.p>

          {/* Headline — two-line dramatic break, word-staggered */}
          <div className="mb-6 overflow-hidden">
            <motion.h2
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.9, ease: "easeOut" }}
              className="text-5xl md:text-6xl lg:text-7xl font-normal text-[#f0ece4] leading-[1.08] tracking-tight"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              Browser-first.
              <br />
              Where all your work already lives.
            </motion.h2>
          </div>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.15 }}
            className="text-white/35 text-base md:text-lg leading-relaxed max-w-xl mx-auto mb-20"
          >
            Afim captures every AI conversation you have, across the tools you already use.
          </motion.p>

          {/* Platform glass cards */}
          <div className="flex flex-wrap justify-center gap-5">
            {PLATFORM_LINKS.map(({ icon, label, status, dot, delay }) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.7, ease: "easeOut", delay }}
                whileHover={{ scale: 1.05, borderColor: "rgba(255,255,255,0.2)" }}
                className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl px-8 py-7 w-36 cursor-default"
              >
                {/* Inner float loop — staggered per card */}
                <motion.div
                  animate={{ y: [0, -4, 0] }}
                  transition={{ duration: 3 + delay * 3, repeat: Infinity, ease: "easeInOut", delay: delay * 1.5 }}
                  className="flex flex-col items-center gap-3"
                >
                  <span className="text-2xl">{icon}</span>
                  <span className="text-sm text-white/70 font-medium tracking-wide">{label}</span>
                  <div className="flex items-center gap-1.5">
                    <span className={`w-1.5 h-1.5 rounded-full ${dot} ${dot === "bg-green-400" ? "animate-pulse" : ""}`} />
                    <span className="text-[10px] tracking-wide text-white/30">{status}</span>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ HOW IT WORKS — 2 BIG CARDS ════════════════════════════════════════ */}
      <section id="product" className="relative px-6 md:px-14 py-32 max-w-6xl mx-auto">

        {/* Header */}
        <div className="mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="flex items-center gap-2 mb-6"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400/70" />
            <p className="text-[10px] tracking-[0.35em] uppercase text-white/40">How it works</p>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.05 }}
            className="text-5xl md:text-6xl font-normal text-[#f0ece4] leading-[1.08] tracking-tight max-w-xl"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            Two layers.
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.18 }}
            className="text-5xl md:text-6xl font-normal text-white/40 leading-[1.08] tracking-tight max-w-xl mb-6"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            Total clarity.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.3 }}
            className="text-white/35 text-base md:text-lg leading-relaxed max-w-xl"
          >
            Afim captures what was said, and what was decided — two layers of context that compound over time.
          </motion.p>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-2 gap-6">

          {/* ── CARD 1: Conversation Graph ── */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
            whileHover={{ y: -5, borderColor: "rgba(96,130,255,0.35)" }}
            className="relative overflow-hidden backdrop-blur-xl bg-gradient-to-b from-white/[0.06] to-white/0 border border-white/10 rounded-3xl p-8 flex flex-col gap-8 group"
          >
            {/* Ambient glow */}
            <div className="absolute -top-20 -left-20 w-72 h-72 rounded-full bg-blue-600/8 blur-3xl pointer-events-none" />

            {/* Node graph mockup */}
            <div className="relative h-44 rounded-2xl bg-white/[0.03] border border-white/5 overflow-hidden flex items-center justify-center">
              {/* Connecting lines (SVG) */}
              <svg className="absolute inset-0 w-full h-full" viewBox="0 0 320 176" fill="none">
                <line x1="80"  y1="88"  x2="140" y2="55"  stroke="rgba(255,255,255,0.07)" strokeWidth="1" />
                <line x1="80"  y1="88"  x2="140" y2="121" stroke="rgba(255,255,255,0.07)" strokeWidth="1" />
                <line x1="140" y1="55"  x2="210" y2="40"  stroke="rgba(255,255,255,0.07)" strokeWidth="1" />
                <line x1="140" y1="55"  x2="210" y2="88"  stroke="rgba(255,255,255,0.07)" strokeWidth="1" />
                <line x1="140" y1="121" x2="210" y2="88"  stroke="rgba(255,255,255,0.07)" strokeWidth="1" />
                <line x1="140" y1="121" x2="210" y2="136" stroke="rgba(255,255,255,0.07)" strokeWidth="1" />
              </svg>
              {/* Nodes */}
              {[
                { cx: 80,  cy: 88,  r: 10, color: "bg-blue-400/60",   delay: 0 },
                { cx: 140, cy: 55,  r: 7,  color: "bg-blue-300/40",   delay: 0.4 },
                { cx: 140, cy: 121, r: 7,  color: "bg-violet-400/40", delay: 0.8 },
                { cx: 210, cy: 40,  r: 5,  color: "bg-white/20",      delay: 1.2 },
                { cx: 210, cy: 88,  r: 8,  color: "bg-blue-400/50",   delay: 0.6 },
                { cx: 210, cy: 136, r: 5,  color: "bg-white/20",      delay: 1.0 },
              ].map(({ cx, cy, r, color, delay: d }, i) => (
                <motion.div
                  key={i}
                  animate={{ opacity: [0.5, 1, 0.5], scale: [1, 1.15, 1] }}
                  transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: d }}
                  className={`absolute rounded-full ${color}`}
                  style={{ left: cx - r, top: cy - r, width: r * 2, height: r * 2 }}
                />
              ))}
              {/* Label */}
              <span className="absolute bottom-3 right-4 text-[9px] tracking-[0.2em] uppercase text-white/15">
                Live graph
              </span>
            </div>

            {/* Text */}
            <div>
              <span className="inline-block text-[10px] tracking-[0.25em] uppercase text-blue-400/60 border border-blue-500/15 px-3 py-1 rounded-full mb-4">
                Conversation Graph
              </span>
              <h3
                className="text-2xl md:text-3xl font-normal text-[#e8e4dc] mb-3 leading-snug"
                style={{ fontFamily: "var(--font-serif)" }}
              >
                The full record of every AI conversation.
              </h3>
              <p className="text-sm text-white/25 leading-relaxed">
                Every message, decision, and change — organized into entities, timelines, and dependencies. Nothing falls through the cracks.
              </p>
            </div>
          </motion.div>

          {/* ── CARD 2: Decision Manual ── */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            whileHover={{ y: -5, borderColor: "rgba(255,180,80,0.25)" }}
            className="relative overflow-hidden backdrop-blur-xl bg-gradient-to-b from-white/[0.06] to-white/0 border border-white/10 rounded-3xl p-8 flex flex-col gap-8 group"
          >
            {/* Ambient glow */}
            <div className="absolute -top-20 -right-20 w-72 h-72 rounded-full bg-amber-600/6 blur-3xl pointer-events-none" />

            {/* Timeline mockup */}
            <div className="relative h-44 rounded-2xl bg-white/[0.03] border border-white/5 overflow-hidden flex flex-col justify-center gap-3 px-6">
              {[
                { w: "72%", dot: "bg-amber-400",  label: "Context window exceeded",   delay: 0 },
                { w: "55%", dot: "bg-blue-400",   label: "Summary generated",         delay: 0.15 },
                { w: "82%", dot: "bg-violet-400", label: "Decision captured",          delay: 0.3 },
                { w: "45%", dot: "bg-amber-300",  label: "Agent consensus reached",   delay: 0.45 },
              ].map(({ w, dot, label, delay: d }, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, ease: "easeOut", delay: 0.5 + d }}
                  className="flex items-center gap-3"
                >
                  <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${dot}`} />
                  <div className="flex-1 h-[5px] rounded-full bg-white/8 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: w }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.9, ease: "easeOut", delay: 0.6 + d }}
                      className="h-full rounded-full bg-gradient-to-r from-white/20 to-white/8"
                    />
                  </div>
                  <span className="text-[9px] text-white/15 tracking-wide shrink-0 w-32 truncate">{label}</span>
                </motion.div>
              ))}
              <span className="absolute bottom-3 right-4 text-[9px] tracking-[0.2em] uppercase text-white/15">
                Decision log
              </span>
            </div>

            {/* Text */}
            <div>
              <span className="inline-block text-[10px] tracking-[0.25em] uppercase text-amber-400/60 border border-amber-500/15 px-3 py-1 rounded-full mb-4">
                Decision Manual
              </span>
              <h3
                className="text-2xl md:text-3xl font-normal text-[#e8e4dc] mb-3 leading-snug"
                style={{ fontFamily: "var(--font-serif)" }}
              >
                The evolving understanding of what the AI decided.
              </h3>
              <p className="text-sm text-white/25 leading-relaxed">
                Your priorities, open loops, and context — captured automatically as you chat. Always up to date, always yours.
              </p>
            </div>
          </motion.div>

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
      <section
        id="early-access"
        ref={ctaRef}
        className="relative min-h-screen flex items-center justify-center text-center px-6"
      >
        {/* Bridge background — overflow-hidden here, not on section, so no clipping artifacts */}
        <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
          {/* Ken Burns + parallax wrapper */}
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

          {/* Edge-to-edge overlays — no gaps */}
          {/* Top fade so section blends into the section above it */}
          <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-[#05070f] to-transparent" />
          {/* Main cinematic overlay with warm amber tint at edges */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/50" />
          <div className="absolute inset-0 bg-amber-900/15" />
          {/* Radial vignette darkening centre-bottom where text sits */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse 70% 50% at 50% 80%, rgba(0,0,0,0.65) 0%, transparent 100%)",
            }}
          />
          {/* Bottom fade into footer */}
          <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#05070f] to-transparent" />
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-2xl mx-auto py-32">
          {/* Shimmering label */}
          <motion.p
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="text-xs tracking-[0.3em] uppercase text-white/60 mb-6"
          >
            Early Access
          </motion.p>

          {/* Headline fade-up on scroll */}
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="text-5xl md:text-6xl font-normal text-[#f0ece4] mb-6 leading-tight"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            Get Early Access
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.15 }}
            className="text-white/45 text-base mb-12 leading-relaxed"
          >
            Be first to try Afim. Free during early access.
          </motion.p>

          {/* Button with glow pulse */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.25 }}
            className="inline-block relative"
          >
            {/* Glow ring behind button */}
            <motion.div
              className="absolute inset-0 rounded-full bg-white/20 blur-md"
              animate={{ opacity: [0.3, 0.7, 0.3], scale: [1, 1.15, 1] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.a
              href="#"
              whileHover={{ scale: 1.05 }}
              className="relative inline-flex items-center gap-2 bg-white text-[#05070f] text-sm font-medium px-6 py-2.5 rounded-full hover:bg-white/90 transition-colors"
            >
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                <circle cx="12" cy="12" r="10" />
                <path d="M8 12l4-4 4 4M12 8v8" />
              </svg>
              Add to Chrome
            </motion.a>
          </motion.div>
        </div>
      </section>

      {/* ══ FOOTER ════════════════════════════════════════════════════════════ */}
      <footer className="px-8 md:px-14 py-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
        <span className="text-sm tracking-widest uppercase text-[#2a2e40]" style={{ fontFamily: "var(--font-serif)" }}>
          Afim
        </span>
        <p className="text-xs text-[#2a2e40] tracking-wide">© 2026 Afim. All rights reserved.</p>
      </footer>
    </main>
  );
}
