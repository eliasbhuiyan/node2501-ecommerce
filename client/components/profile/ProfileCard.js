import { formatCurrency } from "@/lib/price";

export default function ProfileCard({ user }) {
  return (
    <section className="grid gap-6 lg:grid-cols-[1.15fr_1fr]">
      <div className="rounded-4xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <p className="text-sm uppercase tracking-[0.16em] text-slate-400">Account</p>
        <h1 className="mt-3 text-3xl font-black tracking-tight text-slate-900">
          {user.name}
        </h1>
        <p className="mt-2 text-slate-600">{user.email}</p>

        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {user.addresses.map((address) => (
            <div
              key={address.id}
              className="rounded-2xl border border-slate-200 bg-slate-50 p-4"
            >
              <p className="text-sm font-bold text-slate-900">{address.label}</p>
              <p className="mt-2 text-sm text-slate-600">{address.value}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-4xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <h2 className="text-xl font-black tracking-tight text-slate-900">Recent Orders</h2>
        <div className="mt-5 space-y-3">
          {user.orders.map((order) => (
            <div
              key={order.id}
              className="rounded-2xl border border-slate-200 px-4 py-3"
            >
              <p className="text-xs uppercase tracking-[0.15em] text-slate-400">
                {order.id}
              </p>
              <p className="mt-1 text-sm font-semibold text-slate-900">
                {order.items} items • {formatCurrency(order.total)}
              </p>
              <p className="mt-1 text-sm text-emerald-600">{order.status}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
