import Link from "next/link";
import DancerSVG from "@/components/DancerSVG";

const LINE_ADD_URL = process.env.NEXT_PUBLIC_LINE_ADD_URL ?? "#";

const benefits = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-7 h-7" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" />
      </svg>
    ),
    title: "ダイエットタイプ診断",
    desc: "30秒5問。あなたに合うやり方がわかる",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-7 h-7" stroke="currentColor" strokeWidth="2">
        <path d="M9 19V6l12-3v13M9 19c0 1.1-.9 2-2 2s-2-.9-2-2 .9-2 2-2 2 .9 2 2zm12-3c0 1.1-.9 2-2 2s-2-.9-2-2 .9-2 2-2 2 .9 2 2z" />
      </svg>
    ),
    title: "あなた専用7日間プログラム",
    desc: "タイプ別ダンス動画を毎朝お届け",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-7 h-7" stroke="currentColor" strokeWidth="2">
        <path d="M3 3h18v4H3zM3 10h18v4H3zM3 17h18v4H3z" opacity="0.3" /><path d="M8 5h8M8 12h5M8 19h11" />
      </svg>
    ),
    title: "食事アドバイス",
    desc: "食事制限なし。コンビニで使えるコツ",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-7 h-7" stroke="currentColor" strokeWidth="2">
        <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
      </svg>
    ),
    title: "無料オンライン個別相談",
    desc: "7日間完走者限定。売り込みなし",
  },
];

const points = [
  { label: "1日3〜5分", sub: "スキマ時間でOK" },
  { label: "関節に優しい", sub: "痛みなし・怪我なし" },
  { label: "初心者向け", sub: "運動歴ゼロでも大丈夫" },
  { label: "楽しく続く", sub: "踊るから飽きない" },
];

export default function HomePage() {
  return (
    <main className="min-h-screen bg-slate-900 text-white">

      {/* Hero */}
      <section className="relative overflow-hidden px-5 pt-16 pb-0 min-h-[90vh] flex flex-col">

        {/* 背景スポットライト */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-orange-500 rounded-full blur-[140px] opacity-10" />
          <div className="absolute top-20 left-10 w-48 h-48 bg-amber-400 rounded-full blur-[100px] opacity-8" />
        </div>

        <div className="relative z-10 max-w-md mx-auto w-full flex flex-col items-center text-center">
          <p className="text-xs tracking-[0.3em] text-orange-400 font-semibold uppercase mb-6">
            Stay Gold Gym — Dance Diet
          </p>

          <h1 className="text-4xl font-black leading-tight mb-4">
            踊るだけで
            <br />
            <span className="shimmer-text">気づいたら痩せてた</span>
          </h1>

          <p className="text-slate-400 text-sm leading-relaxed mb-8 max-w-xs">
            30〜50代女性向け。関節に優しい、初心者OK
            <br />
            1日3分のダイエットダンスプログラム
          </p>

          <a
            href={LINE_ADD_URL}
            className="glow-btn inline-block bg-gradient-to-r from-orange-500 to-amber-400 text-slate-900 font-black text-base px-8 py-4 rounded-full active:scale-95 transition-all duration-150 mb-3"
          >
            LINEで無料登録する
          </a>
          <p className="text-slate-500 text-xs">登録無料 · 30秒で完了</p>
        </div>

        {/* ダンサーイラスト */}
        <div className="relative z-10 max-w-md mx-auto w-full flex justify-center mt-6">
          <DancerSVG className="float w-48 h-auto drop-shadow-[0_0_30px_rgba(249,115,22,0.4)]" />
        </div>
      </section>

      {/* 区切り */}
      <div className="h-px bg-gradient-to-r from-transparent via-orange-500/30 to-transparent mx-5" />

      {/* What you get */}
      <section className="px-5 py-14">
        <div className="max-w-md mx-auto">
          <p className="text-xs tracking-[0.25em] text-orange-400 uppercase font-semibold mb-2">Benefits</p>
          <h2 className="text-2xl font-black text-white mb-8">
            LINE登録で受け取れるもの
          </h2>
          <div className="flex flex-col gap-3">
            {benefits.map((b, i) => (
              <div
                key={i}
                className="flex items-start gap-4 bg-slate-800/60 border border-slate-700/50 rounded-2xl p-5 backdrop-blur-sm"
              >
                <span className="text-orange-400 mt-0.5 shrink-0">{b.icon}</span>
                <div>
                  <p className="font-bold text-white text-sm">{b.title}</p>
                  <p className="text-slate-400 text-xs mt-1">{b.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Points */}
      <section className="px-5 py-10 bg-slate-800/40">
        <div className="max-w-md mx-auto">
          <p className="text-xs tracking-[0.25em] text-orange-400 uppercase font-semibold mb-2">Features</p>
          <h2 className="text-2xl font-black text-white mb-7">
            このプログラムの特徴
          </h2>
          <div className="grid grid-cols-2 gap-3">
            {points.map((p, i) => (
              <div
                key={i}
                className="bg-slate-800 border border-orange-500/20 rounded-2xl p-5"
              >
                <div className="w-1 h-6 bg-gradient-to-b from-orange-400 to-amber-500 rounded-full mb-3" />
                <p className="font-black text-white text-sm">{p.label}</p>
                <p className="text-slate-400 text-xs mt-1">{p.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* For who */}
      <section className="px-5 py-14">
        <div className="max-w-md mx-auto">
          <p className="text-xs tracking-[0.25em] text-orange-400 uppercase font-semibold mb-2">For you if...</p>
          <h2 className="text-2xl font-black text-white mb-7">
            こんな方におすすめ
          </h2>
          <ul className="space-y-4">
            {[
              "運動が苦手・続いたことがない",
              "忙しくてジムに通えない",
              "食事制限は絶対ムリ",
              "何度もダイエットに挫折してきた",
              "楽しく痩せたい",
            ].map((item, i) => (
              <li key={i} className="flex items-center gap-4">
                <span className="w-6 h-6 rounded-full bg-orange-500/20 border border-orange-500/40 flex items-center justify-center shrink-0">
                  <svg viewBox="0 0 12 12" className="w-3 h-3 text-orange-400" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <polyline points="2,6 5,9 10,3" />
                  </svg>
                </span>
                <span className="text-slate-300 text-sm">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Profile */}
      <section className="px-5 py-12 bg-slate-800/40">
        <div className="max-w-md mx-auto">
          <p className="text-xs tracking-[0.25em] text-orange-400 uppercase font-semibold mb-6">Trainer</p>
          <div className="flex items-center gap-5">
            {/* アバター */}
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-orange-500 to-amber-400 flex items-center justify-center shrink-0">
              <svg viewBox="0 0 60 80" fill="none" className="w-10 h-14">
                <circle cx="30" cy="18" r="12" fill="white" opacity="0.9" />
                <path d="M10 45 Q30 38 50 45 L52 75 H8 Z" fill="white" opacity="0.9" />
              </svg>
            </div>
            <div>
              <p className="font-black text-white text-xl">ゆうじ</p>
              <p className="text-orange-400 text-xs mt-1 font-semibold">STAY GOLD GYM / 大阪 天王寺</p>
              <p className="text-slate-400 text-xs mt-2 leading-relaxed">
                「楽しみながら痩せる」をテーマに発信。
                Instagram最高20万再生。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Bottom */}
      <section className="relative px-5 py-16 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-orange-500 rounded-full blur-[120px] opacity-10" />
        </div>
        <div className="relative z-10 max-w-md mx-auto text-center">
          <p className="text-xs tracking-[0.25em] text-orange-400 uppercase font-semibold mb-3">Free Program</p>
          <h2 className="text-2xl font-black text-white mb-2">
            まず診断してみてください
          </h2>
          <p className="text-slate-400 text-sm mb-8">
            あなたに合う方法が30秒でわかります
          </p>
          <a
            href={LINE_ADD_URL}
            className="glow-btn inline-block bg-gradient-to-r from-orange-500 to-amber-400 text-slate-900 font-black text-base px-10 py-4 rounded-full active:scale-95 transition-all"
          >
            LINEで無料登録する
          </a>
          <p className="text-slate-600 text-xs mt-4">登録無料 · いつでも退会OK</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800 text-slate-600 text-center text-xs py-6 px-5">
        <p className="font-semibold text-slate-500 mb-2">STAY GOLD GYM</p>
        <p>© 2026 All rights reserved.</p>
        <div className="flex justify-center gap-5 mt-3">
          <Link href="/privacy" className="hover:text-orange-400 transition-colors">プライバシーポリシー</Link>
          <Link href="/terms" className="hover:text-orange-400 transition-colors">利用規約</Link>
        </div>
      </footer>
    </main>
  );
}
