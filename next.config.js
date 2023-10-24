/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['res.cloudinary.com']
  },
  env: {
    FRONTEND: "https://assignment-nextjs-frontend-kenneth.vercel.app",
    BACKEND: "https://json-server-nextjs-kenneth.vercel.app",
  }
}

//http://localhost:3000
//http://localhost:7000

//https://assignment-nextjs-frontend-kenneth.vercel.app"
//https://json-server-nextjs-kenneth.vercel.app

module.exports = nextConfig
