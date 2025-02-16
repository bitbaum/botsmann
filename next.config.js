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
};

module.exports = nextConfig;
