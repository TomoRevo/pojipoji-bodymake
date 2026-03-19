import { typeMessages, DiagnosisType, validTypes, typeLabels } from "@/lib/diagnosis";
import { notFound } from "next/navigation";
import HamburgerMenu from "@/components/HamburgerMenu";
import type { Metadata } from "next";

const ELME_URL = process.env.NEXT_PUBLIC_LINE_ADD_URL || "#";

const typeAccent: Record<DiagnosisType, { bg: string; text: string; border: string; glow: string }> = {
  first_step: {
    bg: "from-violet-600 to-purple-500",
    text: "text-violet-400",
    border: "border-violet-500/30",
    glow: "shadow-violet-500/20",
  },
  food_reset: {
    bg: "from-orange-500 to-amber-400",
    text: "text-orange-400",
    border: "border-orange-500/30",
    glow: "shadow-orange-500/20",
  },
  time_hack: {
    bg: "from-blue-500 to-cyan-400",
    text: "text-blue-400",
    border: "border-blue-500/30",
    glow: "shadow-blue-500/20",
  },
  switch_on: {
    bg: "from-rose-500 to-pink-400",
    text: "text-rose-400",
    border: "border-rose-500/30",
    glow: "shadow-rose-500/20",
  },
};

/* タイプ別に入れるイラスト画像のプレースホルダー */
const typeIllustration: Record<DiagnosisType, { alt: string; emoji: string; prompt: string }> = {
  first_step: {
    alt: "最初の一歩を踏み出す女性",
    emoji: "🌱",
    prompt: "一歩目を踏み出す女性のシルエット。柔らかい光。紫×ネイビー背景。希望を感じるイラスト。16:9横長。",
  },
  food_reset: {
    alt: "ヘルシーな食事を楽しむ女性",
    emoji: "🥗",
    prompt: "おしゃれなカフェで健康的な食事を楽しむ女性。温かみのあるオレンジ系トーン。16:9横長。",
  },
  time_hack: {
    alt: "スキマ時間を活用する女性",
    emoji: "⏰",
    prompt: "朝の光の中、リビングで軽くストレッチする女性。時計が3分を指している。ブルー系トーン。16:9横長。",
  },
  switch_on: {
    alt: "スイッチが入った女性",
    emoji: "🔥",
    prompt: "鏡の前で自信に満ちた表情の女性。内側から光が溢れるようなイメージ。ローズ×ネイビー背景。16:9横長。",
  },
};

const bonuses = [
  {
    label: "あなた専用ダイエットタイプ別ガイド",
    desc: "あなたのタイプに合わせた、今日だけやればOKな具体アクション付き",
    tag: "PDF",
    highlight: true,
  },
  {
    label: "コンビニおすすめ食材ガイド",
    desc: "知ってるだけで「選び方」が変わる。コンビニで今日から使えるリスト",
    tag: "PDF",
  },
  {
    label: "もう体型に困らないダイエットの教科書",
    desc: "知ってるだけで「選び方」が変わる。食事のコツをギュッとまとめました",
    tag: "PDF",
  },
];

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
    title: `あなたは「${label}」｜STAY GOLD GYM 診断結果`,
    description: `あなたのダイエットタイプは「${label}」。タイプに合った方法で、楽しく体を変えていきましょう。`,
  };
}

export default async function ResultPage({ params }: Props) {
  const { type } = await params;

  if (!validTypes.includes(type as DiagnosisType)) {
    notFound();
  }

  const diagnosisType = type as DiagnosisType;
  const { title, hook, body, cta } = typeMessages[diagnosisType];
  const accent = typeAccent[diagnosisType];
  const illust = typeIllustration[diagnosisType];
  const elmeUrl = ELME_URL;

  return (
    <main className="min-h-screen bg-slate-900 text-white px-4 py-8">
      <HamburgerMenu />
      <div className="max-w-md mx-auto flex flex-col gap-6">

        {/* Header — 控えめに */}
        <p className="text-center text-xs tracking-[0.2em] text-slate-500 uppercase">
          診断結果
        </p>

        {/* Result Card — メイン */}
        <div className={`relative bg-gradient-to-br ${accent.bg} rounded-3xl px-7 pt-8 pb-6 text-white text-center shadow-2xl ${accent.glow} overflow-hidden`}>
          {/* 背景デコ */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />

          <p className="relative text-sm font-medium opacity-80 mb-1">あなたは</p>
          <h1 className="relative text-2xl font-black mb-2">「{title}」</h1>

          {/* イラスト枠 */}
          <div className="relative bg-white/10 rounded-2xl p-6 mb-4 flex flex-col items-center justify-center min-h-[120px]">
            <span className="text-5xl mb-2">{illust.emoji}</span>
            <p className="text-xs text-white/50">
              {/* TODO: ここに {illust.alt} の画像を配置 */}
              イメージ画像準備中
            </p>
          </div>

          <div className="relative bg-white/15 rounded-2xl px-4 py-3">
            <p className="text-sm font-bold leading-relaxed">{hook}</p>
          </div>
        </div>

        {/* Body Message 1 — 大きめカード */}
        <div className={`bg-slate-800/60 border ${accent.border} rounded-2xl p-6`}>
          <p className={`text-xs font-bold ${accent.text} mb-2 tracking-wider`}>POINT 1</p>
          <p className="text-slate-200 leading-relaxed text-sm">{body[0]}</p>
        </div>

        {/* イラスト挟み — 視覚的ブレイク */}
        <div className="flex items-center justify-center gap-3 py-2">
          <div className={`h-px flex-1 bg-gradient-to-r from-transparent ${accent.border.replace('border-', 'to-')}`} />
          <span className={`text-2xl`}>✨</span>
          <div className={`h-px flex-1 bg-gradient-to-l from-transparent ${accent.border.replace('border-', 'to-')}`} />
        </div>

        {/* Body Message 2 */}
        <div className={`bg-slate-800/60 border ${accent.border} rounded-2xl p-6`}>
          <p className={`text-xs font-bold ${accent.text} mb-2 tracking-wider`}>POINT 2</p>
          <p className="text-slate-200 leading-relaxed text-sm">{body[1]}</p>
        </div>

        {/* キーメッセージ — 必勝法カード（目立たせる） */}
        <div className={`bg-gradient-to-br from-slate-800 to-slate-800/80 border-2 ${accent.border} rounded-2xl p-6 text-center`}>
          <p className={`text-xs font-bold ${accent.text} mb-3 tracking-wider`}>POINT 3</p>
          <p className="text-white font-bold leading-relaxed text-base">{body[2]}</p>
        </div>

        {/* ぼかしエリア：body[3] */}
        <div className="relative">
          <div className="blur-[6px] select-none pointer-events-none" aria-hidden="true">
            <div className={`bg-slate-800/60 border ${accent.border} rounded-2xl p-6`}>
              <p className={`text-xs font-bold ${accent.text} mb-2 tracking-wider`}>YOUR NEXT STEP</p>
              <p className="text-slate-200 leading-relaxed text-sm">{body[3]}</p>
            </div>
          </div>
          <div className="absolute inset-0 bg-gradient-to-b from-slate-900/0 via-slate-900/80 to-slate-900 flex items-end justify-center pb-4">
            <p className="text-slate-300 text-sm font-bold text-center">
              あなた専用のアドバイスと特典を<br />LINEで無料でお届けします
            </p>
          </div>
        </div>

        {/* 特典一覧 */}
        <div className="bg-slate-800/60 border border-slate-700/50 rounded-2xl overflow-hidden">
          <div className="px-5 py-4 border-b border-slate-700/50">
            <p className="text-white font-black text-sm">
              LINE登録で受け取れる無料特典
            </p>
            <p className="text-slate-500 text-xs mt-0.5">登録無料 / すべて無料 / いつでも退会OK</p>
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

        {/* CTA */}
        <div className="flex flex-col gap-2 pt-2">
          <a
            href={elmeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`block w-full text-center bg-gradient-to-r ${accent.bg} text-white font-black text-base px-6 py-5 rounded-2xl shadow-lg ${accent.glow} shadow-xl active:scale-95 transition-all`}
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
