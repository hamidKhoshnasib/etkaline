import ShowMoreButton from "./ShowMoreButton";

interface BlogSectionHeaderProps {
  title: string;
  showMoreLink?: string;
}

export default function BlogSectionHeader({ title, showMoreLink = "#" }: BlogSectionHeaderProps) {
  return (
    <div className="mb-4 flex items-center gap-3">
      <h2 className="title-medium text-primary-hover whitespace-nowrap">{title}</h2>
      <span className="h-px flex-1 bg-[#D1D4D4]" />
      <ShowMoreButton href={showMoreLink} />
    </div>
  );
}
