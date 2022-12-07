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
  },
};

module.exports = nextConfig;
