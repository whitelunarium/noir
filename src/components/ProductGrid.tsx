import { ProductCard } from "./ProductCard";
import { useProducts } from "@/hooks/useProducts";

export function ProductGrid({ query, limit }: { query?: string; limit?: number }) {
  const { data, isLoading } = useProducts(query);

  if (isLoading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-3 gap-y-10 md:gap-x-6">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="aspect-[3/4] bg-muted animate-pulse" />
        ))}
      </div>
    );
  }

  const products = limit ? (data ?? []).slice(0, limit) : data ?? [];

  if (products.length === 0) {
    return (
      <div className="border border-dashed border-border py-20 text-center">
        <p className="font-display text-2xl mb-2">No products found</p>
        <p className="text-sm text-muted-foreground max-w-md mx-auto">
          Tell the chat what you'd like to add (name, price, sizes) and we'll create it in Shopify.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-3 gap-y-10 md:gap-x-6">
      {products.map((p) => (
        <ProductCard key={p.node.id} product={p} />
      ))}
    </div>
  );
}
