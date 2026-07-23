import HeroSwiper from "./HeroSwiper";
import PopularBrands from "./PopularBrands";
import MagSection from "./MagSection";
import CategoryStrip from "./CategoryStrip";
import DynamicHomeLayout from "./DynamicHomeLayout";
import { getHomeBanners } from "../api/get-home-banners";
import { getHomeBrands } from "../api/get-home-brands";

const sampleArticles = [
  {
    id: 1,
    image: "https://via.placeholder.com/300x180?text=Article+1",
    title: "چه رنگهایی در اتاق خواب کاربرد دارد؟",
    description: "انتخاب رنگ برای اتاق خواب بستگی به سلیقه و سبک زندگی شما دارد...",
    date: "۹ آذر ۱۴۰۳",
    href: "/mag/1",
  },
  {
    id: 2,
    image: "https://via.placeholder.com/300x180?text=Article+2",
    title: "ماشین ظرفشویی یا دستی؟ کدام بهتر است؟",
    description: "مقایسه کامل ماشین ظرفشویی با شستشوی دستی از نظر مصرف آب و وقت...",
    date: "۱۵ آذر ۱۴۰۳",
    href: "/mag/2",
  },
  {
    id: 3,
    image: "https://via.placeholder.com/300x180?text=Article+3",
    title: "قبل از خرید یخچال این نکات را بدانید",
    description: "راهنمای جامع انتخاب یخچال مناسب بر اساس فضا، مصرف برق و نیاز خانواده...",
    date: "۲۰ آذر ۱۴۰۳",
    href: "/mag/3",
  },
  {
    id: 4,
    image: "https://via.placeholder.com/300x180?text=Article+4",
    title: "چطور خانه‌ای مرتب و منظم داشته باشیم؟",
    description: "روش‌های ساده و کاربردی برای نگهداری خانه تمیز در طول هفته...",
    date: "۲۵ آذر ۱۴۰۳",
    href: "/mag/4",
  },
];

export default async function HomePage() {
  const [banners, brands] = await Promise.all([getHomeBanners(), getHomeBrands()]);

  return (
    <main>
      <HeroSwiper banners={banners} />
      <div className="container mx-auto mt-5 space-y-6 px-4 pb-12 sm:mt-9 sm:space-y-9 sm:px-6 sm:pb-15">
        <CategoryStrip />
        <DynamicHomeLayout />
        {brands.length ? <PopularBrands brands={brands} /> : null}
        <MagSection articles={sampleArticles} showMoreLink="/mag" />
      </div>
    </main>
  );
}
