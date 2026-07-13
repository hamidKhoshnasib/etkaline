export interface CmsPage {
  slug: string;
  title: string;
  html: string;
  description?: string;
  canonical?: string;
  updatedAt?: string;
}
