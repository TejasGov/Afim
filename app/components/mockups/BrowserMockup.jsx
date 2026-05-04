"use client";

import { motion } from "framer-motion";
import { BROWSER_LINES } from "@/app/data";

export default function BrowserMockup({ fast = false }) {
  const dur = fast ? 2.2 : 4.4;
  return (
    <svg viewBox="0 0 320 208" className="w-full h-full">
      {/* Frame */}
      <rect x="10" y="10" width="300" height="188" rx="8"
        fill="rgba(255,255,255,0.015)" stroke="rgba(255,255,255,0.12)" strokeWidth="1" />
      {/* Title bar */}
      <line x1="10" y1="40" x2="310" y2="40" stroke="rgba(255,255,255,0.07)" strokeWidth="1" />
      {/* Traffic lights */}
      <circle cx="29" cy="25" r="4.5" fill="rgba(204,255,0,0.7)" />
      <circle cx="45" cy="25" r="4.5" fill="rgba(176,132,255,0.5)" />
      <circle cx="61" cy="25" r="4.5" fill="rgba(255,94,0,0.4)" />
      {/* URL bar */}
      <rect x="82" y="16" width="160" height="18" rx="5"
        fill="rgba(255,255,255,0.03)" stroke="rgba(176,132,255,0.15)" strokeWidth="0.5" />
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
        fill="rgba(204,255,0,0)"
        animate={{ fill: [
          "rgba(204,255,0,0)",
          "rgba(204,255,0,0.08)",
          "rgba(204,255,0,0.08)",
          "rgba(204,255,0,0)",
          "rgba(204,255,0,0)",
        ]}}
        transition={{ duration: dur, repeat: Infinity, ease: "easeInOut",
          times: [0, 0.18, 0.36, 0.50, 1] }}
      />
      {/* Selection highlight — line 4 (y≈126) */}
      <motion.rect x="28" y="120" width="196" height="14" rx="2"
        fill="rgba(176,132,255,0)"
        animate={{ fill: [
          "rgba(176,132,255,0)",
          "rgba(176,132,255,0)",
          "rgba(176,132,255,0.08)",
          "rgba(176,132,255,0.08)",
          "rgba(176,132,255,0)",
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
          fill="rgba(204,255,0,0.8)" />
      </motion.g>

      <text x={303} y={194} textAnchor="end" fontSize="9"
        fill="rgba(255,255,255,0.25)" letterSpacing="2"
        fontFamily="var(--font-sans)">
        DEMO
      </text>
    </svg>
  );
}
