export default function PrivacyPage() {
    return (
        <main className="min-h-screen pt-32 pb-20 px-6 bg-black">
            <div className="container mx-auto max-w-3xl glass-panel p-12 rounded-3xl">
                <h1 className="text-4xl font-black text-white mb-8">Privacy Policy</h1>
                <div className="prose prose-invert max-w-none text-gray-300">
                    <p className="lead text-xl text-white mb-6">Last Updated: February 5, 2026</p>

                    <h2 className="text-2xl font-bold text-white mt-8 mb-4">1. Introduction</h2>
                    <p>Welcome to Flux. We respect your privacy and are committed to protecting your personal data. This privacy policy will inform you as to how we look after your personal data when you visit our website (regardless of where you visit it from) and tell you about your privacy rights and how the law protects you.</p>

                    <h2 className="text-2xl font-bold text-white mt-8 mb-4">2. The Data We Collect</h2>
                    <p>We may collect, use, store and transfer different kinds of personal data about you which we have grouped together follows:</p>
                    <ul className="list-disc pl-6 space-y-2 mt-4">
                        <li><strong>Identity Data:</strong> Wallet address, username (if created).</li>
                        <li><strong>Transaction Data:</strong> Details about payments to and from you and other details of products you have purchased from us.</li>
                        <li><strong>Usage Data:</strong> Information about how you use our website, products and services.</li>
                    </ul>

                    <h2 className="text-2xl font-bold text-white mt-8 mb-4">3. Blockchain Data</h2>
                    <p>Please note that due to the inherent nature of the blockchain, any data stored on-chain is public and immutable. Flux cannot control or delete data that has been written to the blockchain.</p>

                    <h2 className="text-2xl font-bold text-white mt-8 mb-4">4. Your Rights</h2>
                    <p>Under certain circumstances, you have rights under data protection laws in relation to your personal data, including the right to request access, correction, erasure, restriction, transfer, to object to processing, to portability of data and (where the lawful ground of processing is consent) to withdraw consent.</p>
                </div>
            </div>
        </main>
    )
}
