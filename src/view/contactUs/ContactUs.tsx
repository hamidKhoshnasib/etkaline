import Image from "next/image";
import Link from "next/link";
import { Headset, Mail, MapPin } from "lucide-react";
import contactUsBanner from "@/assets/images/contactUs.jpg";
import House from "@/assets/icons/home-house-favorite.svg";
import { SOCIALS } from "@/components/layout/footer/footer.config";
import Social1 from "@/assets/icons/social-1.svg";
import ContactForm from "@/view/contactUs/ContactForm";

const contactItems = [
  {
    icon: Headset,
    label: "تلفن پشتیبانی:  ۴۸۵۶ - ۰۲۱",
    value: "۷ روز هفته، ۲۴ ساعته پاسخگوی شما هستیم",
  },
  {
    icon: Mail,
    label: "ایمیل",
    value: "info@zihome.com",
  },
  {
    icon: MapPin,
    label: "آدرس شعبه حضوری",
    value: "تهران، مجتمع تجاری تفریحی ایران مال، طبقه منفی ۳، واحد۳",
  },
];

export default function ContactUsPage() {
  return (
    <main className="container mx-auto pt-9 pb-12">
      {/* Hero Banner */}
      <div className="relative h-70 w-full overflow-hidden">
        <Image
          src={contactUsBanner}
          alt="تماس با اتکالاین"
          fill
          className="object-cover"
          priority
        />
      </div>

      <div>
        {/* Breadcrumb */}
        <p className="text-primary-hover my-3 flex items-center gap-1">
          <House className="ml-2" />
          با
          <b> اتکالاین</b> در ارتباط باشید
        </p>

        <p>
          ما همیشه آماده پاسخگویی به سوالات شما هستیم . اگر درباره محصولات ، نحوه خرید ، ارسال سفارش
          یا هر موضوع دیگری سوالی دارید ، تیم پشتیبانی اتکالاین در کنار شماست. با ما از طریق فرم
          تماس زیر تماس بگیرید و همچنین میتوانید به آدرس [@] ایمیل بزنید یا از طریق واتس آپ ما در
          گوشه سمت راست پایین این صفحه با ما چت کنید. ما قصد داریم ظرف 1-2 روز کاری به شما پاسخ دهیم
          رضایت شما الویت ماست .
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

        {/* Map */}
        <div className="mt-12 flex flex-col justify-center rounded-[16px] border border-[#D1D4D4] px-[105px] py-12">
          <h2 className="title-large-bold mb-4 text-[#292C2D]">
            همراه شما تا رسیدن به انتخابی ایده آل
          </h2>
          <p className="mb-2 text-[#3E4344]">همین حالا با ما در تماس باشید</p>
          <p className="mb-8.25 text-[#676F71]"> ۴۸۵۶ - ۰۲۱</p>
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
            <div className="flex gap-3">
              {SOCIALS.map(({ href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="group hover:bg-primary-hover flex h-8 w-8 items-center justify-center rounded-md bg-gray-200 transition-all"
                >
                  <Social1 className="text-[#667085] transition-all duration-300 group-hover:text-white" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
