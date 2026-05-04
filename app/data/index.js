// ── TRUSTED BY ────────────────────────────────────────────────────────────────

export const TRUSTED_BY = ["POSTMAN", "RIO", "DOORDASH", "CAPITAL.COM", "AFRIEX"];

// ── PLATFORM LINKS ────────────────────────────────────────────────────────────

export const PLATFORM_LINKS = [
  { icon: "🌐", label: "Chrome",   status: "Live",        dot: "bg-green-400",  delay: 0 },
  { icon: "💬", label: "iMessage", status: "Live",        dot: "bg-green-400",  delay: 0.1 },
  { icon: "#",  label: "Slack",    status: "Live",        dot: "bg-green-400",  delay: 0.2 },
  { icon: "🖥", label: "Desktop",  status: "Coming soon", dot: "bg-amber-400",  delay: 0.3, soon: true },
];

// ── CARDS ─────────────────────────────────────────────────────────────────────

export const BIG_CARDS = [
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

export const SMALL_CARDS = [
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

// ── INTEGRATIONS ──────────────────────────────────────────────────────────────

export const TOP_ROW = [
  { label: "Slack",           url: "/slack.svg"                                   },
  { label: "Gemini",          url: "/gemini.svg"                                  },
  { label: "Perplexity",      url: "https://cdn.simpleicons.org/perplexity/22B8CD"},
  { label: "Claude",          url: "https://cdn.simpleicons.org/anthropic/D97757" },
  { label: "OpenAI",          url: "/openai.svg"    },
];

export const BOT_ROW = [];

// Icon slot dimensions (shared by IntegrationsSection + AppIcon)
export const ICON_SIZE = 72;
export const ICON_GAP  = 12;
export const HALF_SLOT = (ICON_SIZE + ICON_GAP) / 2; // 42px

// ── TESTIMONIALS ──────────────────────────────────────────────────────────────

export const TESTIMONIALS = [
  {
    quote: "ΛFIM is the extension I didn't know I needed. My Claude conversations used to hit a wall — now they keep building on each other.",
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
    quote: "I used to re-explain my entire codebase at the start of every session. ΛFIM just remembers. I didn't realise how much time I was losing until it stopped.",
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

export const SOCIAL_LOGOS = [
  { label: "OpenAI",    url: "https://cdn.simpleicons.org/openai/white"    },
  { label: "Anthropic", url: "https://cdn.simpleicons.org/anthropic/white" },
  { label: "Vercel",    url: "https://cdn.simpleicons.org/vercel/white"    },
  { label: "Linear",    url: "https://cdn.simpleicons.org/linear/white"    },
  { label: "Notion",    url: "https://cdn.simpleicons.org/notion/white"    },
  { label: "GitHub",    url: "https://cdn.simpleicons.org/github/white"    },
];

// 400px card + 12px left margin + 12px right margin = 424px per slot
export const T_SLOT     = 424;
export const T_SINGLE_W = TESTIMONIALS.length * T_SLOT; // 6 * 424 = 2544

// ── PRIVACY & SECURITY ────────────────────────────────────────────────────────

export const PRIVACY_FEATURES = [
  { label: "ENCRYPTION",     title: "256-bit Encryption", body: "End-to-end encrypted at rest and in transit.",   icon: "lock"     },
  { label: "INFRASTRUCTURE", title: "Private Cloud",       body: "Your summaries never touch a shared server.",   icon: "cloud"    },
  { label: "AUTHENTICATION", title: "Multi-factor Auth",   body: "Hardware key and biometric support built in.",  icon: "shield"   },
  { label: "DATA CONTROL",   title: "Full Data Control",   body: "Export or delete everything, any time.",        icon: "database" },
];

export const COMPLIANCE_BADGES = ["SOC 2 Type II", "GDPR Ready", "HIPAA Compatible", "ISO 27001"];

// ── ANIMATION HELPERS ─────────────────────────────────────────────────────────

export const fadeUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-100px" },
  transition: { duration: 0.8, ease: "easeOut" },
};

// ── MOCKUP DATA ───────────────────────────────────────────────────────────────

export const GRAPH_NODES = [
  { x: 80,  y: 88,  r: 4, fill: "rgba(204,255,0,0.90)",  delay: 0   },
  { x: 140, y: 55,  r: 3, fill: "rgba(176,132,255,0.80)", delay: 0.4 },
  { x: 140, y: 121, r: 3, fill: "rgba(255,94,0,0.75)",    delay: 0.8 },
  { x: 210, y: 40,  r: 2, fill: "rgba(204,255,0,0.55)",  delay: 1.2 },
  { x: 210, y: 88,  r: 3, fill: "rgba(176,132,255,0.80)", delay: 0.6 },
  { x: 210, y: 136, r: 2, fill: "rgba(255,94,0,0.55)",    delay: 1.0 },
];

export const GRAPH_LINES = [[0, 1], [0, 2], [1, 3], [1, 4], [2, 4], [2, 5]];

export const DEC_ENTRIES = [
  { w: "72%", opacity: "bg-[#ccff00]/70", barColor: "bg-[#ccff00]/60", label: "Context window exceeded",  delay: 0    },
  { w: "55%", opacity: "bg-[#b084ff]/70", barColor: "bg-[#b084ff]/60", label: "Summary generated",         delay: 0.12 },
  { w: "82%", opacity: "bg-[#ff5e00]/70", barColor: "bg-[#ff5e00]/60", label: "Decision captured",          delay: 0.24 },
  { w: "45%", opacity: "bg-[#ccff00]/50", barColor: "bg-[#ccff00]/40", label: "Agent consensus reached",   delay: 0.36 },
];

export const AGENT_POS    = [
  { cx: 160, cy: 52  },
  { cx: 74,  cy: 155 },
  { cx: 246, cy: 155 },
];
export const AGENT_ROUTES  = [[0, 1], [1, 2], [2, 0]];
export const BUBBLE_TEXTS  = ["Agree", "Revise", "Ship it"];

export const BROWSER_LINES = [
  { x: 32, y: 78,  w: 140, o: 0.50 },
  { x: 32, y: 94,  w: 108, o: 0.35 },
  { x: 32, y: 110, w: 162, o: 0.50 },
  { x: 32, y: 126, w: 88,  o: 0.30 },
  { x: 32, y: 142, w: 128, o: 0.42 },
];

export const NET_CENTER = { cx: 160, cy: 104 };
export const NET_NODES  = [
  { cx: 72,  cy: 48,  label: "ChatGPT"    },
  { cx: 248, cy: 48,  label: "Claude"     },
  { cx: 72,  cy: 160, label: "Gemini"     },
  { cx: 248, cy: 160, label: "Perplexity" },
];

export const ORBIT_R = 132;
export const ORBIT_PARTICLES = [
  { cx: 200,                         cy: 200 - ORBIT_R,                r: 3.5, opacity: 0.62 },
  { cx: 200 + ORBIT_R * 0.866,       cy: 200 + ORBIT_R * 0.5,         r: 2.5, opacity: 0.40 },
  { cx: 200 - ORBIT_R * 0.866,       cy: 200 + ORBIT_R * 0.5,         r: 2.0, opacity: 0.30 },
];
