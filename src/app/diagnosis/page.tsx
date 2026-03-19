"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { checkGroups, calcType } from "@/lib/diagnosis";
const MIN_CHECKS = 5;

/* ── 分析中画面 ── */
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
    <div className="flex flex-col items-center justify-center min-h-screen bg-white px-5">
      <div className="flex flex-col items-center gap-8 w-full max-w-xs">
        <div className="relative w-24 h-24">
          <div className="absolute inset-0 rounded-full border-4 border-gray-100" />
          <div
            className="absolute inset-0 rounded-full border-4 border-transparent border-t-amber-500 border-r-amber-400"
            style={{ animation: "spin 1.2s linear infinite" }}
          />
        </div>

        <div className="text-center">
          <p className="text-gray-900 font-bold text-lg mb-2">あなたのタイプを診断中</p>
          <p key={stepIndex} className="text-gray-500 text-sm" style={{ animation: "fadeSlide 0.35s ease" }}>
            {analyzingSteps[stepIndex]}
          </p>
        </div>

        <div className="w-full">
          <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
            <div
              className="bg-amber-500 h-2 rounded-full transition-all duration-100"
              style={{ width: `${Math.round(progress)}%` }}
            />
          </div>
          <p className="text-center text-gray-400 text-xs mt-2">{Math.round(progress)}%</p>
        </div>
      </div>
    </div>
  );
}

/* ── メイン ── */
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

  const canSubmit = checked.size >= MIN_CHECKS;

  const handleSubmit = () => {
    if (!canSubmit) return;
    setIsAnalyzing(true);
    const type = calcType(Array.from(checked));
    setTimeout(() => router.push(`/result/${type}`), 3200);
  };

  if (isAnalyzing) return <AnalyzingScreen />;

  return (
    <main className="min-h-screen bg-white px-4 py-8">
      <div className="max-w-md mx-auto flex flex-col gap-6">

        {/* Header */}
        <div className="text-center pt-2 pb-2">
          <p className="text-[11px] tracking-[0.15em] text-gray-400 font-medium mb-3">STAY GOLD GYM</p>
          <h1 className="text-[22px] font-black text-gray-900 leading-snug mb-2">
            あなたのダイエットタイプ診断
          </h1>
          <p className="text-gray-500 text-sm leading-relaxed">
            当てはまるものをすべてチェックしてください<br />
            <span className="text-gray-400 text-xs">タップするだけ・約1分で完了します</span>
          </p>
        </div>

        {/* チェックリスト */}
        {checkGroups.map((group, gi) => (
          <div key={gi} className="flex flex-col gap-2">
            <p className="text-gray-900 font-bold text-[13px] px-1 pb-1 border-b border-gray-100">
              {group.title}
            </p>

            {group.items.map((item) => {
              const isChecked = checked.has(item.id);
              return (
                <button
                  key={item.id}
                  onClick={() => toggle(item.id)}
                  className={`
                    w-full text-left px-4 py-3 rounded-xl border transition-all text-[13px] leading-relaxed
                    ${isChecked
                      ? "bg-amber-50 border-amber-400 text-gray-900"
                      : "bg-white border-gray-200 text-gray-700 active:bg-gray-50"
                    }
                  `}
                >
                  <div className="flex items-center gap-3">
                    <div className={`
                      w-[18px] h-[18px] rounded border-2 shrink-0 flex items-center justify-center transition-all
                      ${isChecked ? "bg-amber-500 border-amber-500" : "border-gray-300"}
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
        <div className="sticky bottom-4 pt-3">
          <button
            onClick={handleSubmit}
            disabled={!canSubmit}
            className={`
              w-full py-4 rounded-2xl font-bold text-[15px] shadow-md transition-all
              ${canSubmit
                ? "bg-amber-500 text-white active:scale-[0.98] shadow-amber-200/50"
                : "bg-gray-100 text-gray-400 cursor-not-allowed"
              }
            `}
          >
            {canSubmit
              ? `${checked.size}個チェック済み — 診断する`
              : checked.size === 0
                ? "当てはまるものをチェックしてください"
                : `あと${MIN_CHECKS - checked.size}個以上チェックすると診断できます`
            }
          </button>
        </div>
      </div>
    </main>
  );
}
