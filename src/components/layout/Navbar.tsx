"use client";

import { Link, usePathname, useRouter } from "@/navigation";
import { cn } from "@/lib/utils";
import { Menu, X, Rocket, Globe } from "lucide-react";
import { useState, useTransition } from "react";
import { GlobalSearch } from "@/components/layout/GlobalSearch";
import { WalletConnect } from "@/components/layout/WalletConnect";
import { useLocale, useTranslations } from "next-intl";

export function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const t = useTranslations('Navbar');
    const locale = useLocale();
    const router = useRouter();
    const pathname = usePathname();
    const [isPending, startTransition] = useTransition();

    const switchLocale = (newLocale: string) => {
        startTransition(() => {
            router.replace(pathname, { locale: newLocale });
        });
    };

    const NavLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
        <Link
            href={href}
            className="text-sm font-medium text-muted hover:text-primary transition-colors"
        >
            {children}
        </Link>
    );

    return (
        <header className="fixed top-0 left-0 w-full z-50 h-20 glass bg-[rgba(3,0,20,0.8)]">
            <div className="container mx-auto h-full flex items-center justify-between px-6">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2 group">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-primary to-secondary flex items-center justify-center text-black font-bold text-xs group-hover:scale-110 transition-transform">
                        ▲
                    </div>
                    <span className="text-xl font-bold tracking-tighter text-white">FLUX</span>
                </Link>

                {/* Desktop Nav */}
                <nav className="hidden md:flex items-center gap-8">
                    <NavLink href="/">{t('market')}</NavLink>
                    <NavLink href="/create">Create</NavLink>
                    <NavLink href="/play">{t('arcade')}</NavLink>

                    {/* Community Dropdown Group to save space */}
                    <div className="relative group h-full flex items-center">
                        <button className="text-sm font-medium text-muted hover:text-primary transition-colors flex items-center gap-1">
                            Community
                            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chevron-down group-hover:rotate-180 transition-transform"><path d="m6 9 6 6 6-6" /></svg>
                        </button>
                        <div className="absolute top-full left-0 mt-2 w-48 bg-[#0A0B14] border border-white/10 rounded-xl p-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all transform translate-y-2 group-hover:translate-y-0 shadow-xl flex flex-col gap-1">
                            <Link href="/promote" className="block px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors">
                                Promote Coin
                            </Link>
                            <Link href="/learn" className="block px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors">
                                Flux Academy
                            </Link>
                            <Link href="/leaderboard" className="block px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors">
                                Leaderboard
                            </Link>
                            <Link href="/manifesto" className="block px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors">
                                Manifesto
                            </Link>
                        </div>
                    </div>

                    <NavLink href="/nft">Game NFTs</NavLink>
                </nav>

                {/* Actions */}
                <div className="hidden md:flex items-center gap-4">
                    <GlobalSearch />
                    <button
                        onClick={() => switchLocale(locale === 'en' ? 'ar' : 'en')}
                        className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-muted hover:text-white transition-colors"
                    >
                        {locale === 'en' ? 'AR' : 'EN'}
                    </button>
                    <Link href="/create" className="hidden lg:flex items-center gap-2 px-4 py-2 bg-primary/10 hover:bg-primary/20 text-primary rounded-full transition-colors border border-primary/20">
                        <Rocket size={16} />
                        <span className="font-bold text-sm">Launch</span>
                    </Link>
                    <Link href="/profile" className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-muted hover:text-white transition-colors" title="My Profile">
                        <div className="w-5 h-5 rounded-full bg-gradient-to-tr from-accent to-primary"></div>
                    </Link>
                    <WalletConnect />
                </div>

                {/* Mobile Toggle */}
                <button className="md:hidden text-white" onClick={() => setIsOpen(!isOpen)}>
                    {isOpen ? <X /> : <Menu />}
                </button>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden absolute top-20 left-0 w-full bg-surface border-b border-glass-border p-6 flex flex-col gap-4 animate-in slide-in-from-top-5">
                    <NavLink href="/">{t('market')}</NavLink>
                    <NavLink href="/create">Create Token</NavLink>
                    <NavLink href="/play">{t('arcade')}</NavLink>
                    <NavLink href="/leaderboard">Leaderboard</NavLink>
                    <button
                        onClick={() => switchLocale(locale === 'en' ? 'ar' : 'en')}
                        className="flex items-center gap-2 text-muted"
                    >
                        <Globe size={16} />
                        {locale === 'en' ? 'Switch to Arabic' : 'Switch to English'}
                    </button>
                    <button className="w-full py-3 rounded-xl bg-primary text-black font-bold">
                        Launch App
                    </button>
                </div>
            )}
        </header>
    );
}
