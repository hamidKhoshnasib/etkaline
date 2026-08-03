import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CmsPageContent, getCmsPage } from "@/features/cms-page";
import { Container } from "@/components/ui/Container";
import { SITE_TYPES } from "@/lib/api-site-type";

type Props = { params: Promise<{ slug: string[] }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const page = await getCmsPage(slug.join("/"), SITE_TYPES.supermarket);
  if (!page) {
    return { title: "صفحه پیدا نشد" };
  }
  return {
    title: page.title,
    description: page.description,
    alternates: page.canonical ? { canonical: page.canonical } : undefined,
  };
}

export default async function CmsPage({ params }: Props) {
  const page = await getCmsPage((await params).slug.join("/"), SITE_TYPES.supermarket);
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
