import Link from "next/link";
import AdminPageHeader from "@/components/admin/AdminPageHeader";
import AdminStatCard from "@/components/admin/AdminStatCard";
import { categories } from "@/data/categories";
import { products } from "@/data/products";
import { adminOrdersWithTotals } from "@/data/adminOrders";
import { adminUsers } from "@/data/adminUsers";
import { formatCurrency } from "@/lib/price";

function toPrettyDate(value) {
  return new Date(value).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export default function AdminDashboardPage() {
  const totalRevenue = adminOrdersWithTotals.reduce((sum, order) => sum + order.total, 0);
  const pendingOrders = adminOrdersWithTotals.filter(
    (order) => order.status === "pending" || order.status === "processing",
  ).length;
  const activeUsers = adminUsers.filter((user) => user.status === "active").length;
  const recentOrders = [...adminOrdersWithTotals]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 4);

    

  return (
    <>
      <AdminPageHeader
        title="Dashboard"
        description="Track sales, orders, and customers in one place."
        action={
          <Link
            href="/admin/products/new"
            className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800"
          >
            Create Product
          </Link>
        }
      />

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <AdminStatCard
          label="Total Revenue"
          value={formatCurrency(totalRevenue)}
          helper="From all dummy orders"
        />
        <AdminStatCard label="Orders" value={String(adminOrdersWithTotals.length)} helper="Across all statuses" />
        <AdminStatCard label="Pending" value={String(pendingOrders)} helper="Needs fulfillment" />
        <AdminStatCard label="Active Users" value={String(activeUsers)} helper="Customers and staff" />
      </section>

      <section className="grid gap-6 lg:grid-cols-[1.3fr_1fr]">
        <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="text-lg font-black text-slate-900">Recent Orders</h2>
          <div className="mt-4 overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead>
                <tr className="border-b border-slate-200 text-slate-500">
                  <th className="py-2 pr-4">Order</th>
                  <th className="py-2 pr-4">Date</th>
                  <th className="py-2 pr-4">Status</th>
                  <th className="py-2 pr-4">Total</th>
                  <th className="py-2">Action</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map((order) => (
                  <tr key={order.id} className="border-b border-slate-100 text-slate-700 last:border-0">
                    <td className="py-3 pr-4 font-semibold text-slate-900">{order.id}</td>
                    <td className="py-3 pr-4">{toPrettyDate(order.createdAt)}</td>
                    <td className="py-3 pr-4 capitalize">{order.status}</td>
                    <td className="py-3 pr-4 font-semibold text-slate-900">
                      {formatCurrency(order.total)}
                    </td>
                    <td className="py-3">
                      <Link
                        href={`/admin/orders/${order.id}`}
                        className="text-xs font-semibold text-orange-600 hover:text-orange-700"
                      >
                        View details
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="text-lg font-black text-slate-900">Catalog Overview</h2>
          <div className="mt-4 space-y-3 text-sm text-slate-700">
            <div className="flex items-center justify-between rounded-xl bg-slate-50 px-3 py-2">
              <span>Total Products</span>
              <span className="font-bold text-slate-900">{products.length}</span>
            </div>
            <div className="flex items-center justify-between rounded-xl bg-slate-50 px-3 py-2">
              <span>Total Categories</span>
              <span className="font-bold text-slate-900">{categories.length}</span>
            </div>
            <div className="flex items-center justify-between rounded-xl bg-slate-50 px-3 py-2">
              <span>Low Stock Variants</span>
              <span className="font-bold text-slate-900">
                {
                  products.flatMap((product) => product.variants).filter((variant) => variant.stock < 10)
                    .length
                }
              </span>
            </div>
          </div>

          <div className="mt-5 grid gap-2">
            <Link href="/admin/products" className="rounded-xl bg-slate-900 px-3 py-2 text-center text-sm font-semibold text-white">
              Manage Products
            </Link>
            <Link href="/admin/categories" className="rounded-xl bg-slate-100 px-3 py-2 text-center text-sm font-semibold text-slate-700 hover:bg-slate-200">
              Manage Categories
            </Link>
            <Link href="/admin/users" className="rounded-xl bg-slate-100 px-3 py-2 text-center text-sm font-semibold text-slate-700 hover:bg-slate-200">
              Manage Users
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
