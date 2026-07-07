import Image from "next/image";
import ShowMoreButton from "./ShowMoreButton";

interface FeaturedBlogProps {
  title: string;
  description: string;
  image: string;
  date: string;
  href?: string;
}

export default function FeaturedBlog({
  title,
  description,
  image,
  date,
  href = "#",
}: FeaturedBlogProps) {
  return (
    <article className="overflow-hidden rounded-[16px] border border-[#D1D4D4] bg-white">
      <div className="relative aspect-[912/416] w-full border-b border-[#D1D4D4]">
        <Image src={image} alt={title} fill className="object-cover" />
      </div>

      <div className="flex flex-col items-end gap-2 p-6 text-right">
        <h3 className="body-medium-bold text-[#151617]">{title}</h3>
        <p className="body-medium leading-[1.6] text-[#151617]">{description}</p>

        <div className="mt-2 flex w-full items-center justify-between">
          <ShowMoreButton href={href} />
          <span className="label-medium text-[#858C8D]">{date}</span>
        </div>
      </div>
    </article>
  );
}

export type { FeaturedBlogProps };
