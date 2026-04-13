import Link from "next/link";
import AdminPageHeader from "@/components/admin/AdminPageHeader";
import { adminUsers } from "@/data/adminUsers";
import { formatCurrency } from "@/lib/price";

export default function UsersListPage() {
  return (
    <>
      <AdminPageHeader
        title="User List"
        description="View customer and admin account details."
      />

      <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead>
              <tr className="border-b border-slate-200 text-slate-500">
                <th className="py-2 pr-4">User</th>
                <th className="py-2 pr-4">Role</th>
                <th className="py-2 pr-4">Status</th>
                <th className="py-2 pr-4">Orders</th>
                <th className="py-2 pr-4">Spend</th>
                <th className="py-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {adminUsers.map((user) => (
                <tr key={user.id} className="border-b border-slate-100 text-slate-700 last:border-0">
                  <td className="py-3 pr-4">
                    <p className="font-semibold text-slate-900">{user.name}</p>
                    <p className="text-xs text-slate-500">{user.email}</p>
                  </td>
                  <td className="py-3 pr-4 capitalize">{user.role}</td>
                  <td className="py-3 pr-4 capitalize">{user.status}</td>
                  <td className="py-3 pr-4">{user.totalOrders}</td>
                  <td className="py-3 pr-4">{formatCurrency(user.totalSpend)}</td>
                  <td className="py-3">
                    <div className="flex items-center gap-3">
                      <Link href={`/admin/users/${user.id}`} className="text-xs font-semibold text-orange-600 hover:text-orange-700">
                        Details
                      </Link>
                      <Link href={`/admin/users/${user.id}/edit`} className="text-xs font-semibold text-slate-700 hover:text-slate-900">
                        Update
                      </Link>
                    </div>
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
