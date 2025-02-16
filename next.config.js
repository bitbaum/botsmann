/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  images: { 
    unoptimized: true 
  },
  experimental: { 
    typedRoutes: true 
  },
  env: {
    NEXT_PUBLIC_DEPLOY_TIME: new Date().toUTCString()
  }
};

module.exports = nextConfig;
