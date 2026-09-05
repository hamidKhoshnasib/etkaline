export function getProductSlug(
  urlTitle: string | null | undefined,
  title: string | null | undefined = "product",
) {
  const source = urlTitle?.trim() || title?.trim() || "product";
  const slug = source
    .normalize("NFKC")
    .replace(/[\s_]+/g, "-")
    .replace(/[^\p{L}\p{N}-]+/gu, "")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");

  return slug || "product";
}
