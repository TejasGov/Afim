"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useMotionValue, useSpring, useInView } from "framer-motion";

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

// ── HOW IT WORKS — COMPONENTS ────────────────────────────────────────────────

const GRAPH_NODES = [
  { x: 80,  y: 88,  r: 10, fill: "rgba(96,165,250,0.65)",  delay: 0   },
  { x: 140, y: 55,  r: 7,  fill: "rgba(147,197,253,0.45)", delay: 0.4 },
  { x: 140, y: 121, r: 7,  fill: "rgba(167,139,250,0.45)", delay: 0.8 },
  { x: 210, y: 40,  r: 5,  fill: "rgba(255,255,255,0.22)", delay: 1.2 },
  { x: 210, y: 88,  r: 8,  fill: "rgba(96,165,250,0.55)",  delay: 0.6 },
  { x: 210, y: 136, r: 5,  fill: "rgba(255,255,255,0.22)", delay: 1.0 },
];
const GRAPH_LINES = [[0,1],[0,2],[1,3],[1,4],[2,4],[2,5]];

// Single animated node — owns its own spring physics
function GraphNode({ node, mousePos }) {
  const ox = useMotionValue(0);
  const oy = useMotionValue(0);
  const sx = useSpring(ox, { stiffness: 90, damping: 18 });
  const sy = useSpring(oy, { stiffness: 90, damping: 18 });

  useEffect(() => {
    if (!mousePos) { ox.set(0); oy.set(0); return; }
    const dx = node.x - mousePos.x;
    const dy = node.y - mousePos.y;
    const dist = Math.hypot(dx, dy);
    if (dist < 65 && dist > 0) {
      const force = (1 - dist / 65) * 24;
      ox.set((dx / dist) * force);
      oy.set((dy / dist) * force);
    } else {
      ox.set(0);
      oy.set(0);
    }
  }, [mousePos, node, ox, oy]);

  return (
    <motion.circle
      cx={node.x}
      cy={node.y}
      r={node.r}
      fill={node.fill}
      style={{ x: sx, y: sy }}
      animate={{ opacity: [0.45, 1, 0.45] }}
      transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: node.delay }}
    />
  );
}

// Interactive node-graph mockup
function NodeGraph() {
  const svgRef = useRef(null);
  const [mousePos, setMousePos] = useState(null);

  const handleMouseMove = useCallback((e) => {
    const rect = svgRef.current?.getBoundingClientRect();
    if (!rect) return;
    setMousePos({
      x: ((e.clientX - rect.left) / rect.width) * 320,
      y: ((e.clientY - rect.top) / rect.height) * 176,
    });
  }, []);

  return (
    <div className="relative h-48 rounded-2xl bg-white/[0.025] border border-white/5 overflow-hidden cursor-crosshair">
      <svg
        ref={svgRef}
        viewBox="0 0 320 176"
        className="absolute inset-0 w-full h-full"
        onMouseMove={handleMouseMove}
        onMouseLeave={() => setMousePos(null)}
      >
        {/* Static guide lines — barely visible, organic when nodes drift */}
        {GRAPH_LINES.map(([a, b]) => (
          <line
            key={`${a}-${b}`}
            x1={GRAPH_NODES[a].x} y1={GRAPH_NODES[a].y}
            x2={GRAPH_NODES[b].x} y2={GRAPH_NODES[b].y}
            stroke="rgba(255,255,255,0.07)"
            strokeWidth="1"
          />
        ))}
        {GRAPH_NODES.map((node, i) => (
          <GraphNode key={i} node={node} mousePos={mousePos} />
        ))}
      </svg>
      <span className="absolute bottom-3 right-4 text-[9px] tracking-[0.2em] uppercase text-white/15 pointer-events-none select-none">
        Live graph
      </span>
    </div>
  );
}

const DEC_ENTRIES = [
  { w: "72%", dot: "bg-amber-400",  label: "Context window exceeded",   delay: 0    },
  { w: "55%", dot: "bg-blue-400",   label: "Summary generated",          delay: 0.12 },
  { w: "82%", dot: "bg-violet-400", label: "Decision captured",           delay: 0.24 },
  { w: "45%", dot: "bg-amber-300",  label: "Agent consensus reached",    delay: 0.36 },
];

// Interactive decision-log mockup — bars fill to 100% on card hover
function DecisionLog() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [hovered, setHovered] = useState(false);

  return (
    <div
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative h-48 rounded-2xl bg-white/[0.025] border border-white/5 overflow-hidden flex flex-col justify-center gap-[14px] px-6 cursor-default"
    >
      {DEC_ENTRIES.map(({ w, dot, label, delay: d }, i) => (
        <div key={i} className="flex items-center gap-3">
          <motion.span
            className={`w-1.5 h-1.5 rounded-full shrink-0 ${dot}`}
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut", delay: d }}
          />
          <div className="flex-1 h-[5px] rounded-full bg-white/[0.06] overflow-hidden">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-white/28 to-white/8"
              animate={{ width: !inView ? "0%" : hovered ? "100%" : w }}
              transition={{
                duration: hovered ? 0.65 : 0.9,
                ease: "easeOut",
                delay: hovered ? d * 0.7 : 0.35 + d,
              }}
            />
          </div>
          <span className="text-[9px] text-white/15 tracking-wide shrink-0 w-28 truncate">{label}</span>
        </div>
      ))}
      <span className="absolute bottom-3 right-4 text-[9px] tracking-[0.2em] uppercase text-white/15 pointer-events-none select-none">
        Decision log
      </span>
    </div>
  );
}

// 3D-tilt card wrapper
function TiltCard({ children, className, glowColor = "rgba(96,130,255,0.35)", ...motionProps }) {
  const ref = useRef(null);
  const rotX = useMotionValue(0);
  const rotY = useMotionValue(0);
  const sRotX = useSpring(rotX, { stiffness: 220, damping: 28 });
  const sRotY = useSpring(rotY, { stiffness: 220, damping: 28 });

  const handleMouseMove = (e) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    rotY.set(((e.clientX - rect.left) / rect.width - 0.5) * 16);
    rotX.set(((e.clientY - rect.top) / rect.height - 0.5) * -16);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => { rotX.set(0); rotY.set(0); }}
      whileHover={{ y: -6, borderColor: glowColor }}
      style={{ rotateX: sRotX, rotateY: sRotY, transformPerspective: 1200, willChange: "transform" }}
      className={className}
      {...motionProps}
    >
      {children}
    </motion.div>
  );
}

// Full "Two layers. Total clarity." section with cursor glow + magnetic headlines
function HowItWorksSection() {
  const sectionRef = useRef(null);
  const [isOver, setIsOver] = useState(false);

  // Section-wide cursor tracking (raw)
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);

  // Spring-lagged glow position (stiffness 50 = organic lag)
  const glowX = useSpring(rawX, { stiffness: 50, damping: 20 });
  const glowY = useSpring(rawY, { stiffness: 50, damping: 20 });

  // Magnetic headline offsets — tighter spring, subtle range
  const hm1X = useSpring(useMotionValue(0), { stiffness: 80, damping: 30 });
  const hm1Y = useSpring(useMotionValue(0), { stiffness: 80, damping: 30 });
  const hm2X = useSpring(useMotionValue(0), { stiffness: 80, damping: 30 });
  const hm2Y = useSpring(useMotionValue(0), { stiffness: 80, damping: 30 });
  // Keep stable refs to the underlying raw motion values so we can .set() in the handler
  const hm1XRaw = useRef(useMotionValue(0));
  const hm1YRaw = useRef(useMotionValue(0));
  const hm2XRaw = useRef(useMotionValue(0));
  const hm2YRaw = useRef(useMotionValue(0));
  const shm1X = useSpring(hm1XRaw.current, { stiffness: 80, damping: 30 });
  const shm1Y = useSpring(hm1YRaw.current, { stiffness: 80, damping: 30 });
  const shm2X = useSpring(hm2XRaw.current, { stiffness: 80, damping: 30 });
  const shm2Y = useSpring(hm2YRaw.current, { stiffness: 80, damping: 30 });

  const handleMouseMove = useCallback((e) => {
    const rect = sectionRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    rawX.set(x);
    rawY.set(y);
    // Magnetic: map cursor to ±2px / ±1px shifts
    const nx = (x / rect.width - 0.5) * 4;
    const ny = (y / rect.height - 0.5) * 2;
    hm1XRaw.current.set(nx);
    hm1YRaw.current.set(ny);
    hm2XRaw.current.set(nx * 0.7);
    hm2YRaw.current.set(ny * 0.7);
  }, [rawX, rawY]);

  return (
    <section
      id="product"
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsOver(true)}
      onMouseLeave={() => setIsOver(false)}
      className="relative px-6 md:px-14 py-32 max-w-6xl mx-auto overflow-hidden"
    >
      {/* Cursor-following radial glow */}
      <motion.div
        aria-hidden="true"
        animate={{ opacity: isOver ? 1 : 0 }}
        transition={{ duration: 0.4 }}
        style={{
          position: "absolute",
          left: -250,
          top: -250,
          x: glowX,
          y: glowY,
          width: 500,
          height: 500,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(80,100,255,0.10) 0%, transparent 70%)",
          filter: "blur(60px)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      {/* ── HEADER ── */}
      <div className="relative z-10 mb-16">
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

        {/* Magnetic headline line 1 */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.05 }}
          style={{ x: shm1X, y: shm1Y, willChange: "transform", fontFamily: "var(--font-serif)" }}
          className="text-5xl md:text-6xl font-normal text-[#f0ece4] leading-[1.08] tracking-tight max-w-xl"
        >
          Two layers.
        </motion.p>
        {/* Magnetic headline line 2 */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.18 }}
          style={{ x: shm2X, y: shm2Y, willChange: "transform", fontFamily: "var(--font-serif)" }}
          className="text-5xl md:text-6xl font-normal text-white/35 leading-[1.08] tracking-tight max-w-xl mb-6"
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

      {/* ── CARDS ── */}
      <div className="relative z-10 grid md:grid-cols-2 gap-6">

        {/* Conversation Graph card */}
        <TiltCard
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
          glowColor="rgba(96,130,255,0.35)"
          className="relative overflow-hidden backdrop-blur-xl bg-gradient-to-b from-white/[0.06] to-white/0 border border-white/10 rounded-3xl p-8 flex flex-col gap-8"
        >
          {/* Ambient glow */}
          <div className="absolute -top-24 -left-24 w-72 h-72 rounded-full bg-blue-600/8 blur-3xl pointer-events-none" />

          <NodeGraph />

          <div className="relative z-10">
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
        </TiltCard>

        {/* Decision Manual card */}
        <TiltCard
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          glowColor="rgba(255,180,80,0.25)"
          className="relative overflow-hidden backdrop-blur-xl bg-gradient-to-b from-white/[0.06] to-white/0 border border-white/10 rounded-3xl p-8 flex flex-col gap-8"
        >
          {/* Ambient glow */}
          <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-amber-600/7 blur-3xl pointer-events-none" />

          <DecisionLog />

          <div className="relative z-10">
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
        </TiltCard>

      </div>
    </section>
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

      {/* ══ HOW IT WORKS ══════════════════════════════════════════════════════ */}
      <HowItWorksSection />

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
