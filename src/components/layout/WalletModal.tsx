"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Loader2 } from "lucide-react";
import { useWalletModal } from "@/context/WalletModalContext";

export function WalletModal() {
    const { isOpen, closeWalletModal, status, connectWallet } = useWalletModal();

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    <motion.div
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        onClick={closeWalletModal}
                        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                    />

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }}
                        className="relative w-full max-w-md bg-surface border border-glass-border rounded-3xl p-6 shadow-2xl"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-xl font-bold text-white">Connect Wallet</h3>
                            <button onClick={closeWalletModal}><X className="text-muted hover:text-white" /></button>
                        </div>

                        {status === 'connecting' ? (
                            <div className="py-12 flex flex-col items-center justify-center text-center">
                                <Loader2 className="w-12 h-12 text-primary animate-spin mb-4" />
                                <div className="text-lg font-bold">Connecting...</div>
                                <p className="text-muted text-sm">Please approve the request in your wallet.</p>
                            </div>
                        ) : (
                            <div className="space-y-3">
                                <WalletOption name="MetaMask" icon="🦊" onClick={() => connectWallet("MetaMask")} />
                                <WalletOption name="Phantom" icon="👻" onClick={() => connectWallet("Phantom")} />
                                <WalletOption name="WalletConnect" icon="📡" onClick={() => connectWallet("WalletConnect")} />
                                <WalletOption name="Flux Pass (Email)" icon="📧" onClick={() => connectWallet("Email")} />
                            </div>
                        )}
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}

function WalletOption({ name, icon, onClick }: any) {
    return (
        <button
            onClick={onClick}
            className="w-full flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 hover:border-primary/50 transition-all group"
        >
            <div className="flex items-center gap-3">
                <span className="text-2xl">{icon}</span>
                <span className="font-bold text-white">{name}</span>
            </div>
            <div className="w-2 h-2 rounded-full bg-white/20 group-hover:bg-primary transition-colors" />
        </button>
    )
}
