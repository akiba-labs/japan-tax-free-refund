import type { Metadata } from "next";
import Link from "next/link";
import { NOTICE, NOTICE_RULES_AS_OF, noticeHtml } from "@/lib/shop-notice";
import { SOURCES } from "@/lib/refund";

export const metadata: Metadata = {
  title: "Free tax-free refund-method notice for Japan shops (EN/JP/ZH, copy-paste HTML)",
  description:
    "Free copy-paste notice for tax-free shops in Japan: explains the refund method that starts 2026-11-01 to tourists in English, Japanese, and Chinese. Works in Shopify and WordPress custom HTML blocks.",
  alternates: { canonical: "/for-shops" },
};

const html = noticeHtml();

export default function ForShops() {
  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-8 sm:py-10">
      <p className="font-mono text-[11px] tracking-[0.28em] text-amber uppercase">For tax-free shops</p>
      <h1 className="mt-3 font-display text-4xl leading-[1.05] tracking-tight sm:text-5xl">
        Free tourist notice for Japan&apos;s new tax-free refund method
      </h1>
      <p className="mt-4 text-lg text-foreground">
        Yes, this is a free copy-paste notice for shops in Japan. From 2026-11-01 visitors pay the tax-inclusive price and get
        the consumption tax back after customs confirms on departure. Paste this block on your product, checkout, or FAQ page
        so tourists know before they buy. English, Japanese, and Simplified Chinese.
      </p>

      <h2 className="mt-8 text-base font-semibold text-foreground">Preview</h2>
      <div className="mt-2 space-y-4 rounded border border-line p-4 text-sm leading-relaxed">
        {(["en", "ja", "zh"] as const).map((l) => (
          <div key={l} lang={l === "zh" ? "zh-Hans" : l}>
            <p className="font-semibold text-foreground">{NOTICE[l][0]}</p>
            {NOTICE[l].slice(1).map((x) => (
              <p key={x} className="mt-1 text-muted">{x}</p>
            ))}
          </div>
        ))}
      </div>

      <h2 className="mt-8 text-base font-semibold text-foreground">Copy-paste HTML</h2>
      <p className="mt-1 text-sm text-muted">
        Shopify: Online Store theme editor, add a &quot;Custom liquid&quot; section and paste. WordPress: add a &quot;Custom HTML&quot; block
        and paste. Delete any language you don&apos;t need.
      </p>
      <pre className="mt-2 max-h-96 overflow-auto rounded border border-line p-3 text-xs whitespace-pre-wrap">{html}</pre>

      <h2 className="mt-8 text-base font-semibold text-foreground">Would you install this as an app?</h2>
      <p className="mt-1 text-sm text-muted">
        One tap, no sign-up, nothing stored about you. If enough shops tap, we&apos;ll build a free app that keeps the notice updated
        when the rules change.
      </p>
      <div className="mt-3 flex flex-wrap gap-3 text-sm">
        <Link prefetch={false} className="rounded border border-line px-3 py-2 hover:text-foreground" href="/for-shops/yes/shopify">Yes, as a Shopify app</Link>
        <Link prefetch={false} className="rounded border border-line px-3 py-2 hover:text-foreground" href="/for-shops/yes/wordpress">Yes, as a WordPress plugin</Link>
      </div>

      <section className="mt-10 text-sm leading-relaxed text-muted">
        <h2 className="text-base font-semibold text-foreground">Rules and sources</h2>
        <p className="mt-2">
          Rules as of {NOTICE_RULES_AS_OF}, the same table the <Link href="/">checker</Link> and <a href="/api/rules">/api/rules</a> use.
          Educational notice, not tax advice; the shop, its refund operator, and Japan Customs decide. Check official guidance:
        </p>
        <ul className="mt-2 list-disc space-y-1 pl-5">
          {SOURCES.map((s) => (
            <li key={s}><a href={s} className="break-all hover:text-foreground">{s}</a></li>
          ))}
        </ul>
      </section>
    </div>
  );
}
