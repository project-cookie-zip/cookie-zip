/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  reactStrictMode: true,
  swcMinify: true,
  env: {
    NEXT_PUBLIC_CLOUDFLARE_CLIENT_ID:
      process.env.NEXT_PUBLIC_CLOUDFLARE_CLIENT_ID,
    NEXT_PUBLIC_CLOUDFLARE_API_TOKEN:
      process.env.NEXT_PUBLIC_CLOUDFLARE_API_TOKEN,
    DATABASE_URL: process.env.DATABASE_URL,
    LOCAL_BASE_URL: process.env.LOCAL_BASE_URL,
    GET_API_HEADERS_COOKIE: process.env.GET_API_HEADERS_COOKIE,
  },
};

module.exports = nextConfig;
