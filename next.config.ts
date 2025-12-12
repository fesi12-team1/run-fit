import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  typedRoutes: true,
  turbopack: {
    rules: {
      '*.svg': {
        loaders: ['@svgr/webpack'],
        as: '*.js',
      },
    },
  },
  images: {
    // UserAvatar - 목데이터로 Image 테스트용
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'github.com',
      },
    ],
  },
};

export default nextConfig;
