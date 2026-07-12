import HeroSwiper from "./HeroSwiper";
import PopularBrands from "./PopularBrands";
import MagSection from "./MagSection";
import CategoryStrip from "./CategoryStrip";
import DynamicHomeLayout from "./DynamicHomeLayout";

const sampleProducts = Array.from({ length: 12 }, (_, i) => ({
  id: i + 1,
  title: "ماشین ظرفشویی ۱۴ نفره بوش مدل SMS6ZCI85M",
  image: "https://via.placeholder.com/180x180?text=Product",
  price: 580000000,
  originalPrice: 828000000,
  discount: 30,
}));

const popularBrands = [
  {
    id: 1,
    name: "Bella PRO",
    image: "https://via.placeholder.com/90x40?text=bella",
    href: "/brand/bella",
  },
  {
    id: 2,
    name: "Bissell",
    image: "https://via.placeholder.com/90x40?text=BISSELL",
    href: "/brand/bissell",
  },
  {
    id: 3,
    name: "Bosch",
    image: "https://via.placeholder.com/90x40?text=BOSCH",
    href: "/brand/bosch",
  },
  {
    id: 4,
    name: "DeLonghi",
    image: "https://via.placeholder.com/90x40?text=DeLonghi",
    href: "/brand/delonghi",
  },
  {
    id: 5,
    name: "Dyson",
    image: "https://via.placeholder.com/90x40?text=dyson",
    href: "/brand/dyson",
  },
  {
    id: 6,
    name: "Insignia",
    image: "https://via.placeholder.com/90x40?text=INSIGNIA",
    href: "/brand/insignia",
  },
  {
    id: 7,
    name: "iRobot",
    image: "https://via.placeholder.com/90x40?text=iRobot",
    href: "/brand/irobot",
  },
  {
    id: 8,
    name: "KitchenAid",
    image: "https://via.placeholder.com/90x40?text=KitchenAid",
    href: "/brand/kitchenaid",
  },
  { id: 9, name: "LG", image: "https://via.placeholder.com/90x40?text=LG", href: "/brand/lg" },
  {
    id: 10,
    name: "Samsung",
    image: "https://via.placeholder.com/90x40?text=SAMSUNG",
    href: "/brand/samsung",
  },
  {
    id: 11,
    name: "Whirlpool",
    image: "https://via.placeholder.com/90x40?text=Whirlpool",
    href: "/brand/whirlpool",
  },
];

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

export default function HomePage() {
  return (
    <main>
      <HeroSwiper />
      <div className="container mx-auto mt-5 space-y-6 px-4 pb-12 sm:mt-9 sm:space-y-9 sm:px-6 sm:pb-15">
        <CategoryStrip />
        <DynamicHomeLayout products={sampleProducts} />
        <PopularBrands brands={popularBrands} />
        <MagSection articles={sampleArticles} showMoreLink="/mag" />
      </div>
    </main>
  );
}
