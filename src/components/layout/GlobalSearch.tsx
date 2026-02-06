"use client";

import { useState, useEffect } from "react";
import { Search, X, TrendingUp, Command } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const MOCK_COINS = [
    { code: "BTC", name: "Bitcoin", price: "$65,430" },
    { code: "ETH", name: "Ethereum", price: "$3,450" },
    { code: "SOL", name: "Solana", price: "$145" },
    { code: "DOGE", name: "Dogecoin", price: "$0.12" },
    { code: "PEPE", name: "Pepe", price: "$0.000012" },
    { code: "FLUX", name: "Flux Protocol", price: "$1.24" },
    { code: "USDT", name: "Tether", price: "$1.00" },
    { code: "BNB", name: "Binance Coin", price: "$590" },
    { code: "XRP", name: "Ripple", price: "$0.62" },
    { code: "ADA", name: "Cardano", price: "$0.45" },
];

export function GlobalSearch() {
    const [isOpen, setIsOpen] = useState(false);
    const [query, setQuery] = useState("");

    useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
                e.preventDefault();
                setIsOpen((open) => !open);
            }
        };
        document.addEventListener("keydown", down);
        return () => document.removeEventListener("keydown", down);
    }, []);

    const filtered = MOCK_COINS.filter(c =>
        c.code.toLowerCase().includes(query.toLowerCase()) ||
        c.name.toLowerCase().includes(query.toLowerCase())
    );

    return (
        <>
            <button
                onClick={() => setIsOpen(true)}
                className="hidden md:flex items-center gap-3 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-muted hover:border-primary/50 hover:text-white transition-all w-64"
            >
                <Search className="w-4 h-4" />
                <span className="text-sm">Search assets...</span>
                <kbd className="ml-auto pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded bg-white/10 px-1.5 font-mono text-[10px] text-muted">
                    <span className="text-xs">⌘</span>K
                </kbd>
            </button>

            <AnimatePresence>
                {isOpen && (
                    <div className="fixed inset-0 z-[100] flex items-start justify-center pt-32 px-4">
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsOpen(false)}
                            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                        />

                        {/* Search Modal */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: -20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: -20 }}
                            className="relative w-full max-w-2xl bg-surface border border-glass-border rounded-2xl shadow-2xl overflow-hidden"
                        >
                            <div className="flex items-center gap-4 p-4 border-b border-white/5">
                                <Search className="w-5 h-5 text-muted" />
                                <input
                                    autoFocus
                                    className="flex-1 bg-transparent border-none outline-none text-lg placeholder:text-muted"
                                    placeholder="Search coins, agents, or pools..."
                                    value={query}
                                    onChange={(e) => setQuery(e.target.value)}
                                />
                                <button onClick={() => setIsOpen(false)} className="p-1 hover:bg-white/10 rounded-lg transition-colors">
                                    <X className="w-5 h-5 text-muted" />
                                </button>
                            </div>

                            <div className="max-h-[60vh] overflow-y-auto p-2">
                                {filtered.length === 0 ? (
                                    <div className="p-12 text-center text-muted">
                                        No results found.
                                    </div>
                                ) : (
                                    <div className="space-y-1">
                                        {filtered.map((coin) => (
                                            <div
                                                key={coin.code}
                                                className="flex items-center justify-between p-3 rounded-xl hover:bg-white/5 cursor-pointer group transition-colors"
                                            >
                                                <div className="flex items-center gap-3">
                                                    <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center font-bold text-xs">
                                                        {coin.code[0]}
                                                    </div>
                                                    <div>
                                                        <div className="font-bold text-white group-hover:text-primary transition-colors">{coin.name}</div>
                                                        <div className="text-xs text-muted">{coin.code}</div>
                                                    </div>
                                                </div>
                                                <div className="text-right">
                                                    <div className="font-mono text-white">{coin.price}</div>
                                                    <div className="text-[10px] text-accent flex items-center gap-1 justify-end">
                                                        <TrendingUp className="w-3 h-3" /> 2.4%
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>

                            <div className="p-2 border-t border-white/5 bg-black/20 text-xs text-muted text-center">
                                Press <kbd className="font-sans">Esc</kbd> to close
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </>
    );
}
