import { Headset } from "lucide-react";
import { Container } from "@/components/ui/Container";
import BazarIcon from "@/assets/icons/bazar-icon.svg";
import MayketIcon from "@/assets/icons/mayket-icon.svg";

type AppSupportBarProps = {
  mobileVariant?: "download" | "support";
};

export function AppSupportBar({ mobileVariant }: AppSupportBarProps) {
  const supportDetails = (
    <div>
      <p className="title-medium-bold">
        تلفن پشتیبانی: <bdi dir="ltr">۰۲۱-۴۸۵۶</bdi>
      </p>
      <p className="body-small">۷ روز هفته، ۲۴ ساعته پاسخگوی شما هستیم</p>
    </div>
  );

  const support = (
    <div className="flex items-center gap-3">
      <Headset className="size-9 shrink-0" aria-hidden="true" />
      {supportDetails}
    </div>
  );

  const downloadDetails = (
    <div>
      <p className="mb-1 font-bold">دانلود اپلیکیشن</p>
      <p className="body-small">
        اپلیکیشن اتکالاین را دانلود کنید و هر روز تخفیفات هیجان انگیز مشاهده کنید
      </p>
    </div>
  );

  const downloadButtons = (
    <div className="flex items-center gap-2">
      <a href="#" aria-label="دریافت از بازار">
        <BazarIcon className="h-10 w-auto" />
      </a>
      <a href="#" aria-label="دریافت از مایکت">
        <MayketIcon className="h-10 w-auto" />
      </a>
    </div>
  );

  const download = (
    <div>
      {downloadDetails}
      <div className="mt-3">{downloadButtons}</div>
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
      <Container>
        <div className="grid grid-cols-4 items-center gap-10 py-5">
          <div className="flex shrink-0 items-center gap-4">
            <Headset size={38} aria-hidden="true" />
            <div className="bg-secondary h-10 w-px shrink-0" />
            {supportDetails}
          </div>

          <div className="col-span-2 flex justify-center">
            <div className="text-right">{downloadDetails}</div>
          </div>
          <div className="col-start-4 flex justify-start">{downloadButtons}</div>
        </div>
      </Container>
    </div>
  );
}
