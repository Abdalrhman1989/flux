import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { AIAssistant } from "@/components/layout/AIAssistant";
import { Providers } from "@/components/Providers";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';

const inter = Inter({ subsets: ["latin"] });

export const viewport: Viewport = {
    themeColor: "#030014",
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
};

export const metadata: Metadata = {
    title: "Flux | The Mood Market",
    description: "Trade the vibe. The first sentiment-based crypto exchange.",
    manifest: "/manifest.json",
    appleWebApp: {
        capable: true,
        statusBarStyle: "black-translucent",
        title: "Flux",
    },
    icons: {
        apple: "/icon-192x192.png",
    }
};

export default async function LocaleLayout({
    children,
    params
}: {
    children: React.ReactNode;
    params: Promise<{ locale: string }>;
}) {
    const { locale } = await params;

    const messages = await getMessages();
    const dir = locale === 'ar' ? 'rtl' : 'ltr';

    return (
        <html lang={locale} dir={dir} suppressHydrationWarning>
            <head>
                <link rel="manifest" href="/manifest.json" />
            </head>
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
