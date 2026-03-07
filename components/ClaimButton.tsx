"use client";

import { useState } from "react";
import { Zap, Copy, CheckCircle2, AlertTriangle } from "lucide-react";
import { generateClaimTx } from "@/lib/bagsApi";

interface Props {
  mint: string;
}

export default function ClaimButton({ mint }: Props) {
  const [wallet, setWallet] = useState(
    process.env.NEXT_PUBLIC_DEFAULT_WALLET || ""
  );
  const [txData, setTxData] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [showInput, setShowInput] = useState(false);

  const handleGenerate = async () => {
    if (!wallet.trim()) {
      setShowInput(true);
      return;
    }
    setLoading(true);
    setError(null);
    setTxData(null);
    try {
      const result = await generateClaimTx(mint, wallet.trim());
      setTxData(JSON.stringify(result, null, 2));
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "Failed to generate claim transaction.";
      setError(message);
      // Provide a fake tx for demo if API fails
      setTxData(
        JSON.stringify(
          {
            demo: true,
            message: "Demo claim tx (API returned error in dev mode)",
            transaction: "BASE64_ENCODED_TX_WOULD_BE_HERE",
            tokenMint: mint,
            feeClaimer: wallet,
            claimVirtualPoolFees: true,
          },
          null,
          2
        )
      );
    }
    setLoading(false);
  };

  const handleCopy = () => {
    if (txData) {
      navigator.clipboard.writeText(txData);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="card p-6 space-y-4">
      <h3
        className="text-sm font-semibold flex items-center gap-2"
        style={{ color: "var(--text-secondary)" }}
      >
        <Zap size={16} style={{ color: "#f59e0b" }} />
        Generate Claim Transaction
      </h3>

      {/* Wallet input */}
      {(showInput || !wallet) && (
        <div className="space-y-2">
          <label
            className="text-xs"
            style={{ color: "var(--text-muted)" }}
          >
            Your wallet address (fee claimer)
          </label>
          <input
            type="text"
            className="input-dark w-full px-4 py-3 text-sm"
            placeholder="Enter your Solana wallet address..."
            value={wallet}
            onChange={(e) => setWallet(e.target.value)}
          />
        </div>
      )}

      {wallet && !showInput && (
        <div
          className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-mono"
          style={{
            background: "rgba(16,185,129,0.06)",
            color: "var(--text-secondary)",
            border: "1px solid rgba(16,185,129,0.15)",
          }}
        >
          <CheckCircle2 size={12} style={{ color: "var(--green)" }} />
          <span className="truncate">{wallet}</span>
          <button
            onClick={() => setShowInput(true)}
            className="ml-auto text-xs underline shrink-0"
            style={{ color: "var(--text-muted)" }}
          >
            change
          </button>
        </div>
      )}

      <button
        onClick={handleGenerate}
        disabled={loading}
        className="btn-green w-full px-6 py-3 rounded-xl font-semibold text-sm flex items-center justify-center gap-2"
      >
        {loading ? (
          <>
            <span className="animate-spin">⚡</span> Generating...
          </>
        ) : (
          <>
            <Zap size={16} /> Generate Claim Tx
          </>
        )}
      </button>

      {/* Error badge */}
      {error && !txData && (
        <div
          className="flex items-center gap-2 px-4 py-3 rounded-xl text-sm"
          style={{
            background: "rgba(239,68,68,0.08)",
            border: "1px solid rgba(239,68,68,0.2)",
            color: "#f87171",
          }}
        >
          <AlertTriangle size={14} />
          {error}
        </div>
      )}

      {/* TX Output */}
      {txData && (
        <div className="space-y-2 animate-fade-in">
          {error && (
            <p className="text-xs" style={{ color: "#f59e0b" }}>
              ⚠️ Demo mode — real tx requires live API key
            </p>
          )}
          <div
            className="relative rounded-xl p-4 text-xs font-mono overflow-auto max-h-56"
            style={{
              background: "var(--bg-secondary)",
              border: "1px solid var(--border)",
              color: "#34d399",
            }}
          >
            <pre className="whitespace-pre-wrap break-all">{txData}</pre>
          </div>
          <button
            onClick={handleCopy}
            className="flex items-center gap-2 text-sm px-4 py-2 rounded-lg transition-all"
            style={{
              background: copied
                ? "rgba(16,185,129,0.15)"
                : "rgba(255,255,255,0.04)",
              color: copied ? "var(--green-bright)" : "var(--text-secondary)",
              border: "1px solid",
              borderColor: copied
                ? "rgba(16,185,129,0.3)"
                : "var(--border)",
            }}
          >
            {copied ? (
              <><CheckCircle2 size={14} /> Copied!</>
            ) : (
              <><Copy size={14} /> Copy TX JSON</>
            )}
          </button>
          <p className="text-xs" style={{ color: "var(--text-muted)" }}>
            Sign and broadcast this transaction with Phantom Wallet (Phase 2 will add one-click signing).
          </p>
        </div>
      )}
    </div>
  );
}
