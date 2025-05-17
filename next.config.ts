import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
        pathname: "/u/**",
      },
      {
        protocol: "https",
        hostname: "openweathermap.org",
        pathname: "/img/wn/**",
      },
    ],
  },
  eslint: {
    dirs: ["src"],
  },
  // experimental: {
  //   dynamicIO: true,
  //   useCache: true,
  // },
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
  experimental: {
    nodeMiddleware: true,
  },

  webpack: (config, { isServer }) => {
    if (!isServer) {
      // Ensure that all imports of 'yjs' resolve to the same instance
      config.resolve.alias["yjs"] = path.resolve(__dirname, "node_modules/yjs");

      config.resolve.alias["@core-ui"] = path.resolve(__dirname, "node_modules/core-ui/lib");
    }
    return config;
  },
};

export default nextConfig;
