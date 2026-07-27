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
            <div className="relative rounded-card bg-card p-10 shadow-card">
              <Icon
                name="FaQuoteLeft"
                className="absolute top-5 left-5 text-3xl text-primary/10"
              />
              <p className="mb-5 text-base leading-[1.8] text-text">
                &ldquo;{testimonial.quote}&rdquo;
              </p>
              <div className="flex items-center">
                <div className="mr-[15px] h-[60px] w-[60px] overflow-hidden rounded-full">
                  <Image
                    src={testimonial.authorImageUrl}
                    alt={testimonial.authorName}
                    width={60}
                    height={60}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="mb-1 text-lg font-semibold text-heading">
                    {testimonial.authorName}
                  </h4>
                  <p className="text-sm text-text">{testimonial.authorRole}</p>
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
              className="flex h-[50px] w-[50px] items-center justify-center rounded-full bg-card text-lg text-primary shadow-card transition-colors duration-300 hover:bg-primary hover:text-white"
            >
              <Icon name="FaArrowLeft" />
            </button>
            <button
              aria-label="Next testimonial"
              onClick={() => go(index + 1)}
              className="flex h-[50px] w-[50px] items-center justify-center rounded-full bg-card text-lg text-primary shadow-card transition-colors duration-300 hover:bg-primary hover:text-white"
            >
              <Icon name="FaArrowRight" />
            </button>
          </div>
          <div className="mt-5 flex justify-center gap-2.5">
            {testimonials.map((testimonial, i) => (
              <button
                key={testimonial.id}
                aria-label={`Go to testimonial ${i + 1}`}
                onClick={() => go(i)}
                className={`h-2.5 w-2.5 rounded-full transition-transform duration-300 ${
                  i === index ? "scale-[1.3] bg-primary" : "bg-background"
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
