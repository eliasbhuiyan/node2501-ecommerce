"use client"
import AdminSideNav from "@/components/admin/AdminSideNav";
import "../globals.css";
import { ApiProvider } from "@reduxjs/toolkit/query/react";
import { adminApiService } from "./services/api";

export default function AdminLayout({ children }) {
  return (
    <div className="min-h-full bg-slate-50 text-slate-900 p-10">
      <div className="pointer-events-none fixed inset-0 -z-10 opacity-70 [background:radial-gradient(circle_at_20%_15%,rgba(251,146,60,0.18),transparent_38%),radial-gradient(circle_at_80%_25%,rgba(56,189,248,0.13),transparent_34%),radial-gradient(circle_at_50%_100%,rgba(148,163,184,0.12),transparent_40%)]" />
      <div className="flex">
        <AdminSideNav />
        <main className="container">
          <ApiProvider api={adminApiService}>{children}</ApiProvider>
        </main>
      </div>
    </div>
  );
}
