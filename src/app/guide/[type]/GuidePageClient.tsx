"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
/* 旧4タイプ用 */
type DiagnosisType = "first_step" | "food_reset" | "time_hack" | "switch_on";
import { guideData } from "@/lib/guide";
import HamburgerMenu from "@/components/HamburgerMenu";
import {
  KeyIcon,
  HeartIcon,
  ScaleIcon,
  SunriseIcon,
  WaterIcon,
  NoteIcon,
  ForkKnifeIcon,
  TimerIcon,
  DumbbellIcon,
  StairsIcon,
  MoonIcon,
  CalendarIcon,
  ChartIcon,
  ThreeMonthTimeline,
} from "@/components/GuideSVGs";
import { WaveDivider } from "@/components/TextbookSVGs";

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

const actionIconsByType: Record<string, React.FC[]> = {
  first_step: [SunriseIcon, WaterIcon, NoteIcon],
  food_reset: [ForkKnifeIcon, DumbbellIcon, TimerIcon],
  time_hack: [StairsIcon, StairsIcon, MoonIcon],
  switch_on: [DumbbellIcon, CalendarIcon, ChartIcon],
};

const keyIcons = [KeyIcon, HeartIcon, ScaleIcon];

export default function GuidePageClient({ type }: { type: DiagnosisType }) {
  const [currentSection, setCurrentSection] = useState(0);
  const totalSections = sectionAnchors.length;

  useEffect(() => {
    function handleScroll() {
      let current = 0;
      for (let i = sectionAnchors.length - 1; i >= 0; i--) {
        const el = document.getElementById(sectionAnchors[i].id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 150) {
            current = i + 1;
            break;
          }
        }
      }
      setCurrentSection(current);
    }
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const guide = guideData[type];
  const theme = guide.themeColor;
  const icons = actionIconsByType[type] || [SunriseIcon, WaterIcon, NoteIcon];

  return (
    <main className="min-h-screen bg-gray-50">
      <HamburgerMenu />

      {/* Progress indicator */}
      <div className="fixed top-0 left-0 right-0 z-40">
        <div className="h-1 bg-gray-200">
          <div
            className={`h-1 bg-gradient-to-r ${theme.gradient} transition-all duration-300`}
            style={{
              width: `${(currentSection / totalSections) * 100}%`,
            }}
          />
        </div>
        {currentSection > 0 && (
          <div className="absolute top-1 right-4 bg-white/90 backdrop-blur-sm border border-gray-200 rounded-full px-3 py-1 shadow-sm">
            <span className="text-xs font-bold text-gray-500">
              {currentSection}/{totalSections}
            </span>
          </div>
        )}
      </div>

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
            <ul className="flex flex-col gap-3 mb-4">
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

        <WaveDivider />

        {/* Reasons */}
        <section id="reasons">
          <h2 className="text-lg font-black text-gray-800 mb-4">
            {guide.failureHeadline}
          </h2>
          <div className="flex flex-col gap-3">
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
          <div className="bg-white rounded-2xl shadow-sm p-4 mt-3">
            <p
              className={`text-sm font-bold ${theme.accent} leading-relaxed`}
            >
              {guide.failureSummary}
            </p>
          </div>
        </section>

        <WaveDivider />

        {/* 3 Keys with icons */}
        <section id="keys">
          <h2 className="text-lg font-black text-gray-800 mb-4">
            {guide.keysHeadline}
          </h2>
          <div className="flex flex-col gap-4">
            {guide.keys.map((key, index) => {
              const Icon = keyIcons[index];
              return (
                <div
                  key={index}
                  className="bg-white rounded-2xl shadow-sm p-5"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <Icon />
                    <h3 className="font-bold text-gray-800 text-sm leading-snug flex-1">
                      {key.title}
                    </h3>
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {key.description}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        <WaveDivider />

        {/* Actions with icons */}
        <section id="actions">
          <h2 className="text-lg font-black text-gray-800 mb-4">
            {guide.actionsHeadline}
          </h2>
          <div className="flex flex-col gap-5">
            {guide.actions.map((action, index) => {
              const circledNumbers = ["①", "②", "③"];
              const ActionIcon = icons[index];
              return (
                <div
                  key={index}
                  className="bg-white rounded-2xl shadow-sm overflow-hidden"
                >
                  <div
                    className={`px-5 py-3 bg-gradient-to-r ${theme.gradient} text-white flex items-center gap-3`}
                  >
                    <div className="w-6 h-6 rounded border-2 border-white/60 flex items-center justify-center shrink-0">
                      <svg
                        viewBox="0 0 12 12"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        className="w-3 h-3 opacity-70"
                      >
                        <path d="M2 6l3 3 5-5" />
                      </svg>
                    </div>
                    <p className="font-black text-sm">
                      やること{circledNumbers[index]}: {action.title}
                    </p>
                  </div>
                  <div className="p-5 flex flex-col gap-4">
                    <div className="flex justify-center">
                      <ActionIcon />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-gray-500 tracking-wider mb-1.5 flex items-center gap-1.5">
                        <span className="inline-block w-1 h-4 rounded-full bg-gray-300" />
                        やり方
                      </p>
                      <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-line">
                        {action.howTo}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs font-bold text-gray-500 tracking-wider mb-1.5 flex items-center gap-1.5">
                        <span className="inline-block w-1 h-4 rounded-full bg-gray-300" />
                        なぜこれ？
                      </p>
                      <p className="text-sm text-gray-600 leading-relaxed">
                        {action.why}
                      </p>
                    </div>
                    <div
                      className={`rounded-xl ${theme.storyBg} border ${theme.border} p-4`}
                    >
                      <p className="text-sm text-gray-700 leading-relaxed italic">
                        {action.story}
                      </p>
                      <p className="text-xs text-gray-400 mt-1">
                        ※イメージです。個人差があります。
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="bg-white rounded-2xl shadow-sm p-4 mt-4">
            <p className="text-sm text-gray-700 leading-relaxed font-medium">
              {guide.actionsFooter}
            </p>
          </div>
        </section>

        <WaveDivider />

        {/* Future - Timeline */}
        <section id="future">
          <h2 className="text-lg font-black text-gray-800 mb-4">
            3ヶ月後のあなた
          </h2>
          <div className="bg-white rounded-2xl shadow-sm p-5">
            <ThreeMonthTimeline gradient={theme.gradient} />
            <div className="flex flex-col gap-3 mt-5">
              {guide.futureMonths.map((m) => (
                <div
                  key={m.month}
                  className={`rounded-xl ${theme.storyBg} border ${theme.border} p-4`}
                >
                  <p className={`text-xs font-black ${theme.accent} mb-1`}>
                    {m.month}ヶ月目：{m.label}
                  </p>
                  <p className="text-sm text-gray-700 leading-relaxed">
                    {m.detail}
                  </p>
                </div>
              ))}
            </div>
            <p className="text-xs text-gray-400 mt-3">
              ※適切な食事と運動を組み合わせた場合の目安です。
            </p>
          </div>
        </section>

        <WaveDivider />

        {/* Trainer Message */}
        <section id="message">
          <h2 className="text-lg font-black text-gray-800 mb-4">
            トレーナー ユウジより
          </h2>
          <div className="bg-white rounded-2xl shadow-sm p-5">
            <p className="text-sm text-gray-700 leading-[1.9] whitespace-pre-line">
              {guide.trainerMessage}
            </p>
          </div>
        </section>

        <WaveDivider />

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

            <div
              className={`rounded-xl ${theme.storyBg} border ${theme.border} p-4 mb-5`}
            >
              <p className="text-sm font-bold text-gray-800 mb-2">
                体験セッション：
              </p>
              <ul className="text-sm text-gray-700 flex flex-col gap-1 mb-3">
                <li>
                  ・対面：2,500円（税込）
                  <span className="text-xs text-gray-500">
                    ※このページ限定
                  </span>
                </li>
                <li>
                  ・オンライン：期間限定で無料
                </li>
              </ul>
              <p className="text-sm font-bold text-gray-800 mb-2">
                アクセス：
              </p>
              <ul className="text-sm text-gray-700 flex flex-col gap-1">
                <li>・天王寺店：JR天王寺駅 徒歩6分</li>
                <li>・天満店：JR天満駅 徒歩7分</li>
              </ul>
            </div>

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
              無理な勧誘は一切ありません。
            </p>
          </div>
        </section>

        {/* Core message */}
        <div
          className={`rounded-2xl ${theme.storyBg} border ${theme.border} p-5 text-center`}
        >
          <p className={`text-sm font-bold ${theme.accent} leading-relaxed`}>
            人はいつからでも、どこからでも良くなれる。
          </p>
          <p
            className={`text-sm font-bold ${theme.accent} leading-relaxed mt-1`}
          >
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

      <div className="h-20" />
    </main>
  );
}
