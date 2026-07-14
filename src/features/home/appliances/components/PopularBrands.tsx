import Link from "next/link";
import Image from "next/image";

interface Brand {
  id: number | string;
  name: string;
  image: string;
  href?: string;
}

interface PopularBrandsProps {
  brands: Brand[];
}

function BrandCard({ name, image, href = "#" }: Brand) {
  return (
    <Link
      href={href}
      className="flex h-12 w-full shrink-0 items-center justify-center rounded-xl border border-[#CBD5E1] sm:h-26.25 sm:w-[102.5px]"
    >
      <Image src={image} alt={name} width={103} height={105} className="object-contain" />
    </Link>
  );
}

export default function PopularBrands({ brands }: PopularBrandsProps) {
  return (
    <section className="w-full rounded-2xl border border-[#E2E8F0] bg-white p-3 sm:rounded-[28px] sm:p-4">
      <h2 className="sm:headline-small-bold mb-3 text-center text-base font-bold sm:mb-4">
        برندهای محبوب
      </h2>

      <div className="grid grid-cols-3 gap-2 sm:flex sm:gap-4 sm:overflow-x-auto sm:pb-1 [&::-webkit-scrollbar]:hidden">
        {brands.map((brand) => (
          <BrandCard key={brand.id} {...brand} />
        ))}
      </div>
    </section>
  );
}

export type { Brand, PopularBrandsProps };
