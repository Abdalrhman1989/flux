"use client";

import { useWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { Wallet } from "lucide-react";

export function WalletConnect() {
    const { connected, publicKey } = useWallet();

    if (connected && publicKey) {
        return (
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 text-accent font-bold text-sm">
                <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                {publicKey.toBase58().slice(0, 4)}...{publicKey.toBase58().slice(-4)}
            </div>
        );
    }

    return (
        <WalletMultiButton className="!bg-gradient-to-r !from-primary !to-secondary !text-black !font-bold !rounded-full !px-6 !py-2.5 hover:!scale-105 transition-transform !h-auto !text-sm" />
    );
}
