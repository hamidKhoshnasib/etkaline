import { headers } from "next/headers";
import { userAgentFromString } from "next/server";

import CategoryGridCard from "@/features/catalog/components/CategoryGridCard";
import ProductSection from "@/features/product/components/ProductSection";
import ProductSectionList from "@/features/product/components/ProductSectionList";
import CategoryBanners from "./CategoryBanners";
import FlashDeals from "./FlashDeals";
import {
  getHomeLayout,
  HOME_COMPONENT_TYPE,
  type HomeLayoutItem,
  type HomePlatformType,
} from "@/lib/home-layout";

interface ProductItem {
  id: number | string;
  title: string;
  image: string;
  price: number;
  originalPrice?: number;
  discount?: number;
}

interface DynamicHomeLayoutProps {
  products: ProductItem[];
}

function renderLayoutItem(item: HomeLayoutItem, products: ProductItem[]) {
  const description = item.subTitle ?? item.targetTitle ?? undefined;

  switch (item.componentType) {
    case HOME_COMPONENT_TYPE.BANNER:
      return <CategoryBanners key={item.id} />;
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
      return <FlashDeals key={item.id} />;
    default:
      return null;
  }
}

export default async function DynamicHomeLayout({ products }: DynamicHomeLayoutProps) {
  const requestHeaders = await headers();
  const { device } = userAgentFromString(requestHeaders.get("user-agent") ?? undefined);
  const platformType: HomePlatformType =
    device.type === "mobile" || device.type === "tablet" ? 2 : 1;
  const layout = await getHomeLayout(2, platformType);

  return layout.map((item) => renderLayoutItem(item, products));
}
