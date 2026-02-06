"use client";

import { motion } from "framer-motion";
import { TrendingUp, Megaphone, Target, ArrowRight } from "lucide-react";

export default function PromotePage() {
    return (
        <div className="min-h-screen pt-32 pb-20 px-6">
            <div className="container mx-auto max-w-5xl">
                <div className="text-center mb-16">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-5xl font-black text-white mb-6"
                    >
                        Boost Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Visibility</span>
                    </motion.h1>
                    <p className="text-xl text-muted max-w-2xl mx-auto">
                        Get your token in front of thousands of active traders. Choose the package that fits your goals.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
                    {/* Package 1 */}
                    <motion.div whileHover={{ y: -5 }} className="glass-panel p-8 rounded-3xl border border-white/5 flex flex-col">
                        <div className="text-primary font-bold mb-2">Starter</div>
                        <h3 className="text-3xl font-black text-white mb-6">1 SOL</h3>
                        <ul className="space-y-4 mb-8 flex-1">
                            <li className="flex items-center gap-2 text-sm text-gray-300"><Target size={16} className="text-primary" /> 1 Day Homepage Feature</li>
                            <li className="flex items-center gap-2 text-sm text-gray-300"><Target size={16} className="text-primary" /> "New" Badge</li>
                        </ul>
                        <button className="w-full py-3 bg-white/10 hover:bg-white/20 text-white font-bold rounded-xl transition-colors">Select Plan</button>
                    </motion.div>

                    {/* Package 2 (Best Value) */}
                    <motion.div whileHover={{ y: -5 }} className="glass-panel p-8 rounded-3xl border border-primary relative flex flex-col transform scale-105 shadow-2xl shadow-primary/20">
                        <div className="absolute top-0 right-0 bg-primary text-black text-xs font-bold px-3 py-1 rounded-bl-xl">POPULAR</div>
                        <div className="text-primary font-bold mb-2">Growth</div>
                        <h3 className="text-3xl font-black text-white mb-6">5 SOL</h3>
                        <ul className="space-y-4 mb-8 flex-1">
                            <li className="flex items-center gap-2 text-sm text-gray-300"><Target size={16} className="text-primary" /> 3 Days Homepage Feature</li>
                            <li className="flex items-center gap-2 text-sm text-gray-300"><Target size={16} className="text-primary" /> Social Media Shoutout</li>
                            <li className="flex items-center gap-2 text-sm text-gray-300"><Target size={16} className="text-primary" /> Top of "Trending" List</li>
                        </ul>
                        <button className="w-full py-3 bg-primary text-black font-bold rounded-xl hover:opacity-90 transition-opacity">Select Plan</button>
                    </motion.div>

                    {/* Package 3 */}
                    <motion.div whileHover={{ y: -5 }} className="glass-panel p-8 rounded-3xl border border-white/5 flex flex-col">
                        <div className="text-primary font-bold mb-2">Enterprise</div>
                        <h3 className="text-3xl font-black text-white mb-6">20 SOL</h3>
                        <ul className="space-y-4 mb-8 flex-1">
                            <li className="flex items-center gap-2 text-sm text-gray-300"><Target size={16} className="text-primary" /> 1 Week Homepage Feature</li>
                            <li className="flex items-center gap-2 text-sm text-gray-300"><Target size={16} className="text-primary" /> Dedicated Email Blast</li>
                            <li className="flex items-center gap-2 text-sm text-gray-300"><Target size={16} className="text-primary" /> Partner Verification Mark</li>
                        </ul>
                        <button className="w-full py-3 bg-white/10 hover:bg-white/20 text-white font-bold rounded-xl transition-colors">Contact Us</button>
                    </motion.div>
                </div>

                <div className="bg-white/5 rounded-3xl p-10 text-center">
                    <Megaphone className="w-12 h-12 text-secondary mx-auto mb-6" />
                    <h2 className="text-3xl font-bold text-white mb-4">Why Advertise with Flux?</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
                        <div>
                            <div className="text-4xl font-black text-white mb-2">50k+</div>
                            <div className="text-muted">Daily Active Users</div>
                        </div>
                        <div>
                            <div className="text-4xl font-black text-white mb-2">$2M+</div>
                            <div className="text-muted">Daily Volume</div>
                        </div>
                        <div>
                            <div className="text-4xl font-black text-white mb-2">High</div>
                            <div className="text-muted">Conversion Rate</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
