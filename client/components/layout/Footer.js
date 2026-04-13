import Link from "next/link";
import PageContainer from "@/components/layout/PageContainer";

export default function Footer() {
  return (
    <footer className="mt-20 border-t border-slate-200 bg-white">
      <PageContainer className="flex flex-col gap-4 py-10 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between">
        <p>© {new Date().getFullYear()} NexaMart. Crafted for modern shopping.</p>
        <div className="flex items-center gap-4 font-medium">
          <Link href="/shop" className="hover:text-slate-800">
            Shop
          </Link>
          <Link href="/profile" className="hover:text-slate-800">
            Profile
          </Link>
          <Link href="/cart" className="hover:text-slate-800">
            Cart
          </Link>
        </div>
      </PageContainer>
    </footer>
  );
}
