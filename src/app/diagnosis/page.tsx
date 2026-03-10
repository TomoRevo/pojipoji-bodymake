"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { questions, calcType } from "@/lib/diagnosis";
import DiagnosisCard from "@/components/DiagnosisCard";

export default function DiagnosisPage() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<("A" | "B" | "C" | "D")[]>([]);
  const [animating, setAnimating] = useState(false);

  const handleAnswer = (value: "A" | "B" | "C" | "D") => {
    if (animating) return;

    const newAnswers = [...answers, value];
    setAnswers(newAnswers);

    if (step < questions.length - 1) {
      setAnimating(true);
      setTimeout(() => {
        setStep(step + 1);
        setAnimating(false);
      }, 200);
    } else {
      // 診断完了 → 結果ページへ
      const type = calcType(newAnswers);
      router.push(`/result/${type}`);
    }
  };

  const currentQuestion = questions[step];

  return (
    <main className="min-h-screen bg-gradient-to-b from-pink-50 to-white px-4 py-10">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <p className="text-sm text-pink-500 font-semibold tracking-wider mb-1">
            STAY GOLD GYM
          </p>
          <h1 className="text-xl font-bold text-gray-800">
            30秒でわかる！
            <br />
            あなたに合うダイエットタイプ診断
          </h1>
        </div>

        {/* Card */}
        <div
          className={`transition-opacity duration-200 ${
            animating ? "opacity-0" : "opacity-100"
          }`}
        >
          <DiagnosisCard
            question={currentQuestion}
            current={step + 1}
            total={questions.length}
            onAnswer={handleAnswer}
          />
        </div>

        {/* Footer note */}
        <p className="text-center text-xs text-gray-400 mt-8">
          タップするだけで次の質問に進みます
        </p>
      </div>
    </main>
  );
}
