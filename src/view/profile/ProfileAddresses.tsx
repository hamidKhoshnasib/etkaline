"use client";

import { useState } from "react";
import {
  MapPin,
  Plus,
  Trash2,
  Edit2,
  MoreVertical,
  Phone,
  User,
  Hash,
  ChevronRight,
} from "lucide-react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

type AddressLabel = "خانه" | "محل کار" | "سایر";

interface Address {
  id: number;
  label: AddressLabel;
  name: string;
  phone: string;
  address: string;
  postalCode: string;
}

const initialAddresses: Address[] = [
  {
    id: 1,
    label: "خانه",
    name: "محمدرضا چاهی",
    phone: "۰۹۳۶۰۲۴۱۵۷۰",
    address: "بازار، خ. پانزده خرداد، خ. پامنار، بن. قائم مقام",
    postalCode: "۶۷۷۴۵۷۴۴۷۶",
  },
  {
    id: 2,
    label: "محل کار",
    name: "محمدرضا چاهی",
    phone: "۰۲۱۴۴۵۵۶۶۷۷",
    address: "تهران، ونک، خ. ملاصدرا، پلاک ۱۲",
    postalCode: "۱۴۳۳۶۵۸۴۲۱",
  },
];

const LABELS: AddressLabel[] = ["خانه", "محل کار", "سایر"];

function emptyForm(): Omit<Address, "id"> {
  return { label: "خانه", name: "", phone: "", address: "", postalCode: "" };
}

export function ProfileAddresses() {
  const [addresses, setAddresses] = useState<Address[]>(initialAddresses);
  const [addOpen, setAddOpen] = useState(false);
  const [editTarget, setEditTarget] = useState<Address | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Address | null>(null);
  const [form, setForm] = useState<Omit<Address, "id">>(emptyForm());

  function openAdd() {
    setForm(emptyForm());
    setAddOpen(true);
  }

  function openEdit(addr: Address) {
    setForm({
      label: addr.label,
      name: addr.name,
      phone: addr.phone,
      address: addr.address,
      postalCode: addr.postalCode,
    });
    setEditTarget(addr);
  }

  function handleAdd() {
    setAddresses((prev) => [...prev, { ...form, id: Date.now() }]);
    setAddOpen(false);
  }

  function handleEdit() {
    if (!editTarget) {
      return;
    }
    setAddresses((prev) =>
      prev.map((a) => (a.id === editTarget.id ? { ...editTarget, ...form } : a)),
    );
    setEditTarget(null);
  }

  function handleDelete() {
    if (!deleteTarget) {
      return;
    }
    setAddresses((prev) => prev.filter((a) => a.id !== deleteTarget.id));
    setDeleteTarget(null);
  }

  return (
    <div className="flex flex-col gap-4">
      {/* Mobile back header */}
      <div className="relative flex items-center justify-center py-1 md:hidden">
        <Link href="/profile" className="text-muted-foreground absolute inset-s-0 p-1">
          <ChevronRight className="size-5" />
        </Link>
        <h1 className="font-bold">آدرس‌های من</h1>
      </div>

      {/* Desktop header */}
      <div className="hidden items-center justify-between md:flex">
        <Button
          variant="outline"
          onClick={openAdd}
          className="border-primary text-primary hover:bg-primary/5 hover:text-primary gap-1.5"
        >
          <Plus className="size-4" />
          افزودن آدرس جدید
        </Button>
        <h2 className="text-lg font-bold">آدرس‌های من</h2>
      </div>

      {/* Mobile add button */}
      <Button
        variant="outline"
        onClick={openAdd}
        className="border-primary text-primary hover:bg-primary/5 hover:text-primary gap-1.5 md:hidden"
      >
        <Plus className="size-4" />
        افزودن آدرس جدید
      </Button>

      <div className="flex flex-col gap-3">
        {addresses.map((addr) => (
          <Card key={addr.id}>
            <CardContent className="flex items-start gap-3 p-4">
              <div className="flex flex-1 flex-col gap-3">
                <h3 className="font-bold">{addr.label}</h3>
                <div className="text-muted-foreground flex flex-col gap-1.5 text-sm">
                  <div className="flex items-center gap-2">
                    <User className="size-4 shrink-0" />
                    <span>
                      گیرنده:
                      <span className="text-foreground"> {addr.name}</span>
                    </span>
                  </div>
                  <div className="flex items-start gap-2">
                    <MapPin className="mt-0.5 size-4 shrink-0" />
                    <span>{addr.address}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Hash className="size-4 shrink-0" />
                    <span className="tabular-nums">{addr.postalCode}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="size-4 shrink-0" />
                    <span className="tabular-nums">{addr.phone}</span>
                  </div>
                </div>
              </div>

              <DropdownMenu>
                <DropdownMenuTrigger className="text-muted-foreground hover:bg-muted hover:text-foreground flex size-7 shrink-0 cursor-pointer items-center justify-center rounded-md transition-colors">
                  <MoreVertical className="size-4" />
                </DropdownMenuTrigger>
                <DropdownMenuContent side="bottom" align="end">
                  <DropdownMenuItem onClick={() => openEdit(addr)}>
                    <Edit2 />
                    ویرایش
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem variant="destructive" onClick={() => setDeleteTarget(addr)}>
                    <Trash2 />
                    حذف
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </CardContent>
          </Card>
        ))}

        {addresses.length === 0 && (
          <div className="bg-card text-muted-foreground flex flex-col items-center justify-center rounded-xl border py-16">
            <MapPin className="mb-3 size-10 opacity-30" />
            <p className="text-sm">هیچ آدرسی ثبت نشده است</p>
          </div>
        )}
      </div>

      {/* Add Modal */}
      <Dialog open={addOpen} onOpenChange={setAddOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>افزودن آدرس جدید</DialogTitle>
          </DialogHeader>
          <AddressForm form={form} onChange={setForm} />
          <DialogFooter>
            <Button onClick={handleAdd} disabled={!form.name || !form.address || !form.phone}>
              افزودن
            </Button>
            <Button variant="outline" onClick={() => setAddOpen(false)}>
              انصراف
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Modal */}
      <Dialog
        open={!!editTarget}
        onOpenChange={(open) => {
          if (!open) {
            setEditTarget(null);
          }
        }}
      >
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>ویرایش آدرس</DialogTitle>
          </DialogHeader>
          <AddressForm form={form} onChange={setForm} />
          <DialogFooter>
            <Button onClick={handleEdit}>ذخیره تغییرات</Button>
            <Button variant="outline" onClick={() => setEditTarget(null)}>
              انصراف
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Modal */}
      <Dialog
        open={!!deleteTarget}
        onOpenChange={(open) => {
          if (!open) {
            setDeleteTarget(null);
          }
        }}
      >
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle>حذف آدرس</DialogTitle>
            <DialogDescription>
              آیا مطمئن هستید که می‌خواهید آدرس «{deleteTarget?.label}» را حذف کنید؟ این عملیات قابل
              بازگشت نیست.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="destructive" onClick={handleDelete}>
              حذف آدرس
            </Button>
            <Button variant="outline" onClick={() => setDeleteTarget(null)}>
              انصراف
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

function AddressForm({
  form,
  onChange,
}: {
  form: Omit<Address, "id">;
  onChange: (f: Omit<Address, "id">) => void;
}) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <Label>برچسب آدرس</Label>
        <div className="flex gap-2">
          {LABELS.map((l) => (
            <button
              key={l}
              type="button"
              onClick={() => onChange({ ...form, label: l })}
              className={cn(
                "rounded-lg border px-3 py-1.5 text-sm transition-colors",
                form.label === l
                  ? "border-primary bg-primary/10 text-primary font-medium"
                  : "border-border hover:bg-muted",
              )}
            >
              {l}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="addr-name">نام گیرنده</Label>
          <Input
            id="addr-name"
            value={form.name}
            onChange={(e) => onChange({ ...form, name: e.target.value })}
            placeholder="محمدرضا چاهی"
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="addr-phone">شماره تماس</Label>
          <Input
            id="addr-phone"
            value={form.phone}
            onChange={(e) => onChange({ ...form, phone: e.target.value })}
            placeholder="۰۹۱۲۳۴۵۶۷۸۹"
          />
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="addr-address">آدرس</Label>
        <Input
          id="addr-address"
          value={form.address}
          onChange={(e) => onChange({ ...form, address: e.target.value })}
          placeholder="استان، شهر، خیابان، کوچه، پلاک"
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="addr-postal">کد پستی</Label>
        <Input
          id="addr-postal"
          value={form.postalCode}
          onChange={(e) => onChange({ ...form, postalCode: e.target.value })}
          placeholder="۱۲۳۴۵۶۷۸۹۰"
        />
      </div>
    </div>
  );
}
