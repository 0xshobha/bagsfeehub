/** Animated SVG feature icons — no emojis */

export function SearchTokenIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="si-bg" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#10b981" stopOpacity="0.2" />
          <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="si-ring" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#10b981" />
          <stop offset="100%" stopColor="#34d399" />
        </linearGradient>
      </defs>

      {/* Pulsing background */}
      <circle cx="32" cy="32" r="28" fill="url(#si-bg)">
        <animate attributeName="r" values="26;30;26" dur="2.5s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.6;1;0.6" dur="2.5s" repeatCount="indefinite" />
      </circle>

      {/* Magnifier circle */}
      <circle cx="28" cy="27" r="11" stroke="url(#si-ring)" strokeWidth="2.5" fill="none" />

      {/* Inner token symbol on lens */}
      <text x="28" y="31" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#34d399" fontFamily="monospace">◎</text>

      {/* Magnifier handle */}
      <line x1="36" y1="36" x2="45" y2="45" stroke="url(#si-ring)" strokeWidth="2.5" strokeLinecap="round">
        <animate attributeName="opacity" values="0.5;1;0.5" dur="2s" repeatCount="indefinite" />
      </line>

      {/* Scan lines */}
      <line x1="21" y1="27" x2="35" y2="27" stroke="#10b981" strokeWidth="1" strokeDasharray="2 2" opacity="0.4">
        <animate attributeName="stroke-dashoffset" values="0;-8" dur="1s" repeatCount="indefinite" />
      </line>
    </svg>
  );
}

export function FeeChartIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="fc-bg" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#60a5fa" stopOpacity="0.15" />
          <stop offset="100%" stopColor="#60a5fa" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="fc-bar1" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#10b981" />
          <stop offset="100%" stopColor="#059669" />
        </linearGradient>
        <linearGradient id="fc-bar2" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#34d399" />
          <stop offset="100%" stopColor="#10b981" />
        </linearGradient>
        <linearGradient id="fc-line" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#60a5fa" />
          <stop offset="100%" stopColor="#a78bfa" />
        </linearGradient>
      </defs>

      <circle cx="32" cy="32" r="28" fill="url(#fc-bg)" />

      {/* Chart grid baseline */}
      <line x1="14" y1="46" x2="50" y2="46" stroke="#2a2a2a" strokeWidth="1" />
      <line x1="14" y1="36" x2="50" y2="36" stroke="#2a2a2a" strokeWidth="0.5" strokeDasharray="2 2" />

      {/* Animated bars */}
      <rect x="16" y="38" width="6" height="8" rx="1.5" fill="url(#fc-bar1)">
        <animate attributeName="height" values="4;8;4" dur="2s" begin="0s" repeatCount="indefinite" />
        <animate attributeName="y" values="42;38;42" dur="2s" begin="0s" repeatCount="indefinite" />
      </rect>
      <rect x="25" y="30" width="6" height="16" rx="1.5" fill="url(#fc-bar2)">
        <animate attributeName="height" values="10;16;10" dur="2s" begin="0.3s" repeatCount="indefinite" />
        <animate attributeName="y" values="36;30;36" dur="2s" begin="0.3s" repeatCount="indefinite" />
      </rect>
      <rect x="34" y="24" width="6" height="22" rx="1.5" fill="url(#fc-bar1)">
        <animate attributeName="height" values="14;22;14" dur="2s" begin="0.6s" repeatCount="indefinite" />
        <animate attributeName="y" values="32;24;32" dur="2s" begin="0.6s" repeatCount="indefinite" />
      </rect>
      <rect x="43" y="19" width="6" height="27" rx="1.5" fill="url(#fc-bar2)">
        <animate attributeName="height" values="18;27;18" dur="2s" begin="0.9s" repeatCount="indefinite" />
        <animate attributeName="y" values="28;19;28" dur="2s" begin="0.9s" repeatCount="indefinite" />
      </rect>

      {/* Trend line */}
      <polyline
        points="19,38 28,28 37,22 46,17"
        stroke="url(#fc-line)"
        strokeWidth="1.5"
        fill="none"
        strokeDasharray="40"
        strokeDashoffset="0"
        opacity="0.7"
      >
        <animate attributeName="stroke-dashoffset" values="40;0;0" dur="1.5s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0;0.7;0.7" dur="1.5s" repeatCount="indefinite" />
      </polyline>
    </svg>
  );
}

export function ClaimBoltIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="cb-bg" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.18" />
          <stop offset="100%" stopColor="#f59e0b" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="cb-bolt" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#fcd34d" />
          <stop offset="100%" stopColor="#f59e0b" />
        </linearGradient>
        <filter id="cb-glow">
          <feGaussianBlur stdDeviation="2" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>

      <circle cx="32" cy="32" r="28" fill="url(#cb-bg)">
        <animate attributeName="opacity" values="0.5;1;0.5" dur="1.5s" repeatCount="indefinite" />
      </circle>

      {/* Outer ring pulse */}
      <circle cx="32" cy="32" r="22" stroke="#f59e0b" strokeWidth="0.75" strokeDasharray="4 4" fill="none" opacity="0.3">
        <animateTransform attributeName="transform" type="rotate" from="0 32 32" to="360 32 32" dur="8s" repeatCount="indefinite" />
      </circle>

      {/* Lightning bolt */}
      <path
        d="M36 14 L24 34 H32 L28 50 L44 28 H36 L40 14 Z"
        fill="url(#cb-bolt)"
        filter="url(#cb-glow)"
      >
        <animate attributeName="opacity" values="0.7;1;0.7" dur="0.8s" repeatCount="indefinite" />
        <animateTransform attributeName="transform" type="scale" values="1;1.05;1" additive="sum"
          begin="0;0.8s" dur="0.8s" repeatCount="indefinite"
        />
      </path>

      {/* Sparkles around bolt */}
      {[
        { cx: 18, cy: 20, r: 1.5, delay: "0s" },
        { cx: 46, cy: 18, r: 1, delay: "0.3s" },
        { cx: 48, cy: 42, r: 1.5, delay: "0.6s" },
        { cx: 16, cy: 44, r: 1, delay: "0.9s" },
      ].map((s, i) => (
        <circle key={i} cx={s.cx} cy={s.cy} r={s.r} fill="#fcd34d" opacity="0">
          <animate attributeName="opacity" values="0;0.8;0" dur="1.2s" begin={s.delay} repeatCount="indefinite" />
          <animate attributeName="r" values={`${s.r * 0.5};${s.r * 1.5};${s.r * 0.5}`} dur="1.2s" begin={s.delay} repeatCount="indefinite" />
        </circle>
      ))}
    </svg>
  );
}

export function VerifiedBadgeIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="vb-grad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#10b981" />
          <stop offset="100%" stopColor="#34d399" />
        </linearGradient>
      </defs>
      <path
        d="M9 12l2 2 4-4M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        stroke="url(#vb-grad)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function SolanaIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 397.7 311.7" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="sol-a" x1="90.91" y1="319.32" x2="220.78" y2="-7.25" gradientTransform="matrix(1 0 0 -1 0 314)" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#9945ff" />
          <stop offset=".14" stopColor="#8752f3" />
          <stop offset=".42" stopColor="#5497d5" />
          <stop offset=".68" stopColor="#43b4ca" />
          <stop offset=".88" stopColor="#28e0b9" />
          <stop offset="1" stopColor="#19fb9b" />
        </linearGradient>
      </defs>
      <path fill="url(#sol-a)" d="M64.6 237.9c2.4-2.4 5.7-3.8 9.2-3.8h317.4c5.8 0 8.7 7 4.6 11.1l-62.7 62.7c-2.4 2.4-5.7 3.8-9.2 3.8H6.5c-5.8 0-8.7-7-4.6-11.1l62.7-62.7zm0-164.2C67.1 71.3 70.4 69.9 73.8 69.9h317.4c5.8 0 8.7 7 4.6 11.1l-62.7 62.7c-2.4 2.4-5.7 3.8-9.2 3.8H6.5c-5.8 0-8.7-7-4.6-11.1l62.7-62.8zm256.8 82.1c-2.4-2.4-5.7-3.8-9.2-3.8H6.5c-5.8 0-8.7 7-4.6 11.1l62.7 62.7c2.4 2.4 5.7 3.8 9.2 3.8h317.4c5.8 0 8.7-7 4.6-11.1l-62.4-62.7z" />
    </svg>
  );
}
