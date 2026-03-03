/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'raw.githubusercontent.com',
        pathname: '/g-but/botsmann-blog-content/**',
      },
    ],
  },
  experimental: {
    typedRoutes: true,
    serverComponentsExternalPackages: ['onnxruntime-node', '@xenova/transformers', 'sharp'],
  },
  env: {
    NEXT_PUBLIC_DEPLOY_TIME: new Date().toUTCString(),
  },
  // Redirects for URL structure migration
  async redirects() {
    return [
      // Documents -> My Data
      {
        source: '/documents',
        destination: '/my-data',
        permanent: true,
      },
      // Create -> Personal
      {
        source: '/create',
        destination: '/personal',
        permanent: true,
      },
      // Solutions -> Enterprise (consolidation)
      {
        source: '/solutions/businesses',
        destination: '/enterprise',
        permanent: true,
      },
      {
        source: '/solutions/governments',
        destination: '/enterprise',
        permanent: true,
      },
    ];
  },
  headers: async () => {
    const securityHeaders = [
      {
        key: 'Strict-Transport-Security',
        value: 'max-age=31536000; includeSubDomains',
      },
      {
        key: 'X-Content-Type-Options',
        value: 'nosniff',
      },
      {
        key: 'X-Frame-Options',
        value: 'DENY',
      },
      {
        key: 'Referrer-Policy',
        value: 'strict-origin-when-cross-origin',
      },
      {
        key: 'Permissions-Policy',
        value: 'camera=(), microphone=(), geolocation=()',
      },
      {
        key: 'Content-Security-Policy',
        value: [
          "default-src 'self'",
          "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://giscus.app https://platform.twitter.com",
          "style-src 'self' 'unsafe-inline'",
          "img-src 'self' data: blob: https://raw.githubusercontent.com https://images.unsplash.com",
          "font-src 'self'",
          "connect-src 'self' https://api.groq.com https://openrouter.ai https://api.openai.com https://api.github.com https://raw.githubusercontent.com https://*.supabase.co",
          "frame-src 'self' https://www.youtube.com https://giscus.app",
          "frame-ancestors 'none'",
        ].join('; '),
      },
    ];

    return [
      {
        source: '/api/:path*',
        headers: [{ key: 'Cache-Control', value: 'no-store, max-age=0' }],
      },
      {
        source: '/(.*)',
        headers: securityHeaders,
      },
      {
        source: '/((?!api).*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=3600, s-maxage=86400, stale-while-revalidate=60',
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
