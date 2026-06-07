import Link from "next/link";
import type { ComponentType, SVGProps } from "react";
import C1 from "@/assets/icons/c1.svg";
import C2 from "@/assets/icons/c2.svg";
import C3 from "@/assets/icons/c3.svg";
import C4 from "@/assets/icons/c4.svg";
import C5 from "@/assets/icons/c5.svg";
import C6 from "@/assets/icons/c6.svg";
import C7 from "@/assets/icons/c7.svg";
import C8 from "@/assets/icons/c8.svg";
import C9 from "@/assets/icons/c9.svg";
import C10 from "@/assets/icons/c10.svg";
import C11 from "@/assets/icons/c11.svg";

type SvgComponent = ComponentType<SVGProps<SVGSVGElement>>;

const categories: { id: number; Icon: SvgComponent; label: string; href: string }[] = [
  { id: 1, Icon: C1, label: "ایرفرایر", href: "/categories/fridge" },
  { id: 2, Icon: C2, label: "پکیج و شوفارژ", href: "/categories/washer" },
  { id: 3, Icon: C3, label: "هود", href: "/categories/dishwasher" },
  { id: 4, Icon: C4, label: "ماکروفر", href: "/categories/tv" },
  { id: 11, Icon: C11, label: "گریل و باربیکیو", href: "/categories/other" },
  { id: 10, Icon: C10, label: "یخچال", href: "/categories/bath" },
  { id: 9, Icon: C9, label: "اجاق گاز", href: "/categories/audio" },
  { id: 8, Icon: C8, label: "پخت و پز برقی", href: "/categories/tools" },
  { id: 7, Icon: C7, label: "خوردکن و غذاساز", href: "/categories/kitchen" },
  { id: 6, Icon: C6, label: "ماشین ظرفشویی", href: "/categories/ac" },
  { id: 5, Icon: C5, label: "لباسشویی", href: "/categories/vacuum" },
];

export default function CategoryStrip() {
  return (
    <div className="flex justify-between gap-2 overflow-x-auto [&::-webkit-scrollbar]:hidden">
      {categories.map(({ id, Icon, label, href }) => (
        <Link
          key={id}
          href={href}
          className="flex shrink-0 flex-col items-center gap-2"
        >
            <Icon width={80} height={80} />
          <span className="label-medium text-center">
            {label}
          </span>
        </Link>
      ))}
    </div>
  );
}