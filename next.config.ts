// next.config.js
import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV !== "production";

const nextConfig: NextConfig = {
  output: "export",
  images: { unoptimized: true },
  trailingSlash: true,
  ...(isDev && {
    async rewrites() {
      return [
        {
          // ✅ Match your fetch call path
          source: "/api/:path*",
          // ✅ Redirects to your external API
          destination: "https://api.tkpshivatemple.com/api/:path*",
        },
      ];
    },
  }),
};

export default nextConfig;
