import type { MetadataRoute } from "next";
import { isGithubPages, pagesSiteUrl } from "@/lib/hosting";
import { EXAMPLE_SHARED, resultPath } from "@/lib/share";

export const dynamic = "force-static";

const VERCEL_URL = "https://japan-tax-free-refund.vercel.app";
const SITE_URL = isGithubPages ? pagesSiteUrl(VERCEL_URL) : VERCEL_URL;

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  if (isGithubPages) {
    return [
      { url: `${SITE_URL}/`, lastModified: now, changeFrequency: "weekly", priority: 1 },
      { url: `${SITE_URL}/for-shops/`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
      { url: `${SITE_URL}/legal/disclaimer/`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    ];
  }
  return [
    { url: `${SITE_URL}`, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE_URL}${resultPath(EXAMPLE_SHARED).replace(/&/g, "&amp;")}`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE_URL}/for-shops`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/legal/disclaimer`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
  ];
}
