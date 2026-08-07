import { Suspense } from "react";

import HeroSwiper from "./HeroSwiper";
import PopularBrands from "./PopularBrands";
import MagSection from "./MagSection";
import CategoryStrip from "./CategoryStrip";
import DynamicHomeLayout from "./DynamicHomeLayout";
import {
  HomeBlogSkeleton,
  HomeBrandsSkeleton,
  HomeCategoriesSkeleton,
  HomeHeroSkeleton,
  HomeLayoutSkeleton,
} from "./HomeSectionSkeletons";
import { getCategoryBanners } from "../api/get-category-banners";
import { getHomeBanners } from "../api/get-home-banners";
import { getHomeBrands } from "../api/get-home-brands";
import { Container } from "@/components/ui/Container";
import { SectionErrorBoundary } from "@/components/ui/section-error-boundary";
import { getBlogPosts } from "@/features/blog/api/get-blog-posts";
import type { SiteType } from "@/lib/api-site-type";

async function HomeHero({ siteType }: { siteType: SiteType }) {
  return <HeroSwiper banners={await getHomeBanners(siteType)} />;
}

async function HomeCategories({ siteType }: { siteType: SiteType }) {
  return <CategoryStrip banners={await getCategoryBanners(siteType)} />;
}

async function HomeBrands({ siteType }: { siteType: SiteType }) {
  const brands = await getHomeBrands(siteType);
  return brands.length ? <PopularBrands brands={brands} /> : null;
}

async function HomeBlog({ siteType }: { siteType: SiteType }) {
  const posts = await getBlogPosts(siteType);
  if (!posts.length) {
    return null;
  }

  return (
    <MagSection
      articles={posts.map((post) => ({
        ...post,
        description: post.summary,
        href: `/blog/${encodeURIComponent(String(post.id))}`,
      }))}
      showMoreLink="/blog"
    />
  );
}

export default function HomePage({ siteType }: { siteType: SiteType }) {
  return (
    <main>
      <SectionErrorBoundary title="دریافت بنرهای صفحهٔ اصلی ممکن نشد.">
        <Suspense fallback={<HomeHeroSkeleton />}>
          <HomeHero siteType={siteType} />
        </Suspense>
      </SectionErrorBoundary>
      <Container className="mt-5 space-y-6 pb-12 sm:mt-9 sm:space-y-9 sm:px-6 sm:pb-15">
        <SectionErrorBoundary title="دریافت دسته‌بندی‌ها ممکن نشد.">
          <Suspense fallback={<HomeCategoriesSkeleton />}>
            <HomeCategories siteType={siteType} />
          </Suspense>
        </SectionErrorBoundary>
        <SectionErrorBoundary title="دریافت چیدمان صفحهٔ اصلی ممکن نشد.">
          <Suspense fallback={<HomeLayoutSkeleton />}>
            <DynamicHomeLayout siteType={siteType} />
          </Suspense>
        </SectionErrorBoundary>
        <SectionErrorBoundary title="دریافت برندها ممکن نشد.">
          <Suspense fallback={<HomeBrandsSkeleton />}>
            <HomeBrands siteType={siteType} />
          </Suspense>
        </SectionErrorBoundary>
        <SectionErrorBoundary title="دریافت مطالب مجله ممکن نشد.">
          <Suspense fallback={<HomeBlogSkeleton />}>
            <HomeBlog siteType={siteType} />
          </Suspense>
        </SectionErrorBoundary>
      </Container>
    </main>
  );
}
