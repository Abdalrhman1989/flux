"use client";

import { useState } from "react";
import { getHypeStream } from "@/lib/mock-data";
import { TrendingUp, TrendingDown, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { useRouter } from "@/navigation";
import { useTranslations } from "next-intl";

export function MarketList() {
    const [tokens, setTokens] = useState(getHypeStream().slice(0, 10)); // Start with 10
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const t = useTranslations('MarketList');

    const loadMore = () => {
        setLoading(true);
        setTimeout(() => {
            setTokens((prev) => [...prev, ...getHypeStream().slice(0, 10)]); // Add 10 more
            setLoading(false);
        }, 1000);
    };

    return (
        <section className="container mx-auto px-6 py-24">
            <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
                <div>
                    <h2 className="text-4xl font-bold mb-2">
                        {t.rich('title', {
                            highlight: (chunks: any) => <span className="text-gradient">{chunks}</span>
                        })}
                    </h2>
                    <p className="text-muted">{t('subtitle')}</p>
                </div>

                <div className="flex gap-2">
                    <button className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-sm hover:bg-white/10 transition-colors">Defi</button>
                    <button className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-sm hover:bg-white/10 transition-colors">Meme</button>
                    <button className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-sm hover:bg-white/10 transition-colors">Gaming</button>
                </div>
            </div>

            <div className="w-full glass-panel rounded-3xl overflow-hidden border border-glass-border">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead className="bg-white/5 text-muted text-xs uppercase tracking-widest sticky top-0 backdrop-blur-md z-1">
                            <tr>
                                <th className="p-6 font-medium">{t('asset')}</th>
                                <th className="p-6 font-medium text-right">{t('price')}</th>
                                <th className="p-6 font-medium text-right">{t('change24h')}</th>
                                <th className="p-6 font-medium hidden md:table-cell">{t('trend7d')}</th>
                                <th className="p-6 font-medium hidden lg:table-cell">Signal</th>
                                <th className="p-6 font-medium text-right hidden xl:table-cell">{t('volume')}</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-glass-border">
                            {tokens.map((token, i) => (
                                <motion.tr
                                    key={token.id}
                                    initial={{ opacity: 0, y: 10 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    onClick={() => router.push(`/asset/${token.symbol}`)}
                                    className="group hover:bg-white/5 transition-colors cursor-pointer"
                                >
                                    <td className="p-6">
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 rounded-full bg-surface border border-glass-border flex items-center justify-center font-bold text-xs shadow-lg">
                                                {token.symbol[0]}
                                            </div>
                                            <div>
                                                <div className="font-bold text-white group-hover:text-primary transition-colors">{token.name}</div>
                                                <div className="text-xs text-muted font-mono">{token.symbol}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="p-6 text-right font-mono font-bold text-white">
                                        ${token.price}
                                    </td>
                                    <td className="p-6 text-right">
                                        <div className={cn("inline-flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-full", token.change24h >= 0 ? "bg-accent/10 text-accent" : "bg-error/10 text-error")}>
                                            {token.change24h >= 0 ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                                            {Math.abs(token.change24h)}%
                                        </div>
                                    </td>
                                    <td className="p-6 hidden md:table-cell">
                                        <div className="w-32">
                                            <Sparkline data={token.history} color={token.change24h >= 0 ? "#0aff68" : "#ff0055"} />
                                        </div>
                                    </td>
                                    <td className="p-6 hidden lg:table-cell">
                                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-surface border border-white/5 text-xs text-secondary">
                                            <span className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse" />
                                            {token.trendingReason}
                                        </div>
                                    </td>
                                    <td className="p-6 text-right text-muted hidden xl:table-cell font-mono">
                                        ${token.volume24h}
                                    </td>
                                </motion.tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="p-6 border-t border-glass-border">
                    <button
                        onClick={loadMore}
                        disabled={loading}
                        className="w-full py-4 rounded-xl bg-white/5 hover:bg-white/10 text-muted hover:text-white transition-all flex items-center justify-center gap-2 font-bold"
                    >
                        {loading ? t('loading') : t('loadMore')}
                        {!loading && <ArrowRight size={16} />}
                    </button>
                </div>
            </div>
        </section>
    );
}

const Sparkline = ({ data, color }: { data: number[], color: string }) => {
    const min = Math.min(...data);
    const max = Math.max(...data);
    const range = max - min;
    const width = 100;
    const height = 30;

    // Create points string
    const points = data.map((val, i) => {
        const x = (i / (data.length - 1)) * width;
        const y = height - ((val - min) / range) * height; // Invert y for SVG
        return `${x},${y}`;
    }).join(" ");

    return (
        <svg width="120" height="40" viewBox={`0 0 ${width} ${height}`} overflow="visible">
            <polyline
                points={points}
                fill="none"
                stroke={color}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    )
}
