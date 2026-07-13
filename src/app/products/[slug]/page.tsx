import { ProductDetail } from "@/features/product";
import type { Metadata } from "next";
import { SITE_NAME, SITE_URL } from "@/shared/config/site";

type ProductDetailPageProps = {
  params: Promise<{ slug: string }>;
};

// متادیتای پایه بر اساس slug ساخته می‌شود تا هر محصول URL قابل اشتراک و canonical مستقل داشته باشد
export async function generateMetadata({ params }: ProductDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const canonical = new URL(`/products/${encodeURIComponent(slug)}`, SITE_URL);

  return {
    title: `${slug} | ${SITE_NAME}`,
    alternates: { canonical: canonical.toString() },
    openGraph: { url: canonical.toString(), title: `${slug} | ${SITE_NAME}` },
  };
}

export default async function ProductDetailIndex({ params }: ProductDetailPageProps) {
  const { slug } = await params;
  return <ProductDetail slug={slug} />;
}
