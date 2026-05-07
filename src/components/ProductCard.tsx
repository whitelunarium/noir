import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { type ShopifyProduct, formatPrice } from "@/lib/shopify";
import { useCartStore } from "@/stores/cartStore";
import { ShoppingBag } from "lucide-react";

export function ProductCard({ product }: { product: ShopifyProduct }) {
  const [hover, setHover] = useState(false);
  const addItem = useCartStore((s) => s.addItem);
  const isLoading = useCartStore((s) => s.isLoading);
  const images = product.node.images.edges;
  const primary = images[0]?.node;
  const secondary = images[1]?.node ?? primary;
  const variants = product.node.variants.edges;
  const firstAvailable = variants.find((v) => v.node.availableForSale)?.node ?? variants[0]?.node;

  const handleQuickAdd = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!firstAvailable) return;
    await addItem({
      product,
      variantId: firstAvailable.id,
      variantTitle: firstAvailable.title,
      price: firstAvailable.price,
      quantity: 1,
      selectedOptions: firstAvailable.selectedOptions || [],
    });
  };

  return (
    <Link
      to="/product/$handle"
      params={{ handle: product.node.handle }}
      className="group block"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <div className="relative aspect-[3/4] bg-muted overflow-hidden">
        {primary && (
          <img
            src={(hover ? secondary : primary).url}
            alt={primary.altText ?? product.node.title}
            className="absolute inset-0 w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
          />
        )}
        <button
          onClick={handleQuickAdd}
          disabled={isLoading || !firstAvailable}
          className="absolute bottom-3 right-3 md:bottom-4 md:right-4 h-10 w-10 md:opacity-0 md:group-hover:opacity-100 transition-opacity bg-background text-foreground flex items-center justify-center hover:bg-foreground hover:text-background disabled:opacity-50"
          aria-label="Quick add to bag"
        >
          <ShoppingBag className="h-4 w-4" />
        </button>
      </div>
      <div className="pt-3 flex items-start justify-between gap-2">
        <div className="min-w-0">
          <h3 className="text-sm font-medium truncate">{product.node.title}</h3>
        </div>
        <p className="text-sm font-medium shrink-0">
          {formatPrice(
            product.node.priceRange.minVariantPrice.amount,
            product.node.priceRange.minVariantPrice.currencyCode
          )}
        </p>
      </div>
    </Link>
  );
}
