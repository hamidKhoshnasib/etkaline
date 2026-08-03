import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CmsPageContent, getCmsPage } from "@/features/cms-page";
import { Container } from "@/components/ui/Container";
import { getCurrentStorefrontSiteType } from "@/lib/get-current-storefront-site-type";
import { createStorefrontMetadata } from "@/lib/storefront-metadata";

type Props = { params: Promise<{ slug: string[] }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const siteType = await getCurrentStorefrontSiteType();
  const page = await getCmsPage(slug.join("/"), siteType);
  if (!page) {
    return { title: "صفحه پیدا نشد", robots: { index: false, follow: false } };
  }

  return createStorefrontMetadata({
    siteType,
    pathname: `/content/${slug.map(encodeURIComponent).join("/")}`,
    title: page.title,
    description: page.description,
    fallbackTitle: page.title,
  });
}

export default async function CmsPage({ params }: Props) {
  const page = await getCmsPage(
    (await params).slug.join("/"),
    await getCurrentStorefrontSiteType(),
  );
  if (!page) {
    notFound();
  }
  return (
    <Container as="main" className="w-full flex-1 py-10">
      <h1 className="mb-6 text-3xl font-bold">{page.title}</h1>
      <CmsPageContent page={page} />
    </Container>
  );
}
