import { notFound } from "next/navigation";
import Link from "next/link";
import { DiagnosisType, validTypes, typeLabels } from "@/lib/diagnosis";
import { guideData } from "@/lib/guide";
import HamburgerMenu from "@/components/HamburgerMenu";
import type { Metadata } from "next";

const LINE_URL = process.env.NEXT_PUBLIC_LINE_ADD_URL || "#";

const sectionAnchors = [
  { id: "features", label: "特徴" },
  { id: "reasons", label: "理由" },
  { id: "keys", label: "3つの鍵" },
  { id: "actions", label: "アクション" },
  { id: "future", label: "3ヶ月後" },
  { id: "message", label: "メッセージ" },
  { id: "cta", label: "次のステップ" },
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
    title: `${label}のあなた専用ガイド｜STAY GOLD GYM`,
    description: `${label}のあなたに合ったダイエット戦略・今日からできるアクション・3ヶ月後のイメージをお届けします。`,
  };
}

export default async function GuidePage({ params }: Props) {
  const { type } = await params;

  if (!validTypes.includes(type as DiagnosisType)) {
    notFound();
  }

  const t = type as DiagnosisType;
  const guide = guideData[t];
  const theme = guide.themeColor;

  return (
    <main className="min-h-screen bg-gray-50">
      <HamburgerMenu />

      {/* Hero */}
      <section
        className={`bg-gradient-to-br ${theme.gradient} text-white px-5 pt-14 pb-10`}
      >
        <div className="max-w-md mx-auto">
          <p className="text-sm font-semibold opacity-80 tracking-wider mb-4">
            STAY GOLD GYM
          </p>
          <p className="text-sm opacity-80">あなたは</p>
          <h1 className="text-2xl font-black mb-3">
            &ldquo;{guide.typeName}&rdquo;
          </h1>
          <p className="text-sm opacity-90 leading-relaxed font-medium">
            {guide.subCopy}
          </p>
        </div>
      </section>

      {/* Table of Contents */}
      <div className="max-w-md mx-auto px-4 py-4">
        <div className="bg-white rounded-2xl shadow-sm p-4">
          <p className="text-xs font-bold text-gray-500 tracking-wider mb-3">
            目次
          </p>
          <div className="flex flex-wrap gap-2">
            {sectionAnchors.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                className={`text-xs px-3 py-1.5 rounded-full border ${theme.border} ${theme.accent} font-medium hover:opacity-80 transition-opacity`}
              >
                {s.label}
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-md mx-auto px-4 pb-8 flex flex-col gap-8">
        {/* Features */}
        <section id="features">
          <h2 className="text-lg font-black text-gray-800 mb-4">
            こんなこと、ありますよね？
          </h2>
          <div className="bg-white rounded-2xl shadow-sm p-5">
            <ul className="flex flex-col gap-3 mb-5">
              {guide.features.map((feature, index) => (
                <li
                  key={index}
                  className="flex gap-3 text-sm text-gray-700 leading-relaxed"
                >
                  <span className={`${theme.accent} font-black shrink-0`}>
                    -
                  </span>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
            <div
              className={`rounded-xl ${theme.storyBg} border ${theme.border} p-4`}
            >
              <p className="text-sm text-gray-700 leading-relaxed font-medium">
                {guide.empathyMessage}
              </p>
            </div>
          </div>
        </section>

        {/* Reasons */}
        <section id="reasons">
          <h2 className="text-lg font-black text-gray-800 mb-4">
            {guide.failureHeadline}
          </h2>
          <div className="flex flex-col gap-4">
            {guide.failures.map((failure, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-sm p-5">
                <div className="flex items-start gap-3 mb-2">
                  <span
                    className={`w-7 h-7 rounded-full ${theme.accentBg} text-white text-xs font-black flex items-center justify-center shrink-0`}
                  >
                    {index + 1}
                  </span>
                  <h3 className="font-bold text-gray-800 text-sm leading-snug pt-1">
                    {failure.title}
                  </h3>
                </div>
                <p className="text-sm text-gray-600 leading-relaxed ml-10">
                  {failure.description}
                </p>
              </div>
            ))}
          </div>
          <div className="bg-white rounded-2xl shadow-sm p-5 mt-4">
            <p className={`text-sm font-bold ${theme.accent} leading-relaxed`}>
              {guide.failureSummary}
            </p>
          </div>
        </section>

        {/* 3 Keys */}
        <section id="keys">
          <h2 className="text-lg font-black text-gray-800 mb-4">
            {guide.keysHeadline}
          </h2>
          <div className="flex flex-col gap-4">
            {guide.keys.map((key, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-sm p-5">
                <div className="flex items-start gap-3 mb-3">
                  <div
                    className={`w-8 h-8 rounded-lg bg-gradient-to-br ${theme.gradient} text-white text-xs font-black flex items-center justify-center shrink-0`}
                  >
                    {index + 1}
                  </div>
                  <h3 className="font-bold text-gray-800 text-sm leading-snug pt-1.5">
                    {key.title}
                  </h3>
                </div>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {key.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Actions */}
        <section id="actions">
          <h2 className="text-lg font-black text-gray-800 mb-4">
            {guide.actionsHeadline}
          </h2>
          <div className="flex flex-col gap-5">
            {guide.actions.map((action, index) => {
              const circledNumbers = ["①", "②", "③", "④", "⑤"];
              return (
                <div
                  key={index}
                  className="bg-white rounded-2xl shadow-sm overflow-hidden"
                >
                  {/* Action header */}
                  <div
                    className={`px-5 py-3 bg-gradient-to-r ${theme.gradient} text-white flex items-center gap-3`}
                  >
                    <div className="w-6 h-6 rounded border-2 border-white/60 flex items-center justify-center shrink-0">
                      <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2" className="w-3 h-3 opacity-70">
                        <path d="M2 6l3 3 5-5" />
                      </svg>
                    </div>
                    <p className="font-black text-sm">
                      やること{circledNumbers[index]}: {action.title}
                    </p>
                  </div>
                  <div className="p-5 flex flex-col gap-4">
                    {/* How to */}
                    <div>
                      <p className="text-xs font-bold text-gray-500 tracking-wider mb-1.5 flex items-center gap-1.5">
                        <span className="inline-block w-1 h-4 rounded-full bg-gray-300" />
                        やり方
                      </p>
                      <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-line">
                        {action.howTo}
                      </p>
                    </div>
                    {/* Why */}
                    <div>
                      <p className="text-xs font-bold text-gray-500 tracking-wider mb-1.5 flex items-center gap-1.5">
                        <span className="inline-block w-1 h-4 rounded-full bg-gray-300" />
                        なぜこれ？
                      </p>
                      <p className="text-sm text-gray-600 leading-relaxed">
                        {action.why}
                      </p>
                    </div>
                    {/* Story */}
                    <div className={`rounded-xl ${theme.storyBg} border ${theme.border} p-4 relative`}>
                      <div className={`absolute top-3 left-3 text-3xl ${theme.accent} opacity-20 font-serif leading-none`}>
                        &ldquo;
                      </div>
                      <p className="text-xs font-bold text-gray-500 tracking-wider mb-2">
                        イメージ（体験談）
                      </p>
                      <p className="text-sm text-gray-700 leading-relaxed italic pl-2 border-l-2 border-current/10">
                        {action.story}
                      </p>
                      <p className="text-xs text-gray-400 mt-2">
                        ※イメージです。個人差があります。
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          {/* Actions footer */}
          <div className="bg-white rounded-2xl shadow-sm p-5 mt-4">
            <p className="text-sm text-gray-700 leading-relaxed font-medium">
              {guide.actionsFooter}
            </p>
          </div>
        </section>

        {/* Future */}
        <section id="future">
          <h2 className="text-lg font-black text-gray-800 mb-4">
            {guide.futureHeadline}
          </h2>
          <div className={`rounded-2xl shadow-sm p-6 bg-gradient-to-br ${theme.storyBg} from-white to-${theme.storyBg} relative overflow-hidden`}>
            <div className={`absolute inset-0 bg-gradient-to-br ${theme.gradient} opacity-5 rounded-2xl`} />
            <div className="relative">
              <div className="text-sm text-gray-700 leading-[1.9] whitespace-pre-line">
                {guide.futureBody}
              </div>
              <p className="text-xs text-gray-400 mt-4">
                ※適切な食事と運動を組み合わせた場合の目安です。
              </p>
            </div>
          </div>
        </section>

        {/* Trainer Message */}
        <section id="message">
          <h2 className="text-lg font-black text-gray-800 mb-4">
            トレーナー ユウジより
          </h2>
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <div className="text-sm text-gray-700 leading-[1.9] whitespace-pre-line">
              {guide.trainerMessage}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section id="cta">
          <h2 className="text-lg font-black text-gray-800 mb-4">
            {guide.ctaHeadline}
          </h2>
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <p className="text-sm text-gray-700 leading-relaxed mb-4">
              {guide.ctaIntro}
            </p>
            <p className={`font-bold text-sm ${theme.accent} mb-3`}>
              {guide.ctaSessionTitle}
            </p>
            <p className="text-xs text-gray-500 mb-2">
              体験セッションでは：
            </p>
            <ul className="flex flex-col gap-2 mb-5">
              {guide.ctaItems.map((item, index) => (
                <li
                  key={index}
                  className="flex gap-2 text-sm text-gray-700"
                >
                  <span className={`${theme.accent} shrink-0`}>-</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <p className="text-sm text-gray-700 leading-relaxed mb-5">
              {guide.ctaClosing}
            </p>

            {/* 料金・流れ・アクセス情報 */}
            <div className={`rounded-xl ${theme.storyBg} border ${theme.border} p-4 mb-5`}>
              <p className="text-sm font-bold text-gray-800 mb-2">体験セッション：</p>
              <ul className="text-sm text-gray-700 flex flex-col gap-1 mb-3">
                <li>・対面（ジム来店）：2,500円（税込）<span className="text-xs text-gray-500">※通常5,500円 → このページ限定</span></li>
                <li>・オンライン：期間限定で無料<span className="text-xs text-gray-500">（通常5,500円）</span></li>
              </ul>
              <p className="text-sm font-bold text-gray-800 mb-2">体験当日の流れ：</p>
              <ol className="text-sm text-gray-700 flex flex-col gap-1 mb-3">
                <li>① 専用フォームからお申し込み</li>
                <li>② 24時間以内に日程を確定</li>
                <li>③ 事前にヒアリングシートにご回答いただきます</li>
                <li>④ 当日セッション</li>
                <li className="ml-4 text-xs text-gray-500">・対面：カウンセリング＋トレーニング 計90分</li>
                <li className="ml-4 text-xs text-gray-500">・オンライン：60分セッション</li>
              </ol>
              <p className="text-sm font-bold text-gray-800 mb-2">アクセス：</p>
              <ul className="text-sm text-gray-700 flex flex-col gap-1">
                <li>・天王寺店：JR天王寺駅から徒歩6分</li>
                <li>・天満店：JR天満駅から徒歩7分</li>
              </ul>
            </div>

            {/* CTA buttons */}
            <div className="flex flex-col gap-3">
              <a
                href={LINE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className={`block w-full text-center text-white font-black text-sm px-6 py-4 rounded-full bg-gradient-to-r ${theme.gradient} shadow-lg active:scale-95 transition-all`}
              >
                対面体験を申し込む（2,500円）
              </a>
              <a
                href={LINE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className={`block w-full text-center ${theme.accent} font-bold text-sm px-6 py-3.5 rounded-full border-2 ${theme.border} bg-white active:scale-95 transition-all`}
              >
                オンライン無料体験を申し込む
              </a>
            </div>

            <p className="text-xs text-gray-400 mt-4 text-center">
              無理な勧誘は一切ありません。あなたの話を聞かせてください。
            </p>
          </div>
        </section>

        {/* Core message */}
        <div className={`rounded-2xl ${theme.storyBg} border ${theme.border} p-5 text-center`}>
          <p className={`text-sm font-bold ${theme.accent} leading-relaxed`}>
            人はいつからでも、どこからでも良くなれる。
          </p>
          <p className={`text-sm font-bold ${theme.accent} leading-relaxed mt-1`}>
            あなたなら絶対にできる。
          </p>
        </div>

        {/* Navigation links */}
        <div className="flex flex-col items-center gap-3">
          <Link
            href="/textbook"
            className="text-sm text-gray-500 underline hover:text-gray-700"
          >
            ダイエットの教科書を読む
          </Link>
          <Link
            href="/diagnosis"
            className="text-sm text-gray-500 underline hover:text-gray-700"
          >
            もう一度診断する
          </Link>
        </div>

        {/* Disclaimer */}
        <div className="bg-gray-100 rounded-xl p-4">
          <p className="text-xs text-gray-500 leading-relaxed">
            ※ 本コンテンツは一般的な健康情報の提供を目的としており、医学的アドバイスの代替ではありません。持病のある方、通院中の方、妊娠中・授乳中の方は、食事や運動の変更前に必ず主治医にご相談ください。
          </p>
        </div>

        {/* Footer */}
        <p className="text-center text-xs text-gray-400 pb-4">
          &copy; 2026 STAY GOLD GYM
        </p>
      </div>

      {/* Fixed bottom CTA */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/90 backdrop-blur-sm border-t border-gray-200 px-4 py-3 safe-area-bottom">
        <div className="max-w-md mx-auto">
          <a
            href={LINE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={`block w-full text-center text-white font-black text-sm px-4 py-3.5 rounded-full bg-gradient-to-r ${theme.gradient} shadow active:scale-95 transition-all`}
          >
            まずはLINEで相談する
          </a>
        </div>
      </div>

      {/* Spacer for fixed CTA */}
      <div className="h-20" />
    </main>
  );
}

export function generateStaticParams() {
  return validTypes.map((type) => ({ type }));
}
