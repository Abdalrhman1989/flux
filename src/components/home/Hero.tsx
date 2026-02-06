"use client";

import { motion } from "framer-motion";
import { Link } from "@/navigation";
import { ArrowRight, Play } from "lucide-react";
import { useTranslations } from "next-intl";

export function Hero() {
    const t = useTranslations('Hero');
    return (
        <section className="relative min-h-[calc(100vh-80px)] flex items-center justify-center overflow-hidden py-20 bg-black" style={{ backgroundColor: '#000000 !important' }}>
            {/* Background Image - Strict Dark Mode Enforcement */}
            {/* Background Image - Strict Dark Mode Enforcement */}
            {/* Using pure CSS gradient to avoid image loading/caching issues causing FOUC */}
            <div
                className="absolute inset-0 z-0 select-none pointer-events-none bg-black"
                style={{
                    background: 'radial-gradient(circle at center, #0F0B29 0%, #030014 100%)'
                }}
            >
                {/* Heavy dark overlay to prevent washing out */}
                <div className="absolute inset-0 bg-black/40" />
                <div className="absolute inset-0 bg-gradient-to-b from-[#030014] via-transparent to-[#030014]" />
                <div className="absolute inset-0 bg-gradient-to-r from-[#030014] via-transparent to-transparent" />
            </div>

            {/* Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/10 rounded-full blur-[120px] animate-pulse-slow pointer-events-none z-0" />

            <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
                {/* Text Content */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="flex flex-col items-start gap-8"
                >
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-glass-bg border border-glass-border">
                        <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                        <span className="text-xs font-mono text-accent tracking-widest uppercase">Live Alpha v1.0</span>
                    </div>

                    <h1 className="text-5xl md:text-7xl font-bold leading-tight">
                        {t.rich('title', {
                            highlight: (chunks: any) => <span className="text-gradient">{chunks}</span>
                        })}
                        <br />
                        <span className="text-muted text-4xl block mt-2">{t('subtitle')}</span>
                    </h1>

                    <p className="text-xl text-muted max-w-lg leading-relaxed">
                        The first <strong>Sentiment-Based Exchange</strong>. Our AI scans 50M+ social signals to find the pump before the charts do.
                    </p>

                    <div className="flex flex-wrap gap-4">
                        <Link href="/play" className="group relative px-8 py-4 bg-primary text-black font-bold rounded-full overflow-hidden transition-transform hover:scale-105">
                            <span className="relative z-10 flex items-center gap-2">
                                {t('cta')} <RocketIcon />
                            </span>
                            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                        </Link>

                        <Link href="/manifesto" className="px-8 py-4 bg-glass-bg border border-glass-border text-white font-medium rounded-full hover:bg-glass-highlight transition-colors flex items-center gap-2">
                            <Play className="w-4 h-4 fill-current" />
                            Watch Demo
                        </Link>
                    </div>

                    {/* Stats */}
                    <div className="flex items-center gap-8 mt-4 pt-8 border-t border-glass-border w-full">
                        <Stat label="Users" value="50K+" />
                        <Stat label="Volume" value="$12M" />
                        <Stat label="Latency" value="0.2s" />
                    </div>
                </motion.div>

                {/* Visual/Mock Content (Placeholder for HypeStream) */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="relative"
                >
                    <div className="glass-panel p-8 rounded-3xl aspect-square md:aspect-auto md:h-[600px] flex items-center justify-center border border-primary/20 bg-gradient-to-br from-surface to-black">
                        <div className="text-center space-y-4">
                            <div className="w-16 h-16 rounded-full bg-surface border border-glass-border mx-auto flex items-center justify-center animate-bounce">
                                🌊
                            </div>
                            <h3 className="text-2xl font-bold text-white">Live Feed Loading...</h3>
                            <p className="text-muted text-sm">Real-time social sentiment stream</p>
                        </div>
                    </div>

                    {/* Floating Elements */}
                    <FloatingCard label="DOGE" value="+12%" color="bg-accent" position="-top-6 -right-6" delay={1} />
                    <FloatingCard label="PEPE" value="+8%" color="bg-secondary" position="-bottom-6 -left-6" delay={1.5} />
                </motion.div>
            </div>
        </section>
    );
}

const RocketIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" /><path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" /><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" /><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" /></svg>
)

const Stat = ({ label, value }: { label: string, value: string }) => (
    <div>
        <div className="text-2xl font-bold text-white">{value}</div>
        <div className="text-xs uppercase tracking-widest text-muted">{label}</div>
    </div>
)

const FloatingCard = ({ label, value, color, position, delay }: any) => (
    <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay }}
        className={`absolute ${position} glass px-6 py-3 rounded-2xl flex items-center gap-4 shadow-xl border border-glass-border z-20 bg-black/50`}
    >
        <div className={`w-3 h-3 rounded-full ${color} animate-pulse`} />
        <div>
            <div className="font-bold text-white">{label}</div>
            <div className="text-xs text-accent">{value}</div>
        </div>
    </motion.div>
)
