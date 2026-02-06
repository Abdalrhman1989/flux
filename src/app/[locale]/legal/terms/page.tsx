export default function TermsPage() {
    return (
        <main className="min-h-screen pt-32 pb-20 px-6 bg-black">
            <div className="container mx-auto max-w-3xl glass-panel p-12 rounded-3xl">
                <h1 className="text-4xl font-black text-white mb-8">Terms & Conditions</h1>
                <div className="prose prose-invert max-w-none text-gray-300">
                    <p className="lead text-xl text-white mb-6">Last Updated: February 5, 2026</p>

                    <h2 className="text-2xl font-bold text-white mt-8 mb-4">1. Agreement to Terms</h2>
                    <p>By accessing or using the Flux platform, you agree to be bound by these Terms. If you disagree with any part of the terms, then you may not access the Service.</p>

                    <h2 className="text-2xl font-bold text-white mt-8 mb-4">2. Cryptocurrency Risks</h2>
                    <p>Investing in cryptocurrencies involves significant risk and can result in the loss of your invested capital. You should not invest more than you can afford to lose and should ensure that you fully understand the risks involved.</p>
                    <div className="bg-red-500/10 border border-red-500/20 p-4 rounded-xl mt-4">
                        <p className="text-red-200 text-sm font-bold">WARNING: Meme coins and experimental tokens launched on this platform are highly volatile. Flux is a decentralized tool and has no control over the value or utility of user-created tokens.</p>
                    </div>

                    <h2 className="text-2xl font-bold text-white mt-8 mb-4">3. User Generated Content</h2>
                    <p>You retain ownership of any content (tokens, images, names) you create using Flux. However, you grant us a worldwide, non-exclusive license to display this content on the platform.</p>

                    <h2 className="text-2xl font-bold text-white mt-8 mb-4">4. Prohibited Activities</h2>
                    <ul className="list-disc pl-6 space-y-2 mt-4">
                        <li>Using the platform for illegal laundering or financing.</li>
                        <li>Deploying tokens with hate speech or illegal imagery.</li>
                        <li>Attempting to exploit smart contract vulnerabilities.</li>
                    </ul>
                </div>
            </div>
        </main>
    )
}
