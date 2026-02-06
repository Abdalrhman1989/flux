"use client";

import { MessageCircle, X, Send, Bot } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function AIAssistant() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<{ role: 'user' | 'bot', text: string }[]>([
        { role: 'bot', text: "Hello! I am your Flux AI assistant. How can I help you today?" }
    ]);
    const [input, setInput] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isTyping]);

    const handleSend = () => {
        if (!input.trim()) return;

        // Add user message
        const userMsg = input;
        setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
        setInput("");
        setIsTyping(true);

        // Simulate AI Response with extensive knowledge base
        setTimeout(() => {
            const lowerMsg = userMsg.toLowerCase();
            let botResponse = "";

            // --- LINKS & NAVIGATION ---
            if (lowerMsg.includes('link') || lowerMsg.includes('url') || lowerMsg.includes('go to') || lowerMsg.includes('where')) {
                if (lowerMsg.includes('create') || lowerMsg.includes('launch')) botResponse = "Here is the link to launch your token: [Create Page](/create)";
                else if (lowerMsg.includes('promote') || lowerMsg.includes('ads')) botResponse = "Boost your visibility here: [Promote Page](/promote)";
                else if (lowerMsg.includes('learn') || lowerMsg.includes('academy')) botResponse = "Start learning and earning: [Flux Academy](/learn)";
                else if (lowerMsg.includes('legal') || lowerMsg.includes('terms')) botResponse = "View our legal documents in the footer, or go to [Terms](/legal/terms).";
                else botResponse = "I can take you anywhere. Try asking for the 'Create page' or 'Academy'.";
            }

            // --- TRADING & MARKETS ---
            else if (lowerMsg.includes('buy') || lowerMsg.includes('sell') || lowerMsg.includes('trade') || lowerMsg.includes('swap')) {
                botResponse = "Trading on Flux is instant. Go to the [Market](/), click on any coin, and use the 'Trade' panel on the right. Slippage is auto-adjusted for fair execution.";
            }
            else if (lowerMsg.includes('bonding') || lowerMsg.includes('curve')) {
                botResponse = "A Bonding Curve is a mathematical price model. As people buy, the price goes up. When the market cap hits ~$69k, the curve completes and liquidity is permanently locked on Raydium. No rug pulls possible.";
            }

            // --- CREATION & LAUNCH ---
            else if (lowerMsg.includes('create') || lowerMsg.includes('launch') || lowerMsg.includes('deploy') || lowerMsg.includes('mint')) {
                botResponse = "To launch a token:\n1. Click [Create](/create).\n2. Upload a logo, pick a Ticker (e.g. $FLUX).\n3. Pay ~0.02 SOL.\n\nYour token is instantly tradable. No code needed.";
            }

            // --- WALLET & TECH ---
            else if (lowerMsg.includes('wallet') || lowerMsg.includes('connect') || lowerMsg.includes('phantom') || lowerMsg.includes('metamask')) {
                botResponse = "We support all major Solana wallets: Phantom, Solflare, Coinbase Wallet, and Trust Wallet. Converting from MetaMask? We recommend installing the 'Solflare' extension for the best experience.";
            }
            else if (lowerMsg.includes('sol') || lowerMsg.includes('money') || lowerMsg.includes('fund')) {
                botResponse = "You need SOL (Solana) to pay for transaction fees. You can buy SOL on Coinbase or Binance and send it to your wallet address.";
            }

            // --- PROMOTION & REWARDS ---
            else if (lowerMsg.includes('promote') || lowerMsg.includes('ad') || lowerMsg.includes('marketing')) {
                botResponse = "Want to moon your coin? Use our [Promote](/promote) feature. \n• 1 SOL = 1 Day Feature\n• 5 SOL = 3 Days + Socials.\nIt's the best way to get eyes on your project.";
            }
            else if (lowerMsg.includes('win') || lowerMsg.includes('earn') || lowerMsg.includes('reward') || lowerMsg.includes('airdrop')) {
                botResponse = "Yes! You can allow win $FLUX by:\n1. Completing lessons in the [Academy](/learn).\n2. Placing top 3 in the weekly [Leaderboard](/leaderboard).\n3. Launching a high-volume token.";
            }

            // --- SUPPORT & SAFETY ---
            else if (lowerMsg.includes('safe') || lowerMsg.includes('legit') || lowerMsg.includes('scam') || lowerMsg.includes('hack')) {
                botResponse = "Flux is audited and secure. Liquidity is locked automatically, so developers cannot steal the money pool (rug pull). However, always protect your seed phrase and never click suspicious links.";
            }
            else if (lowerMsg.includes('contact') || lowerMsg.includes('human') || lowerMsg.includes('support')) {
                botResponse = "I can handle most requests! But if you need a human, join our [Discord Community](#) and open a ticket in #support.";
            }

            // --- GENERAL CHAT ---
            else if (lowerMsg.includes('hello') || lowerMsg.includes('hi') || lowerMsg.includes('hey')) {
                botResponse = "Hello! I am ready to help you trade, launch, and learn. What's on your mind?";
            }
            else if (lowerMsg.includes('flux')) {
                botResponse = "Flux is the world's first sentiment-based exchange. We combine meme culture with serious DeFi liquidity.";
            }
            else {
                // Fallback for unknown queries
                botResponse = "I understand you have a question. Could you clarify? I can explain: \n• Launching Tokens\n• Trading Rules\n• Promotion Costs\n• Wallet Setup\n• Winning Rewards";
            }

            setMessages(prev => [...prev, { role: 'bot', text: botResponse }]);
            setIsTyping(false);
        }, 1200);
    };

    return (
        <>
            {/* Trigger Button */}
            <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsOpen(true)}
                className="fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center text-black shadow-lg shadow-primary/25 z-50"
            >
                <Bot size={28} />
                {/* Online Indicator */}
                <div className="absolute top-0 right-0 w-4 h-4 bg-green-500 rounded-full border-2 border-black animate-pulse" />
            </motion.button>

            {/* Chat Window */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        className="fixed bottom-24 right-6 w-[350px] h-[500px] glass-panel rounded-2xl flex flex-col overflow-hidden z-50 border border-white/10 shadow-2xl"
                    >
                        {/* Header */}
                        <div className="bg-white/5 p-4 flex justify-between items-center border-b border-white/5">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-primary to-secondary flex items-center justify-center">
                                    <Bot size={18} className="text-black" />
                                </div>
                                <div>
                                    <div className="font-bold text-white text-sm">Flux AI Support</div>
                                    <div className="text-green-400 text-xs flex items-center gap-1">
                                        <div className="w-1.5 h-1.5 rounded-full bg-green-400" /> Online 24/7
                                    </div>
                                </div>
                            </div>
                            <button onClick={() => setIsOpen(false)} className="text-muted hover:text-white">
                                <X size={20} />
                            </button>
                        </div>

                        {/* Messages */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-4">
                            {messages.map((msg, i) => (
                                <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                    <div className={`max-w-[80%] p-3 rounded-2xl text-sm whitespace-pre-line ${msg.role === 'user'
                                            ? 'bg-primary text-black rounded-tr-none'
                                            : 'bg-white/10 text-white rounded-tl-none'
                                        }`}>
                                        {msg.text.split(/(\[.*?\]\(.*?\))/g).map((part, idx) => {
                                            const match = part.match(/\[(.*?)\]\((.*?)\)/);
                                            if (match) {
                                                return <a key={idx} href={match[2]} className="underline font-bold hover:text-accent" onClick={(e) => {
                                                    // Handle internal links without refresh if possible, but basic href is safest for now
                                                }}>{match[1]}</a>;
                                            }
                                            return part;
                                        })}
                                    </div>
                                </div>
                            ))}
                            {isTyping && (
                                <div className="flex justify-start">
                                    <div className="bg-white/10 text-white p-3 rounded-2xl rounded-tl-none flex gap-1 items-center">
                                        <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                                        <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                                        <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"></div>
                                    </div>
                                </div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input */}
                        <div className="p-4 border-t border-white/5 bg-black/20">
                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                                    placeholder="Ask anything..."
                                    className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-primary placeholder:text-muted"
                                />
                                <button
                                    onClick={handleSend}
                                    className="p-2 bg-white/10 hover:bg-primary hover:text-black rounded-xl text-white transition-colors"
                                >
                                    <Send size={18} />
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
