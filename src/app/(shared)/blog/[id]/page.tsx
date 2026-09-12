import type { Metadata } from "next";
import { Calendar, Clock3, UserRound } from "lucide-react";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { AppImage } from "@/components/ui/image";
import { SectionErrorBoundary } from "@/components/ui/section-error-boundary";
import { getBlogPostDetail } from "@/features/blog/api/get-blog-post-detail";
import { getBlogPosts } from "@/features/blog/api/get-blog-posts";
import BlogCategoryList from "@/features/blog/components/BlogCategoryList";
import PopularReadsCard from "@/features/blog/components/PopularReadsCard";
import { sanitizeCmsHtml } from "@/features/cms-page/lib/sanitize-cms-html";
import type { SiteType } from "@/lib/api-site-type";
import { getCurrentStorefrontSiteType } from "@/lib/get-current-storefront-site-type";
import { createStorefrontMetadata } from "@/lib/storefront-metadata";

interface BlogPostPageProps {
  params: Promise<{ id: string }>;
}

function parsePostId(value: string): number | null {
  const id = Number(value);
  return Number.isSafeInteger(id) && id > 0 ? id : null;
}

async function getPostForPage(idValue: string, siteType: SiteType) {
  const id = parsePostId(idValue);
  if (id === null) {
    return null;
  }

  return getBlogPostDetail(id, siteType);
}

async function PopularBlogPosts({
  siteType,
  currentPostId,
}: {
  siteType: SiteType;
  currentPostId: number;
}) {
  const posts = await getBlogPosts(siteType, 6);

  return (
    <PopularReadsCard
      posts={posts
        .filter((post) => post.id !== currentPostId)
        .slice(0, 4)
        .map((post) => ({
          id: post.id,
          title: post.title,
          time: post.date,
          image: post.image,
          href: `/blog/${encodeURIComponent(String(post.id))}`,
        }))}
      showMoreLink="/blog"
    />
  );
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { id } = await params;
  const siteType = await getCurrentStorefrontSiteType();
  const post = await getPostForPage(id, siteType);

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
  const siteType = await getCurrentStorefrontSiteType();
  const post = await getPostForPage(id, siteType);
  if (!post) {
    notFound();
  }

  const descriptionHtml = sanitizeCmsHtml(post.description);

  return (
    <Container as="main" className="py-6 sm:py-10">
      <div className="flex flex-col gap-6 lg:flex-row-reverse lg:items-start">
        <article className="border-border bg-card min-w-0 flex-1 rounded-2xl border p-4 sm:p-6">
          <header className="mb-6 flex flex-col gap-4">
            <div className="body-small text-muted-foreground flex flex-wrap items-center gap-x-5 gap-y-2">
              {/*{post.categories.map((category) => (*/}
              {/*  <Badge*/}
              {/*    key={category.id}*/}
              {/*    variant="outline"*/}
              {/*    render={<Link href={`/blog?category=${category.id}`} />}*/}
              {/*  >*/}
              {/*    {category.title}*/}
              {/*  </Badge>*/}
              {/*))}*/}
              {post.createDate ? (
                <span className="flex items-center gap-1.5">
                  <Calendar className="size-4" aria-hidden="true" />
                  {post.createDate}
                </span>
              ) : null}
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

            <h1 className="text-foreground text-xl leading-8 font-bold sm:text-2xl sm:leading-10">
              {post.title}
            </h1>
          </header>

          {post.image ? (
            <div className="border-border mb-6 aspect-video overflow-hidden rounded-xl border sm:mb-8">
              <AppImage
                src={post.image}
                alt={post.title}
                width={1280}
                height={720}
                sizes="(min-width: 1024px) 900px, 100vw"
                className="size-full object-cover"
                priority
              />
            </div>
          ) : null}

          {post.summary ? (
            <p className="text-foreground mb-6 text-justify text-sm leading-7 sm:text-base sm:leading-8">
              {post.summary}
            </p>
          ) : null}

          {descriptionHtml ? (
            <div
              className="text-foreground [&_a]:text-primary-hover [&_blockquote]:border-primary-hover [&_blockquote]:bg-muted/50 text-justify text-sm leading-7 break-words sm:text-base sm:leading-8 [&_a]:underline [&_blockquote]:my-6 [&_blockquote]:rounded-l-lg [&_blockquote]:border-r-4 [&_blockquote]:px-5 [&_blockquote]:py-4 [&_h2]:mt-8 [&_h2]:mb-3 [&_h2]:text-lg [&_h2]:leading-8 [&_h2]:font-bold [&_h3]:mt-7 [&_h3]:mb-3 [&_h3]:text-base [&_h3]:leading-7 [&_h3]:font-bold [&_img]:my-7 [&_img]:h-auto [&_img]:max-w-full [&_img]:rounded-xl [&_li]:mb-2 [&_ol]:my-5 [&_ol]:list-outside [&_ol]:list-decimal [&_ol]:pr-6 [&_p]:mb-5 [&_p]:leading-7 sm:[&_p]:leading-8 [&_strong]:font-bold [&_ul]:my-5 [&_ul]:list-outside [&_ul]:list-disc [&_ul]:pr-6"
              dangerouslySetInnerHTML={{ __html: descriptionHtml }}
            />
          ) : !post.summary ? (
            <p className="body-medium text-muted-foreground py-8 text-center">
              محتوای این مقاله هنوز منتشر نشده است.
            </p>
          ) : null}
        </article>

        <aside
          aria-label="راهنمای مطالب مجله"
          className="flex w-full shrink-0 flex-col gap-6 lg:w-[308px]"
        >
          <BlogCategoryList />
          <SectionErrorBoundary title="دریافت خواندنی‌های مجله ممکن نشد.">
            <PopularBlogPosts siteType={siteType} currentPostId={post.id} />
          </SectionErrorBoundary>
        </aside>
      </div>
    </Container>
  );
}
