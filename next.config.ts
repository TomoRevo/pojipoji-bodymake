import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/pojipoji-bodymake",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
