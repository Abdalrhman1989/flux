"use client";

import { MapPin, Search, Phone, Banknote } from "lucide-react";
import { useTranslations } from "next-intl";

export function FluxCash() {
    const t = useTranslations('FluxCash');

    return (
        <section className="container mx-auto px-6 py-24">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

                {/* Text Content */}
                <div className="space-y-8">
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-glass-bg border border-glass-border">
                        <Banknote className="w-4 h-4 text-accent" />
                        <span className="text-xs font-mono text-accent uppercase tracking-widest">{t('badge')}</span>
                    </div>

                    <h2 className="text-4xl md:text-5xl font-bold leading-tight">
                        {t.rich('title', {
                            highlight: (chunks: any) => <span className="text-gradient">{chunks}</span>
                        })}
                    </h2>

                    <p className="text-xl text-muted leading-relaxed">
                        {t.rich('subtitle', {
                            bold: (chunks: any) => <strong>{chunks}</strong>
                        })}
                        <br /><br />
                        <span className="text-white">{t('activeIn')}</span>
                    </p>

                    <div className="flex flex-col gap-4">
                        <Feature icon={MapPin} title={t('map')} desc={t('mapDesc')} />
                        <Feature icon={Search} title={t('trust')} desc={t('trustDesc')} />
                        <Feature icon={Phone} title={t('connect')} desc={t('connectDesc')} />
                    </div>
                </div>

                {/* Mock Map UI */}
                <div className="relative">
                    {/* Map Container */}
                    <div className="aspect-[4/3] rounded-3xl overflow-hidden glass-panel border border-glass-border relative bg-surface/50 grayscale opacity-80 hover:grayscale-0 hover:opacity-100 transition-all duration-700">
                        {/* Simulated Map Background - Dark Mode styling */}
                        <div className="absolute inset-0 bg-[url('https://api.mapbox.com/styles/v1/mapbox/dark-v10/static/36.2765,33.5138,5,0/800x600?access_token=pk.mock')] bg-cover bg-center opacity-40" />

                        {/* Radar Effect */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-primary/20 rounded-full blur-[80px] animate-pulse" />

                        {/* Pins */}
                        <MapMarker top="40%" left="60%" label={t('damascusAgent')} />
                        <MapMarker top="30%" left="55%" label={t('aleppoHub')} />
                        <MapMarker top="60%" left="20%" label={t('beirutCash')} />

                        <div className="absolute bottom-6 left-6 right-6 p-4 rounded-xl glass bg-black/60 backdrop-blur-md flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-accent text-black flex items-center justify-center font-bold">12</div>
                                <div className="text-sm">
                                    <div className="font-bold text-white">{t('agentsOnline')}</div>
                                    <div className="text-muted">{t('region')}</div>
                                </div>
                            </div>
                            <button className="px-4 py-2 rounded-lg bg-white text-black text-sm font-bold">{t('findNow')}</button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

const Feature = ({ icon: Icon, title, desc }: any) => (
    <div className="flex items-start gap-4 p-4 rounded-xl hover:bg-white/5 transition-colors">
        <div className="w-10 h-10 rounded-lg bg-surface border border-glass-border flex items-center justify-center shrink-0">
            <Icon className="w-5 h-5 text-primary" />
        </div>
        <div>
            <h4 className="font-bold text-white">{title}</h4>
            <p className="text-sm text-muted">{desc}</p>
        </div>
    </div>
)

const MapMarker = ({ top, left, label }: any) => (
    <div className="absolute flex flex-col items-center gap-1 group cursor-pointer" style={{ top, left }}>
        <div className="relative">
            <div className="w-4 h-4 rounded-full bg-accent shadow-[0_0_10px_#0aff68] animate-bounce" />
            <div className="absolute inset-0 w-4 h-4 rounded-full bg-accent animate-ping opacity-50" />
        </div>
        <div className="px-2 py-1 rounded bg-black/80 text-[10px] font-bold text-white opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
            {label}
        </div>
    </div>
)
