export interface TextbookChapter {
  number: number;
  title: string;
  color: string;
  summary: string;
  sections: TextbookSection[];
}

export interface TextbookSection {
  heading?: string;
  lead?: string;
  paragraphs?: string[];
  bullets?: string[];
  subsections?: TextbookSubsection[];
  table?: { headers: string[]; rows: string[][] };
  note?: string;
  keyMessage?: string;
  sceneExample?: string;
  comboExamples?: { label: string; items: string[]; kcal?: string }[];
}

export interface TextbookSubsection {
  title: string;
  description?: string;
  bullets?: string[];
  sceneExample?: string;
}

export const textbookTitle = "もう体型に困らない ダイエットの教科書";
export const textbookSubCopy =
  "食事・運動・習慣・メンタル — 4つの柱で、もう迷わない";

export const textbookChapters: TextbookChapter[] = [
  {
    number: 1,
    title: "うまくいく人が知っている3つのこと",
    color: "amber",
    summary: "食べ方・運動の役割・仕組みで続ける。この3つを押さえるだけで変わる。",
    sections: [
      {
        subsections: [
          {
            title: "食べ方を変えるだけで体は変わる",
            bullets: [
              "食事量を極端に減らすと体は省エネモードに入る",
              "基礎代謝が下がり、やめた途端にリバウンド",
            ],
          },
          {
            title: "運動の本当の役割は「筋肉を守ること」",
            bullets: [
              "30分のジョギング消費=おにぎり1個分（約200kcal）",
              "運動の価値は、筋肉を守り代謝を維持すること",
            ],
          },
          {
            title: "「仕組み」で続ける人がうまくいく",
            bullets: [
              "意志力は有限。仕組みで続けるのがコツ",
              "ダイエットは短距離走ではなく、歩いて続けるもの",
            ],
          },
        ],
      },
    ],
  },
  {
    number: 2,
    title: "ダイエットの全体像",
    color: "sky",
    summary: "食事・運動・習慣・メンタルの4本柱をバランスよく押さえる。",
    sections: [
      {
        subsections: [
          { title: "食事", description: "体を作る材料。「何を食べるか」を意識するだけで変わる" },
          { title: "運動", description: "代謝を守り、体のラインを整える。短時間でOK" },
          { title: "習慣", description: "「仕組み」で自然に続く状態を作る" },
          { title: "メンタル", description: "自分を認めることが土台。「やりたい」から動く力" },
        ],
        keyMessage: "全部を一気にやる必要はない。気になる章から読んでみてください。",
      },
    ],
  },
  {
    number: 3,
    title: "食事編：食べて痩せる仕組み",
    color: "emerald",
    summary: "タンパク質・脂質・炭水化物のバランスと血糖値コントロールが鍵。",
    sections: [
      {
        heading: "栄養バランスの基礎",
        lead: "3大栄養素のバランスを意識するだけで食事の質は大きく変わる。",
        subsections: [
          {
            title: "タンパク質 — 体を作る材料",
            bullets: [
              "筋肉・肌・髪・爪の材料",
              "1日の目安：体重1kgあたり約1〜1.5g",
              "イメージ：手のひら1枚分の肉・魚を毎食",
            ],
          },
          {
            title: "脂質 — 量と質がポイント",
            bullets: [
              "1gあたり9kcal（タンパク質・炭水化物は4kcal）",
              "良い脂質を選ぶ：魚の油、オリーブオイル、ナッツ",
            ],
          },
          {
            title: "炭水化物 — 味方にすると心強い",
            bullets: [
              "脳と体のエネルギー源",
              "白米→玄米、パン→全粒粉パンに「選ぶ」意識",
            ],
          },
        ],
        note: "1食の目安：皿の半分→野菜 / 1/4→タンパク質 / 1/4→炭水化物 / 少量の良い脂質",
      },
      {
        heading: "血糖値コントロール",
        lead: "食後の眠気や間食欲求は血糖値の急上昇が原因。食べる順番を変えるだけで防げる。",
        subsections: [
          {
            title: "食べる順番を変える",
            description: "野菜・汁物 → タンパク質 → 炭水化物の順番で。",
          },
          {
            title: "炭水化物を「選ぶ」",
            description: "白米→玄米、食パン→全粒粉パン、うどん→そば。",
          },
          {
            title: "朝食を軽くでも摂る",
            description: "トーストにゆで卵を足すだけで昼のドカ食いを防げる。",
          },
        ],
      },
      {
        heading: "コンビニ活用術",
        lead: "コンビニでも「選び方」を知っていればダイエット向きの食事は十分できる。",
        bullets: [
          "サラダチキン / ゆで卵 / ギリシャヨーグルト",
          "雑穀おにぎり / カット野菜 / 味噌汁",
        ],
        comboExamples: [
          { label: "昼食", items: ["サラダチキン", "雑穀おにぎり", "サラダ"], kcal: "約450kcal" },
          { label: "間食", items: ["ギリシャヨーグルト", "ナッツ少量"], kcal: "約200kcal" },
          { label: "夕食（軽め）", items: ["具だくさんスープ", "ゆで卵2個", "サラダ"], kcal: "約350kcal" },
        ],
      },
    ],
  },
  {
    number: 4,
    title: "運動編：最小限で最大効果",
    color: "violet",
    summary: "「どちらか1つ」なら筋トレ優先。1日3〜5分から始められる。",
    sections: [
      {
        heading: "筋トレが味方になる理由",
        lead: "ダイエットで本当に大事なのは、筋肉を味方につけること。",
        subsections: [
          {
            title: "筋肉が増えると痩せやすくなる",
            bullets: [
              "基礎代謝の約2割は筋肉が使っている",
              "30代以降、筋肉は年0.5〜1%ずつ減る",
              "筋トレで筋肉を守ることが年々大きな差に",
            ],
          },
        ],
        table: {
          headers: ["", "有酸素運動", "筋トレ"],
          rows: [
            ["運動中の消費", "多い", "少なめ"],
            ["運動後の消費", "すぐ戻る", "数時間続く"],
            ["筋肉への効果", "維持しにくい", "維持・増加"],
            ["基礎代謝", "変化少", "上がる"],
          ],
        },
        keyMessage: "「どちらか一つ」なら筋トレ優先。理想は筋トレ+日常の活動量アップ。",
      },
      {
        heading: "1日3〜5分でできること",
        lead: "ジムに行く時間がなくてもOK。まずは3種目から。",
        subsections: [
          {
            title: "スクワット（下半身全体）",
            description: "体で一番大きな筋肉を使う",
            bullets: [
              "足を肩幅に開き、椅子に座るイメージ",
              "10回 x 2セット（約1分）",
            ],
          },
          {
            title: "プランク（体幹）",
            description: "お腹まわりを引き締める",
            bullets: [
              "ひじとつま先で体を支え、一直線をキープ",
              "20秒 x 2セット（約1分）",
            ],
          },
          {
            title: "ヒップリフト（お尻・裏もも）",
            description: "ヒップアップ効果",
            bullets: [
              "仰向けでお尻を持ち上げ3秒キープ",
              "10回 x 2セット（約1分）",
            ],
          },
        ],
        note: "合計約3〜5分。運動後に30秒ストレッチを入れると効果アップ。",
      },
    ],
  },
  {
    number: 5,
    title: "習慣編：続けるための仕組み",
    color: "orange",
    summary: "意志力に頼らない。ハードルを下げて、環境を整える。",
    sections: [
      {
        heading: "仕組みで続く人になれる",
        lead: "3日坊主は性格ではなく仕組みの問題。仕組みを変えるだけで自然に続く。",
        subsections: [
          {
            title: "行動のハードルを下げる",
            bullets: [
              "ゴールは「ウェアに着替える」でOK",
              "ヨガマットを出しっぱなしにする",
            ],
          },
          {
            title: "既存の習慣にくっつける",
            bullets: [
              "「歯磨き後にスクワット10回」",
              "いつやるかを決めておくと判断コストゼロ",
            ],
          },
          {
            title: "環境を整える",
            bullets: [
              "お菓子は目につかない場所へ",
              "冷蔵庫の手前にゆで卵やカット野菜",
            ],
          },
        ],
      },
      {
        heading: "80点主義のすすめ",
        lead: "100点を目指すと止まる。70点を30日続ける方が結果が出る。",
        subsections: [
          {
            title: "「まあいいか」が最強の味方",
            bullets: [
              "1日食べすぎても体脂肪はほぼ変わらない（脂肪1kg=7,200kcal）",
              "1回の寄り道を、次の良い選択につなげる",
            ],
          },
          {
            title: "「まず1つだけ」で動き出す",
            bullets: [
              "完璧なプランより「1つだけやる」が効果的",
            ],
          },
        ],
        note: "80点の例：3食中2食がバランスよければOK / 週3日運動できたらOK / サボっても翌日再開すればOK",
        keyMessage: "昨日の自分より1つだけ良い選択ができたら、それで十分。",
      },
    ],
  },
  {
    number: 6,
    title: "メンタル編：続く人の考え方",
    color: "rose",
    summary: "自分を認めることが土台。「やりたい」が一番長く続くエネルギー。",
    sections: [
      {
        heading: "自分を認めることが土台",
        lead: "小さな成功を認める → 自信がつく → 次の行動が生まれる。このサイクルが回ると楽しくなる。",
        subsections: [
          {
            title: "「できたこと」に目を向ける",
            bullets: [
              "1日の終わりに良かったことを1つ書く",
              "小さな成功体験が自信を作る",
            ],
          },
          {
            title: "体重計との付き合い方",
            bullets: [
              "1日で1〜2kg変動するのは普通",
              "1〜2週間の平均で見る。体感や服のフィット感にも注目",
            ],
          },
        ],
      },
      {
        heading: "「やりたい」から始める",
        lead: "内側から湧く動機が、一番長く続くエネルギーになる。",
        subsections: [
          {
            title: "外からの力 vs 内側からの力",
            bullets: [
              "「医者に言われた」→外からの力（短期的）",
              "「自信を持ちたい」「好きな服を着たい」→内側の力（長期的）",
            ],
          },
          {
            title: "あなたの「本当の理由」を見つける",
            bullets: [
              "「なぜ痩せたい？」を3回掘り下げる",
              "一番深い理由が、つらい時に立ち戻れる場所",
            ],
          },
        ],
        keyMessage: "ダイエットは「なりたい自分に近づくこと」。過程を楽しめた時、結果は自然とついてくる。",
      },
    ],
  },
  {
    number: 7,
    title: "あなたの「次の一歩」",
    color: "amber",
    summary: "全体像をつかんだ。あとは「まず1つ」今日やるだけ。",
    sections: [
      {
        subsections: [
          {
            title: "ステップ1：自分のタイプを知る",
            bullets: ["LINE診断であなたの「ダイエットタイプ」がわかる"],
          },
          {
            title: "ステップ2：まず1つ、今日やってみる",
            bullets: [
              "野菜から先に食べる / スクワット10回 / 「できたこと」を1つ書く",
              "どれか1つで十分。「始めた」こと自体がすごい",
            ],
          },
          {
            title: "ステップ3：一人で抱え込まなくて大丈夫",
            bullets: [
              "自分に合うやり方は一人だと見つけにくい",
              "STAY GOLDの体験セッションであなた専用のアドバイスを",
            ],
          },
        ],
        keyMessage: "今日から少しずつ変えていけば、半年後の自分はきっと違う。あなたなら絶対にできる。",
      },
    ],
  },
];
