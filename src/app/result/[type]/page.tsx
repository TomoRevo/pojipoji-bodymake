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
    bg: "from-violet-600 to-purple-500",
    text: "text-violet-400",
    border: "border-violet-500/30",
    badge: "bg-violet-500/10 text-violet-300",
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

const bonuses = [
  {
    label: "ダイエット教科書",
    desc: "なぜ痩せないのか、正しい知識をわかりやすく解説",
    tag: "PDF",
  },
  {
    label: "コンビニ食材リスト",
    desc: "これだけ買えばOK。今日から使えるリスト",
    tag: "PDF",
  },
  {
    label: "炊飯器レシピ集",
    desc: "準備5分、寝てる間にできる高タンパクレシピ",
    tag: "レシピ",
  },
  {
    label: "習慣チェックシート",
    desc: "7日間を続けるための記録シート",
    tag: "シート",
  },
  {
    label: "無料オンライン個別相談",
    desc: "7日完走者限定。あなた専用の次の一手を提案",
    tag: "限定",
    highlight: true,
  },
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
  const { title, hook, body, cta } = typeMessages[diagnosisType];
  const accent = typeAccent[diagnosisType];
  const elmeUrl = elmeUrls[diagnosisType];

  return (
    <main className="min-h-screen bg-slate-900 text-white px-4 py-10">
      <div className="max-w-md mx-auto flex flex-col gap-5">

        {/* Header */}
        <div className="text-center">
          <p className="text-xs tracking-[0.25em] text-orange-400 uppercase font-semibold mb-1">
            Stay Gold Gym — 診断結果
          </p>
        </div>

        {/* Result Card */}
        <div className={`bg-gradient-to-br ${accent.bg} rounded-3xl px-7 py-8 text-white text-center shadow-xl`}>
          <p className="text-sm font-medium opacity-75 mb-1">あなたは</p>
          <h1 className="text-2xl font-black mb-4">「{title}」</h1>
          <div className="bg-white/15 rounded-2xl px-4 py-3">
            <p className="text-sm font-bold leading-relaxed">{hook}</p>
          </div>
        </div>

        {/* Body messages */}
        <div className={`bg-slate-800/60 border ${accent.border} rounded-2xl p-6 flex flex-col gap-4`}>
          {body.map((line, i) => (
            <div key={i} className="flex gap-3">
              <span className={`text-xs font-black mt-1 shrink-0 ${accent.text}`}>▶</span>
              <p className="text-slate-200 leading-relaxed text-sm">{line}</p>
            </div>
          ))}
        </div>

        {/* 7日間プログラム内容 */}
        <div className="bg-slate-800/60 border border-slate-700/50 rounded-2xl p-5">
          <p className={`font-black text-xs mb-4 ${accent.text} tracking-widest uppercase`}>
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

        {/* バリュースタック */}
        <div className="bg-slate-800/60 border border-slate-700/50 rounded-2xl overflow-hidden">
          <div className="px-5 py-4 border-b border-slate-700/50">
            <p className="text-white font-black text-sm">
              LINE登録で全部もらえます
            </p>
            <p className="text-slate-500 text-xs mt-0.5">登録無料・すべて無料特典</p>
          </div>

          {/* 7日間プログラム（メイン特典） */}
          <div className="px-5 py-4 border-b border-slate-700/30 bg-slate-700/40">
            <div className="flex items-start gap-3">
              <svg viewBox="0 0 20 20" fill="currentColor" className={`w-5 h-5 ${accent.text} shrink-0 mt-0.5`}>
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-0.5">
                  <p className="text-white font-black text-sm">あなた専用7日間ダンスプログラム</p>
                  <span className="text-xs px-1.5 py-0.5 rounded font-bold bg-orange-500 text-white">メイン</span>
                </div>
                <p className="text-slate-300 text-xs">タイプ別に設計。毎朝1本届く</p>
              </div>
            </div>
          </div>

          {/* その他の特典 */}
          {bonuses.map((b, i) => (
            <div
              key={i}
              className={`px-5 py-4 flex items-start gap-3 ${
                i < bonuses.length - 1 ? "border-b border-slate-700/30" : ""
              }`}
            >
              <svg viewBox="0 0 20 20" fill="currentColor" className={`w-5 h-5 ${accent.text} shrink-0 mt-0.5`}>
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-0.5 flex-wrap">
                  <p className={`font-bold text-sm ${b.highlight ? "text-orange-300" : "text-white"}`}>
                    {b.label}
                  </p>
                  <span className={`text-xs px-1.5 py-0.5 rounded font-bold ${
                    b.highlight
                      ? "bg-orange-500 text-white"
                      : "bg-slate-600 text-slate-200"
                  }`}>
                    {b.tag}
                  </span>
                </div>
                <p className="text-slate-300 text-xs">{b.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* エルメ流入ボタン */}
        <div className="flex flex-col gap-2">
          <a
            href={elmeUrl}
            className={`block w-full text-center bg-gradient-to-r ${accent.bg} text-white font-black text-base px-6 py-5 rounded-2xl shadow-lg active:scale-95 transition-all`}
          >
            {cta} →
          </a>
          <p className="text-center text-slate-600 text-xs">
            LINEで受け取る · 登録無料 · いつでも退会OK
          </p>
        </div>

      </div>
    </main>
  );
}

export function generateStaticParams() {
  return validTypes.map((type) => ({ type }));
}
