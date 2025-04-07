/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {},
  eslint: {
    // This will ignore ESLint errors during build
    ignoreDuringBuilds: true,
  },
};

module.exports = nextConfig;