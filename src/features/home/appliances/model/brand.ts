// مدل داخلی برند برای UI؛ فیلدهای backend در API mapper به این مدل تبدیل می‌شوند.
export interface HomeBrand {
  id: number | string;
  name: string;
  image: string;
  href: string;
}

type BackendBrand = Record<string, unknown>;

export function mapHomeBrand(brand: BackendBrand): HomeBrand | null {
  const id = brand.id ?? brand.brandId;
  const name = brand.name ?? brand.title ?? brand.brandName;
  const image = brand.image ?? brand.imageUrl ?? brand.picUrl ?? brand.pic;
  if ((typeof id !== "string" && typeof id !== "number") || typeof name !== "string") {
    return null;
  }
  const imageUrl =
    typeof image === "string" && image.trim() ? image : "/images/image-placeholder.svg";
  const slug = typeof brand.slug === "string" ? brand.slug : String(id);
  return { id, name, image: imageUrl, href: `/brand/${encodeURIComponent(slug)}` };
}
