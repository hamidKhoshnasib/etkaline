import { readFile } from "node:fs/promises";
import { join } from "node:path";

import { SITE_TYPES } from "@/lib/api-site-type";

const footerIcons = new Map([
  ["logo", "logo.svg"],
  ["store", "icons8_online_store.svg"],
  ["guarantee", "icons8_guarantee.svg"],
  ["support", "icons8_customer_support.svg"],
  ["delivery", "icons8_in_transit.svg"],
]);

const supermarketIconGradient =
  '<defs><linearGradient id="supermarket-icon-gradient" x1="24" y1="0" x2="24" y2="48" gradientUnits="userSpaceOnUse"><stop stop-color="#42D778"/><stop offset="1" stop-color="#34B171"/></linearGradient></defs>';

function getSupermarketIconSvg(svg: string) {
  return svg
    .replace(/(<svg[^>]*>)/, `$1${supermarketIconGradient}`)
    .replaceAll("#FFC300", "url(#supermarket-icon-gradient)")
    .replaceAll("#FFF9C4", "#E8F5E9");
}

export async function GET(request: Request, ctx: RouteContext<"/api/footer-icons/[icon]">) {
  const { icon } = await ctx.params;
  const fileName = footerIcons.get(icon);

  if (!fileName) {
    return new Response(null, { status: 404 });
  }

  const svg = await readFile(join(process.cwd(), "src", "assets", "icons", fileName), "utf8");
  const themedSvg =
    new URL(request.url).searchParams.get("siteType") === SITE_TYPES.supermarket
      ? getSupermarketIconSvg(svg)
      : svg;

  return new Response(themedSvg, {
    headers: {
      "Cache-Control": "public, max-age=31536000, immutable",
      "Content-Type": "image/svg+xml; charset=utf-8",
    },
  });
}
