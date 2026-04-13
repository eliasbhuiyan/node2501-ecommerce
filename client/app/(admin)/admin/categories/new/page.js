import AdminPageHeader from "@/components/admin/AdminPageHeader";

export default function CreateCategoryPage() {
  return (
    <>
      <AdminPageHeader
        title="Create Category"
        description="Add a new category for storefront organization."
      />

      <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
        <form className="grid gap-4 md:grid-cols-2">
          <label className="space-y-2">
            <span className="text-sm font-semibold text-slate-700">Name</span>
            <input className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm" placeholder="Category name" />
          </label>

          <label className="space-y-2">
            <span className="text-sm font-semibold text-slate-700">Slug</span>
            <input className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm" placeholder="category-slug" />
          </label>

          <label className="space-y-2 md:col-span-2">
            <span className="text-sm font-semibold text-slate-700">Thumbnail URL</span>
            <input className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm" placeholder="https://..." />
          </label>

          <label className="space-y-2 md:col-span-2">
            <span className="text-sm font-semibold text-slate-700">Description</span>
            <textarea rows={4} className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm" placeholder="Short category description" />
          </label>

          <div className="md:col-span-2 flex gap-3 pt-2">
            <button type="button" className="rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white">
              Save Category
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
