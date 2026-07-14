import Link from "next/link";
import { MoveLeft } from "lucide-react";
import BlogCard from "@/features/blog/components/BlogCard";

interface Article {
  id: number | string;
  image: string;
  title: string;
  description: string;
  date: string;
  href?: string;
}

interface MagSectionProps {
  articles: Article[];
  showMoreLink?: string;
}

export default function MagSection({ articles, showMoreLink = "#" }: MagSectionProps) {
  const visible = articles.slice(0, 4);

  return (
    <section className="w-full rounded-2xl border border-[#E2E8F0] bg-white p-3 lg:rounded-[28px] lg:p-5">
      {/* Header */}
      <div className="mb-3 flex items-center justify-between lg:mb-5">
        <div className="flex items-center gap-2">
          <h2 className="text-secondary lg:headline-small-bold text-base font-bold">اتکا مگ</h2>
        </div>
        <div className="text-primary flex items-center gap-4">
          <Link href={showMoreLink} className="text-[14px] text-[#64748B]">
            مشاهده همه
          </Link>
          <MoveLeft className="size-5" />
        </div>
      </div>

      {/* 4-card grid */}
      <div className="grid grid-cols-2 gap-2 sm:gap-4 lg:grid-cols-4">
        {visible.map((article) => (
          <BlogCard
            key={article.id}
            image={article.image}
            title={article.title}
            description={article.description}
            date={article.date}
            href={article.href}
          />
        ))}
      </div>
    </section>
  );
}

export type { Article, MagSectionProps };
