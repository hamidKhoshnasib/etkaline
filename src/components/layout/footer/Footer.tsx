import Link from "next/link";

import Etehadie from "@/assets/icons/etehadie-icon.svg";
import Enamad from "@/assets/icons/enamad-icon.svg";
import Samandehi from "@/assets/icons/samandehi-icon.svg";
import { AppSupportBar } from "@/components/layout/footer/AppSupportBar";
import { FeatureBar } from "@/components/layout/footer/FeatureBar";
import { LINK_COLUMNS } from "@/components/layout/footer/footer.config";
import { Container } from "@/components/ui/Container";
import { AppImage } from "@/components/ui/image";
import { SectionErrorBoundary } from "@/components/ui/section-error-boundary";
import { getExtraPages } from "@/features/extra-pages/api/get-extra-pages";
import { getExtraPageHref } from "@/features/extra-pages/lib/get-extra-page-href";
import { getFooterDescription } from "@/features/home/appliances/api/get-footer-description";
import { getSocialNetworks } from "@/features/social/api/get-social-networks";
import { SocialNetworkLinks } from "@/features/social/components/SocialNetworkLinks";

interface FooterLinkColumnProps {
  title: string;
  items: readonly { label: string; href: string }[];
}

function FooterLinkColumn({ title, items }: FooterLinkColumnProps) {
  return (
    <div className="order-2 lg:order-0">
      <details className="group pb-3 lg:hidden">
        <summary className="title-medium-bold flex cursor-pointer list-none items-center justify-between">
          {title}
          <span aria-hidden="true" className="text-xl transition-transform group-open:rotate-180">
            ⌄
          </span>
        </summary>
        <ul className="mt-3 space-y-2">
          {items.map((item) => (
            <li key={item.href}>
              <Link href={item.href}>{item.label}</Link>
            </li>
          ))}
        </ul>
      </details>

      <nav className="hidden lg:block">
        <h3 className="title-medium-bold">{title}</h3>
        <ul className="mt-2 space-y-2">
          {items.map((item) => (
            <li key={item.href}>
              <Link href={item.href}>{item.label}</Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}

async function FooterDescription() {
  const footerDescription = await getFooterDescription();
  return footerDescription ? <p className="body-medium line-clamp-7">{footerDescription}</p> : null;
}

async function FooterExtraPagesColumn() {
  const extraPages = await getExtraPages();
  return (
    <FooterLinkColumn
      title={LINK_COLUMNS[1].title}
      items={extraPages.footerItems.map((page) => ({
        href: getExtraPageHref(page.id),
        label: page.title,
      }))}
    />
  );
}

async function FooterSocialLinks() {
  return (
    <SocialNetworkLinks
      socialNetworks={await getSocialNetworks()}
      className="flex justify-center gap-3 lg:justify-start"
    />
  );
}

export function Footer() {
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
              <SectionErrorBoundary
                title="دریافت توضیحات فروشگاه ممکن نشد."
                className="min-h-0 border-0 bg-transparent p-0"
              >
                <FooterDescription />
              </SectionErrorBoundary>
            </div>

            <FooterLinkColumn {...LINK_COLUMNS[0]} />
            <SectionErrorBoundary
              title="دریافت لینک‌های راهنما ممکن نشد."
              className="order-2 min-h-0 bg-transparent py-2 lg:order-0"
            >
              <FooterExtraPagesColumn />
            </SectionErrorBoundary>

            <div className="order-4 mt-6 mb-6 space-y-7.5 text-center lg:order-0 lg:mt-0 lg:mb-0 lg:text-right">
              <div>
                <p className="title-medium-bold mb-4">همراه ما باشید</p>
                <SectionErrorBoundary
                  title="دریافت شبکه‌های اجتماعی ممکن نشد."
                  className="min-h-0 border-0 bg-transparent p-0"
                >
                  <FooterSocialLinks />
                </SectionErrorBoundary>
              </div>
              <div className="grid grid-cols-3 gap-3 lg:flex lg:gap-4">
                <div className="flex h-16 items-center justify-center overflow-hidden rounded-xl bg-white lg:h-auto lg:bg-transparent">
                  <Enamad />
                </div>
                <div className="flex h-16 items-center justify-center overflow-hidden rounded-xl bg-white lg:h-auto lg:bg-transparent">
                  <Etehadie />
                </div>
                <div className="flex h-16 items-center justify-center overflow-hidden rounded-xl bg-white lg:h-auto lg:bg-transparent">
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
