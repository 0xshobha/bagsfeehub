"use client";

import { useEffect, useRef } from "react";
import { SolanaIcon, VerifiedBadgeIcon } from "./FeatureIcons";

interface TickerItem {
  icon: React.ReactNode;
  text: string;
  highlight?: string;
}

const ITEMS: TickerItem[] = [
  { icon: <SolanaIcon size={14} />, text: "Built on", highlight: "Solana" },
  { icon: <GreenDot />, text: "1% creator fee on every", highlight: "Bags.fm trade" },
  { icon: <GreenDot />, text: "Real-time earnings", highlight: "dashboard" },
  { icon: <VerifiedBadgeIcon size={14} />, text: "Fully", highlight: "non-custodial" },
  { icon: <GreenDot />, text: "Powered by", highlight: "Bags API" },
  { icon: <GreenDot />, text: "Track any", highlight: "token mint CA" },
  { icon: <SolanaIcon size={14} />, text: "Claim SOL fees", highlight: "on-chain" },
  { icon: <GreenDot />, text: "Share your earnings on", highlight: "X / Twitter" },
  { icon: <VerifiedBadgeIcon size={14} />, text: "Bags $4M", highlight: "Hackathon 2026" },
];

function GreenDot() {
  return (
    <span
      className="inline-block rounded-full"
      style={{
        width: 7,
        height: 7,
        background: "var(--green)",
        boxShadow: "0 0 6px var(--green)",
        flexShrink: 0,
        marginTop: 1,
      }}
    />
  );
}

export default function StatsTicker() {
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    // Clone children to create seamless loop
    const original = track.innerHTML;
    track.innerHTML = original + original;
  }, []);

  return (
    <div
      className="w-full overflow-hidden relative"
      style={{
        borderTop: "1px solid rgba(16,185,129,0.12)",
        borderBottom: "1px solid rgba(16,185,129,0.12)",
        background: "rgba(16,185,129,0.03)",
        padding: "9px 0",
      }}
    >
      {/* Left / right fade masks */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: 80,
          height: "100%",
          background: "linear-gradient(to right, var(--bg-primary), transparent)",
          zIndex: 2,
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          width: 80,
          height: "100%",
          background: "linear-gradient(to left, var(--bg-primary), transparent)",
          zIndex: 2,
          pointerEvents: "none",
        }}
      />

      {/* Ticker track */}
      <div
        ref={trackRef}
        className="ticker-track flex items-center gap-8"
        style={{ whiteSpace: "nowrap" }}
      >
        {ITEMS.map((item, i) => (
          <span key={i} className="inline-flex items-center gap-2 shrink-0">
            {item.icon}
            <span className="text-xs" style={{ color: "var(--text-muted)" }}>
              {item.text}{" "}
            </span>
            {item.highlight && (
              <span
                className="text-xs font-semibold"
                style={{ color: "var(--green-bright)" }}
              >
                {item.highlight}
              </span>
            )}
            <span style={{ color: "var(--border)", marginLeft: 16, marginRight: 8 }}>·</span>
          </span>
        ))}
      </div>

      <style>{`
        .ticker-track {
          animation: ticker-scroll 30s linear infinite;
        }
        .ticker-track:hover {
          animation-play-state: paused;
        }
        @keyframes ticker-scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </div>
  );
}
