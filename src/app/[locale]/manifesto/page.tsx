export default function ManifestoPage() {
    return (
        <div className="container mx-auto px-6 py-24 max-w-3xl">
            <h1 className="text-5xl md:text-7xl font-bold mb-12">The <span className="text-gradient">Flux</span> Vision.</h1>

            <div className="prose prose-invert prose-lg leading-relaxed text-muted space-y-8">
                <p className="text-2xl text-white font-medium">
                    Information travels faster than price.
                </p>
                <p>
                    The charts you see are history. The real market moves on Twitter, Telegram, and Discord before a single green candle prints.
                </p>
                <p>
                    Flux is not just an exchange. It is a <strong>Sentiment Engine</strong>. We scan 50 million social signals per second to quantify the "Vibe" of the market.
                </p>
                <p>
                    We believe in a future where:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-white">
                    <li>Trading is as simple as swiping left or right.</li>
                    <li>You don't need a bank account to participate (Cash P2P).</li>
                    <li>AI Agents do the hard work for you.</li>
                </ul>
                <p>
                    Welcome to the era of <strong>Vibe-Fi</strong>.
                </p>
            </div>
        </div>
    );
}
