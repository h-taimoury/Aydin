import { ProductCard } from "./_components/ProductCard";

import products from "../../../public/data/products.json";

type ProductListItem = {
  id: number;
  name: string;
  price: string | number | null;
  primary_image: null | {
    id: number;
    url: string;
    alt_text?: string;
  };
};

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:8000";

async function getProducts(): Promise<ProductListItem[]> {
  const res = await fetch(`${API_BASE_URL}/api/products/`, {
    // For a catalog, you can cache a bit later.
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }

  return res.json();
}

export default async function ProductsPage() {
  //   const products = await getProducts();

  return (
    <main className="mx-auto max-w-6xl p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold">Products</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Explore our available materials and finishes.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {products.map((p) => (
          <ProductCard
            key={p.id}
            id={p.id}
            name={p.name}
            price={p.price}
            primaryImageUrl={p.primary_image?.url ?? null}
          />
        ))}
      </div>
    </main>
  );
}
