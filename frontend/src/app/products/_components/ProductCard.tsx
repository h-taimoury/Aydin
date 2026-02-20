import Link from "next/link";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";

type ProductCardProps = {
  id: number | string;
  name: string;
  price?: string | number | null;
  primaryImageUrl?: string | null;
};

export function ProductCard({
  id,
  name,
  price,
  primaryImageUrl,
}: ProductCardProps) {
  return (
    <Link href={`/products/${id}`} className="block">
      <Card className="group overflow-hidden transition hover:shadow-md">
        <div className="relative aspect-square w-full bg-muted">
          {primaryImageUrl ? (
            <Image
              src={primaryImageUrl}
              alt={name}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 25vw"
              //   Todo: Remove this for production, only for local development with unoptimized images from Django.
              unoptimized
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-sm text-muted-foreground">
              No image
            </div>
          )}
        </div>

        <CardContent className="space-y-1 p-4">
          <div className="line-clamp-1 font-medium">{name}</div>
          {price !== undefined && price !== null && price !== "" ? (
            <div className="text-sm text-muted-foreground">
              {typeof price === "number" ? `${price}` : price}
            </div>
          ) : (
            <div className="text-sm text-muted-foreground">
              Contact for price
            </div>
          )}
        </CardContent>
      </Card>
    </Link>
  );
}
