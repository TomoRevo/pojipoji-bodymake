"use client";

import { useState } from "react";
import Link from "next/link";
import HamburgerMenu from "@/components/HamburgerMenu";
import Accordion from "@/components/Accordion";
import {
  FourPillarsInfographic,
  PlateChart,
  EatingOrderSteps,
  MuscleVsCardioVisual,
  HabitLoopDiagram,
  WaveDivider,
} from "@/components/TextbookSVGs";
import {
  textbookTitle,
  textbookSubCopy,
  textbookChapters,
} from "@/lib/textbook";
import type {
  TextbookChapter,
  TextbookSection,
  TextbookSubsection,
} from "@/lib/textbook";

const LINE_URL = process.env.NEXT_PUBLIC_LINE_ADD_URL || "#";

const chapterColors: Record<
  string,
  {
    bg: string;
    border: string;
    text: string;
    gradientBg: string;
    lightBg: string;
  }
> = {
  amber: {
    bg: "bg-amber-50",
    border: "border-amber-200",
    text: "text-amber-700",
    gradientBg: "from-amber-500 to-orange-400",
    lightBg: "bg-amber-50/50",
  },
  sky: {
    bg: "bg-sky-50",
    border: "border-sky-200",
    text: "text-sky-700",
    gradientBg: "from-sky-500 to-blue-400",
    lightBg: "bg-sky-50/50",
  },
  emerald: {
    bg: "bg-emerald-50",
    border: "border-emerald-200",
    text: "text-emerald-700",
    gradientBg: "from-emerald-500 to-green-400",
    lightBg: "bg-emerald-50/50",
  },
  violet: {
    bg: "bg-violet-50",
    border: "border-violet-200",
    text: "text-violet-700",
    gradientBg: "from-violet-500 to-purple-400",
    lightBg: "bg-violet-50/50",
  },
  orange: {
    bg: "bg-orange-50",
    border: "border-orange-200",
    text: "text-orange-700",
    gradientBg: "from-orange-500 to-amber-400",
    lightBg: "bg-orange-50/50",
  },
  rose: {
    bg: "bg-rose-50",
    border: "border-rose-200",
    text: "text-rose-700",
    gradientBg: "from-rose-500 to-pink-400",
    lightBg: "bg-rose-50/50",
  },
};

function SubsectionBlock({
  sub,
  colorKey,
}: {
  sub: TextbookSubsection;
  colorKey: string;
}) {
  const color = chapterColors[colorKey];
  return (
    <div className="mb-4">
      <h4 className={`font-bold text-sm ${color.text} mb-1`}>{sub.title}</h4>
      {sub.description && (
        <p className="text-sm text-gray-600 leading-relaxed mb-2">
          {sub.description}
        </p>
      )}
      {sub.bullets && (
        <ul className="flex flex-col gap-1.5 ml-1">
          {sub.bullets.map((b, i) => (
            <li
              key={i}
              className="flex gap-2 text-sm text-gray-600 leading-relaxed"
            >
              <span className={`${color.text} shrink-0`}>-</span>
              <span>{b}</span>
            </li>
          ))}
        </ul>
      )}
      {sub.sceneExample && (
        <div
          className={`${color.bg} border ${color.border} rounded-lg p-3 mt-2`}
        >
          <p className="text-xs text-gray-500 font-bold mb-1">
            生活シーン例
          </p>
          <p className="text-sm text-gray-700 leading-relaxed italic">
            {sub.sceneExample}
          </p>
        </div>
      )}
    </div>
  );
}

function SectionBlock({
  section,
  colorKey,
}: {
  section: TextbookSection;
  colorKey: string;
}) {
  const color = chapterColors[colorKey];

  return (
    <div className="bg-white rounded-2xl shadow-sm p-5 mb-4">
      {section.heading && (
        <h3 className="font-black text-base text-gray-800 mb-3">
          {section.heading}
        </h3>
      )}
      {section.lead && (
        <p className="text-sm text-gray-700 leading-relaxed mb-4">
          {section.lead}
        </p>
      )}
      {section.paragraphs?.map((p, i) => (
        <p key={i} className="text-sm text-gray-600 leading-relaxed mb-3">
          {p}
        </p>
      ))}
      {section.sceneExample && (
        <div
          className={`${color.bg} border ${color.border} rounded-lg p-3 mb-4`}
        >
          <p className="text-xs text-gray-500 font-bold mb-1">
            生活シーン例
          </p>
          <p className="text-sm text-gray-700 leading-relaxed italic">
            {section.sceneExample}
          </p>
        </div>
      )}
      {section.bullets && (
        <ul className="flex flex-col gap-2 mb-4">
          {section.bullets.map((b, i) => (
            <li
              key={i}
              className="flex gap-2 text-sm text-gray-600 leading-relaxed"
            >
              <span className={`${color.text} shrink-0`}>-</span>
              <span>{b}</span>
            </li>
          ))}
        </ul>
      )}
      {section.subsections?.map((sub, i) => (
        <SubsectionBlock key={i} sub={sub} colorKey={colorKey} />
      ))}
      {section.table && (
        <div className="overflow-x-auto mb-4">
          <table className="w-full text-xs border-collapse">
            <thead>
              <tr>
                {section.table.headers.map((h, i) => (
                  <th
                    key={i}
                    className={`text-left p-2 border-b-2 ${color.border} ${
                      i === 0 ? "w-24" : ""
                    } font-bold text-gray-700`}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {section.table.rows.map((row, ri) => (
                <tr key={ri}>
                  {row.map((cell, ci) => (
                    <td
                      key={ci}
                      className={`p-2 border-b border-gray-100 text-gray-600 ${
                        ci === 0 ? "font-medium text-gray-700" : ""
                      }`}
                    >
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {section.comboExamples && (
        <div className="flex flex-col gap-3 mb-4">
          <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">
            おすすめ組み合わせ
          </p>
          {section.comboExamples.map((combo, i) => (
            <div
              key={i}
              className={`${color.bg} border ${color.border} rounded-xl p-4`}
            >
              <div className="flex items-center justify-between mb-2">
                <p
                  className={`text-xs font-black ${color.text} uppercase tracking-wider`}
                >
                  {combo.label}
                </p>
                {combo.kcal && (
                  <span className="text-xs text-gray-400 font-medium">
                    {combo.kcal}
                  </span>
                )}
              </div>
              <div className="flex flex-wrap gap-2">
                {combo.items.map((item, j) => (
                  <span
                    key={j}
                    className={`inline-block text-xs px-3 py-1.5 rounded-full bg-white border ${color.border} text-gray-700 font-medium`}
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
      {section.note && (
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-3 mb-3">
          <p className="text-xs text-gray-600 leading-relaxed">
            {section.note}
          </p>
        </div>
      )}
      {section.keyMessage && (
        <div
          className={`${color.bg} border-l-4 ${color.border} rounded-r-lg p-4`}
        >
          <p className={`text-sm font-bold ${color.text} leading-relaxed`}>
            {section.keyMessage}
          </p>
        </div>
      )}
    </div>
  );
}

function ExerciseCard({
  sub,
  colorKey,
}: {
  sub: TextbookSubsection;
  colorKey: string;
}) {
  const color = chapterColors[colorKey];
  return (
    <div
      className={`${color.bg} border ${color.border} rounded-xl p-4 mb-3`}
    >
      <div className="flex items-center gap-2 mb-2">
        <div
          className={`w-6 h-6 rounded-full bg-gradient-to-br ${color.gradientBg} flex items-center justify-center`}
        >
          <svg
            viewBox="0 0 16 16"
            fill="none"
            stroke="white"
            strokeWidth="2"
            className="w-3 h-3"
          >
            <path d="M2 8l4 4 8-8" />
          </svg>
        </div>
        <h4 className={`font-bold text-sm ${color.text}`}>{sub.title}</h4>
      </div>
      {sub.description && (
        <p className="text-xs text-gray-500 mb-2 ml-8">{sub.description}</p>
      )}
      {sub.bullets && (
        <ul className="flex flex-col gap-1 ml-8">
          {sub.bullets.map((b, i) => (
            <li
              key={i}
              className="flex gap-2 text-sm text-gray-600 leading-relaxed"
            >
              <span className="text-gray-300 shrink-0">-</span>
              <span>{b}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

// SVG for each chapter: map chapter number to component
function ChapterVisual({ chapterNumber }: { chapterNumber: number }) {
  switch (chapterNumber) {
    case 2:
      return (
        <div className="bg-white rounded-2xl shadow-sm p-5 mb-4">
          <FourPillarsInfographic />
        </div>
      );
    case 3:
      return (
        <div className="flex flex-col gap-4 mb-4">
          <div className="bg-white rounded-2xl shadow-sm p-5">
            <p className="text-xs font-bold text-gray-500 tracking-wider mb-3 text-center">
              理想のワンプレート
            </p>
            <PlateChart />
          </div>
          <div className="bg-white rounded-2xl shadow-sm p-5">
            <p className="text-xs font-bold text-gray-500 tracking-wider mb-3 text-center">
              食べる順番
            </p>
            <EatingOrderSteps />
          </div>
        </div>
      );
    case 4:
      return (
        <div className="bg-white rounded-2xl shadow-sm p-5 mb-4">
          <p className="text-xs font-bold text-gray-500 tracking-wider mb-3 text-center">
            筋トレ vs 有酸素
          </p>
          <MuscleVsCardioVisual />
        </div>
      );
    case 5:
      return (
        <div className="bg-white rounded-2xl shadow-sm p-5 mb-4">
          <p className="text-xs font-bold text-gray-500 tracking-wider mb-3 text-center">
            習慣ループ
          </p>
          <HabitLoopDiagram />
        </div>
      );
    default:
      return null;
  }
}

function ChapterContent({ chapter }: { chapter: TextbookChapter }) {
  const color = chapterColors[chapter.color] ?? chapterColors.amber;
  const isExerciseChapter = chapter.number === 4;

  return (
    <>
      {/* Summary card */}
      <div
        className={`${color.bg} border ${color.border} rounded-xl p-4 mb-4`}
      >
        <p className="text-xs font-bold text-gray-500 mb-1">
          ポイント
        </p>
        <p className={`text-sm font-bold ${color.text}`}>
          {chapter.summary}
        </p>
      </div>

      {/* Chapter-specific SVG visual */}
      <ChapterVisual chapterNumber={chapter.number} />

      {/* Sections */}
      {chapter.sections.map((s, i) => {
        if (isExerciseChapter && s.heading === "1日3〜5分でできること") {
          return (
            <div key={i} className="bg-white rounded-2xl shadow-sm p-5 mb-4">
              <h3 className="font-black text-base text-gray-800 mb-3">
                {s.heading}
              </h3>
              {s.lead && (
                <p className="text-sm text-gray-700 leading-relaxed mb-4">
                  {s.lead}
                </p>
              )}
              {s.subsections?.map((sub, j) => (
                <ExerciseCard key={j} sub={sub} colorKey={chapter.color} />
              ))}
              {s.note && (
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-3 mb-3">
                  <p className="text-xs text-gray-600 leading-relaxed">
                    {s.note}
                  </p>
                </div>
              )}
              {s.keyMessage && (
                <div
                  className={`${color.bg} border-l-4 ${color.border} rounded-r-lg p-4`}
                >
                  <p
                    className={`text-sm font-bold ${color.text} leading-relaxed`}
                  >
                    {s.keyMessage}
                  </p>
                </div>
              )}
            </div>
          );
        }
        return (
          <SectionBlock key={i} section={s} colorKey={chapter.color} />
        );
      })}
    </>
  );
}

function ChapterAccordion({ chapter, onOpen }: { chapter: TextbookChapter; onOpen?: () => void }) {
  const color = chapterColors[chapter.color] ?? chapterColors.amber;

  return (
    <section id={`chapter-${chapter.number}`} className="scroll-mt-20">
      <div
        className={`bg-gradient-to-r ${color.gradientBg} rounded-2xl px-5 py-4`}
      >
        <Accordion
          title={
            <div>
              <p className="text-white text-xs font-bold opacity-80">
                第{chapter.number}章
              </p>
              <h2 className="text-white text-lg font-black leading-snug">
                {chapter.title}
              </h2>
            </div>
          }
          summary={chapter.summary}
          onToggle={(isOpen) => { if (isOpen) onOpen?.(); }}
        >
          <div className="mt-2">
            <ChapterContent chapter={chapter} />
          </div>
        </Accordion>
      </div>
    </section>
  );
}

export default function TextbookPage() {
  const [readChapters, setReadChapters] = useState<Set<number>>(new Set());
  const readCount = readChapters.size;

  const markRead = (chapterNum: number) => {
    setReadChapters((prev) => {
      const next = new Set(prev);
      next.add(chapterNum);
      return next;
    });
  };

  return (
    <main className="min-h-screen bg-gray-50">
      <HamburgerMenu />

      {/* Progress bar */}
      <div className="fixed top-0 left-0 right-0 z-40">
        <div className="h-1 bg-gray-200">
          <div
            className="h-1 bg-gradient-to-r from-orange-500 to-amber-400 transition-all duration-300"
            style={{
              width: `${Math.min(
                (readCount / textbookChapters.length) * 100,
                100
              )}%`,
            }}
          />
        </div>
        <div className="absolute top-1 right-4 bg-white/90 backdrop-blur-sm border border-gray-200 rounded-full px-3 py-1 shadow-sm">
          <span className="text-xs font-bold text-gray-500">
            {readCount}/{textbookChapters.length}章 読了
          </span>
        </div>
      </div>

      {/* Hero */}
      <section className="bg-gradient-to-br from-slate-800 to-slate-900 text-white px-5 pt-14 pb-10">
        <div className="max-w-md mx-auto text-center">
          <p className="text-xs tracking-[0.25em] text-orange-400 font-semibold uppercase mb-4">
            STAY GOLD GYM
          </p>
          <h1 className="text-2xl font-black mb-3 leading-snug">
            {textbookTitle}
          </h1>
          <p className="text-sm text-slate-400 leading-relaxed">
            {textbookSubCopy}
          </p>
          <p className="text-xs text-slate-500 mt-4">
            パーソナルジム STAY GOLD 監修
          </p>
        </div>
      </section>

      <div className="max-w-md mx-auto px-4 py-6">
        {/* Core message banner */}
        <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-2xl p-5 mb-6 text-center">
          <p className="text-sm font-bold text-amber-700 leading-relaxed">
            正しいやり方で継続さえすれば、必ず成果を手に入れることができる
          </p>
        </div>

        {/* 4 Pillars Visual - always visible */}
        <div className="bg-white rounded-2xl shadow-sm p-5 mb-6">
          <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4 text-center">
            ダイエットの4本柱
          </p>
          <div className="grid grid-cols-4 gap-2 w-full">
            {[
              {
                label: "食事",
                sub: "何を食べるか",
                color: "from-emerald-400 to-green-400",
              },
              {
                label: "運動",
                sub: "どう動くか",
                color: "from-violet-400 to-purple-400",
              },
              {
                label: "習慣",
                sub: "どう続けるか",
                color: "from-orange-400 to-amber-400",
              },
              {
                label: "メンタル",
                sub: "どう考えるか",
                color: "from-rose-400 to-pink-400",
              },
            ].map((p) => (
              <div
                key={p.label}
                className={`bg-gradient-to-b ${p.color} rounded-xl p-2 text-center text-white`}
              >
                <p className="text-xs font-black">{p.label}</p>
                <p className="text-[10px] opacity-80 mt-0.5 leading-tight">
                  {p.sub}
                </p>
              </div>
            ))}
          </div>
        </div>

        <WaveDivider />

        {/* Instruction */}
        <p className="text-xs text-gray-400 text-center mb-4">
          タップで各章を開く
        </p>

        {/* Chapters as Accordions */}
        <div className="flex flex-col gap-4">
          {textbookChapters.map((ch) => (
            <ChapterAccordion key={ch.number} chapter={ch} onOpen={() => markRead(ch.number)} />
          ))}
        </div>

        <WaveDivider color="#f43f5e" />

        {/* Final CTA section */}
        <section className="mt-8 bg-white rounded-2xl shadow-sm p-6">
          <h2 className="text-lg font-black text-gray-800 mb-2 text-center">
            まずは気軽に相談してみる
          </h2>
          <p className="text-sm text-gray-500 mb-5 leading-relaxed text-center">
            無理な勧誘は一切ありません。
          </p>

          <div className="bg-orange-50 border border-orange-200 rounded-xl p-4 mb-5">
            <p className="text-sm font-bold text-gray-800 mb-2">
              体験セッション：
            </p>
            <ul className="text-sm text-gray-700 flex flex-col gap-1 mb-3">
              <li>
                ・対面（ジム来店）：2,500円（税込）
                <span className="text-xs text-gray-500">
                  ※通常5,500円 → このページ限定
                </span>
              </li>
              <li>
                ・オンライン：期間限定で無料
                <span className="text-xs text-gray-500">（通常5,500円）</span>
              </li>
            </ul>
            <p className="text-sm font-bold text-gray-800 mb-2">アクセス：</p>
            <ul className="text-sm text-gray-700 flex flex-col gap-1">
              <li>・天王寺店：JR天王寺駅から徒歩6分</li>
              <li>・天満店：JR天満駅から徒歩7分</li>
            </ul>
          </div>

          <div className="flex flex-col gap-3">
            <a
              href={LINE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full text-center text-white font-black text-sm px-8 py-4 rounded-full bg-gradient-to-r from-orange-500 to-amber-400 shadow-lg active:scale-95 transition-all"
            >
              対面体験を申し込む（2,500円）
            </a>
            <a
              href={LINE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full text-center text-orange-600 font-bold text-sm px-8 py-3.5 rounded-full border-2 border-orange-200 bg-white active:scale-95 transition-all"
            >
              オンライン無料体験を申し込む
            </a>
          </div>
        </section>

        {/* Core message footer */}
        <div className="mt-6 bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-2xl p-5 text-center">
          <p className="text-sm font-bold text-amber-700 leading-relaxed">
            人はいつからでも、どこからでも良くなれる。
          </p>
          <p className="text-sm font-bold text-amber-700 leading-relaxed mt-1">
            あなたなら絶対にできる。
          </p>
        </div>

        {/* Navigation links */}
        <div className="flex flex-col items-center gap-3 mt-6">
          <Link
            href="/diagnosis"
            className="text-sm text-gray-500 underline hover:text-gray-700"
          >
            ダイエットタイプ診断を受ける
          </Link>
        </div>

        {/* Disclaimer */}
        <div className="mt-6 bg-gray-100 rounded-xl p-4">
          <p className="text-xs text-gray-500 leading-relaxed">
            ※
            本コンテンツは一般的な健康情報の提供を目的としており、医学的アドバイスの代替ではありません。持病のある方、通院中の方、妊娠中・授乳中の方は、食事や運動の変更前に必ず主治医にご相談ください。
          </p>
        </div>

        {/* Footer */}
        <p className="text-center text-xs text-gray-400 py-6">
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
            className="block w-full text-center text-white font-black text-sm px-4 py-3.5 rounded-full bg-gradient-to-r from-orange-500 to-amber-400 shadow active:scale-95 transition-all"
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
