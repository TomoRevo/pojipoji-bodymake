"use client";

import { Question } from "@/lib/diagnosis";

interface Props {
  question: Question;
  current: number;
  total: number;
  onAnswer: (value: "A" | "B" | "C" | "D") => void;
  animating: boolean;
}

export default function DiagnosisCard({
  question,
  current,
  total,
  onAnswer,
  animating,
}: Props) {
  const progress = (current / total) * 100;

  return (
    <div
      className={`flex flex-col gap-5 transition-all duration-300 ${
        animating ? "opacity-0 translate-y-3" : "opacity-100 translate-y-0"
      }`}
    >
      {/* Progress */}
      <div>
        <div className="flex justify-between text-xs text-slate-500 mb-2">
          <span className="font-bold text-orange-400">Q{current} / {total}</span>
          <span>{Math.round(progress)}%</span>
        </div>
        <div className="w-full bg-slate-700 rounded-full h-1.5">
          <div
            className="bg-gradient-to-r from-orange-500 to-amber-400 h-1.5 rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Question */}
      <div className="bg-slate-800/80 border border-slate-700/60 rounded-2xl p-6">
        <p className="text-white font-black text-lg leading-snug">
          {question.text}
        </p>
      </div>

      {/* Options */}
      <div className="flex flex-col gap-3">
        {question.options.map((opt) => (
          <button
            key={opt.value}
            onClick={() => onAnswer(opt.value)}
            className="w-full text-left bg-slate-800/60 border border-slate-700/50 hover:border-orange-500/60 hover:bg-slate-700/60 active:scale-[0.98] rounded-2xl px-5 py-4 transition-all duration-150 flex items-center gap-4 group"
          >
            <span className="w-8 h-8 rounded-full border border-slate-600 group-hover:border-orange-400 group-hover:bg-orange-500/10 flex items-center justify-center text-xs font-black text-slate-400 group-hover:text-orange-400 shrink-0 transition-all">
              {opt.value}
            </span>
            <span className="text-sm text-slate-300 group-hover:text-white transition-colors">{opt.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
