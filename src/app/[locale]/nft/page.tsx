"use client";

import { motion } from "framer-motion";
import { Link } from "@/navigation";
import { Gamepad2, Plus, ShoppingBag, Trophy, Flame } from "lucide-react";

export default function NFTHubPage() {
    return (
        <div className="min-h-screen pt-32 pb-20 px-6">
            <div className="container mx-auto max-w-6xl">

                {/* Hero Section */}
                <div className="text-center mb-16 relative">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-accent/20 blur-[100px] -z-10" />
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 text-accent border border-accent/20 mb-6"
                    >
                        <Gamepad2 size={16} /> Beta Access
                    </motion.div>
                    <h1 className="text-5xl md:text-7xl font-black text-white mb-6">
                        Flux <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">Legends</span>
                    </h1>
                    <p className="text-xl text-muted max-w-2xl mx-auto mb-8">
                        Mint, battle, and trade Game NFTs. Collect rare "Vibe Cards" to unlock zero-fee trading and XP boosts.
                    </p>
                    <div className="flex justify-center gap-4">
                        <Link href="/nft/create" className="px-8 py-4 bg-primary text-black font-bold rounded-xl hover:scale-105 transition-transform flex items-center gap-2">
                            <Plus size={20} /> Mint New NFT
                        </Link>
                        <Link href="/nft/market" className="px-8 py-4 bg-white/10 text-white font-bold rounded-xl hover:bg-white/20 transition-colors flex items-center gap-2">
                            <ShoppingBag size={20} /> Browse Market
                        </Link>
                    </div>
                </div>

                {/* Featured Section */}
                <div className="mb-20">
                    <div className="flex items-center gap-2 mb-8">
                        <Flame className="text-orange-500" />
                        <h2 className="text-2xl font-bold text-white">Trending Collections</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[1, 2, 3, 4].map((i) => (
                            <motion.div
                                key={i}
                                whileHover={{ y: -10 }}
                                className="glass-panel p-4 rounded-3xl group cursor-pointer"
                            >
                                <div className="aspect-square rounded-2xl bg-white/5 mb-4 overflow-hidden relative">
                                    {/* Placeholder Art */}
                                    <div className={`w-full h-full bg-gradient-to-br ${i === 1 ? 'from-purple-500 to-indigo-500' :
                                            i === 2 ? 'from-pink-500 to-rose-500' :
                                                i === 3 ? 'from-cyan-500 to-blue-500' : 'from-yellow-500 to-orange-500'
                                        } opacity-50 group-hover:scale-110 transition-transform duration-500`} />

                                    <div className="absolute top-2 right-2 px-2 py-1 bg-black/60 backdrop-blur rounded-lg text-xs font-bold text-white border border-white/10">
                                        #{1000 + i}
                                    </div>
                                </div>
                                <h3 className="text-lg font-bold text-white">Cyber Vibe #{i}</h3>
                                <div className="flex justify-between items-center mt-2">
                                    <span className="text-sm text-muted">Floor Price</span>
                                    <span className="font-bold text-accent">2.5 SOL</span>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Game Benefits */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="glass-panel p-8 rounded-3xl border border-white/5">
                        <Trophy className="w-10 h-10 text-yellow-400 mb-4" />
                        <h3 className="text-xl font-bold text-white mb-2">Play to Earn</h3>
                        <p className="text-muted text-sm">Use your NFTs in the Flux Arcade to earn bonus $FLUX tokens in weekly tournaments.</p>
                    </div>
                    <div className="glass-panel p-8 rounded-3xl border border-white/5">
                        <ShoppingBag className="w-10 h-10 text-blue-400 mb-4" />
                        <h3 className="text-xl font-bold text-white mb-2">Exclusive Merch</h3>
                        <p className="text-muted text-sm">Holders of "Genesis" NFTs get access to exclusive physical merchandise drops.</p>
                    </div>
                    <div className="glass-panel p-8 rounded-3xl border border-white/5">
                        <Gamepad2 className="w-10 h-10 text-green-400 mb-4" />
                        <h3 className="text-xl font-bold text-white mb-2">Game Access</h3>
                        <p className="text-muted text-sm">Your NFT is your ticket. Unlock special levels and beta features in the upcoming FluxVerse.</p>
                    </div>
                </div>

            </div>
        </div>
    );
}
