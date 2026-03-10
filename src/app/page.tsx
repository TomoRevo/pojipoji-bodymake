import Link from "next/link";

const LINE_ADD_URL = process.env.NEXT_PUBLIC_LINE_ADD_URL ?? "#";

const benefits = [
  { emoji: "🎯", title: "ダイエットタイプ診断", desc: "30秒5問。あなたに合うやり方がわかる" },
  { emoji: "💃", title: "あなた専用7日間プログラム", desc: "タイプ別ダンス動画を毎朝お届け" },
  { emoji: "🥗", title: "食事アドバイス", desc: "食事制限なし。コンビニで使えるコツ" },
  { emoji: "📞", title: "無料オンライン個別相談", desc: "7日間完走者限定。売り込みなし" },
];

const points = [
  { icon: "⏱", text: "1日3〜5分でOK" },
  { icon: "🦵", text: "関節に優しい・痛みなし" },
  { icon: "🔰", text: "運動が苦手な初心者向け" },
  { icon: "😊", text: "楽しく続けられる" },
];

export default function HomePage() {
  return (
    <main className="min-h-screen bg-white">

      {/* Hero */}
      <section className="bg-gradient-to-b from-pink-500 to-rose-400 text-white px-5 pt-14 pb-12 text-center">
        <p className="text-sm font-semibold tracking-widest opacity-80 mb-3">
          STAY GOLD GYM
        </p>
        <h1 className="text-3xl font-bold leading-tight mb-4">
          楽しく踊るだけで
          <br />
          <span className="text-yellow-300">気づいたら痩せてた</span>
        </h1>
        <p className="text-sm opacity-90 leading-relaxed mb-8">
          30〜50代女性向け。関節に優しい・初心者OK
          <br />
          1日3分のダイエットダンスプログラム
        </p>

        <a
          href={LINE_ADD_URL}
          className="inline-block bg-green-400 hover:bg-green-300 active:scale-95 text-white font-bold text-lg px-8 py-4 rounded-full shadow-lg transition-all duration-150"
        >
          LINEで無料登録する
        </a>
        <p className="text-xs opacity-70 mt-3">登録無料・30秒で完了</p>
      </section>

      {/* What you get */}
      <section className="px-5 py-12 bg-pink-50">
        <h2 className="text-center text-xl font-bold text-gray-800 mb-6">
          LINE登録で受け取れるもの
        </h2>
        <div className="flex flex-col gap-4 max-w-md mx-auto">
          {benefits.map((b, i) => (
            <div key={i} className="bg-white rounded-2xl p-5 flex items-start gap-4 shadow-sm">
              <span className="text-3xl">{b.emoji}</span>
              <div>
                <p className="font-bold text-gray-800">{b.title}</p>
                <p className="text-sm text-gray-500 mt-0.5">{b.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Points */}
      <section className="px-5 py-12">
        <h2 className="text-center text-xl font-bold text-gray-800 mb-6">
          このプログラムの特徴
        </h2>
        <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
          {points.map((p, i) => (
            <div key={i} className="bg-pink-50 rounded-2xl p-5 text-center">
              <p className="text-3xl mb-2">{p.icon}</p>
              <p className="text-sm font-semibold text-gray-700">{p.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* For who */}
      <section className="px-5 py-10 bg-gray-50">
        <div className="max-w-md mx-auto">
          <h2 className="text-xl font-bold text-gray-800 mb-5 text-center">
            こんな方におすすめ
          </h2>
          <ul className="space-y-3">
            {[
              "運動が苦手・続いたことがない",
              "忙しくてジムに通えない",
              "食事制限は絶対ムリ",
              "何度もダイエットに挫折してきた",
              "楽しく痩せたい",
            ].map((item, i) => (
              <li key={i} className="flex items-center gap-3 text-gray-700">
                <span className="text-pink-500 text-lg">✓</span>
                <span className="text-sm">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Profile */}
      <section className="px-5 py-12 bg-white">
        <div className="max-w-md mx-auto text-center">
          <div className="w-20 h-20 bg-pink-100 rounded-full mx-auto mb-4 flex items-center justify-center text-3xl">
            💪
          </div>
          <p className="font-bold text-gray-800 text-lg">ゆうじ</p>
          <p className="text-sm text-gray-500 mt-1">STAY GOLD GYM / 大阪 天王寺</p>
          <p className="text-sm text-gray-600 mt-4 leading-relaxed">
            大阪天王寺でパーソナルジムを運営。
            「楽しみながら痩せる」をテーマにダイエットダンスを発信中。
            Instagramフォロワー約2,000人、リール最高20万再生。
          </p>
        </div>
      </section>

      {/* CTA Bottom */}
      <section className="px-5 py-12 bg-gradient-to-b from-pink-500 to-rose-500 text-white text-center">
        <h2 className="text-2xl font-bold mb-2">
          まず診断してみてください
        </h2>
        <p className="text-sm opacity-80 mb-6">
          あなたに合う方法が30秒でわかります
        </p>
        <a
          href={LINE_ADD_URL}
          className="inline-block bg-white text-pink-500 font-bold text-lg px-8 py-4 rounded-full shadow-lg active:scale-95 transition-all"
        >
          LINEで無料登録する
        </a>
        <p className="text-xs opacity-60 mt-3">登録無料 · いつでも退会OK</p>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-gray-400 text-center text-xs py-6">
        <p>© 2026 STAY GOLD GYM</p>
        <div className="flex justify-center gap-4 mt-2">
          <Link href="/privacy" className="hover:text-white">プライバシーポリシー</Link>
          <Link href="/terms" className="hover:text-white">利用規約</Link>
        </div>
      </footer>
    </main>
  );
}
