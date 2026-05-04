"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { GRAPH_NODES, GRAPH_LINES } from "@/app/data";

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
export default function NodeGraph() {
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
            stroke="rgba(204,255,0,0.18)"
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
