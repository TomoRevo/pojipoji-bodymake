import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "あなたのダイエットタイプ診断｜STAY GOLD GYM",
  description:
    "30秒5問であなたに合ったダイエット方法がわかる。STAY GOLD GYM のダイエットタイプ診断。",
};

export default function DiagnosisLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
