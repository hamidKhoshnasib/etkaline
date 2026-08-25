import "server-only";

type RateLimitBucket = {
  count: number;
  resetAt: number;
};

type RateLimitStore = Map<string, RateLimitBucket>;

const globalForRateLimit = globalThis as typeof globalThis & {
  etkalaRateLimitStore?: RateLimitStore;
};

const store = globalForRateLimit.etkalaRateLimitStore ?? new Map<string, RateLimitBucket>();

globalForRateLimit.etkalaRateLimitStore = store;

export function getRequestIdentity(request: Request) {
  const forwardedFor = request.headers.get("x-forwarded-for");
  const firstForwardedAddress = forwardedFor?.split(",")[0]?.trim();
  return firstForwardedAddress?.slice(0, 128) || "unknown";
}

export function takeRateLimit(key: string, max: number, windowMs: number) {
  const now = Date.now();
  const current = store.get(key);

  if (!current || current.resetAt <= now) {
    store.set(key, { count: 1, resetAt: now + windowMs });
    return { allowed: true, retryAfterSeconds: 0 };
  }

  if (current.count >= max) {
    return {
      allowed: false,
      retryAfterSeconds: Math.max(1, Math.ceil((current.resetAt - now) / 1_000)),
    };
  }

  current.count += 1;
  return { allowed: true, retryAfterSeconds: 0 };
}
