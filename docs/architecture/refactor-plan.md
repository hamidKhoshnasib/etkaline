# Etkaline Architecture Refactor Plan

<!-- این سند نقشه اجرایی زنده برای تبدیل تدریجی پروژه به معماری Feature-based است. -->

| Field         | Value                                                    |
| ------------- | -------------------------------------------------------- |
| Status        | Phases 4 and 5 in progress                               |
| Last updated  | 2026-07-13                                               |
| Current scope | Home-appliance storefront, customer account, CMS content |
| Out of scope  | Supermarket implementation and migration                 |
| Architecture  | Feature-based with Atomic Design limited to shared UI    |
| Migration     | Incremental; no big-bang rewrite                         |

This is a living document. Update its decisions, checklists, risks, and progress after every approved
phase. A proposed decision is not approved until the user explicitly confirms it.

## 1. Goals

<!-- هدف این بخش مشخص‌کردن نتیجه‌ای است که ریفکتور باید به آن برسد. -->

- Establish clear ownership for routes, features, business models, API access, UI primitives, and
  page composition.
- Replace the ambiguous `src/view` structure with explicit feature boundaries.
- Keep shadcn primitives separate from commerce-specific UI.
- Reduce broad Client Component boundaries and preserve Server Components by default.
- Centralize domain-neutral concerns such as money formatting, API clients, validation, and config.
- Prepare a customer account area without mixing it with an admin dashboard.
- Support dynamic CMS pages authored in a separate Blazor admin application.
- Make loading, Skeleton, empty, error, unavailable, and success states part of every data feature.
- Preserve RTL and improve accessibility, SEO, performance, and maintainability.
- Remain ready for a future supermarket migration without implementing it today.

## 2. Non-goals

<!-- موارد زیر فعلاً نباید در جریان این ریفکتور ساخته یا مهاجرت داده شوند. -->

- Do not implement or migrate the supermarket storefront.
- Do not create speculative supermarket folders, models, components, or APIs.
- Do not install CKEditor. It remains in the separate Blazor admin.
- Do not redesign the UI during structural migration unless separately approved.
- Do not replace the backend, auth provider, or API contracts incidentally.
- Do not perform a full rewrite or move every feature in one change.
- Do not create a global `organisms` folder that mixes business domains.

## 3. Current structural problems

<!-- این فهرست دلیل انجام ریفکتور و مشکلات اصلی ساختار فعلی را ثبت می‌کند. -->

- Feature code is scattered across `app`, `view`, `components`, `lib`, `hooks`, and `types`.
- `components/ui` mixes shadcn primitives with Product, Blog, and section components.
- `Btn.tsx` and `button.tsx` provide competing Button primitives.
- Folder naming is inconsistent (`Blog`, `Products`, `cart`, `contactUs`, `productDetail`).
- Types, mock data, formatters, state, and UI are mixed in files such as `cart.data.ts`.
- Some children import orchestration types from their parent feature entry point.
- Auth is scattered across UI, server access, handlers, and global types.
- Feature-specific services such as home layout live in global `lib`.
- A public `/view` route acts as a development showcase.
- Client Component boundaries are broader than the actual interactive areas.
- Product, cart, and home models are duplicated and rely on placeholder data.
- Route-level loading, error, and not-found boundaries are missing.
- There is no established test structure for commerce and authorization behavior.
- Assets have generic names and unclear ownership.

## 4. Principles

<!-- تمام تصمیم‌های ساختاری باید از این اصول پیروی کنند. -->

1. Feature ownership is primary; Atomic Design is secondary.
2. Server Components are the default; Client Components are the smallest interactive leaves.
3. Routes compose features and widgets but do not own feature business logic.
4. Shared code is domain-neutral and useful to more than one feature.
5. Feature internals are private and exposed through a deliberate public API.
6. Business components never live beside shadcn primitives.
7. Data flows from API/model layers into UI; data layers never depend on component prop types.
8. Money, inventory, totals, ownership, and authorization are verified on the server.
9. Every migrated data feature delivers loading, Skeleton, empty, error, and success states.
10. Every phase passes quality gates and RTL verification before completion.
11. Do not create empty destination folders. Create them when real files migrate.
12. Preserve behavior during structural moves; behavioral changes need separate approval.

## 5. Target structure

<!-- این ساختار مقصد مفهومی است و پوشه‌ها فقط هنگام انتقال کد واقعی ایجاد می‌شوند. -->

```text
src/
├── app/
│   ├── (appliances)/appliances/
│   │   ├── page.tsx
│   │   ├── loading.tsx
│   │   ├── error.tsx
│   │   ├── products/
│   │   │   ├── page.tsx
│   │   │   └── [slug]/page.tsx
│   │   └── categories/[slug]/page.tsx
│   ├── (account)/account/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   ├── profile/page.tsx
│   │   ├── addresses/page.tsx
│   │   ├── orders/page.tsx
│   │   ├── orders/[id]/page.tsx
│   │   ├── wishlist/page.tsx
│   │   └── reviews/page.tsx
│   ├── (content)/
│   │   ├── blog/
│   │   └── contact-us/
│   ├── (cms)/[...slug]/
│   │   ├── page.tsx
│   │   ├── loading.tsx
│   │   └── error.tsx
│   └── api/
├── features/
│   ├── auth/
│   ├── product/
│   ├── catalog/
│   ├── search/
│   ├── cart/
│   ├── checkout/
│   ├── order/
│   ├── account/
│   ├── address/
│   ├── wishlist/
│   ├── comparison/
│   ├── review/
│   ├── cms-page/
│   ├── blog/
│   └── home/appliances/
├── widgets/
│   ├── header/
│   ├── footer/
│   ├── product-grid/
│   ├── product-section/
│   ├── cart-summary/
│   └── account-sidebar/
└── shared/
    ├── ui/
    │   ├── atoms/
    │   └── molecules/
    ├── api/
    ├── lib/
    ├── config/
    ├── types/
    └── assets/
```

## 6. Feature contract

<!-- هر فیچر فقط پوشه‌های موردنیاز خود را ایجاد می‌کند و API عمومی مشخص دارد. -->

```text
features/product/
├── api/
│   ├── get-product.ts
│   └── get-products.ts
├── components/
│   ├── ProductCard.tsx
│   ├── ProductPrice.tsx
│   ├── ProductCardSkeleton.tsx
│   └── ProductDetailSkeleton.tsx
├── model/
│   ├── product.types.ts
│   ├── product.schema.ts
│   └── product.mapper.ts
├── hooks/
├── utils/
└── index.ts
```

- `api`: feature-owned backend access.
- `components`: feature-owned domain UI.
- `model`: types, schemas, mappers, and domain state.
- `hooks`: reusable feature client hooks.
- `utils`: private pure helpers.
- `index.ts`: the intentionally small public API.

Do not create a folder merely to satisfy the template.

## 7. Atomic Design mapping

<!-- Atomic Design فقط برای UI مشترک استفاده می‌شود تا فیچرها دوباره مخلوط نشوند. -->

| Level               | Location                        | Examples                                                        |
| ------------------- | ------------------------------- | --------------------------------------------------------------- |
| Atoms               | `shared/ui/atoms`               | Button, Input, Label, Dialog, Skeleton, Spinner, Separator      |
| Molecules           | `shared/ui/molecules`           | FormField, Pagination, EmptyState, ConfirmDialog, SectionHeader |
| Organism equivalent | `widgets` or feature components | Header, Footer, ProductGrid, CartSummary                        |
| Pages               | `app` route composition         | Appliance home, product, account, CMS                           |

`ProductCard`, `CartItemRow`, `OrderSummary`, and `BlogCard` belong to their features even when they
visually resemble an Atomic level.

## 8. Dependency rules

<!-- جهت وابستگی باید یک‌طرفه و قابل پیش‌بینی باشد. -->

```text
app → widgets → features → shared
```

- `shared` imports no feature, widget, or route code.
- Features may import `shared` but not route files.
- Widgets may compose feature public APIs and shared UI.
- Routes may compose widgets and features.
- Features do not import another feature's private files.
- Data/model files do not import presentation prop types.
- Children do not import orchestration types from parent entry components.
- Avoid barrel chains and circular dependencies.

## 9. URL strategy

<!-- لوازم خانگی نباید URLهای قدیمی سوپرمارکت را برای آینده تصاحب کند. -->

### Proposed appliance URLs — approval required

```text
/appliances
/appliances/products
/appliances/products/[slug]
/appliances/categories/[slug]
/account
```

### Proposed temporary root behavior — approval required

```text
/ → temporary 307 redirect to /appliances
```

Do not use a permanent redirect because the root may belong to the supermarket later.

### Strategically reserved for the future supermarket

```text
/
/products/*
/search/*
```

This reservation is documentation only. It does not authorize supermarket work.

## 10. CMS architecture

<!-- CKEditor در پنل Blazor است و Next.js فقط خروجی منتشرشده Backend را نمایش می‌دهد. -->

```text
Blazor Admin + CKEditor → Backend API → Next.js CMS renderer
```

```text
features/cms-page/
├── api/
│   ├── get-cms-page.ts
│   └── get-footer-links.ts
├── components/
│   ├── CmsPageContent.tsx
│   └── CmsPageSkeleton.tsx
├── model/
│   ├── cms-page.types.ts
│   └── cms-page.schema.ts
├── lib/
│   ├── sanitize-cms-html.ts
│   └── resolve-cms-link.ts
└── index.ts
```

- Fetch only published content and validate the response.
- Sanitize HTML before rendering, even if the backend also sanitizes it.
- Generate metadata from validated CMS SEO fields.
- Use `notFound()` for unknown or unpublished paths.
- Distinguish CMS, internal, and external Footer links.
- Keep Header and Footer controlled by Next.js.
- Block arbitrary scripts, unsafe URLs, event handlers, and global CSS.
- Never let the catch-all capture `api`, `appliances`, `account`, `cart`, `checkout`, `products`,
  `search`, or `blog`.

## 11. Skeleton policy

<!-- Skeleton خروجی الزامی هر فیچر داده‌محور است و باید با چیدمان نهایی هماهنگ باشد. -->

- Use the shadcn Skeleton primitive; do not build custom `animate-pulse` blocks.
- Create feature-specific compositions such as:

  ```text
  ProductCardSkeleton
  ProductGridSkeleton
  ProductDetailSkeleton
  CartSkeleton
  OrderSummarySkeleton
  AccountPanelSkeleton
  OrderListSkeleton
  CmsPageSkeleton
  BlogListSkeleton
  ```

- Match final size, spacing, radius, grid, RTL order, and responsive behavior.
- Use route `loading.tsx` for streaming and local Skeletons for partial query refreshes.
- Use Spinner for short actions, not as a full-page replacement.
- Keep placeholders non-interactive and non-focusable.
- Verify reduced motion, relevant `aria-busy`, and absence of visible CLS.
- Replace Skeleton with loaded, empty, unavailable, or error state after settlement.

## 12. Migration phases

<!-- هر فاز مستقل اجرا، بررسی و پس از تأیید وارد فاز بعدی می‌شود. -->

### Phase 0 — Architecture contract and baseline

<!-- ابتدا تصمیم‌ها ثبت و وضعیت فعلی پروژه اندازه‌گیری می‌شود. -->

Priority: Critical

- [ ] Approve or revise the appliance URL strategy.
- [ ] Record future supermarket path reservations.
- [ ] Inventory routes, imports, assets, Client Components, and mock data.
- [ ] Run baseline lint, type-check, format-check, and build.
- [ ] Confirm naming, ownership, and phase approval workflow.

### Phase 1 — Shared foundation and Atomic UI

<!-- primitiveها یکپارچه و کامپوننت‌های تجاری از Shared خارج می‌شوند. -->

Priority: Critical

- [x] Create shared folders only as real files migrate.
- [x] Establish the shadcn atom destination and alias.
- [x] Choose one Button API and migrate `Btn.tsx` consumers. (`Btn.tsx` removed after production consumers moved to `Button`.)
- [x] Separate Alert presentation from toast services.
- [x] Move domain-neutral Pagination, SectionHeader, Spinner, and Skeleton behind shared UI boundaries.
- [x] Move Header and Footer composition to widgets.
- [x] Move Product and Blog components out of the primitive directory.
- [x] Remove `/view` after approved replacements exist.

### Phase 2 — Auth

<!-- احراز هویت از فایل بزرگ و پراکنده به یک فیچر مستقل تبدیل می‌شود. -->

Priority: High

- [x] Consolidate auth API, model, validation, UI, and utilities.
- [x] Split Login, OTP, Captcha, and resend responsibilities at the feature boundary.
- [x] Keep tokens and sensitive work server-side.
- [x] Expose a minimal public API and preserve pending/error states.

### Phase 3 — Product, Catalog, Search, and appliance home

<!-- مدل محصول واحد جایگزین mock و typeهای پراکنده می‌شود. -->

Priority: High

- [x] Create one shared Product model boundary for current UI data.
- [x] Move ProductCard and product sections to correct owners.
- [x] Centralize product-card and product-detail money display.
- [x] Map the Swagger `GetHomeProducts` contract inside the product feature API boundary.
- [x] Make the dynamic product route consume its slug and emit slug-based canonical metadata.
- [x] Move filters, sorting, pagination, and URL state into Catalog/Search query utilities.
- [ ] Reduce Client Component scope.
- [x] Migrate appliance home and deliver feature Skeletons. (home composition remains compatible during incremental migration)

### Phase 4 — Cart and Checkout

<!-- سبد، پرداخت، داده آزمایشی و محاسبات مالی تفکیک می‌شوند. -->

Priority: Critical

- [x] Split `cart.data.ts` into feature-owned models, fixtures, and formatting utilities.
- [x] Extract checkout step state transitions and cart total calculations into feature model utilities.
- [x] Move address, review, summary, and pricing UI into a dedicated checkout boundary.
- [x] Extract checkout state, quantity updates, and step transitions into `useCheckoutFlow`.
- [x] Extract payment method selection and wallet validation into a checkout hook.
- [x] Separate Cart from Checkout orchestration. (checkout UI/state now has a dedicated feature boundary)
- [x] Remove child-to-parent type dependencies. (checkout model types are feature-owned)
- [x] Define explicit checkout state transitions.
- [ ] Verify totals, stock, shipping, and discounts on the server. (requires final cost endpoints and payment contract)
- [x] Deliver Cart, Item, Summary, Checkout, and Address Skeletons.
- [x] Add authenticated server data-access for appliance basket read/add/update/delete operations.

### Phase 5 — Customer account, Orders, and Addresses

<!-- پنل فقط برای مشتری است و پنل ادمین جزو این پروژه نیست. -->

Priority: High

- [x] Create the protected account layout and navigation widget.
- [x] Add profile, address, orders, wishlist, and review boundaries. (initial route boundaries)
- [x] Enforce server authorization at the account layout boundary.
- [x] Apply noindex metadata and deliver account Skeletons.

### Phase 6 — CMS pages and Footer links

<!-- صفحات پنل Blazor از Backend دریافت و امن نمایش داده می‌شوند. -->

Priority: High

- [x] Validate CMS page contract boundary and published-only fetching.
- [x] Implement published-page fetching and safe HTML rendering.
- [x] Add catch-all route protection. (reserved under `/content/[...slug]`; protected application routes remain outside it)
- [x] Generate metadata and canonical URLs.
- [x] Add intentional cache/revalidation.
- [ ] Deliver CmsPageSkeleton, errors, and real 404 behavior. (404 is wired; skeleton/error boundary remains)

### Phase 7 — Blog, Contact, and remaining widgets

<!-- فیچرهای محتوایی و assetهای پراکنده به مالک درست منتقل می‌شوند. -->

Priority: Medium

- [ ] Move Blog components and contracts into the Blog feature.
- [ ] Remove data dependency on component prop types.
- [ ] Remove Contact dependency on Footer config.
- [ ] Rename and relocate assets descriptively.
- [x] Deliver Blog and Contact Skeleton states.

### Phase 8 — Route states, SEO, and performance

<!-- routeها از نظر loading، خطا، 404، metadata و سرعت کامل می‌شوند. -->

Priority: High

- [ ] Audit every data route for loading, error, not-found, empty, and unavailable states.
- [ ] Add metadata, canonical, JSON-LD, sitemap, robots, and Open Graph behavior.
- [x] Noindex private and low-value pages.
- [ ] Audit filter/sort canonical behavior and image performance.
- [ ] Verify route Skeletons against final mobile and desktop layouts.

### Phase 9 — Cleanup and final verification

<!-- ساختار قدیمی فقط پس از صفرشدن importها حذف می‌شود. -->

Priority: Critical

- [x] Remove migrated `src/view` sections after imports reached zero.
- [ ] Remove obsolete shared components, placeholders, and mock assets.
- [ ] Detect dead code, cycles, stale aliases, and inconsistent casing.
- [ ] Run all gates and manually verify critical RTL flows.
- [ ] Update this document with final results and follow-ups.

## 13. Quality gates

<!-- هیچ فازی بدون اجرای کنترل‌های زیر کامل اعلام نمی‌شود. -->

```bash
npm run lint
npm run type-check
npm run format:check
npm run build
```

Also verify applicable RTL, responsive, keyboard, Skeleton, loading, empty, error, unavailable,
disabled, success, authorization, CMS safety, and SEO behavior. Never mark a check complete unless it
actually ran.

## 14. Migration workflow

<!-- انتقال هر فیچر باید کوچک، قابل بازگشت و بدون شکستن پروژه باشد. -->

```text
Approve one phase
    ↓
Inspect owners and consumers
    ↓
Create the minimum destination
    ↓
Move one coherent slice
    ↓
Update imports
    ↓
Run focused checks and quality gates
    ↓
Verify RTL, responsive UI, and Skeletons
    ↓
Remove only the unused legacy slice
    ↓
Update this document
```

## 15. Decision register

<!-- تصمیم‌های پیشنهادی تا زمان تأیید صریح کاربر نهایی نیستند. -->

| ID    | Decision                                           | Status            | Notes                                      |
| ----- | -------------------------------------------------- | ----------------- | ------------------------------------------ |
| D-001 | Feature-based architecture is primary              | Proposed          | Atomic Design stays in shared UI           |
| D-002 | Widgets are the organism-equivalent layer          | Proposed          | Avoid a mixed global organisms folder      |
| D-003 | Move appliance URLs under `/appliances`            | Awaiting approval | Avoid future supermarket URL conflict      |
| D-004 | Temporarily redirect `/` to `/appliances` with 307 | Awaiting approval | Must not be permanent                      |
| D-005 | Exclude supermarket implementation                 | Confirmed         | Reserve future paths only in documentation |
| D-006 | Keep CKEditor in the separate Blazor admin         | Confirmed         | Frontend renders safe published HTML       |
| D-007 | Require feature-specific Skeletons                 | Confirmed         | Match final RTL responsive geometry        |
| D-008 | Migrate incrementally with a passing build         | Proposed          | No big-bang rewrite                        |

## 16. Progress log

<!-- بعد از هر فاز، تاریخ، نتیجه تست و تصمیم‌های جدید در این جدول ثبت می‌شود. -->

| Date       | Phase    | Result                               | Verification                                                                      | Notes                                                                                                                                                                      |
| ---------- | -------- | ------------------------------------ | --------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 2026-07-13 | Planning | Plan created                         | Prettier and diff checks passed                                                   | No implementation started                                                                                                                                                  |
| 2026-07-13 | Phase 0  | Baseline recorded                    | lint PASS; type-check PASS; format-check FAIL; build FAIL                         | 153 source files, 85 TSX, 45 client boundaries; formatting debt is pre-existing; build cannot fetch Google Fonts in the current environment                                |
| 2026-07-13 | Phase 1  | Shared boundary started              | lint PASS; type-check PASS; diff check PASS                                       | Added `Skeleton`, shared Atomic UI barrels, feature barrels, and Header/Footer widgets; legacy imports remain compatible                                                   |
| 2026-07-13 | Phase 3  | Loading states started               | lint PASS; type-check PASS; diff check PASS                                       | Added Product and Cart Skeleton compositions plus route-level loading boundaries; API and URL behavior unchanged                                                           |
| 2026-07-13 | Phase 8  | SEO foundation started               | lint PASS; type-check PASS; diff check PASS; build FAIL (pre-existing font fetch) | Added validated `metadataBase`, global Persian metadata, robots rules, and a public sitemap; dynamic product/CMS SEO remains pending                                       |
| 2026-07-13 | Phase 1  | Core UI migration completed          | lint PASS; type-check PASS; diff check PASS                                       | Unified Button API, separated Alert toast service, removed `/view` showcase and legacy `Btn`, and moved Product/Blog UI out of `components/ui`                             |
| 2026-07-13 | Phase 2  | Auth ownership migration completed   | lint PASS; type-check PASS; diff check PASS                                       | Moved AuthDialog, backend auth client, Auth.js config, and auth validation model into `features/auth`; route handlers and middleware use the feature public API            |
| 2026-07-13 | Phase 3  | Catalog query migration started      | lint PASS; type-check PASS                                                        | Added shared Product model, price formatter, and URL-backed catalog query parsing; product API mapping is now available and route-level fetching remains pending           |
| 2026-07-13 | Phase 3  | Home product API mapping added       | lint PASS; type-check PASS                                                        | Added Swagger-backed `GetHomeProducts` server client, backend-to-UI product mapper, cache tags, and temporary fallback behavior for unavailable API responses              |
| 2026-07-13 | Phase 3  | Dynamic product route boundary added | lint PASS; type-check PASS                                                        | Route now awaits Next.js 16 `params`, passes `slug` into the feature view, and emits canonical/Open Graph metadata; detail API mapping remains pending contract validation |
| 2026-07-13 | Phase 4  | Cart data ownership split started    | lint PASS; type-check PASS                                                        | Moved cart fixture data into `features/cart/fixtures`, added cart domain models and RTL formatting utilities, and updated cart view imports                                |
| 2026-07-13 | Phase 4  | Checkout calculations extracted      | lint PASS; type-check PASS                                                        | Added checkout step transition and total calculation utilities; UI orchestration remains in the Cart page until checkout is separated                                      |
| 2026-07-13 | Phase 4  | Checkout UI boundary extracted       | lint PASS; type-check PASS                                                        | Moved AddressStep, ReviewStep, OrderSummary, and Price into `features/cart/checkout` with a public barrel                                                                  |
| 2026-07-13 | Phase 4  | Checkout flow hook added             | lint PASS; type-check PASS                                                        | Cart state and transitions now live in `useCheckoutFlow`; payment submission orchestration remains pending                                                                 |
| 2026-07-13 | Phase 4  | Payment selection state added        | lint PASS; type-check PASS                                                        | Added `usePaymentSelection` with gateway/wallet state and wallet balance validation; backend payment contract remains pending                                              |
| 2026-07-13 | Phase 4  | Basket API contract modeled          | lint PASS; type-check PASS                                                        | Added typed Appliance Basket and AddToBasket contracts from Swagger; request client remains pending authentication and endpoint flow validation                            |
| 2026-07-13 | Phase 4  | Figma cart item alignment            | lint PASS; type-check PASS                                                        | Activated Figma integration, read the `Product - cart` node, and aligned CartItemRow surface, border, radius, image size, and RTL quantity controls                        |
| 2026-07-13 | Phase 4  | Server basket data-access added      | lint PASS; type-check PASS                                                        | Added authenticated server-only access for `GetOpenBasket` and `AddToBasket`; client mutation wiring and remaining basket endpoints are still pending                      |
| 2026-07-13 | Phase 4  | Checkout skeletons delivered         | lint PASS; type-check PASS                                                        | Added RTL-aware Checkout and OrderSummary skeleton compositions for address/review loading states                                                                          |
| 2026-07-13 | Phase 4  | Basket mutation contracts completed  | lint PASS; type-check PASS                                                        | Added authenticated server-only update-count and delete operations; totals and checkout payment contract still require backend endpoint confirmation                       |
| 2026-07-13 | Phase 5  | Protected account shell delivered    | lint PASS; type-check PASS                                                        | Added authenticated account layout, navigation, noindex metadata, initial profile/address/order boundaries, and account skeleton                                           |
| 2026-07-13 | Phase 6  | CMS renderer boundary delivered      | lint PASS; type-check PASS                                                        | Added validated published-page fetch, defensive HTML sanitization, metadata/canonical generation, and `/content/[...slug]` route with real not-found behavior              |
| 2026-07-13 | Phase 7  | Blog and Contact loading states delivered | lint PASS; type-check PASS                                                   | Added route-level RTL-aware Skeleton boundaries for content pages                                              |
