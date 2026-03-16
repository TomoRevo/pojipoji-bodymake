import type { Metadata } from "next";
import TextbookPageClient from "./TextbookPageClient";

export const metadata: Metadata = {
  title: "ダイエットの教科書｜STAY GOLD GYM",
  description:
    "食事・運動・習慣・メンタルの4つの柱で、もう迷わない。パーソナルジム STAY GOLD 監修のダイエットの教科書。",
};

export default function TextbookPage() {
  return <TextbookPageClient />;
}
