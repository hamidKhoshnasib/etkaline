import HeroSwiper from "./HeroSwiper";
import FlashDeals from "./FlashDeals";
import CategoryBanners from "./CategoryBanners";
import SupermarketCta from "./SupermarketCta";
import ProductSection from "@/components/ui/ProductSection";
import ProductSectionList from "@/components/ui/ProductSectionList";
import Image from "next/image";
import banner from "@/assets/images/image 35.png";
import miniBanner1 from "@/assets/images/image 36.png";
import miniBanner2 from "@/assets/images/image 37.png";
import Link from "next/link";

const sampleProducts = Array.from({ length: 12 }, (_, i) => ({
  id: i + 1,
  title: "ماشین ظرفشویی ۱۴ نفره بوش مدل SMS6ZCI85M",
  image: "https://via.placeholder.com/180x180?text=Product",
  price: 580000000,
  originalPrice: 828000000,
  discount: 30,
}));

export default function HomePage() {
  return (
    <main>
      <HeroSwiper />
      <div className="container mx-auto mt-9 space-y-9">
        <FlashDeals />
        <CategoryBanners />
        <SupermarketCta />
        <ProductSection
          title="عنوان دلخواه"
          description="لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ"
          showMoreLink="/products"
          items={sampleProducts}
        />
        <Link href="#">
          <Image
            alt="عکس بنر"
            src={banner.src}
            width={1280}
            height={308}
            className="h-full w-full my-9"
          />
        </Link>
        <ProductSectionList
          title="عنوان دلخواه"
          description="لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ"
          showMoreLink="/products"
          items={sampleProducts}
        />
        <div className="grid grid-cols-2 gap-5">
          <Link href="#">
            <Image
              alt="عکس بنر"
              src={miniBanner1.src}
              width={610}
              height={168}
              className="h-full w-full"
            />
          </Link>
          <Link href="#">
            <Image
              alt="عکس بنر"
              src={miniBanner2.src}
              width={610}
              height={168}
              className="h-full w-full"
            />
          </Link>
        </div>
      </div>
    </main>
  );
}
