import { readFile } from "node:fs/promises";
import { join } from "node:path";

const categoryIconNames = new Set([
  "c1",
  "c2",
  "c3",
  "c4",
  "c5",
  "c6",
  "c7",
  "c8",
  "c9",
  "c10",
  "c11",
]);

export async function GET(_request: Request, ctx: RouteContext<"/api/category-icons/[icon]">) {
  const { icon } = await ctx.params;

  if (!categoryIconNames.has(icon)) {
    return new Response(null, { status: 404 });
  }

  const svg = await readFile(join(process.cwd(), "src", "assets", "icons", `${icon}.svg`));

  return new Response(svg, {
    headers: {
      "Cache-Control": "public, max-age=31536000, immutable",
      "Content-Type": "image/svg+xml; charset=utf-8",
    },
  });
}
