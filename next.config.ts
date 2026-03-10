import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  // GitHub Pages のリポジトリ名に合わせて変更してください
  // 例: https://yuji.github.io/staygold-funnel → basePath: "/staygold-funnel"
  // カスタムドメインを使う場合は basePath は不要（削除してOK）
  basePath: process.env.NEXT_PUBLIC_BASE_PATH ?? "",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
