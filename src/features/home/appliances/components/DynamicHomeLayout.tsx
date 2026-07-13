import { headers } from "next/headers";
import { userAgentFromString } from "next/server";

import CategoryGridCard from "@/features/catalog/components/CategoryGridCard";
import ProductSection from "@/features/product/components/ProductSection";
import ProductSectionList from "@/features/product/components/ProductSectionList";
import { getHomeLayout, type HomeLayoutItem, type HomePlatformType } from "@/lib/home-layout";

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
    case 1:
      return (
        <ProductSection
          key={item.id}
          title={item.title}
          description={description}
          showMoreLink="/products"
          items={products}
        />
      );
    case 2:
      return (
        <ProductSectionList
          key={item.id}
          title={item.title}
          description={description}
          showMoreLink="/products"
          items={products}
        />
      );
    case 3:
      return (
        <CategoryGridCard
          key={item.id}
          title={item.title}
          description={description}
          showMoreLink="/products"
          items={products.map(({ id, image, title }) => ({ id, image, title }))}
        />
      );
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
