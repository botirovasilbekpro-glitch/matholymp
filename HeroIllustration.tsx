import React from 'react';

export const HeroIllustration: React.FC = () => {
  return (
    <div className="relative w-full max-w-lg mx-auto flex items-center justify-center p-4 select-none">
      {/* Background glow halo */}
      <div className="absolute -inset-4 bg-gradient-to-tr from-[#7C3AED]/30 via-[#A855F7]/20 to-[#E879F9]/20 rounded-full blur-2xl opacity-75 animate-pulse" />

      {/* Main SVG Composition */}
      <svg
        viewBox="0 0 540 420"
        className="relative z-10 w-full h-auto drop-shadow-[0_15px_35px_rgba(124,58,237,0.35)]"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="boardGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#1E0B3C" />
            <stop offset="100%" stopColor="#0E031E" />
          </linearGradient>
          <linearGradient id="purpleGold" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#7C3AED" />
            <stop offset="50%" stopColor="#A855F7" />
            <stop offset="100%" stopColor="#E879F9" />
          </linearGradient>
          <linearGradient id="book1" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#2563EB" />
            <stop offset="100%" stopColor="#1D4ED8" />
          </linearGradient>
          <linearGradient id="book2" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#7C3AED" />
            <stop offset="100%" stopColor="#581C87" />
          </linearGradient>
          <linearGradient id="book3" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#DB2777" />
            <stop offset="100%" stopColor="#9D174D" />
          </linearGradient>
          <filter id="neonGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* 1. Chalkboard in 3D Perspective */}
        <polygon
          points="80,70 460,50 440,270 60,280"
          fill="url(#boardGrad)"
          stroke="#4C1D95"
          strokeWidth="5"
        />
        {/* Board Wooden Frame Stand */}
        <line x1="120" y1="280" x2="80" y2="380" stroke="#3B1D63" strokeWidth="6" strokeLinecap="round" />
        <line x1="380" y1="270" x2="420" y2="380" stroke="#3B1D63" strokeWidth="6" strokeLinecap="round" />
        <line x1="90" y1="340" x2="410" y2="340" stroke="#3B1D63" strokeWidth="4" strokeLinecap="round" />

        {/* 2. Mathematical Formulas on Chalkboard */}
        <g fill="#E879F9" opacity="0.9" fontFamily="'JetBrains Mono', monospace">
          <text x="110" y="115" fontSize="20" fontWeight="bold" filter="url(#neonGlow)">
            e^{"{"}i\pi{"}"} + 1 = 0
          </text>
          <text x="110" y="155" fontSize="16" fill="#C4B5FD">
            \sum_{"{"}k=1{"}"}^n k^2 = \frac{"{"}n(n+1)(2n+1){"}"}{"{"}6{"}"}
          </text>
          <text x="110" y="195" fontSize="15" fill="#93C5FD">
            a^2 + b^2 = c^2 \quad (\angle C = 90^\circ)
          </text>
          <text x="110" y="235" fontSize="14" fill="#F472B6">
            \gcd(a, b) \times \operatorname{"{"}lcm{"}"}(a,b) = a \cdot b
          </text>
        </g>

        {/* 3. Geometric Figures floating */}
        {/* Icosahedron / Golden Triangle */}
        <polygon
          points="360,95 410,165 310,165"
          fill="none"
          stroke="#38BDF8"
          strokeWidth="2"
          strokeDasharray="3,3"
          opacity="0.75"
        />
        <circle cx="360" cy="142" r="28" fill="none" stroke="#F43F5E" strokeWidth="1.5" opacity="0.6" />

        {/* 4. Stack of Books at the base */}
        {/* Bottom book (Blue) */}
        <polygon points="120,320 280,310 270,335 110,345" fill="url(#book1)" stroke="#1E40AF" strokeWidth="2" />
        <polygon points="280,310 320,320 310,345 270,335" fill="#1E3A8A" />
        <rect x="110" y="335" width="160" height="10" fill="#E2E8F0" rx="1" />

        {/* Middle book (Purple) */}
        <polygon points="135,295 290,285 285,310 130,320" fill="url(#book2)" stroke="#581C87" strokeWidth="2" />
        <polygon points="290,285 330,295 325,320 285,310" fill="#3B0764" />
        <rect x="130" y="310" width="155" height="10" fill="#F1F5F9" rx="1" />

        {/* Top book (Pink) */}
        <polygon points="150,270 285,262 280,285 145,293" fill="url(#book3)" stroke="#831843" strokeWidth="2" />
        <rect x="145" y="285" width="135" height="8" fill="#F8FAFC" rx="1" />

        {/* 5. Graduation Cap on top of books */}
        <g transform="translate(195, 205)">
          {/* Cap Skull cap base */}
          <path d="M 20 50 Q 50 65 80 50 L 75 65 Q 50 78 25 65 Z" fill="#2E1065" stroke="#7C3AED" strokeWidth="2" />
          {/* Diamond top */}
          <polygon points="50,15 105,38 50,55 -5,35" fill="#4C1D95" stroke="#A855F7" strokeWidth="2.5" />
          {/* Center button */}
          <circle cx="50" cy="35" r="4.5" fill="#E879F9" />
          {/* Tassel cord */}
          <path d="M 50 35 C 70 38 85 45 92 65" fill="none" stroke="#FACC15" strokeWidth="2.5" />
          <polygon points="90,65 96,65 94,80 88,80" fill="#FACC15" />
        </g>

        {/* 6. Glowing Floating Sparkles */}
        <circle cx="70" cy="65" r="3" fill="#E879F9" opacity="0.8" />
        <circle cx="470" cy="110" r="4" fill="#38BDF8" opacity="0.7" />
        <circle cx="420" cy="240" r="3" fill="#FACC15" opacity="0.8" />
        <circle cx="100" cy="230" r="2.5" fill="#A855F7" opacity="0.8" />
      </svg>
    </div>
  );
};
