import { notFound } from "next/navigation";
import PageContainer from "@/components/layout/PageContainer";
import ProductDetailsView from "@/components/product/ProductDetailsView";
import ProductCard from "@/components/products/ProductCard";
import { categories } from "@/data/categories";
import { getProductBySlug, products } from "@/data/products";

export default async function ProductDetailsPage({ params }) {
  const routeParams = await params;
  const product = getProductBySlug(routeParams.slug);

  if (!product) {
    notFound();
  }

  const categoryMap = new Map(categories.map((item) => [item._id, item]));
  const relatedProducts = products
    .filter((item) => item.category === product.category && item.slug !== product.slug)
    .slice(0, 3);

  return (
    <PageContainer className="pt-10 sm:pt-14">
      <ProductDetailsView
        product={product}
        categoryName={categoryMap.get(product.category)?.name || "Category"}
      />

      <section className="mt-12">
        <h2 className="text-2xl font-black tracking-tight text-slate-900">
          You May Also Like
        </h2>
        <div className="mt-5 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {relatedProducts.map((item) => (
            <ProductCard
              key={item.slug}
              product={item}
              categoryName={categoryMap.get(item.category)?.name || "Category"}
            />
          ))}
        </div>
      </section>
    </PageContainer>
  );
}
