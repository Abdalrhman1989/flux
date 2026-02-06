export interface Token {
    id: string;
    symbol: string;
    name: string;
    price: string;
    change24h: number;
    marketCap: string;
    volume24h: string;
    trendingReason: string;
    history: number[]; // Array of prices for sparkline
}

const BASE_TOKENS = [
    { s: "BTC", n: "Bitcoin", p: 65430, c: 2.1, cap: "1.2T", v: "45B", h: [64000, 64200, 63800, 64500, 65000, 65430] },
    { s: "ETH", n: "Ethereum", p: 3450, c: 1.5, cap: "400B", v: "20B", h: [3300, 3350, 3320, 3400, 3420, 3450] },
    { s: "SOL", n: "Solana", p: 145, c: 5.2, cap: "65B", v: "4B", h: [135, 138, 140, 139, 142, 145] },
    { s: "DOGE", n: "Dogecoin", p: 0.12, c: -1.2, cap: "18B", v: "1B", h: [0.13, 0.125, 0.122, 0.120, 0.118, 0.12] },
    { s: "PEPE", n: "Pepe", p: 0.000012, c: 12.5, cap: "5B", v: "800M", h: [0.000010, 0.000011, 0.000013, 0.000012, 0.0000125] },
    { s: "FLUX", n: "Flux Protocol", p: 1.24, c: 8.4, cap: "200M", v: "50M", h: [1.10, 1.15, 1.12, 1.18, 1.20, 1.24] },
    { s: "WIF", n: "Dogwifhat", p: 2.30, c: -5.4, cap: "2B", v: "300M", h: [2.50, 2.45, 2.40, 2.35, 2.32, 2.30] },
    { s: "BONK", n: "Bonk", p: 0.000024, c: 3.2, cap: "1.5B", v: "100M", h: [0.000022, 0.000023, 0.000023, 0.000024, 0.000024] },
    { s: "ADA", n: "Cardano", p: 0.45, c: 0.5, cap: "16B", v: "500M", h: [0.44, 0.45, 0.45, 0.45, 0.44, 0.45] },
    { s: "XRP", n: "Ripple", p: 0.62, c: 1.1, cap: "34B", v: "1.2B", h: [0.60, 0.61, 0.61, 0.62, 0.62, 0.62] },
    { s: "AVAX", n: "Avalanche", p: 35.20, c: 2.4, cap: "13B", v: "600M", h: [34, 34.5, 34.8, 35, 35.1, 35.2] },
    { s: "SHIB", n: "Shiba Inu", p: 0.000025, c: 4.1, cap: "14B", v: "800M", h: [0.000023, 0.000024, 0.000024, 0.000025] },
    { s: "DOT", n: "Polkadot", p: 7.20, c: -0.8, cap: "10B", v: "200M", h: [7.3, 7.25, 7.22, 7.20, 7.18, 7.20] },
    { s: "LINK", n: "Chainlink", p: 18.50, c: 6.7, cap: "11B", v: "900M", h: [17, 17.5, 17.8, 18, 18.2, 18.5] },
    { s: "NEAR", n: "Near Protocol", p: 6.80, c: 9.2, cap: "7B", v: "400M", h: [6.0, 6.2, 6.4, 6.5, 6.7, 6.8] }
];

export function getHypeStream(): Token[] {
    // Generate items by tweaking base tokens deterministically
    // We avoid Math.random() here to prevent hydration mismatches between server and client
    let fullList: Token[] = [];
    for (let i = 0; i < 4; i++) {
        fullList = [...fullList, ...BASE_TOKENS.map((t, idx) => {
            // Pseudo-random but deterministic modifier based on index
            const variation = (i * 10 + idx) * 0.1;
            const changeMod = ((variation % 2) - 1);

            return {
                id: `${t.s}-${i}-${idx}`,
                symbol: t.s,
                name: i === 0 ? t.n : `${t.n} ${i + 1}`,
                price: t.p.toLocaleString(),
                change24h: Number((t.c + changeMod).toFixed(2)),
                marketCap: t.cap,
                volume24h: t.v,
                trendingReason: "High social volume",
                history: t.h.map((p, hIdx) => p * (1 + ((hIdx % 2 === 0 ? 0.05 : -0.05))))
            };
        })];
    }
    return fullList;
}
