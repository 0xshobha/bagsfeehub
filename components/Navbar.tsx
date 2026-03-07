"use client";

import { Github, MessageSquare, ExternalLink } from "lucide-react";
import Link from "next/link";
import { LogoWordmark } from "./Logo";

export default function Navbar() {
  return (
    <header
      className="sticky top-0 z-50 w-full"
      style={{
        background: "rgba(10,10,10,0.85)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        borderBottom: "1px solid var(--border)",
      }}
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        {/* Left: Logo */}
        <Link href="/" aria-label="BagsFeeHub Home">
          <LogoWordmark size={36} />
        </Link>

        {/* Center: Hackathon badge */}
        <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full"
          style={{
            background: "rgba(16,185,129,0.08)",
            border: "1px solid rgba(16,185,129,0.2)",
          }}
        >
          {/* Animated pulse dot */}
          <span className="relative flex h-2 w-2">
            <span
              className="absolute inline-flex h-full w-full rounded-full opacity-75"
              style={{
                background: "#10b981",
                animation: "ping 1.5s cubic-bezier(0,0,0.2,1) infinite",
              }}
            />
            <span
              className="relative inline-flex rounded-full h-2 w-2"
              style={{ background: "#10b981" }}
            />
          </span>
          <span className="text-xs font-semibold" style={{ color: "var(--green-bright)" }}>
            Bags $4M Hackathon 2026
          </span>
        </div>

        {/* Right: Links */}
        <nav className="flex items-center gap-2">
          <a
            href="https://bags.fm"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg transition-all"
            style={{
              color: "var(--text-secondary)",
              border: "1px solid var(--border)",
            }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "var(--green-dark)"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "var(--border)"; }}
          >
            <ExternalLink size={12} /> bags.fm
          </a>
          <a
            href="https://discord.gg/bags"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg transition-all"
            style={{
              color: "var(--text-secondary)",
              border: "1px solid var(--border)",
            }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "#5865f2"; (e.currentTarget as HTMLElement).style.color = "#a5b4fc"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "var(--border)"; (e.currentTarget as HTMLElement).style.color = "var(--text-secondary)"; }}
          >
            <MessageSquare size={12} /> Discord
          </a>
          <a
            href="https://github.com/0xshobha/bagsfeehub"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg transition-all"
            style={{
              color: "var(--text-secondary)",
              border: "1px solid var(--border)",
            }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "var(--green-dark)"; (e.currentTarget as HTMLElement).style.color = "var(--green-bright)"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "var(--border)"; (e.currentTarget as HTMLElement).style.color = "var(--text-secondary)"; }}
          >
            <Github size={12} /> GitHub
          </a>
        </nav>
      </div>

      <style>{`
        @keyframes ping {
          75%, 100% { transform: scale(2); opacity: 0; }
        }
      `}</style>
    </header>
  );
}
