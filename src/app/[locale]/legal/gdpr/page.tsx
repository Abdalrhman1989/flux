export default function GDPRPage() {
    return (
        <main className="min-h-screen pt-32 pb-20 px-6 bg-black">
            <div className="container mx-auto max-w-3xl glass-panel p-12 rounded-3xl">
                <h1 className="text-4xl font-black text-white mb-8">GDPR Compliance</h1>
                <div className="prose prose-invert max-w-none text-gray-300">
                    <p className="lead text-xl text-white mb-6">General Data Protection Regulation Request</p>

                    <p>If you are a resident of the European Economic Area (EEA), you have certain data protection rights. Flux aims to take reasonable steps to allow you to correct, amend, delete, or limit the use of your Personal Data.</p>

                    <h2 className="text-2xl font-bold text-white mt-8 mb-4">Data Access Request</h2>
                    <p>To request a copy of the personal data we hold about you, please connect your wallet and sign a verification message. Note that we do not hold traditional "accounts" with email/password, only public on-chain data associated with your wallet address.</p>

                    <h2 className="text-2xl font-bold text-white mt-8 mb-4">Right to Be Forgotten</h2>
                    <p>You may request deletion of off-chain metadata (such as profile settings). However, transactions recorded on the Solana blockchain are immutable and cannot be erased by anyone, including Flux.</p>

                    <button className="mt-8 px-8 py-3 bg-white/10 hover:bg-white/20 rounded-xl text-white font-bold transition-colors">
                        Submit GDPR Request
                    </button>
                </div>
            </div>
        </main>
    )
}
