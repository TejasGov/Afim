"use client";

export default function StatsSection() {
  const stats = [
    { val: "19+", label: "INTEGRATIONS", note: "AND COUNTING" },
    { val: "256", label: "BIT ENCRYPTION", note: "MILITARY GRADE" },
    { val: "∞", label: "CONTEXT MEMORY", note: "NEVER FORGET" },
  ];

  return (
    <section className="py-32 px-6 max-w-6xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-20">
        {stats.map((s, i) => (
          <div key={i} className="relative group flex flex-col items-center text-center">
            <div className="text-[10rem] md:text-[13rem] font-black leading-none relative text-white">
              {s.val}
              {/* Marker highlight */}
              <div className="absolute top-1/2 left-0 w-full h-8 bg-[#ccff00] -z-10 -rotate-3 group-hover:rotate-3 transition-transform duration-500 opacity-60" />
            </div>
            <div className="font-mono text-xl font-bold uppercase tracking-widest mt-4 text-white/70">
              {s.label}
            </div>
            <div className="font-marker text-[#ff5e00] text-2xl rotate-[-12deg] absolute top-0 -right-4 group-hover:scale-110 transition-transform">
              ({s.note})
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
