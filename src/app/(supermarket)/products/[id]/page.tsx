import { notFound, permanentRedirect } from "next/navigation";

import { getProductDetail } from "@/features/product/api/get-product-detail";
import { getProductSlug } from "@/features/product/lib/product-slug";
import { SITE_TYPES } from "@/lib/api-site-type";

export default async function ProductIdRedirectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = await getProductDetail(id, SITE_TYPES.supermarket);
  if (!product) {
    notFound();
  }

  permanentRedirect(`/products/${id}/${getProductSlug(product.urlTitle, product.title)}`);
}
