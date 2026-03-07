"use client";

import { useState, useRef, useCallback } from "react";
import { Search, Copy, CheckCircle2, Loader2, AlertCircle } from "lucide-react";
import dynamic from "next/dynamic";
import confetti from "canvas-confetti";
import { fetchAllTokenData } from "@/lib/bagsApi";
import type { LifetimeFeesData, ClaimStatsData, Creator } from "@/lib/bagsApi";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Logo from "@/components/Logo";
import { SearchTokenIcon, FeeChartIcon, ClaimBoltIcon } from "@/components/FeatureIcons";
import RecentSearches, { addRecentSearch } from "@/components/RecentSearches";
import StatsTicker from "@/components/StatsTicker";

const FeeDashboard = dynamic(() => import("@/components/FeeDashboard"), {
  ssr: false,
  loading: () => <DashboardSkeleton />,
});
const ClaimButton = dynamic(() => import("@/components/ClaimButton"), { ssr: false });
const ShareReport = dynamic(() => import("@/components/ShareReport"), { ssr: false });

const DEMO_MINTS = [
  { label: "Demo Token A", mint: "So11111111111111111111111111111111111111112" },
  { label: "Demo Token B", mint: "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v" },
];

const HOW_IT_WORKS = [
  {
    icon: <SearchTokenIcon size={52} />,
    title: "Paste your token CA",
    desc: "Any Bags.fm token mint (contract address) works — no wallet connection needed.",
  },
  {
    icon: <FeeChartIcon size={52} />,
    title: "See live earnings",
    desc: "Lifetime fees, volume, trader count, and 7-day growth charts — updated in real-time.",
  },
  {
    icon: <ClaimBoltIcon size={52} />,
    title: "Claim & share",
    desc: "Generate a signed claim transaction in one click and post your earnings report on X.",
  },
];

function DashboardSkeleton() {
  return (
    <div className="space-y-6">
      <div className="card p-4 h-16 skeleton" />
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="card p-6 h-28 skeleton" />
        ))}
      </div>
      <div className="card p-6 h-64 skeleton" />
    </div>
  );
}

export default function Home() {
  const [mint, setMint] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [recentKey, setRecentKey] = useState(0); // bump to refresh RecentSearches

  const [fees, setFees] = useState<LifetimeFeesData | null>(null);
  const [stats, setStats] = useState<ClaimStatsData | null>(null);
  const [creators, setCreators] = useState<Creator[] | null>(null);
  const [activeMint, setActiveMint] = useState("");

  const inputRef = useRef<HTMLInputElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);

  const fireConfetti = () => {
    confetti({
      particleCount: 120,
      spread: 80,
      origin: { y: 0.5 },
      colors: ["#10b981", "#34d399", "#059669", "#6ee7b7", "#f5f5f5"],
    });
  };

  const handleTrack = useCallback(async (mintToTrack?: string) => {
    const target = (mintToTrack ?? mint).trim();
    if (!target) { inputRef.current?.focus(); return; }

    setLoading(true);
    setError(null);
    setFees(null);
    setStats(null);
    setCreators(null);

    try {
      const data = await fetchAllTokenData(target);
      setFees(data.fees);
      setStats(data.stats);
      setCreators(data.creators);
      setActiveMint(target);
      fireConfetti();
      // Persist to recent searches
      addRecentSearch({
        mint: target,
        feesSOL: data.fees.totalFeesSOL,
      });
      setRecentKey((k) => k + 1);
      setTimeout(() => {
        resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 100);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Failed to fetch token data.";
      setError(msg);
      // Still store in recents even if error (user typed it)
      addRecentSearch({ mint: target });
      setRecentKey((k) => k + 1);
    }
    setLoading(false);
  }, [mint]);

  const handleCopyMint = () => {
    navigator.clipboard.writeText(mint);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const hasResults = fees && stats && creators;

  return (
    <div className="min-h-screen flex flex-col relative overflow-x-hidden">
      {/* Ambient background orbs */}
      <div className="hero-orb hero-orb-1" aria-hidden />
      <div className="hero-orb hero-orb-2" aria-hidden />

      <Navbar />

      {/* Stats ticker just below navbar */}
      <StatsTicker />

      <main className="flex-1 max-w-5xl mx-auto w-full px-4 sm:px-6 py-10 relative z-10">

        {/* Hero */}
        <section className="text-center space-y-6 py-12">
          <div className="flex justify-center">
            <Logo size={72} animated className="hero-float" />
          </div>

          <h1 className="text-5xl sm:text-6xl font-black tracking-tight" style={{ color: "var(--text-primary)" }}>
            Bags<span style={{ color: "var(--green-bright)" }}>Fee</span>Hub
          </h1>

          <p className="text-lg sm:text-xl max-w-xl mx-auto" style={{ color: "var(--text-secondary)" }}>
            Track your{" "}
            <span style={{ color: "var(--green-bright)" }}>1% creator fees</span>{" "}
            in real-time&nbsp;·&nbsp;
            <span style={{ color: "#60a5fa" }}>One-click claims</span>
            &nbsp;·&nbsp;
            <span style={{ color: "#a78bfa" }}>Share on X</span>
          </p>

          <div className="max-w-2xl mx-auto space-y-3">
            <div className="flex gap-3">
              <div className="relative flex-1">
                <input
                  ref={inputRef}
                  type="text"
                  className="input-dark w-full pl-4 pr-10 py-4 text-base"
                  placeholder="Paste token mint (contract address)…"
                  value={mint}
                  onChange={(e) => setMint(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleTrack()}
                />
                {mint && (
                  <button
                    onClick={handleCopyMint}
                    className="absolute right-3 top-1/2 -translate-y-1/2 transition-colors"
                    title="Copy mint address"
                    style={{ color: "var(--text-muted)" }}
                  >
                    {copied ? (
                      <CheckCircle2 size={16} style={{ color: "var(--green)" }} />
                    ) : (
                      <Copy size={16} />
                    )}
                  </button>
                )}
              </div>
              <button
                onClick={() => handleTrack()}
                disabled={loading}
                className="btn-green px-7 py-4 rounded-xl font-bold text-base flex items-center gap-2 shrink-0"
              >
                {loading ? <Loader2 size={18} className="animate-spin" /> : <Search size={18} />}
                {loading ? "Loading…" : "Track Fees"}
              </button>
            </div>

            {/* Demo mints */}
            <div className="flex flex-wrap gap-2 justify-center">
              <span className="text-xs self-center" style={{ color: "var(--text-muted)" }}>Try:</span>
              {DEMO_MINTS.map((d) => (
                <button
                  key={d.mint}
                  onClick={() => { setMint(d.mint); handleTrack(d.mint); }}
                  className="px-3 py-1 rounded-lg text-xs transition-all"
                  style={{
                    background: "rgba(16,185,129,0.07)",
                    color: "var(--green-bright)",
                    border: "1px solid rgba(16,185,129,0.2)",
                  }}
                >
                  {d.label}
                </button>
              ))}
            </div>

            {/* Recent searches */}
            <RecentSearches
              key={recentKey}
              currentMint={activeMint}
              onSelect={(m) => { setMint(m); handleTrack(m); }}
            />
          </div>
        </section>

        {/* Error banner */}
        {error && (
          <div
            className="flex items-start gap-3 px-5 py-4 rounded-xl mb-8 animate-fade-in"
            style={{
              background: "rgba(239,68,68,0.07)",
              border: "1px solid rgba(239,68,68,0.2)",
              color: "#f87171",
            }}
          >
            <AlertCircle size={16} className="mt-0.5 shrink-0" />
            <div>
              <p className="font-semibold text-sm">Could not fetch live data</p>
              <p className="text-xs mt-1 opacity-80">{error}</p>
              <p className="text-xs mt-1 opacity-60">
                Showing demo data below. Add your API key in <code>.env.local</code> for live data.
              </p>
            </div>
          </div>
        )}

        {/* Loading skeleton */}
        {loading && <DashboardSkeleton />}

        {/* Results */}
        {hasResults && !loading && (
          <div ref={resultsRef} className="space-y-6 animate-fade-in">
            <FeeDashboard fees={fees} stats={stats} creators={creators} mint={activeMint} />
            <div className="grid sm:grid-cols-2 gap-6">
              <ClaimButton mint={activeMint} />
              <ShareReport fees={fees} stats={stats} mint={activeMint} />
            </div>
          </div>
        )}

        {/* How it works */}
        {!hasResults && !loading && (
          <section className="mt-4 grid sm:grid-cols-3 gap-5">
            {HOW_IT_WORKS.map((item) => (
              <div key={item.title} className="card p-7 space-y-4 text-center hover:border-green-500/30 transition-colors" style={{ borderColor: "var(--border)" }}>
                <div className="flex justify-center">{item.icon}</div>
                <h3 className="font-bold" style={{ color: "var(--text-primary)" }}>{item.title}</h3>
                <p className="text-sm" style={{ color: "var(--text-muted)" }}>{item.desc}</p>
              </div>
            ))}
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
}
