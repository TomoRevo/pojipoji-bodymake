import { notFound } from "next/navigation";
import { DiagnosisType, typeLabels } from "@/lib/diagnosis";
import { guideContent } from "@/lib/guide";

const validTypes: DiagnosisType[] = ["beginner", "food", "busy", "serious"];

const typeEmoji: Record<DiagnosisType, string> = {
  beginner: "🌱",
  food: "🥗",
  busy: "⚡",
  serious: "🔥",
};

const typeGradient: Record<DiagnosisType, string> = {
  beginner: "from-emerald-500 to-green-400",
  food: "from-orange-500 to-amber-400",
  busy: "from-blue-500 to-cyan-400",
  serious: "from-pink-600 to-rose-500",
};

const typeAccent: Record<DiagnosisType, string> = {
  beginner: "text-emerald-600",
  food: "text-orange-500",
  busy: "text-blue-500",
  serious: "text-pink-600",
};

const typeBorder: Record<DiagnosisType, string> = {
  beginner: "border-emerald-200 bg-emerald-50",
  food: "border-orange-200 bg-orange-50",
  busy: "border-blue-200 bg-blue-50",
  serious: "border-pink-200 bg-pink-50",
};

interface Props {
  params: Promise<{ type: string }>;
}

export default async function GuidePage({ params }: Props) {
  const { type } = await params;

  if (!validTypes.includes(type as DiagnosisType)) {
    notFound();
  }

  const diagnosisType = type as DiagnosisType;
  const guide = guideContent[diagnosisType];
  const emoji = typeEmoji[diagnosisType];
  const gradient = typeGradient[diagnosisType];
  const accent = typeAccent[diagnosisType];
  const border = typeBorder[diagnosisType];

  return (
    <main className="min-h-screen bg-gray-50">

      {/* Hero */}
      <section className={`bg-gradient-to-br ${gradient} text-white px-5 pt-12 pb-10`}>
        <div className="max-w-md mx-auto">
          <p className="text-sm font-semibold opacity-80 tracking-wider mb-3">
            STAY GOLD GYM
          </p>
          <div className="flex items-center gap-3 mb-2">
            <span className="text-4xl">{emoji}</span>
            <div>
              <p className="text-sm opacity-80">あなたは</p>
              <h1 className="text-2xl font-bold">
                「{typeLabels[diagnosisType]}」
              </h1>
            </div>
          </div>
          <p className="text-sm opacity-90 leading-relaxed mt-4 font-medium">
            {guide.headline}
          </p>
        </div>
      </section>

      <div className="max-w-md mx-auto px-4 py-8 flex flex-col gap-6">

        {/* Intro */}
        <div className={`rounded-2xl border p-5 ${border}`}>
          <p className="text-sm text-gray-700 leading-relaxed">{guide.intro}</p>
        </div>

        {/* 7日間プログラム */}
        <div>
          <h2 className="text-lg font-bold text-gray-800 mb-4">
            📅 あなた専用7日間プログラム
          </h2>
          <div className="flex flex-col gap-4">
            {guide.days.map((d) => (
              <div key={d.day} className="bg-white rounded-2xl shadow-sm overflow-hidden">
                {/* Day header */}
                <div className={`px-5 py-3 flex items-center gap-3 bg-gradient-to-r ${gradient}`}>
                  <span className="text-white font-black text-sm opacity-90">
                    DAY {d.day}
                  </span>
                  <h3 className="text-white font-bold text-sm leading-tight">
                    {d.title}
                  </h3>
                </div>
                {/* Day body */}
                <div className="px-5 py-4">
                  <p className="text-gray-700 text-sm leading-relaxed">
                    {d.body}
                  </p>
                  {d.tip && (
                    <p className={`text-xs mt-3 font-medium ${accent}`}>
                      {d.tip}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ボーナスコンテンツ */}
        <div>
          <h2 className="text-lg font-bold text-gray-800 mb-4">
            🎁 特典コンテンツ
          </h2>
          <div className="flex flex-col gap-4">
            {guide.bonus.map((b, i) => (
              <div key={i} className="bg-white rounded-2xl shadow-sm p-5">
                <p className="font-bold text-gray-800 text-sm mb-3">{b.title}</p>
                <ul className="flex flex-col gap-2">
                  {b.items.map((item, j) => (
                    <li key={j} className="text-xs text-gray-600 leading-relaxed flex gap-2">
                      <span className={`font-bold ${accent} shrink-0`}>→</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="bg-white rounded-2xl shadow-sm p-6 text-center">
          <p className="text-sm font-bold text-gray-800 mb-1">
            7日間やり切ったら
          </p>
          <p className="text-xs text-gray-500 mb-5 leading-relaxed">
            無料のオンライン個別相談で
            あなたに合う「次のステップ」を一緒に考えます。
            売り込みは一切しません。
          </p>
          <a
            href="https://line.me/R/ti/p/@your-line-id"
            className={`inline-block text-white font-bold text-sm px-7 py-3.5 rounded-full bg-gradient-to-r ${gradient} shadow active:scale-95 transition-all`}
          >
            LINEで相談を申し込む
          </a>
          <p className="text-xs text-gray-400 mt-3">無料・売り込みなし</p>
        </div>

        {/* Footer */}
        <p className="text-center text-xs text-gray-400 pb-4">
          © 2026 STAY GOLD GYM
        </p>
      </div>
    </main>
  );
}

export function generateStaticParams() {
  return validTypes.map((type) => ({ type }));
}
