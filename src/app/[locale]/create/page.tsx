"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { Upload, X, Rocket, Sparkles, CheckCircle } from "lucide-react";
import { Link } from "@/navigation";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { createToken } from "@/lib/solana/token-utils";

export default function CreateTokenPage() {
    const t = useTranslations('Create');
    const [name, setName] = useState("");
    const [ticker, setTicker] = useState("");
    const [desc, setDesc] = useState("");
    const [image, setImage] = useState<string | null>(null);
    const [isLaunched, setIsLaunched] = useState(false);
    const [isLaunching, setIsLaunching] = useState(false);
    const { connection } = useConnection();
    const { publicKey, signTransaction } = useWallet();

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImage(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleLaunch = async () => {
        if (!name || !ticker || !desc) return;
        if (!publicKey || !signTransaction) {
            alert("Please connect your wallet first!");
            return;
        }
        setIsLaunching(true);

        try {
            // In a real production app, we would upload the image and metadata JSON to Arweave here.
            // For this demo, we use a placeholder URI as uploading needs a bundlr node.
            const placeholderUri = "https://raw.githubusercontent.com/solana-developers/program-examples/new-examples/tokens/tokens/.assets/spl-token.json";

            const result = await createToken(
                connection,
                publicKey,
                signTransaction,
                {
                    name,
                    symbol: ticker,
                    description: desc,
                    image: image || placeholderUri
                }
            );

            console.log("Token Minted:", result.mintAddress);
            console.log("Signature:", result.signature);

            setIsLaunching(false);
            setIsLaunched(true);
        } catch (error) {
            console.error("Minting failed:", error);
            alert("Minting failed! See console for details. Make sure to use Devnet.");
            setIsLaunching(false);
        }
    };

    if (isLaunched) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center p-6 relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('/hero-bg-dark.png')] opacity-20 bg-cover bg-center" />
                <div className="glass-panel p-12 rounded-3xl max-w-md w-full text-center relative z-10 border border-accent/20">
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="w-24 h-24 rounded-full bg-accent/20 flex items-center justify-center mx-auto mb-6 text-accent"
                    >
                        <CheckCircle size={48} />
                    </motion.div>
                    <h2 className="text-3xl font-bold text-white mb-2">{t('success.title')}</h2>
                    <p className="text-muted mb-8">{t('success.desc')}</p>

                    <div className="p-4 bg-white/5 rounded-2xl mb-8 flex items-center gap-4 text-left">
                        {image ? (
                            <img src={image} alt="Token" className="w-12 h-12 rounded-full object-cover" />
                        ) : (
                            <div className="w-12 h-12 rounded-full bg-primary/20" />
                        )}
                        <div>
                            <div className="font-bold text-white text-lg">{name}</div>
                            <div className="text-accent text-sm">${ticker}</div>
                        </div>
                    </div>

                    <Link href="/" className="w-full py-4 bg-primary text-black font-bold rounded-xl block hover:scale-105 transition-transform">
                        {t('success.view')}
                    </Link>
                </div>

                {/* Confetti-like particles */}
                {[...Array(20)].map((_, i) => (
                    <motion.div
                        key={i}
                        initial={{ y: "100vh", x: Math.random() * 100 - 50 + "vw" }}
                        animate={{ y: "-100vh" }}
                        transition={{ duration: Math.random() * 2 + 2, repeat: Infinity, ease: "linear" }}
                        className="absolute w-2 h-2 bg-accent rounded-full opacity-50"
                        style={{ left: `${Math.random() * 100}vw` }}
                    />
                ))}
            </div>
        );
    }

    return (
        <main className="min-h-screen bg-black pt-32 pb-20 px-6 relative overflow-x-hidden">
            {/* Background elements */}
            <div className="fixed top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#0F0B29] to-black -z-10" />

            <div className="container mx-auto max-w-6xl">
                <div className="text-center mb-16">
                    <h1 className="text-5xl md:text-6xl font-black text-white mb-6">
                        {t.rich('title', {
                            highlight: (chunks: any) => <span className="text-primary">{chunks}</span>
                        })}
                    </h1>
                    <p className="text-xl text-muted max-w-2xl mx-auto">
                        {t('subtitle')}
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                    {/* Form Section */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="glass-panel p-8 rounded-3xl border border-white/5 bg-[#0A0B14]/80"
                    >
                        <div className="space-y-6">
                            {/* Image Upload */}
                            <div>
                                <label className="block text-sm font-bold text-gray-400 mb-2">{t('form.image')}</label>
                                <div className="relative group">
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleImageUpload}
                                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                                    />
                                    <div className={`h-40 w-full rounded-2xl border-2 border-dashed flex flex-col items-center justify-center transition-colors ${image ? 'border-primary/50' : 'border-white/10 group-hover:border-white/20'}`}>
                                        {image ? (
                                            <div className="relative w-full h-full p-2">
                                                <img src={image} alt="Preview" className="w-full h-full object-contain rounded-xl" />
                                                <button
                                                    onClick={(e) => { e.preventDefault(); setImage(null); }}
                                                    className="absolute top-4 right-4 p-2 bg-black/50 rounded-full hover:bg-black/80 text-white z-20"
                                                >
                                                    <X size={16} />
                                                </button>
                                            </div>
                                        ) : (
                                            <>
                                                <Upload className="w-8 h-8 text-muted mb-3 group-hover:scale-110 transition-transform" />
                                                <span className="text-sm text-muted">{t('form.upload')}</span>
                                            </>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-bold text-gray-400 mb-2">{t('form.name')}</label>
                                    <input
                                        type="text"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        placeholder="e.g. Flux Coin"
                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-primary focus:outline-none transition-colors placeholder:text-white/20"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-gray-400 mb-2">{t('form.ticker')}</label>
                                    <input
                                        type="text"
                                        value={ticker}
                                        onChange={(e) => setTicker(e.target.value.toUpperCase())}
                                        placeholder="e.g. FLUX"
                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-primary focus:outline-none transition-colors placeholder:text-white/20"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-gray-400 mb-2">{t('form.description')}</label>
                                <textarea
                                    value={desc}
                                    onChange={(e) => setDesc(e.target.value)}
                                    rows={4}
                                    placeholder="Tell the world about your token..."
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-primary focus:outline-none transition-colors placeholder:text-white/20 resize-none"
                                />
                            </div>

                            <button
                                onClick={handleLaunch}
                                disabled={isLaunching || !name || !ticker || !desc}
                                className="w-full py-4 bg-gradient-to-r from-primary to-accent hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed text-black font-bold rounded-xl transition-all flex items-center justify-center gap-2 group"
                            >
                                {isLaunching ? (
                                    <>
                                        <Sparkles className="animate-spin" /> Launching...
                                    </>
                                ) : (
                                    <>
                                        {t('form.launch')} <Rocket className="group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform" />
                                    </>
                                )}
                            </button>
                        </div>
                    </motion.div>

                    {/* Preview Section */}
                    <div className="sticky top-24">
                        <div className="flex items-center gap-2 mb-4">
                            <h3 className="text-xl font-bold text-white">{t('preview')}</h3>
                            <div className="h-px flex-1 bg-white/10" />
                        </div>

                        <motion.div
                            layout
                            className="bg-[#0A0B14] border border-white/10 rounded-3xl overflow-hidden relative group max-w-sm mx-auto"
                        >
                            {/* Card Header/Banner */}
                            <div className="h-32 bg-white/5 relative">
                                {image && (
                                    <div className="absolute inset-0">
                                        <img src={image} className="w-full h-full object-cover opacity-50 blur-xl" />
                                    </div>
                                )}
                                <div className="absolute top-4 right-4 bg-black/40 backdrop-blur px-3 py-1 rounded-full border border-white/10 text-xs font-mono text-accent">
                                    Meme
                                </div>
                            </div>

                            {/* Card Body */}
                            <div className="p-6 relative">
                                <div className="w-20 h-20 rounded-2xl bg-black border-4 border-[#0A0B14] absolute -top-10 left-6 overflow-hidden">
                                    {image ? (
                                        <img src={image} className="w-full h-full object-cover" />
                                    ) : (
                                        <div className="w-full h-full bg-white/5 flex items-center justify-center">
                                            <Upload className="text-white/20" />
                                        </div>
                                    )}
                                </div>

                                <div className="mt-12">
                                    <div className="flex justify-between items-start mb-2">
                                        <div>
                                            <h3 className="text-2xl font-bold text-white leading-tight">{name || "Token Name"}</h3>
                                            <div className="text-primary font-bold">${ticker || "TICKER"}</div>
                                        </div>
                                        <div className="text-right">
                                            <div className="text-sm text-gray-400">Market Cap</div>
                                            <div className="text-green-400 font-mono font-bold">$0k</div>
                                        </div>
                                    </div>

                                    <p className="text-sm text-gray-400 line-clamp-3 mb-6">
                                        {desc || "Token description will appear here..."}
                                    </p>

                                    <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden mb-2">
                                        <div className="w-[1%] h-full bg-accent" />
                                    </div>
                                    <div className="flex justify-between text-xs text-gray-500">
                                        <span>Bonding Curve Progress</span>
                                        <span>0%</span>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </main>
    );
}
