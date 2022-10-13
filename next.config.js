/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["localhost", `${process.env.DIRECTUS_URL}`],
    // remotePatterns: [
    //   {
    //     protocol: "http",
    //     hostname: "localhost",
    //     port: "8055",
    //     pathname: "/assets/**",
    //   },
    // ],
  },
};

module.exports = nextConfig;
