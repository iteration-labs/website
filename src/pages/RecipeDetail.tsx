// Recipe detail page — /recipes/<slug>?servings=N.
//
// Server-side equivalent lives in github.com/iteration-labs/family-ops
// (GET /api/recipes/{slug}). This is a client-rendered SPA page;
// JSON-LD + meta tags are injected client-side via useSeo. Modern
// Googlebot renders JS before indexing recipe rich results, with
// higher indexing latency than SSR. See src/lib/seo.ts for the
// tradeoff note.

import { useEffect, useMemo, useState } from "react";
import { Header } from "../components/Header";
import { isoDuration, suitableForDietUri, useSeo } from "../lib/seo";
import {
  fetchRecipeBySlug,
  type IngredientCategory,
  type Recipe,
  type RecipeIngredient,
  type RecipePrepStep,
} from "../lib/recipesApi";

type Props = {
  slug: string;
};

const CATEGORY_ORDER: { key: IngredientCategory; label: string }[] = [
  { key: "produce", label: "Produce" },
  { key: "protein", label: "Protein" },
  { key: "dairy",   label: "Dairy" },
  { key: "pantry",  label: "Pantry" },
  { key: "spice",   label: "Spices" },
  { key: "other",   label: "Other" },
];

const PREP_LABEL: Record<RecipePrepStep["type"], string> = {
  thaw:     "Thaw",
  marinate: "Marinate",
  soak:     "Soak",
  ferment:  "Ferment",
  rest:     "Rest",
};

function parseServingsFromQuery(): number | undefined {
  if (typeof window === "undefined") return undefined;
  const v = new URLSearchParams(window.location.search).get("servings");
  if (!v) return undefined;
  const n = parseInt(v, 10);
  return Number.isFinite(n) && n > 0 && n <= 50 ? n : undefined;
}

// Display-side rounding: keep one decimal at most so the rendered list
// reads as "1.3 tsp" rather than "1.3333333 tsp". Whole numbers stay whole.
function fmtQuantity(q: number): string {
  if (!Number.isFinite(q)) return String(q);
  const rounded = Math.round(q * 10) / 10;
  return Number.isInteger(rounded) ? String(rounded) : rounded.toFixed(1);
}

function groupIngredientsByCategory(items: RecipeIngredient[], scale: number) {
  const buckets = new Map<IngredientCategory, RecipeIngredient[]>();
  for (const it of items) {
    const scaled: RecipeIngredient = { ...it, quantity: it.quantity * scale };
    const bucket = buckets.get(it.category) ?? [];
    bucket.push(scaled);
    buckets.set(it.category, bucket);
  }
  return CATEGORY_ORDER
    .map((cat) => ({ label: cat.label, items: buckets.get(cat.key) ?? [] }))
    .filter((g) => g.items.length > 0);
}

function buildJsonLd(recipe: Recipe, canonicalUrl: string, targetServings: number): unknown {
  const scale = targetServings / recipe.servingsBase;
  const dietUri = suitableForDietUri(recipe.dietClassification);
  return {
    "@context": "https://schema.org/",
    "@type": "Recipe",
    name: recipe.title,
    url: canonicalUrl,
    recipeCuisine: recipe.cuisine,
    recipeCategory: recipe.dishType,
    cookTime: isoDuration(recipe.activeTimeMinutes),
    prepTime: isoDuration(Math.max(0, recipe.totalTimeMinutes - recipe.activeTimeMinutes)),
    totalTime: isoDuration(recipe.totalTimeMinutes),
    recipeYield: `${targetServings} serving${targetServings === 1 ? "" : "s"}`,
    recipeIngredient: recipe.ingredients
      .filter((i) => !i.optional)
      .map((i) => `${fmtQuantity(i.quantity * scale)} ${i.unit} ${i.item}`),
    recipeInstructions: recipe.instructions.map((s) => ({
      "@type": "HowToStep",
      position: s.stepNumber,
      text: s.text,
    })),
    keywords: [...recipe.tags, ...(recipe.healthTags ?? [])].join(", "),
    ...(dietUri ? { suitableForDiet: dietUri } : {}),
    ...(recipe.nutritionPerServing
      ? {
          nutrition: {
            "@type": "NutritionInformation",
            calories: `${recipe.nutritionPerServing.calories} kcal`,
            proteinContent: `${recipe.nutritionPerServing.protein} g`,
            carbohydrateContent: `${recipe.nutritionPerServing.carbs} g`,
            fatContent: `${recipe.nutritionPerServing.fat} g`,
            ...(recipe.nutritionPerServing.fiber !== undefined
              ? { fiberContent: `${recipe.nutritionPerServing.fiber} g` } : {}),
            ...(recipe.nutritionPerServing.sodium !== undefined
              ? { sodiumContent: `${recipe.nutritionPerServing.sodium} mg` } : {}),
          },
        }
      : {}),
  };
}

export function RecipeDetail({ slug }: Props) {
  const [recipe, setRecipe] = useState<Recipe | null | "not-found" | "loading" | "error">("loading");
  const targetServingsRaw = parseServingsFromQuery();

  useEffect(() => {
    const ac = new AbortController();
    setRecipe("loading");
    fetchRecipeBySlug(slug, ac.signal)
      .then((r) => setRecipe(r ?? "not-found"))
      .catch((err) => {
        if ((err as { name?: string }).name === "AbortError") return;
        // eslint-disable-next-line no-console
        console.error("recipe fetch failed", err);
        setRecipe("error");
      });
    return () => ac.abort();
  }, [slug]);

  const targetServings = useMemo(() => {
    if (typeof recipe !== "object" || recipe === null) return targetServingsRaw ?? 4;
    return targetServingsRaw ?? recipe.servingsBase;
  }, [recipe, targetServingsRaw]);

  const scale = useMemo(() => {
    if (typeof recipe !== "object" || recipe === null) return 1;
    return targetServings / recipe.servingsBase;
  }, [recipe, targetServings]);

  const canonicalUrl = typeof window !== "undefined" ? `${window.location.origin}/recipes/${slug}` : "";

  const safeRecipe = typeof recipe === "object" && recipe !== null ? recipe : null;
  useSeo({
    title: safeRecipe ? `${safeRecipe.title} — HomeOps recipes` : "Recipe — HomeOps",
    description: safeRecipe ? `${safeRecipe.cuisine} ${safeRecipe.dishType}. Total time ${safeRecipe.totalTimeMinutes} min.` : undefined,
    canonicalUrl: canonicalUrl || undefined,
    jsonLd: safeRecipe ? buildJsonLd(safeRecipe, canonicalUrl, targetServings) : undefined,
  });

  return (
    <div className="paper-noise relative min-h-screen overflow-hidden bg-paper">
      <Header />
      <main className="container-shell relative z-10 mx-auto max-w-3xl px-4 py-12 sm:py-16">
        {recipe === "loading" && <LoadingSkeleton />}
        {recipe === "not-found" && <NotFound slug={slug} />}
        {recipe === "error" && <FetchError />}
        {safeRecipe && (
          <RecipeBody
            recipe={safeRecipe}
            scale={scale}
            targetServings={targetServings}
          />
        )}
      </main>
    </div>
  );
}

// ── Subcomponents ──────────────────────────────────────────────────────────

function LoadingSkeleton() {
  return (
    <div className="animate-pulse space-y-6">
      <div className="h-9 w-2/3 rounded bg-fog-100" />
      <div className="h-4 w-1/2 rounded bg-fog-100" />
      <div className="h-64 w-full rounded bg-fog-100" />
    </div>
  );
}

function NotFound({ slug }: { slug: string }) {
  return (
    <div className="text-center">
      <h1 className="font-serif text-3xl text-ink">Recipe not found</h1>
      <p className="mt-3 text-ash">
        We couldn&rsquo;t find a recipe at <code>/recipes/{slug}</code>.
      </p>
      <a href="/recipes" className="mt-6 inline-block text-rust underline">
        Browse all recipes
      </a>
    </div>
  );
}

function FetchError() {
  return (
    <div className="text-center">
      <h1 className="font-serif text-3xl text-ink">Something went wrong</h1>
      <p className="mt-3 text-ash">Try refreshing the page in a moment.</p>
    </div>
  );
}

function RecipeBody({
  recipe,
  scale,
  targetServings,
}: {
  recipe: Recipe;
  scale: number;
  targetServings: number;
}) {
  const ingredientGroups = groupIngredientsByCategory(recipe.ingredients, scale);

  return (
    <article className="space-y-10">
      <header className="border-b border-line pb-8">
        <div className="text-xs font-semibold uppercase tracking-widest text-ash">
          {recipe.cuisine} · {recipe.dishType}
        </div>
        <h1 className="mt-3 font-serif text-4xl text-ink sm:text-5xl">{recipe.title}</h1>
        <dl className="mt-6 flex flex-wrap gap-x-8 gap-y-2 text-sm text-ash">
          <div>
            <dt className="inline font-semibold text-ink">Total</dt>
            <dd className="ml-1 inline">{recipe.totalTimeMinutes} min</dd>
          </div>
          <div>
            <dt className="inline font-semibold text-ink">Active</dt>
            <dd className="ml-1 inline">{recipe.activeTimeMinutes} min</dd>
          </div>
          <div>
            <dt className="inline font-semibold text-ink">Serves</dt>
            <dd className="ml-1 inline">{targetServings}</dd>
          </div>
          {recipe.servingsBase !== targetServings && (
            <div className="text-xs italic text-ash">
              (Scaled from {recipe.servingsBase}; pass <code>?servings=N</code> to change.)
            </div>
          )}
        </dl>
        {recipe.healthTags && recipe.healthTags.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {recipe.healthTags.map((tag) => (
              <span
                key={tag}
                className="inline-block rounded-md bg-fog-100 px-2 py-1 text-xs font-medium text-ink"
              >
                {tag.replace(/_/g, " ")}
              </span>
            ))}
          </div>
        )}
      </header>

      <section>
        <h2 className="font-serif text-2xl text-ink">Ingredients</h2>
        <div className="mt-4 space-y-6">
          {ingredientGroups.map((group) => (
            <div key={group.label}>
              <h3 className="text-xs font-semibold uppercase tracking-widest text-ash">
                {group.label}
              </h3>
              <ul className="mt-2 space-y-1 text-sm text-ink">
                {group.items.map((i) => (
                  <li key={`${i.item}-${i.unit}`} className="flex">
                    <span className="font-medium text-ink">
                      {fmtQuantity(i.quantity)} {i.unit}
                    </span>
                    <span className="ml-2 text-ash">
                      {i.item}
                      {i.notes ? <span className="italic"> — {i.notes}</span> : null}
                      {i.optional ? <span className="italic"> (optional)</span> : null}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {recipe.prepSteps.length > 0 && (
        <section>
          <h2 className="font-serif text-2xl text-ink">Prep ahead</h2>
          <ul className="mt-4 space-y-3 text-sm text-ink">
            {recipe.prepSteps.map((step, i) => (
              <li key={i} className="flex gap-4">
                <div className="min-w-[5.5rem] text-xs font-semibold uppercase tracking-widest text-rust">
                  {PREP_LABEL[step.type]}
                  <div className="text-ash">−{step.leadTimeMinutes} min</div>
                </div>
                <p className="text-ink">{step.instruction}</p>
              </li>
            ))}
          </ul>
        </section>
      )}

      <section>
        <h2 className="font-serif text-2xl text-ink">Method</h2>
        <ol className="mt-4 space-y-4 text-sm text-ink">
          {recipe.instructions.map((s) => (
            <li key={s.stepNumber} className="flex gap-4">
              <div className="min-w-[2rem] font-serif text-xl text-rust">{s.stepNumber}.</div>
              <div>
                <p className="text-ink">{s.text}</p>
                {s.durationMinutes !== undefined && (
                  <p className="mt-1 text-xs text-ash">{s.durationMinutes} min</p>
                )}
              </div>
            </li>
          ))}
        </ol>
      </section>

      {recipe.equipment.length > 0 && (
        <section>
          <h2 className="font-serif text-2xl text-ink">Equipment</h2>
          <ul className="mt-3 flex flex-wrap gap-2 text-sm text-ash">
            {recipe.equipment.map((e) => (
              <li key={e} className="rounded-md bg-fog-100 px-3 py-1 text-ink">{e}</li>
            ))}
          </ul>
        </section>
      )}

      {recipe.leftoverNotes && (
        <section>
          <h2 className="font-serif text-2xl text-ink">Leftover notes</h2>
          <p className="mt-3 text-sm text-ash">{recipe.leftoverNotes}</p>
        </section>
      )}

      <footer className="border-t border-line pt-6 text-xs text-ash">
        Source: {recipe.sourceUrl ? (
          <a href={recipe.sourceUrl} className="text-rust underline">{recipe.source}</a>
        ) : (
          recipe.source
        )}
      </footer>
    </article>
  );
}
