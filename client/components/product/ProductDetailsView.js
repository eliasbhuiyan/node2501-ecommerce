import { formatCurrency, getDiscountedPrice } from "@/lib/price";

export default function ProductDetailsView({ product, categoryName }) {
  const finalPrice = getDiscountedPrice(product);

  return (
    <section className="grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:items-start">
      <div className="space-y-4">
        <div className="overflow-hidden rounded-4xl border border-slate-200 bg-white">
          <img
            src={product.images[0] || product.thumbnail}
            alt={product.title}
            className="h-[460px] w-full object-cover"
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          {product.images.slice(0, 2).map((image, index) => (
            <div
              key={`${product.slug}-${index}`}
              className="overflow-hidden rounded-2xl border border-slate-200 bg-white"
            >
              <img
                src={image}
                alt={`${product.title} preview ${index + 1}`}
                className="h-36 w-full object-cover"
              />
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-4xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <p className="text-xs uppercase tracking-[0.18em] text-slate-400">
          {categoryName}
        </p>
        <h1 className="mt-3 text-3xl font-black tracking-tight text-slate-900">
          {product.title}
        </h1>
        <p className="mt-4 text-slate-600">{product.description}</p>

        <div className="mt-6 flex items-center gap-3">
          <span className="text-3xl font-black text-slate-900">
            {formatCurrency(finalPrice)}
          </span>
          {product.discountPercentage > 0 ? (
            <span className="text-base text-slate-400 line-through">
              {formatCurrency(product.price)}
            </span>
          ) : null}
        </div>

        <div className="mt-7 space-y-4">
          <div>
            <p className="mb-2 text-sm font-bold text-slate-800">Available Variants</p>
            <div className="flex flex-wrap gap-2">
              {product.variants.map((variant) => (
                <span
                  key={variant.sku}
                  className="rounded-full border border-slate-200 px-3 py-1 text-xs font-semibold text-slate-700"
                >
                  {variant.color} • {variant.size.toUpperCase()} • Stock {variant.stock}
                </span>
              ))}
            </div>
          </div>

          <div>
            <p className="mb-2 text-sm font-bold text-slate-800">Tags</p>
            <div className="flex flex-wrap gap-2">
              {product.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8 flex flex-wrap items-center gap-3">
          <button
            type="button"
            className="rounded-full bg-slate-900 px-6 py-3 text-sm font-bold text-white transition hover:bg-slate-800"
          >
            Add to Cart
          </button>
          <button
            type="button"
            className="rounded-full border border-slate-200 px-6 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50"
          >
            Save for Later
          </button>
        </div>
      </div>
    </section>
  );
}
