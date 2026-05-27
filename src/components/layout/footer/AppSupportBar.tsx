import { Headset } from "lucide-react";
import BazarIcon from "@/assets/icons/bazar-icon.svg";
import MayketIcon from "@/assets/icons/mayket-icon.svg";

export function AppSupportBar() {
  return (
    <div className="text-secondary mb-6">
      <div className="container mx-auto">
        <div className="flex items-center justify-between gap-6 py-5">
          {/* Phone support */}
          <div className="text-bg-primary flex shrink-0 items-center gap-4">
            <Headset size={38} />
            <div className="bg-secondary h-10 w-px shrink-0" />

            <div>
              <p className="title-medium-bold">تلفن پشتیبانی:۰۲۱-۴۸۵۶</p>
              <p className="body-small">۷ روز هفته، ۲۴ ساعته پاسخگوی شما هستیم</p>
            </div>
          </div>

          {/* App download text */}
          <div className="flex flex-col justify-center">
            <p className="mb-1 font-bold">دانلود اپلیکیشن</p>
            <p className="body-small">
              اپلیکیشن اتکالاین را دانلود کنید و هر روز تخفیفات هیجان انگیز مشاهده کنید
            </p>
          </div>

          {/* Store buttons */}
          <div className="flex shrink-0 items-center gap-3">
            <a href="#">
              <BazarIcon />
            </a>
            <a href="#">
              <MayketIcon />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
