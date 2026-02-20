import { ProductGallery } from "./_components/ProductGallery";
import products from "../../../../public/data/product-details.json";

type ApiProductImage = {
  id: number;
  url: string;
  alt_text?: string;
  is_primary?: boolean;
  order?: number;
};

type ApiProduct = {
  id: number;
  name: string;
  description: string;
  price: string | number | null;
  specifications: Record<string, any>;
  images: ApiProductImage[];
};

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:8000";

async function getProduct(id: string): Promise<ApiProduct> {
  const res = await fetch(`${API_BASE_URL}/api/products/${id}/`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch product ${id}`);
  }

  return res.json();
}

type ProductPageProps = {
  params: Promise<{ id: string }>;
};
export default async function ProductDetailPage({ params }: ProductPageProps) {
  const { id } = await params;
  // const product = await getProduct(id);
  const product = products.find((p) => p.id === parseInt(id));
  const galleryImages =
    product.images?.length > 0
      ? product.images.map((img) => ({
          src: img.url,
          alt: img.alt_text || product.name,
        }))
      : [];

  return (
    <div className="mx-auto max-w-5xl p-6">
      <div className="grid gap-8 md:grid-cols-2">
        <ProductGallery images={galleryImages} />

        <div>
          <h1 className="text-2xl font-semibold">{product.name}</h1>

          {product.price ? (
            <p className="mt-2 text-lg font-medium">{product.price} $</p>
          ) : (
            <p className="mt-2 text-muted-foreground">Contact for price</p>
          )}

          <p className="mt-2 text-muted-foreground">{product.description}</p>
          {/* Specifications Section */}
          {product.specifications &&
            Object.keys(product.specifications).length > 0 && (
              <div className="mt-6 rounded-lg border p-4">
                <h2 className="text-lg font-semibold mb-3">Specifications</h2>
                <dl className="space-y-2">
                  {Object.entries(product.specifications).map(
                    ([key, value]) => (
                      <div key={key} className="flex text-sm">
                        <dt className="font-medium min-w-[140px] text-foreground">
                          {key}:
                        </dt>
                        <dd className="text-muted-foreground">{value}</dd>
                      </div>
                    ),
                  )}
                </dl>
              </div>
            )}
          {/* price + shipping + contact CTA here */}
        </div>
      </div>
    </div>
  );
}
