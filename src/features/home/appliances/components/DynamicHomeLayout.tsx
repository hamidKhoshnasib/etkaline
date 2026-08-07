import { Suspense } from "react";
import { headers } from "next/headers";
import { userAgentFromString } from "next/server";

import CategoryGridCard from "@/features/catalog/components/CategoryGridCard";
import ProductSectionList from "@/features/product/components/ProductSectionList";
import { LazyProductSection } from "@/features/product/components/LazyProductSection";
import { getProductsByLayoutId } from "@/features/product/api/get-products-by-layout-id";
import {
  getBannersByLayoutId,
  type LayoutBanner,
} from "@/features/home/appliances/api/get-layout-banners";
import {
  getHomeLayout,
  HOME_COMPONENT_TYPE,
  type HomeLayoutItem,
  type HomeLayoutType,
  type HomePlatformType,
} from "@/features/home/appliances/api/get-home-layout";
import { SectionErrorBoundary } from "@/components/ui/section-error-boundary";
import CategoryBanners from "./CategoryBanners";
import { LazyFlashDeals } from "./LazyFlashDeals";
import { HomeLayoutItemSkeleton } from "./HomeSectionSkeletons";
import { StorefrontSwitchTab } from "./StorefrontSwitchTab";
import { getStorefront } from "@/config/storefront";
import { SITE_TYPES, type SiteType } from "@/lib/api-site-type";

function isProductLayout(item: HomeLayoutItem) {
  return (
    item.componentType === HOME_COMPONENT_TYPE.SINGLE_ROW_SLIDER ||
    item.componentType === HOME_COMPONENT_TYPE.TWO_ROW_GRID ||
    item.componentType === HOME_COMPONENT_TYPE.GRID_2X2 ||
    item.componentType === HOME_COMPONENT_TYPE.OFFER
  );
}

function isBannerLayout(item: HomeLayoutItem) {
  return item.componentType === HOME_COMPONENT_TYPE.BANNER;
}

function renderLayoutItem(
  item: HomeLayoutItem,
  products: Awaited<ReturnType<typeof getProductsByLayoutId>>,
  banners: LayoutBanner[],
  siteType: SiteType,
) {
  const description = item.subTitle ?? item.targetTitle ?? undefined;
  const showMoreLink =
    item.targetId !== null && item.targetId > 0
      ? getStorefront(siteType).categoryHref(item.targetId)
      : undefined;

  if (isProductLayout(item) && products.length === 0) {
    return null;
  }

  if (isBannerLayout(item) && banners.length === 0) {
    return null;
  }

  switch (item.componentType) {
    case HOME_COMPONENT_TYPE.BANNER:
      return <CategoryBanners banners={banners} />;
    case HOME_COMPONENT_TYPE.SINGLE_ROW_SLIDER:
      return (
        <LazyProductSection
          title={item.title}
          description={description}
          showMoreLink={showMoreLink}
          items={products}
          cardClassName={
            siteType === SITE_TYPES.appliance && item.id === 1
              ? "h-[226px] w-full lg:h-[310px]"
              : undefined
          }
          disableCardHover={siteType === SITE_TYPES.appliance && item.id === 1}
          stickCardPriceToBottom={siteType === SITE_TYPES.appliance && item.id === 1}
        />
      );
    case HOME_COMPONENT_TYPE.TWO_ROW_GRID:
      return (
        <ProductSectionList
          title={item.title}
          description={description}
          showMoreLink={showMoreLink}
          items={products}
        />
      );
    case HOME_COMPONENT_TYPE.GRID_2X2:
      return (
        <CategoryGridCard
          title={item.title}
          description={description}
          showMoreLink={showMoreLink}
          items={products.map(({ id, image, title }) => ({ id, image, title }))}
          siteType={siteType}
        />
      );
    case HOME_COMPONENT_TYPE.OFFER:
      return <LazyFlashDeals items={products} />;
    default:
      return null;
  }
}

async function DynamicHomeLayoutItem({
  item,
  siteType,
}: {
  item: HomeLayoutItem;
  siteType: SiteType;
}) {
  const products = isProductLayout(item) ? await getProductsByLayoutId(item.id, siteType) : [];
  const banners = isBannerLayout(item) ? await getBannersByLayoutId(item.id, siteType) : [];

  return renderLayoutItem(item, products, banners, siteType);
}

export default async function DynamicHomeLayout({ siteType }: { siteType: SiteType }) {
  const requestHeaders = await headers();
  const { device } = userAgentFromString(requestHeaders.get("user-agent") ?? undefined);
  const platformType: HomePlatformType =
    device.type === "mobile" || device.type === "tablet" ? 2 : 1;
  const layoutType: HomeLayoutType = siteType === SITE_TYPES.supermarket ? 1 : 2;
  const layout = await getHomeLayout(layoutType, platformType, siteType);
  const renderedLayoutItems = [];

  for (let index = 0; index < layout.length; index += 1) {
    const layoutItem = layout[index];

    if (layoutItem.componentType !== HOME_COMPONENT_TYPE.GRID_2X2) {
      renderedLayoutItems.push(
        <SectionErrorBoundary key={layoutItem.id} title={`دریافت «${layoutItem.title}» ممکن نشد.`}>
          <Suspense fallback={<HomeLayoutItemSkeleton />}>
            <DynamicHomeLayoutItem item={layoutItem} siteType={siteType} />
          </Suspense>
        </SectionErrorBoundary>,
      );
      continue;
    }

    const gridItems = [layoutItem];
    while (layout[index + 1]?.componentType === HOME_COMPONENT_TYPE.GRID_2X2) {
      index += 1;
      gridItems.push(layout[index]);
    }

    renderedLayoutItems.push(
      <div key={`category-grid-${gridItems[0].id}`} className="grid gap-4 lg:grid-cols-4">
        {gridItems.map((item) => (
          <SectionErrorBoundary key={item.id} title={`دریافت «${item.title}» ممکن نشد.`}>
            <Suspense fallback={<HomeLayoutItemSkeleton />}>
              <DynamicHomeLayoutItem item={item} siteType={siteType} />
            </Suspense>
          </SectionErrorBoundary>
        ))}
      </div>,
    );
  }

  return (
    <div className="relative space-y-6 sm:space-y-9">
      <div className="sticky top-[calc(50vh-82px)] z-40 h-0">
        <StorefrontSwitchTab siteType={siteType} />
      </div>
      {renderedLayoutItems}
    </div>
  );
}
