# Design, RTL, and Accessibility Rules

<!-- قوانین رابط کاربری، shadcn، Tailwind، طراحی راست‌به‌چپ و دسترس‌پذیری فارسی. -->

Read this file for UI, shadcn, Tailwind, component, form, responsive visual behavior, RTL, or
accessibility tasks. Also obey the root `AGENTS.md` and all other routed files.

## 1. Design system and UI implementation

<!-- رابط کاربری باید از کامپوننت‌ها و توکن‌های موجود استفاده کند و با سیستم طراحی هماهنگ بماند. -->

- Reuse existing components before creating new ones. For missing shadcn primitives, inspect/search
  the registry and current docs, preview the change, then use `npx shadcn@latest`.
- Never overwrite an existing shadcn component without approval. Review generated code and adapt it
  to Base UI, Lucide, project aliases, RTL, and accessibility.
- Use semantic tokens such as `bg-background`, `text-foreground`, `text-muted-foreground`,
  `bg-primary`, and `border-border`. Global tokens belong only in `src/app/globals.css`.
- Do not hardcode brand colors or one-off raw colors when a semantic token/variant exists.
- Use component variants before overrides and `cn()` for conditional classes.
- Use `gap-*`, not `space-x-*`/`space-y-*`; `size-*` for equal dimensions; and `truncate` shorthand.
- Use the existing Persian typography scale and Vazirmatn. Do not introduce one-off fonts or arbitrary
  typography scales.
- Use Lucide consistently. Button icons use expected `data-icon` placement without redundant sizes.
- Forms use shadcn `Field` composition. Associate labels and controls; express invalid/disabled state
  semantically, not by color alone.
- Dialogs and overlays require accessible titles, keyboard behavior, focus management, and a clear
  close path. Use Sonner for transient toasts.
- Prefer design-system Alert, Separator, Skeleton, Badge, and Empty components over custom replicas.
- Reserve media dimensions, use meaningful skeletons, and keep controls stable while loading.

## 2. Loading UI and Skeletons

<!-- هر صفحه و فیچر داده‌محور باید حالت بارگذاری معنادار و هماهنگ با چیدمان نهایی داشته باشد. -->

- Use the shadcn `Skeleton` primitive for loading placeholders. Never build custom
  `animate-pulse` blocks when the design-system component is available.
- Create feature-specific skeleton compositions such as `ProductCardSkeleton`,
  `ProductGridSkeleton`, `CartSkeleton`, and `AccountPanelSkeleton`; do not use one generic skeleton
  for unrelated layouts.
- Skeleton geometry must closely match the final content's width, height, spacing, border radius,
  grid columns, and responsive behavior to prevent layout shift.
- Preserve RTL ordering and alignment in every skeleton. The loading state must use the same mobile
  and desktop structure as the loaded state.
- Use route-level `loading.tsx` for meaningful Next.js streaming boundaries and local skeletons for
  client queries, pagination, filters, and partial refreshes.
- Prefer skeletons when the layout is predictable. Use `Spinner` for short indeterminate actions
  such as a button submission; do not replace full-page structure with a centered spinner.
- Do not render fake text, prices, product names, images, or interactive controls inside a skeleton.
  Skeleton placeholders must not be focusable or clickable.
- Mark the loading region with appropriate `aria-busy` or status semantics when needed, avoid noisy
  announcements for every placeholder, and respect reduced-motion preferences.
- Replace skeletons with empty, error, unavailable, or loaded states intentionally; a skeleton must
  never remain visible after a request settles.

## 3. RTL and Persian content

<!-- کل محصول RTL است و جهت، حرکت، آیکن‌ها و مقادیر ترکیبی باید در فارسی درست نمایش داده شوند. -->

- RTL is a design input, not a post-processing step. Test every new visual and interaction in RTL.
- Use logical/RTL-aware layout. Directional arrows, chevrons, carousels, breadcrumbs, swipe gestures,
  menus, and animations must move in the expected RTL direction.
- Keep `lang="fa"` and `dir="rtl"` at document level. Use appropriate `dir` or `bdi` isolation for
  emails, URLs, codes, tracking numbers, and other mixed LTR content.
- User-facing labels, errors, accessible names, and helpful empty states are Persian unless the
  product specifically requires another language.
- Verify mobile and desktop RTL alignment, ordering, overflow, scroll direction, and icon direction.

## 4. Accessibility

<!-- رابط کاربری باید برای کیبورد، صفحه‌خوان و کاربران دارای محدودیت بینایی قابل استفاده باشد. -->

- Target WCAG 2.2 AA, especially for search, product selection, cart, login, and checkout.
- Prefer semantic HTML over ARIA. Every interactive element is keyboard reachable with visible focus.
- Buttons perform actions and links navigate; never use clickable `div` or `span` elements.
- Provide meaningful Persian accessible names. Icon-only controls need an `aria-label` or visible name.
- Content images have useful Persian `alt`; decorative images use `alt=""`.
- Maintain contrast for default, hover, focus, disabled, destructive, and dark states.
- Errors identify the problem and, where possible, explain how to resolve it.
- Do not communicate meaning through color, position, or icon alone.
