import createNextIntlPlugin from 'next-intl/plugin';
import withPWAInit from "next-pwa";

// Standard auto-discovery
const withNextIntl = createNextIntlPlugin();

const withPWA = withPWAInit({
    dest: "public",
    register: true,
    skipWaiting: true,
    disable: process.env.NODE_ENV === "development", // Disable in dev to avoid annoying caching
});

/** @type {import('next').NextConfig} */
const nextConfig = {
    // ... any other config
};

export default withPWA(withNextIntl(nextConfig));
