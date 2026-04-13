import { notFound } from "next/navigation";
import AdminPageHeader from "@/components/admin/AdminPageHeader";
import { categories } from "@/data/categories";
import { getProductBySlug } from "@/data/products";

export default async function UpdateProductPage({ params }) {
  const routeParams = await params;
  const product = getProductBySlug(routeParams.slug);

  if (!product) {
    notFound();
  }

  return (
    <>
      <AdminPageHeader
        title="Update Product"
        description={`Editing ${product.title}`}
      />

      <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
        <form className="grid gap-4 md:grid-cols-2">
          <label className="space-y-2 md:col-span-2">
            <span className="text-sm font-semibold text-slate-700">Title</span>
            <input defaultValue={product.title} className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm" />
          </label>

          <label className="space-y-2">
            <span className="text-sm font-semibold text-slate-700">Slug</span>
            <input defaultValue={product.slug} className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm" />
          </label>

          <label className="space-y-2">
            <span className="text-sm font-semibold text-slate-700">Category</span>
            <select defaultValue={product.category} className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm">
              {categories.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.name}
                </option>
              ))}
            </select>
          </label>

          <label className="space-y-2">
            <span className="text-sm font-semibold text-slate-700">Price</span>
            <input type="number" defaultValue={product.price} className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm" />
          </label>

          <label className="space-y-2">
            <span className="text-sm font-semibold text-slate-700">Discount</span>
            <input type="number" defaultValue={product.discountPercentage} className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm" />
          </label>

          <label className="space-y-2 md:col-span-2">
            <span className="text-sm font-semibold text-slate-700">Description</span>
            <textarea rows={4} defaultValue={product.description} className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm" />
          </label>

          <label className="space-y-2 md:col-span-2">
            <span className="text-sm font-semibold text-slate-700">Tags</span>
            <input defaultValue={product.tags.join(", ")} className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm" />
          </label>

          <div className="md:col-span-2">
            <p className="text-sm font-semibold text-slate-700">Variants</p>
            <div className="mt-2 space-y-2">
              {product.variants.map((variant) => (
                <div key={variant.sku} className="grid gap-2 rounded-xl border border-slate-200 bg-slate-50 p-3 sm:grid-cols-4">
                  <input defaultValue={variant.sku} className="rounded-lg border border-slate-200 px-3 py-2 text-sm" />
                  <input defaultValue={variant.color} className="rounded-lg border border-slate-200 px-3 py-2 text-sm" />
                  <input defaultValue={variant.size.toUpperCase()} className="rounded-lg border border-slate-200 px-3 py-2 text-sm" />
                  <input type="number" defaultValue={variant.stock} className="rounded-lg border border-slate-200 px-3 py-2 text-sm" />
                </div>
              ))}
            </div>
          </div>

          <div className="md:col-span-2 flex gap-3 pt-2">
            <button type="button" className="rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white">
              Update Product
            </button>
            <button type="button" className="rounded-xl border border-slate-200 px-5 py-2.5 text-sm font-semibold text-slate-700">
              Cancel
            </button>
          </div>
        </form>
      </section>
    </>
  );
}
