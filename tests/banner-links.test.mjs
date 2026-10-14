import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { createRequire } from "node:module";
import { test } from "node:test";
import { runInNewContext } from "node:vm";
import ts from "typescript";

const requireModule = createRequire(import.meta.url);

function loadSource(relativePath, overrides = {}) {
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
    process: { env: { NEXT_PUBLIC_IMAGE_BASE_URL: "https://images.example" } },
    require: (name) => {
      if (Object.hasOwn(overrides, name)) {
        return overrides[name];
      }
      if (name === "server-only") {
        return {};
      }
      if (name === "@/config/site") {
        return { SITE_URL: "https://shop.example" };
      }
      if (name.startsWith("@/")) {
        return loadSource(`src/${name.slice(2)}.ts`, overrides);
      }
      return requireModule(name);
    },
  });
  return sourceModule.exports;
}

const { getBannerHref } = loadSource("src/features/home/appliances/lib/get-banner-href.ts");
const storefronts = [
  ["supermarket", "/search/category", "/products/"],
  ["appliance", "/appliance/search", "/appliance/product/"],
];

for (const [siteType, searchHref, productPrefix] of storefronts) {
  test(`${siteType} CMS targets navigate to category, tag, product, and brand`, () => {
    for (const [targetType, expected] of [
      [1, `${searchHref}?category=1700`],
      [2, `${searchHref}?tag=1700`],
      [3, `${productPrefix}1700`],
      [4, `${searchHref}?brand=1700`],
    ]) {
      for (const link of [null, undefined, "", "   "]) {
        assert.equal(getBannerHref({ link, targetType, targetId: 1700 }, siteType), expected);
      }
    }
  });

  test(`${siteType} product targets use their optional canonical slug`, () => {
    assert.equal(
      getBannerHref({ targetType: 3, targetId: 25, targetUrlTitle: " چرخ گوشت " }, siteType),
      `${productPrefix}25/${encodeURIComponent("چرخ-گوشت")}`,
    );
    for (const targetUrlTitle of [null, "", "  ", 123]) {
      assert.equal(
        getBannerHref({ targetType: 3, targetId: 25, targetUrlTitle }, siteType),
        `${productPrefix}25`,
      );
    }
  });

  test(`${siteType} explicit links take precedence and preserve search queries`, () => {
    for (const link of [
      "/appliance/search?searchText=%DA%86%D8%B1%D8%AE+%DA%AF%D9%88%D8%B4%D8%AA",
      "https://shop.example/appliance/search?searchText=meat+grinder",
    ]) {
      assert.equal(
        getBannerHref({ link: ` ${link} `, targetType: 1, targetId: 25 }, siteType),
        link,
      );
      assert.equal(getBannerHref({ link, targetType: 0, targetId: null }, siteType), link);
    }
  });

  test(`${siteType} rejects invalid target IDs and unsupported CMS target types`, () => {
    for (const targetType of [1, 2, 3, 4]) {
      for (const targetId of [null, undefined, 0, -1, 1.5, "25", NaN, Infinity, 2 ** 53]) {
        assert.equal(getBannerHref({ targetType, targetId }, siteType), null);
      }
    }
    for (const targetType of [0, 5, 6, -1, null, undefined, "1", 1.5]) {
      assert.equal(getBannerHref({ targetType, targetId: 25 }, siteType), null);
    }
  });

  test(`${siteType} unsafe direct links cannot override a valid target`, () => {
    for (const link of ["javascript:alert(1)", " DATA:text/html,test", "vbscript:test", 123]) {
      assert.equal(
        getBannerHref({ link, targetType: 1, targetId: 25 }, siteType),
        `${searchHref}?category=25`,
      );
      assert.equal(getBannerHref({ link, targetType: 0 }, siteType), null);
    }
  });

  for (const [filename, functionName, endpoint, fallback] of [
    ["get-home-banners", "getHomeBanners", "/api/Slides", null],
    ["get-category-banners", "getCategoryBanners", "/api/Banners/GetByType", "#"],
    [
      "get-layout-banners",
      "getBannersByLayoutId",
      "/api/Banners/GetBannersByLayoutId/18",
      undefined,
    ],
  ]) {
    test(`${siteType} ${filename} resolves CMS targets from API payloads`, async () => {
      const requests = [];
      const value = [
        ...[1, 2, 3, 4].map((targetType) => ({ targetType, targetId: 25, link: null })),
        { targetType: 1, targetId: 25, link: "https://shop.example/search?searchText=test" },
        { targetType: 3, targetId: 25, targetUrlTitle: "چرخ گوشت" },
        { targetType: 1, targetId: 0 },
      ].map((target, index) => ({
        id: index + 1,
        title: "بنر فروشگاه",
        pic: "/images/banner.webp",
        width: 6,
        height: 300,
        order: index,
        ...target,
      }));
      const source = loadSource(`src/features/home/appliances/api/${filename}.ts`, {
        "@/lib/api-config": {
          getServerApiBaseUrl: () => "https://api.example",
          STOREFRONT_REQUEST_TIMEOUT_MS: 60000,
        },
        "@/lib/get-server-api-headers": {
          getServerApiHeaders: async (type) => ({ "site-type": type }),
        },
        "@/lib/fetch-with-timeout": {
          fetchWithTimeout: async (url, options) => {
            requests.push({ url, options });
            return { ok: true, json: async () => ({ isSuccess: true, value }) };
          },
        },
      });
      const banners = await (functionName === "getBannersByLayoutId"
        ? source[functionName](18, siteType)
        : source[functionName](siteType));

      assert.deepEqual(
        Array.from(banners, (banner) => banner.href),
        [
          `${searchHref}?category=25`,
          `${searchHref}?tag=25`,
          `${productPrefix}25`,
          `${searchHref}?brand=25`,
          "https://shop.example/search?searchText=test",
          `${productPrefix}25/${encodeURIComponent("چرخ-گوشت")}`,
          fallback,
        ],
      );
      assert.equal(requests.length, 1);
      assert.equal(requests[0].url.pathname, endpoint);
      assert.equal(requests[0].options.headers["site-type"], siteType);
    });
  }
}
