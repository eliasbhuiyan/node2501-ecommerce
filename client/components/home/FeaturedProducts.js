import Link from "next/link";
import PageContainer from "@/components/layout/PageContainer";
import ProductCard from "@/components/products/ProductCard";

export default function FeaturedProducts({ products, categories }) {
  const categoryMap = new Map(categories.map((category) => [category._id, category]));

  return (
    <section className="mt-16">
      <PageContainer>
        <div className="mb-8 flex items-center justify-between gap-4">
          <h2 className="text-3xl font-black tracking-tight text-slate-900">
            Featured Products
          </h2>
          <Link
            href="/shop"
            className="text-sm font-semibold text-orange-600 hover:text-orange-700"
          >
            Go to shop
          </Link>
        </div>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {products.map((product) => (
            <ProductCard
              key={product.slug}
              product={product}
              categoryName={categoryMap.get(product.category)?.name || "Category"}
            />
          ))}
        </div>
      </PageContainer>
    </section>
  );
}
