import Image from "next/image";
import { InfoIcon } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";

export function SearchEmptyState({ searchText }: { searchText: string }) {
  const title = searchText
    ? `محصولی با عنوان «${searchText}» در فروشگاه پیدا نشد`
    : "محصولی مطابق جستجوی شما در فروشگاه پیدا نشد";

  return (
    <Empty className="bg-card min-h-[38rem] rounded-2xl border px-4 py-10 lg:min-h-[40rem]">
      <EmptyHeader className="max-w-xl gap-3">
        <EmptyMedia>
          <Image
            src="/images/empty/search-empty.svg"
            alt="جستجو میان محصولات بدون نتیجه"
            width={280}
            height={240}
            loading="eager"
            className="h-auto w-52 lg:w-60"
          />
        </EmptyMedia>
        <EmptyTitle className="text-secondary text-base font-bold lg:text-lg">{title}</EmptyTitle>
        <EmptyDescription className="max-w-xl">
          متأسفانه محصولی که دنبال آن هستید در حال حاضر در فروشگاه اتکالاین موجود نیست.
        </EmptyDescription>
      </EmptyHeader>

      <EmptyContent className="mt-8 max-w-[640px]">
        <Card className="w-full text-start">
          <CardHeader>
            <CardTitle className="text-primary flex items-center gap-2 font-bold">
              <InfoIcon className="size-5" aria-hidden="true" />
              پیشنهاد ما به شما:
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="text-muted-foreground flex list-none flex-col gap-3 text-sm">
              <li className="flex items-start gap-2">
                <span className="bg-primary mt-2 size-1.5 shrink-0 rounded-full" />
                از عبارت‌های مشابه یا کوتاه‌تر برای جستجو استفاده کنید.
              </li>
              <li className="flex items-start gap-2">
                <span className="bg-primary mt-2 size-1.5 shrink-0 rounded-full" />
                دسته‌بندی‌های مختلف فروشگاه را مرور کنید.
              </li>
              <li className="flex items-start gap-2">
                <span className="bg-primary mt-2 size-1.5 shrink-0 rounded-full" />
                فیلترهای جستجو را برای مشاهده نتایج بیشتر تغییر دهید.
              </li>
            </ul>
          </CardContent>
        </Card>
      </EmptyContent>
    </Empty>
  );
}
