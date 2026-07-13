# Workflow, Verification, and Git Rules

<!-- روند انجام تغییرات، تست، تحویل، Git و کامیت‌های استاندارد پروژه. -->

Read this file for every file change, verification, test, Git action, commit, dependency update,
migration, or handoff. Also obey the root `AGENTS.md` and all other routed files.

## 1. Before making changes

<!-- قبل از ویرایش باید وضعیت پروژه و فایل‌های مرتبط بررسی و تغییرات کاربر حفظ شوند. -->

1. Read the root `AGENTS.md` and every topic file matched by its routing table.
2. Inspect the nearest related files and established patterns before editing.
3. Check `git status`; preserve unrelated user changes and never discard, overwrite, stage, or
   reformat them.
4. For Next.js, read the relevant installed guide under `node_modules/next/dist/docs/01-app/`.
5. For shadcn, inspect `components.json`, installed UI files, and current component docs first.
6. Prefer an established pattern over a competing abstraction.
7. Keep the diff scoped. Do not perform opportunistic migrations or broad cleanup.

## 2. Testing and verification

<!-- تغییرات باید با بررسی متناسب، تست فنی و کنترل حالت‌های مختلف رابط کاربری تأیید شوند. -->

- Verify the smallest relevant scope during development, then run applicable repository gates:

  ```bash
  npm run lint
  npm run type-check
  npm run format:check
  npm run build
  ```

- Run `npm run build` for routes, server/client boundaries, metadata, configuration, fetching, and
  production behavior. If it cannot run, state exactly why.
- Add/update tests for business logic, money, authorization, URL parsing, state transitions, and
  regression-prone interactions. Test observable behavior rather than implementation details.
- Manually verify affected flows at representative mobile and desktop widths, including keyboard,
  loading, empty, error, disabled, and success states.
- Visual checks include RTL alignment, overflow, focus, contrast, image loading, and layout stability.
  Verify that Skeleton dimensions match loaded content and do not cause visible CLS at any supported
  breakpoint.
- Never claim a check passed unless it ran. Separate pre-existing failures from change-caused failures.

## 3. Git and commits

<!-- عملیات Git فقط با درخواست کاربر انجام می‌شود و پیام کامیت باید مطابق Conventional Commits باشد. -->

- Do not create branches, stage, commit, amend, rebase, push, or open a PR unless explicitly asked.
- Never use destructive Git commands to remove user work or bypass hooks with `--no-verify`.
- Keep commits atomic: one coherent reason for change, including relevant tests/docs.
- Use the configured Conventional Commit form:

  ```text
  type(optional-scope): imperative lowercase subject
  ```

- Allowed types: `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `build`, `ci`, `chore`,
  and `revert`.
- Use a short kebab-case scope such as `product`, `cart`, `checkout`, `auth`, `seo`, or `ui` when useful.
  The header must be at most 100 characters.
- Subjects are English, imperative, specific, non-empty, and have no final period. Avoid `update`,
  `changes`, `fix stuff`, and other vague summaries.
- Add a body after a blank line when motivation, behavior, migration, or tradeoff is not obvious.
  Explain why and impact rather than listing files.
- Use `BREAKING CHANGE:` for intentional breaking changes; reference only real issues.
- Examples:

  ```text
  feat(product): add server-rendered availability metadata
  fix(cart): prevent duplicate checkout submission
  refactor(auth): centralize callback URL validation
  docs(seo): document product canonical strategy
  ```

- Before a requested commit, inspect the diff, exclude secrets/unrelated files, run relevant gates,
  and commit only intended files.

## 4. Definition of done and handoff

<!-- تسک زمانی کامل است که رفتار خواسته‌شده اجرا، بررسی و بدون آثار اضافی به کاربر تحویل شده باشد. -->

A task is complete only when:

- The approved behavior is implemented without unrelated changes.
- All applicable architecture, Next.js, RTL, design, accessibility, SEO, commerce, security, and
  privacy rules are satisfied.
- Loading, Skeleton, empty, error, disabled, and success behavior has been considered where relevant.
- Relevant verification passed, or every unrun/failed check is disclosed with its exact reason.
- No secrets, debug artifacts, generated junk, placeholders, or unrelated formatting remain.
- The handoff says what changed, what was verified, and any genuine risk or follow-up.
