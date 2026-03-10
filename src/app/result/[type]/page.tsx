import { typeMessages, typeLabels, DiagnosisType } from "@/lib/diagnosis";
import { notFound } from "next/navigation";

const validTypes: DiagnosisType[] = ["beginner", "food", "busy", "serious"];

// ▼ ここにエルメの流入URLを入れてください
const elmeUrls: Record<DiagnosisType, string> = {
  beginner: "https://line.me/R/ti/p/xxxx", // 超初心者タイプ用
  food:     "https://line.me/R/ti/p/xxxx", // 食事改善タイプ用
  busy:     "https://line.me/R/ti/p/xxxx", // 忙しいタイプ用
  serious:  "https://line.me/R/ti/p/xxxx", // 本気タイプ用
};

const typeAccent: Record<DiagnosisType, { bg: string; text: string; border: string; badge: string }> = {
  beginner: {
    bg: "from-emerald-500 to-green-400",
    text: "text-emerald-400",
    border: "border-emerald-500/30",
    badge: "bg-emerald-500/10 text-emerald-300",
  },
  food: {
    bg: "from-orange-500 to-amber-400",
    text: "text-orange-400",
    border: "border-orange-500/30",
    badge: "bg-orange-500/10 text-orange-300",
  },
  busy: {
    bg: "from-blue-500 to-cyan-400",
    text: "text-blue-400",
    border: "border-blue-500/30",
    badge: "bg-blue-500/10 text-blue-300",
  },
  serious: {
    bg: "from-rose-500 to-pink-400",
    text: "text-rose-400",
    border: "border-rose-500/30",
    badge: "bg-rose-500/10 text-rose-300",
  },
};

const days = [
  { day: 1, label: "朝3分で代謝UP ダンス" },
  { day: 2, label: "食後にやると痩せるダンス" },
  { day: 3, label: "腹筋ゼロで腹凹ダンス" },
  { day: 4, label: "60分歩くより脂肪燃焼ダンス" },
  { day: 5, label: "上半身シェイプダンス" },
  { day: 6, label: "全身脂肪燃焼ダンス" },
  { day: 7, label: "フィナーレ完走ダンス" },
];

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
  const accent = typeAccent[diagnosisType];
  const elmeUrl = elmeUrls[diagnosisType];

  return (
    <main className="min-h-screen bg-slate-900 text-white px-4 py-10">
      <div className="max-w-md mx-auto flex flex-col gap-5">

        {/* Header */}
        <div className="text-center">
          <p className="text-xs tracking-[0.25em] text-orange-400 uppercase font-semibold mb-1">
            Stay Gold Gym
          </p>
          <p className="text-slate-400 text-sm">診断結果が出ました</p>
        </div>

        {/* Result Card */}
        <div className={`bg-gradient-to-br ${accent.bg} rounded-3xl p-7 text-white text-center shadow-xl`}>
          <p className="text-sm font-medium opacity-80 mb-1">あなたは</p>
          <h1 className="text-2xl font-black">「{title}」</h1>
        </div>

        {/* Message */}
        <div className={`bg-slate-800/60 border ${accent.border} rounded-2xl p-6 flex flex-col gap-3 backdrop-blur-sm`}>
          {body.map((line, i) => (
            <p key={i} className="text-slate-300 leading-relaxed text-sm">
              {line}
            </p>
          ))}
          <div className="mt-2 pt-4 border-t border-slate-700">
            <p className={`text-sm font-bold ${accent.text}`}>
              LINEで7日間プログラムを受け取ろう
            </p>
            <p className="text-slate-500 text-xs mt-1">
              登録後すぐにあなた専用の内容が届きます
            </p>
          </div>
        </div>

        {/* 7日間プログラム内容 */}
        <div className="bg-slate-800/60 border border-slate-700/50 rounded-2xl p-5">
          <p className={`font-black text-sm mb-4 ${accent.text} tracking-wide uppercase`}>
            7日間チャレンジの内容
          </p>
          <div className="flex flex-col gap-2">
            {days.map((d) => (
              <div key={d.day} className="flex items-center gap-3">
                <span className={`text-xs font-black px-2 py-0.5 rounded-md ${accent.badge} shrink-0`}>
                  DAY{d.day}
                </span>
                <span className="text-slate-300 text-sm">{d.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* エルメ流入ボタン */}
        <a
          href={elmeUrl}
          className={`block w-full text-center bg-gradient-to-r ${accent.bg} text-white font-black text-base px-6 py-5 rounded-2xl shadow-lg active:scale-95 transition-all`}
        >
          LINEで7日間プログラムを受け取る
        </a>

        <p className="text-center text-slate-600 text-xs">
          登録無料 · いつでも退会OK
        </p>
      </div>
    </main>
  );
}

export function generateStaticParams() {
  return validTypes.map((type) => ({ type }));
}
