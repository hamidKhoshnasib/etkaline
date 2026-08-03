import HeroSwiper from "./HeroSwiper";
import PopularBrands from "./PopularBrands";
import MagSection from "./MagSection";
import CategoryStrip from "./CategoryStrip";
import DynamicHomeLayout from "./DynamicHomeLayout";
import { getCategoryBanners } from "../api/get-category-banners";
import { getHomeBanners } from "../api/get-home-banners";
import { getHomeBrands } from "../api/get-home-brands";
import Image35 from "@/assets/images/image 35.png";
import Image36 from "@/assets/images/image 36.png";
import Image37 from "@/assets/images/image 37.png";
import Swiper1 from "@/assets/images/swiper1.png";
import { Container } from "@/components/ui/Container";
import { SectionErrorBoundary } from "@/components/ui/section-error-boundary";
import type { SiteType } from "@/lib/api-site-type";

const sampleArticles = [
  {
    id: 1,
    image: Image35.src,
    title: "چه رنگهایی در اتاق خواب کاربرد دارد؟",
    description: "انتخاب رنگ برای اتاق خواب بستگی به سلیقه و سبک زندگی شما دارد...",
    date: "۹ آذر ۱۴۰۳",
    href: "/mag/1",
  },
  {
    id: 2,
    image: Image36.src,
    title: "ماشین ظرفشویی یا دستی؟ کدام بهتر است؟",
    description: "مقایسه کامل ماشین ظرفشویی با شستشوی دستی از نظر مصرف آب و وقت...",
    date: "۱۵ آذر ۱۴۰۳",
    href: "/mag/2",
  },
  {
    id: 3,
    image: Image37.src,
    title: "قبل از خرید یخچال این نکات را بدانید",
    description: "راهنمای جامع انتخاب یخچال مناسب بر اساس فضا، مصرف برق و نیاز خانواده...",
    date: "۲۰ آذر ۱۴۰۳",
    href: "/mag/3",
  },
  {
    id: 4,
    image: Swiper1.src,
    title: "چطور خانه‌ای مرتب و منظم داشته باشیم؟",
    description: "روش‌های ساده و کاربردی برای نگهداری خانه تمیز در طول هفته...",
    date: "۲۵ آذر ۱۴۰۳",
    href: "/mag/4",
  },
];

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

export default function HomePage({ siteType }: { siteType: SiteType }) {
  return (
    <main>
      <SectionErrorBoundary title="دریافت بنرهای صفحهٔ اصلی ممکن نشد.">
        <HomeHero siteType={siteType} />
      </SectionErrorBoundary>
      <Container className="mt-5 space-y-6 pb-12 sm:mt-9 sm:space-y-9 sm:px-6 sm:pb-15">
        <SectionErrorBoundary title="دریافت دسته‌بندی‌ها ممکن نشد.">
          <HomeCategories siteType={siteType} />
        </SectionErrorBoundary>
        <SectionErrorBoundary title="دریافت چیدمان صفحهٔ اصلی ممکن نشد.">
          <DynamicHomeLayout siteType={siteType} />
        </SectionErrorBoundary>
        <SectionErrorBoundary title="دریافت برندها ممکن نشد.">
          <HomeBrands siteType={siteType} />
        </SectionErrorBoundary>
        <MagSection articles={sampleArticles} showMoreLink="/blog" />
      </Container>
    </main>
  );
}
