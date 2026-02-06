"use client";

import { motion } from "framer-motion";
import { Bot, Shield, Zap, TrendingUp, Users } from "lucide-react";
import { cn } from "@/lib/utils";

import { useTranslations } from "next-intl";

export function TradingActors() {
    const t = useTranslations('TradingActors');

    const ACTORS = [
        {
            id: "degen",
            name: t('actors.degen.name'),
            role: t('actors.degen.role'),
            description: t('actors.degen.desc'),
            stats: { apr: "+4200%", winRate: "32%", risk: t('riskLevels.Extreme') },
            color: "text-error",
            bg: "bg-error/10",
            border: "border-error/20",
            icon: Zap
        },
        {
            id: "sheikh",
            name: t('actors.sheikh.name'),
            role: t('actors.sheikh.role'),
            description: t('actors.sheikh.desc'),
            stats: { apr: "+85%", winRate: "94%", risk: t('riskLevels.Low') },
            color: "text-accent",
            bg: "bg-accent/10",
            border: "border-accent/20",
            icon: Shield
        },
        {
            id: "trend",
            name: t('actors.trend.name'),
            role: t('actors.trend.role'),
            description: t('actors.trend.desc'),
            stats: { apr: "+240%", winRate: "68%", risk: t('riskLevels.Medium') },
            color: "text-primary",
            bg: "bg-primary/10",
            border: "border-primary/20",
            icon: TrendingUp
        }
    ];

    return (
        <section className="container mx-auto px-6 py-24 relative">
            <div className="text-center mb-16">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-glass-bg border border-glass-border mb-4">
                    <Bot className="w-4 h-4 text-secondary" />
                    <span className="text-xs font-mono text-secondary uppercase tracking-widest">{t('badge')}</span>
                </div>
                <h2 className="text-4xl md:text-5xl font-bold mb-4">
                    {t.rich('title', {
                        highlight: (chunks: any) => <span className="text-gradient">{chunks}</span>
                    })}
                </h2>
                <p className="text-muted text-lg max-w-2xl mx-auto">
                    {t('subtitle')}
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {ACTORS.map((actor, i) => (
                    <motion.div
                        key={actor.id}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.2 }}
                        viewport={{ once: true }}
                        className="group relative"
                    >
                        <div className={cn("absolute inset-0 rounded-3xl blur-[40px] opacity-0 group-hover:opacity-40 transition-opacity duration-500", actor.bg)} />

                        <div className="relative h-full glass-panel p-8 rounded-3xl border border-glass-border hover:border-white/20 transition-colors flex flex-col">
                            <div className="w-16 h-16 rounded-2xl bg-surface border border-glass-border flex items-center justify-center mb-6 shadow-xl group-hover:scale-110 transition-transform duration-300">
                                <actor.icon className={cn("w-8 h-8", actor.color)} />
                            </div>

                            <h3 className="text-2xl font-bold text-white">{actor.name}</h3>
                            <div className={cn("text-xs font-mono uppercase tracking-widest mb-4", actor.color)}>{actor.role}</div>

                            <p className="text-muted text-sm leading-relaxed mb-8 flex-1">
                                {actor.description}
                            </p>

                            {/* Stats Grid */}
                            <div className="grid grid-cols-3 gap-2 mb-8 p-4 rounded-xl bg-black/20 border border-white/5">
                                <div className="text-center">
                                    <div className="text-xs text-muted mb-1">{t('apr')}</div>
                                    <div className={cn("font-bold", actor.color)}>{actor.stats.apr}</div>
                                </div>
                                <div className="text-center border-l border-white/5">
                                    <div className="text-xs text-muted mb-1">{t('winRate')}</div>
                                    <div className="font-bold text-white">{actor.stats.winRate}</div>
                                </div>
                                <div className="text-center border-l border-white/5">
                                    <div className="text-xs text-muted mb-1">{t('risk')}</div>
                                    <div className="font-bold text-white">{actor.stats.risk}</div>
                                </div>
                            </div>

                            <button className="w-full py-4 rounded-xl bg-white text-black font-bold hover:scale-[1.02] transition-transform flex items-center justify-center gap-2">
                                {t('hire')} <Users className="w-4 h-4" />
                            </button>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
