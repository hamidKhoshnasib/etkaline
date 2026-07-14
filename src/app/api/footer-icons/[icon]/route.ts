import { readFile } from "node:fs/promises";
import { join } from "node:path";

const footerIcons = new Map([
  ["logo", "logo.svg"],
  ["store", "icons8_online_store.svg"],
  ["guarantee", "icons8_guarantee.svg"],
  ["support", "icons8_customer_support.svg"],
  ["delivery", "icons8_in_transit.svg"],
]);

export async function GET(_request: Request, ctx: RouteContext<"/api/footer-icons/[icon]">) {
  const { icon } = await ctx.params;
  const fileName = footerIcons.get(icon);

  if (!fileName) {
    return new Response(null, { status: 404 });
  }

  const svg = await readFile(join(process.cwd(), "src", "assets", "icons", fileName));

  return new Response(svg, {
    headers: {
      "Cache-Control": "public, max-age=31536000, immutable",
      "Content-Type": "image/svg+xml; charset=utf-8",
    },
  });
}
