export default function DancerSVG({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 200 340"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/* 光の輪（後ろ） */}
      <ellipse cx="100" cy="320" rx="60" ry="10" fill="#f97316" opacity="0.2" />

      {/* 頭 */}
      <circle cx="100" cy="38" r="22" fill="#fb923c" />

      {/* 髪のハイライト */}
      <ellipse cx="95" cy="22" rx="14" ry="8" fill="#fed7aa" opacity="0.5" />

      {/* 体幹 */}
      <path
        d="M78 60 Q100 58 122 60 L118 130 Q100 135 82 130 Z"
        fill="#ea580c"
      />

      {/* 左腕（上げている） */}
      <path
        d="M78 70 Q55 50 30 30"
        stroke="#fb923c"
        strokeWidth="14"
        strokeLinecap="round"
      />
      {/* 左手 */}
      <circle cx="30" cy="30" r="9" fill="#fb923c" />

      {/* 右腕（横に広げている） */}
      <path
        d="M122 75 Q152 90 178 75"
        stroke="#fb923c"
        strokeWidth="14"
        strokeLinecap="round"
      />
      {/* 右手 */}
      <circle cx="178" cy="75" r="9" fill="#fb923c" />

      {/* 腰 */}
      <path
        d="M82 130 Q100 135 118 130 L122 160 Q100 165 78 160 Z"
        fill="#c2410c"
      />

      {/* 左足（前に出している） */}
      <path
        d="M88 160 Q80 210 60 260"
        stroke="#ea580c"
        strokeWidth="16"
        strokeLinecap="round"
      />
      {/* 左スニーカー */}
      <ellipse cx="55" cy="268" rx="18" ry="9" fill="#1e293b" />
      <ellipse cx="52" cy="265" rx="12" ry="6" fill="#334155" />

      {/* 右足（後ろ気味） */}
      <path
        d="M112 160 Q120 210 138 255"
        stroke="#ea580c"
        strokeWidth="16"
        strokeLinecap="round"
      />
      {/* 右スニーカー */}
      <ellipse cx="143" cy="263" rx="18" ry="9" fill="#1e293b" />
      <ellipse cx="146" cy="260" rx="12" ry="6" fill="#334155" />

      {/* キラキラ（動きの表現） */}
      <g opacity="0.8">
        <path d="M20 60 L22 54 L24 60 L30 62 L24 64 L22 70 L20 64 L14 62 Z" fill="#fbbf24" />
        <path d="M168 40 L170 35 L172 40 L177 42 L172 44 L170 49 L168 44 L163 42 Z" fill="#fbbf24" />
        <path d="M12 120 L13.5 115 L15 120 L20 121.5 L15 123 L13.5 128 L12 123 L7 121.5 Z" fill="#f59e0b" opacity="0.6" />
      </g>
    </svg>
  );
}
