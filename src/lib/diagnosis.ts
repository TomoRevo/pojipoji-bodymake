export type DiagnosisType = "beginner" | "food" | "busy" | "serious";

export interface Question {
  id: number;
  text: string;
  options: { label: string; value: "A" | "B" | "C" | "D" }[];
}

export const questions: Question[] = [
  {
    id: 1,
    text: "現在の運動習慣は？",
    options: [
      { label: "ほぼゼロ", value: "A" },
      { label: "たまに歩く", value: "B" },
      { label: "週1〜2回", value: "C" },
      { label: "週3回以上", value: "D" },
    ],
  },
  {
    id: 2,
    text: "1日で自由に使える時間は？",
    options: [
      { label: "10分未満", value: "A" },
      { label: "10〜30分", value: "B" },
      { label: "30分〜1時間", value: "C" },
      { label: "1時間以上", value: "D" },
    ],
  },
  {
    id: 3,
    text: "食事で一番当てはまるのは？",
    options: [
      { label: "食べすぎてしまう", value: "A" },
      { label: "間食が多い", value: "B" },
      { label: "食事が不規則", value: "C" },
      { label: "何を食べればいいかわからない", value: "D" },
    ],
  },
  {
    id: 4,
    text: "過去のダイエット経験は？",
    options: [
      { label: "ほぼない", value: "A" },
      { label: "少しやったが続かなかった", value: "B" },
      { label: "何度も挑戦してきた", value: "C" },
      { label: "今も何かやっている", value: "D" },
    ],
  },
  {
    id: 5,
    text: "一番叶えたいことは？",
    options: [
      { label: "とにかく体重を減らしたい", value: "A" },
      { label: "体型を引き締めたい", value: "B" },
      { label: "健康的になりたい", value: "C" },
      { label: "自信を持てる自分になりたい", value: "D" },
    ],
  },
];

export function calcType(answers: ("A" | "B" | "C" | "D")[]): DiagnosisType {
  const count = { A: 0, B: 0, C: 0, D: 0 };
  answers.forEach((a) => count[a]++);

  const max = Math.max(count.A, count.B, count.C, count.D);

  // A多め → 超初心者、B多め → 食事改善、C多め → 忙しい、D多め → 本気
  if (count.A === max) return "beginner";
  if (count.B === max) return "food";
  if (count.C === max) return "busy";
  return "serious";
}

export const typeLabels: Record<DiagnosisType, string> = {
  beginner: "超初心者タイプ",
  food: "食事改善タイプ",
  busy: "忙しいタイプ",
  serious: "本気タイプ",
};

export const typeMessages: Record<
  DiagnosisType,
  { title: string; body: string[] }
> = {
  beginner: {
    title: "超初心者タイプ",
    body: [
      "これ、全然悪くないです。むしろチャンスです。",
      "運動習慣ゼロから始める人ほど、最初の変化が大きい。",
      "だから今回のプログラムは「とにかく続けられること」だけを考えて作りました。",
      "1日たった3〜5分。踊るだけでOKです。",
    ],
  },
  food: {
    title: "食事改善タイプ",
    body: [
      "あなたのタイプは「食事をちょっと変えるだけ」で一番結果が出やすいタイプです。",
      "「食事制限」じゃなくていいです。「選び方」を少し変えるだけ。",
      "7日間のプログラムでは、食事のコツも一緒にお届けします。",
    ],
  },
  busy: {
    title: "忙しいタイプ",
    body: [
      "「時間がない」が口癖になってませんか？笑",
      "だから私が作ったのは「1日3分のスキマダンス」です。",
      "通勤前・お昼・寝る前。いつやっても大丈夫。",
      "続けやすいように設計してあるので安心してください。",
    ],
  },
  serious: {
    title: "本気タイプ",
    body: [
      "やる気があるのに、なぜか続かない、結果が出ない。",
      "それ、方向性が合ってないだけです。",
      "正しい方向で7日間やれば「あ、変わり始めてる」って必ず感じます。",
      "本気でやりましょう。",
    ],
  },
};
