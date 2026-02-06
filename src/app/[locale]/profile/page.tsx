"use client";

import { useWallet } from "@solana/wallet-adapter-react";
import { useConnection } from "@solana/wallet-adapter-react";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Wallet, Copy, ExternalLink, Coins, Layers, ArrowUpRight, Rocket } from "lucide-react";

// Mock Data for "My Tokens" until we interpret on-chain data fully
const MOCK_CREATED_TOKENS = [
    { name: "Flux Coin", ticker: "FLUX", balance: "1,000,000,000" },
];

export default function ProfilePage() {
    const { publicKey, connected } = useWallet();
    const { connection } = useConnection();
    const [balance, setBalance] = useState<number | null>(null);

    useEffect(() => {
        if (publicKey && connection) {
            connection.getBalance(publicKey).then((bal) => {
                setBalance(bal / LAMPORTS_PER_SOL);
            });
        }
    }, [publicKey, connection]);

    if (!connected || !publicKey) {
        return (
            <div className="min-h-screen pt-32 flex flex-col items-center justify-center text-center px-4">
                <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mb-6 animate-pulse">
                    <Wallet className="w-10 h-10 text-muted" />
                </div>
                <h1 className="text-3xl font-bold text-white mb-4">Connect Wallet</h1>
                <p className="text-muted max-w-md mb-8">
                    Connect your Solana wallet to view your profile, assets, and token creations.
                </p>
                {/* WalletConnect button is already in Navbar, but maybe user needs a hint */}
            </div>
        );
    }

    return (
        <div className="min-h-screen pt-32 pb-20 px-6">
            <div className="container mx-auto max-w-5xl">

                {/* Header Profile Card */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="glass-panel p-8 rounded-3xl mb-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
                >
                    <div className="flex items-center gap-6">
                        <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-primary to-secondary p-[2px]">
                            <div className="w-full h-full bg-black rounded-2xl flex items-center justify-center">
                                <span className="text-4xl">👾</span>
                            </div>
                        </div>
                        <div>
                            <div className="flex items-center gap-3 mb-2">
                                <h1 className="text-2xl font-bold text-white">
                                    {publicKey.toBase58().slice(0, 4)}...{publicKey.toBase58().slice(-4)}
                                </h1>
                                <button
                                    onClick={() => navigator.clipboard.writeText(publicKey.toBase58())}
                                    className="p-2 hover:bg-white/10 rounded-lg transition-colors text-muted hover:text-white"
                                >
                                    <Copy size={16} />
                                </button>
                                <a
                                    href={`https://solscan.io/account/${publicKey.toBase58()}?cluster=devnet`}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="p-2 hover:bg-white/10 rounded-lg transition-colors text-muted hover:text-white"
                                >
                                    <ExternalLink size={16} />
                                </a>
                            </div>
                            <div className="flex items-center gap-4 text-sm text-muted">
                                <span className="px-3 py-1 rounded-full bg-green-500/10 text-green-400 border border-green-500/20">
                                    Verified User
                                </span>
                                <span>Joined Feb 2026</span>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white/5 px-8 py-4 rounded-2xl border border-white/5 text-center md:text-right min-w-[200px]">
                        <div className="text-muted text-sm mb-1">Total Balance</div>
                        <div className="text-3xl font-black text-white">
                            {balance !== null ? balance.toFixed(4) : "..."} <span className="text-primary text-xl">SOL</span>
                        </div>
                        <div className="text-xs text-muted mt-1">≈ ${(balance || 0 * 145).toFixed(2)} USD</div>
                    </div>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Left Sidebar */}
                    <div className="md:col-span-1 space-y-6">
                        <div className="glass-panel p-6 rounded-3xl">
                            <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                                <Layers size={20} className="text-primary" />
                                Portfolio
                            </h3>
                            <div className="space-y-4">
                                <div className="flex items-center justify-between p-3 rounded-xl bg-white/5">
                                    <span className="text-muted">Tokens Held</span>
                                    <span className="text-white font-bold">1</span>
                                </div>
                                <div className="flex items-center justify-between p-3 rounded-xl bg-white/5">
                                    <span className="text-muted">Total Value</span>
                                    <span className="text-white font-bold">$0.00</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="md:col-span-2 space-y-8">

                        {/* Created Tokens Section */}
                        <div>
                            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                                <Rocket className="text-secondary" />
                                Launched Tokens
                            </h2>

                            <div className="grid grid-cols-1 gap-4">
                                {MOCK_CREATED_TOKENS.map((token, i) => (
                                    <motion.div
                                        key={i}
                                        whileHover={{ scale: 1.02 }}
                                        className="glass-panel p-6 rounded-2xl flex items-center justify-between group cursor-pointer"
                                    >
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 rounded-full bg-secondary/20 flex items-center justify-center text-secondary font-bold">
                                                {token.ticker[0]}
                                            </div>
                                            <div>
                                                <div className="font-bold text-white text-lg">{token.name}</div>
                                                <div className="text-muted text-sm">${token.ticker} • Devnet</div>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <div className="text-white font-bold">{token.balance}</div>
                                            <div className="text-muted text-xs">Held by You</div>
                                        </div>
                                    </motion.div>
                                ))}

                                <motion.a
                                    href="/create"
                                    whileHover={{ scale: 1.02 }}
                                    className="p-6 rounded-2xl border-2 border-dashed border-white/10 flex flex-col items-center justify-center text-muted hover:text-white hover:border-white/30 transition-all gap-3 min-h-[120px]"
                                >
                                    <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center">
                                        <ArrowUpRight />
                                    </div>
                                    <span className="font-bold">Launch New Token</span>
                                </motion.a>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}
