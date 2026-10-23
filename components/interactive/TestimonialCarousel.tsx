"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Icon } from "@/components/ui/Icon";

type Testimonial = {
  id: string;
  quote: string;
  authorName: string;
  authorRole: string;
  authorImageUrl: string;
};

export function TestimonialCarousel({
  testimonials,
}: {
  testimonials: Testimonial[];
}) {
  const [index, setIndex] = useState(0);
  const count = testimonials.length;

  useEffect(() => {
    if (count <= 1) return;
    const interval = setInterval(() => {
      setIndex((i) => (i + 1) % count);
    }, 5000);
    return () => clearInterval(interval);
  }, [count]);

  function go(i: number) {
    setIndex(((i % count) + count) % count);
  }

  if (count === 0) return null;

  return (
    <div className="relative overflow-hidden">
      <div
        className="flex transition-transform duration-500 ease-out"
        style={{ transform: `translateX(-${index * 100}%)` }}
      >
        {testimonials.map((testimonial) => (
          <div key={testimonial.id} className="box-border min-w-full px-[15px]">
            <div className="relative border border-muted-border p-10">
              <Icon
                name="FaQuoteLeft"
                className="absolute top-5 left-5 text-3xl text-accent/10"
              />
              <p className="mb-5 text-lead text-foreground">
                &ldquo;{testimonial.quote}&rdquo;
              </p>
              <div className="flex items-center">
                <div className="mr-[15px] h-[60px] w-[60px] overflow-hidden border border-muted-border">
                  <Image
                    src={testimonial.authorImageUrl}
                    alt={testimonial.authorName}
                    width={60}
                    height={60}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="mb-1 text-lg font-bold text-foreground">
                    {testimonial.authorName}
                  </h4>
                  <p className="font-mono text-sm text-text">{testimonial.authorRole}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      {count > 1 && (
        <>
          <div className="mt-10 flex justify-center gap-[15px]">
            <button
              aria-label="Previous testimonial"
              onClick={() => go(index - 1)}
              className="flex h-[50px] w-[50px] items-center justify-center border border-muted-border text-lg text-foreground transition-colors duration-200 hover:border-accent hover:text-accent"
            >
              <Icon name="FaArrowLeft" />
            </button>
            <button
              aria-label="Next testimonial"
              onClick={() => go(index + 1)}
              className="flex h-[50px] w-[50px] items-center justify-center border border-muted-border text-lg text-foreground transition-colors duration-200 hover:border-accent hover:text-accent"
            >
              <Icon name="FaArrowRight" />
            </button>
          </div>
          <div className="mt-5 flex justify-center gap-2">
            {testimonials.map((testimonial, i) => (
              <button
                key={testimonial.id}
                aria-label={`Go to testimonial ${i + 1}`}
                onClick={() => go(i)}
                className={`h-[3px] transition-all duration-300 ${
                  i === index ? "w-8 bg-accent" : "w-4 bg-muted-border"
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
