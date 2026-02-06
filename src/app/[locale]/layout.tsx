import type { Metadata } from "next";
import { Inter } from "next/font/google"; // Using Inter from Google Fonts
import "../globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { AIAssistant } from "@/components/layout/AIAssistant";
import { Providers } from "@/components/Providers";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Flux | The Mood Market",
    description: "Trade the vibe. The first sentiment-based crypto exchange.",
};

export default async function LocaleLayout({
    children,
    params
}: {
    children: React.ReactNode;
    params: Promise<{ locale: string }>;
}) {
    // Ensure params are handled correctly (awaiting if necessary in newer Next.js versions, 
    // though typically params is an object here in 14. Assuming 14 behavior based on context 
    // but being safe is good. However, params prop isn't a promise in 14. 
    // Let's stick to standard usage).
    const { locale } = await params;

    const messages = await getMessages();
    const dir = locale === 'ar' ? 'rtl' : 'ltr';

    return (
        <html lang={locale} dir={dir} suppressHydrationWarning>
            <body className={`${inter.className} min-h-screen flex flex-col antialiased`}>
                <NextIntlClientProvider messages={messages}>
                    <Providers>
                        <Navbar />
                        <main className="flex-1 pt-24">
                            {children}
                        </main>
                        <AIAssistant />
                        <Footer />
                    </Providers>
                </NextIntlClientProvider>
            </body>
        </html>
    );
}
