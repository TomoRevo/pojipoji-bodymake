"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { questions, calcType } from "@/lib/diagnosis";
import DiagnosisCard from "@/components/DiagnosisCard";
import HamburgerMenu from "@/components/HamburgerMenu";

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
    const labels = ["BMI_score", "metabolism_rate", "lifestyle_fit"];
    const generate = () =>
      labels.map((l) => `${l}: ${(Math.random() * 100).toFixed(2)}`);
    setLines(generate());
    const t = setInterval(() => setLines(generate()), 280);
    return () => clearInterval(t);
  }, []);

  return (
    <>
      {lines.map((l, i) => (
        <div key={i}>{l}</div>
      ))}
    </>
  );
}

function AnalyzingScreen() {
  const [stepIndex, setStepIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const textTimer = setInterval(() => {
      setStepIndex((i) => Math.min(i + 1, analyzingSteps.length - 1));
    }, 550);

    const progressTimer = setInterval(() => {
      setProgress((p) => {
        if (p >= 95) return 95;
        return p + (p < 70 ? 2.5 : 0.8);
      });
    }, 40);

    return () => {
      clearInterval(textTimer);
      clearInterval(progressTimer);
    };
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-900 px-5 relative overflow-hidden">
      {/* 背景グロー */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-orange-500 rounded-full blur-[150px] opacity-10 pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center gap-8 w-full max-w-xs">

        {/* スピナー */}
        <div className="relative w-32 h-32">
          {/* 外リング */}
          <svg
            className="w-32 h-32 absolute inset-0"
            style={{ animation: "spin 1.2s linear infinite" }}
            viewBox="0 0 128 128"
            fill="none"
          >
            <circle cx="64" cy="64" r="56" stroke="#1e293b" strokeWidth="4" />
            <circle
              cx="64" cy="64" r="56"
              stroke="url(#g1)"
              strokeWidth="4"
              strokeLinecap="round"
              strokeDasharray="280"
              strokeDashoffset="210"
            />
            <defs>
              <linearGradient id="g1" x1="0" y1="0" x2="128" y2="128" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#f97316" />
                <stop offset="100%" stopColor="#fbbf24" stopOpacity="0.1" />
              </linearGradient>
            </defs>
          </svg>

          {/* 内リング（逆回転） */}
          <svg
            className="w-20 h-20 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
            style={{ animation: "spin 2s linear infinite reverse" }}
            viewBox="0 0 80 80"
            fill="none"
          >
            <circle
              cx="40" cy="40" r="30"
              stroke="#f97316"
              strokeWidth="2"
              strokeOpacity="0.25"
              strokeDasharray="100"
              strokeDashoffset="50"
            />
          </svg>

          {/* 中央パルス */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div
              className="w-10 h-10 rounded-full bg-orange-500/20 border border-orange-500/40 flex items-center justify-center"
              style={{ animation: "pulse 1.5s ease-in-out infinite" }}
            >
              <div className="w-4 h-4 rounded-full bg-orange-500" />
            </div>
          </div>
        </div>

        {/* タイトル */}
        <div className="text-center">
          <p className="text-white font-black text-2xl mb-2">診断中</p>
          <p
            key={stepIndex}
            className="text-orange-400/80 text-sm"
            style={{ animation: "fadeSlide 0.35s ease" }}
          >
            {analyzingSteps[stepIndex]}
          </p>
        </div>

        {/* プログレスバー */}
        <div className="w-full">
          <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden border border-slate-700">
            <div
              className="bg-gradient-to-r from-orange-500 to-amber-400 h-2 rounded-full transition-all duration-100"
              style={{ width: `${Math.round(progress)}%` }}
            />
          </div>
          <div className="flex justify-between mt-1.5">
            <span className="text-slate-600 text-xs">analyzing...</span>
            <span className="text-orange-400 text-xs font-mono font-bold">
              {Math.round(progress)}%
            </span>
          </div>
        </div>

        {/* データフリッカー */}
        <div className="font-mono text-xs text-slate-700 text-center leading-relaxed select-none w-full border border-slate-800 rounded-xl p-3 bg-slate-900/50">
          <DataFlicker />
        </div>
      </div>

    </div>
  );
}

export default function DiagnosisPage() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<("A" | "B" | "C" | "D")[]>([]);
  const [animating, setAnimating] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleAnswer = (value: "A" | "B" | "C" | "D") => {
    if (animating || isAnalyzing) return;

    const newAnswers = [...answers, value];
    setAnswers(newAnswers);

    if (step < questions.length - 1) {
      setAnimating(true);
      setTimeout(() => {
        setStep(step + 1);
        setAnimating(false);
      }, 300);
    } else {
      setIsAnalyzing(true);
      const type = calcType(newAnswers);
      setTimeout(() => {
        router.push(`/result/${type}`);
      }, 3200);
    }
  };

  if (isAnalyzing) {
    return <AnalyzingScreen />;
  }

  return (
    <main className="min-h-screen bg-slate-900 px-5 py-10 relative overflow-hidden">
      <HamburgerMenu />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-80 h-80 bg-orange-500 rounded-full blur-[130px] opacity-8 pointer-events-none" />

      <div className="relative z-10 max-w-md mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <p className="text-xs tracking-[0.3em] text-orange-400 uppercase font-semibold mb-3">
            Stay Gold Gym
          </p>
          <h1 className="text-xl font-black text-white leading-snug">
            30秒でわかる
            <br />
            <span className="text-orange-400">ダイエットタイプ診断</span>
          </h1>
        </div>

        <DiagnosisCard
          question={questions[step]}
          current={step + 1}
          total={questions.length}
          onAnswer={handleAnswer}
          animating={animating}
        />

        <p className="text-center text-slate-600 text-xs mt-8">
          タップするだけで次の質問へ進みます
        </p>
      </div>
    </main>
  );
}
