import { createFileRoute, Link } from "@tanstack/react-router";
import { ProductGrid } from "@/components/ProductGrid";
import { useProducts } from "@/hooks/useProducts";
import { useRef } from "react";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { ProductCard } from "@/components/ProductCard";
import heroImg from "@/assets/hero.jpg";
import editorialImg from "@/assets/editorial.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "MONO/STR — FW26 Drop" },
      { name: "description", content: "Editorial streetwear. New drop FW26 — hoodies, longsleeves and shirts." },
      { property: "og:title", content: "MONO/STR — FW26 Drop" },
      { property: "og:image", content: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1600" },
    ],
  }),
  component: Index,
});

function Index() {
  const { data: products } = useProducts();
  const trending = (products ?? []).slice(0, 8);
  const scroller = useRef<HTMLDivElement>(null);

  const scroll = (dir: 1 | -1) => {
    scroller.current?.scrollBy({ left: dir * (scroller.current.clientWidth * 0.8), behavior: "smooth" });
  };

  return (
    <div>
      {/* HERO */}
      <section className="relative bg-foreground text-background">
        <div className="relative h-[86vh] min-h-[560px] max-h-[900px] overflow-hidden">
          <img src={heroImg} alt="MONO/STR FW26 campaign" className="absolute inset-0 w-full h-full object-cover opacity-90" />
          <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 via-foreground/10 to-transparent" />
          <div className="relative h-full mx-auto max-w-[1600px] px-4 md:px-8 flex flex-col justify-end pb-10 md:pb-16">
            <p className="eyebrow opacity-80 mb-4">FW26 / Volume 04</p>
            <h1 className="font-display font-black tracking-tighter leading-[0.85] text-[14vw] md:text-[7vw] max-w-5xl">
              Quiet noise.
            </h1>
            <div className="mt-6 md:mt-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
              <p className="max-w-md text-sm md:text-base opacity-90">
                A study in volume, weight and restraint. Cut from heavy fleece, brushed jersey and washed cotton.
              </p>
              <div className="flex gap-3">
                <Link
                  to="/shop"
                  className="inline-flex items-center gap-2 bg-background text-foreground px-6 py-3 text-xs uppercase tracking-wider hover:opacity-90"
                >
                  Shop the drop <ArrowUpRight className="h-4 w-4" />
                </Link>
                <Link
                  to="/collections"
                  className="inline-flex items-center gap-2 border border-background/40 px-6 py-3 text-xs uppercase tracking-wider hover:bg-background/10"
                >
                  Lookbook
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CATEGORY STRIP */}
      <section className="border-b">
        <div className="mx-auto max-w-[1600px] px-4 md:px-8 grid grid-cols-3">
          {[
            { label: "Hoodies", to: "/shop" },
            { label: "Longsleeves", to: "/shop" },
            { label: "Shirts", to: "/shop" },
          ].map((c, i) => (
            <Link
              key={c.label}
              to={c.to}
              className={`group py-8 md:py-10 flex items-center justify-between ${i !== 2 ? "border-r" : ""} px-2 md:px-6`}
            >
              <span className="font-display text-xl md:text-3xl font-bold tracking-tighter">{c.label}</span>
              <ArrowUpRight className="h-4 w-4 md:h-5 md:w-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
            </Link>
          ))}
        </div>
      </section>

      {/* TRENDING NOW */}
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-[1600px] px-4 md:px-8">
          <div className="flex items-end justify-between mb-8">
            <div>
              <p className="eyebrow text-muted-foreground mb-2">01 — Now</p>
              <h2 className="font-display text-3xl md:text-5xl font-black tracking-tighter">Trending Now</h2>
            </div>
            <div className="hidden md:flex gap-2">
              <button onClick={() => scroll(-1)} className="h-10 w-10 border border-border flex items-center justify-center hover:bg-foreground hover:text-background"><ArrowLeft className="h-4 w-4" /></button>
              <button onClick={() => scroll(1)} className="h-10 w-10 border border-border flex items-center justify-center hover:bg-foreground hover:text-background"><ArrowRight className="h-4 w-4" /></button>
            </div>
          </div>

          {trending.length === 0 ? (
            <div className="border border-dashed border-border py-20 text-center">
              <p className="font-display text-2xl mb-2">No products yet</p>
              <p className="text-sm text-muted-foreground">Tell the chat what to add — name, price, sizes — and we'll create it in Shopify.</p>
            </div>
          ) : (
            <div ref={scroller} className="flex gap-4 md:gap-6 overflow-x-auto hide-scrollbar -mx-4 md:-mx-8 px-4 md:px-8 snap-x">
              {trending.map((p) => (
                <div key={p.node.id} className="snap-start shrink-0 w-[70%] sm:w-[45%] md:w-[28%] lg:w-[22%]">
                  <ProductCard product={p} />
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* EDITORIAL SPLIT */}
      <section className="bg-secondary">
        <div className="mx-auto max-w-[1600px] grid md:grid-cols-2">
          <div className="aspect-[4/5] md:aspect-auto md:min-h-[600px] relative overflow-hidden">
            <img src={editorialImg} alt="Editorial" className="absolute inset-0 w-full h-full object-cover" />
          </div>
          <div className="px-6 md:px-16 py-16 md:py-24 flex flex-col justify-center">
            <p className="eyebrow text-muted-foreground mb-4">Editorial — Issue 02</p>
            <h2 className="font-display text-4xl md:text-6xl font-black tracking-tighter leading-[0.9] mb-6">
              Built for the after-hours.
            </h2>
            <p className="text-muted-foreground max-w-md mb-8">
              Pieces designed without compromise — weighty fleeces, brushed cottons and patient construction.
              Made in small runs, never restocked.
            </p>
            <Link
              to="/collections"
              className="self-start inline-flex items-center gap-2 border-b border-foreground pb-1 text-sm uppercase tracking-wider hover:opacity-60"
            >
              Read the story <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* SHOP ALL */}
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-[1600px] px-4 md:px-8">
          <div className="flex items-end justify-between mb-8">
            <div>
              <p className="eyebrow text-muted-foreground mb-2">02 — Catalogue</p>
              <h2 className="font-display text-3xl md:text-5xl font-black tracking-tighter">Shop All</h2>
            </div>
            <Link to="/shop" className="text-xs uppercase tracking-wider hover:opacity-60">View all →</Link>
          </div>
          <ProductGrid limit={8} />
        </div>
      </section>
    </div>
  );
}
