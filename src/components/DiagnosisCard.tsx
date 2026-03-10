"use client";

import { Question } from "@/lib/diagnosis";

interface Props {
  question: Question;
  current: number;
  total: number;
  onAnswer: (value: "A" | "B" | "C" | "D") => void;
}

export default function DiagnosisCard({
  question,
  current,
  total,
  onAnswer,
}: Props) {
  const progress = (current / total) * 100;

  return (
    <div className="flex flex-col gap-6">
      {/* Progress */}
      <div>
        <div className="flex justify-between text-sm text-gray-500 mb-2">
          <span>質問 {current} / {total}</span>
          <span>{Math.round(progress)}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-pink-500 h-2 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Question */}
      <div className="bg-white rounded-2xl p-6 shadow-sm">
        <p className="text-lg font-bold text-gray-800 leading-relaxed">
          Q{question.id}. {question.text}
        </p>
      </div>

      {/* Options */}
      <div className="flex flex-col gap-3">
        {question.options.map((opt) => (
          <button
            key={opt.value}
            onClick={() => onAnswer(opt.value)}
            className="w-full text-left bg-white border-2 border-gray-100 rounded-2xl px-5 py-4 text-gray-700 font-medium hover:border-pink-400 hover:bg-pink-50 active:scale-95 transition-all duration-150 shadow-sm"
          >
            <span className="text-pink-500 font-bold mr-3">{opt.value}</span>
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  );
}
