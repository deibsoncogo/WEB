/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  env: {
    API_URL: process.env.API_URL,
    TINY_MCE_KEY: process.env.TINY_MCE_KEY
  },
  images: { domains: ['localhost', process.env.API_URL.split('/')[2]] },
}

module.exports = nextConfig
