import { useState, useMemo, useEffect } from "react"
import { createPortal } from "react-dom"
import ProductsHeader from "@/components/layout/ProductsHeader"
import CatalogCard from "@/components/product/CatalogCard"
import {
  catalogProducts,
  detailSizes,
  productCategories,
} from "@/data/products"

type AvailabilityType = "all" | "in_stock" | "pre_order"
type SortType = "featured" | "price_asc" | "price_desc"

export default function ProductsPage() {
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false)
  const [activeCategory, setActiveCategory] = useState("All")
  const [searchFilter, setSearchFilter] = useState("")
  const [selectedSize, setSelectedSize] = useState<string>("All")
  const [availability, setAvailability] = useState<AvailabilityType>("all")
  const [sortBy, setSortBy] = useState<SortType>("featured")

  // Reset scroll to top on mount
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" })
  }, [])

  // Lock body scroll when mobile filter drawer is open
  useEffect(() => {
    if (mobileFilterOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [mobileFilterOpen])

  // Count active non-default filters
  const activeFilterCount = useMemo(() => {
    let count = 0
    if (selectedSize !== "All") count++
    if (availability !== "all") count++
    if (activeCategory !== "All") count++
    if (searchFilter.trim() !== "") count++
    return count
  }, [selectedSize, availability, activeCategory, searchFilter])

  const resetAllFilters = () => {
    setActiveCategory("All")
    setSearchFilter("")
    setSelectedSize("All")
    setAvailability("all")
    setSortBy("featured")
  }

  const filteredProducts = useMemo(() => {
    let list = [...catalogProducts]

    // Category filter
    if (activeCategory !== "All") {
      list = list.filter((p) => p.category === activeCategory)
    }

    // Search query filter
    if (searchFilter.trim()) {
      const q = searchFilter.trim().toLowerCase()
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          (p.fit && p.fit.toLowerCase().includes(q))
      )
    }

    // Availability filter (demonstrative: Trench and Fluid Trousers are pre-order runway pieces, others in stock)
    if (availability === "in_stock") {
      list = list.filter(
        (p) => !p.name.toLowerCase().includes("trench") && !p.name.toLowerCase().includes("fluid")
      )
    } else if (availability === "pre_order") {
      list = list.filter(
        (p) => p.name.toLowerCase().includes("trench") || p.name.toLowerCase().includes("fluid")
      )
    }

    // Size filter (filter out if specific size requested, mock logic allows XS-XL)
    if (selectedSize !== "All") {
      // In a real database this filters by sku stock; here all 10 curated pieces have all sizes
      list = list.filter((p) => Boolean(p.name))
    }

    // Sorting
    if (sortBy === "price_asc") {
      list.sort((a, b) => {
        const pA = parseInt(a.price.replace(/[^0-9]/g, "")) || 0
        const pB = parseInt(b.price.replace(/[^0-9]/g, "")) || 0
        return pA - pB
      })
    } else if (sortBy === "price_desc") {
      list.sort((a, b) => {
        const pA = parseInt(a.price.replace(/[^0-9]/g, "")) || 0
        const pB = parseInt(b.price.replace(/[^0-9]/g, "")) || 0
        return pB - pA
      })
    }

    return list
  }, [activeCategory, searchFilter, availability, selectedSize, sortBy])

  return (
    <main id="products" className="products-page page-transition pb-20 sm:pb-12">
      <ProductsHeader />

      <div className="products-layout max-w-7xl mx-auto px-4 sm:px-8 pt-4 sm:pt-8">
        {/* Desktop Sidebar Filters */}
        <aside className="filters-panel hidden lg:block w-64 flex-shrink-0 pr-8 space-y-7">
          <div className="flex items-center justify-between pb-3 border-b border-neutral-200">
            <h2 className="text-xs uppercase font-extrabold tracking-[2px] text-neutral-900">
              Filters
            </h2>
            {activeFilterCount > 0 && (
              <button
                type="button"
                onClick={resetAllFilters}
                className="text-[11px] text-neutral-500 hover:text-black underline uppercase tracking-wider cursor-pointer"
              >
                Reset ({activeFilterCount})
              </button>
            )}
          </div>

          {/* Availability Filter */}
          <div className="space-y-2.5">
            <h3 className="text-xs uppercase font-bold tracking-[1.5px] text-neutral-800">
              Availability
            </h3>
            <div className="space-y-1.5 text-xs">
              <label
                className={`flex items-center justify-between p-2 rounded-xs border cursor-pointer transition-all ${
                  availability === "all"
                    ? "bg-neutral-900 text-white border-neutral-900 font-semibold"
                    : "bg-white text-neutral-700 border-neutral-200 hover:border-black"
                }`}
                onClick={() => setAvailability("all")}
              >
                <span>All Pieces</span>
                <span className="text-[10px] opacity-75">10</span>
              </label>

              <label
                className={`flex items-center justify-between p-2 rounded-xs border cursor-pointer transition-all ${
                  availability === "in_stock"
                    ? "bg-neutral-900 text-white border-neutral-900 font-semibold"
                    : "bg-white text-neutral-700 border-neutral-200 hover:border-black"
                }`}
                onClick={() => setAvailability("in_stock")}
              >
                <span>In Stock (Ready to Ship)</span>
                <span className="text-[10px] opacity-75">8</span>
              </label>

              <label
                className={`flex items-center justify-between p-2 rounded-xs border cursor-pointer transition-all ${
                  availability === "pre_order"
                    ? "bg-neutral-900 text-white border-neutral-900 font-semibold"
                    : "bg-white text-neutral-700 border-neutral-200 hover:border-black"
                }`}
                onClick={() => setAvailability("pre_order")}
              >
                <span>Tailored / Pre-Order</span>
                <span className="text-[10px] opacity-75">2</span>
              </label>
            </div>
          </div>

          {/* Size Filter */}
          <div className="space-y-2.5">
            <div className="flex items-center justify-between">
              <h3 className="text-xs uppercase font-bold tracking-[1.5px] text-neutral-800">
                Size
              </h3>
              {selectedSize !== "All" && (
                <button
                  type="button"
                  onClick={() => setSelectedSize("All")}
                  className="text-[10px] text-neutral-500 hover:text-black underline"
                >
                  Clear
                </button>
              )}
            </div>
            <div className="grid grid-cols-3 gap-1.5">
              {["All", ...detailSizes].map((size) => (
                <button
                  type="button"
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`py-2 text-xs font-semibold uppercase border transition-all cursor-pointer rounded-xs ${
                    selectedSize === size
                      ? "bg-neutral-900 text-white border-neutral-900 shadow-xs"
                      : "bg-white text-neutral-700 border-neutral-200 hover:border-black"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Sort By */}
          <div className="space-y-2.5">
            <h3 className="text-xs uppercase font-bold tracking-[1.5px] text-neutral-800">
              Sort By
            </h3>
            <div className="space-y-1.5 text-xs">
              {[
                { id: "featured", label: "Curated Showcase" },
                { id: "price_asc", label: "Price: Low to High" },
                { id: "price_desc", label: "Price: High to Low" },
              ].map((item) => (
                <button
                  type="button"
                  key={item.id}
                  onClick={() => setSortBy(item.id as SortType)}
                  className={`w-full text-left p-2 rounded-xs border text-xs cursor-pointer transition-all ${
                    sortBy === item.id
                      ? "bg-neutral-900 text-white border-neutral-900 font-semibold"
                      : "bg-white text-neutral-700 border-neutral-200 hover:border-black"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        </aside>

        {/* Main Catalog View */}
        <section className="catalog min-w-0 flex-1">
          {/* Header Info */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 pb-3 border-b border-neutral-200/80">
            <div>
              <p className="breadcrumb text-[11px] uppercase tracking-wider text-neutral-400">
                <span>Home</span> / Collection
              </p>
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight uppercase text-neutral-900 mt-1">
                Collection
              </h1>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-xs text-neutral-500 font-medium">
                {filteredProducts.length} Pieces Available
              </span>
            </div>
          </div>

          {/* Mobile & Tablet Filter / Search Bar */}
          <div className="mt-4 space-y-3">
            {/* Search Input */}
            <div className="relative flex items-center bg-neutral-100 border border-neutral-200 rounded-xs overflow-hidden focus-within:border-black transition-colors">
              <svg
                className="w-4 h-4 ml-3 text-neutral-400 flex-shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              <input
                type="text"
                aria-label="Search garments"
                placeholder="Search coats, trousers, silk shirts..."
                value={searchFilter}
                onChange={(e) => setSearchFilter(e.target.value)}
                className="w-full py-2.5 px-3 bg-transparent text-sm text-neutral-900 placeholder-neutral-400 outline-none"
              />
              {searchFilter && (
                <button
                  type="button"
                  onClick={() => setSearchFilter("")}
                  className="mr-3 text-neutral-400 hover:text-black cursor-pointer text-xs"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Category Scroll Pills + Mobile Filter Trigger */}
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none flex-1">
                {productCategories.map((category) => (
                  <button
                    type="button"
                    key={category}
                    onClick={() => setActiveCategory(category)}
                    className={`px-3 py-1.5 text-xs uppercase tracking-wider font-semibold border rounded-xs whitespace-nowrap cursor-pointer transition-all ${
                      activeCategory === category
                        ? "bg-black text-white border-black shadow-xs"
                        : "bg-white text-neutral-600 border-neutral-200 hover:border-black hover:text-black"
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>

              {/* Mobile Filter Button */}
              <button
                type="button"
                onClick={() => setMobileFilterOpen(true)}
                className="lg:hidden flex items-center gap-1.5 px-3 py-1.5 bg-neutral-900 text-white text-xs uppercase tracking-wider font-bold rounded-xs cursor-pointer flex-shrink-0 shadow-xs active:scale-95"
              >
                <svg className="w-3.5 h-3.5 fill-none stroke-current" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                </svg>
                <span>Filter</span>
                {activeFilterCount > 0 && (
                  <span className="w-4 h-4 bg-white text-black text-[9px] rounded-full flex items-center justify-center font-bold">
                    {activeFilterCount}
                  </span>
                )}
              </button>
            </div>

            {/* Active Filter Chips */}
            {(selectedSize !== "All" || availability !== "all" || searchFilter) && (
              <div className="flex items-center gap-2 flex-wrap pt-1">
                <span className="text-[10px] uppercase font-bold text-neutral-400">
                  Active Filters:
                </span>
                {selectedSize !== "All" && (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-neutral-200 text-neutral-800 text-[11px] rounded-xs font-medium">
                    Size: {selectedSize}
                    <button
                      type="button"
                      onClick={() => setSelectedSize("All")}
                      className="cursor-pointer font-bold ml-0.5 hover:text-black"
                    >
                      ✕
                    </button>
                  </span>
                )}
                {availability !== "all" && (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-neutral-200 text-neutral-800 text-[11px] rounded-xs font-medium">
                    {availability === "in_stock" ? "In Stock" : "Pre-Order"}
                    <button
                      type="button"
                      onClick={() => setAvailability("all")}
                      className="cursor-pointer font-bold ml-0.5 hover:text-black"
                    >
                      ✕
                    </button>
                  </span>
                )}
                <button
                  type="button"
                  onClick={resetAllFilters}
                  className="text-[10px] text-neutral-500 hover:text-black underline ml-1 cursor-pointer"
                >
                  Clear all
                </button>
              </div>
            )}
          </div>

          {/* Product Grid */}
          {filteredProducts.length > 0 ? (
            <div className="catalog-grid grid grid-cols-2 md:grid-cols-3 gap-x-3 gap-y-6 sm:gap-x-6 sm:gap-y-10 mt-6">
              {filteredProducts.map((product, index) => (
                <CatalogCard
                  product={product}
                  featured={index === 0 && activeCategory === "All"}
                  index={index}
                  key={product.name + product.category}
                />
              ))}
            </div>
          ) : (
            <div className="py-20 text-center space-y-3">
              <p className="text-neutral-500 text-sm font-medium">
                No garments found matching your current filter selection.
              </p>
              <button
                type="button"
                onClick={resetAllFilters}
                className="px-4 py-2 bg-black text-white text-xs uppercase tracking-wider font-bold rounded-xs cursor-pointer hover:bg-neutral-800"
              >
                Reset All Filters
              </button>
            </div>
          )}
        </section>
      </div>

      {/* Modern Mobile Filter Drawer / Bottom Sheet via Portal to document.body */}
      {mobileFilterOpen && typeof document !== "undefined" && createPortal(
        <div className="mobile-filter-drawer lg:hidden" id="mobile-filter-portal">
          {/* Dimmed Backdrop */}
          <div
            className="mobile-filter-backdrop"
            onClick={() => setMobileFilterOpen(false)}
          />

          {/* Sheet Panel */}
          <div className="mobile-filter-panel">
            {/* Header */}
            <div className="flex items-center justify-between p-4 sm:p-5 border-b border-neutral-200 bg-white flex-shrink-0">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-black rounded-full" />
                <h3 className="text-sm font-extrabold uppercase tracking-[1.5px] text-neutral-900">
                  Filters & Availability
                </h3>
              </div>
              <div className="flex items-center gap-3">
                {activeFilterCount > 0 && (
                  <button
                    type="button"
                    onClick={resetAllFilters}
                    className="text-xs text-neutral-500 underline font-medium cursor-pointer"
                  >
                    Reset
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => setMobileFilterOpen(false)}
                  className="w-8 h-8 rounded-full bg-neutral-100 flex items-center justify-center text-neutral-600 hover:text-black cursor-pointer text-sm font-bold"
                  aria-label="Close filters"
                >
                  ✕
                </button>
              </div>
            </div>

            {/* Scrollable Body */}
            <div className="overflow-y-auto p-5 space-y-6 flex-1">
              {/* Availability Option */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-[1.5px] text-neutral-800">
                  Availability
                </h4>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: "all", label: "All Items", count: 10 },
                    { id: "in_stock", label: "In Stock", count: 8 },
                    { id: "pre_order", label: "Pre-Order", count: 2 },
                  ].map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setAvailability(item.id as AvailabilityType)}
                      className={`py-2.5 px-2 text-center text-xs font-semibold border rounded-xs cursor-pointer transition-all ${
                        availability === item.id
                          ? "bg-black text-white border-black shadow-xs"
                          : "bg-white text-neutral-700 border-neutral-200 hover:border-black"
                      }`}
                    >
                      <div className="truncate">{item.label}</div>
                      <div className="text-[10px] opacity-75 mt-0.5">({item.count})</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Sizes Option */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-[1.5px] text-neutral-800">
                  Size
                </h4>
                <div className="grid grid-cols-6 gap-1.5">
                  {["All", ...detailSizes].map((sz) => (
                    <button
                      key={sz}
                      type="button"
                      onClick={() => setSelectedSize(sz)}
                      className={`py-2 text-xs font-bold uppercase border rounded-xs cursor-pointer transition-all ${
                        selectedSize === sz
                          ? "bg-black text-white border-black"
                          : "bg-white text-neutral-700 border-neutral-200 hover:border-black"
                      }`}
                    >
                      {sz}
                    </button>
                  ))}
                </div>
              </div>

              {/* Sort Order */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-[1.5px] text-neutral-800">
                  Sort Order
                </h4>
                <div className="grid grid-cols-1 gap-1.5">
                  {[
                    { id: "featured", label: "Curated Showcase" },
                    { id: "price_asc", label: "Price: Low to High" },
                    { id: "price_desc", label: "Price: High to Low" },
                  ].map((sortItem) => (
                    <button
                      key={sortItem.id}
                      type="button"
                      onClick={() => setSortBy(sortItem.id as SortType)}
                      className={`py-2.5 px-3 text-left text-xs font-semibold border rounded-xs cursor-pointer transition-all flex items-center justify-between ${
                        sortBy === sortItem.id
                          ? "bg-black text-white border-black"
                          : "bg-white text-neutral-700 border-neutral-200"
                      }`}
                    >
                      <span>{sortItem.label}</span>
                      {sortBy === sortItem.id && <span>✓</span>}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Footer Apply Button */}
            <div className="p-4 border-t border-neutral-200 bg-white flex-shrink-0">
              <button
                type="button"
                onClick={() => setMobileFilterOpen(false)}
                className="w-full py-3.5 bg-black hover:bg-neutral-800 text-white text-xs uppercase tracking-[2px] font-bold rounded-xs cursor-pointer shadow-md transition-all active:scale-[0.99]"
              >
                View {filteredProducts.length} Garments
              </button>
            </div>
          </div>
        </div>,
        document.body
      )}
    </main>
  )
}
