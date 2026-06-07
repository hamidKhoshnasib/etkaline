import Image from "next/image";
import img1 from "@/assets/images/Group 16.png";
import img2 from "@/assets/images/image 41.png";
import img3 from "@/assets/images/image 42.png";
import img4 from "@/assets/images/image 43.png";
import img5 from "@/assets/images/image 45.png";

const banners = [
  { src: img1, alt: "خرید انواع همزن ساده و کاسه‌دار" },
  { src: img2, alt: "خرید انواع سرخ‌کن رژیمی و معمولی" },
  { src: img3, alt: "خرید انواع پلوپز چندکاره و دیجیتالی" },
  { src: img4, alt: "خرید انواع همزن ساده و کاسه‌دار" },
  { src: img5, alt: "خرید انواع سرخ‌کن رژیمی و معمولی" },
];

export default function CategoryBanners() {
  return (
    <section className="w-full">
      <div className="flex gap-5">
        {banners.map((banner, i) => (
          <div key={i} className="flex-1 overflow-hidden rounded-2xl cursor-pointer">
            <Image
              src={banner.src}
              alt={banner.alt}
              className="w-full h-auto object-cover"
            />
          </div>
        ))}
      </div>
    </section>
  );
}