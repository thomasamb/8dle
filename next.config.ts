import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    qualities: [25, 50, 75, 100],
    localPatterns: [
      {
        pathname: "/assets/**",
        search: "",
      },
      {
        pathname: "/api/images/**",
        search: "",
      },
    ],
  },
};

export default nextConfig;
