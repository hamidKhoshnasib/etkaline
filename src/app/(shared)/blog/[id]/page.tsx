import type { Metadata } from "next";
import Link from "next/link";
import { Clock3, UserRound } from "lucide-react";
import { notFound } from "next/navigation";

import { Badge } from "@/components/ui/badge";
import { Container } from "@/components/ui/Container";
import { AppImage } from "@/components/ui/image";
import { getBlogPostDetail } from "@/features/blog/api/get-blog-post-detail";
import { getCurrentStorefrontSiteType } from "@/lib/get-current-storefront-site-type";
import { createStorefrontMetadata } from "@/lib/storefront-metadata";

interface BlogPostPageProps {
  params: Promise<{ id: string }>;
}

function parsePostId(value: string): number | null {
  const id = Number(value);
  return Number.isSafeInteger(id) && id > 0 ? id : null;
}

async function getPostForPage(idValue: string) {
  const id = parsePostId(idValue);
  if (id === null) {
    return null;
  }

  return getBlogPostDetail(id, await getCurrentStorefrontSiteType());
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { id } = await params;
  const siteType = await getCurrentStorefrontSiteType();
  const post = await getPostForPage(id);

  return createStorefrontMetadata({
    siteType,
    pathname: `/blog/${encodeURIComponent(id)}`,
    title: post?.metaTitle ?? post?.title,
    fallbackTitle: "مجله اتکالاین",
    description: post?.seoDescription ?? post?.summary,
    fallbackDescription: "مطالب و راهنماهای فروشگاه اینترنتی اتکالاین",
    image: post?.image,
  });
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { id } = await params;
  const post = await getPostForPage(id);
  if (!post) {
    notFound();
  }

  return (
    <Container as="main" className="py-6 sm:py-10">
      <article className="mx-auto max-w-4xl">
        <nav
          aria-label="مسیر راهنما"
          className="body-medium text-muted-foreground mb-6 flex items-center gap-2"
        >
          <Link href="/blog" className="hover:text-primary transition-colors">
            مجله
          </Link>
          <span aria-hidden="true">/</span>
          <span className="text-foreground truncate">{post.title}</span>
        </nav>

        <header className="mb-6 space-y-4 sm:mb-8">
          <div className="flex flex-wrap gap-2">
            {post.categories.map((category) => (
              <Badge
                key={category.id}
                variant="outline"
                render={<Link href={`/blog?category=${category.id}`} />}
              >
                {category.title}
              </Badge>
            ))}
          </div>
          <h1 className="text-foreground text-2xl leading-10 font-bold sm:text-4xl sm:leading-tight">
            {post.title}
          </h1>
          {post.summary ? <p className="body-large text-muted-foreground">{post.summary}</p> : null}
          <div className="body-small text-muted-foreground flex flex-wrap items-center gap-x-5 gap-y-2">
            {post.createDate ? <span>{post.createDate}</span> : null}
            {post.studyTime ? (
              <span className="flex items-center gap-1.5">
                <Clock3 className="size-4" aria-hidden="true" />
                {post.studyTime}
              </span>
            ) : null}
            <span className="flex items-center gap-1.5">
              <UserRound className="size-4" aria-hidden="true" />
              تحریریه اتکالاین
            </span>
          </div>
        </header>

        {post.image ? (
          <div className="border-border mb-8 aspect-[16/9] overflow-hidden rounded-2xl border">
            <AppImage
              src={post.image}
              alt={post.title}
              width={1280}
              height={720}
              className="h-full w-full object-cover"
              priority
            />
          </div>
        ) : null}

        <div className="body-large text-foreground whitespace-pre-line">
          {post.description || post.summary}
        </div>
      </article>
    </Container>
  );
}
