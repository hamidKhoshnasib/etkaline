import Link from "next/link";
import Image from "next/image";

const categories: { id: number; image: string; label: string; href: string }[] = [
  { id: 1, image: "/api/category-icons/c1", label: "ایرفرایر", href: "/categories/fridge" },
  { id: 2, image: "/api/category-icons/c2", label: "پکیج و شوفارژ", href: "/categories/washer" },
  { id: 3, image: "/api/category-icons/c3", label: "هود", href: "/categories/dishwasher" },
  { id: 4, image: "/api/category-icons/c4", label: "ماکروفر", href: "/categories/tv" },
  { id: 11, image: "/api/category-icons/c11", label: "گریل و باربیکیو", href: "/categories/other" },
  { id: 10, image: "/api/category-icons/c10", label: "یخچال", href: "/categories/bath" },
  { id: 9, image: "/api/category-icons/c9", label: "اجاق گاز", href: "/categories/audio" },
  { id: 8, image: "/api/category-icons/c8", label: "پخت و پز برقی", href: "/categories/tools" },
  { id: 7, image: "/api/category-icons/c7", label: "خوردکن و غذاساز", href: "/categories/kitchen" },
  { id: 6, image: "/api/category-icons/c6", label: "ماشین ظرفشویی", href: "/categories/ac" },
  { id: 5, image: "/api/category-icons/c5", label: "لباسشویی", href: "/categories/vacuum" },
];

export default function CategoryStrip() {
  return (
    <div className="-mx-4 flex w-[calc(100%+2rem)] touch-pan-x snap-x snap-mandatory [scrollbar-width:none] gap-3 overflow-x-scroll overscroll-x-contain px-4 lg:mx-0 lg:w-full lg:justify-between lg:gap-2 lg:overflow-visible lg:px-0 [&::-webkit-scrollbar]:hidden">
      {categories.map(({ id, image, label, href }) => (
        <Link
          key={id}
          href={href}
          className="flex w-16 shrink-0 snap-start flex-col items-center gap-1.5 lg:w-auto lg:gap-2"
        >
          <Image
            src={image}
            alt=""
            width={56}
            height={56}
            unoptimized
            className="size-14 object-contain lg:size-20"
          />
          <span className="label-medium w-full truncate text-center">{label}</span>
        </Link>
      ))}
    </div>
  );
}
