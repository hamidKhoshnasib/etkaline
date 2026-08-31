"use client";

import Link from "next/link";
import { Fragment, useEffect, useState } from "react";
import { ProductInfoCard } from "./ProductInfoCard";
import { ProductImageGallery } from "./ProductImageGallery";
import { ProductSummary } from "./ProductSummary";
import { ProductDescription } from "./ProductDescription";
import { ReviewsSection } from "./reviews/ReviewsSection";
import { ArrowLeftIcon } from "lucide-react";

import TomanIcon from "@/assets/icons/Toman-Symbol.svg";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Empty, EmptyDescription, EmptyHeader, EmptyTitle } from "@/components/ui/empty";
import { formatProductPrice } from "@/features/product/lib/format-price";
import { saveRecentlyViewedProduct } from "@/features/product/lib/recently-viewed-products";
import type { ProductDetailData } from "@/features/product/api/get-product-detail";
import { AddToCartButton } from "@/features/product/components/AddToCartButton";
import { MobilePageHeader } from "@/components/layout/header/MobilePageHeader";
import { Container } from "@/components/ui/Container";
import { useStorefront } from "@/providers/storefront-provider";
import type { StorefrontConfig } from "@/config/storefront";

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
  storeInfos: ProductDetailData["storeInfos"];
  title: string;
  urlTitle: string;
  isFavorite: boolean;
  price: number;
  originalPrice?: number;
  discount?: number;
  inventory: number;
  isAvailable: boolean;
  productExists: boolean;
  specs: Array<{ label: string; value: string }>;
  specifications: Array<{ label: string; value: string }>;
  colors: Array<{ id: string; hex: string; label: string }>;
  images: string[];
  shortDescription: string;
  description: string;
  brandHref?: string;
  breadcrumbs: ProductBreadcrumbEntry[];
}

const NO_IMAGE_URL = "/images/image-placeholder.svg";

function toPlainText(value: string): string {
  return value
    .replace(/<[^>]*>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function createProductViewModel(
  product: ProductDetailData,
  storefront: StorefrontConfig,
): ProductViewModel {
  const store = product.storeInfos.find((item) => item.isOffer) ?? product.storeInfos[0];
  const price = store && store.offPrice > 0 ? store.offPrice : (store?.mainPrice ?? 0);
  const originalPrice = store && store.mainPrice > price ? store.mainPrice : undefined;
  const propertySpecs = product.properties
    .filter((property) => !property.isColor && property.propertyTitle)
    .flatMap((property) => {
      const value = property.valueText || property.values[0]?.title;
      return value ? [{ label: property.propertyTitle, value }] : [];
    })
    .slice(0, 2);
  const specifications = [
    ...(product.brand ? [{ label: "برند", value: product.brand.title }] : []),
    ...product.properties.flatMap((property) => {
      const value = property.valueText || property.values.map((item) => item.title).join("، ");
      return property.propertyTitle && value ? [{ label: property.propertyTitle, value }] : [];
    }),
  ];
  const effectiveItems = product.effectiveProperty?.isColor ? product.effectiveProperty.items : [];
  const colors = effectiveItems.flatMap((item) => {
    const hex = item.description.trim();
    return /^#[\da-f]{3,8}$/i.test(hex) ? [{ id: String(item.id), hex, label: item.title }] : [];
  });
  const images = [...product.pictures]
    .sort((first, second) => Number(second.isMain) - Number(first.isMain))
    .map((picture) => picture.picUrl);
  const breadcrumbs = [
    { label: "خانه", href: storefront.homeHref },
    ...(product.category?.categoryParents.map((parent) => ({
      label: parent.parentTitle,
      href: storefront.categoryHref(parent.parentId),
    })) ?? []),
    ...(product.category?.categoryTitle
      ? [
          {
            label: product.category.categoryTitle,
            href: storefront.categoryHref(product.category.categoryId),
          },
        ]
      : []),
    { label: product.title },
  ];

  return {
    id: product.productId,
    storeProductId: store?.storeProductId ?? null,
    storeInfos: product.storeInfos,
    title: product.title,
    urlTitle: product.urlTitle,
    isFavorite: product.isFavorite,
    price,
    originalPrice,
    discount: store?.offPercent || undefined,
    inventory: Math.max(0, store?.inventory ?? 0),
    isAvailable: product.isExist && (store?.inventory ?? 0) > 0,
    productExists: product.isExist,
    specs: [
      ...(product.brand ? [{ label: "برند", value: product.brand.title }] : []),
      ...propertySpecs,
    ].slice(0, 3),
    specifications,
    colors,
    images: images.length > 0 ? images : [NO_IMAGE_URL],
    shortDescription: toPlainText(product.shortReview),
    description: product.expertReview,
    brandHref:
      product.brand && product.brand.id > 0
        ? `${storefront.searchHref}?brandIds=${product.brand.id}`
        : undefined,
    breadcrumbs,
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
  storeProductId: number | null;
  inventory: number;
  isAvailable: boolean;
}

function MobilePurchaseFooter({
  price,
  originalPrice,
  storeProductId,
  inventory: _inventory,
  isAvailable,
}: MobilePurchaseFooterProps) {
  return (
    <footer className="bg-background fixed inset-x-0 bottom-0 z-50 flex h-[82px] items-center justify-between gap-3 rounded-t-2xl border-t px-4 shadow-[0_-4px_18px_rgb(15_23_42/8%)] lg:hidden">
      <AddToCartButton
        storeProductId={storeProductId}
        unavailable={!isAvailable}
        showIcon
        className="bg-primary text-secondary flex h-11 items-center gap-2 rounded-full px-5 text-sm font-bold"
        quantityClassName="gap-4"
      />

      <div className="min-w-0">
        {/* Inventory visibility is temporarily disabled. */}
        {/*
        <p className={isAvailable ? "text-xs text-emerald-700" : "text-destructive text-xs"}>
          {isAvailable ? `${inventory.toLocaleString("fa-IR")} عدد موجود` : "ناموجود"}
        </p>
        */}
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

interface ProductDetailProps {
  product: ProductDetailData | null;
}

export default function ProductDetail({ product: productDetail }: ProductDetailProps) {
  const storefront = useStorefront();
  if (!productDetail) {
    return (
      <Container as="main" className="min-h-screen py-8">
        <Empty>
          <EmptyHeader>
            <EmptyTitle>محصول مورد نظر یافت نشد</EmptyTitle>
            <EmptyDescription>اطلاعات این محصول در دسترس نیست.</EmptyDescription>
          </EmptyHeader>
        </Empty>
      </Container>
    );
  }

  const product = createProductViewModel(productDetail, storefront);

  return <ProductDetailContent key={product.id} product={product} />;
}

function ProductDetailContent({ product }: { product: ProductViewModel }) {
  const storefront = useStorefront();
  const { siteType } = storefront;
  const firstColorIdWithStore = product.colors.find((color) =>
    product.storeInfos.some((store) => String(store.effectiveValueId) === color.id),
  )?.id;
  const [selectedColorId, setSelectedColorId] = useState(
    firstColorIdWithStore ?? product.colors[0]?.id ?? "",
  );
  const selectedStore = product.colors.length
    ? product.storeInfos.find((store) => String(store.effectiveValueId) === selectedColorId)
    : (product.storeInfos.find((store) => store.isOffer) ?? product.storeInfos[0]);
  const price =
    selectedStore && selectedStore.offPrice > 0
      ? selectedStore.offPrice
      : (selectedStore?.mainPrice ?? 0);
  const originalPrice =
    selectedStore && selectedStore.mainPrice > price ? selectedStore.mainPrice : undefined;
  const inventory = Math.max(0, selectedStore?.inventory ?? 0);
  const isAvailable = product.productExists && inventory > 0;
  useEffect(() => {
    saveRecentlyViewedProduct(siteType, {
      id: product.id,
      title: product.title,
      image: product.images[0] ?? NO_IMAGE_URL,
      price,
      originalPrice,
      discount: selectedStore?.offPercent || undefined,
      outOfStock: !isAvailable,
      storeProductId: selectedStore?.storeProductId,
      urlTitle: product.urlTitle,
    });
  }, [
    isAvailable,
    originalPrice,
    price,
    product,
    selectedStore?.offPercent,
    selectedStore?.storeProductId,
    siteType,
  ]);

  return (
    <Container as="main" className="space-y-6 pt-20 pb-28 lg:space-y-10 lg:px-6 lg:py-6">
      <MobilePageHeader fixed fallbackHref={storefront.homeHref} title={product.title} />
      <ProductBreadcrumbs crumbs={product.breadcrumbs} />
      <div className="flex w-full flex-col gap-6 lg:flex-row lg:gap-8">
        <div className="w-full min-w-0 space-y-8 lg:w-auto lg:flex-1 lg:space-y-12">
          <section className="flex flex-col gap-6 lg:gap-10 xl:flex-row">
            <ProductImageGallery
              key={product.id}
              productId={product.id}
              images={product.images}
              title={product.title}
              isFavorite={product.isFavorite}
            />

            <ProductSummary
              title={product.title}
              specs={product.specs}
              brandHref={product.brandHref}
              colors={product.colors}
              shortDescription={product.shortDescription}
              selectedColorId={selectedColorId}
              onColorSelect={setSelectedColorId}
            />
          </section>

          <div id="product-specifications" className="scroll-mt-40">
            <ProductDescription
              productName={product.title}
              description={product.description}
              specifications={product.specifications}
            />
          </div>

          <ReviewsSection productId={product.id} />
        </div>
        <div className="hidden w-[300px] shrink-0 lg:block">
          <ProductInfoCard
            price={price}
            originalPrice={originalPrice}
            discount={selectedStore?.offPercent || undefined}
            colors={product.colors}
            storeProductId={selectedStore?.storeProductId ?? null}
            inventory={inventory}
            isAvailable={isAvailable}
            selectedColorId={selectedColorId}
            onColorSelect={setSelectedColorId}
          />
        </div>
      </div>
      <MobilePurchaseFooter
        price={price}
        originalPrice={originalPrice ?? price}
        storeProductId={selectedStore?.storeProductId ?? null}
        inventory={inventory}
        isAvailable={isAvailable}
      />
    </Container>
  );
}
