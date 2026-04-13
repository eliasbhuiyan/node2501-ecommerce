import Link from "next/link";
import AdminPageHeader from "@/components/admin/AdminPageHeader";
import { categories } from "@/data/categories";
import { products } from "@/data/products";
import { formatCurrency, getDiscountedPrice } from "@/lib/price";

export default function AdminProductsPage() {
  const categoryMap = new Map(categories.map((category) => [category._id, category]));

  return (
    <>
      <AdminPageHeader
        title="Product List"
        description="Browse and manage all products in the catalog."
        action={
          <Link
            href="/admin/products/new"
            className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800"
          >
            Create New Product
          </Link>
        }
      />

      <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead>
              <tr className="border-b border-slate-200 text-slate-500">
                <th className="py-2 pr-4">Product</th>
                <th className="py-2 pr-4">Category</th>
                <th className="py-2 pr-4">Price</th>
                <th className="py-2 pr-4">Stock</th>
                <th className="py-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => {
                const totalStock = product.variants.reduce((sum, variant) => sum + variant.stock, 0);

                return (
                  <tr key={product.slug} className="border-b border-slate-100 text-slate-700 last:border-0">
                    <td className="py-3 pr-4">
                      <p className="font-semibold text-slate-900">{product.title}</p>
                      <p className="text-xs text-slate-500">{product.slug}</p>
                    </td>
                    <td className="py-3 pr-4">{categoryMap.get(product.category)?.name || "-"}</td>
                    <td className="py-3 pr-4">
                      <p className="font-semibold text-slate-900">
                        {formatCurrency(getDiscountedPrice(product))}
                      </p>
                      {product.discountPercentage > 0 ? (
                        <p className="text-xs text-slate-500 line-through">
                          {formatCurrency(product.price)}
                        </p>
                      ) : null}
                    </td>
                    <td className="py-3 pr-4">{totalStock}</td>
                    <td className="py-3">
                      <Link
                        href={`/admin/products/${product.slug}/edit`}
                        className="text-xs font-semibold text-orange-600 hover:text-orange-700"
                      >
                        Update product
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}
