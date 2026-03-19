import { typeMessages, DiagnosisType, validTypes, typeLabels } from "@/lib/diagnosis";
import { notFound } from "next/navigation";
import HamburgerMenu from "@/components/HamburgerMenu";
import type { Metadata } from "next";

const ELME_URL = process.env.NEXT_PUBLIC_LINE_ADD_URL || "#";

/* タイプ別カラー（白ベースで高コントラスト） */
const typeAccent: Record<DiagnosisType, { gradient: string; text: string; bg: string; border: string; badge: string; btn: string }> = {
  gaman: {
    gradient: "from-orange-500 to-amber-400",
    text: "text-orange-600",
    bg: "bg-orange-50",
    border: "border-orange-200",
    badge: "bg-orange-100 text-orange-700",
    btn: "bg-orange-500",
  },
  info: {
    gradient: "from-teal-500 to-emerald-400",
    text: "text-teal-600",
    bg: "bg-teal-50",
    border: "border-teal-200",
    badge: "bg-teal-100 text-teal-700",
    btn: "bg-teal-500",
  },
  perfect: {
    gradient: "from-violet-500 to-purple-400",
    text: "text-violet-600",
    bg: "bg-violet-50",
    border: "border-violet-200",
    badge: "bg-violet-100 text-violet-700",
    btn: "bg-violet-500",
  },
  busy: {
    gradient: "from-blue-500 to-sky-400",
    text: "text-blue-600",
    bg: "bg-blue-50",
    border: "border-blue-200",
    badge: "bg-blue-100 text-blue-700",
    btn: "bg-blue-500",
  },
  rebound: {
    gradient: "from-rose-500 to-pink-400",
    text: "text-rose-600",
    bg: "bg-rose-50",
    border: "border-rose-200",
    badge: "bg-rose-100 text-rose-700",
    btn: "bg-rose-500",
  },
};

const typeEmoji: Record<DiagnosisType, string> = {
  gaman: "🍽️", info: "📱", perfect: "💎", busy: "⏰", rebound: "🔄",
};

/* 特典（教科書はLINE登録後限定なのでここには含めない） */
const bonuses = [
  {
    label: "あなた専用タイプ別ガイド",
    desc: "あなたのタイプに合った具体アクションをまとめたPDF",
    tag: "タイプ別",
    highlight: true,
  },
  {
    label: "コンビニ食材おすすめリスト",
    desc: "今日の帰りから使える。選ぶだけでOKの食材ガイド",
    tag: "全員共通",
  },
];

interface Props { params: Promise<{ type: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { type } = await params;
  if (!validTypes.includes(type as DiagnosisType)) return { title: "ページが見つかりません" };
  const label = typeLabels[type as DiagnosisType];
  return {
    title: `あなたは「${label}」｜STAY GOLD GYM`,
    description: `あなたのダイエットタイプは「${label}」。タイプに合った方法で、楽しく体を変えていきましょう。`,
  };
}

export default async function ResultPage({ params }: Props) {
  const { type } = await params;
  if (!validTypes.includes(type as DiagnosisType)) notFound();

  const dt = type as DiagnosisType;
  const { title, subtitle, program, hook, body, cta } = typeMessages[dt];
  const c = typeAccent[dt];
  const emoji = typeEmoji[dt];
  const elmeUrl = ELME_URL;

  return (
    <main className="min-h-screen bg-white px-4 py-8">
      <HamburgerMenu />
      <div className="max-w-md mx-auto flex flex-col gap-5">

        <p className="text-center text-[11px] tracking-[0.15em] text-gray-400">あなたの診断結果</p>

        {/* Result Card */}
        <div className={`relative bg-gradient-to-br ${c.gradient} rounded-3xl px-6 pt-7 pb-5 text-white text-center shadow-md overflow-hidden`}>
          <div className="absolute top-0 right-0 w-28 h-28 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
          <p className="relative text-sm opacity-80 mb-1">あなたは</p>
          <h1 className="relative text-2xl font-black mb-0.5">「{title}」</h1>
          <p className="relative text-sm opacity-75 mb-4">{subtitle}</p>

          <div className="relative bg-white/15 rounded-2xl p-4 mb-3 flex flex-col items-center min-h-[80px]">
            <span className="text-4xl mb-1">{emoji}</span>
            <p className="text-[10px] text-white/40">イメージ画像準備中</p>
          </div>

          <div className="relative bg-white/20 rounded-xl px-4 py-2.5">
            <p className="text-[11px] opacity-70 mb-0.5">あなたに合うのは</p>
            <p className="text-[15px] font-black">{program}</p>
          </div>
        </div>

        {/* Hook */}
        <div className={`${c.bg} border ${c.border} rounded-2xl p-5 text-center`}>
          <p className={`${c.text} font-bold leading-relaxed text-[15px]`}>{hook}</p>
        </div>

        {/* Body 1 */}
        <div className={`bg-white border ${c.border} rounded-2xl p-5`}>
          <span className={`inline-block text-[11px] font-bold px-2 py-0.5 rounded-full ${c.badge} mb-2`}>POINT 1</span>
          <p className="text-gray-800 leading-relaxed text-sm">{body[0]}</p>
        </div>

        <div className="flex items-center gap-3 py-1">
          <div className="h-px flex-1 bg-gray-100" />
          <div className={`w-2 h-2 rounded-full ${c.btn}`} />
          <div className="h-px flex-1 bg-gray-100" />
        </div>

        {/* Body 2 */}
        <div className={`bg-white border ${c.border} rounded-2xl p-5`}>
          <span className={`inline-block text-[11px] font-bold px-2 py-0.5 rounded-full ${c.badge} mb-2`}>POINT 2</span>
          <p className="text-gray-800 leading-relaxed text-sm">{body[1]}</p>
        </div>

        {/* Body 3 */}
        <div className={`${c.bg} border-2 ${c.border} rounded-2xl p-5 text-center`}>
          <span className={`inline-block text-[11px] font-bold px-2 py-0.5 rounded-full ${c.badge} mb-3`}>POINT 3</span>
          <p className="text-gray-900 font-bold leading-relaxed text-[15px]">{body[2]}</p>
        </div>

        {/* ぼかし */}
        <div className="relative">
          <div className="blur-[3px] select-none pointer-events-none" aria-hidden="true">
            <div className={`bg-white border ${c.border} rounded-2xl p-5 mb-3`}>
              <span className={`inline-block text-[11px] font-bold px-2 py-0.5 rounded-full ${c.badge} mb-2`}>YOUR NEXT STEP</span>
              <p className="text-gray-800 text-sm">{body[3]}</p>
            </div>
            <div className={`bg-white border ${c.border} rounded-2xl p-5 mb-3`}>
              <p className={`text-[11px] font-bold ${c.text} mb-3`}>7日間チャレンジの内容</p>
              {["まずはここから。今日だけやればOKなアクション","食事を変える最初のステップ","体が変わり始めるサインの見つけ方","モチベーションが落ちたときの対処法"].map((t,i)=>(
                <div key={i} className="flex items-center gap-3 mb-2">
                  <span className={`text-[11px] font-bold ${c.text}`}>Day{i+1}</span>
                  <p className="text-gray-700 text-sm">{t}</p>
                </div>
              ))}
            </div>
            <div className={`bg-white border ${c.border} rounded-2xl p-5`}>
              <p className={`text-[11px] font-bold ${c.text} mb-2`}>あなただけの特別アドバイス</p>
              <p className="text-gray-700 text-sm">このタイプに共通する「つまずきポイント」と、その乗り越え方をまとめました。</p>
            </div>
          </div>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/70 to-white flex items-end justify-center pb-5">
            <div className="text-center">
              <p className="text-gray-900 text-sm font-bold mb-1">続きはLINEで無料でお届けします</p>
              <p className="text-gray-400 text-xs">あなた専用アドバイス + 無料特典つき</p>
            </div>
          </div>
        </div>

        {/* 特典 */}
        <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden">
          <div className="px-5 py-3.5 border-b border-gray-100">
            <p className="text-gray-900 font-bold text-sm">LINE登録で受け取れる無料特典</p>
            <p className="text-gray-400 text-[11px] mt-0.5">登録無料 / いつでも退会OK</p>
          </div>
          {bonuses.map((b,i)=>(
            <div key={i} className={`px-5 py-3.5 flex items-start gap-3 ${i<bonuses.length-1?"border-b border-gray-100":""}`}>
              <svg viewBox="0 0 20 20" fill="currentColor" className={`w-5 h-5 ${c.text} shrink-0 mt-0.5`}>
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
              </svg>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-0.5 flex-wrap">
                  <p className={`font-bold text-sm ${b.highlight ? c.text : "text-gray-900"}`}>{b.label}</p>
                  <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold ${b.highlight ? c.badge : "bg-gray-100 text-gray-500"}`}>{b.tag}</span>
                </div>
                <p className="text-gray-500 text-xs">{b.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA前 */}
        <div className="text-center px-4 pt-1">
          <p className="text-gray-700 text-sm leading-relaxed">
            ここまで読んでくれたあなたは、<br />もう「変わりたい」と感じているはず。
          </p>
          <p className="text-gray-400 text-xs mt-2 leading-relaxed">
            その気持ちが一番あたたかい今のうちに、<br />自分のために、受け取ってみてください。
          </p>
        </div>

        {/* CTA */}
        <div className="flex flex-col gap-2 pb-4">
          <a
            href={elmeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`block w-full text-center ${c.btn} text-white font-bold text-[15px] px-6 py-5 rounded-2xl shadow-md active:scale-[0.98] transition-all`}
          >
            {cta}
          </a>
          <p className="text-center text-gray-400 text-[11px]">登録無料 · いつでも退会OK</p>
        </div>

      </div>
    </main>
  );
}

export function generateStaticParams() {
  return validTypes.map((type) => ({ type }));
}
