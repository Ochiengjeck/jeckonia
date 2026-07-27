"use client";

import { useState } from "react";
import Image from "next/image";
import { Icon } from "@/components/ui/Icon";
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
      <div className="mb-10 flex flex-wrap justify-center gap-2.5">
        <button
          onClick={() => setFilter("all")}
          className={`rounded-full px-5 py-2 text-sm font-medium shadow-card transition-colors duration-300 ${
            filter === "all"
              ? "bg-primary text-white"
              : "bg-card text-text hover:bg-primary hover:text-white"
          }`}
        >
          All
        </button>
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setFilter(category.key)}
            className={`rounded-full px-5 py-2 text-sm font-medium shadow-card transition-colors duration-300 ${
              filter === category.key
                ? "bg-primary text-white"
                : "bg-card text-text hover:bg-primary hover:text-white"
            }`}
          >
            {category.label}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-1 gap-[30px] sm:grid-cols-2 lg:grid-cols-3">
        {visibleItems.map((item) => (
          <div
            key={item.id}
            className="group overflow-hidden rounded-card bg-card shadow-card transition-transform duration-300 hover:-translate-y-2.5"
          >
            <div className="relative h-[250px] overflow-hidden">
              <Image
                src={item.thumbnailImageUrl}
                alt={item.title}
                fill
                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                className="object-cover transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-primary/80 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                {item.externalLink && (
                  <a
                    href={item.externalLink}
                    className="mx-2.5 flex h-[50px] w-[50px] items-center justify-center rounded-full bg-white text-lg text-primary transition-colors duration-300 hover:bg-primary hover:text-white"
                  >
                    <Icon name="FaLink" />
                  </a>
                )}
                <button
                  aria-label={`View larger image of ${item.title}`}
                  onClick={() => setLightboxItem(item)}
                  className="mx-2.5 flex h-[50px] w-[50px] items-center justify-center rounded-full bg-white text-lg text-primary transition-colors duration-300 hover:bg-primary hover:text-white"
                >
                  <Icon name="FaPlus" />
                </button>
              </div>
            </div>
            <div className="p-[25px]">
              <span className="mb-2.5 block text-sm text-primary">
                {item.category.label}
              </span>
              <h3 className="mb-2.5 text-lg font-semibold text-heading">
                {item.title}
              </h3>
              <p className="text-sm leading-[1.7] text-text">
                {item.description}
              </p>
            </div>
          </div>
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
