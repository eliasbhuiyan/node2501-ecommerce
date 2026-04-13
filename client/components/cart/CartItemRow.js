import { formatCurrency, getDiscountedPrice } from "@/lib/price";

export default function CartItemRow({ item, onIncrement, onDecrement, onRemove }) {
  const unitPrice = getDiscountedPrice(item.product);
  const totalPrice = unitPrice * item.quantity;
  const isMin = item.quantity <= 1;
  const isMax = item.quantity >= item.variant.stock;

  return (
    <article className="grid gap-4 rounded-3xl border border-slate-200 bg-white p-4 sm:grid-cols-[96px_1fr_auto] sm:items-center sm:gap-6 sm:p-5">
      <img
        src={item.product.thumbnail}
        alt={item.product.title}
        className="h-24 w-24 rounded-2xl object-cover"
      />

      <div className="space-y-1">
        <h3 className="text-base font-extrabold text-slate-900">
          {item.product.title}
        </h3>
        <p className="text-sm text-slate-600">Color: {item.variant.color}</p>
        <p className="text-sm text-slate-600">Size: {item.variant.size.toUpperCase()}</p>
        <div className="mt-2 flex items-center gap-3">
          <button
            type="button"
            onClick={onDecrement}
            disabled={isMin}
            className="h-8 w-8 rounded-lg border border-slate-300 text-sm font-bold text-slate-700 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-40"
          >
            -
          </button>
          <span className="min-w-8 text-center text-sm font-bold text-slate-900">
            {item.quantity}
          </span>
          <button
            type="button"
            onClick={onIncrement}
            disabled={isMax}
            className="h-8 w-8 rounded-lg border border-slate-300 text-sm font-bold text-slate-700 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-40"
          >
            +
          </button>
          <span className="text-xs text-slate-500">Stock: {item.variant.stock}</span>
        </div>
      </div>

      <div className="space-y-2 text-right">
        <p className="text-base font-black text-slate-900">{formatCurrency(totalPrice)}</p>
        <button
          type="button"
          onClick={onRemove}
          className="text-xs font-semibold text-rose-600 transition hover:text-rose-700"
        >
          Delete
        </button>
      </div>
    </article>
  );
}
