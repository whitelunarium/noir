import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Search, X } from "lucide-react";
import { useProducts } from "@/hooks/useProducts";
import { formatPrice } from "@/lib/shopify";

export function SearchOverlay({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [q, setQ] = useState("");
  const { data: products } = useProducts();

  useEffect(() => {
    if (!open) setQ("");
    const onEsc = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    if (open) document.addEventListener("keydown", onEsc);
    return () => document.removeEventListener("keydown", onEsc);
  }, [open, onClose]);

  if (!open) return null;

  const results = (products ?? []).filter((p) =>
    q.trim() === "" ? false : p.node.title.toLowerCase().includes(q.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 bg-background/95 backdrop-blur-md flex flex-col animate-in fade-in duration-200">
      <div className="border-b">
        <div className="mx-auto max-w-[1200px] px-4 md:px-8 flex items-center gap-4 h-20">
          <Search className="h-5 w-5 shrink-0" />
          <input
            autoFocus
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search products…"
            className="flex-1 bg-transparent border-0 outline-none text-xl md:text-2xl font-display placeholder:text-muted-foreground"
          />
          <button onClick={onClose} aria-label="Close search" className="p-2">
            <X className="h-5 w-5" />
          </button>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto">
        <div className="mx-auto max-w-[1200px] px-4 md:px-8 py-8">
          {q.trim() === "" ? (
            <div>
              <p className="eyebrow text-muted-foreground mb-4">Popular</p>
              <div className="flex flex-wrap gap-2">
                {["Hoodies", "Longsleeves", "Shirts", "New Arrivals"].map((t) => (
                  <button
                    key={t}
                    onClick={() => setQ(t)}
                    className="px-4 py-2 border border-border text-sm hover:bg-foreground hover:text-background transition-colors"
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>
          ) : results.length === 0 ? (
            <p className="text-muted-foreground">No matches for "{q}".</p>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {results.slice(0, 8).map((p) => {
                const img = p.node.images.edges[0]?.node;
                return (
                  <Link
                    key={p.node.id}
                    to="/product/$handle"
                    params={{ handle: p.node.handle }}
                    onClick={onClose}
                    className="group"
                  >
                    <div className="aspect-[3/4] bg-muted overflow-hidden">
                      {img && (
                        <img
                          src={img.url}
                          alt={img.altText ?? p.node.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                      )}
                    </div>
                    <div className="pt-2">
                      <p className="text-sm font-medium truncate">{p.node.title}</p>
                      <p className="text-sm text-muted-foreground">
                        {formatPrice(
                          p.node.priceRange.minVariantPrice.amount,
                          p.node.priceRange.minVariantPrice.currencyCode
                        )}
                      </p>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
