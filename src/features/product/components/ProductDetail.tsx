import Link from "next/link";
import { Fragment } from "react";
import { ProductInfoCard } from "./ProductInfoCard";
import { ProductImageGallery } from "./ProductImageGallery";
import { ProductSummary } from "./ProductSummary";
import { ProductDescription } from "./ProductDescription";
import { UserImagesSection } from "./UserImagesSection";
import { ReviewsSection } from "./reviews/ReviewsSection";
import { ArrowLeftIcon } from "lucide-react";

import TomanIcon from "@/assets/icons/Toman-Symbol.svg";
import Image35 from "@/assets/images/image 35.png";
import Image36 from "@/assets/images/image 36.png";
import Image37 from "@/assets/images/image 37.png";
import Swiper1 from "@/assets/images/swiper1.png";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { formatProductPrice } from "@/features/product/lib/format-price";
import type { ProductDetailData } from "@/features/product/api/get-product-detail";
import type { CartItem } from "@/features/cart/model/cart";
import { AddToCartButton } from "@/features/product/components/AddToCartButton";
import { MobilePageHeader } from "@/components/layout/header/MobilePageHeader";
import { Container } from "@/components/ui/Container";

function ProductBreadcrumbSeparator() {
  return (
    <BreadcrumbSeparator className="[&>svg]:size-3.5!">
      <ArrowLeftIcon className="text-auth-accent size-3.5 stroke-[2.5]" />
    </BreadcrumbSeparator>
  );
}

interface ProductBreadcrumbEntry {
  label: string;
  href?: string;
}

interface ProductViewModel {
  id: number;
  storeProductId: number | null;
  title: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  rating: number;
  reviewCount: number;
  specs: Array<{ label: string; value: string }>;
  colors: Array<{ id: string; hex: string; label: string }>;
  images: string[];
  shortDescription: string;
  description: string;
  userImages: string[];
  breadcrumbs: ProductBreadcrumbEntry[];
}

const PRODUCT_BREADCRUMBS: ProductBreadcrumbEntry[] = [
  { label: "خانه", href: "/" },
  { label: "لوازم خانگی", href: "/category/home-appliances" },
  { label: "یخچال فریزر", href: "/category/refrigerator" },
  { label: "یخچال فریزر سامسونگ" },
];

const PRODUCT_IMAGES = [Image35.src, Image36.src, Image37.src, Swiper1.src];
const NO_IMAGE_URL = "/images/image-placeholder.svg";

const PRODUCT: ProductViewModel = {
  id: 6,
  storeProductId: null,
  title:
    "یخچال فریزر سامسونگ ۳۶ اینچ ۲۸ فوت مکعبی درب فرانسوی با یخساز (RF28R7201SR/AA) - استیل ضد زنگ",
  price: 330000000,
  originalPrice: 420000000,
  discount: 30,
  rating: 3.5,
  reviewCount: 566,
  specs: [
    { label: "برند", value: "سامسونگ" },
    { label: "مدل", value: "لولای راست" },
    { label: "رنگ", value: "سفید" },
  ],
  colors: [
    { id: "white", hex: "#ffffff", label: "سفید" },
    { id: "silver", hex: "#c0c0c0", label: "نقره‌ای" },
    { id: "black", hex: "#1a1a2e", label: "مشکی" },
  ],
  images: Array.from({ length: 5 }, (_, i) => PRODUCT_IMAGES[i % PRODUCT_IMAGES.length]),
  shortDescription:
    "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد کتابهای زیادی در شصت و سه درصد گذشته حال و آینده",
  description:
    "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی در شصت و سه درصد گذشته حال و آینده، شناخت فراوان جامعه و متخصصان را می طلبد، تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص طراحان خلاقی، و فرهنگ پیشرو در زبان فارسی ایجاد کرد، در این صورت می توان امید داشت که تمام و دشواری موجود در ارائه راهکارها، و شرایط سخت تایپ به پایان رسد و زمان مورد نیاز شامل حروفچینی دستاوردهای اصلی، و جوابگوی سوالات پیوسته اهل دنیای موجود طراحی اساسا مورد استفاده قرار گیرد.",
  userImages: Array.from({ length: 11 }, (_, i) => PRODUCT_IMAGES[i % PRODUCT_IMAGES.length]),
  breadcrumbs: PRODUCT_BREADCRUMBS,
};

function createProductViewModel(product: ProductDetailData): ProductViewModel {
  const store = product.storeInfos.find((item) => item.isOffer) ?? product.storeInfos[0];
  const price = store && store.offPrice > 0 ? store.offPrice : (store?.mainPrice ?? PRODUCT.price);
  const originalPrice = store && store.mainPrice > price ? store.mainPrice : undefined;
  const propertySpecs = product.properties
    .filter((property) => !property.isColor && property.propertyTitle)
    .flatMap((property) => {
      const value = property.valueText || property.values[0]?.title;
      return value ? [{ label: property.propertyTitle, value }] : [];
    })
    .slice(0, 2);
  const effectiveItems = product.effectiveProperty?.isColor ? product.effectiveProperty.items : [];
  const colors = effectiveItems.flatMap((item) => {
    const hex = item.description.trim();
    return /^#[\da-f]{3,8}$/i.test(hex) ? [{ id: String(item.id), hex, label: item.title }] : [];
  });
  const images = [...product.pictures]
    .sort((first, second) => Number(second.isMain) - Number(first.isMain))
    .map((picture) => picture.picUrl);
  const breadcrumbs = [
    { label: "خانه", href: "/" },
    ...(product.category?.categoryParents.map((parent) => ({
      label: parent.parentTitle,
      href: `/categories/${parent.parentId}`,
    })) ?? []),
    ...(product.category?.categoryTitle
      ? [
          {
            label: product.category.categoryTitle,
            href: `/categories/${product.category.categoryId}`,
          },
        ]
      : []),
    { label: product.title },
  ];

  return {
    id: product.productId || PRODUCT.id,
    storeProductId: store?.storeProductId ?? null,
    title: product.title,
    price,
    originalPrice,
    discount: store?.offPercent || undefined,
    rating: PRODUCT.rating,
    reviewCount: PRODUCT.reviewCount,
    specs: [
      ...(product.brand ? [{ label: "برند", value: product.brand.title }] : []),
      ...propertySpecs,
    ].slice(0, 3),
    colors: colors.length > 0 ? colors : PRODUCT.colors,
    images: images.length > 0 ? images : [NO_IMAGE_URL],
    shortDescription: product.shortReview || PRODUCT.shortDescription,
    description: product.expertReview || PRODUCT.description,
    userImages: PRODUCT.userImages,
    breadcrumbs,
  };
}

function createMockCartItem(product: ProductViewModel): CartItem {
  return {
    id: product.id,
    title: product.title,
    image: product.images[0] ?? PRODUCT.images[0],
    color: product.colors[0]?.label ?? "بدون رنگ",
    warranty: "گارانتی اتکالاین",
    price: product.price,
    originalPrice: product.originalPrice,
    discount: product.discount,
    returnable: true,
    quantity: 1,
  };
}

interface ProductBreadcrumbTrailProps {
  crumbs: ProductBreadcrumbEntry[];
  className?: string;
  listClassName?: string;
}

function ProductBreadcrumbTrail({ crumbs, className, listClassName }: ProductBreadcrumbTrailProps) {
  return (
    <Breadcrumb className={className}>
      <BreadcrumbList className={listClassName}>
        {crumbs.map((crumb, index) => {
          const isCurrentPage = index === crumbs.length - 1;

          return (
            <Fragment key={crumb.href ?? crumb.label}>
              <BreadcrumbItem>
                {isCurrentPage ? (
                  <BreadcrumbPage>{crumb.label}</BreadcrumbPage>
                ) : (
                  <BreadcrumbLink render={<Link href={crumb.href ?? "/"} />}>
                    {crumb.label}
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
              {!isCurrentPage && <ProductBreadcrumbSeparator />}
            </Fragment>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}

function ProductBreadcrumbs({ crumbs }: { crumbs: ProductBreadcrumbEntry[] }) {
  return (
    <div className="-mx-4 bg-[#F8FAFC] px-4 py-3 lg:mx-0 lg:bg-transparent lg:px-0 lg:py-0">
      <ProductBreadcrumbTrail
        crumbs={crumbs}
        className="mb-0"
        listClassName="flex-nowrap overflow-x-auto text-nowrap"
      />
    </div>
  );
}

interface MobilePurchaseFooterProps {
  price: number;
  originalPrice: number;
  cartItem: CartItem;
  storeProductId: number | null;
}

function MobilePurchaseFooter({
  price,
  originalPrice,
  cartItem,
  storeProductId,
}: MobilePurchaseFooterProps) {
  return (
    <footer className="bg-background fixed inset-x-0 bottom-0 z-50 flex h-[82px] items-center justify-between gap-3 rounded-t-2xl border-t px-4 shadow-[0_-4px_18px_rgb(15_23_42/8%)] lg:hidden">
      <AddToCartButton
        item={cartItem}
        storeProductId={storeProductId}
        showIcon
        className="bg-primary text-secondary flex h-11 items-center gap-2 rounded-full px-5 text-sm font-bold"
        quantityClassName="gap-4"
      />

      <div className="min-w-0">
        <p className="text-muted-foreground text-xs line-through">
          {formatProductPrice(originalPrice)}
        </p>
        <p className="text-secondary flex items-center gap-1 text-sm font-bold">
          <TomanIcon className="size-4" />
          {formatProductPrice(price)}
        </p>
      </div>
    </footer>
  );
}

// slug مسیر در این مرز دریافت می‌شود تا API جزئیات محصول در مرحله بعد به آن متصل شود.
interface ProductDetailProps {
  slug?: string;
  product?: ProductDetailData | null;
}

export default function ProductDetail({
  slug: _slug,
  product: productDetail,
}: ProductDetailProps = {}) {
  const product = productDetail ? createProductViewModel(productDetail) : PRODUCT;
  const cartItem = createMockCartItem(product);

  return (
    <Container as="main" className="space-y-6 pt-20 pb-28 lg:space-y-10 lg:px-0 lg:py-6">
      <MobilePageHeader fixed fallbackHref="/" title="یخچال و فریزر" />
      <ProductBreadcrumbs crumbs={product.breadcrumbs} />
      <div className="flex w-full flex-col gap-6 lg:flex-row lg:gap-8">
        <div className="w-full min-w-0 space-y-8 lg:w-auto lg:flex-1 lg:space-y-12">
          <section className="flex flex-col gap-6 lg:gap-10 xl:flex-row">
            <ProductImageGallery
              productId={product.id}
              images={product.images}
              title={product.title}
            />

            <ProductSummary
              title={product.title}
              rating={PRODUCT.rating}
              reviewCount={PRODUCT.reviewCount}
              specs={product.specs}
              colors={product.colors}
              shortDescription={product.shortDescription}
            />
          </section>

          <ProductDescription productName={product.title} description={product.description} />

          <UserImagesSection images={product.userImages} />

          <ReviewsSection productId={product.id} averageRating={4} totalRatings={40} />
        </div>
        <div className="hidden w-[300px] shrink-0 lg:block">
          <ProductInfoCard
            price={product.price}
            originalPrice={product.originalPrice}
            discount={product.discount}
            colors={product.colors}
            cartItem={cartItem}
            storeProductId={product.storeProductId}
          />
        </div>
      </div>
      <MobilePurchaseFooter
        price={product.price}
        originalPrice={product.originalPrice ?? product.price}
        cartItem={cartItem}
        storeProductId={product.storeProductId}
      />
    </Container>
  );
}
