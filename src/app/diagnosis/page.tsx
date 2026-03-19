"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { checkGroups, calcType } from "@/lib/diagnosis";
import HamburgerMenu from "@/components/HamburgerMenu";

/* ── 分析中画面 ── */

const analyzingSteps = [
  "回答データを収集中...",
  "あなたのパターンを分析中...",
  "ダイエットタイプを算出中...",
  "専用プログラムを生成中...",
  "結果をまとめています...",
];

function DataFlicker() {
  const [lines, setLines] = useState<string[]>([]);
  useEffect(() => {
    const labels = ["pattern_score", "habit_index", "potential_rate"];
    const gen = () => labels.map((l) => `${l}: ${(Math.random() * 100).toFixed(2)}`);
    setLines(gen());
    const t = setInterval(() => setLines(gen()), 280);
    return () => clearInterval(t);
  }, []);
  return <>{lines.map((l, i) => <div key={i}>{l}</div>)}</>;
}

function AnalyzingScreen() {
  const [stepIndex, setStepIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const t1 = setInterval(() => setStepIndex((i) => Math.min(i + 1, analyzingSteps.length - 1)), 550);
    const t2 = setInterval(() => setProgress((p) => p >= 95 ? 95 : p + (p < 70 ? 2.5 : 0.8)), 40);
    return () => { clearInterval(t1); clearInterval(t2); };
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-900 px-5 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-orange-500 rounded-full blur-[150px] opacity-10 pointer-events-none" />
      <div className="relative z-10 flex flex-col items-center gap-8 w-full max-w-xs">
        {/* spinner */}
        <div className="relative w-32 h-32">
          <svg className="w-32 h-32 absolute inset-0" style={{ animation: "spin 1.2s linear infinite" }} viewBox="0 0 128 128" fill="none">
            <circle cx="64" cy="64" r="56" stroke="#1e293b" strokeWidth="4" />
            <circle cx="64" cy="64" r="56" stroke="url(#g1)" strokeWidth="4" strokeLinecap="round" strokeDasharray="280" strokeDashoffset="210" />
            <defs><linearGradient id="g1" x1="0" y1="0" x2="128" y2="128" gradientUnits="userSpaceOnUse"><stop offset="0%" stopColor="#f97316" /><stop offset="100%" stopColor="#fbbf24" stopOpacity="0.1" /></linearGradient></defs>
          </svg>
          <svg className="w-20 h-20 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" style={{ animation: "spin 2s linear infinite reverse" }} viewBox="0 0 80 80" fill="none">
            <circle cx="40" cy="40" r="30" stroke="#f97316" strokeWidth="2" strokeOpacity="0.25" strokeDasharray="100" strokeDashoffset="50" />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-10 h-10 rounded-full bg-orange-500/20 border border-orange-500/40 flex items-center justify-center" style={{ animation: "pulse 1.5s ease-in-out infinite" }}>
              <div className="w-4 h-4 rounded-full bg-orange-500" />
            </div>
          </div>
        </div>

        <div className="text-center">
          <p className="text-white font-black text-2xl mb-2">診断中</p>
          <p key={stepIndex} className="text-orange-400/80 text-sm" style={{ animation: "fadeSlide 0.35s ease" }}>{analyzingSteps[stepIndex]}</p>
        </div>

        <div className="w-full">
          <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden border border-slate-700">
            <div className="bg-gradient-to-r from-orange-500 to-amber-400 h-2 rounded-full transition-all duration-100" style={{ width: `${Math.round(progress)}%` }} />
          </div>
          <div className="flex justify-between mt-1.5">
            <span className="text-slate-600 text-xs">analyzing...</span>
            <span className="text-orange-400 text-xs font-mono font-bold">{Math.round(progress)}%</span>
          </div>
        </div>

        <div className="font-mono text-xs text-slate-700 text-center leading-relaxed select-none w-full border border-slate-800 rounded-xl p-3 bg-slate-900/50">
          <DataFlicker />
        </div>
      </div>
    </div>
  );
}

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
    <main className="min-h-screen bg-slate-900 px-4 py-8 relative overflow-hidden">
      <HamburgerMenu />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-80 h-80 bg-orange-500 rounded-full blur-[130px] opacity-[0.06] pointer-events-none" />

      <div className="relative z-10 max-w-md mx-auto flex flex-col gap-6">

        {/* Header */}
        <div className="text-center">
          <p className="text-xs tracking-[0.2em] text-slate-500 uppercase font-semibold mb-3">
            Stay Gold Gym
          </p>
          <h1 className="text-xl font-black text-white leading-snug mb-2">
            あなたの<span className="text-orange-400">ダイエットタイプ</span>は？
          </h1>
          <p className="text-slate-400 text-sm">
            当てはまるものを<span className="text-orange-400 font-bold">すべて</span>チェックしてください
          </p>
        </div>

        {/* チェックリスト */}
        {checkGroups.map((group, gi) => (
          <div key={gi} className="flex flex-col gap-2">
            <div className="flex items-center gap-2 mb-1">
              <div className="w-1.5 h-1.5 rounded-full bg-orange-400" />
              <p className="text-white font-bold text-sm">{group.title}</p>
            </div>

            {group.items.map((item) => {
              const isChecked = checked.has(item.id);
              return (
                <button
                  key={item.id}
                  onClick={() => toggle(item.id)}
                  className={`
                    w-full text-left px-4 py-3 rounded-xl border transition-all text-sm
                    ${isChecked
                      ? "bg-orange-500/10 border-orange-500/40 text-white"
                      : "bg-slate-800/50 border-slate-700/50 text-slate-300 active:bg-slate-800"
                    }
                  `}
                >
                  <div className="flex items-center gap-3">
                    <div className={`
                      w-5 h-5 rounded border-2 shrink-0 flex items-center justify-center transition-all
                      ${isChecked
                        ? "bg-orange-500 border-orange-500"
                        : "border-slate-600"
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
              w-full py-4 rounded-2xl font-black text-base shadow-lg transition-all
              ${checked.size > 0
                ? "bg-gradient-to-r from-orange-500 to-amber-400 text-white active:scale-95 shadow-orange-500/20"
                : "bg-slate-800 text-slate-600 cursor-not-allowed"
              }
            `}
          >
            {checked.size > 0
              ? `${checked.size}個チェック済み — 診断する →`
              : "1つ以上チェックしてください"
            }
          </button>
        </div>

        <p className="text-center text-slate-600 text-xs pb-4">
          全{totalItems}項目 · 所要時間 約1分
        </p>
      </div>
    </main>
  );
}
