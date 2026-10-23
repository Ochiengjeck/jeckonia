"use client";

import { useState } from "react";
import Image from "next/image";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "./Reveal";
import { Lightbox } from "./Lightbox";

type Category = { id: string; key: string; label: string };
type PortfolioItem = {
  id: string;
  title: string;
  description: string;
  thumbnailImageUrl: string;
  fullImageUrl: string;
  externalLink: string | null;
  category: Category;
};

export function PortfolioGrid({
  categories,
  items,
}: {
  categories: Category[];
  items: PortfolioItem[];
}) {
  const [filter, setFilter] = useState("all");
  const [lightboxItem, setLightboxItem] = useState<PortfolioItem | null>(null);

  const visibleItems =
    filter === "all" ? items : items.filter((item) => item.category.key === filter);

  return (
    <>
      <div className="mb-10 flex flex-wrap gap-8 border-b border-muted-border pb-4">
        <button
          onClick={() => setFilter("all")}
          className={`border-b-2 pb-1 font-mono text-xs uppercase tracking-widest transition-colors duration-200 ${
            filter === "all" ? "border-accent text-foreground" : "border-transparent text-text/70 hover:text-foreground"
          }`}
        >
          All
        </button>
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setFilter(category.key)}
            className={`border-b-2 pb-1 font-mono text-xs uppercase tracking-widest transition-colors duration-200 ${
              filter === category.key
                ? "border-accent text-foreground"
                : "border-transparent text-text/70 hover:text-foreground"
            }`}
          >
            {category.label}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-1 gap-[30px] sm:grid-cols-2 lg:grid-cols-3">
        {visibleItems.map((item, i) => (
          <Reveal key={item.id} variant="fade-up" delay={Math.min(i, 6) * 60}>
            <div className="group overflow-hidden border border-muted-border">
              <div className="relative h-[250px] overflow-hidden">
                <Image
                  src={item.thumbnailImageUrl}
                  alt={item.title}
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 flex items-center justify-center border border-accent bg-background/90 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  {item.externalLink && (
                    <a
                      href={item.externalLink}
                      className="mx-2.5 flex h-[50px] w-[50px] items-center justify-center border border-muted-border text-lg text-foreground transition-colors duration-200 hover:border-accent hover:text-accent"
                    >
                      <Icon name="FaLink" />
                    </a>
                  )}
                  <button
                    aria-label={`View larger image of ${item.title}`}
                    onClick={() => setLightboxItem(item)}
                    className="mx-2.5 flex h-[50px] w-[50px] items-center justify-center border border-muted-border text-lg text-foreground transition-colors duration-200 hover:border-accent hover:text-accent"
                  >
                    <Icon name="FaPlus" />
                  </button>
                </div>
              </div>
              <div className="p-[25px]">
                <span className="mb-2.5 block font-mono text-label tracking-widest text-accent uppercase">
                  {item.category.label}
                </span>
                <h3 className="mb-2.5 text-lg font-bold text-foreground">{item.title}</h3>
                <p className="text-sm leading-[1.7] text-text">{item.description}</p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
      {lightboxItem && (
        <Lightbox
          src={lightboxItem.fullImageUrl}
          alt={lightboxItem.title}
          onClose={() => setLightboxItem(null)}
        />
      )}
    </>
  );
}
