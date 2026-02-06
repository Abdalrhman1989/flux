"use client";

import { motion } from "framer-motion";
import { TrendingUp, Activity, MessageCircle } from "lucide-react";
import { Token } from "@/lib/mock-data";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

import { useTranslations } from "next-intl";

export function FeaturedCards({ tokens }: { tokens: Token[] }) {
    const router = useRouter();
    const t = useTranslations('FeaturedCards');
    const featured = tokens.slice(0, 3); // Top 3

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {featured.map((token, i) => (
                <motion.div
                    key={token.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    viewport={{ once: true }}
                    onClick={() => router.push(`/asset/${token.symbol}`)}
                    className="relative group cursor-pointer"
                >
                    {/* Glow Effect */}
                    <div className={cn(
                        "absolute -inset-0.5 rounded-3xl blur opacity-30 group-hover:opacity-70 transition duration-500",
                        token.change24h >= 0 ? "bg-accent" : "bg-error"
                    )} />

                    <div className="relative h-full bg-surface border border-glass-border rounded-3xl p-6 flex flex-col justify-between hover:border-white/20 transition-colors">

                        <div className="flex justify-between items-start mb-4">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center font-bold text-white">
                                    {token.symbol[0]}
                                </div>
                                <div>
                                    <div className="font-bold text-white text-lg leading-none">{token.name}</div>
                                    <div className="text-xs text-muted font-mono mt-1">{token.symbol}</div>
                                </div>
                            </div>
                            <div className={cn("flex items-center gap-1 font-bold text-sm", token.change24h >= 0 ? "text-accent" : "text-error")}>
                                {token.change24h >= 0 ? <TrendingUp size={16} /> : <TrendingUp size={16} className="rotate-180" />}
                                {Math.abs(token.change24h)}%
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div className="text-3xl font-mono font-bold text-white">
                                ${token.price}
                            </div>

                            {/* Hype Reason */}
                            <div className="flex items-center gap-2 p-3 rounded-xl bg-white/5 border border-white/5">
                                <MessageCircle size={14} className="text-secondary" />
                                <span className="text-xs text-secondary font-bold uppercase tracking-wide">{t('trending')}</span>
                                <span className="text-xs text-white truncate">{token.trendingReason}</span>
                            </div>
                        </div>
                    </div>
                </motion.div>
            ))}
        </div>
    );
}
