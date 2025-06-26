// This file sets a custom webpack configuration to use your Next.js app
// with Sentry.
// https://nextjs.org/docs/api-reference/next.config.js/introduction
// https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/
const { withSentryConfig } = require("@sentry/nextjs");

/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    config.resolve.alias.canvas = false;
    config.externals.push(
      '@opentelemetry/instrumentation',
      '@opentelemetry/instrumentation-http',
      '@prisma/instrumentation'
    );
    return config;
  },
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
      { protocol: "https", hostname: "*vercel-insights.com" },
      { protocol: "https", hostname: "vercel-insights.com" },
      { protocol: "https", hostname: "*sentry.io" },
      { protocol: "https", hostname: "sentry.io" },
    ],
  },
};

const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

module.exports = withBundleAnalyzer(nextConfig);

module.exports = process.env.ENABLE_SENTRY
  ? withSentryConfig(
      module.exports,
      { silent: true, sourcemaps: { deleteSourcemapsAfterUpload: true } }
    )
  : nextConfig;
