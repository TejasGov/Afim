"use client";

import { motion } from "framer-motion";
import { NET_CENTER, NET_NODES } from "@/app/data";

function PulseDot({ to, delay, fast }) {
  const dur = fast ? 1.1 : 2.0;
  return (
    <motion.circle r={2.8} fill="rgba(204,255,0,0.9)"
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

export default function NetworkMockup({ fast = false }) {
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
          stroke="rgba(204,255,0,0.14)" strokeWidth="1"
        />
      ))}

      {/* Staggered data pulses */}
      {NET_NODES.map((n, i) => (
        <PulseDot key={i} to={n} delay={i * 0.5} fast={fast} />
      ))}

      {/* External nodes */}
      {NET_NODES.map(({ cx, cy, label }, i) => {
        const NEON = ["rgba(204,255,0,0.8)", "rgba(176,132,255,0.8)", "rgba(255,94,0,0.8)", "rgba(204,255,0,0.8)"];
        return (
        <g key={i}>
          <motion.circle cx={cx} cy={cy} r={5.5} fill={NEON[i]}
            filter="url(#net2-glow)"
            animate={{ opacity: [0.35, 0.8, 0.35] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut", delay: i * 0.55 }}
          />
          <text x={cx} y={cy + 17} textAnchor="middle" fontSize="7.5"
            fill="rgba(255,255,255,0.38)" fontFamily="monospace">
            {label}
          </text>
        </g>
        );
      })}

      {/* Central Afim node */}
      <circle cx={NET_CENTER.cx} cy={NET_CENTER.cy} r={22}
        fill="rgba(204,255,0,0.04)" stroke="rgba(204,255,0,0.3)" strokeWidth="1.5" />
      <text x={NET_CENTER.cx} y={NET_CENTER.cy + 4} textAnchor="middle" fontSize="9.5"
        fill="rgba(204,255,0,0.9)" fontFamily="monospace" letterSpacing="0.5">
        ΛFIM
      </text>

      <text x={310} y={202} textAnchor="end" fontSize="9"
        fill="rgba(255,255,255,0.25)" letterSpacing="2"
        fontFamily="var(--font-sans)">
        DEMO
      </text>
    </svg>
  );
}
