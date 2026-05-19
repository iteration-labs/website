// Recipes list — /recipes?cuisine=&dietTag=.
//
// Lower-priority page than RecipeDetail per the brief; light filtering,
// alphabetical order (matches the API's default sort).

import { useEffect, useMemo, useState } from "react";
import { Header } from "../components/Header";
import { useSeo } from "../lib/seo";
import { fetchRecipesList, type SlimRecipe } from "../lib/recipesApi";

function readQueryFilters(): { cuisine: string; dietTag: string } {
  if (typeof window === "undefined") return { cuisine: "", dietTag: "" };
  const q = new URLSearchParams(window.location.search);
  return {
    cuisine: (q.get("cuisine") ?? "").toLowerCase(),
    dietTag: (q.get("dietTag") ?? "").toLowerCase(),
  };
}

export function RecipesList() {
  const initial = readQueryFilters();
  const [recipes, setRecipes] = useState<SlimRecipe[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const ac = new AbortController();
    setRecipes(null);
    setError(null);
    fetchRecipesList(initial, ac.signal)
      .then((res) => setRecipes(res.recipes))
      .catch((err) => {
        if ((err as { name?: string }).name === "AbortError") return;
        // eslint-disable-next-line no-console
        console.error("recipes list fetch failed", err);
        setError("Couldn't load recipes. Try refreshing.");
      });
    return () => ac.abort();
    // initial is read once at mount; filter changes happen via full page nav
    // (anchor href), so we don't depend on it here.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const canonicalUrl = typeof window !== "undefined" ? `${window.location.origin}/recipes` : "";

  // ItemList JSON-LD: schema.org carousel of the visible recipes. Helps
  // Google understand the list page; individual rich snippets come from
  // each detail page's Recipe JSON-LD.
  const jsonLd = useMemo(() => {
    if (!recipes) return undefined;
    return {
      "@context": "https://schema.org/",
      "@type": "ItemList",
      itemListElement: recipes.map((r, i) => ({
        "@type": "ListItem",
        position: i + 1,
        url: `${canonicalUrl.replace(/\/recipes$/, "")}/recipes/${r.slug}`,
        name: r.title,
      })),
    };
  }, [recipes, canonicalUrl]);

  useSeo({
    title: "Recipes — HomeOps",
    description: "Household-friendly dinner recipes powering HomeOps meal plans.",
    canonicalUrl: canonicalUrl || undefined,
    jsonLd,
  });

  return (
    <div className="paper-noise relative min-h-screen overflow-hidden bg-paper">
      <Header />
      <main className="container-shell relative z-10 mx-auto max-w-4xl px-4 py-12 sm:py-16">
        <header className="border-b border-line pb-8">
          <div className="text-xs font-semibold uppercase tracking-widest text-ash">
            HomeOps · recipes
          </div>
          <h1 className="mt-3 font-serif text-4xl text-ink sm:text-5xl">
            All recipes
          </h1>
          <p className="mt-3 text-sm text-ash">
            Cooked from household to household. {recipes ? `${recipes.length} on the table.` : ""}
          </p>
          <ActiveFilters cuisine={initial.cuisine} dietTag={initial.dietTag} />
        </header>

        <section className="mt-8">
          {error && <p className="text-rust">{error}</p>}
          {!recipes && !error && <ListSkeleton />}
          {recipes && recipes.length === 0 && (
            <p className="text-ash">
              No recipes match those filters yet.{" "}
              <a href="/recipes" className="text-rust underline">Clear filters</a>.
            </p>
          )}
          {recipes && recipes.length > 0 && (
            <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {recipes.map((r) => (
                <li key={r.recipeId}>
                  <RecipeCard recipe={r} />
                </li>
              ))}
            </ul>
          )}
        </section>
      </main>
    </div>
  );
}

function ActiveFilters({ cuisine, dietTag }: { cuisine: string; dietTag: string }) {
  if (!cuisine && !dietTag) return null;
  return (
    <div className="mt-4 flex flex-wrap items-center gap-2 text-xs">
      <span className="font-semibold uppercase tracking-widest text-ash">Filters</span>
      {cuisine && (
        <span className="rounded-md bg-fog-100 px-2 py-1 text-ink">cuisine: {cuisine}</span>
      )}
      {dietTag && (
        <span className="rounded-md bg-fog-100 px-2 py-1 text-ink">diet: {dietTag}</span>
      )}
      <a href="/recipes" className="ml-2 text-rust underline">Clear</a>
    </div>
  );
}

function ListSkeleton() {
  return (
    <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      {[0, 1, 2, 3].map((i) => (
        <li
          key={i}
          className="h-32 animate-pulse rounded-lg border border-line bg-fog-100"
        />
      ))}
    </ul>
  );
}

function RecipeCard({ recipe }: { recipe: SlimRecipe }) {
  return (
    <a
      href={`/recipes/${recipe.slug}`}
      className="block rounded-lg border border-line bg-white p-4 transition hover:border-rust hover:shadow-card"
    >
      <div className="text-xs font-semibold uppercase tracking-widest text-ash">
        {recipe.cuisine} · {recipe.dishType}
      </div>
      <h3 className="mt-2 font-serif text-xl text-ink">{recipe.title}</h3>
      <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-xs text-ash">
        <span>{recipe.totalTimeMinutes} min</span>
        <span>effort: {recipe.effort}</span>
        <span>spice: {recipe.spiceLevel}</span>
      </div>
      {recipe.healthTags && recipe.healthTags.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-1">
          {recipe.healthTags.map((tag) => (
            <span
              key={tag}
              className="inline-block rounded bg-fog-50 px-2 py-0.5 text-[10px] uppercase tracking-wide text-ink"
            >
              {tag.replace(/_/g, " ")}
            </span>
          ))}
        </div>
      )}
    </a>
  );
}
