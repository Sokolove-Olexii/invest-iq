import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  output: "export",
  basePath: "/invest-iq",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
