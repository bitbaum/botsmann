/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  images: {
    // The remotePatterns entry that lived here allowed post images to be
    // loaded from the retired botsmann-blog-content GitHub repo. Post images
    // are committed under public/blog/ now, so nothing remote is left to allow.
    unoptimized: true,
  },
  serverExternalPackages: ['onnxruntime-node', '@xenova/transformers', 'sharp'],
  // typedRoutes graduated from `experimental` to a stable top-level option in Next 16.
  typedRoutes: true,
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
          "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://giscus.app https://platform.twitter.com https://fleetcrown.orangecat.ch",
          "style-src 'self' 'unsafe-inline'",
          "img-src 'self' data: blob: https://images.unsplash.com",
          "font-src 'self'",
          // api.github.com / raw.githubusercontent.com were here so the blog and
          // Knowledge Center could fetch their markdown from two separate
          // GitHub repos at request time. That content is committed under
          // content/ now and read from disk at build time — nothing in the app
          // talks to GitHub any more.
          "connect-src 'self' https://api.groq.com https://openrouter.ai https://api.openai.com https://*.supabase.co https://supabase.orangecat.ch https://fleetcrown.orangecat.ch",
          // bip-kit renders video embeds through the privacy players only
          // (youtube-nocookie / player.vimeo.com) and allowlists the source
          // hosts at parse time — a markdown file cannot inject another iframe.
          "frame-src 'self' https://www.youtube-nocookie.com https://player.vimeo.com https://giscus.app",
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
