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
  { title: string; hook: string; body: string[]; cta: string }
> = {
  beginner: {
    title: "超初心者タイプ",
    hook: "実は、このタイプが一番変わりやすい。",
    body: [
      "「運動=つらい」と思い込んでいませんか？それ、間違いです。",
      "運動習慣がゼロの人ほど、ちょっと動くだけで体はすぐ反応します。筋肉が驚いて、代謝が一気に上がるんです。",
      "逆に言うと、今が一番「変化を感じやすいタイミング」。このまま何もしないのが一番もったいない。",
      "必要なのは1日たった3分。踊るだけでOK。ランニングも筋トレも一切いりません。",
    ],
    cta: "まず3分だけ、やってみよう",
  },
  food: {
    title: "食事改善タイプ",
    hook: "頑張らなくていい。「選ぶだけ」で痩せる体になれる。",
    body: [
      "「食べるのが好き」「我慢できない」。それ、ダイエットに向いていないわけじゃないです。",
      "あなたは食事を変えるだけで、運動した人より早く結果が出るタイプ。実際、ダイエットの効果の8割は食事で決まります。",
      "ただし「食べるな」じゃない。「何を選ぶか」を変えるだけ。コンビニで買えるもので今日から変えられます。",
      "このまま「また明日から」を繰り返すと、年々体は変わりにくくなる。今日が一番若い日です。",
    ],
    cta: "今日のコンビニから変えていこう",
  },
  busy: {
    title: "忙しいタイプ",
    hook: "忙しいままでいい。3分あれば体は変わる。",
    body: [
      "「時間がないからできない」と思い続けて、気づいたら何年も経っていませんか？",
      "実は、忙しい人ほど「短時間の習慣」で変わりやすい。長時間運動は疲れて続かないけど、3分なら毎日できる。",
      "通勤前・昼休み・寝る前。どのタイミングでもOK。「ちゃんとやらなきゃ」と思うから続かないんです。",
      "1日3分を7日続けるだけで、体が「動くのが当たり前」な状態になります。まず今日だけやってみてください。",
    ],
    cta: "今日3分だけ試してみる",
  },
  serious: {
    title: "本気タイプ",
    hook: "やる気があるのに結果が出ないのは、あなたのせいじゃない。",
    body: [
      "これだけ頑張っているのに、なぜ変わらないのか。答えは「方向性」です。",
      "間違ったやり方でどれだけ頑張っても、遠回りするだけ。むしろ体を消耗させて、次のチャレンジが億劫になる。",
      "正しい方向に切り替えれば、同じ努力で3倍の結果が出ます。7日間あれば、体が「あ、変わり始めてる」と感じるはず。",
      "本気なら、あとは正しい方法だけ。それがこのプログラムです。",
    ],
    cta: "正しい方向で、今すぐ動き出す",
  },
};
