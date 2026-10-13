import "./env.mjs"

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "avatars.githubusercontent.com",
      "lh3.googleusercontent.com",
      "images.unsplash.com",
    ],
  },
  experimental: {
    serverComponentsExternalPackages: ["@prisma/client"],
  },
}

export default nextConfig
