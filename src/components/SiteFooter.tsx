import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { toast } from "sonner";

export function SiteFooter() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const onSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.includes("@")) return;
    setSubmitted(true);
    setEmail("");
    toast.success("You're in. Welcome to MONO/STR.", { position: "top-center" });
  };

  return (
    <footer className="bg-foreground text-background mt-24">
      <div className="mx-auto max-w-[1600px] px-4 md:px-8 py-16 md:py-24">
        <div className="grid md:grid-cols-12 gap-10 md:gap-12">
          <div className="md:col-span-6">
            <p className="eyebrow opacity-70 mb-3">Newsletter</p>
            <h3 className="font-display text-3xl md:text-5xl font-black tracking-tighter leading-[0.95] mb-6">
              Get the drop before it sells out.
            </h3>
            <form onSubmit={onSubscribe} className="flex max-w-md border-b border-background/40 pb-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="flex-1 bg-transparent text-background placeholder:text-background/50 outline-none border-0 text-sm py-2"
              />
              <button type="submit" className="eyebrow hover:opacity-60 transition-opacity">
                {submitted ? "Subscribed" : "Sign up →"}
              </button>
            </form>
            <p className="text-xs opacity-60 mt-3">By signing up you agree to our terms. Unsubscribe anytime.</p>
          </div>

          <div className="md:col-span-2">
            <p className="eyebrow opacity-70 mb-4">Shop</p>
            <ul className="space-y-2 text-sm">
              <li><Link to="/shop" className="hover:opacity-60">All</Link></li>
              <li><Link to="/shop" search={{}} className="hover:opacity-60">Hoodies</Link></li>
              <li><Link to="/shop" className="hover:opacity-60">Longsleeves</Link></li>
              <li><Link to="/shop" className="hover:opacity-60">Shirts</Link></li>
            </ul>
          </div>
          <div className="md:col-span-2">
            <p className="eyebrow opacity-70 mb-4">Help</p>
            <ul className="space-y-2 text-sm">
              <li><a className="hover:opacity-60" href="#">Shipping</a></li>
              <li><a className="hover:opacity-60" href="#">Returns</a></li>
              <li><a className="hover:opacity-60" href="#">Size guide</a></li>
              <li><a className="hover:opacity-60" href="#">Contact</a></li>
            </ul>
          </div>
          <div className="md:col-span-2">
            <p className="eyebrow opacity-70 mb-4">Studio</p>
            <ul className="space-y-2 text-sm">
              <li><a className="hover:opacity-60" href="#">About</a></li>
              <li><a className="hover:opacity-60" href="#">Stockists</a></li>
              <li><a className="hover:opacity-60" href="#">Press</a></li>
              <li><a className="hover:opacity-60" href="#">Careers</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-6 border-t border-background/15 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <p className="font-display text-2xl font-black tracking-tighter">MONO/STR</p>
          <p className="text-xs opacity-60">© {new Date().getFullYear()} MONO/STR Studio. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
