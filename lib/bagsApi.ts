import axios from "axios";

const BASE_URL = "https://public-api-v2.bags.fm/api/v1";
const API_KEY = process.env.NEXT_PUBLIC_BAGS_API_KEY || "";

const headers: Record<string, string> = {
  "Content-Type": "application/json",
  ...(API_KEY ? { "x-api-key": API_KEY } : {}),
};

// ─── Types ──────────────────────────────────────────────────────────────────

export interface LifetimeFeesData {
  totalFeesSOL: number;
  totalFeesUSD: number;
  dailyBreakdown: { label: string; fees: number }[];
}

export interface ClaimStatsData {
  totalVolume: number;
  activeTraders: number;
  totalClaims: number;
  recentVolume7d: number;
}

export interface Creator {
  address: string;
  provider: string;
  share: number;
}

export interface ClaimTxResponse {
  transaction: string;
  message: string;
  instructions?: unknown[];
}

// ─── Fake data fallback ─────────────────────────────────────────────────────

const FAKE_FEES: LifetimeFeesData = {
  totalFeesSOL: 24.57,
  totalFeesUSD: 3685.5,
  dailyBreakdown: [
    { label: "Day 1", fees: 1.2 },
    { label: "Day 2", fees: 2.8 },
    { label: "Day 3", fees: 3.1 },
    { label: "Day 4", fees: 4.5 },
    { label: "Day 5", fees: 5.2 },
    { label: "Day 6", fees: 4.0 },
    { label: "Day 7", fees: 3.77 },
  ],
};

const FAKE_STATS: ClaimStatsData = {
  totalVolume: 245700,
  activeTraders: 312,
  totalClaims: 89,
  recentVolume7d: 58200,
};

const FAKE_CREATORS: Creator[] = [
  { address: "8xFe...3k2m", provider: "Bags", share: 100 },
];

// ─── Helpers ────────────────────────────────────────────────────────────────

const SOL_USD_APPROX = 150; // rough approximation, update as needed

function safeParseFees(raw: unknown): LifetimeFeesData {
  try {
    const data = raw as Record<string, unknown>;
    const totalFeesSOL =
      typeof data.totalFees === "string"
        ? parseFloat(data.totalFees) / 1e9
        : typeof data.lifetimeFees === "number"
        ? data.lifetimeFees
        : typeof data.fees === "number"
        ? data.fees
        : 0;

    const breakdown = Array.isArray(data.breakdown)
      ? (data.breakdown as { label?: string; fees?: number }[]).map(
          (b, i) => ({
            label: b.label ?? `Day ${i + 1}`,
            fees: b.fees ?? 0,
          })
        )
      : FAKE_FEES.dailyBreakdown;

    return {
      totalFeesSOL,
      totalFeesUSD: totalFeesSOL * SOL_USD_APPROX,
      dailyBreakdown: breakdown,
    };
  } catch {
    return FAKE_FEES;
  }
}

function safeParseStats(raw: unknown): ClaimStatsData {
  try {
    const data = raw as Record<string, unknown>;
    return {
      totalVolume:
        typeof data.volume === "number"
          ? data.volume
          : typeof data.totalVolume === "number"
          ? data.totalVolume
          : FAKE_STATS.totalVolume,
      activeTraders:
        typeof data.activeTraders === "number"
          ? data.activeTraders
          : FAKE_STATS.activeTraders,
      totalClaims:
        typeof data.claims === "number"
          ? data.claims
          : typeof data.totalClaims === "number"
          ? data.totalClaims
          : FAKE_STATS.totalClaims,
      recentVolume7d:
        typeof data.recentVolume7d === "number"
          ? data.recentVolume7d
          : FAKE_STATS.recentVolume7d,
    };
  } catch {
    return FAKE_STATS;
  }
}

// ─── API Functions ───────────────────────────────────────────────────────────

/** Get lifetime creator fees for a token */
export async function getLifetimeFees(mint: string): Promise<LifetimeFeesData> {
  try {
    const res = await axios.get(
      `${BASE_URL}/get-token-lifetime-fees?tokenMint=${mint}`,
      { headers, timeout: 8000 }
    );
    return safeParseFees(res.data);
  } catch (err) {
    console.warn("[bagsApi] getLifetimeFees failed, using fake data:", err);
    return FAKE_FEES;
  }
}

/** Get claim stats: volume, active traders, total claims */
export async function getClaimStats(mint: string): Promise<ClaimStatsData> {
  try {
    const res = await axios.get(
      `${BASE_URL}/get-token-claim-stats?tokenMint=${mint}`,
      { headers, timeout: 8000 }
    );
    return safeParseStats(res.data);
  } catch (err) {
    console.warn("[bagsApi] getClaimStats failed, using fake data:", err);
    return FAKE_STATS;
  }
}

/** Get creator/team info for a token */
export async function getCreators(mint: string): Promise<Creator[]> {
  try {
    const res = await axios.get(
      `${BASE_URL}/get-token-launch-creators?tokenMint=${mint}`,
      { headers, timeout: 8000 }
    );
    const raw = res.data;
    if (Array.isArray(raw)) {
      return raw.map((c: Record<string, unknown>) => ({
        address: String(c.address ?? ""),
        provider: String(c.provider ?? "Bags"),
        share: typeof c.share === "number" ? c.share : 100,
      }));
    }
    return FAKE_CREATORS;
  } catch (err) {
    console.warn("[bagsApi] getCreators failed, using fake data:", err);
    return FAKE_CREATORS;
  }
}

/** Generate a one-click claim transaction */
export async function generateClaimTx(
  mint: string,
  feeClaimerWallet: string
): Promise<ClaimTxResponse> {
  const res = await axios.post(
    `${BASE_URL}/token-launch/claim-txs/v2`,
    {
      tokenMint: mint,
      feeClaimer: feeClaimerWallet,
      claimVirtualPoolFees: true,
    },
    { headers, timeout: 10000 }
  );
  return res.data as ClaimTxResponse;
}

/** Fetch all token data in parallel */
export async function fetchAllTokenData(mint: string) {
  const [fees, stats, creators] = await Promise.all([
    getLifetimeFees(mint),
    getClaimStats(mint),
    getCreators(mint),
  ]);
  return { fees, stats, creators };
}
