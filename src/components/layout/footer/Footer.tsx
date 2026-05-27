import Link from "next/link";
import { FeatureBar } from "@/components/layout/footer/FeatureBar";
import { AppSupportBar } from "@/components/layout/footer/AppSupportBar";
import { LINK_COLUMNS, SOCIALS } from "@/components/layout/footer/footer.config";
import EtkalineLogo from "@/assets/icons/logo.svg";
import Enamad from "@/assets/icons/enamad-icon.svg";
import Etehadie from "@/assets/icons/etehadie-icon.svg";
import Samandehi from "@/assets/icons/samandehi-icon.svg";
import Social1 from "@/assets/icons/social-1.svg";

// ── Component ─────────────────────────────────────────────────────────────────

export function Footer() {
  return (
    <footer className="relative">
      <FeatureBar />

      <div className="bg-primary text-secondary pt-24.5">
        <div className="container mx-auto pt-12">
          <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {/* Company info */}
            <div className="space-y-4.25">
              <EtkalineLogo className="text-secondary h-8.75 w-30" />
              <p className="body-medium line-clamp-7">
                اتکالاین سال‌ها است که به انتخاب اول بسیاری از خریداران اینترنتی تبدیل شده است.
                اتکالاین به عنوان بزرگ‌ترین و معتبرترین فروشگاه آنلاین ایران، شناخته‌شده‌ترین
                فروشگاه نیز محسوب می‌شود. این فروشگاه آنلاین نه‌تنها گسترده‌ترین تنوع کالا را در
                دسته‌بندی‌های مختلف ارائه می‌دهد، بلکه با خدمات بی‌نظیر، ارسال سریع، ضمانت اصل بودن
                کالا و پشتیبانی حرفه‌ای، استاندارد جدیدی در خرید اینترنتی ایران تعریف کرده است.
              </p>
            </div>

            {/* Link columns */}
            {LINK_COLUMNS.map((col) => (
              <nav key={col.title}>
                <h3 className="title-medium-bold mb-2.5">{col.title}</h3>
                <ul className="space-y-2">
                  {col.items.map((item) => (
                    <li key={item.href}>
                      <Link href={item.href}>{item.label}</Link>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}

            {/* Social & trust */}
            <div className="space-y-7.5">
              <div>
                <p className="title-medium-bold mb-4">همراه ما باشید</p>
                <div className="flex gap-3">
                  {SOCIALS.map(({ href, label }) => (
                    <a
                      key={label}
                      href={href}
                      aria-label={label}
                      className="group hover:bg-secondary flex h-8 w-8 items-center justify-center rounded-md bg-gray-200 transition-all"
                    >
                      <Social1 className="transition-all duration-300 group-hover:text-white" />
                    </a>
                  ))}
                </div>
              </div>
              <div className="flex gap-4">
                <Enamad />
                <Etehadie />
                <Samandehi />
              </div>
            </div>
          </div>
        </div>

        <AppSupportBar />

        <p className="bg-gray-500/10 py-4 text-center text-xs text-black">
          © کلیه حقوق این سایت متعلق به شرکت فروشگاه‌های زنجیره‌ای اتکا می‌باشد.
        </p>
      </div>
    </footer>
  );
}
