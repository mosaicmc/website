import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true,
    disableStaticImages: true,
  },
  turbopack: {
    root: __dirname,
  },
  distDir: "dist",
  webpack: (config) => {
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      "react-router-dom": path.resolve(__dirname, "src/lib/react-router-dom.tsx"),
      "react-i18next": path.resolve(__dirname, "src/lib/react-i18next.tsx"),
    };
    config.module.rules.push({
      test: /\.(png|jpg|jpeg|gif|webp|avif|svg)$/i,
      type: "asset/resource",
    });
    return config;
  },
  async redirects() {
    return [
      {
        source: '/privacy-policy',
        destination: '/policies/privacy',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
