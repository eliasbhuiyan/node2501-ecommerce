import Link from "next/link";
import PageContainer from "@/components/layout/PageContainer";
import ProductCard from "@/components/products/ProductCard";
import { categories, getCategoryBySlug } from "@/data/categories";
import { products } from "@/data/products";
import { getDiscountedPrice } from "@/lib/price";
import { apiClient } from "@/lib/apiClient";

const ITEMS_PER_PAGE = 6;

function getShopHref({
  category = "",
  sort = "featured",
  query = "",
  page = 1,
  maxPrice = "",
}) {
  const params = new URLSearchParams();

  if (query) {
    params.set("query", query);
  }

  if (category) {
    params.set("category", category);
  }

  if (sort && sort !== "featured") {
    params.set("sort", sort);
  }

  if (maxPrice) {
    params.set("maxPrice", String(maxPrice));
  }

  if (page > 1) {
    params.set("page", String(page));
  }

  const queryString = params.toString();
  return queryString ? `/shop?${queryString}` : "/shop";
}

export default async function ShopPage({ searchParams }) {
  const params = await searchParams;
  const selectedCategory = (params?.category || "").toString();
  const sortBy = (params?.sort || "featured").toString();
  const searchQuery = (params?.query || "").toString().trim();
  const parsedMaxPrice = Number.parseInt(
    (params?.maxPrice || "").toString(),
    10,
  );
  const parsedPage = Number.parseInt((params?.page || "1").toString(), 10);
  const currentPage =
    Number.isNaN(parsedPage) || parsedPage < 1 ? 1 : parsedPage;
  const absoluteMaxPrice = Math.ceil(
    Math.max(...products.map((product) => getDiscountedPrice(product)), 0),
  );
  const selectedMaxPrice = Number.isNaN(parsedMaxPrice)
    ? absoluteMaxPrice
    : Math.max(0, Math.min(parsedMaxPrice, absoluteMaxPrice));

  const category = getCategoryBySlug(selectedCategory);

  const searchedProducts = products.filter((product) => {
    if (!searchQuery) {
      return true;
    }

    const keyword = searchQuery.toLowerCase();
    return (
      product.title.toLowerCase().includes(keyword) ||
      product.description.toLowerCase().includes(keyword) ||
      product.tags.some((tag) => tag.toLowerCase().includes(keyword))
    );
  });

  const filteredProducts = category
    ? searchedProducts.filter((product) => product.category === category._id)
    : searchedProducts;

  const priceFilteredProducts = filteredProducts.filter(
    (product) => getDiscountedPrice(product) <= selectedMaxPrice,
  );

  const sortedProducts = [...priceFilteredProducts].sort((a, b) => {
    if (sortBy === "price-asc") {
      return getDiscountedPrice(a) - getDiscountedPrice(b);
    }

    if (sortBy === "price-desc") {
      return getDiscountedPrice(b) - getDiscountedPrice(a);
    }

    if (sortBy === "discount-desc") {
      return b.discountPercentage - a.discountPercentage;
    }

    if (sortBy === "title-asc") {
      return a.title.localeCompare(b.title);
    }

    return 0;
  });

  const totalPages = Math.max(
    1,
    Math.ceil(sortedProducts.length / ITEMS_PER_PAGE),
  );
  const safeCurrentPage = Math.min(currentPage, totalPages);
  const startIndex = (safeCurrentPage - 1) * ITEMS_PER_PAGE;
  const visibleProducts = sortedProducts.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE,
  );

  const hasResults = visibleProducts.length > 0;

  const categoryMap = new Map(categories.map((item) => [item._id, item]));
  const pageLinks = Array.from({ length: totalPages }, (_, index) => index + 1);

  const res = await apiClient.get("/product/allproducts", {
    revalidate: 60 * 5,
  });

  console.log(res);

  return (
    <PageContainer className="pt-10 sm:pt-14">
      <section className="rounded-4xl border border-slate-200 bg-white px-6 py-8 shadow-sm sm:px-8">
        <p className="text-xs uppercase tracking-[0.16em] text-slate-400">
          Shop
        </p>
        <h1 className="mt-2 text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">
          Curated Styles For Everyday Motion
        </h1>
        <p className="mt-3 max-w-3xl text-sm text-slate-600 sm:text-base">
          Explore premium essentials and trending seasonal edits. Dummy data is
          used for this UI and no API is connected yet.
        </p>

        <div className="mt-5 text-sm text-slate-600">
          Showing {visibleProducts.length} of {sortedProducts.length} products
        </div>
      </section>

      <section className="mt-8 grid gap-6 lg:grid-cols-[270px_1fr]">
        <aside className="h-fit rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="text-sm font-extrabold uppercase tracking-[0.16em] text-slate-500">
            Filter And Sort
          </h2>

          <div className="mt-5">
            <h3 className="text-sm font-bold text-slate-900">Category</h3>
            <div className="mt-3 space-y-2">
              <Link
                href={getShopHref({
                  category: "",
                  sort: sortBy,
                  query: searchQuery,
                  page: 1,
                  maxPrice: selectedMaxPrice,
                })}
                className={`block rounded-xl px-3 py-2 text-sm font-medium transition ${
                  !selectedCategory
                    ? "bg-slate-900 text-white"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }`}
              >
                All Categories
              </Link>
              {categories.map((item) => (
                <Link
                  key={item._id}
                  href={getShopHref({
                    category: item.slug,
                    sort: sortBy,
                    query: searchQuery,
                    page: 1,
                    maxPrice: selectedMaxPrice,
                  })}
                  className={`block rounded-xl px-3 py-2 text-sm font-medium transition ${
                    selectedCategory === item.slug
                      ? "bg-slate-900 text-white"
                      : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>

          <div className="mt-6">
            <h3 className="text-sm font-bold text-slate-900">Sort By</h3>
            <div className="mt-3 space-y-2">
              {[
                { label: "Featured", value: "featured" },
                { label: "Price: Low to High", value: "price-asc" },
                { label: "Price: High to Low", value: "price-desc" },
                { label: "Highest Discount", value: "discount-desc" },
                { label: "Title: A to Z", value: "title-asc" },
              ].map((option) => (
                <Link
                  key={option.value}
                  href={getShopHref({
                    category: selectedCategory,
                    sort: option.value,
                    query: searchQuery,
                    page: 1,
                    maxPrice: selectedMaxPrice,
                  })}
                  className={`block rounded-xl px-3 py-2 text-sm font-medium transition ${
                    sortBy === option.value
                      ? "bg-orange-500 text-white"
                      : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                  }`}
                >
                  {option.label}
                </Link>
              ))}
            </div>
          </div>

          <div className="mt-6">
            <h3 className="text-sm font-bold text-slate-900">Price Range</h3>
            <form
              action="/shop"
              className="mt-3 space-y-3 rounded-xl bg-slate-50 p-3"
            >
              <input type="hidden" name="query" value={searchQuery} />
              <input type="hidden" name="category" value={selectedCategory} />
              <input type="hidden" name="sort" value={sortBy} />
              <label className="block">
                <span className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
                  Up to ${selectedMaxPrice}
                </span>
                <input
                  type="range"
                  name="maxPrice"
                  min="0"
                  max={absoluteMaxPrice}
                  step="1"
                  defaultValue={selectedMaxPrice}
                  className="mt-2 w-full accent-orange-500"
                />
              </label>
              <button
                type="submit"
                className="w-full rounded-lg bg-slate-900 px-3 py-2 text-sm font-semibold text-white hover:bg-slate-800"
              >
                Apply Price
              </button>
            </form>
          </div>
        </aside>

        <div>
          {hasResults ? (
            <>
              <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                {visibleProducts.map((product) => (
                  <ProductCard
                    key={product.slug}
                    product={product}
                    categoryName={
                      categoryMap.get(product.category)?.name || "Category"
                    }
                  />
                ))}
              </div>

              {totalPages > 1 ? (
                <nav className="mt-8 flex flex-wrap items-center justify-center gap-2">
                  {safeCurrentPage > 1 ? (
                    <Link
                      href={getShopHref({
                        category: selectedCategory,
                        sort: sortBy,
                        query: searchQuery,
                        page: safeCurrentPage - 1,
                        maxPrice: selectedMaxPrice,
                      })}
                      className="min-w-24 rounded-lg border border-slate-200 bg-white px-3 py-2 text-center text-sm font-semibold text-slate-700 hover:bg-slate-100"
                    >
                      Prev Page
                    </Link>
                  ) : (
                    <span className="min-w-24 rounded-lg border border-slate-200 bg-slate-100 px-3 py-2 text-center text-sm font-semibold text-slate-400">
                      Prev Page
                    </span>
                  )}

                  {pageLinks.map((pageNumber) => (
                    <Link
                      key={pageNumber}
                      href={getShopHref({
                        category: selectedCategory,
                        sort: sortBy,
                        query: searchQuery,
                        page: pageNumber,
                        maxPrice: selectedMaxPrice,
                      })}
                      className={`rounded-lg px-3 py-2 text-sm font-semibold transition ${
                        pageNumber === safeCurrentPage
                          ? "bg-slate-900 text-white"
                          : "border border-slate-200 bg-white text-slate-700 hover:bg-slate-100"
                      }`}
                    >
                      {pageNumber}
                    </Link>
                  ))}

                  {safeCurrentPage < totalPages ? (
                    <Link
                      href={getShopHref({
                        category: selectedCategory,
                        sort: sortBy,
                        query: searchQuery,
                        page: safeCurrentPage + 1,
                        maxPrice: selectedMaxPrice,
                      })}
                      className="min-w-24 rounded-lg border border-slate-200 bg-white px-3 py-2 text-center text-sm font-semibold text-slate-700 hover:bg-slate-100"
                    >
                      Next Page
                    </Link>
                  ) : (
                    <span className="min-w-24 rounded-lg border border-slate-200 bg-slate-100 px-3 py-2 text-center text-sm font-semibold text-slate-400">
                      Next Page
                    </span>
                  )}
                </nav>
              ) : null}
            </>
          ) : (
            <div className="rounded-3xl border border-slate-200 bg-white px-6 py-12 text-center shadow-sm">
              <h3 className="text-xl font-black text-slate-900">
                No products found
              </h3>
              <p className="mt-2 text-sm text-slate-600">
                Try changing your search, category, or sorting options.
              </p>
              <Link
                href="/shop"
                className="mt-5 inline-flex rounded-full bg-slate-900 px-5 py-2 text-sm font-semibold text-white hover:bg-slate-800"
              >
                Reset Filters
              </Link>
            </div>
          )}
        </div>
      </section>
    </PageContainer>
  );
}
