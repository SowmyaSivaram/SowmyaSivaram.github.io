// import type { NextConfig } from 'next'

// const nextConfig: NextConfig = {
//   output: 'export',
//   trailingSlash: true,
//   images: {
//     unoptimized: true,
//   },
// }

//export default nextConfig
// ✅ Safe and stable going forward
// next.config.ts

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // ✅ This enables static export
  trailingSlash: true, // ✅ Important for GitHub Pages to find folders
  images: {
    unoptimized: true, // ✅ Required for static hosting since image optimization needs a server
  },
};

export default nextConfig;


