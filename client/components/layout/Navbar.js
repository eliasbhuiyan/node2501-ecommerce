"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import PageContainer from "@/components/layout/PageContainer";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Shop", href: "/shop" },
  { label: "Cart", href: "/cart" },
  { label: "Profile", href: "/profile" },
  { label: "Admin", href: "/admin/dashboard" },
];

export default function Navbar() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentQuery = searchParams.get("query") || "";
  const preservedCategory = pathname === "/shop" ? searchParams.get("category") || "" : "";
  const preservedSort = pathname === "/shop" ? searchParams.get("sort") || "" : "";
  const preservedMaxPrice = pathname === "/shop" ? searchParams.get("maxPrice") || "" : "";

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/70 bg-white/85 backdrop-blur-xl">
      <PageContainer className="flex flex-wrap items-center justify-between gap-4 py-3">
        <Link href="/" className="text-2xl font-black tracking-tight text-slate-900">
          NEXA<span className="text-orange-500">MART</span>
        </Link>

        <form action="/shop" className="order-3 w-full md:order-2 md:max-w-xl md:flex-1">
          <div className="flex h-11 items-center gap-2 rounded-xl border border-slate-200 bg-white px-2">
            <input
              type="search"
              name="query"
              defaultValue={currentQuery}
              placeholder="Search products..."
              className="h-full w-full border-0 bg-transparent px-2 text-sm outline-none"
            />
            {preservedCategory ? (
              <input type="hidden" name="category" value={preservedCategory} />
            ) : null}
            {preservedSort ? <input type="hidden" name="sort" value={preservedSort} /> : null}
            {preservedMaxPrice ? (
              <input type="hidden" name="maxPrice" value={preservedMaxPrice} />
            ) : null}
            <button
              type="submit"
              className="rounded-lg bg-slate-900 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-slate-800"
            >
              Search
            </button>
          </div>
        </form>

        <nav className="order-4 flex w-full items-center gap-1 overflow-x-auto pb-1 md:order-4 md:pb-0">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;

            return (
              <Link
                key={link.href}
                href={link.href}
                className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                  isActive
                    ? "bg-slate-900 text-white"
                    : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="order-2 flex items-center gap-2 md:order-3">
          <Link
            href="/signin"
            className="rounded-full px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100"
          >
            Sign In
          </Link>
          <Link
            href="/signup"
            className="rounded-full bg-orange-500 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-orange-600"
          >
            Sign Up
          </Link>
        </div>
      </PageContainer>
    </header>
  );
}
