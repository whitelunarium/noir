import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { useProductByHandle } from "@/hooks/useProducts";
import { formatPrice } from "@/lib/shopify";
import { useCartStore } from "@/stores/cartStore";
import { Loader2, Truck, RotateCcw, Ruler } from "lucide-react";

export const Route = createFileRoute("/product/$handle")({
  component: ProductPage,
  notFoundComponent: () => (
    <div className="mx-auto max-w-xl px-4 py-32 text-center">
      <h1 className="font-display text-4xl font-black tracking-tighter mb-3">Product not found</h1>
      <Link to="/shop" className="text-sm uppercase tracking-wider border-b border-foreground pb-1">
        Back to shop
      </Link>
    </div>
  ),
});

function ProductPage() {
  const { handle } = Route.useParams();
  const { data: product, isLoading } = useProductByHandle(handle);
  const addItem = useCartStore((s) => s.addItem);
  const isAdding = useCartStore((s) => s.isLoading);
  const [selected, setSelected] = useState<Record<string, string>>({});

  if (isLoading) {
    return (
      <div className="mx-auto max-w-[1600px] px-4 md:px-8 py-12 grid md:grid-cols-2 gap-8">
        <div className="aspect-[3/4] bg-muted animate-pulse" />
        <div className="space-y-4">
          <div className="h-8 w-2/3 bg-muted animate-pulse" />
          <div className="h-6 w-1/4 bg-muted animate-pulse" />
          <div className="h-32 bg-muted animate-pulse" />
        </div>
      </div>
    );
  }

  if (!product) throw notFound();

  const p = product.node;
  const images = p.images.edges;
  const variants = p.variants.edges;

  // Pick variant matching all selected options or fall back to first available
  const matchingVariant =
    variants.find((v) =>
      v.node.selectedOptions.every((o) => (selected[o.name] ?? v.node.selectedOptions[0]?.value) === o.value)
    )?.node ??
    variants.find((v) => v.node.availableForSale)?.node ??
    variants[0]?.node;

  const sizeOption = p.options.find((o) => o.name.toLowerCase() === "size");

  const handleAdd = async () => {
    if (!matchingVariant) return;
    if (sizeOption && !selected[sizeOption.name]) return;
    await addItem({
      product,
      variantId: matchingVariant.id,
      variantTitle: matchingVariant.title,
      price: matchingVariant.price,
      quantity: 1,
      selectedOptions: matchingVariant.selectedOptions,
    });
  };

  return (
    <div className="mx-auto max-w-[1600px] px-4 md:px-8 py-6 md:py-12">
      <nav className="text-xs eyebrow text-muted-foreground mb-6">
        <Link to="/" className="hover:text-foreground">Home</Link>
        <span className="mx-2">/</span>
        <Link to="/shop" className="hover:text-foreground">Shop</Link>
        <span className="mx-2">/</span>
        <span className="text-foreground">{p.title}</span>
      </nav>

      <div className="grid md:grid-cols-2 gap-6 md:gap-12">
        {/* Image gallery */}
        <div className="space-y-3">
          <div className="aspect-[3/4] bg-muted overflow-hidden">
            {images[0] && <img src={images[0].node.url} alt={p.title} className="w-full h-full object-cover" />}
          </div>
          {images.length > 1 && (
            <div className="grid grid-cols-3 gap-3">
              {images.slice(1, 4).map((img, i) => (
                <div key={i} className="aspect-square bg-muted overflow-hidden">
                  <img src={img.node.url} alt={`${p.title} ${i + 2}`} className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Details */}
        <div className="md:sticky md:top-24 md:self-start">
          <p className="eyebrow text-muted-foreground mb-3">MONO/STR</p>
          <h1 className="font-display text-3xl md:text-5xl font-black tracking-tighter mb-4">{p.title}</h1>
          <p className="text-xl mb-8">
            {formatPrice(matchingVariant?.price.amount ?? p.priceRange.minVariantPrice.amount, matchingVariant?.price.currencyCode ?? p.priceRange.minVariantPrice.currencyCode)}
          </p>

          {p.options.map((opt) => (
            <div key={opt.name} className="mb-6">
              <div className="flex items-center justify-between mb-3">
                <p className="eyebrow">{opt.name}</p>
                {opt.name.toLowerCase() === "size" && (
                  <button className="text-xs flex items-center gap-1 text-muted-foreground hover:text-foreground">
                    <Ruler className="h-3 w-3" /> Size guide
                  </button>
                )}
              </div>
              <div className="flex flex-wrap gap-2">
                {opt.values.map((value) => {
                  const active = selected[opt.name] === value;
                  return (
                    <button
                      key={value}
                      onClick={() => setSelected({ ...selected, [opt.name]: value })}
                      className={`min-w-[3rem] px-4 h-11 border text-sm transition-colors ${
                        active
                          ? "bg-foreground text-background border-foreground"
                          : "bg-background border-border hover:border-foreground"
                      }`}
                    >
                      {value}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}

          <button
            onClick={handleAdd}
            disabled={isAdding || !matchingVariant?.availableForSale || (!!sizeOption && !selected[sizeOption.name])}
            className="w-full h-14 bg-foreground text-background uppercase tracking-wider text-sm font-medium hover:opacity-90 disabled:opacity-40 flex items-center justify-center"
          >
            {isAdding ? <Loader2 className="h-4 w-4 animate-spin" /> :
              !matchingVariant?.availableForSale ? "Sold out" :
              sizeOption && !selected[sizeOption.name] ? "Select a size" : "Add to bag"}
          </button>

          <div className="mt-8 prose prose-sm">
            <p className="text-sm leading-relaxed text-muted-foreground whitespace-pre-line">
              {p.description || "Crafted with care from premium materials. Limited run."}
            </p>
          </div>

          <div className="mt-8 grid grid-cols-2 gap-4 pt-6 border-t border-border text-xs">
            <div className="flex items-start gap-2">
              <Truck className="h-4 w-4 mt-0.5 shrink-0" />
              <div>
                <p className="font-medium mb-0.5">Free shipping</p>
                <p className="text-muted-foreground">On orders over $150</p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <RotateCcw className="h-4 w-4 mt-0.5 shrink-0" />
              <div>
                <p className="font-medium mb-0.5">30-day returns</p>
                <p className="text-muted-foreground">Easy and free</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
