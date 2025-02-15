const createMDXConfig = require('@next/mdx');
const withMDX = createMDXConfig({
  extension: /\.mdx?$/,
});

/** @type {import('next').NextConfig} */
const nextConfig = withMDX({
  output: 'export',
  images: {
    unoptimized: true,
  },
  pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
});
