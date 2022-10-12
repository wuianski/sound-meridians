/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["localhost", `${process.env.DIRECTUS_URL}`],
  },
};

module.exports = nextConfig;
