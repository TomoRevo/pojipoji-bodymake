#!/usr/bin/env python3
# -*- coding: utf-8 -*-

import os
from reportlab.lib.pagesizes import A4
from reportlab.lib import colors
from reportlab.lib.units import mm
from reportlab.pdfgen import canvas
from reportlab.lib.utils import ImageReader
from reportlab.pdfbase import pdfmetrics
from PIL import Image
import math

# ---- フォント設定 ----
from reportlab.pdfbase.cidfonts import UnicodeCIDFont
pdfmetrics.registerFont(UnicodeCIDFont('HeiseiKakuGo-W5'))
pdfmetrics.registerFont(UnicodeCIDFont('HeiseiMin-W3'))
FONT_BOLD = "HeiseiKakuGo-W5"
FONT_REG  = "HeiseiKakuGo-W5"

BASE = "/Users/yujifujita/おすすめコンビニ食"
OUT  = os.path.join(BASE, "おすすめコンビニ食まとめ.pdf")

W, H = A4  # 595.28 x 841.89

# ---- カラーパレット ----
C_BG_DARK   = colors.HexColor("#0D1B2A")
C_ACCENT    = colors.HexColor("#00C4A7")
C_ACCENT2   = colors.HexColor("#F5A623")
C_WHITE     = colors.white
C_GRAY      = colors.HexColor("#6B7280")
C_CARD      = colors.HexColor("#1A2E40")

C_SEVEN     = colors.HexColor("#007D40")
C_LAWSON    = colors.HexColor("#0068B7")
C_FAMILY    = colors.HexColor("#00A0E9")   # FamilyMart スカイブルー
C_FAMILY_G  = colors.HexColor("#009A44")   # FamilyMart グリーン


def draw_rounded_rect(c, x, y, w, h, r, fill_color=None, stroke_color=None, lw=0.5):
    c.saveState()
    if fill_color:
        c.setFillColor(fill_color)
    if stroke_color:
        c.setStrokeColor(stroke_color)
        c.setLineWidth(lw)
    else:
        c.setStrokeColor(colors.transparent)
    p = c.beginPath()
    p.roundRect(x, y, w, h, r)
    if fill_color and stroke_color:
        c.drawPath(p, fill=1, stroke=1)
    elif fill_color:
        c.drawPath(p, fill=1, stroke=0)
    else:
        c.drawPath(p, fill=0, stroke=1)
    c.restoreState()


def draw_gradient_bg(c, x, y, w, h, color1, color2, steps=40):
    r1, g1, b1 = color1.red, color1.green, color1.blue
    r2, g2, b2 = color2.red, color2.green, color2.blue
    step_h = h / steps
    for i in range(steps):
        t = i / steps
        r = r1 + (r2 - r1) * t
        g = g1 + (g2 - g1) * t
        b = b1 + (b2 - b1) * t
        c.setFillColorRGB(r, g, b)
        c.rect(x, y + i * step_h, w, step_h + 1, fill=1, stroke=0)


def draw_page_number(c, page_num, total=9):
    c.saveState()
    c.setFillColor(C_GRAY)
    c.setFont(FONT_REG, 8)
    c.drawCentredString(W / 2, 12 * mm, f"{page_num} / {total}")
    c.restoreState()


def draw_diagonal_stripes(c, x, y, w, h, stripe_color, stripe_w=3*mm, gap_w=9*mm):
    """45度斜めストライプをクリッピング付きで描画"""
    c.saveState()
    clip = c.beginPath()
    clip.rect(x, y, w, h)
    c.clipPath(clip, stroke=0, fill=0)
    c.setFillColor(stripe_color)
    step = stripe_w + gap_w
    ix = -h
    while ix < w + h:
        p = c.beginPath()
        p.moveTo(x + ix,           y)
        p.lineTo(x + ix + stripe_w, y)
        p.lineTo(x + ix + stripe_w + h, y + h)
        p.lineTo(x + ix + h,        y + h)
        p.close()
        c.drawPath(p, fill=1, stroke=0)
        ix += step
    c.restoreState()


def draw_h_stripes(c, x, y, w, h, colors_list):
    """横縞ストライプ：colors_listの色を等分割で上から下に描画"""
    n = len(colors_list)
    stripe_h = h / n
    for i, col in enumerate(colors_list):
        c.setFillColor(col)
        # ReportLabはy軸が下から上なので、一番上の縞が最大y
        c.rect(x, y + h - stripe_h * (i + 1), w, stripe_h, fill=1, stroke=0)


def draw_store_header(c, title, subtitle, bg_color, accent_left=None,
                      stripe_color=None, v_stripes=None, h_stripes=None):
    """各ストアページの共通ヘッダー"""
    c.setFillColor(bg_color)
    c.rect(0, H - 22*mm, W, 22*mm, fill=1, stroke=0)
    # 横縞（ファミマロゴ風 緑・白・青）
    if h_stripes:
        draw_h_stripes(c, 0, H - 22*mm, W, 22*mm, h_stripes)
    # 縦縞
    elif v_stripes:
        col1, col2, sw = v_stripes
        # inline vertical stripes
        ix = 0; toggle = False
        while ix < W:
            c.setFillColor(col2 if toggle else col1)
            sw2 = min(sw, W - ix)
            c.rect(ix, H - 22*mm, sw2, 22*mm, fill=1, stroke=0)
            ix += sw; toggle = not toggle
    # 斜めストライプ
    elif stripe_color:
        draw_diagonal_stripes(c, 0, H - 22*mm, W, 22*mm, stripe_color)
    if accent_left:
        c.setFillColor(accent_left)
        c.rect(0, H - 22*mm, 8*mm, 22*mm, fill=1, stroke=0)
    text_color = colors.black if h_stripes else C_WHITE
    c.setFillColor(text_color)
    c.setFont(FONT_BOLD, 17)
    c.drawString(15*mm, H - 15*mm, title)
    c.setFont(FONT_REG, 8.5)
    c.drawRightString(W - 15*mm, H - 15*mm, subtitle)


def draw_section_banner(c, y, text, bg_color):
    """セクションタイトルバー"""
    c.setFillColor(bg_color)
    c.rect(12*mm, y - 8*mm, W - 24*mm, 9*mm, fill=1, stroke=0)
    c.setFillColor(C_WHITE)
    c.setFont(FONT_BOLD, 9.5)
    c.drawString(15*mm, y - 5.5*mm, text)
    return y - 12*mm


def draw_large_cards(c, y_start, items, brand_color, cols=2, card_h=74*mm):
    """
    モバイル最適化 大型カードグリッド
    cols=1 でフルwidth ヒーローカード、cols=2 で2列グリッド
    カード構成（上→下）: ブランドストリップ / 画像 / ラベル行 / 商品名 / 区切り / P / F+C+kcal
    """
    margin = 12*mm
    gap = 5*mm
    card_w = (W - margin * 2 - gap * (cols - 1)) / cols
    row_gap = 5*mm

    # テキストエリア合計 36mm: ラベル行7 + 名前13 + 区切り+栄養16
    label_h = 7*mm
    name_h  = 13*mm
    nut_h   = 16*mm
    text_total = label_h + name_h + nut_h   # 36mm
    strip_h_mm = 1*mm
    img_h = card_h - strip_h_mm - text_total  # 74-1-36 = 37mm (2-col)

    max_chars = 12 if cols == 2 else 22

    for idx, item in enumerate(items):
        name, cat, prot, fat, carb, kcal, area, img_fn = item
        col = idx % cols
        row = idx // cols

        cx = margin + col * (card_w + gap)
        card_top = y_start - row * (card_h + row_gap)
        card_bottom = card_top - card_h

        # ---- カード背景 ----
        draw_rounded_rect(c, cx, card_bottom, card_w, card_h, 6,
                          fill_color=C_WHITE, stroke_color=colors.HexColor("#DDDDDD"))

        # ---- ブランドカラー上部ストリップ ----
        c.setFillColor(brand_color)
        c.rect(cx, card_top - strip_h_mm, card_w, strip_h_mm, fill=1, stroke=0)

        # ---- 画像エリア ----
        img_top    = card_top - strip_h_mm
        img_bottom = img_top - img_h

        c.setFillColor(colors.HexColor("#F0F0F0"))
        c.rect(cx, img_bottom, card_w, img_h, fill=1, stroke=0)

        if img_fn:
            ip = os.path.join(BASE, "product_images", img_fn)
            if os.path.exists(ip):
                c.drawImage(ip, cx + 1, img_bottom + 1,
                            width=card_w - 2, height=img_h - 2,
                            preserveAspectRatio=True, anchor='c')

        # ---- ラベル行（画像の下、独立した行）----
        label_row_bottom = img_bottom - label_h
        label_row_top    = img_bottom

        # ラベル行背景
        c.setFillColor(colors.HexColor("#EEF2F6"))
        c.rect(cx, label_row_bottom, card_w, label_h, fill=1, stroke=0)

        # カテゴリ（左）
        c.setFillColor(brand_color)
        c.setFont(FONT_BOLD, 7)
        c.drawString(cx + 3*mm, label_row_bottom + 2*mm, cat)

        # 販売地域（右）
        c.setFillColor(C_GRAY)
        c.setFont(FONT_REG, 6.5)
        c.drawRightString(cx + card_w - 3*mm, label_row_bottom + 2*mm, area)

        # ---- 商品名（ラベル行の下）----
        name_area_top = label_row_bottom

        name_parts = name.split("\n")
        if len(name_parts) == 1 and len(name) > max_chars:
            name_parts = [name[:max_chars], name[max_chars:]]

        c.setFillColor(C_BG_DARK)
        if len(name_parts) == 1:
            c.setFont(FONT_BOLD, 8.5)
            c.drawCentredString(cx + card_w / 2, name_area_top - 6.5*mm, name_parts[0])
        else:
            c.setFont(FONT_BOLD, 8)
            c.drawCentredString(cx + card_w / 2, name_area_top - 4*mm, name_parts[0])
            c.setFont(FONT_BOLD, 7.5)
            ln2 = name_parts[1]
            if len(ln2) > max_chars:
                ln2 = ln2[:max_chars - 1] + "…"
            c.drawCentredString(cx + card_w / 2, name_area_top - 10*mm, ln2)

        # ---- 区切り線 ----
        sep_y = card_bottom + nut_h
        c.setStrokeColor(colors.HexColor("#E0E0E0"))
        c.setLineWidth(0.5)
        c.line(cx + 3*mm, sep_y, cx + card_w - 3*mm, sep_y)

        # ---- 栄養情報 Row1: P（大）----
        p_y = card_bottom + 10*mm
        c.setFillColor(brand_color)
        c.setFont(FONT_BOLD, 12)
        c.drawString(cx + 3*mm, p_y, f"P {prot}g")

        # ---- 栄養情報 Row2: F / C / kcal（小）----
        sub_y = card_bottom + 4.5*mm
        c.setFillColor(C_ACCENT2)
        c.setFont(FONT_BOLD, 8.5)
        c.drawString(cx + 3*mm, sub_y, f"F {fat}g")

        c.setFillColor(colors.HexColor("#4AAFAF"))
        c.setFont(FONT_BOLD, 8.5)
        c.drawString(cx + card_w * 0.38, sub_y, f"C {carb}g")

        c.setFillColor(C_GRAY)
        c.setFont(FONT_REG, 7.5)
        c.drawRightString(cx + card_w - 3*mm, sub_y, f"{kcal}kcal")

    rows = math.ceil(len(items) / cols)
    return y_start - rows * (card_h + row_gap)


# ================================================================
# PAGE 1: ファーストビュー（表紙）
# ================================================================
def page_cover(c):
    c.saveState()

    c.setFillColor(C_BG_DARK)
    c.rect(0, 0, W, H, fill=1, stroke=0)

    TEAL_BOT = H - 107*mm
    c.setFillColor(C_ACCENT)
    c.rect(0, TEAL_BOT, W, H - TEAL_BOT, fill=1, stroke=0)

    # 斜め切り
    p = c.beginPath()
    p.moveTo(0, TEAL_BOT)
    p.lineTo(W, TEAL_BOT)
    p.lineTo(W, TEAL_BOT + 13*mm)
    p.lineTo(0, TEAL_BOT + 5*mm)
    p.close()
    c.setFillColor(C_BG_DARK)
    c.drawPath(p, fill=1, stroke=0)

    c.setStrokeColor(C_ACCENT2)
    c.setLineWidth(2.5)
    c.line(0, TEAL_BOT + 5*mm, W, TEAL_BOT + 13*mm)

    # ---- PHYSIQUE CHAMPION バー ----
    c.setFillColor(colors.HexColor("#008F7A"))
    c.rect(0, H - 10*mm, W, 10*mm, fill=1, stroke=0)
    c.setFillColor(colors.HexColor("#006658"))
    c.rect(0, H - 10*mm, 8*mm, 10*mm, fill=1, stroke=0)
    c.rect(W - 8*mm, H - 10*mm, 8*mm, 10*mm, fill=1, stroke=0)
    c.setFillColor(C_BG_DARK)
    c.setFont(FONT_BOLD, 10)
    c.drawCentredString(W / 2, H - 6.5*mm, "-- PHYSIQUE  CHAMPION  SUPERVISED --")

    c.setFillColor(colors.HexColor("#006658"))
    c.setFont(FONT_REG, 7.5)
    c.drawCentredString(W / 2, H - 17*mm, "BODY MAKE  x  CONVENIENCE STORE")

    # ---- メインタイトル ----
    c.setFillColor(C_BG_DARK)
    c.setFont(FONT_BOLD, 34)
    c.drawString(15*mm, H - 40*mm, "フィジークチャンピオン厳選")
    c.setFont(FONT_BOLD, 34)
    c.drawString(15*mm, H - 60*mm, "おすすめコンビニ飯ガイド")

    c.setFillColor(C_ACCENT2)
    c.rect(15*mm, H - 63.5*mm, 105*mm, 2, fill=1, stroke=0)

    c.setFillColor(colors.HexColor("#1A3A3A"))
    c.setFont(FONT_REG, 8)
    c.drawString(15*mm, H - 70*mm, "P 15g以上  /  F 10g以下")

    # タグバッジ
    TAG_Y = H - 77*mm
    tags = ["焼き・蒸し系が最強", "そば・冷し中華で攻める", "全国販売品を軸に"]
    tag_w = (W - 30*mm - 8*mm) / 3
    tx = 15*mm
    for tag in tags:
        c.setFillColor(colors.HexColor("#008F7A"))
        p2 = c.beginPath()
        p2.roundRect(tx, TAG_Y - 7*mm, tag_w, 7*mm, 3)
        c.drawPath(p2, fill=1, stroke=0)
        c.setFillColor(C_BG_DARK)
        c.setFont(FONT_BOLD, 7.5)
        c.drawCentredString(tx + tag_w / 2, TAG_Y - 4.5*mm, tag)
        tx += tag_w + 4*mm

    # ---- コンビニボタン ----
    STORE_TOP = H - 122*mm
    stores = [("Seven-Eleven", C_SEVEN), ("LAWSON", C_LAWSON), ("FamilyMart", C_FAMILY)]
    margin = 12*mm
    gap = 4*mm
    sw = (W - margin * 2 - gap * 2) / 3
    sx = margin
    for name, sc in stores:
        draw_rounded_rect(c, sx, STORE_TOP - 8*mm, sw, 8*mm, 3, fill_color=sc)
        c.setFillColor(C_WHITE)
        c.setFont(FONT_BOLD, 8.5)
        c.drawCentredString(sx + sw / 2, STORE_TOP - 5.5*mm, name)
        sx += sw + gap

    # ---- 目次 ----
    TOC_TOP = STORE_TOP - 14*mm
    toc_items = [
        ("P.2", "コンビニ食の選び方",               "選び方の5つのポイントを解説"),
        ("P.3", "セブン-イレブン 冷凍焼鳥ピックアップ", "全国販売 3商品をフィーチャー"),
        ("P.4", "セブン-イレブン その他厳選商品",      "弁当・麺・サラダ厳選6商品"),
        ("P.5", "ローソン 厳選リスト ①",             "高たんぱく上位4商品"),
        ("P.6", "ローソン 厳選リスト ②",             "高たんぱく4商品"),
        ("P.7", "ファミリーマート 厳選リスト ①",      "高たんぱく上位5商品"),
        ("P.8", "ファミリーマート 厳選リスト ②",      "高たんぱく5商品"),
        ("P.9", "まとめ & 購入時の注意事項",          "戦略と注意事項"),
    ]
    c.setFillColor(colors.HexColor("#162535"))
    c.rect(0, TOC_TOP + 1, W, 6*mm, fill=1, stroke=0)
    c.setFillColor(C_ACCENT)
    c.setFont(FONT_BOLD, 7)
    c.drawString(15*mm, TOC_TOP + 3, "CONTENTS")
    c.setFillColor(colors.HexColor("#3A5570"))
    c.setFont(FONT_REG, 7)
    c.drawRightString(W - 15*mm, TOC_TOP + 3, "このガイドの構成")

    item_h = 9*mm
    for i, (pg, title, desc) in enumerate(toc_items):
        iy = TOC_TOP - 9*mm - i * item_h
        c.setFillColor(colors.HexColor("#1E3347"))
        c.rect(15*mm, iy + item_h - 1, W - 30*mm, 1, fill=1, stroke=0)
        c.setFillColor(C_ACCENT)
        c.setFont(FONT_BOLD, 8.5)
        c.drawString(15*mm, iy + 3, pg)
        c.setFillColor(colors.HexColor("#C8D8E0"))
        c.setFont(FONT_BOLD, 7.5)
        c.drawString(28*mm, iy + 3, title)
        c.setFillColor(colors.HexColor("#5A7A8A"))
        c.setFont(FONT_REG, 6.5)
        c.drawRightString(W - 15*mm, iy + 3, desc)

    toc_end_y = TOC_TOP - 8*mm - len(toc_items) * item_h

    # ---- 掲載商品数バー ----
    cnt_y = toc_end_y - 6*mm
    c.setFillColor(colors.HexColor("#162535"))
    c.rect(12*mm, cnt_y - 18*mm, W - 24*mm, 18*mm, fill=1, stroke=0)
    c.setFillColor(C_ACCENT)
    c.setFont(FONT_BOLD, 7)
    c.drawString(15*mm, cnt_y - 5, "掲載商品数")
    store_cnt = [("Seven-Eleven", "13商品", C_SEVEN), ("LAWSON", "8商品", C_LAWSON), ("FamilyMart", "10商品", C_FAMILY)]
    csw = (W - 30*mm - 8*mm) / 3
    csx = 15*mm
    for sn, sc_txt, sc in store_cnt:
        draw_rounded_rect(c, csx, cnt_y - 16*mm, csw, 10*mm, 3, fill_color=sc)
        c.setFillColor(C_WHITE)
        c.setFont(FONT_BOLD, 7)
        c.drawCentredString(csx + csw/2, cnt_y - 9*mm, sn)
        c.setFillColor(colors.HexColor("#CCFFEE"))
        c.setFont(FONT_BOLD, 9)
        c.drawCentredString(csx + csw/2, cnt_y - 14*mm, sc_txt)
        csx += csw + 4*mm

    # ---- 選び方ポイント小バナー ----
    tip_y = cnt_y - 22*mm
    remaining = tip_y - 14*mm
    if remaining > 20*mm:
        c.setFillColor(colors.HexColor("#0A1E30"))
        c.rect(12*mm, tip_y - 20*mm, W - 24*mm, 20*mm, fill=1, stroke=0)
        c.setFillColor(C_ACCENT2)
        c.setFont(FONT_BOLD, 7.5)
        c.drawString(15*mm, tip_y - 5, "このガイドの選定基準")
        tips = [
            ("P", "たんぱく質 15g以上", "筋肉維持・増量に必要な量を目安"),
            ("F", "脂質 10g以下",      "焼き・蒸し系を優先して低脂質化"),
        ]
        for ti, (badge, t_title, t_desc) in enumerate(tips):
            ty = tip_y - 9*mm - ti * 7.5*mm
            draw_rounded_rect(c, 15*mm, ty - 5*mm, 6*mm, 6*mm, 2, fill_color=C_ACCENT)
            c.setFillColor(C_BG_DARK)
            c.setFont(FONT_BOLD, 7)
            c.drawCentredString(18*mm, ty - 2.5*mm, badge)
            c.setFillColor(colors.HexColor("#C8D8E0"))
            c.setFont(FONT_BOLD, 7.5)
            c.drawString(23*mm, ty - 2.5*mm, t_title)
            c.setFillColor(colors.HexColor("#5A7A8A"))
            c.setFont(FONT_REG, 6.5)
            c.drawRightString(W - 15*mm, ty - 2.5*mm, t_desc)

    # フッター
    c.setFillColor(colors.HexColor("#0A141E"))
    c.rect(0, 0, W, 10*mm, fill=1, stroke=0)
    c.setFillColor(C_ACCENT)
    c.rect(0, 10*mm, W, 1, fill=1, stroke=0)
    c.restoreState()


# ================================================================
# PAGE 2: コンビニ食の選び方
# ================================================================
def page_howto(c):
    c.saveState()

    c.setFillColor(colors.HexColor("#F7FAFA"))
    c.rect(0, 0, W, H, fill=1, stroke=0)

    c.setFillColor(C_BG_DARK)
    c.rect(0, H - 22*mm, W, 22*mm, fill=1, stroke=0)
    c.setFillColor(C_ACCENT)
    c.rect(0, H - 23.5*mm, W, 1.5, fill=1, stroke=0)
    c.setFillColor(C_WHITE)
    c.setFont(FONT_BOLD, 18)
    c.drawString(15*mm, H - 15*mm, "コンビニ食の選び方")
    c.setFillColor(C_ACCENT)
    c.setFont(FONT_REG, 9)
    c.drawRightString(W - 15*mm, H - 15*mm, "HOW TO CHOOSE")

    y = H - 38*mm

    draw_rounded_rect(c, 12*mm, y - 22*mm, W - 24*mm, 28*mm, 6, fill_color=C_BG_DARK)
    c.setFillColor(C_ACCENT)
    c.setFont(FONT_BOLD, 13)
    c.drawCentredString(W/2, y - 4*mm, "コンビニでも、ダイエット・ボディメイクは十分に可能！")
    c.setFillColor(colors.HexColor("#B0C4CC"))
    c.setFont(FONT_REG, 8.5)
    c.drawCentredString(W/2, y - 13*mm, "選ぶ基準を持てば、コンビニは最強の食事調達ツールになります。")

    y -= 36*mm

    points = [
        ("01", C_ACCENT,  "たんぱく質 15g以上を目安に",
         "筋肉の維持・増量には1食あたりのたんぱく質量が重要。\n15g以上を目安に商品を選びましょう。"),
        ("02", C_ACCENT2, "脂質 10g以下に抑える",
         "揚げ物・マヨネーズ系は脂質が高くなりがち。\n焼き・蒸し・茹で系を優先することで脂質を抑えられます。"),
        ("03", C_ACCENT,  "焼き・蒸し系の調理法を選ぶ",
         "焼鳥・蒸し鶏・豚しゃぶなど、油を使わない調理法の\n商品はP上F下の条件を満たしやすい傾向があります。"),
        ("04", C_ACCENT2, "麺類はそば・冷し中華が狙い目",
         "ラーメンより、そばや冷し中華は脂質が低め。\nたんぱく質豊富な具材（チャーシュー・卵）も補給できます。"),
        ("05", C_ACCENT,  "必ず包装ラベルで最終確認",
         "Web情報と店頭表示が異なる場合があります。\n購入時は必ず包装裏面の栄養成分表示を確認しましょう。"),
    ]

    card_h = 26*mm
    margin = 12*mm
    card_w = W - margin * 2

    for i, (num, col, title, body) in enumerate(points):
        cy = y - i * (card_h + 3*mm)
        draw_rounded_rect(c, margin, cy - card_h, card_w, card_h, 5, fill_color=C_WHITE)
        c.setFillColor(col)
        c.rect(margin, cy - card_h, 5, card_h, fill=1, stroke=0)
        c.setFillColor(col)
        c.setFont(FONT_BOLD, 18)
        c.drawString(margin + 9*mm, cy - card_h/2 - 2, num)
        c.setFillColor(C_BG_DARK)
        c.setFont(FONT_BOLD, 10.5)
        c.drawString(margin + 22*mm, cy - card_h/2 + 5, title)
        c.setFillColor(C_GRAY)
        c.setFont(FONT_REG, 7.5)
        lines = body.split("\n")
        for j, line in enumerate(lines):
            c.drawString(margin + 22*mm, cy - card_h/2 - 4 - j*9, line)

    draw_page_number(c, 2)
    c.restoreState()


# ================================================================
# PAGE 3: セブン-イレブン 冷凍焼鳥ピックアップ（3商品 フルサイズカード）
# ================================================================
def page_seven_yakitori(c):
    c.saveState()

    c.setFillColor(colors.HexColor("#F0FAF5"))
    c.rect(0, 0, W, H, fill=1, stroke=0)

    draw_store_header(c,
        "セブン-イレブン  冷凍焼鳥ピックアップ",
        "全国販売確認済（公式データ）",
        C_SEVEN, accent_left=colors.HexColor("#FF0000"))

    y = H - 30*mm
    y = draw_section_banner(c, y, "★ セブンプレミアム 冷凍焼鳥シリーズ — 全国どこでも買える最強ボディメイク飯", C_BG_DARK)

    items = [
        ("7プレミアム\n焼鳥もも塩",    "冷凍食品", 20.1, 5.8, 1.9, 140, "全国", "seven_yakitori_shio.jpg"),
        ("7プレミアム\n焼鳥ももたれ",  "冷凍食品", 19.8, 5.7, 5.9, 154, "全国", "seven_yakitori_tare.jpg"),
        ("7プレミアム\n炭火焼鳥4種盛り","冷凍食品", 16.1, 8.3, 0.5, 141, "全国", "seven_yakitori_4set.jpg"),
    ]
    # 1列 大型カード（cols=1, card_h=62mm）
    y_end = draw_large_cards(c, y, items, C_SEVEN, cols=1, card_h=62*mm)

    # 下部コメント
    note_y = y_end - 5*mm
    c.setFillColor(colors.HexColor("#E0F5EC"))
    c.rect(12*mm, note_y - 14*mm, W - 24*mm, 14*mm, fill=1, stroke=0)
    c.setFillColor(C_SEVEN)
    c.setFont(FONT_BOLD, 8.5)
    c.drawString(15*mm, note_y - 5*mm, "[!] セブンの冷凍焼鳥をおすすめする理由")
    c.setFillColor(C_BG_DARK)
    c.setFont(FONT_REG, 7.5)
    c.drawString(15*mm, note_y - 10*mm, "電子レンジで温めるだけ。P15g以上・F10g以下を満たす手軽さと栄養バランスが魅力。")

    draw_page_number(c, 3)
    c.restoreState()


# ================================================================
# PAGE 4: セブン-イレブン その他厳選商品（6商品）
# ================================================================
def page_seven_rest(c):
    c.saveState()

    c.setFillColor(colors.HexColor("#F0FAF5"))
    c.rect(0, 0, W, H, fill=1, stroke=0)

    draw_store_header(c,
        "セブン-イレブン  厳選リスト",
        "弁当・麺・サラダ厳選6商品",
        C_SEVEN, accent_left=colors.HexColor("#FF0000"))

    y = H - 30*mm
    y = draw_section_banner(c, y, "★ 弁当・麺・惣菜・サラダ — 高たんぱく低脂質セレクション", C_BG_DARK)

    items = [
        ("鶏むね肉の大葉焼鳥\n梅だれ", "惣菜（焼鳥）",   30.5, 4.6,  2.6, 174, "埼玉・千葉・東京 他", "seven_ooba_umadare.jpg"),
        ("だしが自慢の豚肉そば",        "麺類（そば）",   23.6, 6.4, 55.0, 372, "山梨・長野",         "seven_buta_soba.jpg"),
        ("札幌ブラックラーメン",        "麺類（ラーメン）", 23.9, 9.9, 57.1, 413, "沖縄",              "seven_sapporo_black.jpg"),
        ("冷し中華（本州・九州版）",    "麺類",           19.3, 9.8, 81.9, 493, "東北・関東・近畿 他", "seven_hiyashi_chuuka.jpg"),
        ("豚しゃぶサラダ",             "サラダ",          18.2, 5.3,  2.6, 131, "北海道",             "seven_buta_shabu_salad.jpg"),
        ("和風だれ鶏つくね弁当",        "弁当",           16.7, 4.6, 60.2, 349, "北海道・東北・関東 他","seven_tsukune_bento.jpg"),
    ]
    y_end4 = draw_large_cards(c, y, items, C_SEVEN, card_h=66*mm)

    y_note = y_end4 - 4*mm
    c.setFillColor(C_GRAY)
    c.setFont(FONT_REG, 6.5)
    c.drawString(12*mm, y_note,
        "※ 販売地域は公式サイト表示に基づく。地域・時期により異なる場合があります。購入時は店頭ラベルを確認してください。")

    draw_page_number(c, 4)
    c.restoreState()


# ================================================================
# PAGE 5: ローソン 厳選リスト① （4商品）
# ================================================================
def page_lawson_1(c):
    c.saveState()

    c.setFillColor(colors.HexColor("#F0F5FF"))
    c.rect(0, 0, W, H, fill=1, stroke=0)

    draw_store_header(c,
        "ローソン  厳選リスト ①",
        "高たんぱく上位4商品",
        C_LAWSON)

    y = H - 30*mm
    y = draw_section_banner(c, y, "★ たんぱく質 TOP4  チルド惣菜ピックアップ", C_BG_DARK)

    items = [
        ("てっげうめぇ！\n炭火焼き 黒胡椒", "チルド惣菜", 22.1, 7.5,  1.5, 162, "全国", "lawson_tegue_black.png"),
        ("砂肝の\nガーリック焼き",           "チルド惣菜", 21.4, 4.9,  7.6, 160, "全国", "lawson_sunagimo.png"),
        ("グリルチキン",                    "チルド惣菜", 21.1, 7.7,  2.6, 164, "全国", "lawson_grill_chicken.png"),
        ("てっげうめぇ！\n炭火焼き 塩",       "チルド惣菜", 20.2, 9.2,  0.4, 165, "全国", "lawson_tegue_shio.png"),
    ]
    y_end = draw_large_cards(c, y, items, C_LAWSON)

    # ローソンのコツ
    note_y = y_end - 5*mm
    c.setFillColor(colors.HexColor("#E8F0FF"))
    c.rect(12*mm, note_y - 20*mm, W - 24*mm, 20*mm, fill=1, stroke=0)
    c.setFillColor(C_LAWSON)
    c.setFont(FONT_BOLD, 8.5)
    c.drawString(15*mm, note_y - 6*mm, "[!] ローソン チルド惣菜コーナーの選び方")
    tips = [
        "「てっげうめぇ！」シリーズはP20g超え安定。ローソン最強クラスの惣菜。",
        "砂肝のガーリック焼きはF4.9gと脂質が特に低く、ダイエット中に最適。",
    ]
    for ti, tip in enumerate(tips):
        c.setFillColor(C_BG_DARK)
        c.setFont(FONT_REG, 7.5)
        c.drawString(15*mm, note_y - 12*mm - ti * 8, f"• {tip}")

    draw_page_number(c, 5)
    c.restoreState()


# ================================================================
# PAGE 6: ローソン 厳選リスト② （4商品）
# ================================================================
def page_lawson_2(c):
    c.saveState()

    c.setFillColor(colors.HexColor("#F0F5FF"))
    c.rect(0, 0, W, H, fill=1, stroke=0)

    draw_store_header(c,
        "ローソン  厳選リスト ②",
        "高たんぱく4商品",
        C_LAWSON)

    y = H - 30*mm
    y = draw_section_banner(c, y, "★ 麺類・サンドイッチ・惣菜ピックアップ", C_BG_DARK)

    items = [
        ("よだれ鶏",                "チルド惣菜",   17.9, 4.6, 17.3, 182, "全国",    "lawson_yodare_tori.png"),
        ("ざるそば",                "麺類",         18.9, 3.0, 63.4, 356, "全国",    "lawson_zarusoba.png"),
        ("ROLLサンド\nチキンとたまご","サンドイッチ",  17.6, 9.7, 29.8, 277, "沖縄除く","lawson_roll_sand.png"),
        ("1食分の野菜\nちゃんぽん",  "麺類",         16.4, 8.2, 42.9, 311, "地域差あり","lawson_chanpon.png"),
    ]
    y_end = draw_large_cards(c, y, items, C_LAWSON)

    note_y = y_end - 5*mm
    c.setFillColor(colors.HexColor("#E8F0FF"))
    c.rect(12*mm, note_y - 20*mm, W - 24*mm, 20*mm, fill=1, stroke=0)
    c.setFillColor(C_LAWSON)
    c.setFont(FONT_BOLD, 8.5)
    c.drawString(15*mm, note_y - 6*mm, "[!] ローソン 麺・サンドの活用ポイント")
    tips = [
        "ざるそばはF3.0gで脂質極小。たんぱく源（惣菜）を組み合わせると完璧な一食に。",
        "よだれ鶏はF4.6gの低脂質でP17.9g。冷たいまま食べられるのも便利。",
    ]
    for ti, tip in enumerate(tips):
        c.setFillColor(C_BG_DARK)
        c.setFont(FONT_REG, 7.5)
        c.drawString(15*mm, note_y - 12*mm - ti * 8, f"• {tip}")

    c.setFillColor(C_GRAY)
    c.setFont(FONT_REG, 6.5)
    c.drawString(12*mm, note_y - 22*mm,
        "※ 販売地域は公式サイト表示に基づく。変更の可能性があるため、購入時は店頭ラベルを確認してください。")

    draw_page_number(c, 6)
    c.restoreState()


# ================================================================
# PAGE 7: ファミリーマート 厳選リスト① （5商品）
# ================================================================
def page_family_1(c):
    c.saveState()

    # ファミマカラー：ホワイト寄りのグリーン地
    c.setFillColor(colors.HexColor("#F0F8FF"))
    c.rect(0, 0, W, H, fill=1, stroke=0)

    draw_store_header(c,
        "ファミリーマート  厳選リスト ①",
        "高たんぱく上位5商品",
        C_FAMILY, h_stripes=[C_FAMILY_G, C_WHITE, C_FAMILY])

    y = H - 30*mm
    y = draw_section_banner(c, y, "★ たんぱく質 TOP5  サンドイッチ・サラダ・惣菜ピックアップ", C_FAMILY)

    items = [
        ("たんぱく質が摂れる\nチキンロール",  "サンドイッチ", 22.9, 9.8, 25.3, 281, "全国", "family_chicken_roll.jpg"),
        ("鶏むね肉とたまごの\nサラダ",        "サラダ",       21.6, 7.4,  2.0, 161, "全国", "family_tori_tamago_salad.jpg"),
        ("棒棒鶏風サラダ",                   "サラダ",       20.3, 9.5,  5.8, 190, "全国", "family_banbang_salad.jpg"),
        ("鶏そぼろあんかけ\n揚げ出し豆腐",   "チルド惣菜",   19.2, 8.5, 32.7, 284, "全国", "family_tofu.jpg"),
        ("ねぎたっぷり！\n豚肉そば",          "麺類",         18.3, 9.2, 52.5, 366, "全国", "family_buta_soba.jpg"),
    ]
    y_end7 = draw_large_cards(c, y, items, C_FAMILY_G, card_h=66*mm)  # グリーンをカードアクセントに

    c.setFillColor(C_GRAY)
    c.setFont(FONT_REG, 6.5)
    note_y = y_end7 - 4*mm
    c.drawString(12*mm, note_y,
        "※ 栄養成分は公式サイト・栄養成分データに基づく。購入時は必ず包装ラベルを確認してください。")

    draw_page_number(c, 7)
    c.restoreState()


# ================================================================
# PAGE 8: ファミリーマート 厳選リスト② （5商品）
# ================================================================
def page_family_2(c):
    c.saveState()

    c.setFillColor(colors.HexColor("#F0F8FF"))
    c.rect(0, 0, W, H, fill=1, stroke=0)

    draw_store_header(c,
        "ファミリーマート  厳選リスト ②",
        "高たんぱく5商品",
        C_FAMILY, h_stripes=[C_FAMILY_G, C_WHITE, C_FAMILY])

    y = H - 30*mm
    y = draw_section_banner(c, y, "★ そば・弁当・サラダ厳選ピックアップ", C_FAMILY)

    items = [
        ("バジルチキン",               "チルド惣菜", 17.5, 7.0,  7.0, 161, "全国", "family_basil_chicken.jpg"),
        ("石臼挽きそば粉\nざるそば",    "麺類",       17.1, 1.9, 65.1, 346, "全国", "family_zarusoba.jpg"),
        ("炙り焼鶏つくねごはん\n（軟骨入り）","弁当",  16.5, 7.2, 64.3, 388, "全国", "family_tsukune_gohan.jpg"),
        ("冷しとろろそば",             "麺類",       15.1, 2.2, 57.7, 311, "全国", "family_tororo_soba.jpg"),
        ("ローストチキンの\nパスタサラダ","サラダ",    15.6, 6.7, 31.3, 248, "全国", "family_pasta_salad.jpg"),
    ]
    y_end = draw_large_cards(c, y, items, C_FAMILY_G, card_h=62*mm)  # グリーンをカードアクセントに

    note_y = y_end - 4*mm
    c.setFillColor(colors.HexColor("#E0F5FF"))
    c.rect(12*mm, note_y - 16*mm, W - 24*mm, 16*mm, fill=1, stroke=0)
    c.setFillColor(C_FAMILY_G)
    c.setFont(FONT_BOLD, 8.5)
    c.drawString(15*mm, note_y - 5*mm, "[!] ファミリーマート 活用のポイント")
    c.setFillColor(C_BG_DARK)
    c.setFont(FONT_REG, 7.5)
    c.drawString(15*mm, note_y - 11.5*mm,
        "石臼挽きざるそば（F1.9g）＋バジルチキン（P17.5g）の組み合わせが最強コンビ。")

    c.setFillColor(C_GRAY)
    c.setFont(FONT_REG, 6.5)
    c.drawString(12*mm, note_y - 20*mm,
        "※ 栄養成分は公式サイト・栄養成分データに基づく。購入時は必ず包装ラベルを確認してください。")

    draw_page_number(c, 8)
    c.restoreState()


# ================================================================
# PAGE 9: まとめ & 注意事項
# ================================================================
def page_summary(c):
    c.saveState()

    draw_gradient_bg(c, 0, 0, W, H,
                     colors.HexColor("#0D1B2A"),
                     colors.HexColor("#112233"), steps=60)

    c.setFillColor(C_ACCENT)
    c.rect(0, H - 22*mm, W, 22*mm, fill=1, stroke=0)
    c.setFillColor(C_BG_DARK)
    c.setFont(FONT_BOLD, 18)
    c.drawString(15*mm, H - 15*mm, "まとめ  &  購入時の注意事項")

    y = H - 32*mm

    c.setFillColor(C_ACCENT)
    c.setFont(FONT_BOLD, 11)
    c.drawString(12*mm, y, ">> コンビニでP 15g以上・F 10g以下を達成するための戦略")
    y -= 8*mm

    strategies = [
        ("STEP 1", "主役は「焼き・蒸し系たんぱく源」を選ぶ",
         "焼鳥（塩/たれ）・蒸し鶏・豚しゃぶサラダが最優秀候補。\n揚げ物・マヨネーズ系は脂質オーバーになりやすいので注意。"),
        ("STEP 2", "主食は「そば」か「冷し中華」で攻める",
         "ざるそばは脂質2-3g台と優秀。冷し中華も脂質10g以内に収まる。\nこってりラーメン・チャーハンは脂質が高くなりがちなので避ける。"),
        ("STEP 3", "全国販売品を軸にして、地域品でプラスα",
         "セブンプレミアム冷凍焼鳥3品は全国で購入可能な安定の選択肢。\n地域限定品は在庫確認が必要なので補助的に活用する。"),
    ]

    sh = 28*mm
    for i, (step, title, body) in enumerate(strategies):
        sy = y - i * (sh + 4*mm)
        draw_rounded_rect(c, 12*mm, sy - sh, W - 24*mm, sh, 6, fill_color=C_CARD)
        draw_rounded_rect(c, 15*mm, sy - sh/2 - 7, 22*mm, 14, 3, fill_color=C_ACCENT)
        c.setFillColor(C_BG_DARK)
        c.setFont(FONT_BOLD, 7.5)
        c.drawCentredString(26*mm, sy - sh/2 - 1, step)
        c.setFillColor(C_WHITE)
        c.setFont(FONT_BOLD, 10)
        c.drawString(42*mm, sy - sh/2 + 5, title)
        c.setFillColor(colors.HexColor("#B0C4CC"))
        c.setFont(FONT_REG, 7)
        for li, ln in enumerate(body.split("\n")):
            c.drawString(42*mm, sy - sh/2 - 4 - li*8, ln)

    y -= 3 * (sh + 4*mm) + 8*mm

    # ---- コンビニ別 活用ポイント ----
    c.setFillColor(C_ACCENT)
    c.setFont(FONT_BOLD, 10)
    c.drawString(12*mm, y, ">> コンビニ別 活用ポイント")
    y -= 8*mm
    store_tips = [
        (C_SEVEN,  "Seven-Eleven", "冷凍焼鳥シリーズ（全国展開）がボディメイクの最強定番。そば・冷し中華も脂質が低く狙い目。"),
        (C_LAWSON, "LAWSON",       "チルド惣菜コーナーに超高たんぱく商品が集中。てっげうめぇ！・砂肝・グリルチキンをチェック。"),
        (C_FAMILY, "FamilyMart",   "チキンロールはP22.9gで最強クラス。ざるそばは脂質1.9gと驚異的な低さを誇る。"),
    ]
    tip_h = 12*mm
    for sc, sn, stip in store_tips:
        draw_rounded_rect(c, 12*mm, y - tip_h, W - 24*mm, tip_h, 4, fill_color=C_CARD)
        c.setFillColor(sc)
        c.rect(12*mm, y - tip_h, 4, tip_h, fill=1, stroke=0)
        c.setFillColor(C_WHITE)
        c.setFont(FONT_BOLD, 8)
        c.drawString(19*mm, y - tip_h/2 + 2.5, sn)
        c.setFillColor(colors.HexColor("#B0C4CC"))
        c.setFont(FONT_REG, 7)
        c.drawString(19*mm, y - tip_h/2 - 4.5, stip)
        y -= tip_h + 3*mm
    y -= 4*mm

    # 注意事項ボックス（48mm高、ページ番号＋フッターより上に収まる）
    draw_rounded_rect(c, 12*mm, y - 48*mm, W - 24*mm, 48*mm, 5,
                      fill_color=colors.HexColor("#2A1515"))
    c.setFillColor(colors.HexColor("#FF6B6B"))
    c.setFont(FONT_BOLD, 10)
    c.drawString(15*mm, y - 7*mm, "[!] 購入時の重要注意事項")
    notes = [
        "栄養成分はメーカー・仕様変更により、Webと店頭ラベルが異なる場合があります。",
        "最終的な判断は必ず「包装裏面の栄養成分表示」で行ってください。",
        "販売地域は公式サイト掲載時点の情報です。店舗によって取り扱いが異なります。",
        "季節・地域限定商品は入荷状況によって購入できない場合があります。",
        "組み合わせ次第でさらに効果的に。1食だけでなくトータルの食事管理を意識しましょう。",
    ]
    for ni, note in enumerate(notes):
        c.setFillColor(colors.HexColor("#FFCCCC"))
        c.setFont(FONT_REG, 7.5)
        c.drawString(15*mm, y - 16*mm - ni * 8, f"• {note}")

    # フッター（22mm高）＋ページ番号を内部上段に配置
    c.setFillColor(C_ACCENT)
    c.rect(0, 0, W, 22*mm, fill=1, stroke=0)
    c.setFillColor(C_BG_DARK)
    c.setFont(FONT_BOLD, 10)
    c.drawCentredString(W/2, 9*mm, "フィジークチャンピオン厳選  高たんぱく・低脂質 おすすめコンビニ飯ガイド")
    # ページ番号はフッター内の上段に（テキストと重ならない位置）
    c.setFillColor(colors.HexColor("#5ABFB5"))
    c.setFont(FONT_REG, 7)
    c.drawCentredString(W / 2, 16*mm, "9 / 9")
    c.restoreState()


# ================================================================
# メイン
# ================================================================
def main():
    c = canvas.Canvas(OUT, pagesize=A4)
    c.setTitle("フィジークチャンピオン厳選 おすすめコンビニ飯ガイド")
    c.setAuthor("Physique Champion")
    c.setSubject("高たんぱく・低脂質 コンビニ食品ガイド")

    page_cover(c);          c.showPage()
    page_howto(c);          c.showPage()
    page_seven_yakitori(c); c.showPage()
    page_seven_rest(c);     c.showPage()
    page_lawson_1(c);       c.showPage()
    page_lawson_2(c);       c.showPage()
    page_family_1(c);       c.showPage()
    page_family_2(c);       c.showPage()
    page_summary(c);        c.showPage()

    c.save()
    print(f"PDF saved: {OUT}")


if __name__ == "__main__":
    main()
