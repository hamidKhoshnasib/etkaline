import "server-only";

import type { CmsPage } from "@/features/cms-page/model/cms-page";
import { getSiteTypeHeaders, type SiteType } from "@/lib/api-site-type";

// صفحه‌ی منتشرشده از پنل Blazor خوانده می‌شود؛ CKEditor در این پروژه نصب نمی‌شود.
export async function getCmsPage(slug: string, siteType: SiteType): Promise<CmsPage | null> {
  const baseUrl = process.env.ETKALA_CMS_API_URL;
  if (!baseUrl) {
    return null;
  }
  const response = await fetch(`${baseUrl}/api/pages/${encodeURIComponent(slug)}`, {
    headers: getSiteTypeHeaders(siteType),
    next: { revalidate: 300, tags: [`cms-page:${siteType}:${slug}`] },
  });
  if (!response.ok) {
    return null;
  }
  const page = (await response.json()) as CmsPage;
  if (!page?.title || !page?.html || page.slug !== slug) {
    return null;
  }
  return page;
}
