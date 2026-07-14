import { Headset } from "lucide-react";
import BazarIcon from "@/assets/icons/bazar-icon.svg";
import MayketIcon from "@/assets/icons/mayket-icon.svg";

type AppSupportBarProps = {
  mobileVariant?: "download" | "support";
};

export function AppSupportBar({ mobileVariant }: AppSupportBarProps) {
  const supportDetails = (
    <div>
      <p className="title-medium-bold">تلفن پشتیبانی: ۰۲۱-۴۸۵۶</p>
      <p className="body-small">۷ روز هفته، ۲۴ ساعته پاسخگوی شما هستیم</p>
    </div>
  );

  const support = (
    <div className="flex items-center gap-3">
      <Headset className="size-9 shrink-0" aria-hidden="true" />
      {supportDetails}
    </div>
  );

  const download = (
    <div>
      <p className="mb-1 font-bold">دانلود اپلیکیشن</p>
      <p className="body-small">
        اپلیکیشن اتکالاین را دانلود کنید و هر روز تخفیفات هیجان انگیز مشاهده کنید
      </p>
      <div className="mt-3 flex items-center gap-2">
        <a href="#" aria-label="دریافت از بازار">
          <BazarIcon className="h-10 w-auto" />
        </a>
        <a href="#" aria-label="دریافت از مایکت">
          <MayketIcon className="h-10 w-auto" />
        </a>
      </div>
    </div>
  );

  if (mobileVariant === "support") {
    return <div className="text-secondary px-4 pt-3 pb-6 lg:hidden">{support}</div>;
  }

  if (mobileVariant === "download") {
    return <div className="text-secondary px-4 pb-6 lg:hidden">{download}</div>;
  }

  return (
    <div className="text-secondary mb-6 hidden lg:block">
      <div className="container mx-auto">
        <div className="flex items-center justify-between gap-6 py-5">
          <div className="flex shrink-0 items-center gap-4">
            <Headset size={38} aria-hidden="true" />
            <div className="bg-secondary h-10 w-px shrink-0" />
            {supportDetails}
          </div>

          {download}
        </div>
      </div>
    </div>
  );
}
