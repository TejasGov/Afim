"use client";

import React from "react";
import { motion } from "framer-motion";

export const StrokeFill = ({
    text = "OMNISCIENCE",
    duration = 3,
}) => {
    return (
        <div className="w-full flex items-center justify-center overflow-hidden py-10 relative z-20">
            <svg viewBox="0 0 2400 300" className="w-full max-w-6xl h-auto">
                <motion.text
                    x="50%"
                    y="50%"
                    textAnchor="middle"
                    dominantBaseline="middle"
                    strokeWidth="2"
                    className="font-[900] text-[144px] uppercase tracking-widest stroke-zinc-100 fill-transparent"
                    initial={{ strokeDasharray: 3000, strokeDashoffset: 3000 }}
                    whileInView={{ strokeDashoffset: 0, fill: "#ffffff" }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{
                        duration,
                        ease: "easeInOut",
                        fill: { delay: duration * 0.67, duration: duration * 0.33, ease: "easeIn" },
                    }}
                >
                    {text}
                </motion.text>
            </svg>
        </div>
    );
};
