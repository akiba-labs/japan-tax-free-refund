import { DEADLINE_DAYS, MIN_TAX_EXCLUSIVE_JPY, REFUND_METHOD_START, RULES_AS_OF } from "@/lib/refund";

const yen = (n: number) => `¥${n.toLocaleString("en-US")}`;

/** Customer-facing notice text built from the same rule constants the checker and /api/rules use. */
export const NOTICE = {
  en: [
    "Tax-free shopping has changed",
    `From ${REFUND_METHOD_START}, tax-free purchases use Japan's refund method.`,
    "You pay the price including consumption tax today. The tax is refunded after Japan Customs confirms your goods when you leave Japan.",
    `Minimum: ${yen(MIN_TAX_EXCLUSIVE_JPY)} before tax, same store, same day. Bring the passport you show us.`,
    `At your final departure airport or seaport, use the tax-free kiosk BEFORE checking bags, within ${DEADLINE_DAYS} days of purchase. Keep every item unused.`,
    "Please ask our staff how your refund is paid and whether a handling fee applies.",
  ],
  ja: [
    "免税販売の方法が変わりました",
    `${REFUND_METHOD_START}以降の免税購入は「リファンド方式」です。`,
    "お会計時は消費税込みの価格でお支払いいただき、出国時に税関の確認を受けた後に消費税が返金されます。",
    `対象：同一店舗・同一日で税抜${yen(MIN_TAX_EXCLUSIVE_JPY)}以上。購入時にパスポートをご提示ください。`,
    `最終出国の空港・港で、手荷物を預ける前に免税手続き（キオスク等）を行ってください。購入日から${DEADLINE_DAYS}日以内、商品は未使用のままお持ちください。`,
    "返金方法・手数料については店舗スタッフにお尋ねください。",
  ],
  zh: [
    "免税购物方式已变更",
    `自${REFUND_METHOD_START}起，免税购物改为"退税方式"。`,
    "购买时请支付含消费税的价格，离开日本时经海关确认后退还消费税。",
    `条件：同一店铺、同一天，税前满${yen(MIN_TAX_EXCLUSIVE_JPY)}。购买时请出示护照。`,
    `请在最终离境的机场或港口，于托运行李之前办理免税手续（自助机等），须在购买后${DEADLINE_DAYS}天内，商品保持未使用。`,
    "退税方式及手续费请咨询店员。",
  ],
} as const;

export const NOTICE_RULES_AS_OF = RULES_AS_OF;

const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

/** Plain HTML block (works in Shopify Liquid "Custom liquid"/"Custom HTML" sections and WordPress Custom HTML blocks). */
export function noticeHtml(langs: (keyof typeof NOTICE)[] = ["en", "ja", "zh"]): string {
  const parts = langs.map((l) => {
    const [title, ...lines] = NOTICE[l];
    return `  <div lang="${l === "zh" ? "zh-Hans" : l}" style="margin:0 0 12px">\n    <strong>${esc(title)}</strong>\n${lines
      .map((x) => `    <p style="margin:4px 0">${esc(x)}</p>`)
      .join("\n")}\n  </div>`;
  });
  return `<!-- Japan tax-free refund-method notice (rules as of ${RULES_AS_OF}). Source: https://japan-tax-free-refund.vercel.app/for-shops -->\n<div class="jp-taxfree-notice" style="border:1px solid #ccc;padding:12px;font-size:14px;line-height:1.5">\n${parts.join(
    "\n",
  )}\n  <p style="margin:4px 0;font-size:12px;color:#666">Educational notice, not tax advice. The shop, its refund operator, and Japan Customs decide eligibility.</p>\n</div>`;
}
