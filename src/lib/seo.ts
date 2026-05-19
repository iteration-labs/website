// Tiny SEO helper — no Helmet dep.
//
// React components call useSeo({...}) which injects <title> + <meta> tags +
// optional JSON-LD into document.head and cleans them up on unmount.
//
// Caveat: this is client-side. The initial HTML the SPA serves doesn't
// include these tags — they appear after React mounts. Modern Googlebot
// renders JS before parsing recipe rich-results, so this works for
// indexing, but with higher latency than true SSR. If recipe rich
// snippets become a priority, switch to vite-plugin-ssr or static
// pre-rendering of /recipes/* at build time.

import { useEffect } from "react";

const MANAGED_ATTR = "data-recipe-seo";

export type SeoInput = {
  title: string;
  description?: string;
  canonicalUrl?: string;
  ogImageUrl?: string;
  jsonLd?: unknown;            // schema.org Recipe / ItemList / etc.
};

function clearManaged(): void {
  document.head.querySelectorAll(`[${MANAGED_ATTR}]`).forEach((el) => el.remove());
}

function setManagedMeta(attrName: string, attrValue: string, content: string): void {
  const el = document.createElement("meta");
  el.setAttribute(attrName, attrValue);
  el.setAttribute("content", content);
  el.setAttribute(MANAGED_ATTR, "");
  document.head.appendChild(el);
}

function setManagedLink(rel: string, href: string): void {
  const el = document.createElement("link");
  el.setAttribute("rel", rel);
  el.setAttribute("href", href);
  el.setAttribute(MANAGED_ATTR, "");
  document.head.appendChild(el);
}

function setManagedJsonLd(payload: unknown): void {
  const el = document.createElement("script");
  el.setAttribute("type", "application/ld+json");
  el.setAttribute(MANAGED_ATTR, "");
  el.textContent = JSON.stringify(payload);
  document.head.appendChild(el);
}

export function useSeo(input: SeoInput): void {
  useEffect(() => {
    const previousTitle = document.title;
    document.title = input.title;
    clearManaged();

    if (input.description) {
      setManagedMeta("name", "description", input.description);
      setManagedMeta("property", "og:description", input.description);
      setManagedMeta("name", "twitter:description", input.description);
    }
    setManagedMeta("property", "og:title", input.title);
    setManagedMeta("property", "og:type", "article");
    setManagedMeta("name", "twitter:card", "summary_large_image");
    setManagedMeta("name", "twitter:title", input.title);

    if (input.canonicalUrl) {
      setManagedLink("canonical", input.canonicalUrl);
      setManagedMeta("property", "og:url", input.canonicalUrl);
    }
    if (input.ogImageUrl) {
      setManagedMeta("property", "og:image", input.ogImageUrl);
      setManagedMeta("name", "twitter:image", input.ogImageUrl);
    }
    if (input.jsonLd !== undefined) {
      setManagedJsonLd(input.jsonLd);
    }

    return () => {
      document.title = previousTitle;
      clearManaged();
    };
  }, [input.title, input.description, input.canonicalUrl, input.ogImageUrl, JSON.stringify(input.jsonLd)]);
}

// ── ISO duration helper ────────────────────────────────────────────────────
// schema.org Duration uses ISO-8601: 45 minutes → "PT45M".
export function isoDuration(minutes: number): string {
  if (!Number.isFinite(minutes) || minutes <= 0) return "PT0M";
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  if (h === 0) return `PT${m}M`;
  if (m === 0) return `PT${h}H`;
  return `PT${h}H${m}M`;
}

// Map our DietClassification to a schema.org suitableForDiet URI.
const DIET_SCHEMA: Record<string, string> = {
  vegan:       "https://schema.org/VeganDiet",
  veg:         "https://schema.org/VegetarianDiet",
  eggetarian:  "https://schema.org/VegetarianDiet",
  pescatarian: "https://schema.org/PescatarianDiet",
};

export function suitableForDietUri(d: string): string | undefined {
  return DIET_SCHEMA[d];
}
