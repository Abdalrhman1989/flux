"use client";

import { createContext, useContext, useState, ReactNode } from "react";

interface WalletModalContextType {
    isOpen: boolean;
    openWalletModal: () => void;
    closeWalletModal: () => void;
    status: 'idle' | 'connecting' | 'connected';
    activeWallet: string | null;
    connectWallet: (wallet: string) => void;
}

const WalletModalContext = createContext<WalletModalContextType | undefined>(undefined);

export function WalletModalProvider({ children }: { children: ReactNode }) {
    const [isOpen, setIsOpen] = useState(false);
    const [status, setStatus] = useState<'idle' | 'connecting' | 'connected'>('idle');
    const [activeWallet, setActiveWallet] = useState<string | null>(null);

    const openWalletModal = () => setIsOpen(true);
    const closeWalletModal = () => setIsOpen(false);

    const connectWallet = (wallet: string) => {
        setStatus('connecting');
        setTimeout(() => {
            setStatus('connected');
            setActiveWallet(wallet);
            setIsOpen(false);
        }, 2000);
    };

    return (
        <WalletModalContext.Provider
            value={{
                isOpen,
                openWalletModal,
                closeWalletModal,
                status,
                activeWallet,
                connectWallet
            }}
        >
            {children}
        </WalletModalContext.Provider>
    );
}

export const useWalletModal = () => {
    const context = useContext(WalletModalContext);
    if (!context) {
        throw new Error("useWalletModal must be used within a WalletModalProvider");
    }
    return context;
};
