import { useTranslations } from "next-intl";

export function Community() {
    const t = useTranslations('Community');

    return (
        <section className="relative py-32 overflow-hidden">
            {/* Background Image with Overlay */}
            {/* Background Image with Overlay */}
            {/* Removed 'fixed' to prevent it from covering the hero section. Changed to dark gradient. */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#030014] to-black opacity-80" />
            <div className="absolute inset-0 bg-[url('/black-void.png')] bg-cover bg-center opacity-20" />

            <div className="container mx-auto px-6 relative z-10 text-center">
                <h2 className="text-5xl md:text-7xl font-black text-white mb-8 tracking-tighter">
                    {t.rich('title', {
                        highlight: (chunks: any) => <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">{chunks}</span>
                    })}
                </h2>
                <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-10">
                    {t('subtitle')}
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <button className="px-8 py-4 rounded-full bg-[#5865F2] hover:bg-[#4752C4] text-white font-bold text-lg transition-colors flex items-center gap-2">
                        {t('discord')}
                    </button>
                    <button className="px-8 py-4 rounded-full bg-black border border-white/20 hover:bg-white/10 text-white font-bold text-lg transition-colors flex items-center gap-2">
                        {t('twitter')}
                    </button>
                </div>
            </div>
        </section>
    );
}
