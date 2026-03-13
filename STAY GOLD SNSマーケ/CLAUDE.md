# おすすめコンビニ食 - 横スライドPDF特典テンプレート

## プロジェクト概要
LINE公式アカウントの特典用PDF。コンビニで買える高たんぱく・低脂質商品を横スライド形式（16:9）で紹介するガイド。

## フォルダ構成
```
├── create_horizontal_pdf.py   ← メインスクリプト（横スライド16:9 PDF生成）
├── create_pdf.py              ← 旧A4版（現在不使用）
├── assets/                    ← 表紙画像・素材
│   └── 表紙.png              ← ChatGPTで生成した表紙画像（16:9）
├── data/                      ← 商品データJSON
├── output/                    ← 生成されたPDF出力先
├── product_images/            ← 商品画像（seven_*.jpg, lawson_*.png, family_*.jpg）
└── reference/                 ← 参考資料（SNS1年生の教科書.pdf等）
```

## スライド仕様
- サイズ: 1440x810pt（16:9横スライド）
- フォント: HeiseiKakuGo-W5（CID）
- ライブラリ: ReportLab（PDF生成）、PyMuPDF/fitz（プレビュー抽出）
- ページ番号: 右下に半透明ピル背景付き

## スライド構成（39ページ）
1. 表紙（assets/表紙.png をフルブリード配置）
2. 選び方ガイド①②（2ページ）
3. セブンイレブン: 目次 → 商品ページ×10
4. ローソン: 目次 → 商品ページ×8
5. ファミリーマート: 目次 → 商品ページ×10
6. まとめページ
7. 番外編（タイトル + 2ページ）: 見た目に反して脂質10g以下の商品
8. 注意事項ページ

## 別アカウント用に再利用する手順

### カスタマイズ箇所は3つだけ

#### 1. カラーパレット（create_horizontal_pdf.py 30〜42行目）
```python
C_BG_DARK   = "#0D1B2A"   # スライド全体の背景色
C_BG_MID    = "#162535"    # フッター等の中間背景
C_ACCENT    = "#00C4A7"    # メインアクセントカラー（見出し・ライン）
C_ACCENT2   = "#F5A623"    # サブアクセント（ゴールド系）
C_LIGHT     = "#B0C4CC"    # 薄い補足テキスト
C_CARD      = "#1A2E40"    # カード背景色
```
→ 公式LINEのイメージカラーに合わせてこの6色を変更すれば世界観が変わる

#### 2. 商品データ（create_horizontal_pdf.py 95〜197行目）
```python
# 各商品の形式:
{"name": "商品名", "cat": "カテゴリ", "p": タンパク質g, "f": 脂質g,
 "c": 炭水化物g, "kcal": カロリー, "area": "販売地域",
 "img": "画像ファイル名", "desc": "説明文（\nで改行）"}
```
- SEVEN_ITEMS, LAWSON_ITEMS, FAMILY_ITEMS: メイン商品（P≥15g, F≤10g基準）
- BONUS_ITEMS: 番外編（脂質10g以下、タンパク質基準なし。surprise フィールド追加）
- 商品数を変えると TOTAL_PAGES が自動計算される

#### 3. 表紙画像
- assets/表紙.png を差し替える（16:9比率推奨）
- ChatGPTのDALL-Eで生成する場合のプロンプト例:
  「16:9の横長バナー。ダークネイビー背景に[アクセントカラー]のグラデーション光線。中央に大きく「[タイトル]」。下部にコンビニ食品の写真を配置。高級感のあるデザイン。」

### 商品画像の命名規則
- セブン: `seven_商品名.jpg`
- ローソン: `lawson_商品名.png`
- ファミマ: `family_商品名.jpg`
- product_images/ フォルダに配置

## PDF生成コマンド
```bash
python3 create_horizontal_pdf.py
# → output/おすすめコンビニ飯ガイド_横スライド.pdf
```

## 依存ライブラリ
```bash
pip install reportlab pymupdf pillow
```
