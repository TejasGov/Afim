"use client";

export default function PrivacyIcon({ type }) {
  const S = { fill: "none", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round" };
  const icons = {
    lock: (
      <>
        <rect x="3" y="11" width="18" height="11" rx="2" {...S} />
        <path d="M7 11V7a5 5 0 0 1 10 0v4" {...S} />
        <circle cx="12" cy="16" r="1" fill="currentColor" stroke="none" />
      </>
    ),
    cloud: (
      <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z" {...S} />
    ),
    shield: (
      <>
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" {...S} />
        <polyline points="9 12 11 14 15 10" {...S} />
      </>
    ),
    database: (
      <>
        <ellipse cx="12" cy="5" rx="9" ry="3" {...S} />
        <path d="M3 5v4c0 1.66 4.03 3 9 3s9-1.34 9-3V5" {...S} />
        <path d="M3 9v4c0 1.66 4.03 3 9 3s9-1.34 9-3V9" {...S} />
        <path d="M3 13v4c0 1.66 4.03 3 9 3s9-1.34 9-3v-4" {...S} />
      </>
    ),
  };
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" className="text-white/45 flex-shrink-0 mt-0.5">
      {icons[type]}
    </svg>
  );
}
