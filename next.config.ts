import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "utfs.io/f",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
