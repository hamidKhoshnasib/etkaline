import Link from "next/link";
import { ArrowLeftIcon } from "lucide-react";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Container } from "@/components/ui/Container";
import { Separator } from "@/components/ui/separator";
import { TermsTableOfContents } from "@/features/terms/components/TermsTableOfContents";
import { TERMS_SECTIONS } from "@/features/terms/terms-content";
import type { SiteType } from "@/lib/api-site-type";
import { getStorefront } from "@/config/storefront";

import styles from "./TermsPage.module.css";

export function TermsPage({ siteType }: { siteType: SiteType }) {
  const storefront = getStorefront(siteType);

  return (
    <main className="bg-muted/30 flex-1">
      <Container className="py-5 lg:py-8">
        <div className="-mx-4 mb-8 bg-[#F8FAFC] px-4 py-3 lg:mx-0 lg:bg-transparent lg:px-0 lg:py-0">
          <Breadcrumb className="mb-0">
            <BreadcrumbList className="flex-nowrap overflow-x-auto text-nowrap">
              <BreadcrumbItem>
                <BreadcrumbLink render={<Link href={storefront.homeHref} />}>خانه</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="[&>svg]:size-3.5!">
                <ArrowLeftIcon className="text-auth-accent size-3.5 stroke-[2.5]" />
              </BreadcrumbSeparator>
              <BreadcrumbItem>
                <BreadcrumbPage>قوانین و مقررات</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>

        <div
          className={`${styles.layout} grid grid-cols-1 gap-6 pb-16 lg:items-start lg:gap-8 lg:pb-24`}
        >
          <Card className="w-full gap-0 rounded-2xl py-3 shadow-none lg:sticky lg:top-36">
            <CardContent className="px-0">
              <TermsTableOfContents sections={TERMS_SECTIONS} />
            </CardContent>
          </Card>

          <Card className="min-w-0 flex-1 gap-0 rounded-2xl py-0 shadow-none">
            <CardHeader className="px-5 pt-6 pb-5 lg:px-7 lg:pt-7">
              <CardTitle>
                <h1 className="text-2xl leading-10 font-bold lg:text-3xl">
                  قوانین و مقررات اتکالاین
                </h1>
              </CardTitle>
              <CardDescription>
                آخرین به‌روزرسانی: <time dateTime="2025-12">آذر ۱۴۰۴</time>
              </CardDescription>
            </CardHeader>

            <Separator />

            <CardContent className="flex flex-col gap-7 px-5 py-7 lg:px-7">
              {TERMS_SECTIONS.map((section) => (
                <section
                  key={section.id}
                  id={section.id}
                  className="scroll-mt-40"
                  aria-labelledby={`${section.id}-title`}
                >
                  <h2
                    id={`${section.id}-title`}
                    className="mb-3 flex items-center gap-2 text-base font-bold lg:text-lg"
                  >
                    <span className="bg-primary-hover h-5 w-1 rounded-full" aria-hidden="true" />
                    {section.title}
                  </h2>
                  <p className="text-foreground/80 text-sm leading-8 lg:text-base lg:leading-8">
                    {section.content}
                  </p>
                </section>
              ))}
            </CardContent>
          </Card>
        </div>
      </Container>
    </main>
  );
}
