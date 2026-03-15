import { typeMessages, DiagnosisType } from "@/lib/diagnosis";
import { notFound } from "next/navigation";

const validTypes: DiagnosisType[] = ["first_step", "food_reset", "time_hack", "switch_on"];

// ▼ エルメの流入URL（診断ツール用・共通1つ）
// エルメ側で「あなたのタイプを教えてください」と聞いてタグ分岐する
const ELME_URL = "https://line.me/R/ti/p/xxxx"; // ← ここにエルメの流入URLを設定

const typeAccent: Record<DiagnosisType, { bg: string; text: string; border: string; badge: string }> = {
  first_step: {
    bg: "from-violet-600 to-purple-500",
    text: "text-violet-400",
    border: "border-violet-500/30",
    badge: "bg-violet-500/10 text-violet-300",
  },
  food_reset: {
    bg: "from-orange-500 to-amber-400",
    text: "text-orange-400",
    border: "border-orange-500/30",
    badge: "bg-orange-500/10 text-orange-300",
  },
  time_hack: {
    bg: "from-blue-500 to-cyan-400",
    text: "text-blue-400",
    border: "border-blue-500/30",
    badge: "bg-blue-500/10 text-blue-300",
  },
  switch_on: {
    bg: "from-rose-500 to-pink-400",
    text: "text-rose-400",
    border: "border-rose-500/30",
    badge: "bg-rose-500/10 text-rose-300",
  },
};

const bonuses = [
  {
    label: "あなた専用ダイエットタイプ別ガイド",
    desc: "タイプに合った戦略・今日からできるアクション・3ヶ月後のイメージ",
    tag: "PDF",
    highlight: true,
  },
  {
    label: "コンビニおすすめ食材ガイド",
    desc: "コンビニで買えるダイエット食材をまとめたリスト",
    tag: "PDF",
  },
  {
    label: "もう体型に困らないダイエットの教科書",
    desc: "正しい知識をわかりやすく解説。これだけで食事の考え方が変わる",
    tag: "PDF",
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
  const elmeUrl = ELME_URL;

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

        {/* 特典一覧 */}
        <div className="bg-slate-800/60 border border-slate-700/50 rounded-2xl overflow-hidden">
          <div className="px-5 py-4 border-b border-slate-700/50">
            <p className="text-white font-black text-sm">
              LINEで受け取れる無料特典
            </p>
            <p className="text-slate-500 text-xs mt-0.5">登録無料・すべて無料・いつでも退会OK</p>
          </div>

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
