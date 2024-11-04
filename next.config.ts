import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    // !! 仅在开发时使用
    ignoreBuildErrors: true,
  },
  eslint: {
    // !! 仅在开发时使用
    ignoreDuringBuilds: true,
  },
  experimental: {
    // 添加这个配置
    missingSuspenseWithCSRError: false,
  },
  output: 'standalone',
  poweredByHeader: false,
  reactStrictMode: true,
  swcMinify: true,
};

export default nextConfig;
