import { notFound, permanentRedirect } from "next/navigation";

import { getStorefront } from "@/config/storefront";
import { getProductDetail } from "@/features/product/api/get-product-detail";
import { getProductSlug } from "@/features/product/lib/product-slug";
import { SITE_TYPES } from "@/lib/api-site-type";

export default async function ApplianceProductIdRedirectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = await getProductDetail(id, SITE_TYPES.appliance);
  if (!product) {
    notFound();
  }

  permanentRedirect(
    getStorefront(SITE_TYPES.appliance).productHref(
      id,
      getProductSlug(product.urlTitle, product.title),
    ),
  );
}
