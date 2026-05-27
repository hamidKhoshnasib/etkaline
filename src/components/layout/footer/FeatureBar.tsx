import { Fragment } from "react";
import GuaranteeIcon from "@/assets/icons/icons8_guarantee.svg";
import SupportIcon from "@/assets/icons/icons8_customer_support.svg";
import DeliveryIcon from "@/assets/icons/icons8_in_transit.svg";
import StoreIcon from "@/assets/icons/icons8_online_store.svg";

const FEATURES = [
  { Icon: StoreIcon, title: "امکان خرید حضوری" },
  { Icon: GuaranteeIcon, title: "ضمانت اصل بودن کالا" },
  { Icon: SupportIcon, title: "پشتیبانی  24/7" },
  { Icon: DeliveryIcon, title: "امکان تحویل اکسپرس" },
] as const;

export function FeatureBar() {
  return (
    <div className="absolute w-full overflow-hidden rounded-b-[28px] bg-white shadow-2xl">
      <div className="container mx-auto">
        <ul className="flex items-center justify-between p-6">
          {FEATURES.map(({ Icon, title }, i) => (
            <Fragment key={title}>
              {i > 0 && (
                <li aria-hidden="true" className="flex items-center self-stretch">
                  <span className="bg-secondary/15 h-full w-px" />
                </li>
              )}
              <li className="flex items-center gap-4">
                <p className="text-secondary text-sm font-bold">{title}</p>
                <Icon className="size-12 shrink-0" aria-hidden="true" />
              </li>
            </Fragment>
          ))}
        </ul>
      </div>
    </div>
  );
}
