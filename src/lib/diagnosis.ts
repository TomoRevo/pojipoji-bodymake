export type DiagnosisType = "first_step" | "food_reset" | "time_hack" | "switch_on";

export interface Question {
  id: number;
  text: string;
  options: { label: string; value: "A" | "B" | "C" | "D" }[];
}

export const questions: Question[] = [
  {
    id: 1,
    text: "ダイエットで一番つらいのは？",
    options: [
      { label: "そもそも何から始めればいいかわからない", value: "A" },
      { label: "食事を我慢すること", value: "B" },
      { label: "運動する時間を確保すること", value: "C" },
      { label: "頑張っているのに結果が出ないこと", value: "D" },
    ],
  },
  {
    id: 2,
    text: "過去のダイエット、どうだった？",
    options: [
      { label: "ほぼやったことがない", value: "A" },
      { label: "食事制限で一時的に痩せたがリバウンドした", value: "B" },
      { label: "何度か挑戦したが途中で忙しくなって中断", value: "C" },
      { label: "いろいろ試したが、どれも続かなかった", value: "D" },
    ],
  },
  {
    id: 3,
    text: "理想の体型になれたら、一番やりたいことは？",
    options: [
      { label: "好きな服を自信を持って着たい", value: "A" },
      { label: "食事を気にせず楽しみたい", value: "B" },
      { label: "体が軽くなって毎日アクティブに過ごしたい", value: "C" },
      { label: "自分に自信を持って、人前で堂々としていたい", value: "D" },
    ],
  },
  {
    id: 4,
    text: "1日の中で自分のために使える時間は？",
    options: [
      { label: "正直、ほとんどない（5分くらい）", value: "A" },
      { label: "10〜20分ならなんとか", value: "B" },
      { label: "30分〜1時間はある", value: "C" },
      { label: "1時間以上確保できる", value: "D" },
    ],
  },
  {
    id: 5,
    text: "どんなサポートがあったら続けられそう？",
    options: [
      { label: "何も考えなくていい、言われた通りにやるだけのプログラム", value: "A" },
      { label: "食事の「これだけやればOK」リスト", value: "B" },
      { label: "短時間でできる、スキマ時間プログラム", value: "C" },
      { label: "自分の状態を見てくれる、マンツーマンのサポート", value: "D" },
    ],
  },
];

export const validTypes: DiagnosisType[] = [
  "first_step",
  "food_reset",
  "time_hack",
  "switch_on",
];

export function calcType(answers: ("A" | "B" | "C" | "D")[]): DiagnosisType {
  const count = { A: 0, B: 0, C: 0, D: 0 };
  answers.forEach((a) => count[a]++);

  const max = Math.max(count.A, count.B, count.C, count.D);

  if (count.A === max) return "first_step";
  if (count.B === max) return "food_reset";
  if (count.C === max) return "time_hack";
  return "switch_on";
}

export const typeLabels: Record<DiagnosisType, string> = {
  first_step: "はじめの一歩タイプ",
  food_reset: "食事リセットタイプ",
  time_hack: "スキマ時間活用タイプ",
  switch_on: "本気スイッチタイプ",
};

export const typeMessages: Record<
  DiagnosisType,
  { title: string; hook: string; body: string[]; cta: string }
> = {
  first_step: {
    title: "はじめの一歩タイプ",
    hook: "ゼロからのスタートが、実は一番変わりやすい。",
    body: [
      "運動って、実は楽しいやり方がたくさんある。1日3分、好きな音楽に合わせて体を揺らすだけでも立派な一歩です。",
      "運動習慣がゼロの人ほど、ちょっと動くだけで体はすぐ反応してくれます。筋肉が目を覚まして、代謝が動き始める。",
      "今が一番「変化を感じやすいタイミング」。ここから始める人ほど、体の変化を早く実感できます。",
      "大事なのは「きつくやること」じゃなくて「楽しく続けること」。あなたに合った楽しいやり方は必ず見つかります。",
    ],
    cta: "あなた専用ガイドを受け取る",
  },
  food_reset: {
    title: "食事リセットタイプ",
    hook: "我慢しなくていい。「選び方」を変えるだけで体は応えてくれる。",
    body: [
      "食べることが好きな人ほど、実はダイエットに向いています。食への関心が高いからこそ、「選び方」を変えるだけで大きく変われる。",
      "食事を変えるだけで、運動した人より早く結果が出るタイプです。実際、体づくりの効果の8割は食事で決まると言われています。",
      "ポイントは「食べるな」じゃなくて「何を選ぶか」。コンビニで買えるもので、今日から変えていけます。",
      "正しい食事の知識があれば、食べることを楽しみながら体を変えていける。あなたにぴったりの食事法をお伝えします。",
    ],
    cta: "あなた専用ガイドを受け取る",
  },
  time_hack: {
    title: "スキマ時間活用タイプ",
    hook: "忙しいままでいい。3分あれば体は変わる。",
    body: [
      "忙しい毎日の中でも、体を変える方法はちゃんとあります。実は、短時間の習慣ほど続きやすく、結果にもつながりやすい。",
      "通勤前・昼休み・寝る前。どのタイミングでもOK。1日3分、好きな音楽に合わせて体を動かすだけで、体は少しずつ変わり始めます。",
      "「ちゃんとやらなきゃ」と思わなくて大丈夫。楽しくできる方法を見つけるのが一番の近道です。",
      "1日3分を続けた先に、「体を動かすのが当たり前」になる日が来ます。まずは今日だけ、試してみてください。",
    ],
    cta: "あなた専用ガイドを受け取る",
  },
  switch_on: {
    title: "本気スイッチタイプ",
    hook: "やる気は十分。あとは「自分に合うやり方」に出会うだけ。",
    body: [
      "これだけ頑張れるあなただからこそ、正しい方向に切り替えれば、一気に結果が出ます。",
      "同じ努力でも、自分に合ったやり方なら3倍の結果につながることがあります。体が「あ、変わり始めてる」と感じる瞬間が来るはずです。",
      "大切なのは「もっと頑張ること」じゃなくて「楽しく続けられる方法を見つけること」。楽しいから続く、続くから結果が出る。",
      "あなたの本気を、正しい方向に活かす方法をお伝えします。",
    ],
    cta: "あなた専用ガイドを受け取る",
  },
};
