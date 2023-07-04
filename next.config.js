/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    minimumCacheTTL: 86400, // 1 day
    remotePatterns: [
      {
        protocol: "https",
        hostname: "digitalent.ch",
      },
      {
        protocol: "https",
        hostname: "*digitalent.cloud",
      },
      {
        protocol: "https",
        hostname: "fonts.gstatic.com",
      },
      { protocol: "https", hostname: "vitals.vercel-insights.com" },
    ],
  },
};

const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

module.exports = withBundleAnalyzer(nextConfig);
