"use client";

import { useEffect, useRef, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { TrendingUp, TrendingDown, Users, BarChart2, Repeat } from "lucide-react";
import type { LifetimeFeesData, ClaimStatsData, Creator } from "@/lib/bagsApi";
import { VerifiedBadgeIcon, SolanaIcon } from "@/components/FeatureIcons";
import Logo from "@/components/Logo";
import type { TooltipItem } from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

interface Props {
  fees: LifetimeFeesData;
  stats: ClaimStatsData;
  creators: Creator[];
  mint: string;
}

async function fetchSolPrice(): Promise<number | null> {
  try {
    const res = await fetch(
      "https://api.coingecko.com/api/v3/simple/price?ids=solana&vs_currencies=usd",
      { next: { revalidate: 60 } }
    );
    const json = await res.json();
    return json?.solana?.usd ?? null;
  } catch {
    return null;
  }
}

function TrendArrow({ value }: { value: number }) {
  if (value > 0) return <TrendingUp size={14} style={{ color: "#34d399" }} />;
  if (value < 0) return <TrendingDown size={14} style={{ color: "#f87171" }} />;
  return null;
}

function StatCard({
  icon: Icon,
  label,
  value,
  sub,
  color = "#34d399",
  trend,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
  sub?: string;
  color?: string;
  trend?: number;
}) {
  return (
    <div className="card p-6 flex flex-col gap-3 animate-fade-in">
      <div className="flex items-center gap-2">
        <Icon size={18} style={{ color }} />
        <span className="text-sm font-medium" style={{ color: "var(--text-secondary)" }}>
          {label}
        </span>
        {trend !== undefined && <TrendArrow value={trend} />}
      </div>
      <div className="stat-value">{value}</div>
      {sub && (
        <div className="text-xs" style={{ color: "var(--text-muted)" }}>
          {sub}
        </div>
      )}
    </div>
  );
}

export default function FeeDashboard({ fees, stats, creators, mint }: Props) {
  const chartRef = useRef(null);
  const [solPrice, setSolPrice] = useState<number | null>(null);

  useEffect(() => {
    fetchSolPrice().then(setSolPrice);
  }, []);

  const liveUSD = solPrice
    ? fees.totalFeesSOL * solPrice
    : fees.totalFeesUSD;

  const chartData = {
    labels: fees.dailyBreakdown.map((d) => d.label),
    datasets: [
      {
        label: "Fees Earned (SOL)",
        data: fees.dailyBreakdown.map((d) => d.fees),
        borderColor: "#10b981",
        backgroundColor: "rgba(16, 185, 129, 0.08)",
        pointBackgroundColor: "#34d399",
        pointBorderColor: "#10b981",
        pointRadius: 4,
        pointHoverRadius: 6,
        fill: true,
        tension: 0.4,
        borderWidth: 2,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: "#161616",
        borderColor: "#2a2a2a",
        borderWidth: 1,
        titleColor: "#f5f5f5",
        bodyColor: "#34d399",
        padding: 12,
        callbacks: {
          label: (ctx: TooltipItem<"line">) => {
            const sol = (ctx.parsed.y ?? 0).toFixed(4);
            const usd = solPrice ? ` (~$${((ctx.parsed.y ?? 0) * solPrice).toFixed(2)})` : "";
            return ` ${sol} SOL${usd}`;
          },
        },
      },
    },
    scales: {
      x: {
        grid: { color: "rgba(255,255,255,0.04)" },
        ticks: { color: "#52525b", font: { size: 11 } },
      },
      y: {
        grid: { color: "rgba(255,255,255,0.04)" },
        ticks: { color: "#52525b", font: { size: 11 } },
      },
    },
  };

  // Trend: compare last 2 days of dailyBreakdown
  const breakdown = fees.dailyBreakdown;
  const trend =
    breakdown.length >= 2
      ? breakdown[breakdown.length - 1].fees - breakdown[breakdown.length - 2].fees
      : 0;

  const shortMint = `${mint.slice(0, 6)}...${mint.slice(-4)}`;

  return (
    <div className="animate-fade-in space-y-6">
      {/* Token info header */}
      <div className="card p-4 flex flex-wrap items-center gap-3 justify-between">
        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center"
            style={{ background: "rgba(16,185,129,0.12)" }}
          >
            <Logo size={26} animated={false} />
          </div>
          <div>
            <p className="text-xs font-mono" style={{ color: "var(--text-muted)" }}>
              Token Mint
            </p>
            <p className="font-mono text-sm font-semibold" style={{ color: "var(--text-primary)" }}>
              {shortMint}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="badge-green flex items-center gap-1">
            <VerifiedBadgeIcon size={12} /> Verified on Bags
          </span>
          {creators.length > 0 && (
            <span
              className="badge-green"
              style={{
                background: "rgba(59,130,246,0.1)",
                color: "#60a5fa",
                borderColor: "rgba(59,130,246,0.3)",
              }}
            >
              {creators.length} Creator{creators.length > 1 ? "s" : ""}
            </span>
          )}
          {solPrice && (
            <span
              className="text-xs px-2 py-0.5 rounded-full flex items-center gap-1"
              style={{
                background: "rgba(16,185,129,0.07)",
                color: "var(--text-muted)",
                border: "1px solid var(--border)",
              }}
            >
              <SolanaIcon size={11} />
              SOL ${solPrice.toFixed(2)}
            </span>
          )}
        </div>
      </div>

      {/* Stat grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard
          icon={TrendingUp}
          label="Lifetime Fees"
          value={`${fees.totalFeesSOL.toFixed(3)} SOL`}
          sub={`≈ $${liveUSD.toLocaleString(undefined, { maximumFractionDigits: 2 })} USD`}
          trend={trend}
        />
        <StatCard
          icon={BarChart2}
          label="Total Volume"
          value={`$${(stats.totalVolume / 1000).toFixed(1)}K`}
          sub={`7d: $${(stats.recentVolume7d / 1000).toFixed(1)}K`}
          color="#60a5fa"
        />
        <StatCard
          icon={Users}
          label="Active Traders"
          value={stats.activeTraders.toLocaleString()}
          sub="unique wallets"
          color="#a78bfa"
        />
        <StatCard
          icon={Repeat}
          label="Claims"
          value={stats.totalClaims.toLocaleString()}
          sub="total claim txs"
          color="#f59e0b"
        />
      </div>

      {/* Chart */}
      <div className="card p-6">
        <h3
          className="text-sm font-semibold mb-4 flex items-center gap-2"
          style={{ color: "var(--text-secondary)" }}
        >
          <TrendingUp size={16} style={{ color: "var(--green)" }} />
          Fee Growth (Last 7 Days)
          {solPrice && (
            <span className="ml-auto text-xs font-normal" style={{ color: "var(--text-muted)" }}>
              1 SOL = ${solPrice.toFixed(2)}
            </span>
          )}
        </h3>
        <div style={{ height: "220px" }}>
          <Line ref={chartRef} data={chartData} options={chartOptions} />
        </div>
      </div>

      {/* Creators */}
      {creators.length > 0 && (
        <div className="card p-6">
          <h3
            className="text-sm font-semibold mb-4 flex items-center gap-2"
            style={{ color: "var(--text-secondary)" }}
          >
            <VerifiedBadgeIcon size={16} />
            Team / Creators
          </h3>
          <div className="space-y-3">
            {creators.map((c, i) => (
              <div key={i} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold"
                    style={{
                      background: "rgba(16,185,129,0.15)",
                      color: "var(--green-bright)",
                    }}
                  >
                    {i + 1}
                  </div>
                  <span className="font-mono text-sm" style={{ color: "var(--text-primary)" }}>
                    {c.address.length > 12
                      ? `${c.address.slice(0, 6)}...${c.address.slice(-4)}`
                      : c.address}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs" style={{ color: "var(--text-muted)" }}>
                    {c.provider}
                  </span>
                  <span className="badge-green">{c.share}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ---- legacy duplicate removed ----

