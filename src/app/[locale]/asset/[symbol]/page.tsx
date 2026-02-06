"use client";

import { useParams } from "next/navigation";
import { ArrowLeft, TrendingUp, Globe, FileText, Twitter, Copy, CreditCard } from "lucide-react";
import { Link } from "@/navigation";
import { getHypeStream } from "@/lib/mock-data";
import { useTranslations } from "next-intl";

import { cn } from "@/lib/utils";

import { useWalletModal } from "@/context/WalletModalContext";

import { use } from "react";

export default function AssetPage({ params }: { params: Promise<{ symbol: string }> }) {
    const { symbol } = use(params);
    const { openWalletModal } = useWalletModal();
    const t = useTranslations('AssetPage');
    const tCommon = useTranslations('Common');

    // Simulate fetching data (in real app, use SWR/React Query)
    const allTokens = getHypeStream();
    const token = allTokens.find(t => t.symbol === symbol) || allTokens[0]; // Fallback to first if not found (mock)

    const isPositive = token.change24h >= 0;

    return (
        <div className="min-h-screen pb-20">
            {/* ... existing code ... */}
            <div className="container mx-auto px-6 py-8">
                {/* ... existing code ... */}
                <Link href="/" className="inline-flex items-center gap-2 text-muted hover:text-white transition-colors mb-8">
                    <ArrowLeft size={20} /> Back to Market
                </Link>

                <div className="flex flex-col lg:flex-row gap-12">

                    {/* Left Column: Main Chart & Info */}
                    <div className="flex-1 space-y-8">
                        {/* Header */}
                        <div className="flex items-start justify-between">
                            <div className="flex items-center gap-4">
                                <div className="w-16 h-16 rounded-full bg-surface border border-glass-border flex items-center justify-center font-bold text-2xl shadow-xl">
                                    {token.symbol[0]}
                                </div>
                                <div>
                                    <h1 className="text-4xl font-bold text-white mb-1">{token.name}</h1>
                                    <div className="text-xl text-muted font-mono">{token.symbol}</div>
                                </div>
                            </div>
                            <div className="text-right">
                                <div className="text-4xl font-mono font-bold text-white mb-2">${token.price}</div>
                                <div className={cn("inline-flex items-center gap-2 px-3 py-1 rounded-full font-bold text-sm", isPositive ? "bg-accent/10 text-accent" : "bg-error/10 text-error")}>
                                    {isPositive ? <TrendingUp size={16} /> : <TrendingUp className="rotate-180" size={16} />}
                                    {Math.abs(token.change24h)}% (24h)
                                </div>
                            </div>
                        </div>

                        {/* Big Chart (All Time Simulation) */}
                        <div className="aspect-video w-full glass-panel rounded-3xl border border-glass-border p-8 relative overflow-hidden group">
                            {/* ... content ... */}
                            <div className="absolute inset-0 bg-gradient-to-t from-primary/5 to-transparent pointer-events-none" />

                            {/* Simulated "All Time" Chart Line */}
                            <svg className="w-full h-full" preserveAspectRatio="none">
                                <polyline
                                    points="0,300 100,280 200,250 300,290 400,200 500,220 600,150 700,180 800,100 900,120 1000,50"
                                    fill="none"
                                    stroke={isPositive ? "#0aff68" : "#ff0055"}
                                    strokeWidth="4"
                                    vectorEffect="non-scaling-stroke"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>

                            {/* Chart Controls (Mock) */}
                            <div className="absolute bottom-6 right-6 flex gap-2">
                                {["1H", "1D", "1W", "1M", "1Y", "ALL"].map(time => (
                                    <button key={time} className={cn("px-3 py-1 rounded-lg text-xs font-bold transition-colors", time === "ALL" ? "bg-white text-black" : "bg-black/40 text-muted hover:text-white")}>
                                        {time}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* About Section */}
                        <div className="space-y-4">
                            <h3 className="text-2xl font-bold text-white">{t('about')} {token.name}</h3>
                            <p className="text-muted leading-relaxed">
                                {token.name} is a decentralized digital asset based on the {token.symbol} blockchain protocol.
                                It enables peer-to-peer transfers without a central authority.
                                Ranked among the top assets by market capitalization, it is widely used for trading, staking, and payments on the Flux Network.
                                <br /><br />
                                This asset has shown distinct volatility patterns in the last 24 hours driven by global macro-economic factors.
                            </p>
                        </div>
                    </div>

                    {/* Right Column: Stats & Action */}
                    <div className="w-full lg:w-96 space-y-6">

                        {/* Buy Card */}
                        <div className="glass-panel p-6 rounded-3xl border border-glass-border space-y-6">
                            <div className="text-center">
                                <div className="text-muted text-sm mb-1">Current Balance</div>
                                <div className="text-2xl font-bold text-white">$0.00</div>
                            </div>

                            <button onClick={openWalletModal} className="w-full py-4 rounded-xl bg-primary text-black font-bold text-lg hover:scale-[1.02] transition-transform shadow-[0_0_20px_rgba(0,255,100,0.3)] flex items-center justify-center gap-2">
                                <CreditCard size={20} />
                                {tCommon('buy')} {token.symbol}
                            </button>

                            <div className="grid grid-cols-2 gap-4">
                                <button className="py-3 rounded-xl bg-white/5 hover:bg-white/10 text-white font-bold transition-colors">Sell</button>
                                <button className="py-3 rounded-xl bg-white/5 hover:bg-white/10 text-white font-bold transition-colors">Swap</button>
                            </div>
                        </div>

                        {/* Market Stats */}
                        <div className="glass-panel p-6 rounded-3xl border border-glass-border space-y-4">
                            <h3 className="font-bold text-white mb-2">{t('marketStats')}</h3>

                            <StatRow label="Market Cap" value={token.marketCap} />
                            <StatRow label="Volume (24h)" value={token.volume24h} />
                            <StatRow label="Circulating Supply" value="19.5M" />
                            <StatRow label="All Time High" value="$73,000" />
                            <StatRow label="Popularity" value="#1" />
                        </div>

                        {/* Official Links */}
                        <div className="glass-panel p-6 rounded-3xl border border-glass-border space-y-4">
                            <h3 className="font-bold text-white mb-2">{t('officialLinks')}</h3>

                            <LinkRow icon={Globe} label={t('website')} value="official.org" />
                            <LinkRow icon={FileText} label={t('whitepaper')} value="Read Doc" />
                            <LinkRow icon={Twitter} label={t('community')} value="Twitter" />
                            <LinkRow icon={Copy} label={t('contract')} value="0x...4a2b" />
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}

const StatRow = ({ label, value }: { label: string, value: string }) => (
    <div className="flex justify-between items-center py-2 border-b border-white/5 last:border-0">
        <span className="text-muted text-sm">{label}</span>
        <span className="font-bold text-white">{value}</span>
    </div>
)

const LinkRow = ({ icon: Icon, label, value }: any) => (
    <div className="flex justify-between items-center py-2 group cursor-pointer">
        <div className="flex items-center gap-3 text-muted group-hover:text-white transition-colors">
            <Icon size={16} />
            <span className="text-sm">{label}</span>
        </div>
        <span className="text-sm text-primary font-bold">{value}</span>
    </div>
)
