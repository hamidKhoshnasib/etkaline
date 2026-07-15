import Image from "next/image";
import { cn } from "@/lib/utils";

const FEATURES = [
  { icon: "store", title: "امکان خرید حضوری" },
  { icon: "guarantee", title: "ضمانت اصل بودن کالا" },
  { icon: "support", title: "پشتیبانی  24/7" },
  { icon: "delivery", title: "امکان تحویل اکسپرس" },
] as const;

export function FeatureBar() {
  return (
    <div className="absolute z-10 w-full overflow-hidden rounded-b-[28px] bg-white shadow-xl lg:shadow-2xl">
      <div className="container mx-auto">
        <ul className="grid grid-cols-2 gap-2 p-4 lg:flex lg:items-center lg:justify-between lg:gap-0 lg:p-6">
          {FEATURES.map(({ icon, title }, index) => {
            const mobileOrderClass = [
              "order-4 lg:order-none",
              "order-3 lg:order-none",
              "order-2 lg:order-none",
              "order-1 lg:order-none",
            ][index];

            return (
              <li
                key={title}
                className={cn(
                  mobileOrderClass,
                  "bg-muted flex min-h-21 flex-col items-center justify-center gap-2 rounded-2xl px-2 text-center lg:min-h-0 lg:flex-row lg:gap-4 lg:rounded-none lg:bg-transparent lg:px-0 lg:text-right",
                )}
              >
                <p className="text-secondary text-sm font-bold">{title}</p>
                <Image
                  src={`/api/footer-icons/${icon}`}
                  alt=""
                  width={48}
                  height={48}
                  unoptimized
                  className="size-9 shrink-0 lg:size-12"
                />
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
