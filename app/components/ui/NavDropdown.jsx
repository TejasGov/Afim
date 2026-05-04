"use client";

export default function NavDropdown({ label }) {
  return (
    <button className="flex items-center gap-1 text-sm text-white/60 hover:text-white/90 transition-colors duration-150">
      {label}
      <svg className="w-3 h-3 mt-px opacity-50" viewBox="0 0 10 6" fill="none">
        <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    </button>
  );
}
