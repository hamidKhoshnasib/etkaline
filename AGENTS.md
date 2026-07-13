# Etkaline Agent Rules

<!-- این فایل نقطه ورود اصلی قوانین پروژه است و مشخص می‌کند برای هر تسک چه فایل‌هایی باید خوانده شوند. -->

This file is the mandatory entry point for AI agents and contributors. Apply it to every change.
Topic-specific rules live in `docs/agent-rules/` and are mandatory when their routing conditions
match the task. Explicit user instructions take precedence only when they directly conflict.

## 1. Project context

<!-- معرفی کوتاه پروژه، فناوری‌ها، زبان رابط کاربری و الزام راست‌به‌چپ بودن کل محصول. -->

- Etkaline is a Persian, RTL e-commerce application.
- The stack is Next.js 16 App Router, React 19, TypeScript, Tailwind CSS 4, shadcn/ui
  (`base-nova` on Base UI), TanStack Query, Axios, Auth.js/NextAuth, and React Compiler.
- Use npm and `npx`; do not introduce pnpm, Yarn, or Bun lockfiles.
- Application code belongs under `src/`; public static assets belong under `public/`.
- Use the configured `@/*` alias for cross-folder imports.
- UI copy is Persian unless the product requirement says otherwise. Code, identifiers, filenames,
  comments, commits, and technical documentation must be in English.
- RTL is mandatory. The root document uses `dir="rtl"`; every page, component, interaction,
  animation, and responsive state must be designed and tested for RTL from the beginning.
- Never build LTR-first and patch RTL later with one-off overrides.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

<!-- برای هر تغییر Next.js، مستندات نسخه نصب‌شده در همین پروژه مرجع اصلی و الزامی است. -->

This version has breaking changes—APIs, conventions, and file structure may differ from training
data. Before writing or reviewing Next.js code, read the relevant guide in
`node_modules/next/dist/docs/`. Installed documentation is authoritative. Heed deprecation notices.

<!-- END:nextjs-agent-rules -->

## 2. Mandatory rule routing

<!-- عامل باید قبل از شروع، نوع تسک را تشخیص دهد و تمام فایل‌های مرتبط زیر را کامل بخواند. -->

Before acting, classify the task and read every matching file completely. Multiple files can apply.
Do not rely on the summary below as a substitute for reading a matched file.

| Task area                                                                                                      | Mandatory file                        |
| -------------------------------------------------------------------------------------------------------------- | ------------------------------------- |
| Any code, architecture, API, state, dependency, config, Next.js, React, or TypeScript work                     | `docs/agent-rules/engineering.md`     |
| Product, price, discount, inventory, cart, checkout, order, auth, security, privacy, or user data              | `docs/agent-rules/commerce.md`        |
| UI, shadcn, Tailwind, component, form, Skeleton, loading UI, responsive visual behavior, RTL, or accessibility | `docs/agent-rules/design.md`          |
| Metadata, product/category/blog pages, structured data, indexing, images, loading speed, or Core Web Vitals    | `docs/agent-rules/seo-performance.md` |
| Any file change, verification, test, Git operation, commit, dependency update, migration, or handoff           | `docs/agent-rules/workflow.md`        |
| Architecture, folder structure, Feature-based migration, Atomic Design, or refactor phase work                 | `docs/architecture/refactor-plan.md`  |

Routing examples:

- A product-card UI change requires `engineering.md`, `commerce.md`, `design.md`,
  `seo-performance.md`, and `workflow.md` if it affects product data, images, or performance.
- A commit-message request requires `workflow.md`.
- An authentication route fix requires `engineering.md`, `commerce.md`, and `workflow.md`.
- A metadata-only change requires `engineering.md`, `seo-performance.md`, and `workflow.md`.

## 3. Reasoning, proposals, and approval

<!-- عامل باید هدف درخواست را بفهمد، راه بهتر را پیشنهاد دهد و برای تغییر روش منتظر تأیید صریح کاربر بماند. -->

- Treat the user's request as the desired outcome, not proof that the proposed implementation is the
  best one. Understand the underlying goal and inspect the repository before choosing a solution.
- Do not blindly implement a literal instruction when a safer, simpler, more maintainable,
  accessible, or idiomatic solution clearly achieves the same goal.
- If a better approach differs from the explicit request, first present a concise proposal explaining
  its reason, benefit, tradeoff, risk, and affected scope. Wait for explicit user approval.
- Do not implement a proposed alternative, optional enhancement, dependency change, or scope
  expansion before approval. Silence is not approval.
- Continue without extra confirmation only for the exact requested work and routine implementation
  details that do not materially change behavior, design, scope, cost, data, dependencies, or risk.
- Fix root causes rather than symptoms when the fix remains within the approved scope.
- A better solution does not authorize unrelated features, broad refactors, destructive actions, or
  product decisions outside the request.
- If a requested approach is unsafe, insecure, deprecated, inaccessible, or incompatible with the
  installed stack, explain the concrete problem and propose the closest safe alternative.
- Make only small, reversible assumptions that preserve product meaning. Do not invent requirements.

## 4. Universal non-negotiable rules

<!-- این موارد در همه تسک‌ها اجباری هستند، حتی اگر فقط یک فایل تخصصی برای تسک انتخاب شده باشد. -->

- Preserve unrelated user changes and keep the diff scoped to the approved request.
- Never expose or commit secrets, credentials, tokens, private environment values, payment details,
  or personal user data.
- Authentication is not authorization; sensitive access and commerce calculations require server
  verification.
- Never trust client-provided price, discount, inventory, ownership, shipping, or order totals.
- Do not create branches, stage, commit, amend, rebase, push, or open a pull request unless explicitly
  requested.
- Never bypass Git hooks or use destructive Git commands to remove user work.
- Never claim a test, command, or user flow passed unless it was actually run.
- A task is not complete until applicable routed rules and verification requirements are satisfied.
