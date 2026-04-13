import { notFound } from "next/navigation";
import AdminPageHeader from "@/components/admin/AdminPageHeader";
import { getAdminUserById } from "@/data/adminUsers";

export default async function UpdateUserPage({ params }) {
  const routeParams = await params;
  const user = getAdminUserById(routeParams.id);

  if (!user) {
    notFound();
  }

  return (
    <>
      <AdminPageHeader
        title="Update User"
        description={`Editing ${user.name}`}
      />

      <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
        <form className="grid gap-4 md:grid-cols-2">
          <label className="space-y-2">
            <span className="text-sm font-semibold text-slate-700">Full Name</span>
            <input defaultValue={user.name} className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm" />
          </label>

          <label className="space-y-2">
            <span className="text-sm font-semibold text-slate-700">Email</span>
            <input defaultValue={user.email} className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm" />
          </label>

          <label className="space-y-2">
            <span className="text-sm font-semibold text-slate-700">Phone</span>
            <input defaultValue={user.phone} className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm" />
          </label>

          <label className="space-y-2">
            <span className="text-sm font-semibold text-slate-700">Role</span>
            <select defaultValue={user.role} className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm">
              <option value="customer">Customer</option>
              <option value="manager">Manager</option>
              <option value="admin">Admin</option>
            </select>
          </label>

          <label className="space-y-2">
            <span className="text-sm font-semibold text-slate-700">Status</span>
            <select defaultValue={user.status} className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm">
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </label>

          <label className="space-y-2">
            <span className="text-sm font-semibold text-slate-700">Joined Date</span>
            <input defaultValue={user.joinedAt} className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm" />
          </label>

          <label className="space-y-2 md:col-span-2">
            <span className="text-sm font-semibold text-slate-700">Primary Address</span>
            <input defaultValue={user.addresses[0] || ""} className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm" />
          </label>

          <div className="md:col-span-2 flex gap-3 pt-2">
            <button type="button" className="rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white">
              Update User
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
