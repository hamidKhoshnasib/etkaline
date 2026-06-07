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
      className="border border-[#CBD5E1] flex h-26.25 w-[102.5px] shrink-0 items-center justify-center rounded-[20px]"
    >
      <Image src={image} alt={name} width={103} height={105} className="object-contain" />
    </Link>
  );
}

export default function PopularBrands({ brands }: PopularBrandsProps) {
  return (
    <section className="w-full rounded-[28px] border-[#E2E8F0] border bg-white p-4">
      <h2 className="headline-small-bold mb-4 text-center">برندهای محبوب</h2>

      <div className="flex gap-4 overflow-x-auto pb-1 [&::-webkit-scrollbar]:hidden">
        {brands.map((brand) => (
          <BrandCard key={brand.id} {...brand} />
        ))}
      </div>
    </section>
  );
}

export type { Brand, PopularBrandsProps };
