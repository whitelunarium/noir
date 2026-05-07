import { createFileRoute, Link } from "@tanstack/react-router";
import editorialImg from "@/assets/editorial.jpg";
import heroImg from "@/assets/hero.jpg";

export const Route = createFileRoute("/collections")({
  head: () => ({
    meta: [
      { title: "Collections — MONO/STR" },
      { name: "description", content: "Seasonal collections and lookbooks from MONO/STR studio." },
      { property: "og:title", content: "Collections — MONO/STR" },
      { property: "og:description", content: "Seasonal collections and lookbooks from MONO/STR studio." },
    ],
  }),
  component: Collections,
});

const COLLECTIONS = [
  { title: "FW26 — Quiet Noise", tag: "Volume 04", img: heroImg },
  { title: "SS26 — Off Hours", tag: "Volume 03", img: editorialImg },
  { title: "FW25 — Static", tag: "Volume 02", img: heroImg },
  { title: "Origin — Issue 01", tag: "Volume 01", img: editorialImg },
];

function Collections() {
  return (
    <div className="mx-auto max-w-[1600px] px-4 md:px-8 py-10 md:py-16">
      <div className="mb-10 md:mb-14">
        <p className="eyebrow text-muted-foreground mb-3">Lookbooks</p>
        <h1 className="font-display text-4xl md:text-6xl font-black tracking-tighter">Collections</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6">
        {COLLECTIONS.map((c, i) => (
          <Link
            key={c.title}
            to="/shop"
            className={`group relative block overflow-hidden bg-muted ${
              i % 4 === 0 ? "md:col-span-7 aspect-[4/5] md:aspect-[16/11]" :
              i % 4 === 1 ? "md:col-span-5 aspect-[4/5] md:aspect-[4/5]" :
              i % 4 === 2 ? "md:col-span-5 aspect-[4/5] md:aspect-[4/5]" :
              "md:col-span-7 aspect-[4/5] md:aspect-[16/11]"
            }`}
          >
            <img src={c.img} alt={c.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute inset-0 p-6 md:p-10 flex flex-col justify-end text-background">
              <p className="eyebrow opacity-80 mb-2">{c.tag}</p>
              <h2 className="font-display text-3xl md:text-5xl font-black tracking-tighter">{c.title}</h2>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
