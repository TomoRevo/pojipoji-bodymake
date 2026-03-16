import { notFound } from "next/navigation";
import { DiagnosisType, validTypes, typeLabels } from "@/lib/diagnosis";
import GuidePageClient from "./GuidePageClient";
import type { Metadata } from "next";

interface Props {
  params: Promise<{ type: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { type } = await params;
  if (!validTypes.includes(type as DiagnosisType)) {
    return { title: "ページが見つかりません" };
  }
  const label = typeLabels[type as DiagnosisType];
  return {
    title: `${label}のあなた専用ガイド｜STAY GOLD GYM`,
    description: `${label}のあなたに合ったダイエット戦略・今日からできるアクション・3ヶ月後のイメージをお届けします。`,
  };
}

export default async function GuidePage({ params }: Props) {
  const { type } = await params;

  if (!validTypes.includes(type as DiagnosisType)) {
    notFound();
  }

  return <GuidePageClient type={type as DiagnosisType} />;
}

export function generateStaticParams() {
  return validTypes.map((type) => ({ type }));
}
