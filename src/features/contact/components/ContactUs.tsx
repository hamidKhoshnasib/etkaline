import { AppImage } from "@/components/ui/image";
import Link from "next/link";
import { Headset, Mail, MapPin } from "lucide-react";
import contactUsBanner from "@/assets/images/contactUs.jpg";
import House from "@/assets/icons/home-house-favorite.svg";
import ContactForm from "@/features/contact/components/ContactForm";
import { getContactDetails } from "@/features/contact/api/get-contact-us";
import { getSocialNetworks } from "@/features/social/api/get-social-networks";
import { SocialNetworkLinks } from "@/features/social/components/SocialNetworkLinks";
import { Container } from "@/components/ui/Container";
import { SectionErrorBoundary } from "@/components/ui/section-error-boundary";
import type { SiteType } from "@/lib/api-site-type";

async function ContactUsContent({ siteType }: { siteType: SiteType }) {
  const [contactDetails, socialNetworks] = await Promise.all([
    getContactDetails(siteType),
    getSocialNetworks(siteType),
  ]);
  const contactItems = [
    contactDetails?.tel && {
      icon: Headset,
      label: "تلفن پشتیبانی",
      value: contactDetails.tel,
    },
    contactDetails?.email && {
      icon: Mail,
      label: "ایمیل",
      value: contactDetails.email,
    },
    contactDetails?.address && {
      icon: MapPin,
      label: "آدرس شعبه حضوری",
      value: contactDetails.address,
    },
  ].filter((item): item is { icon: typeof Headset; label: string; value: string } => Boolean(item));

  return (
    <Container as="main" className="pt-9 pb-12">
      {/* Hero Banner */}
      <div className="relative h-70 w-full overflow-hidden">
        <AppImage
          src={contactUsBanner}
          alt="تماس با اتکالاین"
          fill
          className="object-cover"
          priority
        />
      </div>

      <div>
        <div className="px-4 lg:px-[105px]">
          {/* Breadcrumb */}
          <p className="text-primary-hover my-3 flex items-center gap-1">
            <House className="ml-2 [&_path]:stroke-[#43A047]" />
            با
            <b> اتکالاین</b> در ارتباط باشید
          </p>

          <p>
            ما همیشه آماده پاسخگویی به سوالات شما هستیم . اگر درباره محصولات ، نحوه خرید ، ارسال
            سفارش یا هر موضوع دیگری سوالی دارید ، تیم پشتیبانی اتکالاین در کنار شماست. با ما از طریق
            فرم تماس زیر تماس بگیرید
            {contactDetails?.email && (
              <>
                {" و همچنین می‌توانید به آدرس "}
                <a href={`mailto:${contactDetails.email}`} className="text-primary-hover">
                  <bdi dir="ltr">{contactDetails.email}</bdi>
                </a>
                {" ایمیل بزنید"}
              </>
            )}
            {" یا از طریق واتس آپ ما در"}
            گوشه سمت راست پایین این صفحه با ما چت کنید. ما قصد داریم ظرف 1-2 روز کاری به شما پاسخ
            دهیم رضایت شما الویت ماست .
          </p>

          <div className="flex flex-col gap-6">
            <div>
              <h1 className="mt-2.5 mb-3.75 font-bold"> فرم تماس اتکالاین</h1>
              <p>
                لطفا قبل از تماس یا ارسال ایمیل ، ابتدا
                <Link href="/faq" className="text-primary-hover">
                  {" "}
                  سوالات متداول{" "}
                </Link>
                را مشاهده کنید.
              </p>
            </div>

            <ContactForm />
          </div>
        </div>

        {/* Map */}
        <div className="mt-12 flex flex-col justify-center rounded-[16px] border border-[#D1D4D4] px-[105px] py-12">
          <div className="text-center">
            <h2 className="title-large-bold mb-4 text-[#292C2D]">
              همراه شما تا رسیدن به انتخابی ایده آل
            </h2>
            <p className="mb-2 text-[#3E4344]">همین حالا با ما در تماس باشید</p>
            {contactDetails?.tel && <p className="mb-8.25 text-[#676F71]">{contactDetails.tel}</p>}
          </div>
          <div className="mb-8 h-114.25 w-full overflow-hidden rounded-[12px] border border-[#E1E2E3]">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3239.1!2d51.4231!3d35.6892!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3f8e00491ff3dcd9%3A0xf0b3697c567024bc!2sTehran%2C%20Iran!5e0!3m2!1sen!2s!4v1234567890"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="موقعیت مکانی اتکالاین"
            />
          </div>
          <div className="text-secondary flex flex-col gap-4">
            {contactItems.map(({ icon: Icon, label, value }) => (
              <div key={label} className="flex items-start gap-2">
                <Icon className="text-secondary h-6 w-6" />
                <div>
                  <p className="label-large-bold">{label}</p>
                  <p className="body-medium mt-2">{value}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 px-8.5">
            <p className="text-secondary mb-4 font-bold">همراه ما باشید!</p>
            <SocialNetworkLinks socialNetworks={socialNetworks} className="flex gap-3" />
          </div>
        </div>
      </div>
    </Container>
  );
}

export default function ContactUsPage({ siteType }: { siteType: SiteType }) {
  return (
    <SectionErrorBoundary title="دریافت اطلاعات تماس ممکن نشد." className="mx-auto max-w-7xl">
      <ContactUsContent siteType={siteType} />
    </SectionErrorBoundary>
  );
}
