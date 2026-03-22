import { typeMessages, DiagnosisType, validTypes, typeLabels } from "@/lib/diagnosis";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

const ELME_URL = process.env.NEXT_PUBLIC_LINE_ADD_URL || "#";

/* タイプ別カラー */
const typeAccent: Record<DiagnosisType, { gradient: string; text: string; bg: string; border: string; badge: string; btn: string; btnHover: string }> = {
  gaman: {
    gradient: "from-orange-500 to-amber-400",
    text: "text-orange-600",
    bg: "bg-orange-50",
    border: "border-orange-200",
    badge: "bg-orange-100 text-orange-700",
    btn: "bg-orange-500 hover:bg-orange-600",
    btnHover: "bg-orange-600",
  },
  info: {
    gradient: "from-teal-500 to-emerald-400",
    text: "text-teal-600",
    bg: "bg-teal-50",
    border: "border-teal-200",
    badge: "bg-teal-100 text-teal-700",
    btn: "bg-teal-500 hover:bg-teal-600",
    btnHover: "bg-teal-600",
  },
  perfect: {
    gradient: "from-violet-500 to-purple-400",
    text: "text-violet-600",
    bg: "bg-violet-50",
    border: "border-violet-200",
    badge: "bg-violet-100 text-violet-700",
    btn: "bg-violet-500 hover:bg-violet-600",
    btnHover: "bg-violet-600",
  },
  busy: {
    gradient: "from-blue-500 to-sky-400",
    text: "text-blue-600",
    bg: "bg-blue-50",
    border: "border-blue-200",
    badge: "bg-blue-100 text-blue-700",
    btn: "bg-blue-500 hover:bg-blue-600",
    btnHover: "bg-blue-600",
  },
  rebound: {
    gradient: "from-rose-500 to-pink-400",
    text: "text-rose-600",
    bg: "bg-rose-50",
    border: "border-rose-200",
    badge: "bg-rose-100 text-rose-700",
    btn: "bg-rose-500 hover:bg-rose-600",
    btnHover: "bg-rose-600",
  },
};

/* 画像プレースホルダー提案 */
const typeImageHint: Record<DiagnosisType, string> = {
  gaman: "コンビニの棚の前で笑顔で食材を選んでいる女性のイラスト",
  info: "スマホを置いて深呼吸している女性。周りに散らばった情報が消えていくイメージ",
  perfect: "ゆるく伸びをしている女性のイラスト。「3割でOK」の吹き出し付き",
  busy: "忙しい合間にイヤホンで音楽を聴きながら軽く体を動かしている女性",
  rebound: "鏡の前で笑顔の自分を見ている女性。過去の自分が背景にぼんやり見える構図",
};

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
  {
    label: "ダイエットの教科書",
    desc: "知ってるだけで食事の考え方が変わる。コツをギュッとまとめました",
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
  const msg = typeMessages[dt];
  const c = typeAccent[dt];
  const imageHint = typeImageHint[dt];
  const elmeUrl = ELME_URL;

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-md mx-auto">

        {/* ━━━ Section 1: ファーストビュー（結果カード） ━━━ */}
        <section className={`relative bg-gradient-to-br ${c.gradient} px-6 pt-10 pb-6 text-white text-center overflow-hidden`}>
          <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/3" />

          <p className="relative text-xs opacity-70 tracking-widest mb-4">あなたの診断結果</p>
          <h1 className="relative text-3xl font-black mb-1">「{msg.title}」</h1>
          <p className="relative text-sm opacity-80 mb-5">{msg.subtitle}</p>

          {/* 画像プレースホルダー */}
          <div className="relative bg-white/15 rounded-2xl p-6 mb-4 min-h-[100px] flex flex-col items-center justify-center">
            <p className="text-xs text-white/50 leading-relaxed text-center">
              {imageHint}
            </p>
          </div>

          <div className="relative bg-white/20 rounded-xl px-4 py-3">
            <p className="text-[11px] opacity-70 mb-0.5">あなたに合うのは</p>
            <p className="text-base font-black">{msg.program}</p>
          </div>
        </section>

        <div className="px-4 flex flex-col gap-5 py-6">

          {/* ━━━ Section 2: 悩み共感（hook） ━━━ */}
          <section className={`${c.bg} border ${c.border} rounded-2xl p-6 text-center`}>
            <p className={`${c.text} font-bold leading-relaxed text-base`}>
              {msg.hook}
            </p>
          </section>

          {/* ━━━ Section 3: 原因の提示 ━━━ */}
          <section className="bg-white border border-gray-200 rounded-2xl p-5">
            <span className={`inline-block text-[11px] font-bold px-2.5 py-1 rounded-full ${c.badge} mb-3`}>
              なぜ続かなかったのか
            </span>
            <p className="text-gray-800 leading-relaxed text-sm">
              {msg.body[0]}
            </p>
          </section>

          {/* ━━━ Section 4: 解決策の提示 ━━━ */}
          <section className="bg-white border border-gray-200 rounded-2xl p-5">
            <span className={`inline-block text-[11px] font-bold px-2.5 py-1 rounded-full ${c.badge} mb-3`}>
              あなたの場合はこうすればいい
            </span>
            <p className="text-gray-800 leading-relaxed text-sm">
              {msg.body[1]}
            </p>
          </section>

          {/* ━━━ Section 5: 核心メッセージ ━━━ */}
          <section className={`${c.bg} border-2 ${c.border} rounded-2xl p-6 text-center`}>
            <span className={`inline-block text-[11px] font-bold px-2.5 py-1 rounded-full ${c.badge} mb-3`}>
              唯一の必勝法
            </span>
            <p className="text-gray-900 font-bold leading-relaxed text-base">
              {msg.body[2]}
            </p>
          </section>

          {/* ━━━ Section 6: 他との違い ━━━ */}
          <section className="bg-white border border-gray-200 rounded-2xl p-5">
            <p className="text-gray-900 font-bold text-sm mb-4">普通のダイエットとの違い</p>
            <div className="flex flex-col gap-3">
              <div className="flex gap-3">
                <span className="text-gray-400 text-lg shrink-0 mt-0.5">✕</span>
                <div>
                  <p className="text-gray-400 text-sm font-bold">よくあるダイエット</p>
                  <p className="text-gray-400 text-xs mt-0.5">我慢する → 限界が来る → リバウンド</p>
                </div>
              </div>
              <div className="h-px bg-gray-100" />
              <div className="flex gap-3">
                <span className={`${c.text} text-lg shrink-0 mt-0.5`}>◎</span>
                <div>
                  <p className={`${c.text} text-sm font-bold`}>STAY GOLDのアプローチ</p>
                  <p className="text-gray-700 text-xs mt-0.5">
                    楽しいから続く → 続くから変わる → 自走できる体になる
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* ━━━ Section 7: 信頼の根拠（プロフィール） ━━━ */}
          <section className="bg-white border border-gray-200 rounded-2xl p-5">
            <div className="flex items-center gap-4 mb-4">
              <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${c.gradient} flex items-center justify-center shrink-0`}>
                <svg viewBox="0 0 60 80" fill="none" className="w-8 h-10">
                  <circle cx="30" cy="18" r="12" fill="white" opacity="0.9" />
                  <path d="M10 45 Q30 38 50 45 L52 75 H8 Z" fill="white" opacity="0.9" />
                </svg>
              </div>
              <div>
                <p className="font-black text-gray-900">ゆうじ</p>
                <p className={`text-xs ${c.text} font-semibold`}>STAY GOLD GYM / 大阪 天王寺</p>
              </div>
            </div>
            <p className="text-gray-600 text-xs leading-relaxed">
              パーソナルトレーナー。科学的な筋トレ × 選択理論心理学ベースのコーチングで、
              「自分で自分の体をコントロールできる状態」を作るサポートをしています。
              我慢ではなく「楽しさ」で体が変わる仕組みを設計するのが得意です。
            </p>
          </section>

          {/* ━━━ Section 8: ぼかしエリア（具体的な予告） ━━━ */}
          <div className="relative">
            <div className="blur-[2px] select-none pointer-events-none" aria-hidden="true">
              {/* body[3] */}
              <div className={`bg-white border ${c.border} rounded-2xl p-5 mb-3`}>
                <span className={`inline-block text-[11px] font-bold px-2.5 py-1 rounded-full ${c.badge} mb-2`}>YOUR NEXT STEP</span>
                <p className="text-gray-800 text-sm leading-relaxed">{msg.body[3]}</p>
              </div>
              {/* 7日間チャレンジ */}
              <div className="bg-white border border-gray-200 rounded-2xl p-5 mb-3">
                <p className={`text-xs font-bold ${c.text} mb-3`}>7日間チャレンジの内容</p>
                {[
                  "まずはここから。今日だけやればOKなアクション",
                  "食事を変える最初のステップ",
                  "体が変わり始めるサインの見つけ方",
                  "モチベーションが落ちたときの対処法",
                  "3日目を超えた人だけが手に入れるもの",
                  "あなたのタイプ専用のアドバイス",
                  "7日間を終えた自分へ——次のステップ",
                ].map((t, i) => (
                  <div key={i} className="flex items-center gap-3 mb-2.5">
                    <span className={`text-[11px] font-bold ${c.text} w-8 shrink-0`}>Day{i + 1}</span>
                    <p className="text-gray-700 text-sm">{t}</p>
                  </div>
                ))}
              </div>
              {/* タイプ別アドバイス */}
              <div className="bg-white border border-gray-200 rounded-2xl p-5">
                <p className={`text-xs font-bold ${c.text} mb-2`}>あなたの「つまずきポイント」と乗り越え方</p>
                <p className="text-gray-700 text-sm">このタイプに共通する「やめてしまうきっかけ」とその具体的な対処法を、実際の事例をもとにまとめました。</p>
              </div>
            </div>
            {/* グラデーション */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gray-50/60 to-gray-50 flex items-end justify-center pb-5">
              <div className="text-center">
                <p className="text-gray-800 text-sm font-bold mb-1">
                  ここから先は、LINEで無料でお届けします
                </p>
                <p className="text-gray-400 text-xs">
                  あなた専用のアドバイス + 3つの無料特典つき
                </p>
              </div>
            </div>
          </div>

          {/* ━━━ Section 9: 特典一覧 ━━━ */}
          <section className="bg-white border border-gray-200 rounded-2xl overflow-hidden">
            <div className="px-5 py-4 border-b border-gray-100">
              <p className="text-gray-900 font-bold text-sm">LINE登録で受け取れる無料特典</p>
              <p className="text-gray-400 text-[11px] mt-0.5">登録無料 / いつでも退会OK</p>
            </div>
            {bonuses.map((b, i) => (
              <div key={i} className={`px-5 py-4 flex items-start gap-3 ${i < bonuses.length - 1 ? "border-b border-gray-100" : ""}`}>
                <svg viewBox="0 0 20 20" fill="currentColor" className={`w-5 h-5 ${c.text} shrink-0 mt-0.5`}>
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
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
          </section>

          {/* ━━━ Section 10: CTA前メッセージ ━━━ */}
          <section className="text-center px-2 pt-2">
            <p className="text-gray-700 text-sm leading-relaxed">
              ここまで診断を受けて、<br />
              「変わりたい」と感じている自分がいるはず。
            </p>
            <p className="text-gray-500 text-xs mt-3 leading-relaxed">
              その気持ちが一番あたたかい今のうちに、<br />
              自分のために、受け取ってあげてください。
            </p>
          </section>

          {/* ━━━ Section 11: CTA ━━━ */}
          <section className="flex flex-col gap-2 pb-6">
            <a
              href={elmeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`block w-full text-center ${c.btn} text-white font-bold text-base px-6 py-5 rounded-2xl shadow-lg active:scale-[0.98] transition-all`}
            >
              {msg.cta}
            </a>
            <p className="text-center text-gray-400 text-[11px]">
              登録無料 · いつでも退会OK · 売り込みなし
            </p>
          </section>

        </div>
      </div>
    </main>
  );
}

export function generateStaticParams() {
  return validTypes.map((type) => ({ type }));
}
