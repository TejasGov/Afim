"use client";

export default function BrutalButton({ children, color = "bg-[#ccff00]", textColor = "text-black", className = "", href }) {
  const Tag = href ? "a" : "button";
  return (
    <Tag href={href} className={`relative group inline-block ${className}`}>
      <div className="absolute inset-0 translate-x-2 translate-y-2 border-2 border-white/20 bg-white/10 transition-transform group-hover:translate-x-3 group-hover:translate-y-3" />
      <div className={`relative px-8 py-4 border-2 border-white/30 ${color} ${textColor} font-bold uppercase tracking-widest text-sm z-10 hover:-translate-y-1 hover:-translate-x-1 transition-transform`}>
        {children}
      </div>
    </Tag>
  );
}
