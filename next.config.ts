import type { NextConfig } from 'next';

const nextConfig: NextConfig = {};

module.exports = {
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  experimental: {
    turbo: false,
  },
  webpack: (config: any) => {
    return config;
  },
};

export default nextConfig;
