import sanitizeHtml from "sanitize-html";

const ALLOWED_TAGS = [
  "a",
  "b",
  "blockquote",
  "br",
  "del",
  "em",
  "figcaption",
  "figure",
  "h2",
  "h3",
  "h4",
  "img",
  "li",
  "ol",
  "p",
  "strong",
  "table",
  "tbody",
  "td",
  "th",
  "thead",
  "tr",
  "u",
  "ul",
] as const;

export function sanitizeCmsHtml(html: string) {
  return sanitizeHtml(html, {
    allowedTags: [...ALLOWED_TAGS],
    allowedAttributes: {
      a: ["href", "title", "target"],
      img: ["src", "alt", "width", "height"],
      ol: ["start"],
      td: ["colspan", "rowspan"],
      th: ["colspan", "rowspan"],
    },
    allowedSchemes: ["http", "https", "mailto"],
    allowedSchemesByTag: {
      img: ["http", "https"],
    },
    allowProtocolRelative: false,
    enforceHtmlBoundary: true,
    transformTags: {
      a: sanitizeHtml.simpleTransform("a", { rel: "noopener noreferrer" }),
    },
  });
}
