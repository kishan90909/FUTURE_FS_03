/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
  },

  // ✅ FIX for Node v24 + undici error
  transpilePackages: ["undici"],
};

module.exports = nextConfig;
