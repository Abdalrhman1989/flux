"use client";

import { motion } from "framer-motion";
import { TrendingUp, Zap, MessageSquare } from "lucide-react";
import { useRouter } from "next/navigation";
import { getHypeStream } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

import { useTranslations } from "next-intl";

export function HypeStream() {
    const router = useRouter();
    const t = useTranslations('HypeStream');
    // Use first 6 items for the grid
    const tokens = getHypeStream().slice(0, 6);

    return (
        <section className="container mx-auto px-6 py-12">
            <h2 className="text-3xl font-bold mb-8">{t('title')}</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {tokens.map((token, i) => {
                    // pseudo-random but deterministic based on name length and change
                    const seed = token.symbol.length + Math.abs(token.change24h);
                    const hypeScore = 60 + (Math.floor(seed * 7) % 40); // 60-100 range
                    const isPositive = token.change24h >= 0;

                    return (
                        <motion.div
                            key={token.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            viewport={{ once: true }}
                            onClick={() => router.push(`/asset/${token.symbol}`)}
                            className="bg-[#0A0B14] border border-white/5 rounded-3xl p-6 hover:border-white/20 transition-all cursor-pointer group relative overflow-hidden"
                        >
                            {/* Background Glow */}
                            <div className={cn("absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500 bg-gradient-to-br", isPositive ? "from-accent via-transparent to-transparent" : "from-secondary via-transparent to-transparent")} />

                            {/* Header */}
                            <div className="flex justify-between items-start mb-6">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center font-bold text-sm">
                                        {token.symbol[0]}
                                    </div>
                                    <div>
                                        <div className="font-bold text-white text-lg leading-none">{token.symbol}</div>
                                        <div className="text-xs text-muted mt-0.5">{token.name}</div>
                                    </div>
                                </div>
                                <div className={cn("flex items-center gap-1 font-bold text-sm", isPositive ? "text-accent" : "text-secondary")}>
                                    <TrendingUp size={14} className={cn(isPositive ? "" : "rotate-180")} />
                                    {Math.abs(token.change24h)}%
                                </div>
                            </div>

                            {/* Hype Score Progress */}
                            <div className="mb-6">
                                <div className="flex justify-between text-xs font-bold mb-2">
                                    <span className="text-muted">{t('hypeScore')}</span>
                                    <span className="text-white">{hypeScore}/100</span>
                                </div>
                                <div className="h-2 w-full bg-surface rounded-full overflow-hidden">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        whileInView={{ width: `${hypeScore}%` }}
                                        transition={{ duration: 1, ease: "easeOut" }}
                                        className={cn("h-full rounded-full", isPositive ? "bg-accent" : "bg-secondary")}
                                    />
                                </div>
                            </div>

                            {/* AI Insight */}
                            <div className="bg-white/5 rounded-xl p-4 border border-white/5 flex gap-3">
                                <Zap className={cn("w-4 h-4 shrink-0 mt-0.5", isPositive ? "text-accent" : "text-secondary")} />
                                <div>
                                    <div className={cn("text-xs font-bold uppercase mb-1", isPositive ? "text-accent" : "text-secondary")}>
                                        {t('aiInsight')}
                                    </div>
                                    <p className="text-sm text-gray-400 italic leading-snug">
                                        "{generateInsight(token)}"
                                    </p>
                                </div>
                            </div>

                        </motion.div>
                    )
                })}
            </div>
        </section>
    );
}

function generateInsight(token: any) {
    if (token.symbol === "DOGE") return "Elon tweeted a meme about dogs. Social volume up 400%.";
    if (token.symbol === "ETH") return "Whales taking profit after the ETF news. Watch support.";
    if (token.symbol === "SOL") return "Network upgrade successful. github activity spiking.";
    if (token.symbol === "BTC") return "Holding strong above 65k. Institutional inflows detected.";
    return `${token.symbol} is trending due to high retail interest and breakout volume.`;
}
