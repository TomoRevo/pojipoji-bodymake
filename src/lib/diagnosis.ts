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
  first_step: "のびしろ無限タイプ",
  food_reset: "食事リセットタイプ",
  time_hack: "スキマ時間活用タイプ",
  switch_on: "本気スイッチタイプ",
};

export const typeMessages: Record<
  DiagnosisType,
  { title: string; subtitle: string; hook: string; body: string[]; cta: string }
> = {
  first_step: {
    title: "のびしろ無限タイプ",
    subtitle: "まだ何もしてないからこそ、一番変われる",
    hook: "ゼロからのスタートが、実は一番変わりやすい。",
    body: [
      "ダイエットが続かない一番の理由は「我慢しようとするから」。意志の力には限界があります。でも「楽しい」と感じたことは、頑張らなくても続く。",
      "運動ゼロの人ほど、ちょっと動くだけで体は反応してくれます。「あれ、なんか体が軽い」——その感覚、意外とすぐ来ますよ。",
      "大事なのは「正しいやり方」を「楽しく続ける」こと。これだけがダイエットの必勝法です。三日坊主でも続く方法は、ちゃんとあります。",
      "あなたのタイプに合った「楽しく続けられる方法」と、すぐ使える特典をLINEでお届けします。",
    ],
    cta: "楽しく続ける方法を受け取る",
  },
  food_reset: {
    title: "食事リセットタイプ",
    subtitle: "食事を見直すだけで化けるポテンシャルの持ち主",
    hook: "我慢しなくていい。「食べるもの」を変えるだけで、体は変わり始める。",
    body: [
      "食事制限が続かないのは、あなたの意志が弱いからじゃない。「我慢」は人間の脳の仕組み上、絶対に長続きしないんです。",
      "体づくりの8割は食事で決まります。だからこそ「何を食べないか」じゃなくて「何を選ぶか」。コンビニで買えるもので、今日から変えていけます。",
      "大事なのは「正しい食べ方」を「楽しく続ける」こと。これだけがダイエットの必勝法。我慢じゃなくて「選ぶだけ」だから、三日坊主にすらなりません。",
      "あなたのタイプに合った「食べていいもの」リストと、コンビニで今日から使える食材ガイドをLINEでお届けします。",
    ],
    cta: "「食べていい」リストを受け取る",
  },
  time_hack: {
    title: "スキマ時間活用タイプ",
    subtitle: "たった3分の使い方で爆発的に変われる人",
    hook: "忙しいままでいい。1日3分で体は変わる。",
    body: [
      "「時間ができたらやろう」——その日は来ません。でも「3分だけ」なら、今日からできます。短い習慣ほど続きやすく、結果にもつながりやすい。",
      "通勤前・昼休み・寝る前。どのタイミングでもOK。好きな音楽に合わせて体を動かすだけ。「ちゃんとやらなきゃ」は手放していい。",
      "ダイエットの必勝法はたった1つ。「正しいやり方」を「楽しく続ける」こと。忙しいあなたでも、楽しければ3分は見つかります。",
      "あなたの生活リズムに合わせた「続けられるメニュー」と、すぐ使える特典をLINEでお届けします。",
    ],
    cta: "続けられるメニューを受け取る",
  },
  switch_on: {
    title: "本気スイッチタイプ",
    subtitle: "やり方さえ変われば一気にブレイクする人",
    hook: "足りなかったのは「努力」じゃない。「続けられる楽しさ」だっただけ。",
    body: [
      "これだけ頑張れるあなたが続かなかったのは、意志が弱いからじゃない。「我慢」ベースのやり方は、どんなに強い人でも限界が来るんです。",
      "人間は「楽しい」と感じたことしか本当には続けられない。意志は弱い。でも「こうなりたい」という願望は強い。その願望を活かす方法があります。",
      "必勝法はシンプル。「正しいやり方」を「楽しく続ける」こと。これだけ。三日坊主の原因は、あなたじゃなくて「やり方」にあった。",
      "あなたと同じタイプの方が「楽しく続けられた」具体的な方法と、すぐ使える特典をLINEでお届けします。",
    ],
    cta: "楽しく続ける方法を受け取る",
  },
};
