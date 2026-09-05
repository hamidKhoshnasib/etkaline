"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Home, RefreshCw, SearchX, TriangleAlert } from "lucide-react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/Container";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group";
import { FaqPageSkeleton } from "@/features/faq/components/FaqPageSkeleton";
import { type Faq, useFaqs } from "@/features/faq/api/use-faqs";
import { cn } from "@/lib/utils";
import { useStorefront } from "@/providers/storefront-provider";

type FaqCategoryId = "orders" | "delivery" | "returns";

interface FaqCategory {
  id: FaqCategoryId;
  title: string;
  keywords: readonly string[];
}

const FAQ_CATEGORIES: readonly FaqCategory[] = [
  {
    id: "orders",
    title: "سفارش و خرید",
    keywords: [],
  },
  {
    id: "delivery",
    title: "ارسال و تحویل",
    keywords: ["ارسال", "تحویل", "پست", "پیک", "باربری", "زمان رسیدن", "هزینه ارسال"],
  },
  {
    id: "returns",
    title: "مرجوعی و بازگشت",
    keywords: ["مرجوع", "بازگشت", "تعویض", "انصراف", "لغو", "پس دادن"],
  },
];

function normalizePersianText(value: string) {
  return value
    .trim()
    .toLocaleLowerCase("fa")
    .replaceAll("ي", "ی")
    .replaceAll("ك", "ک")
    .replace(/[\u200c\u200f\u202a-\u202e]/g, " ")
    .replace(/\s+/g, " ");
}

function getFaqCategory(faq: Faq): FaqCategoryId {
  const searchableText = normalizePersianText(`${faq.question} ${faq.answer}`);

  for (const category of [FAQ_CATEGORIES[2], FAQ_CATEGORIES[1]]) {
    if (category.keywords.some((keyword) => searchableText.includes(keyword))) {
      return category.id;
    }
  }

  return "orders";
}

function groupFaqs(faqs: Faq[], query: string) {
  const normalizedQuery = normalizePersianText(query);
  const visibleFaqs = normalizedQuery
    ? faqs.filter((faq) =>
        normalizePersianText(`${faq.question} ${faq.answer}`).includes(normalizedQuery),
      )
    : faqs;

  return FAQ_CATEGORIES.map((category) => ({
    ...category,
    faqs: visibleFaqs.filter((faq) => getFaqCategory(faq) === category.id),
  })).filter((category) => category.faqs.length > 0);
}

export function FaqPage() {
  const { homeHref } = useStorefront();
  const { data: faqs, error, isLoading, refetch, isFetching } = useFaqs();
  const searchParams = useSearchParams();
  const query = searchParams.get("q")?.trim() ?? "";
  const [activeCategory, setActiveCategory] = useState<FaqCategoryId>("orders");
  const availableCategories = faqs ? groupFaqs(faqs, "") : [];
  const selectedCategory = availableCategories.some((category) => category.id === activeCategory)
    ? activeCategory
    : availableCategories[0]?.id;

  function scrollToCategory(categoryId: FaqCategoryId) {
    setActiveCategory(categoryId);
    document.getElementById(`faq-${categoryId}`)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }

  if (isLoading) {
    return <FaqPageSkeleton />;
  }

  return (
    <Container as="main" className="py-6 lg:py-10">
      <Breadcrumb className="mb-8 lg:mb-10">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink render={<Link href={homeHref} />}>
              <Home aria-hidden="true" />
              <span className="sr-only">صفحه اصلی</span>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>سوالات متداول</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <header className="mb-7 flex flex-col gap-2 lg:mb-8">
        <h1 className="text-2xl font-bold lg:text-3xl">سوالات متداول</h1>
        <p className="text-muted-foreground text-sm leading-7 lg:text-base">
          پاسخ سوالات رایج شما درباره خرید، ارسال و خدمات اتکالاین
        </p>
      </header>

      <FaqSearchForm key={query} initialQuery={query} />

      {!!faqs?.length && !query && (
        <nav aria-label="موضوعات سوالات متداول" className="mb-10 overflow-x-auto lg:mb-12">
          <div className="flex min-w-max justify-center gap-3 px-1">
            {availableCategories.map((category) => (
              <Button
                key={category.id}
                type="button"
                size="md"
                variant={selectedCategory === category.id ? "default" : "outline"}
                className={cn("rounded-full", selectedCategory === category.id && "font-bold")}
                onClick={() => scrollToCategory(category.id)}
              >
                {category.title}
              </Button>
            ))}
          </div>
        </nav>
      )}

      {error ? (
        <Empty className="border-destructive/40 bg-destructive/5 min-h-64 border" role="alert">
          <EmptyMedia variant="icon" className="bg-destructive/10 text-destructive">
            <TriangleAlert aria-hidden="true" />
          </EmptyMedia>
          <EmptyHeader>
            <EmptyTitle>دریافت سوالات متداول ممکن نشد</EmptyTitle>
            <EmptyDescription>{error.message}</EmptyDescription>
          </EmptyHeader>
          <EmptyContent>
            <Button
              type="button"
              variant="outline"
              onClick={() => void refetch()}
              disabled={isFetching}
            >
              <RefreshCw data-icon="inline-start" />
              {isFetching ? "در حال دریافت" : "تلاش دوباره"}
            </Button>
          </EmptyContent>
        </Empty>
      ) : faqs?.length ? (
        <FaqSections faqs={faqs} query={query} />
      ) : (
        <FaqEmptyState query={query} />
      )}
    </Container>
  );
}

function FaqSearchForm({ initialQuery }: { initialQuery: string }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [searchValue, setSearchValue] = useState(initialQuery);

  function handleSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const params = new URLSearchParams(searchParams.toString());
    const normalizedSearchValue = searchValue.trim();

    if (normalizedSearchValue) {
      params.set("q", normalizedSearchValue);
    } else {
      params.delete("q");
    }

    const nextQuery = params.toString();
    router.replace(nextQuery ? `${pathname}?${nextQuery}` : pathname, { scroll: false });
  }

  return (
    <form role="search" onSubmit={handleSearch} className="mb-7 lg:mb-8">
      <label htmlFor="faq-search" className="sr-only">
        جستجو در سوالات متداول
      </label>
      <InputGroup className="bg-card h-14 rounded-xl ps-2">
        <InputGroupInput
          id="faq-search"
          type="search"
          value={searchValue}
          onChange={(event) => setSearchValue(event.target.value)}
          placeholder="جستجو در میان موضوعات و سوالات..."
          autoComplete="off"
        />
        <InputGroupAddon align="inline-end">
          <InputGroupButton
            type="submit"
            size="sm"
            className="bg-primary-hover hover:bg-primary-hover/90 text-white"
          >
            جستجو
          </InputGroupButton>
        </InputGroupAddon>
      </InputGroup>
    </form>
  );
}

function FaqSections({ faqs, query }: { faqs: Faq[]; query: string }) {
  const categories = groupFaqs(faqs, query);

  if (!categories.length) {
    return <FaqEmptyState query={query} />;
  }

  return (
    <div className="flex flex-col gap-10 lg:gap-12">
      {categories.map((category) => (
        <section
          key={category.id}
          id={`faq-${category.id}`}
          className="scroll-mt-28"
          aria-labelledby={`faq-${category.id}-title`}
        >
          <h2
            id={`faq-${category.id}-title`}
            className="text-primary-hover mb-5 flex items-center gap-3 text-xl font-bold lg:text-2xl"
          >
            <span className="bg-primary-hover h-7 w-1 rounded-full" aria-hidden="true" />
            {category.title}
          </h2>

          <Accordion
            key={`${category.id}-${query}`}
            defaultValue={[`faq-${category.faqs[0].id}`]}
            className="gap-3"
          >
            {category.faqs.map((faq) => (
              <AccordionItem
                key={faq.id}
                value={`faq-${faq.id}`}
                className="border-border data-open:border-primary-hover bg-card overflow-hidden rounded-xl border"
              >
                <AccordionTrigger className="min-h-16 items-center px-5 py-4 text-right text-sm font-bold hover:no-underline lg:text-base">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="border-border text-muted-foreground border-t px-5 py-4 text-right leading-7 whitespace-pre-line">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </section>
      ))}
    </div>
  );
}

function FaqEmptyState({ query }: { query: string }) {
  return (
    <Empty className="border-border min-h-64 border">
      <EmptyMedia variant="icon">
        <SearchX aria-hidden="true" />
      </EmptyMedia>
      <EmptyHeader>
        <EmptyTitle>{query ? "نتیجه‌ای پیدا نشد" : "سوالی برای نمایش وجود ندارد"}</EmptyTitle>
        <EmptyDescription>
          {query
            ? "عبارت دیگری را جستجو کنید یا بخشی از کلمات سوال را بنویسید."
            : "سوالات متداول پس از انتشار از سمت سرور در این بخش نمایش داده می‌شوند."}
        </EmptyDescription>
      </EmptyHeader>
    </Empty>
  );
}
