import { createFileRoute } from "@tanstack/react-router";
import { ProductGrid } from "@/components/ProductGrid";

export const Route = createFileRoute("/new-arrivals")({
  head: () => ({
    meta: [
      { title: "New Arrivals — MONO/STR" },
      { name: "description", content: "Fresh drops from MONO/STR. Hoodies, longsleeves and shirts, just landed." },
      { property: "og:title", content: "New Arrivals — MONO/STR" },
      { property: "og:description", content: "Fresh drops from MONO/STR. Hoodies, longsleeves and shirts, just landed." },
    ],
  }),
  component: NewArrivals,
});

function NewArrivals() {
  return (
    <div className="mx-auto max-w-[1600px] px-4 md:px-8 py-10 md:py-16">
      <div className="mb-10 md:mb-14">
        <p className="eyebrow text-muted-foreground mb-3">Just landed</p>
        <h1 className="font-display text-4xl md:text-6xl font-black tracking-tighter">New Arrivals</h1>
      </div>
      <ProductGrid />
    </div>
  );
}
