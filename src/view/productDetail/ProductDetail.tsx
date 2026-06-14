import { ProductInfoCard } from "./ProductInfoCard";
import { ProductImageGallery } from "./ProductImageGallery";
import { ProductSummary } from "./ProductSummary";
import { ProductDescription } from "./ProductDescription";
import { UserImagesSection } from "./UserImagesSection";
import { ReviewsSection } from "./reviews/ReviewsSection";

const PRODUCT = {
  title:
    "یخچال فریزر سامسونگ ۳۶ اینچ ۲۸ فوت مکعبی درب فرانسوی با یخساز (RF28R7201SR/AA) - استیل ضد زنگ",
  price: 330000000,
  originalPrice: 420000000,
  discount: 30,
  rating: 3.5,
  reviewCount: 566,
  specs: [
    { label: "برند", value: "سامسونگ" },
    { label: "مدل", value: "لولای راست" },
    { label: "رنگ", value: "سفید" },
  ],
  colors: [
    { id: "white", hex: "#ffffff", label: "سفید" },
    { id: "silver", hex: "#c0c0c0", label: "نقره‌ای" },
    { id: "black", hex: "#1a1a2e", label: "مشکی" },
  ],
  images: Array.from(
    { length: 5 },
    (_, i) => `https://via.placeholder.com/432x350?text=Image+${i + 1}`,
  ),
  shortDescription:
    "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد کتابهای زیادی در شصت و سه درصد گذشته حال و آینده",
  description:
    "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی در شصت و سه درصد گذشته حال و آینده، شناخت فراوان جامعه و متخصصان را می طلبد، تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص طراحان خلاقی، و فرهنگ پیشرو در زبان فارسی ایجاد کرد، در این صورت می توان امید داشت که تمام و دشواری موجود در ارائه راهکارها، و شرایط سخت تایپ به پایان رسد و زمان مورد نیاز شامل حروفچینی دستاوردهای اصلی، و جوابگوی سوالات پیوسته اهل دنیای موجود طراحی اساسا مورد استفاده قرار گیرد.",
  userImages: Array.from(
    { length: 11 },
    (_, i) => `https://via.placeholder.com/84x84?text=${i + 1}`,
  ),
};

// const BREADCRUMBS = [
//   { label: "خانه", href: "/" },
//   { label: "لوازم خانگی", href: "/category/home-appliances" },
//   { label: "یخچال فریزر", href: "/category/refrigerator" },
//   { label: "یخچال فریزر سامسونگ" },
// ];

export default function ProductDetail() {
  return (
    <main className="container mx-auto space-y-10 py-8">
      {/*<ProductBreadcrumb crumbs={BREADCRUMBS} />*/}
      <div className="flex w-full gap-4 lg:px-25">
        <div className="w-3/4 space-y-9">
          <section className="flex gap-6">
            <ProductImageGallery images={PRODUCT.images} title={PRODUCT.title} />

            <ProductSummary
              title={PRODUCT.title}
              rating={PRODUCT.rating}
              reviewCount={PRODUCT.reviewCount}
              specs={PRODUCT.specs}
              shortDescription={PRODUCT.shortDescription}
            />
          </section>

          <ProductDescription productName="یخچال فریزر سامسونگ" description={PRODUCT.description} />

          <UserImagesSection images={PRODUCT.userImages} />

          <ReviewsSection averageRating={4} totalRatings={40} />
        </div>
        <div className="w-1/4">
          <ProductInfoCard
            price={PRODUCT.price}
            originalPrice={PRODUCT.originalPrice}
            discount={PRODUCT.discount}
            colors={PRODUCT.colors}
          />
        </div>
      </div>
    </main>
  );
}
