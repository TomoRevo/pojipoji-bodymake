// Inline SVG icons and illustrations for the guide page

export function KeyIcon() {
  return (
    <svg viewBox="0 0 48 48" className="w-10 h-10" role="img" aria-label="鍵アイコン">
      <circle cx="24" cy="24" r="22" fill="#fef3c7" />
      <path d="M20,18 a6,6 0 1,1 8,0 a6,6 0 1,1 -8,0" fill="none" stroke="#f59e0b" strokeWidth="2.5" />
      <line x1="24" y1="24" x2="24" y2="36" stroke="#f59e0b" strokeWidth="2.5" />
      <line x1="24" y1="32" x2="28" y2="32" stroke="#f59e0b" strokeWidth="2.5" />
      <line x1="24" y1="28" x2="27" y2="28" stroke="#f59e0b" strokeWidth="2" />
    </svg>
  );
}

export function HeartIcon() {
  return (
    <svg viewBox="0 0 48 48" className="w-10 h-10" role="img" aria-label="ハートアイコン">
      <circle cx="24" cy="24" r="22" fill="#fce7f3" />
      <path
        d="M24,34 C18,28 12,23 12,18 C12,14 15,11 18,11 C20,11 22,12 24,15 C26,12 28,11 30,11 C33,11 36,14 36,18 C36,23 30,28 24,34Z"
        fill="#f43f5e"
        opacity={0.85}
      />
    </svg>
  );
}

export function ScaleIcon() {
  return (
    <svg viewBox="0 0 48 48" className="w-10 h-10" role="img" aria-label="体重計アイコン">
      <circle cx="24" cy="24" r="22" fill="#e0f2fe" />
      <rect x="12" y="18" width="24" height="18" rx="3" fill="#0ea5e9" opacity={0.8} />
      <circle cx="24" cy="27" r="6" fill="#fff" opacity={0.9} />
      <line x1="24" y1="27" x2="28" y2="24" stroke="#0ea5e9" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export function SunriseIcon() {
  return (
    <svg viewBox="0 0 40 40" className="w-8 h-8" role="img" aria-label="朝のアイコン">
      <circle cx="20" cy="28" r="8" fill="#fbbf24" opacity={0.8} />
      <line x1="20" y1="14" x2="20" y2="18" stroke="#fbbf24" strokeWidth="2" strokeLinecap="round" />
      <line x1="10" y1="20" x2="13" y2="23" stroke="#fbbf24" strokeWidth="2" strokeLinecap="round" />
      <line x1="30" y1="20" x2="27" y2="23" stroke="#fbbf24" strokeWidth="2" strokeLinecap="round" />
      <line x1="8" y1="30" x2="32" y2="30" stroke="#d1d5db" strokeWidth="1.5" />
    </svg>
  );
}

export function WaterIcon() {
  return (
    <svg viewBox="0 0 40 40" className="w-8 h-8" role="img" aria-label="水のアイコン">
      <path d="M20,8 Q14,20 14,26 A6,6 0 0,0 26,26 Q26,20 20,8Z" fill="#38bdf8" opacity={0.75} />
    </svg>
  );
}

export function NoteIcon() {
  return (
    <svg viewBox="0 0 40 40" className="w-8 h-8" role="img" aria-label="メモのアイコン">
      <rect x="10" y="6" width="20" height="28" rx="2" fill="#a78bfa" opacity={0.8} />
      <line x1="14" y1="14" x2="26" y2="14" stroke="#fff" strokeWidth="1.5" />
      <line x1="14" y1="19" x2="26" y2="19" stroke="#fff" strokeWidth="1.5" />
      <line x1="14" y1="24" x2="22" y2="24" stroke="#fff" strokeWidth="1.5" />
    </svg>
  );
}

export function ForkKnifeIcon() {
  return (
    <svg viewBox="0 0 40 40" className="w-8 h-8" role="img" aria-label="食事アイコン">
      <line x1="14" y1="8" x2="14" y2="32" stroke="#f97316" strokeWidth="2" strokeLinecap="round" />
      <line x1="10" y1="8" x2="10" y2="16" stroke="#f97316" strokeWidth="2" strokeLinecap="round" />
      <line x1="18" y1="8" x2="18" y2="16" stroke="#f97316" strokeWidth="2" strokeLinecap="round" />
      <line x1="10" y1="16" x2="18" y2="16" stroke="#f97316" strokeWidth="2" strokeLinecap="round" />
      <path d="M26,8 Q32,14 26,20 L26,32" fill="none" stroke="#f97316" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export function TimerIcon() {
  return (
    <svg viewBox="0 0 40 40" className="w-8 h-8" role="img" aria-label="タイマーアイコン">
      <circle cx="20" cy="22" r="13" fill="none" stroke="#0ea5e9" strokeWidth="2" />
      <line x1="20" y1="22" x2="20" y2="14" stroke="#0ea5e9" strokeWidth="2" strokeLinecap="round" />
      <line x1="20" y1="22" x2="26" y2="22" stroke="#0ea5e9" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="18" y1="6" x2="22" y2="6" stroke="#0ea5e9" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export function DumbbellIcon() {
  return (
    <svg viewBox="0 0 40 40" className="w-8 h-8" role="img" aria-label="ダンベルアイコン">
      <rect x="6" y="14" width="6" height="12" rx="2" fill="#8b5cf6" opacity={0.8} />
      <rect x="28" y="14" width="6" height="12" rx="2" fill="#8b5cf6" opacity={0.8} />
      <rect x="12" y="18" width="16" height="4" rx="1" fill="#8b5cf6" opacity={0.6} />
    </svg>
  );
}

export function StairsIcon() {
  return (
    <svg viewBox="0 0 40 40" className="w-8 h-8" role="img" aria-label="階段アイコン">
      <path d="M8,32 L8,24 L16,24 L16,16 L24,16 L24,8 L32,8" fill="none" stroke="#10b981" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function MoonIcon() {
  return (
    <svg viewBox="0 0 40 40" className="w-8 h-8" role="img" aria-label="月のアイコン">
      <path d="M22,8 A12,12 0 1,0 22,32 A8,8 0 1,1 22,8Z" fill="#6366f1" opacity={0.7} />
    </svg>
  );
}

export function CalendarIcon() {
  return (
    <svg viewBox="0 0 40 40" className="w-8 h-8" role="img" aria-label="カレンダーアイコン">
      <rect x="8" y="10" width="24" height="22" rx="3" fill="#f43f5e" opacity={0.8} />
      <rect x="8" y="10" width="24" height="8" rx="3" fill="#e11d48" />
      <line x1="14" y1="6" x2="14" y2="14" stroke="#374151" strokeWidth="2" strokeLinecap="round" />
      <line x1="26" y1="6" x2="26" y2="14" stroke="#374151" strokeWidth="2" strokeLinecap="round" />
      <rect x="13" y="22" width="4" height="3" rx="0.5" fill="#fff" opacity={0.8} />
      <rect x="20" y="22" width="4" height="3" rx="0.5" fill="#fff" opacity={0.8} />
      <rect x="13" y="27" width="4" height="3" rx="0.5" fill="#fff" opacity={0.8} />
    </svg>
  );
}

export function ChartIcon() {
  return (
    <svg viewBox="0 0 40 40" className="w-8 h-8" role="img" aria-label="記録アイコン">
      <rect x="8" y="24" width="6" height="10" rx="1" fill="#eab308" opacity={0.7} />
      <rect x="17" y="18" width="6" height="16" rx="1" fill="#f97316" opacity={0.7} />
      <rect x="26" y="10" width="6" height="24" rx="1" fill="#f43f5e" opacity={0.7} />
    </svg>
  );
}

// Timeline for "3 months later" section
export function ThreeMonthTimeline({ gradient }: { gradient: string }) {
  return (
    <svg viewBox="0 0 320 100" className="w-full max-w-sm mx-auto" role="img" aria-label="3ヶ月の変化">
      {/* Line */}
      <line x1="40" y1="40" x2="280" y2="40" stroke="#e2e8f0" strokeWidth="3" />

      {/* Month 1 */}
      <circle cx="40" cy="40" r="16" fill="#94a3b8" />
      <text x="40" y="44" textAnchor="middle" fill="#fff" fontSize="10" fontWeight="bold">1</text>
      <text x="40" y="70" textAnchor="middle" fill="#64748b" fontSize="9" fontWeight="bold">1ヶ月目</text>
      <text x="40" y="83" textAnchor="middle" fill="#94a3b8" fontSize="8">習慣づくり</text>

      {/* Arrow */}
      <polygon points="100,37 112,40 100,43" fill="#94a3b8" />

      {/* Month 2 */}
      <circle cx="160" cy="40" r="16" fill="#64748b" />
      <text x="160" y="44" textAnchor="middle" fill="#fff" fontSize="10" fontWeight="bold">2</text>
      <text x="160" y="70" textAnchor="middle" fill="#64748b" fontSize="9" fontWeight="bold">2ヶ月目</text>
      <text x="160" y="83" textAnchor="middle" fill="#94a3b8" fontSize="8">変化を実感</text>

      {/* Arrow */}
      <polygon points="220,37 232,40 220,43" fill="#64748b" />

      {/* Month 3 */}
      <circle cx="280" cy="40" r="16" fill="#f97316" />
      <text x="280" y="44" textAnchor="middle" fill="#fff" fontSize="10" fontWeight="bold">3</text>
      <text x="280" y="70" textAnchor="middle" fill="#374151" fontSize="9" fontWeight="bold">3ヶ月目</text>
      <text x="280" y="83" textAnchor="middle" fill="#f97316" fontSize="8">自分が変わる</text>
    </svg>
  );
}
