import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { SITE_NAME, SITE_URL } from "@/config/site";
import { ProductDetail } from "@/features/product";
import { getProductDetail } from "@/features/product/api/get-product-detail";
import { SITE_TYPES } from "@/lib/api-site-type";

type Props = { params: Promise<{ id: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const product = await getProductDetail(id, SITE_TYPES.appliance);
  if (!product) {
    return { title: "محصول یافت نشد", robots: { index: false, follow: false } };
  }
  const canonical = new URL(`/appliances/product/${id}`, SITE_URL);
  const title = product.metaTitle || `${product.title} | ${SITE_NAME}`;
  const description = product.seoDesc || product.shortReview || undefined;
  return { title, description, alternates: { canonical: canonical.toString() } };
}

export default async function ApplianceProductPage({ params }: Props) {
  const { id } = await params;
  const product = await getProductDetail(id, SITE_TYPES.appliance);
  if (!product) {
    notFound();
  }
  return <ProductDetail product={product} />;
}
