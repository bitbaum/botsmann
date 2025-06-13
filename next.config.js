/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
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
    typedRoutes: true
  },
  env: {
    NEXT_PUBLIC_DEPLOY_TIME: new Date().toUTCString()
  },
  async redirects() {
    return [
      {
        source: '/bots',
        destination: '/products',
        permanent: true,
      },
      {
        source: '/bots/:slug',
        destination: '/products/:slug',
        permanent: true,
      },
      {
        source: '/projects',
        destination: '/products',
        permanent: true,
      },
      {
        source: '/projects/:slug',
        destination: '/products/:slug',
        permanent: true,
      },
    ];
  },
  headers: async () => [{
    source: '/:path*',
    headers: [
      {
        key: 'Cache-Control',
        value: 'public, max-age=3600, s-maxage=86400, stale-while-revalidate=60'
      }
    ]
  }]
};

module.exports = nextConfig;
