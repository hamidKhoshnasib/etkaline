"use client";

import * as React from "react";
import Link from "next/link";
import { Plus, Refrigerator, ShoppingCart, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type CartPreviewItem = {
  id: number;
  name: string;
  color: string;
  quantity: number;
  price: number;
};

const INITIAL_ITEMS: CartPreviewItem[] = Array.from({ length: 12 }, (_, index) => ({
  id: index + 1,
  name: "یخچال فریزر سامسونگ ۳۶ اینچ ۲۸ فوت مکعبی درب فرانسوی با یخساز RF۲۸۷۲۰۲۵K",
  color: "سفید",
  quantity: 1,
  price: 17_500_000,
}));

function formatPrice(value: number) {
  return new Intl.NumberFormat("fa-IR").format(value);
}

export function HeaderCartSummary() {
  const [items, setItems] = React.useState(INITIAL_ITEMS);
  const itemCount = items.reduce((total, item) => total + item.quantity, 0);
  const totalPrice = items.reduce((total, item) => total + item.price * item.quantity, 0);

  function changeQuantity(itemId: number, amount: number) {
    setItems((current) =>
      current.map((item) =>
        item.id === itemId ? { ...item, quantity: Math.max(1, item.quantity + amount) } : item,
      ),
    );
  }

  function removeItem(itemId: number) {
    setItems((current) => current.filter((item) => item.id !== itemId));
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <button
            type="button"
            aria-label={`سبد خرید، ${itemCount} کالا`}
            className="text-secondary relative flex size-12.5 items-center justify-center"
          />
        }
      >
        <ShoppingCart className="size-5" strokeWidth={1.8} aria-hidden="true" />
        {itemCount > 0 && (
          <span className="bg-primary text-primary-foreground absolute inset-s-1 top-1 flex size-4 items-center justify-center rounded-full text-[10px] font-bold">
            {itemCount > 99 ? "۹۹+" : formatPrice(itemCount)}
          </span>
        )}
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        sideOffset={10}
        className="w-[400px] max-w-[calc(100vw-2rem)] overflow-hidden rounded-[28px] p-0"
      >
        <div className="flex items-center justify-between border-b px-6 py-5">
          <h2 className="text-secondary text-lg font-bold">سبد خرید</h2>
          <p className="text-secondary text-sm">{itemCount} کالا</p>
        </div>

        <div className="max-h-[min(470px,calc(100dvh-15rem))] space-y-2 overflow-y-auto bg-white px-4 py-3">
          {items.map((item) => (
            <article key={item.id} className="bg-muted/70 rounded-2xl p-3">
              <div className="flex gap-3">
                <div className="flex size-15 shrink-0 items-center justify-center rounded-lg border bg-white">
                  <Refrigerator
                    className="text-secondary/70 size-10"
                    strokeWidth={1.25}
                    aria-hidden="true"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="text-secondary line-clamp-2 text-sm leading-6 font-medium">
                    {item.name}
                  </h3>
                  <div className="text-secondary/70 mt-1 flex items-center gap-3 text-xs">
                    <span>رنگ: {item.color}</span>
                    <span>گارانتی اتکالاین</span>
                  </div>
                </div>
              </div>

              <div className="mt-3 flex items-center justify-between">
                <span className="text-secondary text-sm font-bold">
                  {formatPrice(item.price)} تومان
                </span>
                <div className="flex items-center gap-2">
                  <span className="min-w-4 text-center text-sm font-bold">
                    {formatPrice(item.quantity)}
                  </span>
                  <Button
                    type="button"
                    size="icon"
                    aria-label={`افزایش تعداد ${item.name}`}
                    onClick={() => changeQuantity(item.id, 1)}
                    className="bg-primary text-secondary hover:bg-primary/85 size-9 rounded-full"
                  >
                    <Plus />
                  </Button>
                  <Button
                    type="button"
                    size="icon"
                    variant="outline"
                    aria-label={`حذف ${item.name} از سبد خرید`}
                    onClick={() => removeItem(item.id)}
                    className="text-primary border-primary/30 hover:bg-primary/10 hover:text-primary size-9 rounded-full"
                  >
                    <Trash2 />
                  </Button>
                </div>
              </div>
            </article>
          ))}

          {items.length === 0 && (
            <p className="text-muted-foreground py-10 text-center">سبد خرید شما خالی است.</p>
          )}
        </div>

        <footer className="flex items-center justify-between border-t bg-white px-6 py-4">
          <div>
            <p className="text-secondary text-sm font-bold">
              مجموع: {formatPrice(totalPrice)} تومان
            </p>
            <p className="text-secondary/70 mt-1 text-xs">{itemCount} کالا</p>
          </div>
          <Button
            render={<Link href="/cart" />}
            disabled={items.length === 0}
            className="bg-primary text-secondary hover:bg-primary/85 h-11 rounded-full px-5"
          >
            تکمیل خرید
          </Button>
        </footer>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
