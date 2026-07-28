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
      return <CategoryBanners key={item.id} banners={banners} />;
    case HOME_COMPONENT_TYPE.SINGLE_ROW_SLIDER:
      return (
        <ProductSection
          key={item.id}
          title={item.title}
          description={description}
          showMoreLink="/products"
          items={products}
        />
      );
    case HOME_COMPONENT_TYPE.TWO_ROW_GRID:
      return (
        <ProductSectionList
          key={item.id}
          title={item.title}
          description={description}
          showMoreLink="/products"
          items={products}
        />
      );
    case HOME_COMPONENT_TYPE.GRID_2X2:
      return (
        <CategoryGridCard
          key={item.id}
          title={item.title}
          description={description}
          showMoreLink="/products"
          items={products.map(({ id, image, title }) => ({ id, image, title }))}
        />
      );
    case HOME_COMPONENT_TYPE.OFFER:
      return <FlashDeals key={item.id} items={products} />;
    default:
      return null;
  }
}

function hasLayoutContent(
  item: HomeLayoutItem,
  products: Awaited<ReturnType<typeof getProductsByLayoutId>>,
  banners: LayoutBanner[],
) {
  if (isProductLayout(item)) {
    return products.length > 0;
  }

  return !isBannerLayout(item) || banners.length > 0;
}

export default async function DynamicHomeLayout() {
  const requestHeaders = await headers();
  const { device } = userAgentFromString(requestHeaders.get("user-agent") ?? undefined);
  const platformType: HomePlatformType =
    device.type === "mobile" || device.type === "tablet" ? 2 : 1;
  const layout = await getHomeLayout(2, platformType);
  const layoutItems = await Promise.all(
    layout.map(async (item) => ({
      item,
      products: isProductLayout(item) ? await getProductsByLayoutId(item.id) : [],
      banners: isBannerLayout(item) ? await getBannersByLayoutId(item.id) : [],
    })),
  );

  const visibleLayoutItems = layoutItems.filter(({ item, products, banners }) =>
    hasLayoutContent(item, products, banners),
  );
  const renderedLayoutItems = [];

  for (let index = 0; index < visibleLayoutItems.length; index += 1) {
    const layoutItem = visibleLayoutItems[index];

    if (layoutItem.item.componentType !== HOME_COMPONENT_TYPE.GRID_2X2) {
      renderedLayoutItems.push(
        renderLayoutItem(layoutItem.item, layoutItem.products, layoutItem.banners),
      );
      continue;
    }

    const gridItems = [layoutItem];
    while (visibleLayoutItems[index + 1]?.item.componentType === HOME_COMPONENT_TYPE.GRID_2X2) {
      index += 1;
      gridItems.push(visibleLayoutItems[index]);
    }

    renderedLayoutItems.push(
      <div key={`category-grid-${gridItems[0].item.id}`} className="grid gap-4 lg:grid-cols-4">
        {gridItems.map(({ item, products, banners }) => renderLayoutItem(item, products, banners))}
      </div>,
    );
  }

  return renderedLayoutItems;
}
