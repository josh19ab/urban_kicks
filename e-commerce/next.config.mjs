/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["res.cloudinary.com"],
  },
  experimental: {
    serverComponentsExternalPackages: ['@clerk/nextjs'],
  },
  // Hide the Next.js dev indicator (bottom-left "N" logo) in development
  devIndicators: {
    buildActivity: false,
  },
};

export default nextConfig;
