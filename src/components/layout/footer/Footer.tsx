import Link from "next/link";
import { AppImage } from "@/components/ui/image";
import { Container } from "@/components/ui/Container";
import { FeatureBar } from "@/components/layout/footer/FeatureBar";
import { AppSupportBar } from "@/components/layout/footer/AppSupportBar";
import { LINK_COLUMNS } from "@/components/layout/footer/footer.config";
import Enamad from "@/assets/icons/enamad-icon.svg";
import Etehadie from "@/assets/icons/etehadie-icon.svg";
import Samandehi from "@/assets/icons/samandehi-icon.svg";
import { getFooterDescription } from "@/features/home/appliances/api/get-footer-description";
import { getExtraPages } from "@/features/extra-pages/api/get-extra-pages";
import { getExtraPageHref } from "@/features/extra-pages/lib/get-extra-page-href";
import { getSocialNetworks } from "@/features/social/api/get-social-networks";
import { SocialNetworkLinks } from "@/features/social/components/SocialNetworkLinks";

// ── Component ─────────────────────────────────────────────────────────────────

export async function Footer() {
  const [footerDescription, socialNetworks, extraPages] = await Promise.all([
    getFooterDescription(),
    getSocialNetworks(),
    getExtraPages(),
  ]);
  const linkColumns = LINK_COLUMNS.map((column) =>
    column.title === "راهنمای مشتریان"
      ? {
          ...column,
          items: extraPages.footerItems.map((page) => ({
            href: getExtraPageHref(page.id),
            label: page.title,
          })),
        }
      : column,
  );

  return (
    <footer className="relative overflow-hidden">
      <FeatureBar />

      <div className="etkaline-pattern !bg-primary text-secondary relative isolate pt-52 lg:pt-24.5">
        <AppSupportBar mobileVariant="support" />

        <Container fluid className="lg:container lg:mx-auto lg:px-0 lg:pt-12">
          <div className="grid grid-cols-1 gap-0 lg:grid-cols-4 lg:gap-10">
            <div className="order-3 mt-6 space-y-4.25 lg:order-0 lg:mt-0">
              <AppImage
                src="/api/footer-icons/logo"
                alt="اتکالاین"
                width={200}
                height={47}
                unoptimized
                className="h-auto w-30"
              />
              {footerDescription && <p className="body-medium line-clamp-7">{footerDescription}</p>}
            </div>

            {linkColumns.map((col) => (
              <div key={col.title} className="order-2 lg:order-0">
                <details className="group pb-3 lg:hidden">
                  <summary className="title-medium-bold flex cursor-pointer list-none items-center justify-between">
                    {col.title}
                    <span
                      aria-hidden="true"
                      className="text-xl transition-transform group-open:rotate-180"
                    >
                      ⌄
                    </span>
                  </summary>
                  <ul className="mt-3 space-y-2">
                    {col.items.map((item) => (
                      <li key={item.href}>
                        <Link href={item.href}>{item.label}</Link>
                      </li>
                    ))}
                  </ul>
                </details>

                <nav className="hidden lg:block">
                  <h3 className="title-medium-bold">{col.title}</h3>
                  <ul className="mt-2 space-y-2">
                    {col.items.map((item) => (
                      <li key={item.href}>
                        <Link href={item.href}>{item.label}</Link>
                      </li>
                    ))}
                  </ul>
                </nav>
              </div>
            ))}

            <div className="order-4 mt-6 mb-6 space-y-7.5 text-center lg:order-0 lg:mt-0 lg:mb-0 lg:text-right">
              <div>
                <p className="title-medium-bold mb-4">همراه ما باشید</p>
                <SocialNetworkLinks
                  socialNetworks={socialNetworks}
                  className="flex justify-center gap-3 lg:justify-start"
                />
              </div>
              <div className="grid grid-cols-3 gap-3 lg:flex lg:gap-4">
                <div className="flex h-16 items-center justify-center rounded-xl bg-white lg:h-auto lg:bg-transparent">
                  <Enamad />
                </div>
                <div className="flex h-16 items-center justify-center rounded-xl bg-white lg:h-auto lg:bg-transparent">
                  <Etehadie />
                </div>
                <div className="flex h-16 items-center justify-center rounded-xl bg-white lg:h-auto lg:bg-transparent">
                  <Samandehi />
                </div>
              </div>
            </div>
          </div>
        </Container>

        <AppSupportBar />
        <AppSupportBar mobileVariant="download" />

        <p className="bg-gray-500/15 px-4 py-4 text-center text-xs text-black">
          © کلیه حقوق این سایت متعلق به شرکت فروشگاه‌های زنجیره‌ای اتکا می‌باشد.
        </p>
      </div>
    </footer>
  );
}
