export function getProductSlug(urlTitle: string | null | undefined, title: string) {
  const source = urlTitle?.trim() || title.trim();
  const slug = source
    .normalize("NFKC")
    .replace(/[\s_]+/g, "-")
    .replace(/[^\p{L}\p{N}-]+/gu, "")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");

  return slug || "product";
}
