import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "楽しく踊って痩せる｜STAY GOLD GYM ダイエットダンス",
  description:
    "30〜50代女性向け。関節に優しい・初心者OK・1日3分のダイエットダンス。LINEに登録してあなた専用の7日間プログラムを受け取ろう。",
  openGraph: {
    title: "楽しく踊って痩せる｜STAY GOLD GYM",
    description: "1日3分のダイエットダンス。LINEで無料7日間プログラム配信中。",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
