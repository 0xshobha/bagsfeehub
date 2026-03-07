"use client";

interface LogoProps {
  size?: number;
  animated?: boolean;
  className?: string;
}

/** Fully animated SVG bag + chart logo. No emojis. */
export default function Logo({ size = 40, animated = true, className = "" }: LogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 80 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="BagsFeeHub Logo"
    >
      <defs>
        {/* Radial glow behind the bag */}
        <radialGradient id="bgGlow" cx="50%" cy="60%" r="50%">
          <stop offset="0%" stopColor="#10b981" stopOpacity="0.25" />
          <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
        </radialGradient>

        {/* Bag body gradient */}
        <linearGradient id="bagGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#10b981" />
          <stop offset="100%" stopColor="#059669" />
        </linearGradient>

        {/* Shine on bag */}
        <linearGradient id="shine" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.15" />
          <stop offset="60%" stopColor="#ffffff" stopOpacity="0" />
        </linearGradient>

        {/* Chart line gradient */}
        <linearGradient id="lineGrad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#6ee7b7" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0.9" />
        </linearGradient>

        <filter id="softGlow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="1.5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Background glow circle */}
      <circle cx="40" cy="44" r="28" fill="url(#bgGlow)">
        {animated && (
          <animate
            attributeName="r"
            values="26;30;26"
            dur="3s"
            repeatCount="indefinite"
          />
        )}
      </circle>

      {/* Bag handle */}
      <path
        d="M27 34 Q27 22 40 22 Q53 22 53 34"
        stroke="url(#bagGrad)"
        strokeWidth="3.5"
        strokeLinecap="round"
        fill="none"
        filter="url(#softGlow)"
      >
        {animated && (
          <animate
            attributeName="stroke-opacity"
            values="0.7;1;0.7"
            dur="2.5s"
            repeatCount="indefinite"
          />
        )}
      </path>

      {/* Bag body */}
      <rect
        x="18"
        y="33"
        width="44"
        height="30"
        rx="6"
        fill="url(#bagGrad)"
      />
      {/* Shine overlay on bag */}
      <rect
        x="18"
        y="33"
        width="44"
        height="14"
        rx="6"
        fill="url(#shine)"
      />

      {/* Chart line on bag */}
      <polyline
        points="24,56 31,48 38,52 46,42 56,45"
        stroke="url(#lineGrad)"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        filter="url(#softGlow)"
      >
        {animated && (
          <animate
            attributeName="stroke-dashoffset"
            values="40;0;40"
            dur="3s"
            repeatCount="indefinite"
          />
        )}
        {animated && (
          <animate
            attributeName="stroke-dasharray"
            values="0 40;40 0;0 40"
            dur="3s"
            repeatCount="indefinite"
          />
        )}
      </polyline>

      {/* Chart dots */}
      {[
        { cx: 24, cy: 56 },
        { cx: 38, cy: 52 },
        { cx: 56, cy: 45 },
      ].map((dot, i) => (
        <circle
          key={i}
          cx={dot.cx}
          cy={dot.cy}
          r="2"
          fill="white"
          opacity="0.9"
        >
          {animated && (
            <animate
              attributeName="r"
              values="1.5;2.5;1.5"
              dur="2s"
              begin={`${i * 0.4}s`}
              repeatCount="indefinite"
            />
          )}
        </circle>
      ))}

      {/* Upward arrow tip at end of chart */}
      <polyline
        points="53,43 56,39 59,43"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        opacity="0.85"
      />
    </svg>
  );
}

/** Wordmark: "BagsFeeHub" with accent on "Fees" */
export function LogoWordmark({ size = 40 }: { size?: number }) {
  return (
    <div className="flex items-center gap-2.5" style={{ height: size }}>
      <Logo size={size} animated />
      <span
        className="font-black tracking-tight"
        style={{
          fontSize: size * 0.55,
          color: "var(--text-primary)",
          letterSpacing: "-0.02em",
          lineHeight: 1,
        }}
      >
        Bags<span style={{ color: "var(--green-bright)" }}>Fee</span>Hub
      </span>
    </div>
  );
}
