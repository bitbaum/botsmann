/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  distDir: ".next",
  images: {
    unoptimized: true,
  },
  experimental: {
    typedRoutes: true,
  },
  env: {
    MONGODB_URI: process.env.MONGODB_URI,
  },
  // Ensure proper route handling
  basePath: '',
  poweredByHeader: false,
  generateEtags: false,
};

module.exports = nextConfig;
