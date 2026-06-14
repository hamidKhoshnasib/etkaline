import Image from "next/image";

interface UserImagesSectionProps {
  images: string[];
}

export function UserImagesSection({ images }: UserImagesSectionProps) {
  return (
    <div>
      <h3 className="mb-4 text-right text-base font-bold text-gray-800">تصاویر ارسالی کاربران</h3>
      <div className="flex gap-3 overflow-x-auto pb-2">
        {images.map((src, i) => (
          <div key={i} className="size-[84px] shrink-0 overflow-hidden rounded-2xl bg-gray-100">
            <Image
              src={src}
              alt={`تصویر کاربر ${i + 1}`}
              width={84}
              height={84}
              className="h-full w-full object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
