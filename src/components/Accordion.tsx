"use client";

import { useState, ReactNode } from "react";

interface AccordionProps {
  title: ReactNode;
  summary?: string;
  defaultOpen?: boolean;
  children: ReactNode;
  onToggle?: (isOpen: boolean) => void;
}

export default function Accordion({
  title,
  summary,
  defaultOpen = false,
  children,
  onToggle,
}: AccordionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  const toggle = () => {
    const next = !isOpen;
    setIsOpen(next);
    onToggle?.(next);
  };

  return (
    <div>
      <button
        onClick={toggle}
        className="w-full text-left flex items-center justify-between gap-2"
        aria-expanded={isOpen}
      >
        <div className="flex-1 min-w-0">
          {title}
          {!isOpen && summary && (
            <p className="text-xs text-gray-400 mt-1 truncate">{summary}</p>
          )}
        </div>
        <svg
          viewBox="0 0 20 20"
          fill="currentColor"
          className={`w-5 h-5 text-gray-400 shrink-0 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        >
          <path
            fillRule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </button>
      {isOpen && <div className="mt-4">{children}</div>}
    </div>
  );
}
