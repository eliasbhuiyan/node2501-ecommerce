import Link from "next/link";
import AdminPageHeader from "@/components/admin/AdminPageHeader";
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

export default function OrdersListPage() {
  const userMap = new Map(adminUsers.map((user) => [user.id, user]));

  return (
    <>
      <AdminPageHeader
        title="Order List"
        description="Track every order and jump into full details."
      />

      <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead>
              <tr className="border-b border-slate-200 text-slate-500">
                <th className="py-2 pr-4">Order</th>
                <th className="py-2 pr-4">Customer</th>
                <th className="py-2 pr-4">Date</th>
                <th className="py-2 pr-4">Status</th>
                <th className="py-2 pr-4">Payment</th>
                <th className="py-2 pr-4">Total</th>
                <th className="py-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {adminOrdersWithTotals.map((order) => (
                <tr key={order.id} className="border-b border-slate-100 text-slate-700 last:border-0">
                  <td className="py-3 pr-4 font-semibold text-slate-900">{order.id}</td>
                  <td className="py-3 pr-4">{userMap.get(order.userId)?.name || "Unknown"}</td>
                  <td className="py-3 pr-4">{toPrettyDate(order.createdAt)}</td>
                  <td className="py-3 pr-4 capitalize">{order.status}</td>
                  <td className="py-3 pr-4 capitalize">{order.paymentStatus}</td>
                  <td className="py-3 pr-4 font-semibold text-slate-900">
                    {formatCurrency(order.total)}
                  </td>
                  <td className="py-3">
                    <Link
                      href={`/admin/orders/${order.id}`}
                      className="text-xs font-semibold text-orange-600 hover:text-orange-700"
                    >
                      Order details
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}
