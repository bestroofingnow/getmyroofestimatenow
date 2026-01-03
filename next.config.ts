import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enable image optimization for better Core Web Vitals
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256],
  },

  // Compress responses for faster loading
  compress: true,

  // Generate ETags for caching
  generateEtags: true,

  // Powered by header (disable for security)
  poweredByHeader: false,

  // Strict mode for better React practices
  reactStrictMode: true,

  // Headers for SEO and security
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
        ],
      },
      {
        // Cache static assets for better performance
        source: '/(.*)\\.(ico|png|jpg|jpeg|gif|svg|webp|avif|woff|woff2)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },

  // Redirects for SEO (trailing slash consistency)
  async redirects() {
    return [
      // Redirect www to non-www (or vice versa - configure as needed)
      {
        source: '/:path+/',
        destination: '/:path+',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
