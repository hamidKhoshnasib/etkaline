"use client";

import { Btn } from "@/components/ui/Btn";
import { alert } from "@/components/ui/Alert";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Spinner } from "@/components/ui/spinner";
import { Pagination } from "@/components/ui/Pagination";
import { ProductCard } from "@/components/ui/ProductCard";
import gazImg from "@/assets/images/gaz.png";
import { Check, HomeIcon } from "lucide-react";
import ArrowLeft from "@/assets/icons/arrow-left.svg";

const sizes = ["sm", "md", "lg", "xl"] as const;
const iconSizes = ["icon-sm", "icon-md", "icon-lg", "icon-xl"] as const;
const variants = ["default", "outline-primary", "ghost", "secondary-gray"] as const;

export default function Home() {
  return (
    <div className="container mx-auto flex min-h-screen flex-col gap-8 py-10">
      {variants.map((variant) => (
        <div key={variant} className="flex flex-col gap-3">
          <p className="title-large-bold">{variant}</p>
          <div className="flex items-center gap-3">
            {sizes.map((size) => (
              <Btn key={size} variant={variant} size={size}>
                <Check /> عنوان <Check />
              </Btn>
            ))}
            <Btn variant={variant} size="lg" disabled>
              <Check /> عنوان <Check />
            </Btn>
          </div>
          <div className="flex items-center gap-3">
            {iconSizes.map((size) => (
              <Btn key={size} variant={variant} size={size}>
                <Check />
              </Btn>
            ))}
            <Btn variant={variant} size="icon-lg" disabled>
              <Check />
            </Btn>
          </div>
        </div>
      ))}

      <div className="flex flex-col gap-4">
        <p className="title-large-bold">Breadcrumbs</p>

        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">
                <HomeIcon className="size-4" />
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator>
              <ArrowLeft className="text-primary-hover" />
            </BreadcrumbSeparator>
            <BreadcrumbItem>
              <BreadcrumbLink href="#">لوازم خانگی</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator>
              <ArrowLeft className="text-primary-hover" />
            </BreadcrumbSeparator>
            <BreadcrumbItem>
              <BreadcrumbLink href="#">یخچال فریزر</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator>
              <ArrowLeft className="text-primary-hover" />
            </BreadcrumbSeparator>
            <BreadcrumbItem>
              <BreadcrumbPage>یخچال فریزر</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">
                <HomeIcon className="size-4" />
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator>
              <ArrowLeft className="text-primary-hover" />
            </BreadcrumbSeparator>
            <BreadcrumbItem>
              <BreadcrumbLink href="#">لوازم خانگی</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator>
              <ArrowLeft className="text-primary-hover" />
            </BreadcrumbSeparator>
            <BreadcrumbItem>
              <BreadcrumbPage>لوازم خانگی</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">
                <HomeIcon className="size-4" />
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator>
              <ArrowLeft className="text-primary-hover" />
            </BreadcrumbSeparator>
            <BreadcrumbItem>
              <BreadcrumbPage>یخچال فریزر</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      <div className="flex flex-col gap-4">
        <p className="title-large-bold">Product Card</p>
        <div className="flex flex-wrap gap-4">
          {/* Default */}
          <ProductCard
            image={gazImg.src}
            title="ماشین ظرفشویی ۱۴ نفره بوش مدل SMS6ZCI85M"
            price={580_000_000}
            originalPrice={680_000_000}
            discount={30}
            className="w-52"
          />
          {/* No discount */}
          <ProductCard
            image={gazImg.src}
            title="ماشین ظرفشویی ۱۴ نفره بوش مدل SMS6ZCI85M"
            price={580_000_000}
            className="w-52"
          />
          {/* With bookmark */}
          <ProductCard
            image={gazImg.src}
            title="ماشین ظرفشویی ۱۴ نفره بوش مدل SMS6ZCI85M"
            price={580_000_000}
            originalPrice={680_000_000}
            discount={30}
            isBookmarked
            className="w-52"
          />
          {/* Out of stock */}
          <ProductCard
            image={gazImg.src}
            title="ماشین ظرفشویی ۱۴ نفره بوش مدل SMS6ZCI85M"
            price={580_000_000}
            originalPrice={680_000_000}
            discount={30}
            outOfStock
            className="w-52"
          />
          {/* Mobile */}
          <ProductCard
            variant="mobile"
            image={gazImg.src}
            title="ماشین ظرفشویی ۱۴ نفره بوش مدل SMS6ZCI85M"
            price={580_000_000}
            originalPrice={680_000_000}
            discount={30}
            className="w-72"
          />
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <p className="title-large-bold">Pagination</p>
        <Pagination page={5} total={9} onChange={() => {}} />
      </div>

      <div className="flex flex-col gap-4">
        <p className="title-large-bold">Spinners</p>
        <div className="flex items-center gap-6">
          <Spinner size="sm" />
          <Spinner size="md" />
          <Spinner size="lg" />
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <p className="title-large-bold">Alert Toast</p>
        <div className="flex gap-3">
          {(["success", "info", "warning", "error"] as const).map((variant) => (
            <Btn
              key={variant}
              size="md"
              variant="secondary-gray"
              onClick={() =>
                alert[variant]({
                  title: "عنوان هشدار",
                  description:
                    "اوه، بله، شما با موفقیت این پیام هشدار مهم را خواندید. ,این متن نمونه قرار است کمی طولانی‌تر اجرا شود تا بتوانید ببینید که فاصله‌گذاری در یک هشدار با این نوع محتوا چگونه کار می‌کند..",
                })
              }
            >
              {variant}
            </Btn>
          ))}
        </div>
      </div>
    </div>
  );
}
