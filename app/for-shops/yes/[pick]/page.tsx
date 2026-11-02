import type { Metadata } from "next";
import { notFound } from "next/navigation";

export const metadata: Metadata = { title: "Thanks: tap counted", robots: { index: false, follow: false } };

const NAMES: Record<string, string> = { shopify: "a Shopify app", wordpress: "a WordPress plugin" };

export function generateStaticParams() {
  return Object.keys(NAMES).map((pick) => ({ pick }));
}
export const dynamicParams = false;

export default async function Yes({ params }: { params: Promise<{ pick: string }> }) {
  const { pick } = await params;
  const name = NAMES[pick];
  if (!name) notFound();
  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-8 sm:py-10">
      <p className="font-mono text-[11px] tracking-[0.28em] text-amber uppercase">Tap counted</p>
      <h1 className="mt-3 font-display text-4xl tracking-tight">Thanks</h1>
      <p className="mt-4 text-lg text-foreground">
        Your tap for {name} is counted. Nothing is for sale and we didn&apos;t store anything about you. The free copy-paste
        notice stays available either way.
      </p>
      <p className="mt-4 text-sm"><a href="/for-shops" className="underline">Back to the shop notice</a></p>
    </div>
  );
}
