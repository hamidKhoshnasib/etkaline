import BlogSectionHeader from "./BlogSectionHeader";
import BlogCategoryList from "./BlogCategoryList";
import BlogPostList from "./BlogPostList";
import PopularReadsCard from "./PopularReadsCard";
import BlogPromoBanner from "./BlogPromoBanner";
import FeaturedBlog from "./FeaturedBlog";
import { popularPosts, featuredPost } from "./data";
import { getBlogBanners } from "@/features/blog/api/get-blog-banners";
import { Container } from "@/components/ui/Container";
import { SectionErrorBoundary } from "@/components/ui/section-error-boundary";
import type { SiteType } from "@/lib/api-site-type";

async function BlogPromoBanners({ siteType }: { siteType: SiteType }) {
  const blogBanners = await getBlogBanners(siteType);
  return blogBanners.map((banner) => (
    <BlogPromoBanner
      key={banner.id}
      title={banner.title}
      subtitle={banner.content}
      image={banner.image}
      href={banner.href}
      width={banner.width}
      height={banner.height}
    />
  ));
}

export default function BlogPage({ siteType }: { siteType: SiteType }) {
  return (
    <Container as="main" className="space-y-6 py-6">
      {/* ── Latest posts grid + sidebar ─────────────────────────────── */}
      <section className="flex flex-col gap-6 lg:flex-row">
        <aside className="flex w-full shrink-0 flex-col gap-6 lg:w-[308px]">
          <BlogCategoryList />
          <PopularReadsCard posts={popularPosts} showMoreLink="/blog" />
        </aside>

        <div className="min-w-0 flex-1">
          <BlogSectionHeader title="جدیدترین مطالب" showMoreLink="/blog" />
          <BlogPostList />
        </div>
      </section>

      {/* ── Promotional banner ──────────────────────────────────────── */}
      <SectionErrorBoundary title="دریافت بنرهای مجله ممکن نشد.">
        <BlogPromoBanners siteType={siteType} />
      </SectionErrorBoundary>

      {/* ── Featured article + sidebar ──────────────────────────────── */}
      <section className="flex flex-col gap-6 lg:flex-row">
        <aside className="w-full shrink-0 lg:w-[308px]">
          <PopularReadsCard posts={popularPosts} showMoreLink="/blog" />
        </aside>

        <div className="min-w-0 flex-1">
          <BlogSectionHeader title="جدیدترین مطالب" showMoreLink="/blog" />
          <FeaturedBlog {...featuredPost} />
        </div>
      </section>
    </Container>
  );
}
