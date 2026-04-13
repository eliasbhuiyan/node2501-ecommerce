"use client";

import { useMemo, useState } from "react";
import CartItemRow from "@/components/cart/CartItemRow";
import PageContainer from "@/components/layout/PageContainer";
import { cartItems } from "@/data/cart";
import { formatCurrency, getDiscountedPrice } from "@/lib/price";

export default function CartPage() {
  const [items, setItems] = useState(cartItems);

  const subtotal = useMemo(
    () =>
      items.reduce(
        (sum, item) => sum + getDiscountedPrice(item.product) * item.quantity,
        0,
      ),
    [items],
  );

  const shipping = items.length === 0 || subtotal > 150 ? 0 : 12;
  const total = subtotal + shipping;

  function incrementQuantity(itemId) {
    setItems((prevItems) =>
      prevItems.map((item) => {
        if (item.id !== itemId) {
          return item;
        }

        const nextQuantity = Math.min(item.quantity + 1, item.variant.stock);
        return { ...item, quantity: nextQuantity };
      }),
    );
  }

  function decrementQuantity(itemId) {
    setItems((prevItems) =>
      prevItems.map((item) => {
        if (item.id !== itemId) {
          return item;
        }

        const nextQuantity = Math.max(item.quantity - 1, 1);
        return { ...item, quantity: nextQuantity };
      }),
    );
  }

  function removeItem(itemId) {
    setItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
  }

  return (
    <PageContainer className="pt-10 sm:pt-14">
      <h1 className="text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">
        Your Cart
      </h1>

      <div className="mt-8 grid gap-8 lg:grid-cols-[1.35fr_1fr]">
        <section className="space-y-4">
          {items.length > 0 ? (
            items.map((item) => (
              <CartItemRow
                key={item.id}
                item={item}
                onIncrement={() => incrementQuantity(item.id)}
                onDecrement={() => decrementQuantity(item.id)}
                onRemove={() => removeItem(item.id)}
              />
            ))
          ) : (
            <div className="rounded-3xl border border-slate-200 bg-white px-6 py-10 text-center">
              <h3 className="text-lg font-black text-slate-900">Your cart is empty</h3>
              <p className="mt-2 text-sm text-slate-600">
                Add products from the shop to continue.
              </p>
            </div>
          )}
        </section>

        <aside className="h-fit rounded-4xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <h2 className="text-xl font-black tracking-tight text-slate-900">Summary</h2>

          <div className="mt-6 space-y-3 text-sm text-slate-600">
            <div className="flex items-center justify-between">
              <span>Subtotal</span>
              <span className="font-semibold text-slate-900">
                {formatCurrency(subtotal)}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span>Shipping</span>
              <span className="font-semibold text-slate-900">
                {shipping === 0 ? "Free" : formatCurrency(shipping)}
              </span>
            </div>
            <div className="flex items-center justify-between border-t border-slate-200 pt-3 text-base">
              <span className="font-bold text-slate-900">Total</span>
              <span className="font-black text-slate-900">
                {formatCurrency(total)}
              </span>
            </div>
          </div>

          <button
            type="button"
            className="mt-6 w-full rounded-xl bg-orange-500 px-4 py-3 text-sm font-bold text-white transition hover:bg-orange-600"
          >
            Proceed to Checkout
          </button>
        </aside>
      </div>
    </PageContainer>
  );
}
