import type { Metadata } from "next";
import { notFound, permanentRedirect } from "next/navigation";

import { getStorefront } from "@/config/storefront";
import { ProductDetail } from "@/features/product";
import { getProductDetail } from "@/features/product/api/get-product-detail";
import { getProductSlug } from "@/features/product/lib/product-slug";
import { SITE_TYPES } from "@/lib/api-site-type";
import { createStorefrontMetadata } from "@/lib/storefront-metadata";

interface ProductPageProps {
  params: Promise<{ id: string; slug: string }>;
}

function decodeRouteSlug(slug: string) {
  try {
    return decodeURIComponent(slug);
  } catch {
    return slug;
  }
}

async function resolveProduct(params: ProductPageProps["params"]) {
  const { id, slug } = await params;
  const product = await getProductDetail(id, SITE_TYPES.supermarket);
  if (!product) {
    return null;
  }
  return {
    id,
    slug: decodeRouteSlug(slug),
    product,
    canonicalSlug: getProductSlug(product.urlTitle, product.title),
  };
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const resolved = await resolveProduct(params);
  if (!resolved) {
    return { title: "محصول یافت نشد", robots: { index: false, follow: false } };
  }

  const { id, product, canonicalSlug } = resolved;
  const storefront = getStorefront(SITE_TYPES.supermarket);
  const image =
    product.pictures.find((picture) => picture.isMain)?.picUrl ?? product.pictures[0]?.picUrl;

  return createStorefrontMetadata({
    siteType: SITE_TYPES.supermarket,
    pathname: storefront.productHref(id, canonicalSlug),
    title: product.metaTitle,
    fallbackTitle: product.title,
    description: product.seoDesc,
    fallbackDescription: product.shortReview,
    image,
  });
}

export default async function SupermarketProductPage({ params }: ProductPageProps) {
  const resolved = await resolveProduct(params);
  if (!resolved) {
    notFound();
  }
  if (resolved.slug !== resolved.canonicalSlug) {
    permanentRedirect(
      getStorefront(SITE_TYPES.supermarket).productHref(resolved.id, resolved.canonicalSlug),
    );
  }

  return <ProductDetail product={resolved.product} />;
}
