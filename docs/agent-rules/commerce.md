# Commerce, Security, and Privacy Rules

<!-- قوانین حیاتی فروشگاه برای قیمت، موجودی، پرداخت، سفارش، امنیت و اطلاعات کاربران. -->

Read this file for product, price, discount, inventory, cart, checkout, order, auth, security,
privacy, or user-data tasks. Also obey the root `AGENTS.md` and all other routed files.

## 1. Commerce integrity

<!-- منطق مالی و سفارش باید در سرور معتبرسازی شود و هرگز به داده ارسالی مرورگر اعتماد نشود. -->

- Never trust price, discount, shipping, inventory, ownership, or order totals from the client.
  Recalculate and authorize them on the server.
- Represent money in the smallest agreed integer unit. Never use floating-point financial arithmetic.
  Centralize and explicitly label rial/toman conversion.
- Display base price, discount, final price, tax, shipping, and unit unambiguously. Do not scatter
  conversion or formatting logic across components.
- Make cart and checkout mutations retry-safe/idempotent where possible. Prevent double submission,
  duplicate payment, and assumptions based on stale stock.
- Treat displayed inventory as potentially stale and revalidate before checkout and payment.
- Authentication is not authorization. Verify resource ownership server-side for profiles, addresses,
  orders, payments, reviews, and administration.
- Preserve checkout state across failure/retry paths; never silently lose cart or address data.
- Product, cart, and order experiences cover loading, empty, partial, unavailable, error, and success
  states where relevant.
- Optimistic UI must never represent payment, stock reservation, or order success before server
  confirmation and must have a rollback path.

## 2. Security and privacy

<!-- ورودی‌ها و داده‌های بیرونی غیرقابل اعتماد هستند و اطلاعات محرمانه نباید به مرورگر یا لاگ نشت کنند. -->

- Treat client input and upstream responses as untrusted. Validate, normalize, and authorize at the
  server boundary.
- Keep secrets in server-only environment variables. Use `NEXT_PUBLIC_` only for intentionally public
  values.
- Never commit `.env*`, credentials, production identifiers, exported customer data, or private keys.
  Use sanitized `.env.example` values when documentation is required.
- Never expose internal credentials, session tokens, payment details, or private config to Client
  Components, logs, URLs, analytics, or user-facing errors.
- Avoid injected HTML. If rich HTML is required, sanitize it with a reviewed allowlist. Escape JSON-LD
  safely as well.
- Protect mutations against CSRF as required by the session design and use secure cookies in production.
- Prevent open redirects by allowing only validated internal callback destinations.
- Do not log PII such as phone numbers, addresses, auth codes, tokens, cart contents, or payment data.
  Redact identifiers in diagnostics.
- Apply server-side rate limiting and abuse controls to login, OTP, search, reviews, coupons, carts,
  and checkout as appropriate. Client throttling is not a security control.
