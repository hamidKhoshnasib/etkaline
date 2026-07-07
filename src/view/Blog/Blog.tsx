import BlogCard from "@/components/ui/BlogCard";
import BlogSectionHeader from "./BlogSectionHeader";
import CategoryCard from "./CategoryCard";
import PopularReadsCard from "./PopularReadsCard";
import BlogPromoBanner from "./BlogPromoBanner";
import FeaturedBlog from "./FeaturedBlog";
import { categories, gridPosts, popularPosts, featuredPost } from "./data";

export default function BlogPage() {
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
      <BlogPromoBanner href="/blog" />

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
