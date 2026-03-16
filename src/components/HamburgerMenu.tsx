"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";

const LINE_URL = process.env.NEXT_PUBLIC_LINE_ADD_URL || "#";

const menuItems = [
  { label: "ホーム", href: "/" },
  { label: "診断", href: "/diagnosis" },
  { label: "あなたのガイド", href: "/diagnosis", note: "診断結果からアクセス" },
  { label: "ダイエットの教科書", href: "/textbook" },
  {
    label: "体験セッション",
    href: LINE_URL,
    external: true,
  },
];

export default function HamburgerMenu() {
  const [open, setOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
      // フォーカスをメニューに移動
      setTimeout(() => {
        navRef.current?.focus();
      }, 100);
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Escキーで閉じる
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape" && open) {
        close();
      }
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open, close]);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="fixed top-4 right-4 z-50 w-11 h-11 rounded-full bg-slate-800/80 backdrop-blur-sm border border-slate-700/50 flex items-center justify-center text-white text-xl active:scale-95 transition-transform"
        aria-label="メニューを開く"
      >
        &#9776;
      </button>

      {/* Overlay */}
      <div
        className={`fixed inset-0 z-[60] bg-black/60 transition-opacity duration-300 ${
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={close}
      />

      {/* Slide-in panel */}
      <nav
        ref={navRef}
        role="dialog"
        aria-modal="true"
        aria-label="メニュー"
        tabIndex={-1}
        className={`fixed top-0 right-0 z-[70] h-full w-72 bg-slate-900 border-l border-slate-700/50 shadow-2xl flex flex-col transition-transform duration-300 ease-out ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between px-5 pt-5 pb-3">
          <p className="text-xs tracking-[0.2em] text-orange-400 font-semibold uppercase">
            STAY GOLD
          </p>
          <button
            onClick={close}
            className="w-9 h-9 rounded-full bg-slate-800 border border-slate-700/50 flex items-center justify-center text-slate-400 text-lg active:scale-95 transition-transform"
            aria-label="メニューを閉じる"
          >
            &#10005;
          </button>
        </div>

        <div className="flex-1 flex flex-col gap-1 px-3 pt-4">
          {menuItems.map((item) =>
            item.external ? (
              <a
                key={item.label}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                onClick={close}
                className="flex items-center gap-3 px-4 py-3.5 rounded-xl text-slate-300 hover:bg-slate-800 hover:text-white transition-colors text-sm font-medium"
              >
                {item.label}
                <svg
                  viewBox="0 0 16 16"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  className="w-3.5 h-3.5 opacity-50 ml-auto"
                >
                  <path d="M6 3h7v7M13 3L6 10" />
                </svg>
              </a>
            ) : (
              <Link
                key={item.label}
                href={item.href}
                onClick={close}
                className="flex items-center justify-between px-4 py-3.5 rounded-xl text-slate-300 hover:bg-slate-800 hover:text-white transition-colors text-sm font-medium"
              >
                <span>{item.label}</span>
                {"note" in item && item.note && (
                  <span className="text-[10px] text-slate-500">{item.note}</span>
                )}
              </Link>
            )
          )}
        </div>

        <div className="px-5 py-6 border-t border-slate-800">
          <p className="text-slate-600 text-xs">
            &copy; 2026 STAY GOLD GYM
          </p>
        </div>
      </nav>
    </>
  );
}
