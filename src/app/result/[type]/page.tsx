import { typeMessages, DiagnosisType, validTypes, typeLabels } from "@/lib/diagnosis";
import { notFound } from "next/navigation";
import HamburgerMenu from "@/components/HamburgerMenu";
import type { Metadata } from "next";

const ELME_URL = process.env.NEXT_PUBLIC_LINE_ADD_URL || "#";

/* ペルソナ（30-50代女性）に合わせた温かいカラーパレット */
const typeAccent: Record<DiagnosisType, { bg: string; card: string; text: string; border: string; light: string; badge: string }> = {
  gaman: {
    bg: "from-orange-400 to-amber-300",
    card: "bg-orange-50",
    text: "text-orange-600",
    border: "border-orange-200",
    light: "bg-orange-50",
    badge: "bg-orange-100 text-orange-700",
  },
  info: {
    bg: "from-teal-400 to-emerald-300",
    card: "bg-teal-50",
    text: "text-teal-600",
    border: "border-teal-200",
    light: "bg-teal-50",
    badge: "bg-teal-100 text-teal-700",
  },
  perfect: {
    bg: "from-purple-400 to-violet-300",
    card: "bg-purple-50",
    text: "text-purple-600",
    border: "border-purple-200",
    light: "bg-purple-50",
    badge: "bg-purple-100 text-purple-700",
  },
  busy: {
    bg: "from-sky-400 to-blue-300",
    card: "bg-sky-50",
    text: "text-sky-600",
    border: "border-sky-200",
    light: "bg-sky-50",
    badge: "bg-sky-100 text-sky-700",
  },
  rebound: {
    bg: "from-rose-400 to-pink-300",
    card: "bg-rose-50",
    text: "text-rose-600",
    border: "border-rose-200",
    light: "bg-rose-50",
    badge: "bg-rose-100 text-rose-700",
  },
};

const typeEmoji: Record<DiagnosisType, string> = {
  gaman: "🍽️",
  info: "📱",
  perfect: "💎",
  busy: "⏰",
  rebound: "🔄",
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
    label: "ダイエットの教科書",
    desc: "知ってるだけで食事の考え方が変わる。コツをギュッとまとめました",
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
  if (!validTypes.includes(type as DiagnosisType)) notFound();

  const diagnosisType = type as DiagnosisType;
  const { title, subtitle, program, hook, body, cta } = typeMessages[diagnosisType];
  const accent = typeAccent[diagnosisType];
  const emoji = typeEmoji[diagnosisType];
  const elmeUrl = ELME_URL;

  return (
    <main className="min-h-screen bg-[#FBF8F4] px-4 py-8">
      <HamburgerMenu />
      <div className="max-w-md mx-auto flex flex-col gap-5">

        {/* Header */}
        <p className="text-center text-xs tracking-[0.15em] text-amber-600/50 font-medium">
          あなたの診断結果
        </p>

        {/* Result Card */}
        <div className={`relative bg-gradient-to-br ${accent.bg} rounded-3xl px-7 pt-8 pb-6 text-white text-center shadow-lg overflow-hidden`}>
          <div className="absolute top-0 right-0 w-28 h-28 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />

          <p className="relative text-sm font-medium opacity-80 mb-1">あなたは</p>
          <h1 className="relative text-2xl font-black mb-1">「{title}」</h1>
          <p className="relative text-sm font-medium opacity-75 mb-4">{subtitle}</p>

          {/* イラスト枠 */}
          <div className="relative bg-white/15 rounded-2xl p-5 mb-4 flex flex-col items-center min-h-[100px]">
            <span className="text-4xl mb-1">{emoji}</span>
            <p className="text-xs text-white/50">イメージ画像準備中</p>
          </div>

          {/* 専用プログラム名 */}
          <div className="relative bg-white/20 rounded-2xl px-4 py-3">
            <p className="text-xs opacity-70 mb-0.5">あなたに合うのは</p>
            <p className="text-base font-black">{program}</p>
          </div>
        </div>

        {/* Hook */}
        <div className={`${accent.card} border ${accent.border} rounded-2xl p-5 text-center`}>
          <p className={`${accent.text} font-bold leading-relaxed`}>{hook}</p>
        </div>

        {/* Body 1 */}
        <div className={`bg-white border ${accent.border} rounded-2xl p-5 shadow-sm`}>
          <span className={`inline-block text-xs font-bold px-2 py-0.5 rounded-full ${accent.badge} mb-2`}>POINT 1</span>
          <p className="text-amber-900/80 leading-relaxed text-sm">{body[0]}</p>
        </div>

        {/* 区切り */}
        <div className="flex items-center justify-center gap-3 py-1">
          <div className="h-px flex-1 bg-amber-200/60" />
          <span className="text-lg">✨</span>
          <div className="h-px flex-1 bg-amber-200/60" />
        </div>

        {/* Body 2 */}
        <div className={`bg-white border ${accent.border} rounded-2xl p-5 shadow-sm`}>
          <span className={`inline-block text-xs font-bold px-2 py-0.5 rounded-full ${accent.badge} mb-2`}>POINT 2</span>
          <p className="text-amber-900/80 leading-relaxed text-sm">{body[1]}</p>
        </div>

        {/* Body 3 — 必勝法（目立たせる） */}
        <div className={`${accent.card} border-2 ${accent.border} rounded-2xl p-5 text-center`}>
          <span className={`inline-block text-xs font-bold px-2 py-0.5 rounded-full ${accent.badge} mb-3`}>POINT 3</span>
          <p className="text-amber-950 font-bold leading-relaxed text-base">{body[2]}</p>
        </div>

        {/* ぼかしエリア */}
        <div className="relative">
          <div className="blur-[3px] select-none pointer-events-none" aria-hidden="true">
            <div className={`bg-white border ${accent.border} rounded-2xl p-5 mb-3 shadow-sm`}>
              <span className={`inline-block text-xs font-bold px-2 py-0.5 rounded-full ${accent.badge} mb-2`}>YOUR NEXT STEP</span>
              <p className="text-amber-900/80 leading-relaxed text-sm">{body[3]}</p>
            </div>
            <div className={`bg-white border ${accent.border} rounded-2xl p-5 mb-3 shadow-sm`}>
              <p className={`text-xs font-bold ${accent.text} mb-3`}>7日間チャレンジの内容</p>
              {["まずはここから。今日だけやればOKなアクション", "食事を変える最初のステップ", "体が変わり始めるサインの見つけ方", "モチベーションが落ちたときの対処法"].map((t, i) => (
                <div key={i} className="flex items-center gap-3 mb-2">
                  <span className={`text-xs font-bold ${accent.text}`}>Day{i + 1}</span>
                  <p className="text-amber-800/70 text-sm">{t}</p>
                </div>
              ))}
            </div>
            <div className={`bg-white border ${accent.border} rounded-2xl p-5 shadow-sm`}>
              <p className={`text-xs font-bold ${accent.text} mb-2`}>あなただけの特別アドバイス</p>
              <p className="text-amber-800/70 text-sm">このタイプに共通する「つまずきポイント」と、その乗り越え方をまとめました。</p>
            </div>
          </div>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#FBF8F4]/70 to-[#FBF8F4] flex items-end justify-center pb-6">
            <div className="text-center px-4">
              <p className="text-amber-900 text-sm font-bold mb-1">続きはLINEで無料でお届けします</p>
              <p className="text-amber-600/50 text-xs">あなた専用のアドバイス + 3大特典つき</p>
            </div>
          </div>
        </div>

        {/* 特典一覧 */}
        <div className="bg-white border border-amber-200/60 rounded-2xl overflow-hidden shadow-sm">
          <div className="px-5 py-4 border-b border-amber-100">
            <p className="text-amber-900 font-black text-sm">LINE登録で受け取れる無料特典</p>
            <p className="text-amber-500/60 text-xs mt-0.5">登録無料 / すべて無料 / いつでも退会OK</p>
          </div>
          {bonuses.map((b, i) => (
            <div key={i} className={`px-5 py-4 flex items-start gap-3 ${i < bonuses.length - 1 ? "border-b border-amber-100/60" : ""}`}>
              <svg viewBox="0 0 20 20" fill="currentColor" className={`w-5 h-5 ${accent.text} shrink-0 mt-0.5`}>
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-0.5 flex-wrap">
                  <p className={`font-bold text-sm ${b.highlight ? accent.text : "text-amber-900"}`}>{b.label}</p>
                  <span className={`text-xs px-1.5 py-0.5 rounded-full font-bold ${b.highlight ? accent.badge : "bg-amber-100 text-amber-600"}`}>{b.tag}</span>
                </div>
                <p className="text-amber-700/60 text-xs">{b.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA前のひと押し */}
        <div className="text-center px-4 pt-2">
          <p className="text-amber-800/80 text-sm leading-relaxed">
            ここまで読んでくれたあなたは、<br />もう「変わりたい」と感じているはず。
          </p>
          <p className="text-amber-600/50 text-xs mt-2 leading-relaxed">
            その気持ちが一番あたたかい今のうちに、<br />自分のために、受け取ってみてください。
          </p>
        </div>

        {/* CTA */}
        <div className="flex flex-col gap-2 pb-4">
          <a
            href={elmeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`block w-full text-center bg-gradient-to-r ${accent.bg} text-white font-bold text-base px-6 py-5 rounded-2xl shadow-lg active:scale-95 transition-all`}
          >
            {cta} →
          </a>
          <p className="text-center text-amber-500/40 text-xs">登録無料 · すべて無料 · いつでも退会OK</p>
        </div>

      </div>
    </main>
  );
}

export function generateStaticParams() {
  return validTypes.map((type) => ({ type }));
}
