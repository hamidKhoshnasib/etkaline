import BlogCard from "@/features/blog/components/BlogCard";
import BlogSectionHeader from "./BlogSectionHeader";
import CategoryCard from "./CategoryCard";
import PopularReadsCard from "./PopularReadsCard";
import BlogPromoBanner from "./BlogPromoBanner";
import FeaturedBlog from "./FeaturedBlog";
import { categories, gridPosts, popularPosts, featuredPost } from "./data";
import { getBlogBanners } from "@/features/blog/api/get-blog-banners";

export default async function BlogPage() {
  const blogBanners = await getBlogBanners();

  return (
    <main className="container mx-auto space-y-6 py-6">
      {/* ── Latest posts grid + sidebar ─────────────────────────────── */}
      <section className="flex flex-col gap-6 lg:flex-row">
        <aside className="flex w-full shrink-0 flex-col gap-6 lg:w-[308px]">
          <CategoryCard categories={categories} />
          <PopularReadsCard posts={popularPosts} showMoreLink="/blog" />
        </aside>

        <div className="min-w-0 flex-1">
          <BlogSectionHeader title="جدیدترین مطالب" showMoreLink="/blog" />
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {gridPosts.map((post) => (
              <BlogCard
                key={post.id}
                image={post.image}
                title={post.title}
                description={post.description}
                date={post.date}
                href={post.href}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── Promotional banner ──────────────────────────────────────── */}
      {blogBanners.map((banner) => (
        <BlogPromoBanner
          key={banner.id}
          title={banner.title}
          subtitle={banner.content}
          image={banner.image}
          href={banner.href}
          width={banner.width}
          height={banner.height}
        />
      ))}

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
    </main>
  );
}
