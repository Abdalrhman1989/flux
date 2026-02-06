import createNextIntlPlugin from 'next-intl/plugin';

// Standard auto-discovery
const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {};

export default withNextIntl(nextConfig);
