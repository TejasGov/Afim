"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, animate, useScroll, useTransform, useMotionValue, useSpring, useInView } from "framer-motion";

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

const TOP_ROW = [
  { label: "ChatGPT",         url: "https://cdn.simpleicons.org/openai"           },
  { label: "Claude",          url: "https://cdn.simpleicons.org/anthropic/000000" },
  { label: "Gemini",          url: "https://cdn.simpleicons.org/googlegemini"     },
  { label: "Perplexity",      url: "https://cdn.simpleicons.org/perplexity"       },
  { label: "Notion",          url: "https://cdn.simpleicons.org/notion/000000"    },
  { label: "Slack",           url: "https://cdn.simpleicons.org/slack"            },
  { label: "Google Docs",     url: "https://cdn.simpleicons.org/googledocs"       },
  { label: "Google Sheets",   url: "https://cdn.simpleicons.org/googlesheets"     },
  { label: "Google Drive",    url: "https://cdn.simpleicons.org/googledrive"      },
  { label: "Google Calendar", url: "https://cdn.simpleicons.org/googlecalendar"   },
];

// 9 icons so each sits in the gap between two top-row icons (brick pattern)
const BOT_ROW = [
  { label: "Linear",   url: "https://cdn.simpleicons.org/linear/000000"  },
  { label: "Asana",    url: "https://cdn.simpleicons.org/asana"          },
  { label: "Gmail",    url: "https://cdn.simpleicons.org/gmail"          },
  { label: "GitHub",   url: "https://cdn.simpleicons.org/github/000000"  },
  { label: "Figma",    url: "https://cdn.simpleicons.org/figma"          },
  { label: "Discord",  url: "https://cdn.simpleicons.org/discord"        },
  { label: "Raycast",  url: "https://cdn.simpleicons.org/raycast/000000" },
  { label: "Zoom",     url: "https://cdn.simpleicons.org/zoom"           },
  { label: "Arc",      url: "https://cdn.simpleicons.org/arc/000000"     },
];

const TESTIMONIALS = [
  {
    quote: "Afim is the extension I didn't know I needed. My Claude conversations used to hit a wall — now they keep building on each other.",
    name: "Priya S.",
    role: "Product Lead, Postman",
  },
  {
    quote: "The conversation graph alone is worth installing. I can finally see the shape of a long debugging session at a glance.",
    name: "Marcus T.",
    role: "Senior Engineer, Afriex",
  },
  {
    quote: "Elegant, fast, and invisible until you need it. This is how browser tooling should work.",
    name: "Elena R.",
    role: "Founder, Rio Labs",
  },
  {
    quote: "I used to re-explain my entire codebase at the start of every session. Afim just remembers. I didn't realise how much time I was losing until it stopped.",
    name: "David K.",
    role: "Staff Engineer, Linear",
  },
  {
    quote: "The summary that fires when context runs out is eerily accurate. It captures intent, not just words. That's hard to build.",
    name: "Sophie L.",
    role: "AI Research Lead, Capital.com",
  },
  {
    quote: "Finally, an extension that treats AI conversations like real work — with history, structure, and continuity. This is the missing layer.",
    name: "James O.",
    role: "Founder, DoorDash Ventures",
  },
];

const SOCIAL_LOGOS = [
  { label: "OpenAI",    url: "https://cdn.simpleicons.org/openai/white"    },
  { label: "Anthropic", url: "https://cdn.simpleicons.org/anthropic/white" },
  { label: "Vercel",    url: "https://cdn.simpleicons.org/vercel/white"    },
  { label: "Linear",    url: "https://cdn.simpleicons.org/linear/white"    },
  { label: "Notion",    url: "https://cdn.simpleicons.org/notion/white"    },
  { label: "GitHub",    url: "https://cdn.simpleicons.org/github/white"    },
];

// 400px card + 12px left margin + 12px right margin = 424px per slot
const T_SLOT = 424;
const T_SINGLE_W = TESTIMONIALS.length * T_SLOT; // 6 * 424 = 2544

const PRIVACY_FEATURES = [
  { label: "ENCRYPTION",      title: "256-bit Encryption", body: "End-to-end encrypted at rest and in transit.",   icon: "lock"     },
  { label: "INFRASTRUCTURE",  title: "Private Cloud",       body: "Your summaries never touch a shared server.",   icon: "cloud"    },
  { label: "AUTHENTICATION",  title: "Multi-factor Auth",   body: "Hardware key and biometric support built in.",  icon: "shield"   },
  { label: "DATA CONTROL",    title: "Full Data Control",   body: "Export or delete everything, any time.",        icon: "database" },
];

const COMPLIANCE_BADGES = ["SOC 2 Type II", "GDPR Ready", "HIPAA Compatible", "ISO 27001"];

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
  { x: 80,  y: 88,  r: 4, fill: "rgba(255,255,255,0.80)", delay: 0   },
  { x: 140, y: 55,  r: 3, fill: "rgba(255,255,255,0.60)", delay: 0.4 },
  { x: 140, y: 121, r: 3, fill: "rgba(255,255,255,0.55)", delay: 0.8 },
  { x: 210, y: 40,  r: 2, fill: "rgba(255,255,255,0.40)", delay: 1.2 },
  { x: 210, y: 88,  r: 3, fill: "rgba(255,255,255,0.65)", delay: 0.6 },
  { x: 210, y: 136, r: 2, fill: "rgba(255,255,255,0.40)", delay: 1.0 },
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
      filter="url(#node-glow)"
      style={{ x: sx, y: sy }}
      animate={{ opacity: [0.5, 1, 0.5] }}
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
    <div className="relative h-48 rounded-2xl bg-white/[0.02] border border-white/[0.06] overflow-hidden cursor-crosshair">
      <svg
        ref={svgRef}
        viewBox="0 0 320 176"
        className="absolute inset-0 w-full h-full"
        onMouseMove={handleMouseMove}
        onMouseLeave={() => setMousePos(null)}
      >
        {/* Thin white guide lines */}
        {GRAPH_LINES.map(([a, b]) => (
          <line
            key={`${a}-${b}`}
            x1={GRAPH_NODES[a].x} y1={GRAPH_NODES[a].y}
            x2={GRAPH_NODES[b].x} y2={GRAPH_NODES[b].y}
            stroke="rgba(255,255,255,0.12)"
            strokeWidth="0.75"
          />
        ))}
        {/* White nodes with subtle glow filter */}
        <defs>
          <filter id="node-glow" x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur stdDeviation="2.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        {GRAPH_NODES.map((node, i) => (
          <GraphNode key={i} node={node} mousePos={mousePos} />
        ))}
      </svg>
      <span className="absolute bottom-3 right-4 text-[9px] tracking-[0.2em] uppercase text-white/20 pointer-events-none select-none" style={{ fontFamily: "var(--font-sans)" }}>
        Live graph
      </span>
    </div>
  );
}

const DEC_ENTRIES = [
  { w: "72%", opacity: "bg-white/70", label: "Context window exceeded",  delay: 0    },
  { w: "55%", opacity: "bg-white/50", label: "Summary generated",         delay: 0.12 },
  { w: "82%", opacity: "bg-white/60", label: "Decision captured",          delay: 0.24 },
  { w: "45%", opacity: "bg-white/40", label: "Agent consensus reached",   delay: 0.36 },
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
      className="relative h-48 rounded-2xl bg-white/[0.02] border border-white/[0.06] overflow-hidden flex flex-col justify-center cursor-default px-7"
    >
      {/* Vertical timeline spine */}
      <div className="absolute left-[29px] top-[28px] bottom-[28px] w-px bg-white/[0.08]" />

      <div className="flex flex-col gap-[18px]">
        {DEC_ENTRIES.map(({ w, opacity, label, delay: d }, i) => (
          <div key={i} className="flex items-center gap-4">
            {/* Dot sits on top of the spine */}
            <motion.span
              className={`w-[5px] h-[5px] rounded-full shrink-0 relative z-10 ${opacity}`}
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut", delay: d }}
            />
            <div className="flex-1 h-[1.5px] rounded-full bg-white/[0.08] overflow-hidden">
              <motion.div
                className="h-full rounded-full bg-white/60"
                animate={{ width: !inView ? "0%" : hovered ? "100%" : w }}
                transition={{
                  duration: hovered ? 0.65 : 0.9,
                  ease: "easeOut",
                  delay: hovered ? d * 0.7 : 0.35 + d,
                }}
              />
            </div>
            <span
              className="text-[10px] text-white/35 shrink-0 w-32 truncate"
              style={{ fontFamily: "var(--font-sans)", letterSpacing: "0.02em" }}
            >
              {label}
            </span>
          </div>
        ))}
      </div>

      <span className="absolute bottom-3 right-4 text-[9px] tracking-[0.2em] uppercase text-white/20 pointer-events-none select-none" style={{ fontFamily: "var(--font-sans)" }}>
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
          glowColor="rgba(255,255,255,0.15)"
          className="relative overflow-hidden backdrop-blur-xl bg-gradient-to-b from-white/[0.05] to-white/[0.01] border border-white/10 rounded-3xl p-8 flex flex-col gap-8"
        >
          {/* Neutral ambient glow */}
          <div className="absolute -top-24 -left-24 w-72 h-72 rounded-full bg-white/[0.03] blur-3xl pointer-events-none" />

          <NodeGraph />

          <div className="relative z-10">
            <span className="inline-block text-[10px] tracking-widest uppercase text-white/60 bg-white/5 border border-white/10 px-3 py-1 rounded-full mb-4">
              Conversation Graph
            </span>
            <h3
              className="text-2xl md:text-3xl font-normal text-[#e8e4dc] mb-3 leading-snug"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              The full record of every AI conversation.
            </h3>
            <p className="text-sm text-white/30 leading-relaxed">
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
          glowColor="rgba(255,255,255,0.15)"
          className="relative overflow-hidden backdrop-blur-xl bg-gradient-to-b from-white/[0.05] to-white/[0.01] border border-white/10 rounded-3xl p-8 flex flex-col gap-8"
        >
          {/* Neutral ambient glow */}
          <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-white/[0.03] blur-3xl pointer-events-none" />

          <DecisionLog />

          <div className="relative z-10">
            <span className="inline-block text-[10px] tracking-widest uppercase text-white/60 bg-white/5 border border-white/10 px-3 py-1 rounded-full mb-4">
              Decision Manual
            </span>
            <h3
              className="text-2xl md:text-3xl font-normal text-[#e8e4dc] mb-3 leading-snug"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              The evolving understanding of what the AI decided.
            </h3>
            <p className="text-sm text-white/30 leading-relaxed">
              Your priorities, open loops, and context — captured automatically as you chat. Always up to date, always yours.
            </p>
          </div>
        </TiltCard>

      </div>
    </section>
  );
}

// ── CAPABILITIES — COMPONENTS ────────────────────────────────────────────────

const AGENT_POS = [
  { cx: 160, cy: 52  },
  { cx: 74,  cy: 155 },
  { cx: 246, cy: 155 },
];
const AGENT_ROUTES = [[0,1],[1,2],[2,0]];
const BUBBLE_TEXTS = ["Agree", "Revise", "Ship it"];

function AgentsMockup({ fast = false }) {
  const stepMs = fast ? 800 : 1600;
  const [step, setStep] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setStep(s => (s + 1) % 3), stepMs);
    return () => clearInterval(id);
  }, [stepMs]);

  const from = AGENT_POS[AGENT_ROUTES[step][0]];
  const to   = AGENT_POS[AGENT_ROUTES[step][1]];
  const stepSec = stepMs / 1000;

  return (
    <svg viewBox="0 0 320 208" className="w-full h-full">
      <defs>
        <filter id="ag-glow" x="-80%" y="-80%" width="260%" height="260%">
          <feGaussianBlur stdDeviation="3" result="b"/>
          <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
      </defs>

      {/* Connecting lines — glow on active route */}
      {AGENT_ROUTES.map(([a, b], i) => (
        <motion.line key={i}
          x1={AGENT_POS[a].cx} y1={AGENT_POS[a].cy}
          x2={AGENT_POS[b].cx} y2={AGENT_POS[b].cy}
          stroke="white" strokeWidth="0.75"
          animate={{ opacity: step === i ? 0.38 : 0.07 }}
          transition={{ duration: 0.35 }}
        />
      ))}

      {/* Agent avatars */}
      {AGENT_POS.map(({ cx, cy }, i) => {
        const OPACITIES = [0.80, 0.60, 0.40];
        const isActive = AGENT_ROUTES[step][0] === i || AGENT_ROUTES[step][1] === i;
        return (
          <g key={i}>
            <motion.circle cx={cx} cy={cy} r={18}
              fill="rgba(255,255,255,0.03)"
              stroke="white"
              animate={{ strokeOpacity: isActive ? OPACITIES[i] * 0.45 : OPACITIES[i] * 0.12 }}
              transition={{ duration: 0.35 }}
              strokeWidth="1"
            />
            <text x={cx} y={cy + 4} textAnchor="middle" fontSize="11"
              fill="white" fillOpacity={OPACITIES[i]}
              fontFamily="monospace">
              {["A","B","C"][i]}
            </text>
          </g>
        );
      })}

      {/* Traveling chat bubble — re-keyed per step so it re-mounts */}
      <motion.g
        key={`bubble-${step}`}
        initial={{ x: from.cx, y: from.cy - 26 }}
        animate={{ x: to.cx, y: to.cy - 26 }}
        transition={{ duration: stepSec * 0.62, ease: "easeInOut" }}
      >
        <rect x={-26} y={-13} width={52} height={20} rx={10}
          fill="rgba(255,255,255,0.07)"
          stroke="rgba(255,255,255,0.24)" strokeWidth="0.75"
        />
        <text x={0} y={1} textAnchor="middle" fontSize="8.5"
          fill="rgba(255,255,255,0.72)" fontFamily="monospace">
          {BUBBLE_TEXTS[step]}
        </text>
      </motion.g>

      <text x={310} y={202} textAnchor="end" fontSize="9"
        fill="rgba(255,255,255,0.25)" letterSpacing="2"
        fontFamily="var(--font-sans)">
        DEMO
      </text>
    </svg>
  );
}

const BROWSER_LINES = [
  { x: 32, y: 78,  w: 140, o: 0.50 },
  { x: 32, y: 94,  w: 108, o: 0.35 },
  { x: 32, y: 110, w: 162, o: 0.50 },
  { x: 32, y: 126, w: 88,  o: 0.30 },
  { x: 32, y: 142, w: 128, o: 0.42 },
];

function BrowserMockup({ fast = false }) {
  const dur = fast ? 2.2 : 4.4;
  return (
    <svg viewBox="0 0 320 208" className="w-full h-full">
      {/* Frame */}
      <rect x="10" y="10" width="300" height="188" rx="8"
        fill="rgba(255,255,255,0.015)" stroke="rgba(255,255,255,0.12)" strokeWidth="1" />
      {/* Title bar */}
      <line x1="10" y1="40" x2="310" y2="40" stroke="rgba(255,255,255,0.07)" strokeWidth="1" />
      {/* Traffic lights */}
      <circle cx="29" cy="25" r="4.5" fill="rgba(255,255,255,0.32)" />
      <circle cx="45" cy="25" r="4.5" fill="rgba(255,255,255,0.20)" />
      <circle cx="61" cy="25" r="4.5" fill="rgba(255,255,255,0.13)" />
      {/* URL bar */}
      <rect x="82" y="16" width="160" height="18" rx="5"
        fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.08)" strokeWidth="0.5" />
      <text x="162" y="28.5" textAnchor="middle" fontSize="7.5"
        fill="rgba(255,255,255,0.35)" fontFamily="monospace">
        chat.openai.com
      </text>

      {/* Content lines */}
      {BROWSER_LINES.map(({ x, y, w, o }, i) => (
        <rect key={i} x={x} y={y} width={w} height="3.5" rx="1.75"
          fill={`rgba(255,255,255,${o})`} />
      ))}

      {/* Selection highlight — line 2 (y≈94) */}
      <motion.rect x="28" y="88" width="196" height="14" rx="2"
        fill="rgba(255,255,255,0)"
        animate={{ fill: [
          "rgba(255,255,255,0)",
          "rgba(255,255,255,0.07)",
          "rgba(255,255,255,0.07)",
          "rgba(255,255,255,0)",
          "rgba(255,255,255,0)",
        ]}}
        transition={{ duration: dur, repeat: Infinity, ease: "easeInOut",
          times: [0, 0.18, 0.36, 0.50, 1] }}
      />
      {/* Selection highlight — line 4 (y≈126) */}
      <motion.rect x="28" y="120" width="196" height="14" rx="2"
        fill="rgba(255,255,255,0)"
        animate={{ fill: [
          "rgba(255,255,255,0)",
          "rgba(255,255,255,0)",
          "rgba(255,255,255,0.07)",
          "rgba(255,255,255,0.07)",
          "rgba(255,255,255,0)",
        ]}}
        transition={{ duration: dur, repeat: Infinity, ease: "easeInOut",
          times: [0, 0.50, 0.68, 0.82, 1] }}
      />

      {/* Cursor — intentional path: idle → line2 → dwell → line4 → dwell → reset */}
      <motion.g
        animate={{
          x: [55, 55, 148, 148, 95, 95, 55],
          y: [83, 94, 94, 126, 126, 83, 83],
        }}
        transition={{ duration: dur, repeat: Infinity, ease: "easeInOut",
          times: [0, 0.10, 0.36, 0.52, 0.78, 0.92, 1] }}
      >
        <path d="M0,0 L0,11 L2.5,8 L5,13 L6.8,12.5 L4,7.5 L8.5,7.5 Z"
          fill="rgba(255,255,255,0.72)" />
      </motion.g>

      <text x={303} y={194} textAnchor="end" fontSize="9"
        fill="rgba(255,255,255,0.25)" letterSpacing="2"
        fontFamily="var(--font-sans)">
        DEMO
      </text>
    </svg>
  );
}

const NET_CENTER = { cx: 160, cy: 104 };
const NET_NODES  = [
  { cx: 72,  cy: 48,  label: "ChatGPT"    },
  { cx: 248, cy: 48,  label: "Claude"     },
  { cx: 72,  cy: 160, label: "Gemini"     },
  { cx: 248, cy: 160, label: "Perplexity" },
];

function PulseDot({ to, delay, fast }) {
  const dur = fast ? 1.1 : 2.0;
  return (
    <motion.circle r={2.8} fill="rgba(255,255,255,0.85)"
      animate={{
        cx: [NET_CENTER.cx, to.cx],
        cy: [NET_CENTER.cy, to.cy],
        opacity: [0, 1, 1, 0],
      }}
      transition={{ duration: dur, repeat: Infinity, ease: "easeInOut",
        delay, times: [0, 0.08, 0.88, 1] }}
    />
  );
}

function NetworkMockup({ fast = false }) {
  return (
    <svg viewBox="0 0 320 208" className="w-full h-full">
      <defs>
        <filter id="net2-glow" x="-80%" y="-80%" width="260%" height="260%">
          <feGaussianBlur stdDeviation="2.5" result="b"/>
          <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
        <pattern id="grid-dots" x="0" y="0" width="22" height="22" patternUnits="userSpaceOnUse">
          <circle cx="11" cy="11" r="0.9" fill="rgba(255,255,255,0.05)" />
        </pattern>
      </defs>

      {/* Background constellation grid */}
      <rect x="0" y="0" width="320" height="208" fill="url(#grid-dots)" />

      {/* Lines from center to each node */}
      {NET_NODES.map((n, i) => (
        <line key={i}
          x1={NET_CENTER.cx} y1={NET_CENTER.cy}
          x2={n.cx} y2={n.cy}
          stroke="rgba(255,255,255,0.10)" strokeWidth="1"
        />
      ))}

      {/* Staggered data pulses */}
      {NET_NODES.map((n, i) => (
        <PulseDot key={i} to={n} delay={i * 0.5} fast={fast} />
      ))}

      {/* External nodes */}
      {NET_NODES.map(({ cx, cy, label }, i) => (
        <g key={i}>
          <motion.circle cx={cx} cy={cy} r={5.5} fill="white"
            filter="url(#net2-glow)"
            animate={{ opacity: [0.28, 0.68, 0.28] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut", delay: i * 0.55 }}
          />
          <text x={cx} y={cy + 17} textAnchor="middle" fontSize="7.5"
            fill="rgba(255,255,255,0.38)" fontFamily="monospace">
            {label}
          </text>
        </g>
      ))}

      {/* Central Afim node */}
      <circle cx={NET_CENTER.cx} cy={NET_CENTER.cy} r={22}
        fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.20)" strokeWidth="1" />
      <text x={NET_CENTER.cx} y={NET_CENTER.cy + 4} textAnchor="middle" fontSize="9.5"
        fill="rgba(255,255,255,0.82)" fontFamily="monospace" letterSpacing="0.5">
        Afim
      </text>

      <text x={310} y={202} textAnchor="end" fontSize="9"
        fill="rgba(255,255,255,0.25)" letterSpacing="2"
        fontFamily="var(--font-sans)">
        DEMO
      </text>
    </svg>
  );
}

// Single capability card with 5° tilt
function CapabilityCard({ Mockup, title, body, soon, delay }) {
  const ref = useRef(null);
  const [hovered, setHovered] = useState(false);
  const rotX = useMotionValue(0);
  const rotY = useMotionValue(0);
  const sRotX = useSpring(rotX, { stiffness: 220, damping: 28 });
  const sRotY = useSpring(rotY, { stiffness: 220, damping: 28 });

  const handleMouseMove = (e) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    rotY.set(((e.clientX - rect.left) / rect.width  - 0.5) * 10);
    rotX.set(((e.clientY - rect.top)  / rect.height - 0.5) * -10);
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.8, ease: "easeOut", delay }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { setHovered(false); rotX.set(0); rotY.set(0); }}
      whileHover={{ y: -5, borderColor: "rgba(255,255,255,0.20)" }}
      style={{ rotateX: sRotX, rotateY: sRotY, transformPerspective: 1200, willChange: "transform" }}
      className="relative overflow-hidden backdrop-blur-xl bg-gradient-to-b from-white/[0.05] to-white/[0.01] border border-white/10 rounded-3xl p-8 flex flex-col gap-6"
    >
      {/* Neutral ambient glow */}
      <div className="absolute -top-20 -left-20 w-64 h-64 rounded-full bg-white/[0.025] blur-3xl pointer-events-none" />
      {/* Mockup */}
      <div className="relative h-48 rounded-2xl bg-white/[0.02] border border-white/[0.06] overflow-hidden">
        <Mockup fast={hovered} />
      </div>
      {/* Text */}
      <div className="relative z-10">
        <div className="flex items-center gap-2.5 mb-3">
          <h3 className="text-2xl font-normal text-[#e8e4dc]" style={{ fontFamily: "var(--font-serif)" }}>
            {title}
          </h3>
          {soon && (
            <span className="text-[10px] tracking-widest uppercase bg-white/10 border border-white/20 text-white/60 px-2.5 py-0.5 rounded-full">
              Soon
            </span>
          )}
        </div>
        <p className="text-sm text-white/60 leading-relaxed">{body}</p>
      </div>
    </motion.div>
  );
}

// The full capabilities section with shared cursor glow
function CapabilitiesSection() {
  const sectionRef = useRef(null);
  const [isOver, setIsOver] = useState(false);
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const glowX = useSpring(rawX, { stiffness: 50, damping: 20 });
  const glowY = useSpring(rawY, { stiffness: 50, damping: 20 });

  const handleMouseMove = useCallback((e) => {
    const rect = sectionRef.current?.getBoundingClientRect();
    if (!rect) return;
    rawX.set(e.clientX - rect.left);
    rawY.set(e.clientY - rect.top);
  }, [rawX, rawY]);

  const CAPS = [
    { title: "Autonomous Agents",        body: SMALL_CARDS[0].body, soon: true,  Mockup: AgentsMockup  },
    { title: "Browser Control",           body: SMALL_CARDS[1].body, soon: false, Mockup: BrowserMockup },
    { title: "Bring Your Context Anywhere", body: SMALL_CARDS[2].body, soon: false, Mockup: NetworkMockup },
  ];

  return (
    <section
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsOver(true)}
      onMouseLeave={() => setIsOver(false)}
      className="relative px-6 md:px-14 py-28 max-w-6xl mx-auto overflow-hidden"
    >
      {/* Cursor glow */}
      <motion.div
        aria-hidden="true"
        animate={{ opacity: isOver ? 1 : 0 }}
        transition={{ duration: 0.4 }}
        style={{
          position: "absolute",
          left: -250, top: -250,
          x: glowX, y: glowY,
          width: 500, height: 500,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(255,255,255,0.04) 0%, transparent 70%)",
          filter: "blur(60px)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      {/* Section header */}
      <div className="relative z-10 mb-14">
        <motion.div
          {...fadeUp}
          className="flex items-center gap-2 mb-5"
        >
          <span className="w-1 h-1 rounded-full bg-white/50" />
          <p className="text-[10px] tracking-[0.35em] uppercase text-white/40">Capabilities</p>
        </motion.div>
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.08 }}
          className="text-4xl md:text-5xl font-normal text-[#f0ece4] leading-[1.08] mb-4 max-w-lg"
          style={{ fontFamily: "var(--font-serif)" }}
        >
          Built for how you actually work.
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.18 }}
          className="text-white/35 text-base leading-relaxed max-w-md"
        >
          Three layers of intelligence, all working together.
        </motion.p>
      </div>

      {/* Cards */}
      <div className="relative z-10 grid sm:grid-cols-3 gap-5">
        {CAPS.map((cap, i) => (
          <CapabilityCard key={cap.title} {...cap} delay={i * 0.15} />
        ))}
      </div>
    </section>
  );
}

// ── INTEGRATIONS — MAC-STYLE ICON ROWS ───────────────────────────────────────

// Icon slot width = 72px icon + 12px gap = 84px. Half-slot offset for brick pattern = 42px.
const ICON_SIZE  = 72;
const ICON_GAP   = 12;
const HALF_SLOT  = (ICON_SIZE + ICON_GAP) / 2; // 42px

function AppIcon({ label, url, index, rowDelay = 0 }) {
  const floatDur   = 3.2 + (index % 5) * 0.5;
  const floatAmt   = 3 + (index % 4) * 1.5;
  const entryDelay = rowDelay + index * 0.06;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.82, y: 14 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: entryDelay }}
      className="flex-shrink-0"
    >
      <motion.div
        animate={{ y: [0, -floatAmt, 0] }}
        transition={{ duration: floatDur, repeat: Infinity, ease: "easeInOut", delay: entryDelay * 0.55 }}
        whileHover={{ y: -8, scale: 1.10 }}
        className="cursor-default"
        style={{
          width: ICON_SIZE,
          height: ICON_SIZE,
          background: "#ffffff",
          borderRadius: 18,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 8px 24px rgba(0,0,0,0.28), 0 2px 6px rgba(0,0,0,0.18)",
        }}
      >
        <img
          src={url}
          alt={label}
          width={44}
          height={44}
          className="object-contain select-none pointer-events-none"
          draggable={false}
        />
      </motion.div>
    </motion.div>
  );
}

function IntegrationsSection() {
  return (
    <section
      id="features"
      className="relative px-6 md:px-14 py-28 max-w-5xl mx-auto text-center overflow-hidden"
    >
      {/* Subtle dot-grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.018) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      {/* Section header */}
      <div className="relative z-10 mb-16">
        <motion.div {...fadeUp} className="flex items-center justify-center gap-2 mb-5">
          <span className="w-1 h-1 rounded-full bg-white/50" />
          <p className="text-[10px] tracking-[0.35em] uppercase text-white/40">Integrations</p>
        </motion.div>
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.08 }}
          className="text-4xl md:text-5xl font-normal text-[#f0ece4] mb-4 leading-[1.08]"
          style={{ fontFamily: "var(--font-serif)" }}
        >
          Across your favorite apps.
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.18 }}
          className="text-white/35 text-base leading-relaxed max-w-md mx-auto"
        >
          Afim sits quietly on top of the tools you already use. No setup, no migration.
        </motion.p>
      </div>

      {/* Icon constellation */}
      <div className="relative z-10 flex flex-col items-center">

        {/* Radial glow — floats behind the Afim center */}
        <div
          className="absolute pointer-events-none"
          aria-hidden="true"
          style={{
            top: "50%", left: "50%",
            transform: "translate(-50%, -50%)",
            width: 320, height: 320,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(255,255,255,0.07) 0%, transparent 70%)",
            filter: "blur(48px)",
          }}
        />

        {/* TOP ROW — 10 icons */}
        <div
          className="flex items-end"
          style={{ gap: ICON_GAP }}
        >
          {TOP_ROW.map((app, i) => (
            <AppIcon key={app.label} {...app} index={i} rowDelay={0.15} />
          ))}
        </div>

        {/* AFIM CENTER ICON — overlaps both rows with negative margins */}
        <motion.div
          initial={{ opacity: 0, scale: 0.75 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
          style={{ marginTop: -16, marginBottom: -16, zIndex: 20, position: "relative" }}
        >
          <motion.div
            animate={{ scale: [1, 1.06, 1] }}
            transition={{ duration: 3.6, repeat: Infinity, ease: "easeInOut" }}
            style={{
              width: 96,
              height: 96,
              background: "#ffffff",
              borderRadius: 22,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 12px 40px rgba(0,0,0,0.35), 0 4px 12px rgba(0,0,0,0.22), 0 0 60px rgba(255,255,255,0.08)",
              cursor: "default",
            }}
          >
            <span
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: 42,
                fontWeight: 400,
                color: "#05070f",
                lineHeight: 1,
                userSelect: "none",
              }}
            >
              A
            </span>
          </motion.div>
        </motion.div>

        {/* BOTTOM ROW — 9 icons, offset by half-slot to brick-pattern with top row */}
        <div
          className="flex items-start"
          style={{ gap: ICON_GAP, transform: `translateX(${HALF_SLOT}px)` }}
        >
          {BOT_ROW.map((app, i) => (
            <AppIcon key={app.label} {...app} index={i} rowDelay={0.3} />
          ))}
        </div>

      </div>
    </section>
  );
}

// ── TESTIMONIALS ─────────────────────────────────────────────────────────────

function TestimonialCard({ quote, name, role, floatDelay }) {
  const initial = name.charAt(0);
  return (
    <motion.div
      animate={{ y: [0, -4, 0] }}
      transition={{ duration: 3.8 + floatDelay * 0.6, repeat: Infinity, ease: "easeInOut", delay: floatDelay }}
      whileHover={{ scale: 1.02, borderColor: "rgba(255,255,255,0.20)" }}
      style={{ width: 400, flexShrink: 0, margin: "0 12px" }}
      className="bg-white/[0.03] border border-white/10 backdrop-blur-xl rounded-2xl p-8 flex flex-col gap-6 cursor-default"
    >
      <p
        className="text-lg text-white/90 leading-relaxed flex-1"
        style={{ fontFamily: "var(--font-serif)", fontStyle: "italic" }}
      >
        "{quote}"
      </p>
      <div className="border-t border-white/10 pt-5 flex items-center gap-3">
        <div
          className="w-10 h-10 rounded-full flex-shrink-0 flex items-center justify-center text-sm font-medium text-white/70 select-none"
          style={{ background: "linear-gradient(135deg, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0.05) 100%)" }}
        >
          {initial}
        </div>
        <div>
          <p className="text-sm font-medium text-white/85 leading-tight">{name}</p>
          <p className="text-xs text-white/50 mt-0.5">{role}</p>
        </div>
      </div>
    </motion.div>
  );
}

function TestimonialsSection() {
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
        <motion.div
          {...fadeUp}
          className="flex items-center gap-2 mb-6"
        >
          <span className="w-1 h-1 rounded-full bg-white/50" />
          <p className="text-[10px] tracking-[0.35em] uppercase text-white/40">Testimonials</p>
        </motion.div>
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.07 }}
          className="text-4xl md:text-5xl font-normal text-[#f0ece4] mb-4 leading-[1.08] max-w-xl"
          style={{ fontFamily: "var(--font-serif)" }}
        >
          Trusted by people who live in their AI chats.
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.17 }}
          className="text-white/35 text-base leading-relaxed"
        >
          Early users tell us what it actually feels like.
        </motion.p>
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
            <TestimonialCard
              key={i}
              {...t}
              floatDelay={(i % TESTIMONIALS.length) * 0.55}
            />
          ))}
        </motion.div>
      </motion.div>

      {/* Social proof strip */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
        className="px-6 md:px-14 max-w-6xl mx-auto mt-16 flex flex-col items-center gap-5"
      >
        <p className="text-[10px] tracking-[0.3em] uppercase text-white/25">
          Trusted by users at
        </p>
        <div className="flex items-center gap-8 flex-wrap justify-center">
          {SOCIAL_LOGOS.map(({ label, url }) => (
            <img
              key={label}
              src={url}
              alt={label}
              width={20}
              height={20}
              className="opacity-25 hover:opacity-50 transition-opacity duration-200 object-contain select-none"
              draggable={false}
            />
          ))}
        </div>
      </motion.div>
    </section>
  );
}

// ── PRIVACY & SECURITY ───────────────────────────────────────────────────────

function PrivacyIcon({ type }) {
  const S = { fill: "none", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round" };
  const icons = {
    lock: (
      <>
        <rect x="3" y="11" width="18" height="11" rx="2" {...S} />
        <path d="M7 11V7a5 5 0 0 1 10 0v4" {...S} />
        <circle cx="12" cy="16" r="1" fill="currentColor" stroke="none" />
      </>
    ),
    cloud: (
      <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z" {...S} />
    ),
    shield: (
      <>
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" {...S} />
        <polyline points="9 12 11 14 15 10" {...S} />
      </>
    ),
    database: (
      <>
        <ellipse cx="12" cy="5" rx="9" ry="3" {...S} />
        <path d="M3 5v4c0 1.66 4.03 3 9 3s9-1.34 9-3V5" {...S} />
        <path d="M3 9v4c0 1.66 4.03 3 9 3s9-1.34 9-3V9" {...S} />
        <path d="M3 13v4c0 1.66 4.03 3 9 3s9-1.34 9-3v-4" {...S} />
      </>
    ),
  };
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" className="text-white/45 flex-shrink-0 mt-0.5">
      {icons[type]}
    </svg>
  );
}

const ORBIT_R = 132;
const ORBIT_PARTICLES = [
  { cx: 200,                         cy: 200 - ORBIT_R,                     r: 3.5, opacity: 0.62 },
  { cx: 200 + ORBIT_R * 0.866,       cy: 200 + ORBIT_R * 0.5,              r: 2.5, opacity: 0.40 },
  { cx: 200 - ORBIT_R * 0.866,       cy: 200 + ORBIT_R * 0.5,              r: 2.0, opacity: 0.30 },
];

function ShieldVisual() {
  const orbitAngle = useMotionValue(0);

  useEffect(() => {
    const ctrl = animate(orbitAngle, 360, { duration: 20, ease: "linear", repeat: Infinity });
    return ctrl.stop;
  }, [orbitAngle]);

  return (
    <div className="relative w-full max-w-[380px] aspect-square select-none">
      {/* Soft radial glow */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
        aria-hidden="true"
      >
        <div
          className="w-56 h-56 rounded-full"
          style={{ background: "radial-gradient(circle, rgba(255,255,255,0.07) 0%, transparent 70%)", filter: "blur(44px)" }}
        />
      </div>

      <svg viewBox="0 0 400 400" width="100%" height="100%">
        <defs>
          <filter id="priv-glow" x="-80%" y="-80%" width="260%" height="260%">
            <feGaussianBlur stdDeviation="4" result="b"/>
            <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
          </filter>
        </defs>

        {/* Static ring guides */}
        {[100, 150, 185].map((r, i) => (
          <circle key={r} cx="200" cy="200" r={r} fill="none"
            stroke="rgba(255,255,255,0.05)" strokeWidth="1"
            strokeDasharray={i === 2 ? "4 6" : "none"}
          />
        ))}

        {/* Radar pulse rings — 3 offset phases */}
        {[0, 1.25, 2.5].map((delay, i) => (
          <motion.circle
            key={i} cx="200" cy="200" r="60"
            fill="none" stroke="white" strokeWidth="1"
            animate={{ r: [60, 192], opacity: [0.22, 0] }}
            transition={{ duration: 3.6, repeat: Infinity, ease: "easeOut", delay }}
          />
        ))}

        {/* Inner node */}
        <circle cx="200" cy="200" r="58"
          fill="rgba(255,255,255,0.025)"
          stroke="rgba(255,255,255,0.14)" strokeWidth="1"
        />

        {/* Orbiting particles */}
        <motion.g style={{ rotate: orbitAngle, transformOrigin: "200px 200px" }}>
          {ORBIT_PARTICLES.map(({ cx, cy, r, opacity }, i) => (
            <circle key={i} cx={cx} cy={cy} r={r}
              fill={`rgba(255,255,255,${opacity})`}
              filter="url(#priv-glow)"
            />
          ))}
        </motion.g>

        {/* Lock icon — centered at (200, 207) */}
        <rect x="187" y="207" width="26" height="20" rx="3"
          fill="rgba(255,255,255,0.07)"
          stroke="rgba(255,255,255,0.78)" strokeWidth="1.5"
        />
        <path d="M 193 207 v-7 a7 7 0 0 1 14 0 v7"
          fill="none" stroke="rgba(255,255,255,0.78)" strokeWidth="1.5" strokeLinecap="round"
        />
        <circle cx="200" cy="217" r="2.5" fill="rgba(255,255,255,0.78)" />
      </svg>
    </div>
  );
}

function PrivacySection() {
  return (
    <section className="relative px-6 md:px-14 py-28 max-w-6xl mx-auto">

      {/* Header */}
      <div className="mb-20">
        <motion.div {...fadeUp} className="flex items-center gap-2 mb-6">
          <span className="w-1 h-1 rounded-full bg-white/50" />
          <p className="text-[10px] tracking-[0.35em] uppercase text-white/40">Privacy & Security</p>
        </motion.div>
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.07 }}
          className="text-4xl md:text-5xl font-normal text-[#f0ece4] mb-4 leading-[1.08] max-w-lg"
          style={{ fontFamily: "var(--font-serif)" }}
        >
          Own your intelligence.
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.17 }}
          className="text-white/35 text-base leading-relaxed max-w-md"
        >
          Every conversation is yours. Encrypted, private, exportable — always.
        </motion.p>
      </div>

      {/* Two-column: shield left + features right */}
      <div className="grid md:grid-cols-[1fr_1px_1fr] gap-0 items-center mb-20">

        {/* Left — animated shield */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.1 }}
          className="flex justify-center pb-16 md:pb-0 md:pr-16"
        >
          <ShieldVisual />
        </motion.div>

        {/* Vertical separator */}
        <div className="hidden md:block self-stretch bg-white/[0.05]" />

        {/* Right — feature rows */}
        <div className="md:pl-16">
          {PRIVACY_FEATURES.map(({ label, title, body, icon }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.65, ease: "easeOut", delay: 0.1 + i * 0.1 }}
            >
              <div className="flex items-start gap-4 py-7">
                <PrivacyIcon type={icon} />
                <div>
                  <p className="text-[10px] tracking-[0.28em] uppercase text-white/35 mb-1.5"
                    style={{ fontFamily: "var(--font-sans)" }}>
                    {label}
                  </p>
                  <h3
                    className="text-xl font-normal text-[#e8e4dc] mb-1.5 leading-snug"
                    style={{ fontFamily: "var(--font-serif)" }}
                  >
                    {title}
                  </h3>
                  <p className="text-sm text-white/55 leading-relaxed">{body}</p>
                </div>
              </div>
              {i < PRIVACY_FEATURES.length - 1 && (
                <div className="border-t border-white/[0.07]" />
              )}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Compliance badges */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.7, ease: "easeOut", delay: 0.25 }}
        className="text-center"
      >
        <p className="text-[9px] tracking-[0.35em] uppercase text-white/30 mb-5">
          Compliance
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          {COMPLIANCE_BADGES.map((badge) => (
            <span
              key={badge}
              className="bg-white/[0.04] border border-white/10 px-4 py-1.5 text-[11px] text-white/55 rounded-full uppercase tracking-wider"
            >
              {badge}
            </span>
          ))}
        </div>
      </motion.div>

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

      {/* ══ CAPABILITIES ══════════════════════════════════════════════════════ */}
      <CapabilitiesSection />

      {/* ══ INTEGRATIONS ══════════════════════════════════════════════════════ */}
      <IntegrationsSection />

      {/* ══ TESTIMONIALS ══════════════════════════════════════════════════════ */}
      <TestimonialsSection />

      {/* ══ PRIVACY ═══════════════════════════════════════════════════════════ */}
      <PrivacySection />

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
