import {
  EllipsisVertical,
  Map,
  MapPin,
  Pencil,
  Plus,
  Smartphone,
  Trash2,
  UserRound,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardAction, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const MOCK_ADDRESSES = [
  {
    id: "address-1",
    title: "خانه",
    recipient: "محمدرضا چاهی",
    address: "بازار، خ پانزده خرداد، خ پامنار، بن‌بست قائم مقام",
    postalCode: "۶۷۷۴۵۷۴۴۷۶",
    phone: "۰۹۳۶۰۲۴۱۵۷۰",
  },
  {
    id: "address-2",
    title: "خانه",
    recipient: "محمدرضا چاهی",
    address: "بازار، خ پانزده خرداد، خ پامنار، بن‌بست قائم مقام",
    postalCode: "۶۷۷۴۵۷۴۴۷۶",
    phone: "۰۹۳۶۰۲۴۱۵۷۰",
  },
  {
    id: "address-3",
    title: "خانه",
    recipient: "محمدرضا چاهی",
    address: "بازار، خ پانزده خرداد، خ پامنار، بن‌بست قائم مقام",
    postalCode: "۶۷۷۴۵۷۴۴۷۶",
    phone: "۰۹۳۶۰۲۴۱۵۷۰",
  },
] as const;

function AddressInfoRow({
  icon: Icon,
  children,
}: {
  icon: typeof UserRound;
  children: React.ReactNode;
}) {
  return (
    <div className="text-muted-foreground flex min-h-6 items-center gap-2 text-sm">
      <Icon className="text-secondary/40 size-4 shrink-0" aria-hidden="true" />
      <span className="min-w-0 truncate">{children}</span>
    </div>
  );
}

function AddressActions({ defaultOpen = false }: { defaultOpen?: boolean }) {
  return (
    <DropdownMenu defaultOpen={defaultOpen}>
      <DropdownMenuTrigger
        render={
          <button
            type="button"
            aria-label="مدیریت آدرس"
            className="text-muted-foreground hover:bg-muted rounded-lg p-1.5"
          />
        }
      >
        <EllipsisVertical aria-hidden="true" />
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="start"
        side="inline-start"
        sideOffset={4}
        className="min-w-28 rounded-lg p-0"
      >
        <DropdownMenuGroup>
          <DropdownMenuItem className="min-h-10 cursor-pointer justify-between rounded-none px-3">
            <span>ویرایش</span>
            <Pencil aria-hidden="true" />
          </DropdownMenuItem>
          <DropdownMenuSeparator className="my-0" />
          <DropdownMenuItem
            variant="destructive"
            className="min-h-10 cursor-pointer justify-between rounded-none px-3"
          >
            <span>حذف</span>
            <Trash2 aria-hidden="true" />
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export function AddressesView() {
  return (
    <section className="bg-muted/60 min-h-full px-4 py-6 lg:bg-transparent lg:px-0 lg:py-0">
      <div className="mb-5 flex items-center justify-between gap-4">
        <h1 className="text-secondary text-lg font-bold">آدرس‌های من</h1>
        <Button
          type="button"
          variant="outline"
          size="lg"
          className="border-primary-hover text-primary-hover bg-transparent"
        >
          <Plus data-icon="inline-start" />
          افزودن آدرس جدید
        </Button>
      </div>

      <div className="flex flex-col gap-5">
        {MOCK_ADDRESSES.map((address, index) => (
          <Card key={address.id} className="min-h-48 gap-2 rounded-xl py-0 shadow-none">
            <CardHeader className="grid grid-cols-[1fr_auto] items-start px-5 pt-5 pb-0">
              <CardTitle className="text-secondary font-bold">{address.title}</CardTitle>
              <CardAction className="col-start-2 row-start-1">
                <AddressActions defaultOpen={index === 0} />
              </CardAction>
            </CardHeader>
            <CardContent className="flex flex-col px-5 pb-5">
              <AddressInfoRow icon={UserRound}>گیرنده: {address.recipient}</AddressInfoRow>
              <AddressInfoRow icon={MapPin}>{address.address}</AddressInfoRow>
              <AddressInfoRow icon={Map}>
                <bdi dir="ltr">{address.postalCode}</bdi>
              </AddressInfoRow>
              <AddressInfoRow icon={Smartphone}>
                <bdi dir="ltr">{address.phone}</bdi>
              </AddressInfoRow>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
