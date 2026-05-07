import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Search, ShoppingBag, Menu, X, User } from "lucide-react";
import { useCartStore } from "@/stores/cartStore";
import { SearchOverlay } from "./SearchOverlay";

const NAV = [
  { to: "/new-arrivals", label: "New Arrivals" },
  { to: "/collections", label: "Collections" },
  { to: "/shop", label: "Shop All" },
  { to: "/shop?cat=hoodies", label: "Hoodies" },
  { to: "/shop?cat=longsleeves", label: "Longsleeves" },
  { to: "/shop?cat=shirts", label: "Shirts" },
] as const;

export function SiteHeader() {
  const totalItems = useCartStore((s) => s.items.reduce((sum, i) => sum + i.quantity, 0));
  const setOpen = useCartStore((s) => s.setOpen);
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <div className="bg-foreground text-background overflow-hidden">
        <div className="flex whitespace-nowrap py-2 marquee">
          {Array.from({ length: 2 }).map((_, k) => (
            <div key={k} className="flex shrink-0 gap-12 pr-12 eyebrow">
              <span>Free shipping on orders over $150</span>
              <span>·</span>
              <span>New drop · FW26</span>
              <span>·</span>
              <span>Worldwide delivery</span>
              <span>·</span>
              <span>Sign up — 10% off your first order</span>
              <span>·</span>
            </div>
          ))}
        </div>
      </div>

      <header
        className={`sticky top-0 z-40 w-full border-b transition-all ${
          scrolled ? "bg-background/90 backdrop-blur-md border-border" : "bg-background border-transparent"
        }`}
      >
        <div className="mx-auto max-w-[1600px] px-4 md:px-8">
          <div className="flex h-16 items-center justify-between gap-6">
            <button
              className="md:hidden p-2 -ml-2"
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
            >
              <Menu className="h-5 w-5" />
            </button>

            <Link to="/" className="font-display text-2xl md:text-3xl font-black tracking-tighter">
              MONO/STR
            </Link>

            <nav className="hidden md:flex items-center gap-7 text-[13px] font-medium">
              {NAV.slice(0, 3).map((n) => (
                <Link
                  key={n.to}
                  to={n.to}
                  className="hover:opacity-60 transition-opacity uppercase tracking-wider"
                >
                  {n.label}
                </Link>
              ))}
            </nav>

            <div className="flex items-center gap-1 md:gap-3">
              <button
                onClick={() => setSearchOpen(true)}
                className="p-2 hover:opacity-60"
                aria-label="Search"
              >
                <Search className="h-5 w-5" />
              </button>
              <button className="hidden md:inline-flex p-2 hover:opacity-60" aria-label="Account">
                <User className="h-5 w-5" />
              </button>
              <button
                onClick={() => setOpen(true)}
                className="relative p-2 hover:opacity-60"
                aria-label="Open cart"
              >
                <ShoppingBag className="h-5 w-5" />
                {totalItems > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 h-4 min-w-4 px-1 rounded-full bg-foreground text-background text-[10px] font-medium flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 bg-background flex flex-col">
          <div className="flex h-16 items-center justify-between px-4 border-b">
            <Link to="/" onClick={() => setMobileOpen(false)} className="font-display text-2xl font-black tracking-tighter">
              MONO/STR
            </Link>
            <button onClick={() => setMobileOpen(false)} aria-label="Close menu" className="p-2">
              <X className="h-5 w-5" />
            </button>
          </div>
          <nav className="flex flex-col p-6 gap-1">
            {NAV.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                onClick={() => setMobileOpen(false)}
                className="font-display text-3xl font-bold py-3 border-b border-border hover:opacity-60"
              >
                {n.label}
              </Link>
            ))}
          </nav>
        </div>
      )}

      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
