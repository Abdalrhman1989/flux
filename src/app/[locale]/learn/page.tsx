"use client";

import { motion } from "framer-motion";
import { BookOpen, Award, CheckCircle, GraduationCap, X } from "lucide-react";
import { useState } from "react";
import confetti from "canvas-confetti"; // Verify if installed, or use simple effect

export default function AcademyPage() {
    const [activeLesson, setActiveLesson] = useState(0);
    const [completedLessons, setCompletedLessons] = useState<number[]>([]);
    const [xp, setXp] = useState(0);
    const [showReward, setShowReward] = useState(false);

    const lessons = [
        {
            title: "Wallet Security 101",
            duration: "2 min",
            content: "Your wallet is your bank account in Web3. The most important rule is to NEVER share your 'Seed Phrase' (the 12 words you got when you created the wallet) or your 'Private Key'. If someone has these, they have full control over your funds. Flux will NEVER ask for them.",
            xp: 100
        },
        {
            title: "Understanding Gas Fees",
            duration: "3 min",
            content: "Every time you do something on the blockchain (like sending money, or buying a token), you have to pay a small fee to the computers running the network. On Solana, this is called a 'Rent' or 'Gas' fee and it is paid in SOL. It is very cheap ($0.0005), but you must always keep a little bit of SOL in your wallet to pay for it.",
            xp: 150
        },
        {
            title: "How Bonding Curves Work",
            duration: "5 min",
            content: "Flux uses a 'Bonding Curve' to make tokens fair. When a token is created, the price is very low. As people buy, the price goes up automatically based on a math formula. There is no 'Initial Coin Offering' (ICO) and no team allocation. Once the market cap hits $60k, the money is locked in a liquidity pool so it is safe forever.",
            xp: 200
        }
    ];

    const handleComplete = () => {
        if (completedLessons.includes(activeLesson)) return;

        // 1. Mark as complete
        setCompletedLessons([...completedLessons, activeLesson]);

        // 2. Add XP
        const earned = lessons[activeLesson].xp;
        setXp(prev => prev + earned);

        // 3. Trigger Reward Animation
        setShowReward(true);
        confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 }
        });

        // 4. Auto-hide reward modal
        setTimeout(() => setShowReward(false), 3000);
    };

    return (
        <div className="min-h-screen pt-32 pb-20 px-6">
            <div className="container mx-auto max-w-5xl">

                {/* Header Stats */}
                <div className="flex justify-between items-end mb-16">
                    <div>
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-5xl font-black text-white mb-4"
                        >
                            Flux <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500">Academy</span>
                        </motion.h1>
                        <p className="text-xl text-muted">
                            Complete lessons to earn XP and $FLUX rewards.
                        </p>
                    </div>
                    <div className="bg-white/10 px-6 py-3 rounded-2xl flex flex-col items-center border border-accent/20">
                        <div className="text-xs text-muted uppercase font-bold tracking-widest">Your XP</div>
                        <div className="text-3xl font-black text-accent">{xp}</div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Lesson List */}
                    <div className="lg:col-span-1 space-y-4">
                        {lessons.map((lesson, i) => {
                            const isCompleted = completedLessons.includes(i);
                            return (
                                <button
                                    key={i}
                                    onClick={() => setActiveLesson(i)}
                                    className={`w-full p-4 rounded-xl text-left transition-all flex items-center justify-between group ${activeLesson === i ? 'bg-primary/20 border-primary' : 'bg-white/5 border-transparent hover:bg-white/10'}`}
                                >
                                    <div className="flex items-center gap-3">
                                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold relative ${activeLesson === i ? 'bg-primary text-black' : 'bg-white/10 text-muted'}`}>
                                            {isCompleted ? <CheckCircle size={16} className="text-green-400" /> : (i + 1)}
                                        </div>
                                        <div>
                                            <div className={`font-bold ${activeLesson === i ? 'text-white' : 'text-gray-400 group-hover:text-white'}`}>{lesson.title}</div>
                                            <div className="text-xs text-muted">{lesson.duration}</div>
                                        </div>
                                    </div>
                                    {isCompleted && <span className="text-xs font-bold text-green-400 px-2 py-1 bg-green-400/10 rounded">DONE</span>}
                                </button>
                            )
                        })}
                    </div>

                    {/* Content Area */}
                    <div className="lg:col-span-2 glass-panel p-8 rounded-3xl min-h-[400px] flex flex-col relative transition-all">
                        <div className="flex items-center gap-3 mb-6">
                            <GraduationCap className="text-primary" size={32} />
                            <h2 className="text-2xl font-bold text-white">{lessons[activeLesson].title}</h2>
                        </div>

                        <div className="prose prose-invert max-w-none text-gray-300 text-lg leading-relaxed flex-1">
                            {lessons[activeLesson].content}
                        </div>

                        <div className="mt-8 pt-8 border-t border-white/5 flex justify-between items-center">
                            <div className="text-sm font-bold text-accent flex items-center gap-2">
                                <Award size={16} /> Reward: {lessons[activeLesson].xp} XP
                            </div>

                            <button
                                onClick={handleComplete}
                                disabled={completedLessons.includes(activeLesson)}
                                className={`px-6 py-3 font-bold rounded-xl transition-all flex items-center gap-2 ${completedLessons.includes(activeLesson)
                                        ? 'bg-green-500/20 text-green-400 cursor-default'
                                        : 'bg-white/10 hover:bg-white/20 text-white'
                                    }`}
                            >
                                {completedLessons.includes(activeLesson) ? (
                                    <> <CheckCircle size={18} /> Completed </>
                                ) : (
                                    <> Mark as Complete </>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Reward Modal */}
            {showReward && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
                    <motion.div
                        initial={{ scale: 0.5, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.5, opacity: 0 }}
                        className="bg-[#0A0B14] border border-accent rounded-3xl p-10 text-center max-w-sm mx-4 relative"
                    >
                        <div className="w-24 h-24 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-6 text-accent">
                            <Award size={48} />
                        </div>
                        <h2 className="text-3xl font-black text-white mb-2">Lesson Complete!</h2>
                        <p className="text-gray-400 mb-6">
                            You just earned <span className="text-accent font-bold">+{lessons[activeLesson].xp} XP</span>.
                            Keep going to unlock the $FLUX airdrop.
                        </p>
                        <button onClick={() => setShowReward(false)} className="px-8 py-3 bg-accent text-black font-bold rounded-xl">
                            Awesome!
                        </button>
                    </motion.div>
                </div>
            )}
        </div>
    );
}
