import { Zap, ShieldCheck, Cpu } from "lucide-react";
import { useTranslations } from "next-intl";

export function WhyFlux() {
    const t = useTranslations('WhyFlux');

    return (
        <section className="container mx-auto px-6 py-24">
            <div className="text-center mb-16">
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
                <Feature
                    icon={Zap}
                    title={t('fast')}
                    desc={t('fastDesc')}
                />
                <Feature
                    icon={ShieldCheck}
                    title={t('security')}
                    desc={t('securityDesc')}
                />
                <Feature
                    icon={Cpu}
                    title={t('ai')}
                    desc={t('aiDesc')}
                />
            </div>
        </section>
    );
}

const Feature = ({ icon: Icon, title, desc }: any) => (
    <div className="p-8 rounded-3xl glass-panel border border-glass-border hover:border-primary/30 hover:bg-white/5 transition-all group">
        <div className="w-14 h-14 rounded-2xl bg-surface border border-glass-border flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
            <Icon className="w-7 h-7 text-primary" />
        </div>
        <h3 className="text-2xl font-bold text-white mb-4">{title}</h3>
        <p className="text-muted leading-relaxed">
            {desc}
        </p>
    </div>
)
