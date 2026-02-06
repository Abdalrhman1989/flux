"use client";

import { useState } from "react";
import { motion, useMotionValue, useTransform, useAnimation } from "framer-motion";
import { Token, getHypeStream } from "@/lib/mock-data";
import { X, Rocket, Coins } from "lucide-react";
import { cn } from "@/lib/utils";

import { useTranslations } from "next-intl";

export function Arcade() {
    const [cards, setCards] = useState<Token[]>(getHypeStream().slice(0, 5));
    const t = useTranslations('Arcade');

    const removeCard = (id: string) => {
        setCards((prev) => prev.filter((c) => c.id !== id));
        if (cards.length <= 2) {
            setCards((prev) => [...prev, ...getHypeStream()]); // Infinite feed
        }
    };

    return (
        <section className="container mx-auto px-6 py-20 min-h-[800px] flex flex-col items-center justify-center relative overflow-hidden">
            {/* Decorative Background */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-secondary/10 rounded-full blur-[100px] pointer-events-none" />

            <div className="text-center mb-12 relative z-10">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-glass-bg border border-glass-border mb-4">
                    <Coins className="w-4 h-4 text-primary" />
                    <span className="text-xs font-mono text-primary uppercase tracking-widest">{t('badge')}</span>
                </div>
                <h2 className="text-4xl font-bold mb-4">
                    {t.rich('title', {
                        highlight: (chunks: any) => <span className="text-gradient">{chunks}</span>
                    })}
                </h2>
                <p className="text-muted">{t('subtitle')}</p>
            </div>

            <div className="relative w-full max-w-sm h-[500px] flex items-center justify-center">
                {cards.map((card, index) => (
                    <SwipeCard
                        key={card.id + index} // Unique key for infinite list
                        token={card}
                        isFront={index === cards.length - 1}
                        onRemove={() => removeCard(card.id)}
                        t={t}
                    />
                ))}
                {cards.length === 0 && (
                    <div className="text-muted animate-pulse">{t('refilling')}</div>
                )}
            </div>
        </section>
    );
}

function SwipeCard({ token, isFront, onRemove, t }: { token: Token, isFront: boolean, onRemove: () => void, t: any }) {
    const x = useMotionValue(0);
    const rotate = useTransform(x, [-200, 200], [-25, 25]);
    const opacity = useTransform(x, [-200, -150, 0, 150, 200], [0, 1, 1, 1, 0]);

    // VISUAL FEEDBACK OPACITY
    const apeOpacity = useTransform(x, [20, 100], [0, 1]);
    const passOpacity = useTransform(x, [-20, -100], [0, 1]);

    const controls = useAnimation();

    const handleDragEnd = async (_: any, info: any) => {
        const offset = info.offset.x;
        const velocity = info.velocity.x;

        if (offset > 100 || velocity > 800) {
            await controls.start({ x: 500, opacity: 0 }); // Swipe Right (Like)
            onRemove();
        } else if (offset < -100 || velocity < -800) {
            await controls.start({ x: -500, opacity: 0 }); // Swipe Left (Pass)
            onRemove();
        } else {
            controls.start({ x: 0 }); // Reset
        }
    };

    if (!isFront) {
        return (
            <div className="absolute top-0 left-0 w-full h-full glass-panel rounded-3xl p-6 scale-95 opacity-50 -z-10 bg-surface border border-glass-border shadow-xl">
                <div className="w-full h-full flex items-center justify-center text-muted">
                    {t('next')} {token.symbol}
                </div>
            </div>
        );
    }

    return (
        <motion.div
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            style={{ x, rotate, opacity }}
            animate={controls}
            onDragEnd={handleDragEnd}
            className="absolute top-0 left-0 w-full h-full cursor-grab active:cursor-grabbing z-20"
        >
            {/* The Card */}
            <div className="w-full h-full glass-panel rounded-3xl p-8 flex flex-col justify-between bg-surface/80 backdrop-blur-xl border border-glass-border shadow-[0_0_50px_rgba(0,0,0,0.5)] relative overflow-hidden">

                {/* Visual Feedback Overlays */}
                <motion.div style={{ opacity: apeOpacity }} className="absolute inset-0 bg-accent/20 flex items-center justify-center z-10 pointer-events-none border-4 border-accent rounded-3xl">
                    <div className="text-6xl font-black text-accent -rotate-12 border-4 border-accent p-4 rounded-xl uppercase">{t('ape')}</div>
                </motion.div>

                <motion.div style={{ opacity: passOpacity }} className="absolute inset-0 bg-error/20 flex items-center justify-center z-10 pointer-events-none border-4 border-error rounded-3xl">
                    <div className="text-6xl font-black text-error rotate-12 border-4 border-error p-4 rounded-xl uppercase">{t('pass')}</div>
                </motion.div>

                {/* Header */}
                <div className="flex justify-between items-start">
                    <div>
                        <h3 className="text-3xl font-bold text-white mb-1">{token.symbol}</h3>
                        <p className="text-sm text-muted">{token.name}</p>
                    </div>
                    <div className="text-right">
                        <div className="text-xl font-bold text-primary">${token.price}</div>
                        <div className={cn("text-xs font-bold", token.change24h >= 0 ? "text-accent" : "text-error")}>
                            {token.change24h > 0 ? "+" : ""}{token.change24h}%
                        </div>
                    </div>
                </div>

                {/* Central Visual */}
                <div className="flex-1 flex items-center justify-center my-6">
                    <div className="w-32 h-32 rounded-full border-4 border-white/5 bg-gradient-to-br from-surface to-black flex items-center justify-center text-4xl font-bold shadow-2xl">
                        {token.symbol[0]}
                    </div>
                </div>

                {/* Data / Reason */}
                <div className="space-y-4">
                    <div className="p-4 rounded-xl bg-white/5 border border-white/5 text-center">
                        <p className="text-sm italic text-muted">"{token.trendingReason}"</p>
                    </div>

                    {/* Hint Controls */}
                    <div className="flex justify-between items-center px-4 opacity-50">
                        <div className="flex flex-col items-center gap-1 text-error">
                            <div className="w-12 h-12 rounded-full border md:border-2 border-error flex items-center justify-center">
                                <X size={20} />
                            </div>
                            <span className="text-xs font-bold uppercase">{t('passBtn')}</span>
                        </div>

                        <div className="text-xs text-muted font-mono">{t('drag')}</div>

                        <div className="flex flex-col items-center gap-1 text-accent">
                            <div className="w-12 h-12 rounded-full border md:border-2 border-accent flex items-center justify-center">
                                <Rocket size={20} />
                            </div>
                            <span className="text-xs font-bold uppercase">{t('apeBtn')}</span>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
