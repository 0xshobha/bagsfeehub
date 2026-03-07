import { Github, Twitter, ExternalLink } from "lucide-react";
import Logo from "@/components/Logo";

export default function Footer() {
  return (
    <footer
      className="mt-16 border-t px-6 py-10"
      style={{ borderColor: "var(--border)" }}
    >
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
        {/* Left: branding */}
        <div className="flex flex-col items-center sm:items-start gap-2">
          <div className="flex items-center gap-2.5">
            <Logo size={28} animated={false} />
            <span className="font-bold text-lg" style={{ color: "var(--text-primary)" }}>
              Bags<span style={{ color: "var(--green-bright)" }}>Fee</span>Hub
            </span>
          </div>
          <p className="text-xs text-center sm:text-left" style={{ color: "var(--text-muted)" }}>
            Built for the{" "}
            <a
              href="https://bags.fm/hackathon"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:opacity-80 transition-opacity"
              style={{ color: "var(--green)" }}
            >
              Bags $4M Hackathon
            </a>{" "}
            · Category: Bags API + Fee Sharing
          </p>
          <div className="flex items-center gap-2">
            <span
              className="badge-green text-xs"
              style={{ fontSize: 10, padding: "2px 8px" }}
            >
              Powered by Bags API
            </span>
            <span
              className="text-xs px-2 py-0.5 rounded-full"
              style={{
                background: "rgba(99,102,241,0.1)",
                color: "#a78bfa",
                border: "1px solid rgba(99,102,241,0.2)",
                fontSize: 10,
              }}
            >
              Built on Solana
            </span>
          </div>
        </div>

        {/* Right: links */}
        <div className="flex items-center gap-4">
          <a
            href="https://github.com/0xshobha/bagsfeehub"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-sm transition-colors hover:opacity-80"
            style={{ color: "var(--text-secondary)" }}
          >
            <Github size={15} /> GitHub
          </a>
          <a
            href="https://x.com/0xshobha"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-sm transition-colors hover:opacity-80"
            style={{ color: "var(--text-secondary)" }}
          >
            <Twitter size={15} /> @0xshobha
          </a>
          <a
            href="https://bags.fm"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-sm transition-colors hover:opacity-80"
            style={{ color: "var(--text-secondary)" }}
          >
            <ExternalLink size={15} /> Bags.fm
          </a>
        </div>
      </div>

      {/* Bottom disclaimer */}
      <div className="max-w-5xl mx-auto mt-6 text-center">
        <p className="text-xs" style={{ color: "var(--text-muted)" }}>
          BagsFeeHub is not affiliated with Bags Holdings, Inc. Data is sourced from
          the public Bags API. Not financial advice.
        </p>
      </div>
    </footer>
  );
}
