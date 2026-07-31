import { ProductDetail } from "@/features/product";
import { getProductDetail } from "@/features/product/api/get-product-detail";
import type { Metadata } from "next";
import { SITE_NAME, SITE_URL } from "@/config/site";

type ProductDetailPageProps = {
  params: Promise<{ slug: string }>;
};

function getMetadataImageUrl(imageUrl: string | undefined): string | undefined {
  if (!imageUrl) {
    return undefined;
  }

  try {
    return new URL(imageUrl, SITE_URL).toString();
  } catch {
    return undefined;
  }
}

export async function generateMetadata({ params }: ProductDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const canonical = new URL(`/products/${encodeURIComponent(slug)}`, SITE_URL);
  const product = await getProductDetail(slug);
  const title = product?.metaTitle || product?.title || `${slug} | ${SITE_NAME}`;
  const description = product?.seoDesc || product?.shortReview || undefined;
  const mainImageUrl = getMetadataImageUrl(
    product?.pictures.find((picture) => picture.isMain)?.picUrl ?? product?.pictures[0]?.picUrl,
  );

  return {
    title,
    description,
    alternates: { canonical: canonical.toString() },
    openGraph: {
      url: canonical.toString(),
      title,
      description,
      images: mainImageUrl ? [{ url: mainImageUrl, alt: product?.title || title }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: mainImageUrl ? [mainImageUrl] : undefined,
    },
  };
}

export default async function ProductDetailIndex({ params }: ProductDetailPageProps) {
  const { slug } = await params;
  const product = await getProductDetail(slug);
  return <ProductDetail product={product} />;
}
