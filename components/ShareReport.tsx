"use client";

import { Share2, Twitter, Copy, CheckCircle2 } from "lucide-react";
import { useState } from "react";
import type { LifetimeFeesData, ClaimStatsData } from "@/lib/bagsApi";

interface Props {
  fees: LifetimeFeesData;
  stats: ClaimStatsData;
  mint: string;
}

export default function ShareReport({ fees, stats, mint }: Props) {
  const [copied, setCopied] = useState(false);

  const shortMint = `${mint.slice(0, 6)}...${mint.slice(-4)}`;
  const appUrl = "https://bagsfeehub.vercel.app";

  const tweetText = encodeURIComponent(
    `💰 My @BagsApp token (${shortMint}) has earned ${fees.totalFeesSOL.toFixed(3)} SOL in creator fees!\n\n` +
    `📊 ${stats.activeTraders} active traders • $${(stats.totalVolume / 1000).toFixed(1)}K volume\n\n` +
    `Track yours free → ${appUrl}\n#BagsHackathon @StuuBags @0xshobha`
  );

  const tweetUrl = `https://twitter.com/intent/tweet?text=${tweetText}`;

  const reportText =
    `🏆 BagsFeeHub Earnings Report\n` +
    `Token: ${shortMint}\n` +
    `Lifetime Fees: ${fees.totalFeesSOL.toFixed(4)} SOL ≈ $${fees.totalFeesUSD.toFixed(2)}\n` +
    `Volume: $${(stats.totalVolume / 1000).toFixed(1)}K | Traders: ${stats.activeTraders}\n` +
    `Track yours → ${appUrl}`;

  const handleCopyReport = () => {
    navigator.clipboard.writeText(reportText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="card p-6 space-y-4">
      <h3
        className="text-sm font-semibold flex items-center gap-2"
        style={{ color: "var(--text-secondary)" }}
      >
        <Share2 size={16} style={{ color: "#60a5fa" }} />
        Share Earnings Report
      </h3>

      {/* Preview card */}
      <div
        className="rounded-xl p-5 space-y-3"
        style={{
          background: "linear-gradient(135deg, rgba(16,185,129,0.08), rgba(59,130,246,0.06))",
          border: "1px solid rgba(16,185,129,0.2)",
        }}
      >
        <div className="flex items-center justify-between">
          <span className="font-bold text-lg">👜 BagsFeeHub Report</span>
          <span className="badge-green">Live</span>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <p className="text-xs" style={{ color: "var(--text-muted)" }}>Lifetime Fees</p>
            <p className="font-bold" style={{ color: "var(--green-bright)" }}>
              {fees.totalFeesSOL.toFixed(4)} SOL
            </p>
            <p className="text-xs" style={{ color: "var(--text-muted)" }}>
              ≈ ${fees.totalFeesUSD.toFixed(2)} USD
            </p>
          </div>
          <div>
            <p className="text-xs" style={{ color: "var(--text-muted)" }}>Volume</p>
            <p className="font-bold" style={{ color: "#60a5fa" }}>
              ${(stats.totalVolume / 1000).toFixed(1)}K
            </p>
            <p className="text-xs" style={{ color: "var(--text-muted)" }}>
              {stats.activeTraders} traders
            </p>
          </div>
        </div>
        <p className="text-xs font-mono truncate" style={{ color: "var(--text-muted)" }}>
          {shortMint} • {appUrl}
        </p>
      </div>

      {/* Action buttons */}
      <div className="flex flex-col sm:flex-row gap-3">
        <a
          href={tweetUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold transition-all"
          style={{
            background: "rgba(29,161,242,0.12)",
            color: "#60a5fa",
            border: "1px solid rgba(29,161,242,0.25)",
            textDecoration: "none",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLAnchorElement).style.background =
              "rgba(29,161,242,0.2)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLAnchorElement).style.background =
              "rgba(29,161,242,0.12)";
          }}
        >
          <Twitter size={15} /> Post on X / Twitter
        </a>

        <button
          onClick={handleCopyReport}
          className="flex-1 flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold transition-all"
          style={{
            background: copied
              ? "rgba(16,185,129,0.15)"
              : "rgba(255,255,255,0.04)",
            color: copied ? "var(--green-bright)" : "var(--text-secondary)",
            border: "1px solid",
            borderColor: copied ? "rgba(16,185,129,0.3)" : "var(--border)",
          }}
        >
          {copied ? (
            <><CheckCircle2 size={15} /> Copied!</>
          ) : (
            <><Copy size={15} /> Copy Report</>
          )}
        </button>
      </div>

      {/* Native share if available */}
      {typeof navigator !== "undefined" && "share" in navigator && (
        <button
          onClick={() =>
            navigator.share({
              title: "BagsFeeHub — My Bags Creator Fees",
              text: reportText,
              url: appUrl,
            })
          }
          className="w-full flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-sm"
          style={{
            background: "rgba(255,255,255,0.03)",
            color: "var(--text-muted)",
            border: "1px solid var(--border)",
          }}
        >
          <Share2 size={14} /> Share via device
        </button>
      )}
    </div>
  );
}
