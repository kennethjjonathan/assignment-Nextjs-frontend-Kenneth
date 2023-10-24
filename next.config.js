/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['res.cloudinary.com']
  },
  env: {
    FRONTEND: "http://localhost:3000",
    BACKEND: "http://localhost:7000",
  }
}

module.exports = nextConfig
