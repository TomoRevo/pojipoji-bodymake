import { typeMessages, typeLabels, DiagnosisType } from "@/lib/diagnosis";
import { notFound } from "next/navigation";
import Link from "next/link";

const validTypes: DiagnosisType[] = ["beginner", "food", "busy", "serious"];

const typeEmoji: Record<DiagnosisType, string> = {
  beginner: "🌱",
  food: "🥗",
  busy: "⚡",
  serious: "🔥",
};

const typeColor: Record<DiagnosisType, string> = {
  beginner: "from-green-400 to-emerald-500",
  food: "from-orange-400 to-amber-500",
  busy: "from-blue-400 to-cyan-500",
  serious: "from-pink-500 to-rose-600",
};

interface Props {
  params: Promise<{ type: string }>;
}

export default async function ResultPage({ params }: Props) {
  const { type } = await params;

  if (!validTypes.includes(type as DiagnosisType)) {
    notFound();
  }

  const diagnosisType = type as DiagnosisType;
  const { title, body } = typeMessages[diagnosisType];
  const emoji = typeEmoji[diagnosisType];
  const gradient = typeColor[diagnosisType];

  return (
    <main className="min-h-screen bg-gradient-to-b from-pink-50 to-white px-4 py-10">
      <div className="max-w-md mx-auto flex flex-col gap-6">

        {/* Header */}
        <div className="text-center">
          <p className="text-sm text-pink-500 font-semibold tracking-wider mb-1">
            STAY GOLD GYM
          </p>
          <p className="text-gray-500 text-sm">診断結果が出ました！</p>
        </div>

        {/* Result Card */}
        <div className={`bg-gradient-to-br ${gradient} rounded-3xl p-7 text-white text-center shadow-lg`}>
          <div className="text-5xl mb-3">{emoji}</div>
          <p className="text-sm font-medium opacity-80 mb-1">あなたは</p>
          <h1 className="text-2xl font-bold">
            「{title}」
          </h1>
        </div>

        {/* Message */}
        <div className="bg-white rounded-2xl p-6 shadow-sm flex flex-col gap-3">
          {body.map((line, i) => (
            <p key={i} className="text-gray-700 leading-relaxed text-sm">
              {line}
            </p>
          ))}
          <div className="mt-2 pt-4 border-t border-gray-100">
            <p className="text-gray-600 text-sm font-medium">
              明日の朝、あなた専用の7日間プログラムが届きます🌅
            </p>
            <p className="text-gray-400 text-xs mt-1">
              楽しみにしていてください！
            </p>
          </div>
        </div>

        {/* 7日間プログラム内容 */}
        <div className="bg-pink-50 rounded-2xl p-5">
          <p className="font-bold text-gray-800 mb-3 text-sm">
            📅 7日間チャレンジの内容
          </p>
          <ul className="space-y-2 text-sm text-gray-600">
            <li className="flex items-center gap-2">
              <span className="text-pink-500">DAY1</span> 朝3分で代謝UP ダンス
            </li>
            <li className="flex items-center gap-2">
              <span className="text-pink-500">DAY2</span> 食後にやると痩せるダンス
            </li>
            <li className="flex items-center gap-2">
              <span className="text-pink-500">DAY3</span> 腹筋ゼロで腹凹ダンス
            </li>
            <li className="flex items-center gap-2">
              <span className="text-pink-500">DAY4</span> 60分歩くより脂肪燃焼ダンス
            </li>
            <li className="flex items-center gap-2">
              <span className="text-pink-500">DAY5</span> 上半身シェイプダンス
            </li>
            <li className="flex items-center gap-2">
              <span className="text-pink-500">DAY6</span> 全身脂肪燃焼ダンス
            </li>
            <li className="flex items-center gap-2">
              <span className="text-pink-500">DAY7</span> フィナーレ完走ダンス🎉
            </li>
          </ul>
        </div>

        {/* ガイドページへのリンク */}
        <Link
          href={`/guide/${diagnosisType}`}
          className="block w-full text-center bg-gradient-to-r from-pink-500 to-rose-400 text-white font-bold text-base px-6 py-4 rounded-2xl shadow active:scale-95 transition-all"
        >
          あなた専用7日間プログラムを見る →
        </Link>

        <div className="text-center">
          <p className="text-xs text-gray-400">
            LINEにも毎朝配信が届きます😊
          </p>
        </div>
      </div>
    </main>
  );
}

export function generateStaticParams() {
  return validTypes.map((type) => ({ type }));
}
