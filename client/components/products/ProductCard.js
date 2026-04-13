import Link from "next/link";
import { formatCurrency, getDiscountedPrice } from "@/lib/price";

export default function ProductCard({ product, categoryName }) {
  const discountedPrice = getDiscountedPrice(product);
  const hasDiscount = product.discountPercentage > 0;

  return (
    <article className="group overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
      <Link href={`/productdetails/${product.slug}`} className="block">
        <div className="relative h-64 overflow-hidden">
          <img
            src={product.thumbnail}
            alt={product.title}
            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          />
          {hasDiscount ? (
            <span className="absolute left-3 top-3 rounded-full bg-orange-500 px-3 py-1 text-xs font-bold text-white">
              -{product.discountPercentage}%
            </span>
          ) : null}
        </div>
      </Link>

      <div className="space-y-3 p-5">
        <p className="text-xs uppercase tracking-[0.18em] text-slate-400">
          {categoryName}
        </p>
        <Link
          href={`/productdetails/${product.slug}`}
          className="line-clamp-1 text-lg font-extrabold text-slate-900"
        >
          {product.title}
        </Link>
        <p className="line-clamp-2 text-sm text-slate-600">{product.description}</p>

        <div className="flex items-center gap-2 pt-1">
          <span className="text-lg font-black text-slate-900">
            {formatCurrency(discountedPrice)}
          </span>
          {hasDiscount ? (
            <span className="text-sm text-slate-400 line-through">
              {formatCurrency(product.price)}
            </span>
          ) : null}
        </div>
      </div>
    </article>
  );
}
