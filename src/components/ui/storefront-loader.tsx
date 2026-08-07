import LoaderMark from "@/assets/icons/loader-mark.svg";
import type { SiteType } from "@/lib/api-site-type";

export function StorefrontLoader({ siteType }: { siteType: SiteType }) {
  return (
    <main
      data-site={siteType}
      className="bg-background flex min-h-[50dvh] flex-1 items-center justify-center"
      aria-busy="true"
    >
      <LoaderMark
        role="status"
        aria-label="در حال بارگذاری"
        className="text-primary size-12 animate-spin motion-reduce:animate-none"
      />
    </main>
  );
}
