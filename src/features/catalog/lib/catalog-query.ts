export interface CatalogQuery {
  sort: string;
  page: number;
  onlyAvailable: boolean;
}

const DEFAULT_SORT = "bestselling";
const DEFAULT_PAGE = 1;

export function parseCatalogQuery(searchParams: Pick<URLSearchParams, "get">): CatalogQuery {
  const pageValue = Number(searchParams.get("page"));

  return {
    sort: searchParams.get("sort") || DEFAULT_SORT,
    page: Number.isInteger(pageValue) && pageValue > 0 ? pageValue : DEFAULT_PAGE,
    onlyAvailable: searchParams.get("available") === "1",
  };
}

export function writeCatalogQuery(current: URLSearchParams, query: Partial<CatalogQuery>) {
  const next = new URLSearchParams(current);

  if (query.sort !== undefined) {
    if (query.sort === DEFAULT_SORT) {
      next.delete("sort");
    } else {
      next.set("sort", query.sort);
    }
  }

  if (query.page !== undefined) {
    if (query.page <= DEFAULT_PAGE) {
      next.delete("page");
    } else {
      next.set("page", String(query.page));
    }
  }

  if (query.onlyAvailable !== undefined) {
    if (query.onlyAvailable) {
      next.set("available", "1");
    } else {
      next.delete("available");
    }
  }

  return next;
}
