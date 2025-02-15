const createMDXConfig = require('@next/mdx');
const withMDX = createMDXConfig({
  extension: /\.mdx?$/,
});

/** @type {import('next').NextConfig} */
const nextConfig = withMDX({
  output: 'standalone',
  images: {
    unoptimized: true,
  },
  pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
  experimental: {
    typedRoutes: true,
  }
});
