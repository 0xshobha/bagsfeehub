"use client";

import { useEffect, useState } from "react";
import { History, X, Clock } from "lucide-react";

const STORAGE_KEY = "bagsfeehub_recent";
const MAX_ENTRIES = 5;

export interface RecentEntry {
  mint: string;
  label?: string;
  timestamp: number;
  feesSOL?: number;
}

function loadRecent(): RecentEntry[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as RecentEntry[]) : [];
  } catch {
    return [];
  }
}

function saveRecent(entries: RecentEntry[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
  } catch { /* ignore */ }
}

export function addRecentSearch(entry: Omit<RecentEntry, "timestamp">) {
  const existing = loadRecent();
  const filtered = existing.filter((e) => e.mint !== entry.mint);
  const updated = [{ ...entry, timestamp: Date.now() }, ...filtered].slice(0, MAX_ENTRIES);
  saveRecent(updated);
}

interface Props {
  onSelect: (mint: string) => void;
  currentMint?: string;
}

export default function RecentSearches({ onSelect, currentMint }: Props) {
  const [state, setState] = useState({
    entries: [] as RecentEntry[],
    now: 0,
  });

  useEffect(() => {
    // Defer to avoid cascading render warning in strict linting
    const timeout = setTimeout(() => {
      setState({
        entries: loadRecent(),
        now: Date.now(),
      });
    }, 0);

    const interval = setInterval(() => {
      setState((prev) => ({ ...prev, now: Date.now() }));
    }, 60000);

    return () => {
      clearTimeout(timeout);
      clearInterval(interval);
    };
  }, []);

  const { entries, now } = state;

  const remove = (mint: string) => {
    const updated = entries.filter((e) => e.mint !== mint);
    setState((prev) => ({ ...prev, entries: updated }));
    saveRecent(updated);
  };

  if (entries.length === 0) return null;

  const shortMint = (m: string) => `${m.slice(0, 6)}…${m.slice(-4)}`;
  const timeAgo = (ts: number) => {
    const diff = now - ts;
    const mins = Math.floor(diff / 60000);
    if (mins < 1) return "just now";
    if (mins < 60) return `${mins}m ago`;
    const hrs = Math.floor(mins / 60);
    if (hrs < 24) return `${hrs}h ago`;
    return `${Math.floor(hrs / 24)}d ago`;
  };

  return (
    <div className="max-w-2xl mx-auto animate-fade-in">
      <div
        className="rounded-xl overflow-hidden"
        style={{ border: "1px solid var(--border)", background: "var(--bg-card)" }}
      >
        <div
          className="flex items-center gap-2 px-4 py-2.5"
          style={{ borderBottom: "1px solid var(--border)" }}
        >
          <History size={13} style={{ color: "var(--text-muted)" }} />
          <span className="text-xs font-semibold" style={{ color: "var(--text-muted)" }}>
            Recent Searches
          </span>
        </div>
        <div className="divide-y" style={{ borderColor: "var(--border)" }}>
          {entries.map((e) => (
            <div
              key={e.mint}
              className="flex items-center gap-3 px-4 py-2.5 group"
              style={{
                background: currentMint === e.mint ? "rgba(16,185,129,0.06)" : "transparent",
              }}
            >
              {/* Select button */}
              <button
                onClick={() => onSelect(e.mint)}
                className="flex-1 flex items-center gap-3 text-left min-w-0"
              >
                <span
                  className="text-xs font-mono px-2 py-0.5 rounded"
                  style={{
                    background: "rgba(16,185,129,0.1)",
                    color: "var(--green-bright)",
                    border: "1px solid rgba(16,185,129,0.2)",
                    flexShrink: 0,
                  }}
                >
                  {shortMint(e.mint)}
                </span>
                {e.label && (
                  <span className="text-xs truncate" style={{ color: "var(--text-secondary)" }}>
                    {e.label}
                  </span>
                )}
                {e.feesSOL !== undefined && (
                  <span className="text-xs ml-auto shrink-0" style={{ color: "var(--green-bright)" }}>
                    {e.feesSOL.toFixed(3)} SOL
                  </span>
                )}
              </button>

              {/* Timestamp */}
              <span className="text-xs flex items-center gap-1 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity"
                style={{ color: "var(--text-muted)" }}>
                <Clock size={10} /> {timeAgo(e.timestamp)}
              </span>

              {/* Remove */}
              <button
                onClick={(ev) => { ev.stopPropagation(); remove(e.mint); }}
                className="p-1 rounded opacity-0 group-hover:opacity-100 transition-all"
                style={{ color: "var(--text-muted)" }}
                title="Remove"
              >
                <X size={12} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
