// پاک‌سازی دفاعی خروجی CKEditor؛ اسکریپت، event handler و URLهای ناامن حذف می‌شوند.
export function sanitizeCmsHtml(html: string) {
  return html
    .replace(/<script[\s\S]*?>[\s\S]*?<\/script>/gi, "")
    .replace(/\son\w+\s*=\s*(?:"[^"]*"|'[^']*')/gi, "")
    .replace(/(?:href|src)\s*=\s*(?:"|')\s*javascript:[^"']*(?:"|')/gi, "");
}
