import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      { source: "/api/tax/:path*", destination: "http://localhost:8080/api/tax/:path*" },
    ];
  },
};
export default nextConfig;
