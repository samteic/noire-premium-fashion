import { useState, useMemo } from "react"
import { catalogProducts, productCategories } from "@/data/products"
import { useShop } from "@/context/ShopContext"

export default function CuratedCollectionSection() {
  const [activeCategory, setActiveCategory] = useState("All")
  const { toggleWishlist, isInWishlist, formatPrice } = useShop()

  const filteredProducts = useMemo(() => {
    if (activeCategory === "All") return catalogProducts
    return catalogProducts.filter((p) => p.category === activeCategory)
  }, [activeCategory])

  return (
    <section id="collection" className="section-shell py-16 sm:py-24 bg-white relative">
      <div className="max-w-7xl mx-auto">
        {/* Section Header with Simple, Understandable Words */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-6 border-b border-neutral-200 gap-4">
          <div>
            <span className="text-[10px] uppercase font-bold tracking-[2px] text-neutral-400 block mb-2">
              ✦ OUR COLLECTION
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold uppercase tracking-[2px] leading-tight text-neutral-900">
              Featured Clothes
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-neutral-600 font-sans max-w-md">
            Click any piece to see full details, select your size, and inquire directly with our team on WhatsApp.
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
          {productCategories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 text-xs uppercase tracking-[2px] font-semibold border transition-all duration-200 cursor-pointer whitespace-nowrap rounded-xs ${
                activeCategory === cat
                  ? "bg-black text-white border-black shadow-sm"
                  : "bg-white text-neutral-600 border-neutral-300 hover:border-black hover:text-black"
              }`}
            >
              {cat}
            </button>
          ))}
          <span className="text-xs text-neutral-400 font-mono ml-auto hidden sm:inline">
            {filteredProducts.length} Items
          </span>
        </div>

        {/* Clean Luxury Garments Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
          {filteredProducts.map((product) => {
            const rawPrice = parseInt(product.price.replace(/[^0-9]/g, "")) || 990
            const isWishlisted = isInWishlist(product.name)

            return (
              <article
                key={product.name}
                className="group relative flex flex-col bg-white border border-neutral-200/90 hover:border-black transition-all duration-300 shadow-xs hover:shadow-md cursor-pointer"
                onClick={() => {
                  window.location.hash = `product?name=${encodeURIComponent(product.name)}`
                }}
              >
                {/* Image Showcase */}
                <div className="relative aspect-[3/4] overflow-hidden bg-neutral-100">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
                    style={{ objectPosition: product.position || "50% 25%" }}
                  />

                  {product.hoverImage && (
                    <img
                      src={product.hoverImage}
                      alt={`${product.name} alternate view`}
                      className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                      style={{ objectPosition: product.position || "50% 25%" }}
                    />
                  )}

                  {/* Wishlist Heart */}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation()
                      toggleWishlist({
                        id: `prod-${product.name}`,
                        name: product.name,
                        price: rawPrice,
                        image: product.image,
                        category: product.category,
                      })
                    }}
                    className={`absolute top-3 right-3 z-10 w-8 h-8 rounded-full flex items-center justify-center transition-all cursor-pointer ${
                      isWishlisted
                        ? "bg-black text-white shadow-md scale-105"
                        : "bg-white/80 hover:bg-white text-neutral-600 hover:text-black shadow-xs hover:scale-110"
                    }`}
                    aria-label={isWishlisted ? "Remove from favourites" : "Save to favourites"}
                  >
                    <span className="text-xs">{isWishlisted ? "♥" : "♡"}</span>
                  </button>

                  {/* Category Tag */}
                  <div className="absolute bottom-3 left-3 bg-black/80 backdrop-blur-xs text-white text-[9px] uppercase tracking-[1.5px] px-2.5 py-1 pointer-events-none font-semibold">
                    {product.category}
                  </div>
                </div>

                {/* Content & Meta */}
                <div className="p-5 flex flex-col flex-1">
                  <div className="flex items-start justify-between gap-3 mb-1">
                    <h3 className="text-sm font-bold uppercase tracking-wider text-neutral-900 group-hover:text-black transition-colors">
                      {product.name}
                    </h3>
                    <strong className="text-sm font-semibold text-neutral-900 whitespace-nowrap">
                      {formatPrice(rawPrice)}
                    </strong>
                  </div>

                  <p className="text-[11px] text-neutral-500 font-sans line-clamp-1 mb-4">
                    {product.fit || "Quality French tailoring • Premium fabric"}
                  </p>

                  {/* Direct Prompt to View Sizes & Order */}
                  <div className="mt-auto pt-3 border-t border-neutral-100 flex items-center justify-between text-xs text-neutral-500 group-hover:text-black transition-colors">
                    <span className="text-[11px] uppercase tracking-wider font-semibold">
                      View Sizes & Inquire
                    </span>
                    <span className="text-black font-bold">→</span>
                  </div>
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
