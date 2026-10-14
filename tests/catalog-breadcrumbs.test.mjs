import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { createRequire } from "node:module";
import { test } from "node:test";
import { runInNewContext } from "node:vm";
import ts from "typescript";

const requireModule = createRequire(import.meta.url);

function loadSource(relativePath) {
  const source = readFileSync(new URL(`../${relativePath}`, import.meta.url), "utf8");
  const { outputText } = ts.transpileModule(source, {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
  });
  const sourceModule = { exports: {} };
  runInNewContext(outputText, {
    module: sourceModule,
    exports: sourceModule.exports,
    URL,
    URLSearchParams,
    require: (name) => {
      if (name === "@/config/site") {
        return { SITE_URL: "https://shop.example" };
      }
      return name.startsWith("@/") ? loadSource(`src/${name.slice(2)}.ts`) : requireModule(name);
    },
  });
  return sourceModule.exports;
}

const { parseCatalogCategoryId } = loadSource("src/features/catalog/lib/catalog-query.ts");
const { getCatalogBreadcrumbs } = loadSource("src/features/catalog/lib/get-catalog-breadcrumbs.ts");

test("category query parsing matches the first URL value and rejects invalid IDs", () => {
  assert.equal(parseCatalogCategoryId("1700"), 1700);
  assert.equal(parseCatalogCategoryId(["1700", "1800"]), 1700);
  for (const value of [null, undefined, [], "", "0", "-1", "1.5", "1700x", "9007199254740992"]) {
    assert.equal(parseCatalogCategoryId(value), 0);
  }
  assert.equal(parseCatalogCategoryId(["invalid", "1700"]), 0);
});

for (const [siteType, homeHref, categoryHref, title] of [
  ["supermarket", "/", "/search/category/", "همه محصولات"],
  ["appliance", "/appliance", "/appliance/categories/", "نتایج جستجو"],
]) {
  const categoryPath = [
    { id: 100, title: "مواد غذایی" },
    { id: 1700, title: "کنسرو، غذای آماده و منجمد" },
  ];
  const build = (overrides = {}) =>
    JSON.parse(
      JSON.stringify(
        getCatalogBreadcrumbs({
          siteType,
          title,
          categoryId: 0,
          categoryPath: [],
          searchText: "",
          ...overrides,
        }),
      ),
    );

  test(`${siteType} category breadcrumbs use the backend title and link to parents`, () => {
    assert.deepEqual(build({ categoryId: 1700, categoryPath }), [
      { label: "خانه", href: homeHref },
      { label: "مواد غذایی", href: `${categoryHref}100` },
      { label: "کنسرو، غذای آماده و منجمد" },
    ]);
  });

  test(`${siteType} search breadcrumbs show the decoded, trimmed search term`, () => {
    const searchText = new URLSearchParams(
      "searchText=%DA%86%D8%B1%D8%AE+%DA%AF%D9%88%D8%B4%D8%AA",
    ).get("searchText");
    assert.deepEqual(build({ searchText: `  ${searchText}  ` }), [
      { label: "خانه", href: homeHref },
      { label: "چرخ گوشت" },
    ]);
  });

  test(`${siteType} searches within a category keep the category as a link`, () => {
    const crumbs = build({ categoryId: 1700, categoryPath, searchText: "چرخ گوشت" });
    assert.deepEqual(crumbs.slice(-2), [
      { label: "کنسرو، غذای آماده و منجمد", href: `${categoryHref}1700` },
      { label: "چرخ گوشت" },
    ]);
  });

  test(`${siteType} clearing or changing a query never retains a stale category label`, () => {
    for (const categoryId of [0, 1800]) {
      assert.deepEqual(build({ categoryId, categoryPath }), [
        { label: "خانه", href: homeHref },
        { label: title },
      ]);
    }
    assert.equal(build({ searchText: " \t " }).at(-1).label, title);
    assert.equal(build({ searchText: "چرخ گوشت" }).at(-1).label, "چرخ گوشت");
    assert.equal(build({ searchText: "" }).at(-1).label, title);
  });
}
