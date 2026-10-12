const UNSAFE_PROTOCOL_PATTERN = /^\s*(?:javascript|data|vbscript):/i;

export function getBackendHref(value: unknown): string | null {
  if (typeof value !== "string") {
    return null;
  }

  const href = value.trim();
  return href && !UNSAFE_PROTOCOL_PATTERN.test(href) ? href : null;
}
