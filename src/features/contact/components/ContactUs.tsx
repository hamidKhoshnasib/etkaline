import { AppImage } from "@/components/ui/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Headset, Mail, MapPin } from "lucide-react";
import contactUsBanner from "@/assets/images/contactUs.jpg";
import CallIcon from "@/assets/icons/call.svg";
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
      <div className="px-4 lg:px-[105px]">
        <div className="relative h-70 w-full overflow-hidden">
          <AppImage
            src={contactUsBanner}
            alt="تماس با اتکالاین"
            fill
            className="object-cover"
            priority
          />
        </div>
      </div>

      <div>
        <div className="px-4 lg:px-[105px]">
          <h1 className="text-primary-hover my-3 flex items-center gap-1">
            <House className="ml-2 [&_path]:stroke-current" aria-hidden="true" />
            با
            <b> اتکالاین</b> در ارتباط باشید
          </h1>

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

          <div className="mt-[37px] flex flex-col gap-6">
            <div>
              <div>
                <h2 className="mt-2.5 mb-3.75 font-bold">فرم تماس اتکالاین</h2>
                <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                  <p>لطفا قبل از تماس یا ارسال ایمیل، ابتدا سوالات متداول را مشاهده کنید.</p>
                  <Button
                    variant="outline"
                    size="md"
                    className="shrink-0 border-[#F57F17] text-[#F57F17] hover:bg-[#F57F17]/10"
                    render={<Link href="/faq" />}
                  >
                    سوالات متداول
                  </Button>
                </div>
              </div>
            </div>

            <ContactForm />
          </div>
        </div>

        {/* Map */}
        <div className="mx-4 mt-12 flex flex-col justify-center rounded-[16px] border border-[#D1D4D4] px-4 py-12 lg:mx-[105px] lg:px-[113px]">
          <div className="text-center">
            <h2 className="title-large-bold mb-4 text-[#292C2D]">
              همراه شما تا رسیدن به انتخابی ایده آل
            </h2>
            <p className="mb-2 text-[#3E4344]">همین حالا با ما در تماس باشید</p>
            {contactDetails?.tel && (
              <div className="mb-8.25 flex items-center justify-center gap-2 text-[#676F71]">
                <p>
                  <bdi dir="ltr">{contactDetails.tel}</bdi>
                </p>
                <CallIcon className="size-4 shrink-0" aria-hidden="true" />
              </div>
            )}
          </div>
          <div className="mb-8 h-114.25 w-full overflow-hidden rounded-[12px] border border-[#E1E2E3]">
            <iframe
              src="https://neshan.org/maps/iframe/places/339691bc28657599e7a7476348c8de10#c35.727-51.536-15z-0p/35.7272085410349/51.530736064647584"
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
                  {label === "تلفن پشتیبانی" ? (
                    <>
                      <div className="flex items-center gap-2">
                        <p className="label-large-bold">{label}:</p>
                        <p className="body-medium">
                          <bdi dir="ltr">{value}</bdi>
                        </p>
                      </div>
                      <p className="mt-1 text-xs">۷ روز هفته، ۲۴ ساعته پاسخگوی شما هستیم</p>
                    </>
                  ) : (
                    <>
                      <p className="label-large-bold">{label}</p>
                      <p className="body-medium mt-2">{value}</p>
                    </>
                  )}
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
