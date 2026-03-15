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
      "「運動=つらい」と思い込んでいませんか？それ、間違いです。",
      "運動習慣がゼロの人ほど、ちょっと動くだけで体はすぐ反応します。筋肉が驚いて、代謝が一気に上がるんです。",
      "逆に言うと、今が一番「変化を感じやすいタイミング」。このまま何もしないのが一番もったいない。",
      "必要なのは1日たった3分。踊るだけでOK。ランニングも筋トレも一切いりません。",
    ],
    cta: "あなた専用ガイドを受け取る",
  },
  food_reset: {
    title: "食事リセットタイプ",
    hook: "我慢しなくていい。選び方を変えるだけで体は応える。",
    body: [
      "「食べるのが好き」「我慢できない」。それ、ダイエットに向いていないわけじゃないです。",
      "あなたは食事を変えるだけで、運動した人より早く結果が出るタイプ。実際、ダイエットの効果の8割は食事で決まります。",
      "ただし「食べるな」じゃない。「何を選ぶか」を変えるだけ。コンビニで買えるもので今日から変えられます。",
      "このまま「また明日から」を繰り返すと、年々体は変わりにくくなる。今日が一番若い日です。",
    ],
    cta: "あなた専用ガイドを受け取る",
  },
  time_hack: {
    title: "スキマ時間活用タイプ",
    hook: "忙しいままでいい。3分あれば体は変わる。",
    body: [
      "「時間がないからできない」と思い続けて、気づいたら何年も経っていませんか？",
      "実は、忙しい人ほど「短時間の習慣」で変わりやすい。長時間運動は疲れて続かないけど、3分なら毎日できる。",
      "通勤前・昼休み・寝る前。どのタイミングでもOK。「ちゃんとやらなきゃ」と思うから続かないんです。",
      "1日3分を続けるだけで、体が「動くのが当たり前」な状態になります。まず今日だけやってみてください。",
    ],
    cta: "あなた専用ガイドを受け取る",
  },
  switch_on: {
    title: "本気スイッチタイプ",
    hook: "やる気は十分。あとは正しい方向に切り替えるだけ。",
    body: [
      "これだけ頑張っているのに、なぜ変わらないのか。答えは「方向性」です。",
      "間違ったやり方でどれだけ頑張っても、遠回りするだけ。むしろ体を消耗させて、次のチャレンジが億劫になる。",
      "正しい方向に切り替えれば、同じ努力で3倍の結果が出ます。体が「あ、変わり始めてる」と感じるはず。",
      "本気なら、あとは正しい方法だけ。あなた専用のガイドで、その方向性をお伝えします。",
    ],
    cta: "あなた専用ガイドを受け取る",
  },
};
