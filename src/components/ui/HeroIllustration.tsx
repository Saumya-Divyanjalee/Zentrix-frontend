import React from 'react';

export default function HeroIllustration() {
  return (
    <svg viewBox="0 0 480 480" className="w-full h-auto" role="img" aria-label="Student reaching an achievement, surrounded by orbiting study and AI icons">
      <defs>
        <linearGradient id="podiumGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#818cf8" />
          <stop offset="100%" stopColor="#4f46e5" />
        </linearGradient>
        <linearGradient id="figureGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#a78bfa" />
          <stop offset="100%" stopColor="#6366f1" />
        </linearGradient>
        <radialGradient id="glowGrad" cx="50%" cy="35%" r="55%">
          <stop offset="0%" stopColor="#fbbf24" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#fbbf24" stopOpacity="0" />
        </radialGradient>
      </defs>

      <circle cx="240" cy="200" r="190" fill="url(#glowGrad)"
        style={{ animation: 'fadeIn 1.2s ease-out 0s forwards, floatGentle 6s ease-in-out 1.2s infinite', opacity: 0 }} />

      <circle cx="240" cy="240" r="195" fill="none" stroke="#e0e7ff" strokeWidth="1.5" strokeDasharray="2 8"
        style={{ animation: 'ringFade 0.7s ease-out 0.15s forwards', opacity: 0, transformOrigin: '240px 240px' }} />
      <circle cx="240" cy="240" r="150" fill="none" stroke="#e0e7ff" strokeWidth="1.5" strokeDasharray="2 8"
        style={{ animation: 'ringFade 0.7s ease-out 0.3s forwards', opacity: 0, transformOrigin: '240px 240px' }} />

      <g style={{ animation: 'riseUp 0.6s cubic-bezier(.16,1,.3,1) 0.35s forwards', opacity: 0 }}>
        <rect x="150" y="372" width="180" height="62" rx="10" fill="url(#podiumGrad)" />
        <rect x="150" y="372" width="180" height="14" rx="7" fill="#a5b4fc" />
        <text x="240" y="412" textAnchor="middle" fontFamily="'Bungee', sans-serif" fontSize="15" fill="#fff" letterSpacing="1">ZENTRIX</text>
      </g>

      <g style={{ animation: 'riseUp 0.65s cubic-bezier(.16,1,.3,1) 0.55s forwards', opacity: 0 }}>
        <rect x="218" y="330" width="16" height="48" rx="6" fill="#312e81" />
        <rect x="246" y="330" width="16" height="48" rx="6" fill="#312e81" />
        <path d="M205 250 q-6 50 8 86 h54 q14 -36 8 -86 q-35 -16 -70 0 z" fill="url(#figureGrad)" />
        <path d="M258 262 q26 -10 34 -48" stroke="url(#figureGrad)" strokeWidth="16" strokeLinecap="round" fill="none" />
        <path d="M212 268 q-14 18 -10 40" stroke="url(#figureGrad)" strokeWidth="14" strokeLinecap="round" fill="none" />
        <circle cx="240" cy="222" r="26" fill="#fcd9b8" />
        <polygon points="240,190 282,206 240,222 198,206" fill="#1e1b4b" />
        <rect x="236" y="206" width="8" height="6" fill="#1e1b4b" />
        <line x1="278" y1="208" x2="278" y2="228" stroke="#1e1b4b" strokeWidth="2" />
        <circle cx="278" cy="230" r="3" fill="#f59e0b" />
      </g>

      <g style={{ animation: 'trophyLift 0.5s cubic-bezier(.34,1.56,.64,1) 0.95s forwards, floatGentle 4s ease-in-out 1.45s infinite', opacity: 0, transformOrigin: '294px 200px' }}>
        <circle cx="294" cy="200" r="22" fill="#fef3c7" opacity="0.5" />
        <path d="M284 190 h20 v10 q0 12 -10 12 q-10 0 -10 -12 z" fill="#f59e0b" />
        <path d="M284 192 q-8 0 -8 8 q0 8 8 8" stroke="#f59e0b" strokeWidth="2.5" fill="none" />
        <path d="M304 192 q8 0 8 8 q0 8 -8 8" stroke="#f59e0b" strokeWidth="2.5" fill="none" />
        <rect x="291" y="212" width="6" height="6" fill="#f59e0b" />
        <rect x="287" y="218" width="14" height="4" rx="1" fill="#d97706" />
      </g>

      <g style={{ animation: 'popIn 0.45s cubic-bezier(.34,1.56,.64,1) 1.05s forwards, floatGentle 5s ease-in-out 1.5s infinite', opacity: 0, transformOrigin: '68px 160px' }}>
        <circle cx="68" cy="160" r="26" fill="#fff" stroke="#e0e7ff" strokeWidth="2" />
        <path d="M58 160 l7 7 13 -16" stroke="#6366f1" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      </g>
      <g style={{ animation: 'popIn 0.45s cubic-bezier(.34,1.56,.64,1) 1.15s forwards, floatGentle 5.5s ease-in-out 1.6s infinite', opacity: 0, transformOrigin: '58px 320px' }}>
        <circle cx="58" cy="320" r="26" fill="#fff" stroke="#e0e7ff" strokeWidth="2" />
        <rect x="46" y="308" width="24" height="24" rx="3" fill="none" stroke="#8b5cf6" strokeWidth="2.5" />
        <line x1="50" y1="316" x2="66" y2="316" stroke="#8b5cf6" strokeWidth="2" />
        <line x1="50" y1="322" x2="66" y2="322" stroke="#8b5cf6" strokeWidth="2" />
        <line x1="50" y1="328" x2="60" y2="328" stroke="#8b5cf6" strokeWidth="2" />
      </g>
      <g style={{ animation: 'popIn 0.45s cubic-bezier(.34,1.56,.64,1) 1.25s forwards, floatGentle 4.5s ease-in-out 1.7s infinite', opacity: 0, transformOrigin: '420px 150px' }}>
        <circle cx="420" cy="150" r="26" fill="#fff" stroke="#e0e7ff" strokeWidth="2" />
        <rect x="409" y="148" width="5" height="12" fill="#f59e0b" />
        <rect x="417" y="142" width="5" height="18" fill="#f59e0b" />
        <rect x="425" y="138" width="5" height="22" fill="#f59e0b" />
      </g>
      <g style={{ animation: 'popIn 0.45s cubic-bezier(.34,1.56,.64,1) 1.35s forwards, floatGentle 5.2s ease-in-out 1.8s infinite', opacity: 0, transformOrigin: '430px 310px' }}>
        <circle cx="430" cy="310" r="26" fill="#fff" stroke="#e0e7ff" strokeWidth="2" />
        <path d="M430 297 l4 9 9 4 -9 4 -4 9 -4 -9 -9 -4 9 -4 z" fill="#ec4899" />
      </g>

      <rect x="294" y="200" width="6" height="6" rx="1" fill="#f59e0b"
        style={{ animation: 'confettiBurst 1.1s ease-out 1.05s forwards', opacity: 0, '--cx': '-90px', '--cy': '-70px', '--cr': '140deg' } as React.CSSProperties} />
      <rect x="294" y="200" width="6" height="6" rx="1" fill="#8b5cf6"
        style={{ animation: 'confettiBurst 1.1s ease-out 1.08s forwards', opacity: 0, '--cx': '70px', '--cy': '-90px', '--cr': '-110deg' } as React.CSSProperties} />
      <rect x="294" y="200" width="5" height="5" rx="1" fill="#ec4899"
        style={{ animation: 'confettiBurst 1.1s ease-out 1.12s forwards', opacity: 0, '--cx': '90px', '--cy': '10px', '--cr': '200deg' } as React.CSSProperties} />
      <circle cx="294" cy="200" r="4" fill="#6366f1"
        style={{ animation: 'confettiBurst 1.1s ease-out 1.1s forwards', opacity: 0, '--cx': '-60px', '--cy': '40px', '--cr': '90deg' } as React.CSSProperties} />
      <circle cx="294" cy="200" r="3.5" fill="#f59e0b"
        style={{ animation: 'confettiBurst 1.1s ease-out 1.15s forwards', opacity: 0, '--cx': '-30px', '--cy': '-110px', '--cr': '60deg' } as React.CSSProperties} />
      <circle cx="294" cy="200" r="4" fill="#ec4899"
        style={{ animation: 'confettiBurst 1.1s ease-out 1.18s forwards', opacity: 0, '--cx': '110px', '--cy': '-40px', '--cr': '-160deg' } as React.CSSProperties} />
    </svg>
  );
}