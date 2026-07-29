import { headers } from "next/headers";
import { userAgentFromString } from "next/server";

import CategoryGridCard from "@/features/catalog/components/CategoryGridCard";
import ProductSection from "@/features/product/components/ProductSection";
import ProductSectionList from "@/features/product/components/ProductSectionList";
import { getProductsByLayoutId } from "@/features/product/api/get-products-by-layout-id";
import {
  getBannersByLayoutId,
  type LayoutBanner,
} from "@/features/home/appliances/api/get-layout-banners";
import {
  getHomeLayout,
  HOME_COMPONENT_TYPE,
  type HomeLayoutItem,
  type HomePlatformType,
} from "@/features/home/appliances/api/get-home-layout";
import { SectionErrorBoundary } from "@/components/ui/section-error-boundary";
import CategoryBanners from "./CategoryBanners";
import FlashDeals from "./FlashDeals";

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
) {
  const description = item.subTitle ?? item.targetTitle ?? undefined;

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
        <ProductSection
          title={item.title}
          description={description}
          showMoreLink="/products"
          items={products}
          cardClassName={item.id === 1 ? "h-[226px] w-full lg:h-[310px]" : undefined}
          disableCardHover={item.id === 1}
          stickCardPriceToBottom={item.id === 1}
        />
      );
    case HOME_COMPONENT_TYPE.TWO_ROW_GRID:
      return (
        <ProductSectionList
          title={item.title}
          description={description}
          showMoreLink="/products"
          items={products}
        />
      );
    case HOME_COMPONENT_TYPE.GRID_2X2:
      return (
        <CategoryGridCard
          title={item.title}
          description={description}
          showMoreLink="/products"
          items={products.map(({ id, image, title }) => ({ id, image, title }))}
        />
      );
    case HOME_COMPONENT_TYPE.OFFER:
      return <FlashDeals items={products} />;
    default:
      return null;
  }
}

async function DynamicHomeLayoutItem({ item }: { item: HomeLayoutItem }) {
  const products = isProductLayout(item) ? await getProductsByLayoutId(item.id) : [];
  const banners = isBannerLayout(item) ? await getBannersByLayoutId(item.id) : [];

  return renderLayoutItem(item, products, banners);
}

export default async function DynamicHomeLayout() {
  const requestHeaders = await headers();
  const { device } = userAgentFromString(requestHeaders.get("user-agent") ?? undefined);
  const platformType: HomePlatformType =
    device.type === "mobile" || device.type === "tablet" ? 2 : 1;
  const layout = await getHomeLayout(2, platformType);
  const renderedLayoutItems = [];

  for (let index = 0; index < layout.length; index += 1) {
    const layoutItem = layout[index];

    if (layoutItem.componentType !== HOME_COMPONENT_TYPE.GRID_2X2) {
      renderedLayoutItems.push(
        <SectionErrorBoundary key={layoutItem.id} title={`دریافت «${layoutItem.title}» ممکن نشد.`}>
          <DynamicHomeLayoutItem item={layoutItem} />
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
            <DynamicHomeLayoutItem item={item} />
          </SectionErrorBoundary>
        ))}
      </div>,
    );
  }

  return renderedLayoutItems;
}
