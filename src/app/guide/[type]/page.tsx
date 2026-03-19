import { notFound } from "next/navigation";
import GuidePageClient from "./GuidePageClient";
import type { Metadata } from "next";

/* 旧4タイプ用ガイドページ。新5タイプ移行後に更新予定 */
const legacyTypes = ["first_step", "food_reset", "time_hack", "switch_on"] as const;
type LegacyType = (typeof legacyTypes)[number];

const legacyLabels: Record<LegacyType, string> = {
  first_step: "はじめの一歩タイプ",
  food_reset: "食事リセットタイプ",
  time_hack: "スキマ時間活用タイプ",
  switch_on: "本気スイッチタイプ",
};

interface Props {
  params: Promise<{ type: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { type } = await params;
  if (!legacyTypes.includes(type as LegacyType)) {
    return { title: "ページが見つかりません" };
  }
  const label = legacyLabels[type as LegacyType];
  return {
    title: `${label}のあなた専用ガイド｜STAY GOLD GYM`,
    description: `${label}のあなたに合ったダイエット戦略をお届けします。`,
  };
}

export default async function GuidePage({ params }: Props) {
  const { type } = await params;
  if (!legacyTypes.includes(type as LegacyType)) notFound();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return <GuidePageClient type={type as any} />;
}

export function generateStaticParams() {
  return legacyTypes.map((type) => ({ type }));
}
