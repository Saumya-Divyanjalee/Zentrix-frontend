export default function AuthIllustration() {
  return (
    <svg viewBox="0 0 520 560" className="w-full h-auto" role="img" aria-label="Students collaborating around study tools, a globe, and an AI assistant">
      <defs>
        <linearGradient id="bookGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#a5b4fc" />
          <stop offset="100%" stopColor="#818cf8" />
        </linearGradient>
        <linearGradient id="globeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#c7d2fe" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#6366f1" stopOpacity="0.15" />
        </linearGradient>
        <linearGradient id="personA" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#c4b5fd" />
          <stop offset="100%" stopColor="#a78bfa" />
        </linearGradient>
        <linearGradient id="personB" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#93c5fd" />
          <stop offset="100%" stopColor="#60a5fa" />
        </linearGradient>
      </defs>

      <g style={{ animation: 'floatGentle 7s ease-in-out infinite' }}>
        <rect x="20" y="40" width="170" height="190" rx="14" fill="#ffffff" opacity="0.95" />
        <rect x="20" y="40" width="170" height="190" rx="14" fill="none" stroke="#e0e7ff" strokeWidth="2" />
        <circle cx="48" cy="68" r="3" fill="#a5b4fc" />
        <circle cx="64" cy="68" r="3" fill="#a5b4fc" />
        <circle cx="80" cy="68" r="3" fill="#a5b4fc" />
        <rect x="36" y="92" width="20" height="20" rx="5" fill="#eef2ff" stroke="#6366f1" strokeWidth="2" />
        <path d="M40 102 l4 4 7 -8" stroke="#6366f1" strokeWidth="2" fill="none" strokeLinecap="round" />
        <rect x="64" y="96" width="100" height="6" rx="3" fill="#c7d2fe" />
        <rect x="64" y="106" width="70" height="5" rx="2.5" fill="#e0e7ff" />
        <rect x="36" y="132" width="20" height="20" rx="5" fill="#eef2ff" stroke="#8b5cf6" strokeWidth="2" />
        <path d="M40 142 l4 4 7 -8" stroke="#8b5cf6" strokeWidth="2" fill="none" strokeLinecap="round" />
        <rect x="64" y="136" width="90" height="6" rx="3" fill="#c7d2fe" />
        <rect x="64" y="146" width="60" height="5" rx="2.5" fill="#e0e7ff" />
        <rect x="36" y="172" width="20" height="20" rx="5" fill="none" stroke="#d4d4d8" strokeWidth="2" />
        <rect x="64" y="176" width="80" height="6" rx="3" fill="#e4e4e7" />
        <rect x="64" y="186" width="50" height="5" rx="2.5" fill="#f4f4f5" />
      </g>

      <g style={{ animation: 'floatGentle 6s ease-in-out 0.6s infinite' }}>
        <rect x="220" y="20" width="120" height="120" rx="16" fill="#ffffff" opacity="0.95" />
        <rect x="220" y="20" width="120" height="120" rx="16" fill="none" stroke="#e0e7ff" strokeWidth="2" />
        <circle cx="280" cy="62" r="20" fill="#eef2ff" />
        <path d="M270 58 q10 -10 20 0" stroke="#6366f1" strokeWidth="2.5" fill="none" strokeLinecap="round" />
        <circle cx="272" cy="60" r="2.5" fill="#6366f1" />
        <circle cx="288" cy="60" r="2.5" fill="#6366f1" />
        <rect x="240" y="96" width="80" height="8" rx="4" fill="#c7d2fe" />
        <rect x="240" y="110" width="55" height="6" rx="3" fill="#e0e7ff" />
      </g>

      <g>
        <path d="M260 130 L260 290 L160 310 L160 150 Z" fill="url(#bookGrad)" />
        <path d="M260 130 L260 290 L360 310 L360 150 Z" fill="#818cf8" />
        <line x1="260" y1="130" x2="260" y2="290" stroke="#4f46e5" strokeWidth="3" />
        <rect x="180" y="180" width="60" height="4" rx="2" fill="#eef2ff" opacity="0.7" />
        <rect x="180" y="195" width="50" height="4" rx="2" fill="#eef2ff" opacity="0.7" />
        <rect x="280" y="180" width="60" height="4" rx="2" fill="#eef2ff" opacity="0.7" />
        <rect x="280" y="195" width="50" height="4" rx="2" fill="#eef2ff" opacity="0.7" />
      </g>

      <g style={{ animation: 'floatGentle 8s ease-in-out 0.3s infinite' }} transform="translate(260,360)">
        <circle r="78" fill="url(#globeGrad)" />
        <circle r="78" fill="none" stroke="#a5b4fc" strokeWidth="1.5" />
        <ellipse rx="78" ry="26" fill="none" stroke="#a5b4fc" strokeWidth="1.2" />
        <ellipse rx="40" ry="78" fill="none" stroke="#a5b4fc" strokeWidth="1.2" />
        <ellipse rx="78" ry="78" fill="none" stroke="#a5b4fc" strokeWidth="1.2" transform="rotate(60)" />
        <line x1="-78" y1="0" x2="78" y2="0" stroke="#a5b4fc" strokeWidth="1.2" />
      </g>

      <g transform="translate(140,360)">
        <circle cx="0" cy="-86" r="18" fill="#fcd9b8" />
        <path d="M-22 0 q-6 50 4 78 h36 q10 -28 4 -78 q-22 -14 -44 0 z" fill="url(#personA)" />
        <path d="M-22 8 q-16 12 -14 32" stroke="url(#personA)" strokeWidth="11" strokeLinecap="round" fill="none" />
        <rect x="-30" y="34" width="22" height="16" rx="2" fill="#eef2ff" stroke="#a78bfa" strokeWidth="1.5" />
      </g>

      <g transform="translate(370,350)">
        <circle cx="0" cy="-92" r="18" fill="#e8b894" />
        <path d="M-22 -6 q-6 52 4 80 h36 q10 -28 4 -80 q-22 -14 -44 0 z" fill="url(#personB)" />
        <path d="M22 4 q14 -10 18 -30" stroke="url(#personB)" strokeWidth="11" strokeLinecap="round" fill="none" />
      </g>

      <g transform="translate(150,480)">
        <rect x="-10" y="20" width="120" height="60" rx="6" fill="#ffffff" opacity="0.9" stroke="#e0e7ff" strokeWidth="2" />
        <rect x="0" y="-30" width="70" height="48" rx="4" fill="#312e81" />
        <rect x="6" y="-24" width="58" height="36" rx="2" fill="#eef2ff" />
        <circle cx="22" cy="-8" r="10" fill="#c7d2fe" />
        <rect x="36" y="-12" width="20" height="3" rx="1.5" fill="#a5b4fc" />
        <rect x="36" y="-6" width="14" height="3" rx="1.5" fill="#c7d2fe" />
        <circle cx="-30" cy="2" r="16" fill="#fcd9b8" />
        <path d="M-46 22 q0 24 16 24 h0 q16 0 16 -24" fill="url(#personA)" />
      </g>

      <g transform="translate(400,470)">
        <rect x="-30" y="0" width="80" height="70" rx="8" fill="#ffffff" opacity="0.92" stroke="#e0e7ff" strokeWidth="2" />
        <rect x="-18" y="14" width="16" height="16" rx="3" fill="#eef2ff" stroke="#6366f1" strokeWidth="1.5" />
        <path d="M-15 22 l2 2 4 -5" stroke="#6366f1" strokeWidth="1.5" fill="none" />
        <rect x="2" y="18" width="40" height="5" rx="2.5" fill="#c7d2fe" />
        <rect x="-18" y="38" width="16" height="16" rx="3" fill="none" stroke="#d4d4d8" strokeWidth="1.5" />
        <rect x="2" y="42" width="32" height="5" rx="2.5" fill="#e4e4e7" />
        <circle cx="56" cy="40" r="16" fill="#fcd9b8" />
        <path d="M40 60 q0 26 16 26 h0 q16 0 16 -26" fill="url(#personB)" />
      </g>

      <circle cx="60" cy="280" r="4" fill="#a5b4fc" opacity="0.6" />
      <circle cx="440" cy="180" r="3.5" fill="#c7d2fe" opacity="0.6" />
      <circle cx="80" cy="500" r="3" fill="#8b5cf6" opacity="0.5" />
      <circle cx="460" cy="430" r="4" fill="#a5b4fc" opacity="0.5" />
    </svg>
  );
}