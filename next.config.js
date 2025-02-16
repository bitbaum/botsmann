/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  images: {
    unoptimized: true,
  },
  experimental: {
    typedRoutes: true,
    serverActions: true,
  },
  generateBuildId: async () => {
    return 'build-' + Date.now();
  },
  env: {
    MONGODB_URI: process.env.MONGODB_URI,
  },
  // Ensure proper handling of API routes
  trailingSlash: false,
  skipTrailingSlashRedirect: true,
  async rewrites() {
    return {
      beforeFiles: [
        {
          source: '/api/:path*',
          destination: '/api/:path*',
        },
      ],
    };
  },
};

module.exports = nextConfig;
