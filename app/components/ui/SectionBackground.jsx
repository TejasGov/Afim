"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function SectionBackground({ url, loading = "lazy" }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  return (
    <div ref={ref} className="absolute inset-0 pointer-events-none" aria-hidden="true" style={{ position: "absolute" }}>
      <motion.div
        className="absolute inset-[-10%]"
        style={{ y }}
        animate={{ scale: [1, 1.05] }}
        transition={{ duration: 30, repeat: Infinity, repeatType: "reverse", ease: "linear" }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={url}
          alt=""
          loading={loading}
          draggable={false}
          className="w-full h-full object-cover select-none"
        />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-b from-black/85 via-black/68 to-black/88" />
      <div className="absolute inset-x-0 top-0 h-52 bg-gradient-to-b from-[#05070f] to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-52 bg-gradient-to-t from-[#05070f] to-transparent" />
    </div>
  );
}
