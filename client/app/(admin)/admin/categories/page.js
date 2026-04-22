"use client";
import Link from "next/link";
import AdminPageHeader from "@/components/admin/AdminPageHeader";
import { categories } from "@/data/categories";
import { products } from "@/data/products";
import { useGetCategoriesQuery } from "../../services/api";
import Image from "next/image";

export default function CategoriesListPage() {
  const { data } = useGetCategoriesQuery();
  console.log(data);

  return (
    <>
      <AdminPageHeader
        title="Category List"
        description="Manage category structure and catalog grouping."
        action={
          <Link
            href="/admin/categories/new"
            className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800"
          >
            Create Category
          </Link>
        }
      />

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3 mt-10">
        {data?.data.map((category) => {
          const count = products.filter(
            (product) => product.category === category._id,
          ).length;

          return (
            <article
              key={category._id}
              className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm"
            >
              <Image
                width={200}
                height={200}
                src={category.thumbnail}
                alt={category.name}
                className="h-40 w-full object-contain"
              />
              <div className="space-y-2 p-5">
                <h3 className="text-xl font-black tracking-tight text-slate-900 capitalize">
                  {category.name}
                </h3>
                <p className="text-sm text-slate-600">{category.description}</p>
                <p className="pt-1 text-xs uppercase tracking-[0.14em] text-slate-500">
                  {count} Products
                </p>
              </div>
            </article>
          );
        })}
      </section>
    </>
  );
}
