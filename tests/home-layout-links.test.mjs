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
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 },
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
      if (name.startsWith("@/")) {
        return loadSource(`src/${name.slice(2)}.ts`);
      }
      return requireModule(name);
    },
  });
  return sourceModule.exports;
}

const { getHomeLayoutLink } = loadSource(
  "src/features/home/appliances/lib/get-home-layout-link.ts",
);

for (const [siteType, searchHref] of [
  ["supermarket", "/search/category"],
  ["appliance", "/appliance/search"],
]) {
  test(`${siteType} category and layout-tag sections navigate to their own products`, () => {
    for (const [targetType, queryKey] of [
      [0, "category"],
      [1, "layoutTag"],
    ]) {
      assert.equal(
        getHomeLayoutLink({ targetType, targetId: 1000 }, siteType),
        `${searchHref}?${queryKey}=1000`,
      );
    }
  });

  test(`${siteType} curated sections work without a target ID`, () => {
    for (const [targetType, query] of [
      [2, "sort=mostdiscount&discounted=1"],
      [3, "sort=bestselling"],
      [4, "sort=popular"],
      [5, "sort=specialoffer&offer=1"],
    ]) {
      for (const targetId of [null, 0, 1000]) {
        assert.equal(
          getHomeLayoutLink({ targetType, targetId }, siteType),
          `${searchHref}?${query}`,
        );
      }
    }
  });

  test(`${siteType} rejects invalid category and layout-tag IDs`, () => {
    for (const targetType of [0, 1]) {
      for (const targetId of [null, undefined, 0, -1, 1.5, "1000", NaN, Infinity, 2 ** 53]) {
        assert.equal(getHomeLayoutLink({ targetType, targetId }, siteType), undefined);
      }
    }
  });

  test(`${siteType} banners and unknown content types do not link to unrelated products`, () => {
    for (const targetType of [6, -1, 7, null, undefined, "0", 1.5]) {
      assert.equal(getHomeLayoutLink({ targetType, targetId: 1000 }, siteType), undefined);
    }
  });
}
