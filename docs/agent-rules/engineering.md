# Engineering Rules

<!-- قوانین معماری، Next.js، React، TypeScript، دریافت داده و تنظیمات فنی پروژه. -->

Read this file for any code, architecture, API, state, dependency, configuration, Next.js, React, or
TypeScript task. Also obey the root `AGENTS.md` and every other file matched by its routing table.

## 1. Architecture and project structure

<!-- وظیفه پوشه‌ها، محل فایل‌ها و جهت صحیح وابستگی میان بخش‌های پروژه. -->

- `src/app/`: routes, layouts, route handlers, metadata, loading, error, and not-found boundaries.
  Keep route entries thin and compose feature views or server-side data functions.
- `src/view/<feature>/`: page-level feature composition. Preserve neighboring naming conventions;
  use one consistent convention for new feature folders.
- `src/components/ui/`: reusable design-system primitives, never page-specific business components.
- `src/components/layout/`: shared shell such as header, footer, and navigation.
- `src/components/<feature>/`: domain components reused by more than one view.
- `src/lib/`: framework integrations, configured clients, infrastructure, and pure utilities.
- `src/services/`: API/domain access. UI must not assemble endpoint URLs or duplicate transport logic.
- `src/hooks/`: reusable client hooks only; ordinary pure functions do not belong here.
- `src/providers/`: narrowly scoped client providers; do not globalize state used by one feature.
- `src/types/`: shared types and module augmentation; keep feature-local types beside the feature.
- `src/config/`: validated runtime configuration; `src/constants/`: stable application constants.
- `src/assets/`: imported source assets; use `public/` when a stable public URL is required.
- A route is public only through `page.tsx` or `route.ts`. Use `(group)` for route organization and
  `_folder` for non-routable colocated code when appropriate.
- Avoid barrel files unless they define a useful stable boundary. Prevent deep barrels and cycles.
- Dependencies flow from routes/views to components, services, and lib. Shared UI never imports views.
- Define domain shapes once and derive view types rather than duplicating server/client models.
- Next.js 16 calls Middleware `proxy.ts`. Use it for new or intentional migrations, not as unrelated
  cleanup. Proxy is for fast checks/redirects, not slow fetching or complete authorization.

## 2. Next.js and React

<!-- قواعد مخصوص نسخه نصب‌شده Next.js و نحوه استفاده صحیح از Server و Client Component. -->

- Read the relevant installed guide under `node_modules/next/dist/docs/01-app/` before changing
  Next.js code. Confirm signatures instead of relying on memory.
- Server Components are the default. Add `"use client"` only at the smallest boundary requiring
  state, effects, handlers, context, or browser APIs.
- Do not make a page/layout client-side merely for one interactive child.
- Fetch on the server for first render, SEO, access control, and sensitive operations. Use TanStack
  Query for client-owned remote state, background refetching, and mutations.
- Do not use `useEffect` for derived render state or work belonging in a Server Component, event,
  query, or server mutation.
- Next.js request APIs and route props can be async. Confirm and `await` `params`, `searchParams`,
  `cookies()`, and `headers()` when required by installed docs.
- Use `next/link`, `next/image`, and `next/font`. Remote images require specific `remotePatterns`,
  dimensions or `fill`, and meaningful `alt` text.
- Add `loading.tsx`, `error.tsx`, and `not-found.tsx` where meaningful. Route-level loading UI must
  compose feature-specific Skeleton components that resemble the final layout; do not leave expected
  states blank or use a full-page spinner when the structure is known.
- Make caching intentional. Read installed caching/revalidation guides before using cache,
  revalidation, tags, or dynamic flags, and document the freshness requirement.
- Route handlers validate untrusted input, return intentional status codes, and hide internal errors,
  tokens, and upstream implementation details.
- Components should have a clear responsibility. Extract for reuse or clarity, not line count alone.
- Use stable domain IDs as keys; never use indexes for reorderable/filterable/mutable lists.
- React Compiler is enabled. Add `useMemo`, `useCallback`, or `memo` only for a measured or semantic
  need, not by default.

## 3. TypeScript and code quality

<!-- استانداردهای تایپ‌نویسی، خوانایی، نام‌گذاری، فرمت کد و مدیریت خطا. -->

- Keep TypeScript strict. Do not weaken `tsconfig`, globally disable lint rules, or use `@ts-ignore`
  to bypass a solvable issue.
- Avoid `any`; use a precise type or `unknown` with runtime narrowing.
- Use `import type` for type-only imports.
- Validate URL params, forms, storage, external APIs, environment variables, and route input at runtime.
- Prefer small pure functions, early returns, explicit names, and clear call sites. Avoid deep nesting
  and ambiguous boolean parameters.
- Avoid non-null assertions unless the invariant is locally guaranteed and obvious.
- Do not leave `console.log`, `debugger`, dead/commented code, placeholder data, or unexplained TODOs.
- Comments explain why, constraints, or tradeoffs; they do not narrate obvious code.
- Follow Prettier: double quotes, semicolons, trailing commas, 2 spaces, 100 columns, and LF. Let the
  Tailwind plugin sort utility classes.
- Prefer named exports for reusable modules; use framework-required default exports where applicable.
- Handle expected errors near their boundary. Show safe Persian user messages while keeping private
  diagnostics server-side.

## 4. Data fetching and state

<!-- نحوه استفاده از Axios، TanStack Query، URL و state محلی یا سمت سرور. -->

- Reuse the configured Axios and Query clients; do not create ad hoc clients.
- Query keys are centralized and deterministic and include every input affecting the result.
- Set freshness and retries from business semantics. Do not retry validation/authorization failures;
  be conservative with payment and order mutations.
- Cancel or ignore obsolete requests for rapidly changing search/filter input.
- URL query parameters are the source of truth for shareable filters, sorting, pagination, and search.
  Parse defensively and preserve unrelated parameters.
- Keep local UI state local. Do not globalize derived state or duplicate server state across stores.
- Optimistic updates need rollback and may not imply stock, payment, or order success before server
  confirmation.

## 5. Dependencies, configuration, and migrations

<!-- قواعد افزودن پکیج، تغییر تنظیمات و انجام مهاجرت‌های فنی بزرگ. -->

- Do not change framework, compiler, lint, formatting, TypeScript, shadcn, or Tailwind configuration
  merely to silence an error; fix the underlying code.
- Use npm and keep `package.json` and `package-lock.json` synchronized.
- Obtain approval before major upgrades, framework migrations, auth rewrites, preset switches, or
  dependency replacements with broad behavior or bundle impact.
- Read installed release/deprecation guidance before framework migrations.
- Preview shadcn updates with `--dry-run` and `--diff`; never use `--overwrite` without approval.
- Environment-specific values belong in environment variables, not duplicated constants. Validate
  required server configuration with clear failures.
