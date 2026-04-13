import AdminPageHeader from "@/components/admin/AdminPageHeader";
import { categories } from "@/data/categories";

export default function CreateProductPage() {
  return (
    <>
      <AdminPageHeader
        title="Create New Product"
        description="Design-only form using dummy fields based on your product schema."
      />

      <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
        <form className="grid gap-4 md:grid-cols-2">
          <label className="space-y-2 md:col-span-2">
            <span className="text-sm font-semibold text-slate-700">Title</span>
            <input className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm" placeholder="Enter product title" />
          </label>

          <label className="space-y-2">
            <span className="text-sm font-semibold text-slate-700">Slug</span>
            <input className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm" placeholder="product-slug" />
          </label>

          <label className="space-y-2">
            <span className="text-sm font-semibold text-slate-700">Category</span>
            <select className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm">
              {categories.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.name}
                </option>
              ))}
            </select>
          </label>

          <label className="space-y-2">
            <span className="text-sm font-semibold text-slate-700">Price</span>
            <input type="number" className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm" placeholder="0" />
          </label>

          <label className="space-y-2">
            <span className="text-sm font-semibold text-slate-700">Discount Percentage</span>
            <input type="number" className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm" placeholder="0" />
          </label>

          <label className="space-y-2 md:col-span-2">
            <span className="text-sm font-semibold text-slate-700">Description</span>
            <textarea rows={4} className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm" placeholder="Write product description" />
          </label>

          <label className="space-y-2 md:col-span-2">
            <span className="text-sm font-semibold text-slate-700">Tags (comma separated)</span>
            <input className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm" placeholder="hoodie, winter, street" />
          </label>

          <label className="space-y-2">
            <span className="text-sm font-semibold text-slate-700">Thumbnail URL</span>
            <input className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm" placeholder="https://..." />
          </label>

          <label className="space-y-2">
            <span className="text-sm font-semibold text-slate-700">Images URL(s)</span>
            <input className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm" placeholder="https://..., https://..." />
          </label>

          <div className="md:col-span-2">
            <p className="text-sm font-semibold text-slate-700">Variant Sample</p>
            <div className="mt-2 grid gap-3 rounded-xl border border-slate-200 bg-slate-50 p-3 sm:grid-cols-4">
              <input className="rounded-lg border border-slate-200 px-3 py-2 text-sm" placeholder="SKU" />
              <input className="rounded-lg border border-slate-200 px-3 py-2 text-sm" placeholder="Color" />
              <select className="rounded-lg border border-slate-200 px-3 py-2 text-sm">
                {['s', 'm', 'l', 'xl', '2xl', '3xl'].map((size) => (
                  <option key={size} value={size}>
                    {size.toUpperCase()}
                  </option>
                ))}
              </select>
              <input type="number" className="rounded-lg border border-slate-200 px-3 py-2 text-sm" placeholder="Stock" />
            </div>
          </div>

          <div className="md:col-span-2 flex gap-3 pt-2">
            <button type="button" className="rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white">
              Save Product
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
