import Link from "next/link";
import { notFound } from "next/navigation";
import AdminPageHeader from "@/components/admin/AdminPageHeader";
import { adminOrdersWithTotals } from "@/data/adminOrders";
import { getAdminUserById } from "@/data/adminUsers";
import { formatCurrency } from "@/lib/price";

export default async function UserDetailsPage({ params }) {
  const routeParams = await params;
  const user = getAdminUserById(routeParams.id);

  if (!user) {
    notFound();
  }

  const userOrders = adminOrdersWithTotals.filter((order) => order.userId === user.id);

  return (
    <>
      <AdminPageHeader
        title="User Details"
        description={`Viewing ${user.name}`}
        action={
          <Link
            href={`/admin/users/${user.id}/edit`}
            className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800"
          >
            Update User
          </Link>
        }
      />

      <section className="grid gap-6 lg:grid-cols-[1.15fr_1fr]">
        <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="text-lg font-black text-slate-900">Profile</h2>
          <div className="mt-4 space-y-2 text-sm text-slate-700">
            <p><span className="font-semibold text-slate-900">Name:</span> {user.name}</p>
            <p><span className="font-semibold text-slate-900">Email:</span> {user.email}</p>
            <p><span className="font-semibold text-slate-900">Phone:</span> {user.phone}</p>
            <p><span className="font-semibold text-slate-900">Role:</span> {user.role}</p>
            <p><span className="font-semibold text-slate-900">Status:</span> {user.status}</p>
            <p><span className="font-semibold text-slate-900">Joined:</span> {user.joinedAt}</p>
          </div>

          <h3 className="mt-5 text-sm font-bold uppercase tracking-[0.14em] text-slate-500">Addresses</h3>
          <div className="mt-2 space-y-2">
            {user.addresses.map((address) => (
              <div key={address} className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-700">
                {address}
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="text-lg font-black text-slate-900">Order Snapshot</h2>
          <div className="mt-3 space-y-2 text-sm text-slate-700">
            <p><span className="font-semibold text-slate-900">Total Orders:</span> {user.totalOrders}</p>
            <p><span className="font-semibold text-slate-900">Total Spend:</span> {formatCurrency(user.totalSpend)}</p>
          </div>

          <div className="mt-4 space-y-2">
            {userOrders.length > 0 ? (
              userOrders.map((order) => (
                <div key={order.id} className="rounded-xl border border-slate-200 px-3 py-2 text-sm text-slate-700">
                  <p className="font-semibold text-slate-900">{order.id}</p>
                  <p className="capitalize">{order.status}</p>
                  <p>{formatCurrency(order.total)}</p>
                </div>
              ))
            ) : (
              <p className="text-sm text-slate-600">No orders for this user.</p>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
