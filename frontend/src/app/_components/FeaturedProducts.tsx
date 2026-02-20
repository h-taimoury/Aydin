import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Calendar, Clock } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import featuredProducts from "../../../public/data/products.json";

export default async function FeaturedProducts() {
  // const featuredProducts = await getFeaturedProducts();

  return (
    <section className="pt-24 pb-4 px-4 md:w-[90%] mx-auto">
      <div className="mb-6 text-center">
        <h2 className="text-xl sm:text-2xl lg:text-3xl text-gray-600 font-bold tracking-tight mb-4">
          Featured Products
        </h2>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          Stay up to date with the latest insights, tutorials, and industry
          trends from our blog.
        </p>
      </div>

      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
      >
        <CarouselContent className="gap-6">
          {featuredProducts.map((product) => (
            <CarouselItem
              key={product.id}
              className="max-w-xs pl-2 sm:basis-1/2 md:pl-4 md:basis-1/3 lg:basis-1/4"
            >
              <Link href={`/products/${product.id}`}>
                <Card className="py-0 overflow-hidden h-full">
                  <div className="relative overflow-hidden aspect-square">
                    <Image
                      src={product.primary_image.url || "/placeholder.svg"}
                      alt={product.name}
                      fill
                    />
                  </div>

                  <CardHeader>
                    <CardTitle className="mb-2 line-clamp-2">
                      {product.name}
                    </CardTitle>
                    <CardDescription className="line-clamp-3">
                      {product.price}
                    </CardDescription>
                  </CardHeader>

                  {/* <CardContent className="pt-0 mt-auto">
                    <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        <span>
                          {new Date(product.createdAt).toLocaleDateString(
                            "en-US",
                            {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            },
                          )}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        <span>{`${product.readTime} min read`}</span>
                      </div>
                    </div>
                  </CardContent> */}
                </Card>
              </Link>
            </CarouselItem>
          ))}
        </CarouselContent>
        {/* <CarouselPrevious className="hidden md:flex top-1/2 -left-12" />
        <CarouselNext className="hidden md:flex top-1/2 -right-12" /> */}
        <CarouselPrevious className="top-1/3 left-3 md:flex md:top-1/2 md:-left-12" />
        <CarouselNext className="top-1/3 right-3 md:flex md:top-1/2 md:-right-12" />
      </Carousel>

      <div className="text-center mt-8">
        <Link href="/products">
          <Button variant="outline">View All Products</Button>
        </Link>
      </div>
    </section>
  );
}
