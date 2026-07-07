import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // three.js ships large ESM builds — let Next optimize the imports
  transpilePackages: ['three'],
};

export default withNextIntl(nextConfig);
