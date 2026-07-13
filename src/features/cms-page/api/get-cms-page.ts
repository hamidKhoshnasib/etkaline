import "server-only";
import type { CmsPage } from "@/features/cms-page/model/cms-page";

// صفحه‌ی منتشرشده از پنل Blazor خوانده می‌شود؛ CKEditor در این پروژه نصب نمی‌شود.
export async function getCmsPage(slug: string): Promise<CmsPage | null> {
  const baseUrl = process.env.ETKALA_CMS_API_URL;
  if (!baseUrl) {
    return null;
  }
  const response = await fetch(`${baseUrl}/api/pages/${encodeURIComponent(slug)}`, {
    next: { revalidate: 300, tags: [`cms-page:${slug}`] },
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
