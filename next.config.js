/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,

  env: {
    DIRECTUS_URL_DEV: process.env.DIRECTUS_URL_DEV,
    DIRECTUS_URL: process.env.DIRECTUS_URL,
    NEXT_PUBLIC_GRAPHQL_DEV: process.env.NEXT_PUBLIC_GRAPHQL_DEV,
    NEXT_PUBLIC_GRAPHQL: process.env.NEXT_PUBLIC_GRAPHQL,
    NEXT_PUBLIC_DOMAIN_DEV: process.env.NEXT_PUBLIC_DOMAIN_DEV,
    NEXT_PUBLIC_DOMAIN: process.env.NEXT_PUBLIC_DOMAIN,
    DIRECTUS_CDN: process.env.DIRECTUS_CDN,
    DIRECTUS_CDN_DOMAIN: process.env.DIRECTUS_CDN_DOMAIN,
  },

  images: {
    domains: [`${process.env.DIRECTUS_CDN_DOMAIN}`],
    minimumCacheTTL: 60,
  },
  // async headers() {
  //   return [
  //     {
  //       source: "/_next/:path*",
  //       headers: [
  //         {
  //           key: "Access-Control-Allow-Origin",
  //           value: "http://localhost:3000",
  //         },
  //       ],
  //     },
  //   ];
  // },
};

module.exports = nextConfig;
