"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Wallet, Zap, Rocket } from "lucide-react";

export function HowItWorks() {
    const t = useTranslations('HowItWorks');

    const steps = [
        {
            icon: Wallet,
            title: t('step1_title'),
            desc: t('step1_desc'),
            color: "text-primary"
        },
        {
            icon: Zap,
            title: t('step2_title'),
            desc: t('step2_desc'),
            color: "text-accent"
        },
        {
            icon: Rocket,
            title: t('step3_title'),
            desc: t('step3_desc'),
            color: "text-secondary"
        }
    ];

    return (
        <section className="relative py-24 overflow-hidden">
            <div className="container mx-auto px-6 relative z-10">
                <div className="text-center mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-5xl font-black text-white mb-6"
                    >
                        {t.rich('title', {
                            highlight: (chunks) => <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">{chunks}</span>
                        })}
                    </motion.h2>
                    <p className="text-xl text-muted max-w-2xl mx-auto">
                        {t('subtitle')}
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
                    {/* Connecting Line (Desktop) */}
                    <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-0.5 bg-gradient-to-r from-primary via-accent to-secondary opacity-20" />

                    {steps.map((step, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.2 }}
                            viewport={{ once: true }}
                            className="relative flex flex-col items-center text-center group"
                        >
                            <div className="w-24 h-24 rounded-2xl glass flex items-center justify-center mb-8 relative z-10 group-hover:scale-110 transition-transform duration-300 border border-white/5 bg-[#0A0B14]">
                                <step.icon className={`w-10 h-10 ${step.color}`} />
                                <div className={`absolute inset-0 bg-current opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-300 ${step.color}`} />
                            </div>

                            <h3 className="text-2xl font-bold text-white mb-4">{step.title}</h3>
                            <p className="text-muted leading-relaxed max-w-xs">{step.desc}</p>

                            {/* Number Watermark */}
                            <div className="absolute -top-10 -right-4 text-9xl font-black text-white/5 select-none pointer-events-none">
                                {i + 1}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
