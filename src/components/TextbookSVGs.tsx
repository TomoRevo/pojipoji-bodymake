// Inline SVG illustrations for the textbook page

export function FourPillarsInfographic() {
  return (
    <svg viewBox="0 0 320 220" className="w-full max-w-xs mx-auto" role="img" aria-label="ダイエットの4本柱">
      {/* Roof / Goal */}
      <polygon points="160,15 30,75 290,75" fill="url(#roofGrad)" rx="4" />
      <defs>
        <linearGradient id="roofGrad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#f97316" />
        </linearGradient>
      </defs>
      <text x="160" y="58" textAnchor="middle" fill="#fff" fontSize="13" fontWeight="bold">理想の体</text>

      {/* Pillars */}
      {[
        { x: 55, color: "#10b981", label: "食事", icon: "M-6,-8 L6,-8 L6,8 L-6,8 Z" },
        { x: 120, color: "#8b5cf6", label: "運動", icon: "M-6,-8 L6,-8 L6,8 L-6,8 Z" },
        { x: 185, color: "#f97316", label: "習慣", icon: "M-6,-8 L6,-8 L6,8 L-6,8 Z" },
        { x: 250, color: "#f43f5e", label: "メンタル", icon: "M-6,-8 L6,-8 L6,8 L-6,8 Z" },
      ].map((p, i) => (
        <g key={i}>
          <rect x={p.x - 18} y={80} width={36} height={100} rx="4" fill={p.color} opacity={0.85} />
          <text x={p.x} y={135} textAnchor="middle" fill="#fff" fontSize="11" fontWeight="bold">{p.label}</text>
        </g>
      ))}

      {/* Foundation */}
      <rect x="30" y="185" width="260" height="25" rx="6" fill="#374151" />
      <text x="160" y="202" textAnchor="middle" fill="#fff" fontSize="11" fontWeight="bold">正しい知識 + 継続</text>
    </svg>
  );
}

export function PlateChart() {
  return (
    <svg viewBox="0 0 220 220" className="w-44 h-44 mx-auto" role="img" aria-label="理想のワンプレート">
      {/* Plate */}
      <circle cx="110" cy="110" r="100" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="3" />
      <circle cx="110" cy="110" r="95" fill="none" stroke="#e2e8f0" strokeWidth="1" />

      {/* Vegetables (1/2) - top half */}
      <path d="M110,110 L110,15 A95,95 0 0,1 110,205 Z" fill="#22c55e" opacity={0.75} />
      {/* Protein (1/4) - top-right */}
      <path d="M110,110 L110,15 A95,95 0 0,0 205,110 Z" fill="#f97316" opacity={0.8} />
      {/* Carbs (1/4) - bottom-right */}
      <path d="M110,110 L205,110 A95,95 0 0,0 110,205 Z" fill="#eab308" opacity={0.75} />

      {/* Labels */}
      <text x="65" y="105" fontSize="11" fill="#fff" fontWeight="bold">野菜</text>
      <text x="55" y="120" fontSize="9" fill="#fff" opacity={0.9}>1/2</text>
      <text x="145" y="70" fontSize="10" fill="#fff" fontWeight="bold">タンパク質</text>
      <text x="155" y="85" fontSize="9" fill="#fff" opacity={0.9}>1/4</text>
      <text x="150" y="155" fontSize="10" fill="#fff" fontWeight="bold">炭水化物</text>
      <text x="160" y="170" fontSize="9" fill="#fff" opacity={0.9}>1/4</text>
    </svg>
  );
}

export function EatingOrderSteps() {
  return (
    <svg viewBox="0 0 320 90" className="w-full max-w-sm mx-auto" role="img" aria-label="食べる順番">
      {/* Step 1 */}
      <rect x="5" y="15" width="85" height="60" rx="12" fill="#22c55e" opacity={0.85} />
      <text x="47" y="40" textAnchor="middle" fill="#fff" fontSize="10" fontWeight="bold">STEP 1</text>
      <text x="47" y="58" textAnchor="middle" fill="#fff" fontSize="13" fontWeight="bold">野菜・汁物</text>

      {/* Arrow 1 */}
      <polygon points="100,45 115,35 115,55" fill="#9ca3af" />

      {/* Step 2 */}
      <rect x="120" y="15" width="85" height="60" rx="12" fill="#f97316" opacity={0.85} />
      <text x="162" y="40" textAnchor="middle" fill="#fff" fontSize="10" fontWeight="bold">STEP 2</text>
      <text x="162" y="58" textAnchor="middle" fill="#fff" fontSize="13" fontWeight="bold">タンパク質</text>

      {/* Arrow 2 */}
      <polygon points="215,45 230,35 230,55" fill="#9ca3af" />

      {/* Step 3 */}
      <rect x="235" y="15" width="80" height="60" rx="12" fill="#eab308" opacity={0.85} />
      <text x="275" y="40" textAnchor="middle" fill="#fff" fontSize="10" fontWeight="bold">STEP 3</text>
      <text x="275" y="58" textAnchor="middle" fill="#fff" fontSize="13" fontWeight="bold">炭水化物</text>
    </svg>
  );
}

export function MuscleVsCardioVisual() {
  return (
    <svg viewBox="0 0 300 180" className="w-full max-w-sm mx-auto" role="img" aria-label="筋トレ vs 有酸素の比較">
      {/* Left - Cardio */}
      <rect x="10" y="10" width="130" height="160" rx="12" fill="#f1f5f9" stroke="#e2e8f0" strokeWidth="1.5" />
      <text x="75" y="35" textAnchor="middle" fill="#64748b" fontSize="12" fontWeight="bold">有酸素運動</text>
      {/* Bars */}
      <rect x="25" y="50" width="100" height="16" rx="4" fill="#94a3b8" opacity={0.6} />
      <text x="30" y="62" fill="#fff" fontSize="8" fontWeight="bold">運動中の消費: 多い</text>
      <rect x="25" y="72" width="40" height="16" rx="4" fill="#94a3b8" opacity={0.4} />
      <text x="30" y="84" fill="#fff" fontSize="8" fontWeight="bold">運動後: 少</text>
      <rect x="25" y="94" width="30" height="16" rx="4" fill="#94a3b8" opacity={0.3} />
      <text x="30" y="106" fill="#64748b" fontSize="8">筋肉: 維持難</text>
      <rect x="25" y="116" width="35" height="16" rx="4" fill="#94a3b8" opacity={0.3} />
      <text x="30" y="128" fill="#64748b" fontSize="8">代謝: 変化小</text>
      <text x="75" y="155" textAnchor="middle" fill="#94a3b8" fontSize="9">短期向き</text>

      {/* VS */}
      <text x="150" y="95" textAnchor="middle" fill="#9ca3af" fontSize="14" fontWeight="bold">VS</text>

      {/* Right - Strength */}
      <rect x="160" y="10" width="130" height="160" rx="12" fill="#f5f3ff" stroke="#c4b5fd" strokeWidth="1.5" />
      <text x="225" y="35" textAnchor="middle" fill="#7c3aed" fontSize="12" fontWeight="bold">筋トレ</text>
      <rect x="175" y="50" width="60" height="16" rx="4" fill="#8b5cf6" opacity={0.5} />
      <text x="180" y="62" fill="#fff" fontSize="8" fontWeight="bold">運動中: 少め</text>
      <rect x="175" y="72" width="100" height="16" rx="4" fill="#8b5cf6" opacity={0.7} />
      <text x="180" y="84" fill="#fff" fontSize="8" fontWeight="bold">運動後の消費: 数時間</text>
      <rect x="175" y="94" width="100" height="16" rx="4" fill="#8b5cf6" opacity={0.8} />
      <text x="180" y="106" fill="#fff" fontSize="8" fontWeight="bold">筋肉: 維持・増加</text>
      <rect x="175" y="116" width="100" height="16" rx="4" fill="#8b5cf6" opacity={0.9} />
      <text x="180" y="128" fill="#fff" fontSize="8" fontWeight="bold">代謝: 上がる</text>
      <text x="225" y="155" textAnchor="middle" fill="#7c3aed" fontSize="9" fontWeight="bold">長期向き</text>
    </svg>
  );
}

export function HabitLoopDiagram() {
  return (
    <svg viewBox="0 0 240 200" className="w-56 h-48 mx-auto" role="img" aria-label="習慣ループ">
      {/* Circular arrows */}
      <path d="M120,30 A80,80 0 0,1 190,150" fill="none" stroke="#f97316" strokeWidth="3" strokeDasharray="6 3" />
      <path d="M190,150 A80,80 0 0,1 50,150" fill="none" stroke="#10b981" strokeWidth="3" strokeDasharray="6 3" />
      <path d="M50,150 A80,80 0 0,1 120,30" fill="none" stroke="#8b5cf6" strokeWidth="3" strokeDasharray="6 3" />

      {/* Arrow heads */}
      <polygon points="186,148 198,148 192,158" fill="#10b981" />
      <polygon points="54,148 42,148 48,158" fill="#8b5cf6" />
      <polygon points="117,32 123,32 120,22" fill="#f97316" />

      {/* Nodes */}
      <circle cx="120" cy="25" r="22" fill="#f97316" />
      <text x="120" y="22" textAnchor="middle" fill="#fff" fontSize="9" fontWeight="bold">きっかけ</text>
      <text x="120" y="33" textAnchor="middle" fill="#fff" fontSize="7" opacity={0.9}>歯磨き後</text>

      <circle cx="195" cy="155" r="22" fill="#10b981" />
      <text x="195" y="152" textAnchor="middle" fill="#fff" fontSize="9" fontWeight="bold">行動</text>
      <text x="195" y="163" textAnchor="middle" fill="#fff" fontSize="7" opacity={0.9}>スクワット</text>

      <circle cx="45" cy="155" r="22" fill="#8b5cf6" />
      <text x="45" y="152" textAnchor="middle" fill="#fff" fontSize="9" fontWeight="bold">ごほうび</text>
      <text x="45" y="163" textAnchor="middle" fill="#fff" fontSize="7" opacity={0.9}>達成感</text>

      {/* Center label */}
      <text x="120" y="110" textAnchor="middle" fill="#374151" fontSize="11" fontWeight="bold">習慣</text>
      <text x="120" y="125" textAnchor="middle" fill="#374151" fontSize="11" fontWeight="bold">ループ</text>
    </svg>
  );
}

// Decorative wave divider
export function WaveDivider({ color = "#f97316" }: { color?: string }) {
  return (
    <svg viewBox="0 0 400 24" className="w-full h-4 my-2" preserveAspectRatio="none">
      <path
        d="M0,12 Q50,0 100,12 Q150,24 200,12 Q250,0 300,12 Q350,24 400,12"
        fill="none"
        stroke={color}
        strokeWidth="2"
        opacity={0.3}
      />
    </svg>
  );
}
