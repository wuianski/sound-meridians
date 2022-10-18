/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,

  env: {
    DIRECTUS_URL_DEV: process.env.DIRECTUS_URL_DEV,
    DIRECTUS_URL: process.env.DIRECTUS_URL,
    NEXT_PUBLIC_GRAPHQL_DEV: process.env.NEXT_PUBLIC_GRAPHQL_DEV,
    NEXT_PUBLIC_GRAPHQL: process.env.NEXT_PUBLIC_GRAPHQL,
  },

  images: {
    domains: ["data.soundmeridians.net"],
  },
};

module.exports = nextConfig;
