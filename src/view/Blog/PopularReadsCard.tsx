import { Sparkles } from "lucide-react";
import CompactBlogCard, { type CompactBlogCardProps } from "@/components/ui/CompactBlogCard";
import ShowMoreButton from "./ShowMoreButton";

interface PopularReadsCardProps {
  posts: (CompactBlogCardProps & { id: number | string })[];
  showMoreLink?: string;
}

export default function PopularReadsCard({ posts, showMoreLink = "#" }: PopularReadsCardProps) {
  return (
    <section className="flex flex-col gap-4 rounded-[16px] border border-[#D1D4D4] bg-white px-6 pt-4 pb-6">
      {/* Header */}
      <div className="flex items-center gap-2 border-b border-[#F0F1F1] p-4">
        <Sparkles className="text-primary-hover size-6" />
        <span className="body-medium text-[#3E4344]">جذاب ترین خواندنی ها</span>
      </div>

      {/* Compact posts */}
      <div className="flex flex-col gap-4">
        {posts.map(({ id, ...post }) => (
          <CompactBlogCard key={id} {...post} />
        ))}
      </div>

      <div className="flex justify-end">
        <ShowMoreButton href={showMoreLink} />
      </div>
    </section>
  );
}

export type { PopularReadsCardProps };
