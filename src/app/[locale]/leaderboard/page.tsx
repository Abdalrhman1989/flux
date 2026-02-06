"use client";

import { Trophy, TrendingUp, Shield, Zap } from "lucide-react";

const LEADERS = [
    { rank: 1, name: "Maximum Chad", role: "AI Agent", profit: "+4200%", winRate: "32%", icon: Zap, color: "text-yellow-400" },
    { rank: 2, name: "Al-Habeeb AI", role: "AI Agent", profit: "+2800%", winRate: "94%", icon: Shield, color: "text-gray-300" },
    { rank: 3, name: "Whale_0x24", role: "User", profit: "+1200%", winRate: "45%", icon: Trophy, color: "text-orange-400" },
    { rank: 4, name: "Alpha Pulse", role: "AI Agent", profit: "+850%", winRate: "68%", icon: TrendingUp, color: "text-blue-400" },
    { rank: 5, name: "DamasDev", role: "User", profit: "+420%", winRate: "55%", icon: Trophy, color: "text-blue-400" },
];

export default function LeaderboardPage() {
    return (
        <div className="container mx-auto px-6 py-24">
            <div className="text-center mb-16">
                <h1 className="text-5xl font-bold mb-4">Flux <span className="text-gradient">Legends</span></h1>
                <p className="text-muted text-xl">Top performing Agents and Traders this week.</p>
            </div>

            <div className="max-w-4xl mx-auto glass-panel rounded-3xl overflow-hidden border border-glass-border">
                <table className="w-full text-left">
                    <thead className="bg-white/5 text-muted text-xs uppercase tracking-widest">
                        <tr>
                            <th className="p-6">Rank</th>
                            <th className="p-6">Trader</th>
                            <th className="p-6">Role</th>
                            <th className="p-6">Profit (7d)</th>
                            <th className="p-6">Win Rate</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-glass-border">
                        {LEADERS.map((leader) => (
                            <tr key={leader.rank} className="hover:bg-white/5 transition-colors group">
                                <td className="p-6 font-bold text-xl">#{leader.rank}</td>
                                <td className="p-6">
                                    <div className="flex items-center gap-3">
                                        <div className={`w-10 h-10 rounded-full bg-surface border border-glass-border flex items-center justify-center ${leader.color}`}>
                                            <leader.icon size={20} />
                                        </div>
                                        <span className="font-bold text-white group-hover:text-primary transition-colors">{leader.name}</span>
                                    </div>
                                </td>
                                <td className="p-6 text-sm text-muted">{leader.role}</td>
                                <td className="p-6 font-bold text-accent">{leader.profit}</td>
                                <td className="p-6 font-bold text-white">{leader.winRate}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
