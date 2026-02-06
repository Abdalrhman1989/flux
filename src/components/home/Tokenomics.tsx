"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { PieChart, Lock, Users, TrendingUp } from "lucide-react";

export function Tokenomics() {
    const t = useTranslations('Tokenomics');

    const stats = [
        { label: "Total Supply", value: "1B", desc: "FLUX" },
        { label: "Public Sale", value: "40%", desc: "Fair Launch" },
        { label: "Liquidity", value: "30%", desc: "Locked 100y" },
        { label: "Community", value: "20%", desc: "Airdrops" },
        { label: "Team", value: "10%", desc: "Vested 24m" },
    ];

    return (
        <section className="relative py-32 bg-black/40 border-y border-white/5">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
                            $FLUX <span className="text-primary">Tokenomics</span>
                        </h2>
                        <p className="text-xl text-muted mb-8 leading-relaxed">
                            The fuel for the sentiment engine. Hold $FLUX to access premium AI signals, vote on listings, and earn yield from trading fees.
                        </p>

                        <div className="grid grid-cols-1 gap-6">
                            <Feature
                                icon={Lock}
                                title="Liquidity Locked"
                                desc="100% of LP tokens burned at launch. Unruggable architecture."
                            />
                            <Feature
                                icon={TrendingUp}
                                title="Deflationary Burn"
                                desc="1% of every trade is burned instantly, reducing supply forever."
                            />
                            <Feature
                                icon={Users}
                                title="Community Governance"
                                desc="DAO voting rights for platform upgrades and treasury allocation."
                            />
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="relative"
                    >
                        {/* Abstract Chart Representation */}
                        <div className="relative aspect-square glass rounded-full flex items-center justify-center p-12 border border-white/5 bg-[#0A0B14]">
                            <div className="absolute inset-0 bg-primary/20 blur-[100px] rounded-full" />

                            <div className="grid grid-cols-2 gap-4 w-full h-full">
                                {stats.map((stat, i) => (
                                    <div key={i} className={`flex flex-col items-center justify-center rounded-2xl bg-white/5 border border-white/5 p-4 ${i === 0 ? "col-span-2 bg-gradient-to-br from-primary/20 to-purple-500/20 border-primary/30" : ""}`}>
                                        <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
                                        <div className="text-xs uppercase tracking-widest text-muted">{stat.label}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}

const Feature = ({ icon: Icon, title, desc }: any) => (
    <div className="flex gap-4 p-4 rounded-xl hover:bg-white/5 transition-colors group">
        <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
            <Icon size={24} />
        </div>
        <div>
            <h4 className="text-lg font-bold text-white mb-1">{title}</h4>
            <p className="text-muted text-sm">{desc}</p>
        </div>
    </div>
)
