import { Link } from "@/navigation";

export function Footer() {
    return (
        <footer className="w-full border-t border-glass-border bg-surface py-12 mt-20">
            <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12">
                <div className="col-span-1 md:col-span-2">
                    <h4 className="text-2xl font-bold text-white mb-4">FLUX</h4>
                    <p className="text-muted max-w-sm leading-relaxed">
                        The world's first sentiment-based crypto exchange.
                        <br />Trade the vibe. Surf the flux.
                    </p>
                    <div className="mt-8 text-xs text-muted/50">
                        © 2026 Flux Protocol. All rights reserved.
                    </div>
                </div>

                <div className="flex flex-col gap-4">
                    <h5 className="font-bold text-white">Platform</h5>
                    <Link href="/" className="text-sm text-muted hover:text-white transition-colors">Market</Link>
                    <Link href="/play" className="text-sm text-muted hover:text-white transition-colors">Arcade</Link>
                    <Link href="/pro" className="text-sm text-muted hover:text-white transition-colors">Pro Trading</Link>
                </div>

                <div className="flex flex-col gap-4">
                    <h5 className="font-bold text-white">Social</h5>
                    <Link href="#" className="text-sm text-muted hover:text-white transition-colors">Twitter / X</Link>
                    <Link href="#" className="text-sm text-muted hover:text-white transition-colors">Discord</Link>
                    <Link href="#" className="text-sm text-muted hover:text-white transition-colors">Telegram</Link>
                </div>

                <div className="flex flex-col gap-4">
                    <h5 className="font-bold text-white">Legal</h5>
                    <Link href="/legal/privacy" className="text-sm text-muted hover:text-white transition-colors">Privacy Policy</Link>
                    <Link href="/legal/terms" className="text-sm text-muted hover:text-white transition-colors">Terms & Conditions</Link>
                    <Link href="/legal/gdpr" className="text-sm text-muted hover:text-white transition-colors">GDPR</Link>
                </div>
            </div>
        </footer>
    );
}
