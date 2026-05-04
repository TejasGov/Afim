"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { DEC_ENTRIES } from "@/app/data";

export default function DecisionLog() {
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
        {DEC_ENTRIES.map(({ w, opacity, barColor, label, delay: d }, i) => (
          <div key={i} className="flex items-center gap-4">
            {/* Dot sits on top of the spine */}
            <motion.span
              className={`w-[5px] h-[5px] rounded-full shrink-0 relative z-10 ${opacity}`}
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut", delay: d }}
            />
            <div className="flex-1 h-[1.5px] rounded-full bg-white/[0.08] overflow-hidden">
              <motion.div
                className={`h-full rounded-full ${barColor || "bg-white/60"}`}
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
