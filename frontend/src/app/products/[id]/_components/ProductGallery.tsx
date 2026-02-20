"use client";

import { useState, useEffect } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";
import Image from "next/image";

interface ProductImage {
  src: string;
  alt: string;
}

interface ProductGalleryProps {
  images: ProductImage[];
  className?: string;
}

export function ProductGallery({ images, className }: ProductGalleryProps) {
  const [mainApi, setMainApi] = useState<CarouselApi>();
  const [thumbApi, setThumbApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  // Keep main and thumb carousels in sync
  useEffect(() => {
    if (!mainApi) return;

    const onSelect = () => {
      const index = mainApi.selectedScrollSnap();
      setCurrent(index);
      thumbApi?.scrollTo(index);
    };

    mainApi.on("select", onSelect);
    onSelect();

    return () => {
      mainApi.off("select", onSelect);
    };
  }, [mainApi, thumbApi]);

  const handleThumbClick = (index: number) => {
    mainApi?.scrollTo(index);
  };

  return (
    <div
      className={cn("flex flex-col gap-3 w-full max-w-xl mx-auto", className)}
    >
      {/* ── Main carousel ── */}
      <Carousel setApi={setMainApi} opts={{ loop: true }} className="w-full">
        <CarouselContent>
          {images.map((image, index) => (
            <CarouselItem key={index}>
              <div className="relative aspect-square w-full overflow-hidden rounded-xl bg-neutral-100">
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  unoptimized
                  className="object-contain transition-opacity duration-300"
                  sizes="(max-width: 768px) 100vw, 580px"
                  priority={index === 0}
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* Prev / Next arrows — positioned inside the card area */}
        <CarouselPrevious className="left-3 h-9 w-9 rounded-full border border-neutral-200 bg-white/80 shadow-sm backdrop-blur-sm hover:bg-white transition-all" />
        <CarouselNext className="right-3 h-9 w-9 rounded-full border border-neutral-200 bg-white/80 shadow-sm backdrop-blur-sm hover:bg-white transition-all" />
      </Carousel>

      {/* ── Thumbnail strip ── */}
      <Carousel
        setApi={setThumbApi}
        opts={{ align: "start", dragFree: true }}
        className="w-full"
      >
        <CarouselContent className="-ml-2">
          {images.map((image, index) => (
            <CarouselItem
              key={index}
              className="pl-2 basis-1/5 cursor-pointer"
              onClick={() => handleThumbClick(index)}
            >
              <div
                className={cn(
                  "relative aspect-square overflow-hidden rounded-lg border-2 transition-all duration-200",
                  current === index
                    ? "border-neutral-900 opacity-100 shadow-md"
                    : "border-transparent opacity-50 hover:opacity-80",
                )}
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  unoptimized
                  className="object-contain bg-neutral-100"
                  sizes="80px"
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
}
