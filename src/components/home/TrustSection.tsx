import { useTranslations } from "next-intl";

export function TrustSection() {
    const t = useTranslations('TrustSection');

    return (
        <section className="py-12 border-y border-white/5 bg-black/20 overflow-hidden">
            <div className="container mx-auto px-6 mb-8 text-center">
                <p className="text-sm font-mono text-muted uppercase tracking-widest">{t('title')}</p>
            </div>

            {/* Marquee Container */}
            <div className="relative flex overflow-x-hidden group">
                <div className="py-4 animate-marquee whitespace-nowrap flex gap-16 px-16">
                    <Logo name="Binance" />
                    <Logo name="Coinbase" />
                    <Logo name="Ethereum Foundation" />
                    <Logo name="Solana Labs" />
                    <Logo name="Chainlink" />
                    <Logo name="Flux Capital" />
                    <Logo name="Metamask" />
                    <Logo name="Ledger" />
                </div>

                {/* Duplicate for seamless loop */}
                <div className="absolute top-0 py-4 animate-marquee2 whitespace-nowrap flex gap-16 px-16">
                    <Logo name="Binance" />
                    <Logo name="Coinbase" />
                    <Logo name="Ethereum Foundation" />
                    <Logo name="Solana Labs" />
                    <Logo name="Chainlink" />
                    <Logo name="Flux Capital" />
                    <Logo name="Metamask" />
                    <Logo name="Ledger" />
                </div>
            </div>
        </section>
    );
}

const Logo = ({ name }: { name: string }) => (
    <div className="text-2xl font-bold text-white/20 uppercase font-mono hover:text-white/40 transition-colors cursor-default">
        {name}
    </div>
)
