import { sanitizeCmsHtml } from "@/features/cms-page/lib/sanitize-cms-html";
import type { CmsPage } from "@/features/cms-page/model/cms-page";

export function CmsPageContent({ page }: { page: CmsPage }) {
  return (
    <article
      className="prose prose-slate max-w-none"
      dangerouslySetInnerHTML={{ __html: sanitizeCmsHtml(page.html) }}
    />
  );
}
