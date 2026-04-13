import Link from "next/link";
import PageContainer from "@/components/layout/PageContainer";

export default function CategoryGrid({ categories }) {
  return (
    <section className="mt-16">
      <PageContainer>
        <div className="mb-8 flex items-center justify-between gap-4">
          <h2 className="text-3xl font-black tracking-tight text-slate-900">
            Browse Categories
          </h2>
          <Link
            href="/shop"
            className="text-sm font-semibold text-orange-600 hover:text-orange-700"
          >
            View all products
          </Link>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((category) => (
            <Link
              key={category._id}
              href={`/shop?category=${category.slug}`}
              className="group overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="h-44 overflow-hidden">
                <img
                  src={category.thumbnail}
                  alt={category.name}
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                />
              </div>
              <div className="space-y-2 p-5">
                <h3 className="text-lg font-extrabold text-slate-900">
                  {category.name}
                </h3>
                <p className="text-sm text-slate-600">{category.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </PageContainer>
    </section>
  );
}
