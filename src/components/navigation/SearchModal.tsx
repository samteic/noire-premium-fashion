import { useState, useMemo, useEffect } from "react"
import { useShop } from "@/context/ShopContext"
import {
  catalogProducts,
  newArrivals,
  collection,
  ASSETS_PATH,
} from "@/data/products"

export default function SearchModal() {
  const {
    isSearchOpen,
    setIsSearchOpen,
    searchQuery,
    setSearchQuery,
    formatPrice,
  } = useShop()
  const [localQuery, setLocalQuery] = useState(searchQuery)

  useEffect(() => {
    if (isSearchOpen) {
      document.body.style.overflow = "hidden"
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") setIsSearchOpen(false)
      }
      window.addEventListener("keydown", handleKeyDown)
      return () => {
        document.body.style.overflow = ""
        window.removeEventListener("keydown", handleKeyDown)
      }
    } else {
      document.body.style.overflow = ""
    }
  }, [isSearchOpen, setIsSearchOpen])

  const allProducts = useMemo(() => {
    const list: {
      name: string
      category: string
      price: number
      image: string
    }[] = []
    newArrivals.forEach((p) => {
      list.push({
        name: p.name,
        category: p.category,
        price: parseInt(p.price.replace(/[^0-9]/g, "")) || 99,
        image: p.image,
      })
    })
    collection.forEach((p) => {
      list.push({
        name: p.name,
        category: p.category,
        price: parseInt(p.price.replace(/[^0-9]/g, "")) || 199,
        image: p.image,
      })
    })
    catalogProducts.forEach((p) => {
      list.push({
        name: p.name,
        category: p.category,
        price: parseInt(p.price.replace(/[^0-9]/g, "")) || 199,
        image: p.image,
      })
    })
    // Remove duplicates by name
    return list.filter(
      (p, index, self) => index === self.findIndex((t) => t.name === p.name),
    )
  }, [])

  const filteredProducts = useMemo(() => {
    const q = localQuery.trim().toLowerCase()
    if (!q) return []
    return allProducts.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q),
    )
  }, [allProducts, localQuery])

  const trendingTags = [
    "Cashmere Trench",
    "Silk Column Gown",
    "Wool Gabardine Blazer",
    "Mohair Knitwear",
    "Italian Smoking Jacket",
    "Pleated Trousers",
  ]

  return (
    <div
      className={`luxury-drawer-root ${
        isSearchOpen ? "is-open" : ""
      } flex items-start justify-center p-4 pt-16 sm:pt-24`}
      aria-hidden={!isSearchOpen}
    >
      <div
        className="luxury-drawer-backdrop"
        onClick={() => setIsSearchOpen(false)}
      />

      <div
        className="luxury-modal-content relative z-10 w-full max-w-2xl bg-white border border-neutral-300 p-6 sm:p-8 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
        style={{ letterSpacing: "1px" }}
      >
        <div className="flex items-center justify-between pb-4 border-b border-neutral-200">
          <div className="flex items-center gap-3 flex-1 mr-4">
            <img
              src={`${ASSETS_PATH}/f91e1.svg`}
              alt=""
              className="w-5 h-5 opacity-60"
            />
            <input
              type="text"
              autoFocus
              placeholder="Search coats, blazers, evening gowns, knitwear..."
              value={localQuery}
              onChange={(e) => {
                setLocalQuery(e.target.value)
                setSearchQuery(e.target.value)
              }}
              className="w-full text-base sm:text-lg border-none outline-none font-medium tracking-wide bg-transparent"
            />
          </div>
          {localQuery && (
            <button
              type="button"
              className="text-xs uppercase text-neutral-400 hover:text-black mr-4 cursor-pointer"
              onClick={() => {
                setLocalQuery("")
                setSearchQuery("")
              }}
            >
              Clear
            </button>
          )}
          <button
            type="button"
            className="text-2xl font-light text-neutral-400 hover:text-black transition-colors cursor-pointer"
            onClick={() => setIsSearchOpen(false)}
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        {/* Trending Tags */}
        <div className="py-4">
          <span className="text-[10px] uppercase font-bold text-neutral-400 tracking-[2px] block mb-2">
            Trending Searches
          </span>
          <div className="flex flex-wrap gap-2">
            {trendingTags.map((tag) => (
              <button
                key={tag}
                type="button"
                className="px-3 py-1 bg-neutral-100 hover:bg-neutral-200 text-xs text-neutral-700 transition-colors cursor-pointer"
                onClick={() => {
                  setLocalQuery(tag)
                  setSearchQuery(tag)
                }}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* Results */}
        {localQuery.trim() && (
          <div className="mt-4 pt-4 border-t border-neutral-100 max-h-80 overflow-y-auto">
            <span className="text-[10px] uppercase font-bold text-neutral-400 tracking-[2px] block mb-3">
              Results ({filteredProducts.length})
            </span>
            {filteredProducts.length === 0 ? (
              <p className="text-sm text-neutral-500 py-6 text-center">
                No matching garments found for &quot;{localQuery}&quot;
              </p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {filteredProducts.map((p) => (
                  <div
                    key={p.name}
                    className="flex items-center gap-3 p-2 hover:bg-neutral-50 transition-colors cursor-pointer border border-transparent hover:border-neutral-200"
                    onClick={() => {
                      setIsSearchOpen(false)
                      window.location.hash = "product"
                    }}
                  >
                    <img
                      src={p.image.startsWith("http") || p.image.startsWith("/") ? p.image : `${ASSETS_PATH}/${p.image}`}
                      alt={p.name}
                      className="w-12 h-14 object-cover bg-neutral-100"
                    />
                    <div className="min-w-0 flex-1">
                      <span className="text-[9px] uppercase tracking-wider text-neutral-400 block truncate">
                        {p.category}
                      </span>
                      <h4 className="text-xs font-semibold truncate text-neutral-900">
                        {p.name}
                      </h4>
                      <strong className="text-xs font-bold text-neutral-800">
                        {formatPrice(p.price)}
                      </strong>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
