import { notFound } from "next/navigation";
import AdminPageHeader from "@/components/admin/AdminPageHeader";
import { getOrderById } from "@/data/adminOrders";
import { getAdminUserById } from "@/data/adminUsers";
import { formatCurrency } from "@/lib/price";

function toPrettyDate(value) {
  return new Date(value).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export default async function OrderDetailsPage({ params }) {
  const routeParams = await params;
  const order = getOrderById(routeParams.id);

  if (!order) {
    notFound();
  }

  const customer = getAdminUserById(order.userId);

  return (
    <>
      <AdminPageHeader
        title="Order Details"
        description={`Viewing ${order.id}`}
      />

      <section className="grid gap-6 lg:grid-cols-[1.3fr_1fr]">
        <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="text-lg font-black text-slate-900">Items</h2>
          <div className="mt-4 overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead>
                <tr className="border-b border-slate-200 text-slate-500">
                  <th className="py-2 pr-4">Product</th>
                  <th className="py-2 pr-4">Qty</th>
                  <th className="py-2 pr-4">Unit Price</th>
                  <th className="py-2">Line Total</th>
                </tr>
              </thead>
              <tbody>
                {order.items.map((item) => (
                  <tr key={`${order.id}-${item.productSlug}`} className="border-b border-slate-100 text-slate-700 last:border-0">
                    <td className="py-3 pr-4 font-semibold text-slate-900">{item.title}</td>
                    <td className="py-3 pr-4">{item.quantity}</td>
                    <td className="py-3 pr-4">{formatCurrency(item.unitPrice)}</td>
                    <td className="py-3 font-semibold text-slate-900">
                      {formatCurrency(item.unitPrice * item.quantity)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="space-y-4">
          <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="text-lg font-black text-slate-900">Order Summary</h2>
            <div className="mt-3 space-y-2 text-sm text-slate-700">
              <p>
                <span className="font-semibold text-slate-900">Status:</span> {order.status}
              </p>
              <p>
                <span className="font-semibold text-slate-900">Payment:</span> {order.paymentStatus}
              </p>
              <p>
                <span className="font-semibold text-slate-900">Date:</span> {toPrettyDate(order.createdAt)}
              </p>
              <p>
                <span className="font-semibold text-slate-900">Total:</span> {formatCurrency(order.total)}
              </p>
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="text-lg font-black text-slate-900">Customer</h2>
            <div className="mt-3 space-y-2 text-sm text-slate-700">
              <p className="font-semibold text-slate-900">{customer?.name || "Unknown"}</p>
              <p>{customer?.email || "-"}</p>
              <p>{customer?.phone || "-"}</p>
              <p>{order.shippingAddress}</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
