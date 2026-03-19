/* 旧4タイプ用ガイドデータ。新5タイプ移行後に更新予定 */
type LegacyType = "first_step" | "food_reset" | "time_hack" | "switch_on";

export interface GuideAction {
  title: string;
  howTo: string;
  why: string;
  story: string;
}

export interface GuideKey {
  title: string;
  description: string;
}

export interface GuideData {
  type: LegacyType;
  typeName: string;
  subCopy: string;
  themeColor: {
    gradient: string;
    accent: string;
    accentBg: string;
    storyBg: string;
    border: string;
  };
  features: string[];
  empathyMessage: string;
  failureHeadline: string;
  failures: { title: string; description: string }[];
  failureSummary: string;
  keysHeadline: string;
  keys: GuideKey[];
  actionsHeadline: string;
  actions: GuideAction[];
  actionsFooter: string;
  futureMonths: { month: number; label: string; detail: string }[];
  trainerMessage: string;
  ctaHeadline: string;
  ctaIntro: string;
  ctaSessionTitle: string;
  ctaItems: string[];
  ctaClosing: string;
}

export const guideData: Record<LegacyType, GuideData> = {
  first_step: {
    type: "first_step",
    typeName: "はじめの一歩タイプ",
    subCopy: "大丈夫、このガイドがあなたの最初の一歩になります。",
    themeColor: {
      gradient: "from-emerald-500 to-green-400",
      accent: "text-emerald-600",
      accentBg: "bg-emerald-500",
      storyBg: "bg-emerald-50",
      border: "border-emerald-200",
    },
    features: [
      "ジムに通ったことがない",
      "何から始めればいいかわからない",
      "やる気はあるけど行動できていない",
    ],
    empathyMessage:
      "ジムに来る方の半数以上が「運動経験ほぼゼロ」から。自分に合った始め方に出会えていなかっただけです。",
    failureHeadline: "動けなかった理由",
    failures: [
      {
        title: "いきなり100点を目指していた",
        description:
          "脳は急な変化を「危険」と判断してブレーキをかける。小さく始めるほど脳は味方してくれる。",
      },
      {
        title: "何をすればいいかわからなかった",
        description:
          "選択肢が多いほど動けない（決定疲れ）。「まずこれ1つ」に絞るだけで動き出せる。",
      },
      {
        title: "一人で始めようとしていた",
        description:
          "「誰かと一緒に」「誰かに見てもらう」環境で、習慣化の成功率は大きく上がる。",
      },
    ],
    failureSummary: "やり方が合っていなかっただけ。あなたに合った方法なら、動き出せます。",
    keysHeadline: "はじめの一歩タイプの「3つの鍵」",
    keys: [
      {
        title: "「小さすぎる」から始める",
        description:
          "最初の目標は「運動靴を履く」でOK。小さな成功体験の積み重ねで、脳が「運動=快感」と学習し始める。",
      },
      {
        title: "「正しさ」より「楽しさ」を優先",
        description:
          "効率の良いメニューより「続けられそう」と思える運動の方が100倍価値がある。散歩でもラジオ体操でもOK。",
      },
      {
        title: "体重計より「体感」で測る",
        description:
          "最初の1〜2ヶ月、体重は変わりにくい。「階段が楽」「朝スッキリ」など体感の変化に注目。体重は後からついてくる。",
      },
    ],
    actionsHeadline: "今日からやること（3つだけ）",
    actions: [
      {
        title: "朝の「3分間足踏み」",
        howTo: "起きたらその場で足踏み3分。テレビを見ながらでOK。",
        why: "朝の軽い運動で体温が上がり、代謝のスイッチが入る。ジムの前の「動く習慣づけ」に最適。",
        story:
          "42歳Aさん：2週間で朝のだるさが消え、3ヶ月で-3kg。「午後の眠気がなくなった」",
      },
      {
        title: "食事前に「水をコップ1杯」",
        howTo: "食事の15〜20分前に常温の水を1杯。",
        why: "食前の水で自然と食べすぎを防げる。我慢ゼロの食事改善。",
        story: "38歳Bさん：「我慢ゼロなのに、おかわりしなくなった」",
      },
      {
        title: "寝る前に「今日動いた自分」を1行メモ",
        howTo: "スマホのメモに1行書くだけ。「足踏みした」「水飲んだ」なんでもOK。",
        why: "セルフモニタリングで習慣化の成功率が上がる。「できた」の可視化がモチベーションに。",
        story: "50代Cさん：「メモを見返すと、意外とやれてるなって思えた」",
      },
    ],
    actionsFooter:
      "全部やらなくて大丈夫。1つでいい。「またやろうと思えること」が一番大事。",
    futureMonths: [
      { month: 1, label: "習慣が芽生える", detail: "3分の足踏みが「もう少しやりたい」に変わる" },
      { month: 2, label: "体感が変わる", detail: "「最近なんか元気だよね」と言われ始める" },
      { month: 3, label: "自信が生まれる", detail: "体重-3~4kg。一番変わるのは「自分はやれる」という感覚" },
    ],
    trainerMessage:
      "僕自身も「続けられない自分」にずっと悩んできました。だからあなたの気持ちがわかります。完璧じゃなくて大丈夫。あなたのペースで、あなたのやり方で。一人で不安なら、声をかけてください。",
    ctaHeadline: "もっと本気で変わりたくなったら",
    ctaIntro: "このガイドを実践して「もう少し踏み込みたい」と思ったら、体験セッションへ。",
    ctaSessionTitle: "STAY GOLD 体験セッション（60分）",
    ctaItems: [
      "体の状態チェック（姿勢・柔軟性・筋力）",
      "タイプに合わせた運動プラン提案",
      "実際のトレーニング体験",
      "食事・生活習慣カウンセリング",
    ],
    ctaClosing:
      "マンツーマンだから、自分のペースで安心して取り組めます。",
  },

  food_reset: {
    type: "food_reset",
    typeName: "食事リセットタイプ",
    subCopy: "我慢するダイエットは卒業。食べ方を変えるだけで、体は変わる。",
    themeColor: {
      gradient: "from-orange-500 to-amber-400",
      accent: "text-orange-600",
      accentBg: "bg-orange-500",
      storyBg: "bg-orange-50",
      border: "border-orange-200",
    },
    features: [
      "食事制限で痩せた→リバウンドの繰り返し",
      "甘いものを食べた後に罪悪感がある",
      "色々なダイエットを試したけど続かない",
    ],
    empathyMessage:
      "食べることが好きなのは素晴らしいこと。今まで上手くいかなかったのは「食べ方の戦略」が合っていなかっただけ。",
    failureHeadline: "リバウンドの本当の原因",
    failures: [
      {
        title: "極端な制限が代謝を落としていた",
        description:
          "急激にカロリーを減らすと体は省エネモードに。制限をやめた途端、下がった代謝のまま食べるのでリバウンドする。",
      },
      {
        title: "「我慢」が脳を消耗させていた",
        description:
          "食欲を我慢し続けると脳のリソースが消耗。夜に我慢が効かなくなるのは自然な現象。",
      },
      {
        title: "「引き算」ばかり考えていた",
        description:
          "「食べるな」の引き算より、「何を食べるか」の足し算に切り替えると、我慢なく体が変わる。",
      },
    ],
    failureSummary:
      "体の仕組みに沿った食べ方をすれば、我慢しなくても体は変わります。",
    keysHeadline: "食事リセットタイプの「3つの鍵」",
    keys: [
      {
        title: "「引き算」でなく「足し算」の食事",
        description:
          "タンパク質と食物繊維を足す。満腹ホルモンの分泌が促進され、自然と全体量が落ち着く。",
      },
      {
        title: "「禁止食品」を作らない",
        description:
          "完全禁止より「週2回は好きなものOK」が長期的に成功率が高い。普段の食事の質を底上げするのがコツ。",
      },
      {
        title: "食事を「味わう」時間に変える",
        description:
          "脳が満腹を感じるまで約15〜20分。ゆっくり食べるだけで、同じ量でも満足感が大きく変わる。",
      },
    ],
    actionsHeadline: "今日からやること（3つだけ）",
    actions: [
      {
        title: "たんぱく質を拳1個分「先に」食べる",
        howTo: "食事の最初に肉・魚・卵・豆腐を手の拳1個分、先に食べる。",
        why: "満腹ホルモンが早めに分泌され、食事全体の量が自然に減る。血糖値の急上昇も防げる。",
        story: "45歳Dさん：卵焼きを先に食べるだけで午後の甘いもの欲求が激減。2ヶ月-2.5kg。",
      },
      {
        title: "おやつは「禁止」でなく「アップグレード」",
        howTo: "コンビニお菓子→ナッツ+ドライフルーツ、菓子パン→プロテインバー+果物。週の半分でOK。",
        why: "血糖値を急上昇させない間食に替えると、さらなる食欲の連鎖を断ち切れる。",
        story: "37歳Eさん：ナッツに替えて1週間で慣れた。「夕方のドカ食いがなくなった」",
      },
      {
        title: "夕食「20分」チャレンジ",
        howTo: "タイマー20分セット→鳴るまでに食べ終わらないようゆっくり噛む。",
        why: "満腹中枢が反応する15〜20分を確保。同じメニューでも満足度が上がり、量が自然に減る。",
        story: "48歳Fさん：「ごはんが美味しいと久しぶりに思えた。おかわりしなくなった」。1.5ヶ月-1.5kg。",
      },
    ],
    actionsFooter:
      "「食べちゃった」と思ったら「明日また選び直せばいい」。それだけで十分。",
    futureMonths: [
      { month: 1, label: "食の選び方が変わる", detail: "「先にタンパク質」が当たり前になる" },
      { month: 2, label: "衝動が減る", detail: "冷蔵庫前での衝動食いがなくなる" },
      { month: 3, label: "食事が楽しみに戻る", detail: "体重-3~4kg。罪悪感ゼロで食事を楽しめる" },
    ],
    trainerMessage:
      "「食べることが好き」って素晴らしいこと。やり方が合っていなかっただけで、あなたの意志はちゃんと強い。食べることを楽しみながら体も変わる毎日は、ちゃんと作れます。",
    ctaHeadline: "もっと本気で変わりたくなったら",
    ctaIntro: "あなた専用の食事戦略を、体験セッションで一緒に作りましょう。",
    ctaSessionTitle: "STAY GOLD 体験セッション（60分）",
    ctaItems: [
      "現在の食事パターンをヒアリング",
      "体質に合わせた「足し算の食事」提案",
      "トレーニング体験（食事×運動の相乗効果）",
      "「我慢しない食事戦略」の個別プラン",
    ],
    ctaClosing: "「何を食べればいいかわからない」を「これでいいんだ」に変える60分。",
  },

  time_hack: {
    type: "time_hack",
    typeName: "スキマ時間活用タイプ",
    subCopy: "まとまった時間は不要。1日5分の積み重ねが3ヶ月後のあなたを変える。",
    themeColor: {
      gradient: "from-blue-500 to-cyan-400",
      accent: "text-blue-600",
      accentBg: "bg-blue-500",
      storyBg: "bg-blue-50",
      border: "border-blue-200",
    },
    features: [
      "「ジムに通う時間がない」が口癖",
      "仕事・家事・育児で1日があっという間",
      "自分のための時間を取ることに罪悪感がある",
    ],
    empathyMessage:
      "ダイエットに「まとまった時間」は実は不要。1日5分のスキマ時間の使い方を変えるだけで、体は確実に変わる。",
    failureHeadline: "忙しい人が続かない本当の理由",
    failures: [
      {
        title: "「まとまった時間が必要」という思い込み",
        description:
          "10分×3回と30分×1回の脂肪燃焼効果に大きな差はない。分割でも十分効果的。",
      },
      {
        title: "「自分の時間」の優先順位が最後",
        description:
          "自分の健康は「余った時間」ではなく「先に確保する時間」。あなたが元気でいることが家族にも一番大切。",
      },
      {
        title: "「効果が出る=大変」という先入観",
        description:
          "日常の小さな活動量の積み重ね（NEAT）が消費カロリーの大部分を占める。「ちょっと動く」で十分。",
      },
    ],
    failureSummary:
      "必要なのは「もっと頑張る」ではなく、すでにある時間に「小さな運動」を差し込むスキル。",
    keysHeadline: "スキマ時間活用タイプの「3つの鍵」",
    keys: [
      {
        title: "「ながら運動」を仕組み化",
        description:
          "歯磨き中にかかと上げ、料理中にスクワット。既存の行動に運動をくっつける（習慣スタッキング）。",
      },
      {
        title: "「5分」を制する",
        description:
          "電車の待ち時間、会議前、子どもが寝た直後。5分の運動でも心拍数が上がれば代謝は活性化する。",
      },
      {
        title: "「完璧な1日」より「60点の毎日」",
        description:
          "完璧な週1回より、60点の毎日が確実に結果を出す。「5分しかできなかった」=「5分できた」。",
      },
    ],
    actionsHeadline: "今日からやること（3つだけ）",
    actions: [
      {
        title: "歯磨き中の「かかと上げ」",
        howTo: "朝晩の歯磨き中にかかとを上げ下げ。回数は気にしない。",
        why: "ふくらはぎは「第二の心臓」。血流改善・むくみ軽減・代謝アップに効果的。新しい時間は不要。",
        story: "41歳Gさん：3ヶ月で-2kg。「ふくらはぎのパンパン感が消えた」",
      },
      {
        title: "エレベーターを「1フロアだけ」階段に",
        howTo: "全部じゃなく1フロアだけ階段で上がる。残りはエレベーターでOK。",
        why: "階段昇降はウォーキングよりカロリー消費効率が高い。「1フロアだけ」が続けるコツ。",
        story: "36歳Hさん：「気づいたら2フロア上がるようになってた」",
      },
      {
        title: "寝る前の「5分ストレッチ」",
        howTo: "布団の上で3つ：腰ゴロゴロ1分、お尻伸ばし各1分、背中反らし1分。",
        why: "睡眠の質が上がり、成長ホルモンが促進。「寝てる間に体が変わる準備」。",
        story: "44歳Iさん：3ヶ月-3kg。「一番の変化は『自分の時間を持てている』という満足感」",
      },
    ],
    actionsFooter:
      "合計10分。全部「ついで」か「寝る前」。新しい時間は不要。",
    futureMonths: [
      { month: 1, label: "ながら運動が習慣に", detail: "歯磨き中のかかと上げが無意識になる" },
      { month: 2, label: "体力がつく", detail: "仕事後も「疲れてぐったり」がなくなる" },
      { month: 3, label: "体が引き締まる", detail: "体重-3kg。「5分あればできる」に変わっている" },
    ],
    trainerMessage:
      "忙しい毎日の中、このガイドを読む時間を作ってくれたこと。それだけで最初の一歩です。体が変わった人は「まとまった時間を作れた人」ではなく「5分のスキマに動けた人」でした。1つだけ、1週間だけ、試してみてください。",
    ctaHeadline: "もっと本気で変わりたくなったら",
    ctaIntro: "5分で変われるなら、プロと一緒に60分集中したらどうなる？",
    ctaSessionTitle: "STAY GOLD 体験セッション（60分）",
    ctaItems: [
      "あなた専用「ながら運動」プランの作成",
      "短時間で最大効果のトレーニング体験",
      "忙しい人向け「時短食事術」の提案",
      "「自分に合った続け方」の個別カウンセリング",
    ],
    ctaClosing: "週1回60分から始められます。",
  },

  switch_on: {
    type: "switch_on",
    typeName: "本気スイッチタイプ",
    subCopy: "やる気は十分。「正しい方向」にその力を向けるだけ。",
    themeColor: {
      gradient: "from-pink-600 to-rose-500",
      accent: "text-pink-600",
      accentBg: "bg-pink-600",
      storyBg: "bg-pink-50",
      border: "border-pink-200",
    },
    features: [
      "最初はストイックに頑張れるが2〜3週で止まる",
      "情報は集めるが何を信じればいいかわからない",
      "「こんなに頑張ってるのに」と悔しくなる",
    ],
    empathyMessage:
      "あなたのやる気は本物。結果が出にくかったのは、努力の方向が少しずれていた可能性がある。方向さえ合えば最速で結果に繋がる。",
    failureHeadline: "頑張れる人がハマる3つの落とし穴",
    failures: [
      {
        title: "追い込みすぎが逆効果",
        description:
          "筋肉は「休んでいる間」に成長する。休息なしの追い込みは代謝低下・脂肪蓄積の原因になる。",
      },
      {
        title: "短期決戦のマインドセット",
        description:
          "ゴール達成で「頑張る理由」がなくなりリバウンド。「一生続けられるレベル」が正解。",
      },
      {
        title: "情報の洪水で混乱",
        description:
          "方法をコロコロ変えると、どれも効果が出る前にやめてしまう。1つに絞ることが大事。",
      },
    ],
    failureSummary:
      "足りないのは「努力」ではなく「戦略」。正しい方向×正しい量の努力で、結果は変わる。",
    keysHeadline: "本気スイッチタイプの「3つの鍵」",
    keys: [
      {
        title: "「週4以上」より「週2〜3回+しっかり休む」",
        description:
          "週3回と週5回で筋力向上に大差なし。休む日は「サボり」ではなく「体が変わっている日」。",
      },
      {
        title: "「100点の1週間」より「70点の3ヶ月」",
        description:
          "100%遵守を目指すと1回の失敗で全部投げ出しやすい。70点を3ヶ月が圧倒的に結果を出す。",
      },
      {
        title: "「体重」以外の指標を持つ",
        description:
          "体重は水分で1〜2kg変動する。ウエストサイズ・体脂肪率の傾向・トレーニング記録など複数指標で判断。",
      },
    ],
    actionsHeadline: "今日からやること（3つだけ）",
    actions: [
      {
        title: "トレーニングを3種目に絞る",
        howTo: "上半身1つ・下半身1つ・体幹1つを選び、週2〜3回×各2〜3セット。",
        why: "少数の基本種目を繰り返す方がフォームが安定し、迷う時間もなくなる。",
        story: "39歳Jさん：3種目に絞って2ヶ月で体つきが変化。「迷わなくなったのが一番デカい」",
      },
      {
        title: "「休息日」をカレンダーに入れる",
        howTo: "週3〜4日を完全オフとしてカレンダーに記入。追い込まない。",
        why: "48〜72時間の休息で超回復が完了する。計画的休息がトレーニング効果を最大化。",
        story: "35歳Kさん：毎日→週3に変えた途端、1ヶ月-2kg・体脂肪率-1.5%。",
      },
      {
        title: "週1回、体重以外の変化を記録",
        howTo: "ウエストサイズ、鏡での写真、扱った重量・回数、体感の変化を1行メモ。",
        why: "筋肉が増え脂肪が減ると、体重は変わらなくても見た目は大きく変わる。",
        story: "43歳Lさん：体重-1kgでもウエスト-4cm。「写真を撮っておいて本当に良かった」",
      },
    ],
    actionsFooter:
      "あなたの「やる気」は武器。「もっとやらなきゃ」ではなく「これだけやればいい」と決めること。それも立派な強さ。",
    futureMonths: [
      { month: 1, label: "やることが明確に", detail: "迷いがなくなり、3種目を黙々とこなす" },
      { month: 2, label: "数字に現れる", detail: "扱う重量が右肩上がり。体が応えてくれる" },
      { month: 3, label: "別人の体つき", detail: "体重-3~4kg、ウエスト-5cm。「頑張り方」がわかった自分" },
    ],
    trainerMessage:
      "やる気だけで体は変わりにくい。「正しい方向への正しい量の努力」が必要。あなたに必要なのは「頑張り方のナビゲーション」。その本気、正しい方向に向けてみませんか。",
    ctaHeadline: "もっと本気で変わりたくなったら",
    ctaIntro: "あなたの本気を、最短距離で結果に変える。",
    ctaSessionTitle: "STAY GOLD 体験セッション（60分）",
    ctaItems: [
      "体の現在地を数値で把握（体組成・姿勢・柔軟性）",
      "目標に合わせた最短ルートのプラン作成",
      "フォームチェック付きトレーニング実践",
      "「やりすぎ」を防ぐ回復・栄養の戦略設計",
    ],
    ctaClosing:
      "100の情報から正解を探すより、プロと一緒に「あなたの正解」を1つ決める方が圧倒的に早い。",
  },
};
