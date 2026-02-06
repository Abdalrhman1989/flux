import { SolanaProvider } from "@/components/providers/SolanaProvider";
import { WalletModalProvider as CustomWalletModal } from "@/context/WalletModalContext"; // Renaming to avoid conflict if necessary, or just keep old one for context
// Actually, we are replacing the old wallet system with the real one.

export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <SolanaProvider>
            {children}
        </SolanaProvider>
    );
}
