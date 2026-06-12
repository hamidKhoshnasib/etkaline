import { ProfileOrders } from "./ProfileOrders";
import { ProfileMobileHome } from "./ProfileMobileHome";
import type { Order, UserProfile } from "./types";
import tvImg from "@/assets/images/tv.png";
import washerImg from "@/assets/images/lebasshooee.png";
import gazImg from "@/assets/images/gaz.png";

const mockUser: UserProfile = {
  name: "محمدرضا",
  walletBalance: 304_562_500,
};

const mockDetail = {
  orderNumber: "۴۸۳۸۳۰۹۴۵۵",
  amount: 186_500_000,
  discount: 186_500_000,
  date: "۱۴۰۵/۰۲/۶۰۵ – ۱۸:۴۶",
  recipient: {
    name: "محمدرضا چاهی",
    phone: "۰۹۳۶۰۲۴۱۵۷۰",
    address: "بازار، خ. پانزده خرداد، خ. پامنار، بن. قائم مقام",
    postalCode: "۶۷۷۴۵۷۴۴۷۶",
  },
  shipping: {
    type: "سریع",
    cost: 186_500_000,
  },
  payment: {
    total: 186_500_000,
    afterDiscount: 186_500_000,
    gateway: "درگاه پرداخت",
    bank: "بانک ملت",
  },
  shipment: {
    itemCount: 3,
    trackingCode: "۲۳۱۶۸۴۶۸۵۱۶۵۱۶۸۵",
    date: "۱۴۰۵/۰۲/۶۰۵ – ۱۸:۴۶",
    currentStep: "در حال ارسال" as const,
    products: [
      {
        id: 1,
        image: tvImg.src,
        title: "ماشین ظرفشویی ۱۴ نفره بوش مدل SMS6ZCI85M",
        price: 186_500_000,
      },
      {
        id: 2,
        image: washerImg.src,
        title: "ماشین ظرفشویی ۱۴ نفره بوش مدل SMS6ZCI85M",
        price: 186_500_000,
        discount: 10_000_000,
      },
      {
        id: 3,
        image: gazImg.src,
        title: "ماشین ظرفشویی ۱۴ نفره بوش مدل SMS6ZCI85M",
        price: 186_500_000,
      },
    ],
  },
};

export const mockOrders: Order[] = [
  {
    id: 1,
    orderNumber: "۴۸۳۸۳۰۹۴۵۵",
    amount: 186_500_000,
    date: "۱۴۰۵/۰۲/۹۰۵ – ۱۸:۴۶",
    status: "در حال ارسال",
    products: [
      {
        id: 1,
        image: tvImg.src,
        title: "محصول ۱",
        price: 186_500_000,
      },
      {
        id: 2,
        image: washerImg.src,
        title: "محصول ۲",
        price: 186_500_000,
      },
      {
        id: 3,
        image: gazImg.src,
        title: "محصول ۳",
        price: 186_500_000,
      },
    ],
    detail: mockDetail,
  },
  {
    id: 2,
    orderNumber: "۴۸۳۸۳۰۹۴۵۵",
    amount: 186_500_000,
    date: "۱۴۰۵/۰۲/۹۰۵ – ۱۸:۴۶",
    status: "تحویل داده شده",
    products: [
      { id: 1, image: tvImg.src, title: "محصول ۱", price: 186_500_000 },
      {
        id: 2,
        image: washerImg.src,
        title: "محصول ۲",
        price: 186_500_000,
      },
    ],
    detail: { ...mockDetail, shipment: { ...mockDetail.shipment, currentStep: "تحویل داده شد" } },
  },
  {
    id: 3,
    orderNumber: "۴۸۳۸۳۰۹۴۵۵",
    amount: 186_500_000,
    date: "۱۴۰۵/۰۲/۹۰۵ – ۱۸:۴۶",
    status: "در حال ارسال",
    products: [
      {
        id: 1,
        image: tvImg.src,
        title: "محصول ۱",
        price: 186_500_000,
      },
      {
        id: 2,
        image: washerImg.src,
        title: "محصول ۲",
        price: 186_500_000,
      },
      {
        id: 3,
        image: gazImg.src,
        title: "محصول ۳",
        price: 186_500_000,
      },
    ],
    detail: mockDetail,
  },
  {
    id: 4,
    orderNumber: "۴۸۳۸۳۰۹۴۵۵",
    amount: 186_500_000,
    date: "۱۴۰۵/۰۲/۹۰۵ – ۱۸:۴۶",
    status: "تحویل داده شده",
    products: [
      {
        id: 1,
        image: tvImg.src,
        title: "محصول ۱",
        price: 186_500_000,
      },
    ],
    detail: { ...mockDetail, shipment: { ...mockDetail.shipment, currentStep: "تحویل داده شد" } },
  },
  {
    id: 5,
    orderNumber: "۴۸۳۸۳۰۹۴۵۵",
    amount: 186_500_000,
    date: "۱۴۰۵/۰۲/۹۰۵ – ۱۸:۴۶",
    status: "لغو شده",
    products: [
      {
        id: 1,
        image: tvImg.src,
        title: "محصول ۱",
        price: 186_500_000,
      },
      {
        id: 2,
        image: washerImg.src,
        title: "محصول ۲",
        price: 186_500_000,
      },
    ],
    detail: {
      ...mockDetail,
      shipment: { ...mockDetail.shipment, currentStep: "درحال آماده سازی" },
    },
  },
  {
    id: 6,
    orderNumber: "۴۸۳۸۳۰۹۴۵۵",
    amount: 186_500_000,
    date: "۱۴۰۵/۰۲/۹۰۵ – ۱۸:۴۶",
    status: "مرجوع شده",
    products: [
      {
        id: 1,
        image: tvImg.src,
        title: "محصول ۱",
        price: 186_500_000,
      },
    ],
    detail: { ...mockDetail, shipment: { ...mockDetail.shipment, currentStep: "ارسال شد" } },
  },
];

interface ProfileProps {
  orders?: Order[];
}

export default function Profile({ orders = mockOrders }: ProfileProps) {
  return (
    <>
      {/* mobile: profile home replaces orders (sidebar hidden) */}
      <div className="md:hidden">
        <ProfileMobileHome user={mockUser} orders={orders} />
      </div>
      {/* desktop: orders list */}
      <div className="hidden md:block">
        <ProfileOrders orders={orders} />
      </div>
    </>
  );
}
