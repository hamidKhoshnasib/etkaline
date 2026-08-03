import type { Metadata } from "next";
import { notFound, permanentRedirect } from "next/navigation";

import { SITE_NAME, SITE_URL } from "@/config/site";
import { ProductDetail } from "@/features/product";
import { getProductDetail } from "@/features/product/api/get-product-detail";
import { getProductSlug } from "@/features/product/lib/product-slug";
import { SITE_TYPES } from "@/lib/api-site-type";

interface ProductPageProps {
  params: Promise<{ id: string; slug: string }>;
}

async function resolveProduct(params: ProductPageProps["params"]) {
  const { id, slug } = await params;
  const product = await getProductDetail(id, SITE_TYPES.supermarket);
  if (!product) {
    return null;
  }
  return { id, slug, product, canonicalSlug: getProductSlug(product.urlTitle, product.title) };
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const resolved = await resolveProduct(params);
  if (!resolved) {
    return { title: "محصول یافت نشد", robots: { index: false, follow: false } };
  }

  const { id, product, canonicalSlug } = resolved;
  const canonical = new URL(`/products/${id}/${canonicalSlug}`, SITE_URL);
  const title = product.metaTitle || `${product.title} | ${SITE_NAME}`;
  const description = product.seoDesc || product.shortReview || undefined;
  const image =
    product.pictures.find((picture) => picture.isMain)?.picUrl ?? product.pictures[0]?.picUrl;

  return {
    title,
    description,
    alternates: { canonical: canonical.toString() },
    openGraph: {
      title,
      description,
      url: canonical.toString(),
      images: image ? [image] : undefined,
    },
  };
}

export default async function SupermarketProductPage({ params }: ProductPageProps) {
  const resolved = await resolveProduct(params);
  if (!resolved) {
    notFound();
  }
  if (resolved.slug !== resolved.canonicalSlug) {
    permanentRedirect(`/products/${resolved.id}/${resolved.canonicalSlug}`);
  }

  return <ProductDetail product={resolved.product} />;
}
