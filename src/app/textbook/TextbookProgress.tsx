"use client";

import { useState, useEffect } from "react";

interface Props {
  totalChapters: number;
}

export default function TextbookProgress({ totalChapters }: Props) {
  const [progress, setProgress] = useState(0);
  const [currentChapter, setCurrentChapter] = useState(0);

  useEffect(() => {
    function handleScroll() {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrolled = scrollHeight > 0 ? window.scrollY / scrollHeight : 0;
      setProgress(Math.min(scrolled * 100, 100));

      let chapter = 0;
      for (let i = totalChapters; i >= 1; i--) {
        const el = document.getElementById(`chapter-${i}`);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 100) {
            chapter = i;
            break;
          }
        }
      }
      setCurrentChapter(chapter);
    }

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [totalChapters]);

  return (
    <div className="fixed top-0 left-0 right-0 z-40">
      <div className="h-1 bg-gray-200">
        <div
          className="h-1 bg-gradient-to-r from-orange-500 to-amber-400 transition-all duration-150"
          style={{ width: `${progress}%` }}
        />
      </div>
      {currentChapter > 0 && (
        <div className="absolute top-1 left-4 bg-white/90 backdrop-blur-sm border border-gray-200 rounded-full px-3 py-1 shadow-sm">
          <span className="text-xs font-bold text-gray-500">
            第{currentChapter}章
          </span>
        </div>
      )}
    </div>
  );
}
