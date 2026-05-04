"use client";

import { useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight, Star } from "lucide-react";
import { TOP_ROW, BOT_ROW } from "@/app/data";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const ALL_APPS = [...TOP_ROW, ...BOT_ROW];
const CARDS = ALL_APPS.slice(0, 6).map((app, i) => ({
  name: app.label.toUpperCase(),
  url: app.url,
  color: ["bg-[#ccff00]/10", "bg-[#b084ff]/10", "bg-[#ff5e00]/10", "bg-[#ccff00]/10", "bg-[#b084ff]/10", "bg-[#ff5e00]/10"][i],
}));

export default function IntegrationsSection() {
  const container = useRef(null);
  const wrapper = useRef(null);

  useLayoutEffect(() => {
    if (!container.current || !wrapper.current) return;

    const ctx = gsap.context(() => {
      const getScrollDistance = () => {
        if (!wrapper.current) return 0;
        return wrapper.current.scrollWidth - window.innerWidth;
      };

      gsap.to(wrapper.current, {
        x: () => -getScrollDistance(),
        ease: "none",
        scrollTrigger: {
          trigger: container.current,
          start: "top top",
          end: () => `+=${getScrollDistance()}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });
    }, container);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={container} id="features" className="overflow-hidden bg-[#05070f] text-[#e8e4dc] py-20 h-screen border-t-2 border-white/5">
      <div ref={wrapper} className="flex h-full items-center pl-12 md:pl-32">
        {/* Title Block */}
        <div className="w-[80vw] md:w-[40vw] shrink-0 pr-20">
          <h2 className="text-6xl md:text-8xl font-black uppercase mb-8 leading-none tracking-tighter">
            Across Your <br />
            <span className="text-outline-white">Apps</span>
          </h2>
          <p className="font-mono text-white/40 text-sm uppercase mb-8 max-w-sm">
            ΛFIM sits quietly on top of the tools you already use. No setup, no migration.
          </p>
          <div className="w-24 h-24 border-2 border-white/30 rounded-full flex items-center justify-center animate-spin-slow">
            <Star fill="white" className="text-white" />
          </div>
        </div>

        {/* Cards */}
        {CARDS.map((card, i) => (
          <div key={i} className="w-[80vw] md:w-[50vw] h-[65vh] shrink-0 mr-12 md:mr-24 relative group">
            {/* Back Card (Depth) */}
            <div className="absolute inset-0 bg-white/5 border-2 border-white/10 translate-x-4 translate-y-4 rounded-xl" />

            {/* Main Card */}
            <div className={`relative h-full ${card.color} border-2 border-white/15 rounded-xl p-8 flex flex-col justify-between transition-transform group-hover:-translate-y-2`}>
              <div className="flex justify-between items-start">
                <span className="font-mono bg-white/10 text-white px-3 py-1 text-xl border border-white/20">(0{i + 1})</span>
                <ArrowUpRight className="w-12 h-12 bg-white/10 text-white rounded-full p-2 border-2 border-white/20 transition-transform group-hover:rotate-45" />
              </div>

              <div className="flex flex-col items-center justify-center flex-1 gap-6">
                <img src={card.url} alt={card.name} className="w-20 h-20 object-contain" />
              </div>

              <div>
                <h3 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter mb-4">{card.name}</h3>
                <div className="flex gap-4">
                  {["Integration", "Live"].map((tag) => (
                    <span key={tag} className="border border-white/20 px-4 py-1 rounded-full text-white/60 font-bold uppercase text-xs">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
