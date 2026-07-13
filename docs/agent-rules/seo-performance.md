# SEO and Performance Rules

<!-- قواعد دیده‌شدن صفحات فروشگاه در موتور جستجو و حفظ سرعت و تجربه کاربری مناسب. -->

Read this file for metadata, product/category/blog pages, structured data, indexing, images, loading
speed, responsive performance, or Core Web Vitals tasks. Also obey the root `AGENTS.md` and all other
routed files.

## 1. SEO for commerce and content

<!-- صفحات قابل ایندکس باید اطلاعات منحصربه‌فرد، canonical درست و داده ساختاریافته معتبر داشته باشند. -->

- Every indexable route has a unique, accurate Persian title and description. Use static `metadata`
  for static pages and `generateMetadata` for products, categories, and articles.
- Metadata belongs to Server Components. Never convert a page to a Client Component for metadata.
- Set `metadataBase` and canonical URLs from validated configuration. Never emit localhost or preview
  domains as production canonicals.
- Product metadata uses canonical product data and includes a name, concise description, appropriate
  OG/Twitter image, relevant availability context, and stable canonical URL.
- Add JSON-LD only when it describes visible, current data: `Organization`, `WebSite`,
  `BreadcrumbList`, `Product`, `Offer`, and `Article` as applicable. Serialize safely; never invent
  ratings, prices, availability, or reviews.
- Keep one clear `h1` and logical headings. Write useful human content; avoid stuffing and duplicate
  boilerplate.
- Use crawlable `Link` navigation for categories, products, breadcrumbs, and pagination. Discovery
  must not depend solely on handlers or client state.
- Define canonical/indexing behavior for filter and sort parameters to prevent duplicate low-value
  pages.
- Maintain `robots.ts`, `sitemap.ts`, icons, and Open Graph images with Next.js conventions when
  implemented. Exclude private account, cart, checkout, search, and non-canonical parameter pages as
  appropriate.
- Use `notFound()` for missing products/articles to return real 404 behavior, not a soft 404.
- Server-render essential product content whenever possible.

## 2. Responsive performance and Core Web Vitals

<!-- تجربه موبایل، حجم جاوااسکریپت، تصاویر و پایداری چیدمان باید برای سرعت واقعی بهینه شوند. -->

- Design mobile-first and verify narrow mobile, tablet, and desktop widths without horizontal overflow.
- Keep primary purchase actions reachable on mobile. Sticky UI must not cover content, safe areas,
  dialogs, or toasts.
- Prefer Server Components to reduce client JavaScript. Dynamically import heavy client features not
  needed for initial interaction.
- Optimize images with correct formats, responsive `sizes`, and `next/image`. Use priority only for
  the true above-the-fold LCP image.
- Prevent waterfalls by starting independent server work together; keep dependent work sequential.
- Paginate or virtualize large product/review collections; never render an unbounded catalog.
- Avoid dependencies for small utilities. Evaluate bundle cost, maintenance, license, security, and
  native alternatives before proposing one.
- Protect Core Web Vitals by preventing CLS, unnecessary hydration, blocking third-party scripts,
  large media, and long main-thread work.
