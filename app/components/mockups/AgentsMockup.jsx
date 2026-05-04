"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { AGENT_POS, AGENT_ROUTES, BUBBLE_TEXTS } from "@/app/data";

export default function AgentsMockup({ fast = false }) {
  const stepMs = fast ? 800 : 1600;
  const [step, setStep] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setStep(s => (s + 1) % 3), stepMs);
    return () => clearInterval(id);
  }, [stepMs]);

  const from    = AGENT_POS[AGENT_ROUTES[step][0]];
  const to      = AGENT_POS[AGENT_ROUTES[step][1]];
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
          stroke="rgba(204,255,0,0.6)" strokeWidth="0.75"
          animate={{ opacity: step === i ? 0.5 : 0.1 }}
          transition={{ duration: 0.35 }}
        />
      ))}

      {/* Agent avatars */}
      {AGENT_POS.map(({ cx, cy }, i) => {
        const COLORS = ["rgba(204,255,0,0.8)", "rgba(176,132,255,0.7)", "rgba(255,94,0,0.7)"];
        const isActive = AGENT_ROUTES[step][0] === i || AGENT_ROUTES[step][1] === i;
        return (
          <g key={i}>
            <motion.circle cx={cx} cy={cy} r={18}
              fill="rgba(255,255,255,0.03)"
              stroke={COLORS[i]}
              animate={{ strokeOpacity: isActive ? 0.7 : 0.2 }}
              transition={{ duration: 0.35 }}
              strokeWidth="1.5"
            />
            <text x={cx} y={cy + 4} textAnchor="middle" fontSize="11"
              fill={COLORS[i]} fillOpacity={0.9}
              fontFamily="monospace">
              {["A", "B", "C"][i]}
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
          fill="rgba(204,255,0,0.1)"
          stroke="rgba(204,255,0,0.4)" strokeWidth="0.75"
        />
        <text x={0} y={1} textAnchor="middle" fontSize="8.5"
          fill="rgba(204,255,0,0.85)" fontFamily="monospace">
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
