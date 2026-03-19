"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { checkGroups, calcType } from "@/lib/diagnosis";
import HamburgerMenu from "@/components/HamburgerMenu";

/* ── 分析中画面（温かみあるデザイン） ── */

const analyzingSteps = [
  "あなたの回答を読み取っています...",
  "パターンを分析しています...",
  "あなたに合うタイプを探しています...",
  "専用プランを準備しています...",
  "もう少しで結果が出ます...",
];

function AnalyzingScreen() {
  const [stepIndex, setStepIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const t1 = setInterval(() => setStepIndex((i) => Math.min(i + 1, analyzingSteps.length - 1)), 600);
    const t2 = setInterval(() => setProgress((p) => p >= 95 ? 95 : p + (p < 70 ? 2.0 : 0.6)), 50);
    return () => { clearInterval(t1); clearInterval(t2); };
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#FBF8F4] px-5">
      <div className="flex flex-col items-center gap-8 w-full max-w-xs">
        {/* やわらかいスピナー */}
        <div className="relative w-28 h-28">
          <div className="absolute inset-0 rounded-full border-4 border-amber-100" />
          <div
            className="absolute inset-0 rounded-full border-4 border-transparent border-t-amber-500 border-r-amber-300"
            style={{ animation: "spin 1.2s linear infinite" }}
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-3xl">✨</span>
          </div>
        </div>

        <div className="text-center">
          <p className="text-amber-900 font-bold text-xl mb-2">あなたのタイプを診断中</p>
          <p
            key={stepIndex}
            className="text-amber-700/70 text-sm"
            style={{ animation: "fadeSlide 0.35s ease" }}
          >
            {analyzingSteps[stepIndex]}
          </p>
        </div>

        <div className="w-full">
          <div className="w-full bg-amber-100 rounded-full h-2 overflow-hidden">
            <div
              className="bg-gradient-to-r from-amber-400 to-orange-400 h-2 rounded-full transition-all duration-100"
              style={{ width: `${Math.round(progress)}%` }}
            />
          </div>
          <p className="text-center text-amber-600/60 text-xs mt-2 font-medium">
            {Math.round(progress)}%
          </p>
        </div>
      </div>
    </div>
  );
}

/* ── グループのアイコン ── */
const groupIcons = ["🍽️", "💭", "🏃‍♀️", "📱", "🔄"];

/* ── メイン：チェックリスト診断 ── */

export default function DiagnosisPage() {
  const router = useRouter();
  const [checked, setChecked] = useState<Set<string>>(new Set());
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const toggle = (id: string) => {
    setChecked((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const handleSubmit = () => {
    if (checked.size === 0) return;
    setIsAnalyzing(true);
    const type = calcType(Array.from(checked));
    setTimeout(() => router.push(`/result/${type}`), 3200);
  };

  if (isAnalyzing) return <AnalyzingScreen />;

  const totalItems = checkGroups.reduce((s, g) => s + g.items.length, 0);

  return (
    <main className="min-h-screen bg-[#FBF8F4] px-4 py-8">
      <HamburgerMenu />

      <div className="max-w-md mx-auto flex flex-col gap-6">

        {/* Header */}
        <div className="text-center pt-4">
          <p className="text-xs tracking-[0.15em] text-amber-600/60 font-medium mb-3">
            STAY GOLD GYM
          </p>
          <h1 className="text-2xl font-black text-amber-950 leading-snug mb-2">
            あなたの<br />
            <span className="text-amber-600">ダイエットタイプ</span>は？
          </h1>
          <p className="text-amber-800/60 text-sm">
            当てはまるものを<span className="text-amber-700 font-bold">すべて</span>チェックしてね
          </p>
        </div>

        {/* チェックリスト */}
        {checkGroups.map((group, gi) => (
          <div key={gi} className="flex flex-col gap-2">
            <div className="flex items-center gap-2 mb-1 px-1">
              <span className="text-base">{groupIcons[gi]}</span>
              <p className="text-amber-900 font-bold text-sm">{group.title}</p>
            </div>

            {group.items.map((item) => {
              const isChecked = checked.has(item.id);
              return (
                <button
                  key={item.id}
                  onClick={() => toggle(item.id)}
                  className={`
                    w-full text-left px-4 py-3.5 rounded-2xl border-2 transition-all text-sm leading-relaxed
                    ${isChecked
                      ? "bg-amber-50 border-amber-400 text-amber-900 shadow-sm"
                      : "bg-white border-amber-100 text-amber-800/80 active:bg-amber-50/50"
                    }
                  `}
                >
                  <div className="flex items-center gap-3">
                    <div className={`
                      w-5 h-5 rounded-md border-2 shrink-0 flex items-center justify-center transition-all
                      ${isChecked
                        ? "bg-amber-500 border-amber-500"
                        : "border-amber-200"
                      }
                    `}>
                      {isChecked && (
                        <svg viewBox="0 0 16 16" fill="none" className="w-3 h-3">
                          <path d="M3 8l3 3 7-7" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      )}
                    </div>
                    <span>{item.text}</span>
                  </div>
                </button>
              );
            })}
          </div>
        ))}

        {/* 診断ボタン */}
        <div className="sticky bottom-4 pt-4">
          <button
            onClick={handleSubmit}
            disabled={checked.size === 0}
            className={`
              w-full py-4 rounded-2xl font-bold text-base shadow-lg transition-all
              ${checked.size > 0
                ? "bg-gradient-to-r from-amber-500 to-orange-400 text-white active:scale-95 shadow-amber-300/30"
                : "bg-amber-100 text-amber-300 cursor-not-allowed"
              }
            `}
          >
            {checked.size > 0
              ? `${checked.size}個チェック済み — 診断する ✨`
              : "1つ以上チェックしてね"}
          </button>
        </div>

        <p className="text-center text-amber-600/40 text-xs pb-4">
          全{totalItems}項目 · 約1分で完了
        </p>
      </div>
    </main>
  );
}
