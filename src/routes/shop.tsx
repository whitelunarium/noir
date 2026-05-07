import { createFileRoute } from "@tanstack/react-router";
import { ProductGrid } from "@/components/ProductGrid";

export const Route = createFileRoute("/shop")({
  head: () => ({
    meta: [
      { title: "Shop All — MONO/STR" },
      { name: "description", content: "All hoodies, longsleeves and shirts from the latest MONO/STR drop." },
      { property: "og:title", content: "Shop All — MONO/STR" },
      { property: "og:description", content: "All hoodies, longsleeves and shirts from the latest MONO/STR drop." },
    ],
  }),
  component: ShopPage,
});

function ShopPage() {
  return (
    <div className="mx-auto max-w-[1600px] px-4 md:px-8 py-10 md:py-16">
      <div className="mb-10 md:mb-14 flex items-end justify-between gap-6 flex-wrap">
        <div>
          <p className="eyebrow text-muted-foreground mb-3">Catalogue</p>
          <h1 className="font-display text-4xl md:text-6xl font-black tracking-tighter">Shop All</h1>
        </div>
        <p className="text-sm text-muted-foreground max-w-sm">
          Every piece, every size. Made in small runs and never restocked.
        </p>
      </div>
      <ProductGrid />
    </div>
  );
}
