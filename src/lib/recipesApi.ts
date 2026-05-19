// Read-only client for the HomeOps recipes API.
//
// Source endpoint lives in github.com/iteration-labs/family-ops at
// src/handlers/recipes-api.ts. CORS is open server-side, so this is just
// fetch + parse + narrow.
//
// Configure the base via Vite env var VITE_RECIPES_API_BASE
// (e.g. `https://abcd.execute-api.ap-southeast-1.amazonaws.com`).

const RAW_BASE = (import.meta.env.VITE_RECIPES_API_BASE as string | undefined) ?? "";

function apiBase(): string {
  if (!RAW_BASE) {
    throw new Error(
      "VITE_RECIPES_API_BASE is not configured. Set it in .env (e.g. https://<id>.execute-api.<region>.amazonaws.com).",
    );
  }
  return RAW_BASE.replace(/\/$/, "");
}

// ── Types — local mirror of the family-ops Recipe shape (we don't
//          cross-import the family-ops repo). Only the fields the website
//          actually renders are included.
export type DietTag =
  | "veg" | "non_veg" | "vegan"
  | "contains_pork" | "contains_beef" | "contains_chicken" | "contains_lamb" | "contains_goat"
  | "contains_fish" | "contains_shellfish" | "contains_other_seafood" | "contains_egg"
  | "gluten" | "dairy" | "nuts" | "seafood";

export type DietClassification = "vegan" | "veg" | "eggetarian" | "pescatarian" | "non_veg";
export type DishType = "main" | "side" | "one_pot" | "soup" | "salad";
export type IngredientCategory = "produce" | "dairy" | "protein" | "pantry" | "spice" | "other";
export type MealType = "breakfast" | "lunch" | "dinner" | "snack";

export type RecipeIngredient = {
  item: string;
  quantity: number;
  unit: string;
  category: IngredientCategory;
  notes?: string;
  optional?: boolean;
};

export type RecipePrepStep = {
  type: "thaw" | "marinate" | "soak" | "ferment" | "rest";
  leadTimeMinutes: number;
  instruction: string;
};

export type RecipeInstruction = {
  stepNumber: number;
  text: string;
  durationMinutes?: number;
};

export type NutritionPerServing = {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  fiber?: number;
  sugar?: number;
  sodium?: number;
  saturatedFat?: number;
};

export type Recipe = {
  recipeId: string;
  slug: string;
  title: string;
  cuisine: string;
  dishType: DishType;
  dietTags: DietTag[];
  dietClassification: DietClassification;
  effort: "low" | "medium" | "high";
  spiceLevel: "mild" | "medium" | "hot";
  mealOccasion: string[];
  servingStyle: string[];
  goodFor: string[];
  seasonality?: string[];
  suitableFor: MealType[];
  tags: string[];
  healthTags?: string[];
  servingsBase: number;
  totalTimeMinutes: number;
  activeTimeMinutes: number;
  ingredients: RecipeIngredient[];
  prepSteps: RecipePrepStep[];
  instructions: RecipeInstruction[];
  equipment: string[];
  leftoverNotes?: string;
  source: string;
  sourceUrl?: string;
  nutritionPerServing?: NutritionPerServing;
  nutritionSource?: "manual" | "computed" | "estimated";
  nutritionComputedAt?: string;
  createdAt: string;
  updatedAt: string;
};

export type SlimRecipe = Pick<
  Recipe,
  | "recipeId" | "slug" | "title" | "cuisine" | "dishType"
  | "dietTags" | "dietClassification" | "totalTimeMinutes" | "activeTimeMinutes"
  | "effort" | "spiceLevel" | "mealOccasion" | "servingStyle" | "goodFor"
  | "suitableFor"
> & { healthTags?: string[] };

export type ListResponse = {
  recipes: SlimRecipe[];
  pagination: { total: number; returned: number; limit: number };
};

// ── Fetchers ───────────────────────────────────────────────────────────────

export async function fetchRecipeBySlug(slug: string, signal?: AbortSignal): Promise<Recipe | null> {
  const res = await fetch(`${apiBase()}/api/recipes/${encodeURIComponent(slug)}`, { signal });
  if (res.status === 404) return null;
  if (!res.ok) throw new Error(`Recipe fetch failed: ${res.status}`);
  const body = (await res.json()) as { recipe: Recipe };
  return body.recipe;
}

export async function fetchRecipesList(
  opts: { cuisine?: string; dietTag?: string; limit?: number } = {},
  signal?: AbortSignal,
): Promise<ListResponse> {
  const params = new URLSearchParams();
  if (opts.cuisine) params.set("cuisine", opts.cuisine);
  if (opts.dietTag) params.set("dietTag", opts.dietTag);
  if (opts.limit) params.set("limit", String(opts.limit));
  const qs = params.toString();
  const url = `${apiBase()}/api/recipes${qs ? `?${qs}` : ""}`;
  const res = await fetch(url, { signal });
  if (!res.ok) throw new Error(`Recipe list fetch failed: ${res.status}`);
  return (await res.json()) as ListResponse;
}
