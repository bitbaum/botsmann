/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "experimental-serverless-trace",
  images: {
    unoptimized: true,
  },
  experimental: {
    typedRoutes: true,
    serverActions: true,
  },
  env: {
    MONGODB_URI: process.env.MONGODB_URI,
  },
};

module.exports = nextConfig;
