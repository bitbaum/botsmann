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
