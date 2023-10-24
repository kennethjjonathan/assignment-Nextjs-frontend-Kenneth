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

//http://localhost:3000
//http://localhost:7000

//https://assignment-nextjs-frontend-kenneth.vercel.app"
//https://json-server-nextjs-kenneth.vercel.app

module.exports = nextConfig
