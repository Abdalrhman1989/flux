import { Zap, Coins, Users, Rocket } from "lucide-react";
import { Link } from "@/navigation";

export function CreatorShowcase() {
    return (
        <section className="py-24 relative overflow-hidden">
            {/* Ambient Background */}
            <div className="absolute top-0 right-0 w-1/2 h-full bg-primary/5 blur-[120px] -z-10" />
            <div className="absolute bottom-0 left-0 w-1/2 h-full bg-secondary/5 blur-[120px] -z-10" />

            <div className="container mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
                        Empowering <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Everyone</span>
                    </h2>
                    <p className="text-xl text-muted max-w-2xl mx-auto">
                        Whether you are a meme lord, a community leader, or a developer, Flux is your launchpad.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Card 1: The Memelord */}
                    <div className="glass-panel p-8 rounded-3xl relative group hover:-translate-y-2 transition-transform duration-300">
                        <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform">
                            <Zap size={32} />
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-4">Meme Tokens</h3>
                        <p className="text-muted leading-relaxed mb-6">
                            Capture the zeitgeist. Launch a token for the latest fast-moving trend.
                            Instant trading, zero liquidity setup required.
                        </p>
                        <Link href="/create" className="text-primary font-bold flex items-center gap-2 group-hover:gap-4 transition-all">
                            Create Meme <Rocket size={16} />
                        </Link>
                    </div>

                    {/* Card 2: The Community Leader */}
                    <div className="glass-panel p-8 rounded-3xl relative group hover:-translate-y-2 transition-transform duration-300 border-secondary/20">
                        <div className="absolute inset-0 bg-gradient-to-b from-secondary/5 to-transparent rounded-3xl -z-10" />
                        <div className="w-16 h-16 rounded-2xl bg-secondary/10 flex items-center justify-center text-secondary mb-6 group-hover:scale-110 transition-transform">
                            <Users size={32} />
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-4">Social Tokens</h3>
                        <p className="text-muted leading-relaxed mb-6">
                            Tokenize your reputation. Give your followers a stake in your success.
                            Perfect for creators, influencers, and DAOs.
                        </p>
                        <Link href="/create" className="text-secondary font-bold flex items-center gap-2 group-hover:gap-4 transition-all">
                            Launch Social Token <Rocket size={16} />
                        </Link>
                    </div>

                    {/* Card 3: The Builder */}
                    <div className="glass-panel p-8 rounded-3xl relative group hover:-translate-y-2 transition-transform duration-300">
                        <div className="w-16 h-16 rounded-2xl bg-accent/10 flex items-center justify-center text-accent mb-6 group-hover:scale-110 transition-transform">
                            <Coins size={32} />
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-4">Utility Coins</h3>
                        <p className="text-muted leading-relaxed mb-6">
                            Build the next big dApp ecosystem. Use Flux as your liquidity layer
                            so you can focus on building the product, not the market.
                        </p>
                        <Link href="/create" className="text-accent font-bold flex items-center gap-2 group-hover:gap-4 transition-all">
                            Deploy Utility <Rocket size={16} />
                        </Link>
                    </div>
                </div>

                {/* FAQ / Education Mini-Section */}
                <div className="mt-24 glass-panel p-10 rounded-3xl border border-white/5">
                    <h3 className="text-2xl font-bold text-white mb-8 text-center">Frequently Asked Questions</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        <div>
                            <h4 className="font-bold text-white text-lg mb-2">What's the difference between a Coin and a Token?</h4>
                            <p className="text-muted text-sm">
                                Technically, they are both assets on the blockchain. A "Coin" usually refers to the native currency of a blockchain (like SOL),
                                while a "Token" is built on top of it (like what you create here). On Flux, we make creating Tokens as easy as posting a tweet.
                            </p>
                        </div>
                        <div>
                            <h4 className="font-bold text-white text-lg mb-2">Do I need a wallet?</h4>
                            <p className="text-muted text-sm">
                                Yes! Your wallet (like Phantom) is your user profile. It holds your funds and the tokens you create.
                                It's your passport to the entire Web3 ecosystem.
                            </p>
                        </div>
                        <div>
                            <h4 className="font-bold text-white text-lg mb-2">How much does it cost?</h4>
                            <p className="text-muted text-sm">
                                Creating a token on Flux costs less than $0.01 in network fees. We take a small fee only when people trade your token.
                            </p>
                        </div>
                        <div>
                            <h4 className="font-bold text-white text-lg mb-2">Is it safe?</h4>
                            <p className="text-muted text-sm">
                                All contracts are audited and run on the Solana blockchain. Liquidity is automatically locked to prevent "rug pulls" (scams).
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
