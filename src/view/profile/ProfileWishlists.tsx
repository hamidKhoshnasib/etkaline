"use client";

import { useState } from "react";
import { Plus, Trash2, Heart, ChevronRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/ui/ProductCard";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

interface WishlistProduct {
  id: number;
  image: string;
  title: string;
  price: number;
  originalPrice: number;
  discount: number;
}

interface Wishlist {
  key: string;
  label: string;
  products: WishlistProduct[];
}

const PRODUCT_TITLE = "ماشین ظرفشویی ۱۴ نفره بوش مدل SMS6ZCI85M";
const PRODUCT_IMAGE = "https://via.placeholder.com/180x190?text=Product";

function makeProducts(count: number): WishlistProduct[] {
  return Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    image: PRODUCT_IMAGE,
    title: PRODUCT_TITLE,
    price: 580_000_000,
    originalPrice: 680_000_000,
    discount: 30,
  }));
}

const initialLists: Wishlist[] = [
  { key: "favorites", label: "علاقه‌مندی‌ها", products: makeProducts(5) },
  { key: "later", label: "بعداً می‌خرم", products: makeProducts(3) },
];

export function ProfileWishlists() {
  const [lists, setLists] = useState<Wishlist[]>(initialLists);
  const [activeKey, setActiveKey] = useState("favorites");
  const [deleteListOpen, setDeleteListOpen] = useState(false);
  const [addListOpen, setAddListOpen] = useState(false);
  const [newListName, setNewListName] = useState("");

  const activeList = lists.find((l) => l.key === activeKey) ?? lists[0];

  function handleAddList() {
    const trimmed = newListName.trim();
    if (!trimmed) {
      return;
    }
    const key = `list_${Date.now()}`;
    setLists((prev) => [...prev, { key, label: trimmed, products: [] }]);
    setActiveKey(key);
    setNewListName("");
    setAddListOpen(false);
  }

  function handleDeleteList() {
    const remaining = lists.filter((l) => l.key !== activeKey);
    setLists(remaining);
    if (remaining.length > 0) {
      setActiveKey(remaining[0].key);
    }
    setDeleteListOpen(false);
  }

  return (
    <div className="flex flex-col gap-4">
      {/* Mobile back header */}
      <div className="relative flex items-center justify-center py-1 md:hidden">
        <Link href="/profile" className="text-muted-foreground absolute inset-s-0 p-1">
          <ChevronRight className="size-5" />
        </Link>
        <h1 className="font-bold">لیست‌های من</h1>
      </div>

      {/* Desktop header */}
      <div className="hidden items-center justify-between md:flex">
        <Button
          variant="outline"
          onClick={() => setAddListOpen(true)}
          className="border-primary text-primary hover:bg-primary/5 hover:text-primary gap-1.5"
        >
          <Plus className="size-4" />
          افزودن لیست
        </Button>
        <h2 className="text-lg font-bold">لیست‌های من</h2>
      </div>

      {/* Delete actions */}
      <div className="flex flex-col items-start gap-1.5">
        <Button
          onClick={() => setDeleteListOpen(true)}
          className="h-8 gap-1.5 bg-slate-800 px-3 text-white hover:bg-slate-700"
        >
          حذف
        </Button>
        <button
          onClick={() => setDeleteListOpen(true)}
          className="text-muted-foreground hover:bg-destructive/10 hover:text-destructive flex size-8 items-center justify-center rounded-md transition-colors"
        >
          <Trash2 className="size-4" />
        </button>
      </div>

      {/* Tabs */}
      <div className="border-b">
        <div className="flex">
          {lists.map((list) => (
            <button
              key={list.key}
              onClick={() => setActiveKey(list.key)}
              className={cn(
                "px-4 py-2.5 text-sm font-medium transition-colors",
                activeKey === list.key
                  ? "border-primary text-primary -mb-px border-b-2"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              {list.label}
            </button>
          ))}
        </div>
      </div>

      {/* Products grid */}
      {activeList.products.length > 0 ? (
        <div className="grid grid-cols-5 gap-3">
          {activeList.products.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>
      ) : (
        <div className="bg-card text-muted-foreground flex flex-col items-center justify-center rounded-xl border py-16">
          <Heart className="mb-3 size-10 opacity-30" />
          <p className="text-sm">این لیست خالی است</p>
        </div>
      )}

      {/* Add List Modal */}
      <Dialog open={addListOpen} onOpenChange={setAddListOpen}>
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle>افزودن لیست جدید</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="list-name">نام لیست</Label>
            <Input
              id="list-name"
              value={newListName}
              onChange={(e) => setNewListName(e.target.value)}
              placeholder="مثلاً: لوازم آشپزخانه"
            />
          </div>
          <DialogFooter>
            <Button onClick={handleAddList} disabled={!newListName.trim()}>
              افزودن
            </Button>
            <Button variant="outline" onClick={() => setAddListOpen(false)}>
              انصراف
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete List Confirmation Modal */}
      <Dialog open={deleteListOpen} onOpenChange={setDeleteListOpen}>
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle>حذف لیست</DialogTitle>
            <DialogDescription>
              آیا مطمئن هستید که می‌خواهید لیست «{activeList.label}» را حذف کنید؟ این عملیات قابل
              بازگشت نیست.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="destructive" onClick={handleDeleteList}>
              حذف لیست
            </Button>
            <Button variant="outline" onClick={() => setDeleteListOpen(false)}>
              انصراف
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
