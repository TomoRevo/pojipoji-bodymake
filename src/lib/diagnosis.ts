/* ── 5タイプ診断（チェックリスト形式） ── */

export type DiagnosisType = "gaman" | "info" | "perfect" | "busy" | "rebound";

export const validTypes: DiagnosisType[] = [
  "gaman",
  "info",
  "perfect",
  "busy",
  "rebound",
];

/* ── チェックリスト（各タイプ6問 = 計30問） ── */

export interface CheckItem {
  id: string;        // "gaman_1" 等
  text: string;
  type: DiagnosisType;
}

/**
 * 表示時はテーマ別にグループ化してタイプを隠す。
 * 各グループ内の項目は複数タイプが混在する。
 */
export interface CheckGroup {
  title: string;
  items: CheckItem[];
}

const allItems: CheckItem[] = [
  // ── ガマン癖さん ──
  { id: "gaman_1", text: "食事制限をしたことがある（またはしている）", type: "gaman" },
  { id: "gaman_2", text: "「食べちゃダメ」と思うほど食べたくなる", type: "gaman" },
  { id: "gaman_3", text: "ダイエット中に甘いものを我慢するのがつらい", type: "gaman" },
  { id: "gaman_4", text: "夜に食べすぎて後悔することがある", type: "gaman" },
  { id: "gaman_5", text: "カロリーを気にして食事を選ぶことが多い", type: "gaman" },
  { id: "gaman_6", text: "ダイエット→暴食→自己嫌悪のループに覚えがある", type: "gaman" },

  // ── 情報メタボさん ──
  { id: "info_1", text: "ダイエット系のSNSやYouTubeをよく見る", type: "info" },
  { id: "info_2", text: "いろんなダイエット法を知っているが、どれを信じればいいかわからない", type: "info" },
  { id: "info_3", text: "「これがいい」と聞くと試したくなる", type: "info" },
  { id: "info_4", text: "知識はあるのに行動に移せない自分にモヤモヤする", type: "info" },
  { id: "info_5", text: "新しいダイエット情報を見ると、今のやり方に不安になる", type: "info" },
  { id: "info_6", text: "「結局、何が正解なの？」と思うことがある", type: "info" },

  // ── 完璧主義さん ──
  { id: "perfect_1", text: "「やるからにはちゃんとやりたい」と思う", type: "perfect" },
  { id: "perfect_2", text: "1日でもサボると「もうダメだ」と思ってしまう", type: "perfect" },
  { id: "perfect_3", text: "計画通りにいかないとやる気がなくなる", type: "perfect" },
  { id: "perfect_4", text: "他の人の成果と比べて落ち込むことがある", type: "perfect" },
  { id: "perfect_5", text: "0か100かで考えてしまうことが多い", type: "perfect" },
  { id: "perfect_6", text: "「自分に厳しすぎる」と言われたことがある", type: "perfect" },

  // ── 忙しすぎさん ──
  { id: "busy_1", text: "「時間がない」が口癖になっている", type: "busy" },
  { id: "busy_2", text: "自分のことはつい後回しにしてしまう", type: "busy" },
  { id: "busy_3", text: "仕事や家事で1日があっという間に終わる", type: "busy" },
  { id: "busy_4", text: "運動する時間を確保するのが難しい", type: "busy" },
  { id: "busy_5", text: "疲れて帰ると何もする気が起きない", type: "busy" },
  { id: "busy_6", text: "「落ち着いたらやろう」と思いつつ始められない", type: "busy" },

  // ── リバウンドループさん ──
  { id: "rebound_1", text: "ダイエットに3回以上チャレンジしたことがある", type: "rebound" },
  { id: "rebound_2", text: "痩せてもしばらくすると元に戻ってしまう", type: "rebound" },
  { id: "rebound_3", text: "ダイエットのやり方自体は知っている", type: "rebound" },
  { id: "rebound_4", text: "「意志が弱い」と自分を責めたことがある", type: "rebound" },
  { id: "rebound_5", text: "一時的には頑張れるが、長続きしない", type: "rebound" },
  { id: "rebound_6", text: "「今度こそ」が何度目かわからない", type: "rebound" },
];

/** テーマ別にシャッフルして表示（タイプを直接見せない） */
export const checkGroups: CheckGroup[] = [
  {
    title: "食事について",
    items: [
      allItems[0],  // gaman_1
      allItems[3],  // gaman_4
      allItems[4],  // gaman_5
      allItems[8],  // info_3
      allItems[1],  // gaman_2
      allItems[2],  // gaman_3
    ],
  },
  {
    title: "気持ち・性格について",
    items: [
      allItems[12], // perfect_1
      allItems[13], // perfect_2
      allItems[16], // perfect_5
      allItems[15], // perfect_4
      allItems[14], // perfect_3
      allItems[17], // perfect_6
    ],
  },
  {
    title: "日々の生活について",
    items: [
      allItems[18], // busy_1
      allItems[19], // busy_2
      allItems[20], // busy_3
      allItems[21], // busy_4
      allItems[22], // busy_5
      allItems[23], // busy_6
    ],
  },
  {
    title: "情報との付き合い方",
    items: [
      allItems[6],  // info_1
      allItems[7],  // info_2
      allItems[9],  // info_4
      allItems[10], // info_5
      allItems[11], // info_6
    ],
  },
  {
    title: "ダイエット経験について",
    items: [
      allItems[24], // rebound_1
      allItems[25], // rebound_2
      allItems[26], // rebound_3
      allItems[27], // rebound_4
      allItems[28], // rebound_5
      allItems[29], // rebound_6
      allItems[5],  // gaman_6
    ],
  },
];

/** すべてのチェック項目（フラット） */
export const allCheckItems = allItems;

/* ── 集計 ── */

export function calcType(checkedIds: string[]): DiagnosisType {
  const count: Record<DiagnosisType, number> = {
    gaman: 0,
    info: 0,
    perfect: 0,
    busy: 0,
    rebound: 0,
  };

  for (const id of checkedIds) {
    const item = allItems.find((i) => i.id === id);
    if (item) count[item.type]++;
  }

  // 最大値のタイプを返す（同点はrebound > gaman > perfect > busy > info の優先度）
  const priority: DiagnosisType[] = ["rebound", "gaman", "perfect", "busy", "info"];
  let maxType: DiagnosisType = "gaman";
  let maxCount = 0;
  for (const t of priority) {
    if (count[t] > maxCount) {
      maxCount = count[t];
      maxType = t;
    }
  }

  return maxType;
}

/* ── タイプ名 ── */

export const typeLabels: Record<DiagnosisType, string> = {
  gaman: "ガマン癖さん",
  info: "情報メタボさん",
  perfect: "完璧主義さん",
  busy: "忙しすぎさん",
  rebound: "リバウンドループさん",
};

/* ── タイプ別メッセージ ── */

export const typeMessages: Record<
  DiagnosisType,
  {
    title: string;
    subtitle: string;
    program: string;
    hook: string;
    body: string[];
    cta: string;
  }
> = {
  gaman: {
    title: "ガマン癖さん",
    subtitle: "食事を見直すだけで化けるポテンシャルの持ち主",
    program: "「食べて痩せる」食事リセットプログラム",
    hook: "我慢しなくていい。「選び方」を変えるだけで、体は変わり始めます。",
    body: [
      "食事制限が続かないのは、あなたの意志が弱いからじゃない。「我慢」は人間の脳の仕組み上、絶対に長続きしないんです。",
      "体づくりの8割は食事で決まります。だからこそ「何を食べないか」じゃなくて「何を選ぶか」。コンビニで買えるもので、今日から変えていけます。",
      "大事なのは「正しい食べ方」を「楽しく続ける」こと。これだけがダイエットの必勝法。我慢じゃなくて「選ぶだけ」だから、三日坊主にすらなりません。",
      "あなたのタイプに合った「食べていいもの」リストと、コンビニで今日から使える食材ガイドをLINEでお届けします。",
    ],
    cta: "「食べていい」リストを受け取る",
  },
  info: {
    title: "情報メタボさん",
    subtitle: "知識があるからこそ、正しい一歩で一気に変われる",
    program: "「今日だけやる」アクション特化プログラム",
    hook: "もう調べなくていい。「これだけやれば大丈夫」を手に入れよう。",
    body: [
      "情報をたくさん持っているあなたは、実はダイエットにかなり近い場所にいます。足りないのは「知識」じゃなくて「最初の一歩」だけ。",
      "100点のやり方を探し続けるより、60点でいいから今日やる方がずっと結果につながります。完璧な方法なんて存在しない。でも「続けられる方法」はあります。",
      "大事なのは「正しいやり方」を「楽しく続ける」こと。これだけがダイエットの必勝法。もう迷わなくていい、「これだけやればOK」がここにあります。",
      "あなたのタイプに合った「迷わずできるアクションプラン」と、すぐ使える特典をLINEでお届けします。",
    ],
    cta: "迷わないプランを受け取る",
  },
  perfect: {
    title: "完璧主義さん",
    subtitle: "その真剣さこそが最大の武器。あとは力の抜きどころを知るだけ",
    program: "「3割でOK」ゆる習慣プログラム",
    hook: "100点を目指さなくていい。「3割続ける」だけで、体は変わります。",
    body: [
      "「ちゃんとやらなきゃ」と思えるあなたは、それだけで素質があります。でもその真剣さが「1日サボったら全部ダメ」という思い込みを作ってしまう。",
      "ダイエットは100点じゃなくていい。3割やれば十分。3割を「楽しく」続ける方が、100点を1週間で挫折するよりずっと結果が出ます。",
      "大事なのは「正しいやり方」を「楽しく続ける」こと。これだけがダイエットの必勝法。あなたの真剣さに「楽しさ」が加わったら、もう無敵です。",
      "あなたのタイプに合った「頑張りすぎない続け方」と、すぐ使える特典をLINEでお届けします。",
    ],
    cta: "ゆる習慣プランを受け取る",
  },
  busy: {
    title: "忙しすぎさん",
    subtitle: "たった3分の使い方で爆発的に変われる人",
    program: "「1日3分だけ」スキマ時間プログラム",
    hook: "忙しい人こそ、実は結果を出しやすい。",
    body: [
      "「時間ができたらやろう」——その日は来ません。でも「3分だけ」なら、今日からできます。短い習慣ほど続きやすく、結果にもつながりやすい。",
      "通勤前・昼休み・寝る前。どのタイミングでもOK。まずは好きな音楽に合わせて体を動かすだけ。「ちゃんとやらなきゃ」は手放していい。",
      "忙しいあなただからこそ続けられる、結果を出せる秘訣があります。大事なのは「正しいやり方」を「楽しく続ける」こと。これだけがダイエットの必勝法です。",
      "あなたの生活リズムに合わせた「続けられるメニュー」と、すぐ使える特典をLINEでお届けします。",
    ],
    cta: "続けられるメニューを受け取る",
  },
  rebound: {
    title: "リバウンドループさん",
    subtitle: "やり方さえ変われば一気にブレイクする人",
    program: "「マインドから変える」自走プログラム",
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
