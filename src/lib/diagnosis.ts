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
      "ジムに行かなくていい。走らなくていい。1日3分、好きな音楽に合わせて体を揺らすだけ。それだけで立派な一歩です。",
      "運動ゼロの人ほど、ちょっと動くだけで体は反応してくれます。「あれ、なんか体が軽い」——その感覚、意外とすぐ来ますよ。",
      "「いつかやろう」を「今日やってみた」に変えるだけ。始めた人から順番に、体は変わり始めます。",
      "あなたのタイプに合った「3分だけダンス」があります。どんな動きか、LINEでお見せしますね。",
    ],
    cta: "まずは3分ダンスを見てみる",
  },
  food_reset: {
    title: "食事リセットタイプ",
    hook: "我慢しなくていい。「食べるもの」を変えるだけで、体は変わり始める。",
    body: [
      "食べることが好きな人ほど、実はダイエットに向いています。食への関心が高いからこそ、「選び方」を変えるだけで大きく変われる。",
      "実は、体づくりの8割は食事で決まります。だから食事を変えるだけで、驚くほど早く体が反応してくれるんです。",
      "ポイントは「食べるな」じゃなくて「何を選ぶか」。コンビニで買えるもので、今日から変えていけます。",
      "コンビニで選ぶだけでOKな「太らない食べ方ルール」——これを知るだけで、今日の夕飯から変わります。",
    ],
    cta: "「食べていい」食事法を受け取る",
  },
  time_hack: {
    title: "スキマ時間活用タイプ",
    hook: "忙しいままでいい。3分あれば体は変わる。",
    body: [
      "「3分だけ」の習慣こそ、実は一番続きやすい。短い時間の方が、結果にもつながりやすいんです。",
      "通勤前・昼休み・寝る前。どのタイミングでもOK。1日3分、好きな音楽に合わせて体を動かすだけで、体は変わり始めます。",
      "「ちゃんとやらなきゃ」は手放していい。「今日はなんか楽しかった」——その感覚の方が、ずっと体を変えてくれます。",
      "あなたの生活リズムに合わせた「3分ダンスメニュー」を用意しました。朝型・夜型・スキマ派、それぞれに合うやり方があります。",
    ],
    cta: "私に合う3分メニューを見てみる",
  },
  switch_on: {
    title: "本気スイッチタイプ",
    hook: "これだけ頑張ってきたあなたに足りなかったのは、「努力」じゃなくて「やり方」だっただけ。",
    body: [
      "これだけ頑張れるあなただから、「合うやり方」に出会えたら一気に変わります。その準備は、もうできています。",
      "やり方が変わるだけで、同じ努力でも結果がまるで違う。「あれ、なんか体が違う」——そう感じる日は、思ったより早く来ます。",
      "「もっと頑張らなきゃ」と自分を追い込まなくていい。あなたに必要なのは、努力を「楽しさ」に変える仕組みです。",
      "あなたと同じ「何をやっても続かなかった」タイプの方が結果を出した具体的なステップがあります。LINEでお伝えしますね。",
    ],
    cta: "私に合うやり方を受け取る",
  },
};
