import { useEffect } from "react"
import { useShop } from "@/context/ShopContext"
import { ASSETS_PATH } from "@/data/products"

export default function WishlistDrawer() {
  const {
    isWishlistOpen,
    setIsWishlistOpen,
    wishlist,
    removeFromWishlist,
    addToCart,
    formatPrice,
  } = useShop()

  useEffect(() => {
    if (isWishlistOpen) {
      document.body.style.overflow = "hidden"
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") setIsWishlistOpen(false)
      }
      window.addEventListener("keydown", handleKeyDown)
      return () => {
        document.body.style.overflow = ""
        window.removeEventListener("keydown", handleKeyDown)
      }
    } else {
      document.body.style.overflow = ""
    }
  }, [isWishlistOpen, setIsWishlistOpen])

  return (
    <div
      className={`luxury-drawer-root ${isWishlistOpen ? "is-open" : ""}`}
      aria-hidden={!isWishlistOpen}
    >
      {/* Backdrop */}
      <div
        className="luxury-drawer-backdrop"
        onClick={() => setIsWishlistOpen(false)}
      />

      {/* Drawer Panel */}
      <aside
        className="luxury-sidebar-right p-6 sm:p-8"
        onClick={(e) => e.stopPropagation()}
        style={{ letterSpacing: "1px" }}
        role="dialog"
        aria-modal="true"
        aria-label="Wishlist"
      >
        <div
          className="sidebar-stagger-right flex items-center justify-between pb-6 border-b border-neutral-200"
          style={{ transitionDelay: isWishlistOpen ? "90ms" : "0ms" }}
        >
          <div>
            <span className="text-[10px] uppercase font-bold tracking-[2px] text-neutral-400">
              Saved Items
            </span>
            <h2 className="text-lg font-bold uppercase tracking-[2px]">
              Wishlist ({wishlist.length})
            </h2>
          </div>
          <button
            type="button"
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-neutral-100 text-neutral-400 hover:text-black transition-all cursor-pointer text-xl"
            onClick={() => setIsWishlistOpen(false)}
            aria-label="Close Wishlist"
          >
            ✕
          </button>
        </div>

        {wishlist.length === 0 ? (
          <div
            className="sidebar-stagger-right flex-1 flex flex-col items-center justify-center text-center p-8"
            style={{ transitionDelay: isWishlistOpen ? "140ms" : "0ms" }}
          >
            <svg
              className="w-12 h-12 text-neutral-300 mb-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.25"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
            <p className="text-sm font-medium uppercase tracking-widest text-neutral-600 mb-2">
              Your wishlist is empty
            </p>
            <p className="text-xs text-neutral-400 max-w-xs mb-6">
              Explore our latest arrivals and tap the heart icon on any piece to
              save it for later.
            </p>
            <button
              type="button"
              className="px-6 py-2.5 bg-black text-white text-xs uppercase tracking-[2px] hover:bg-neutral-800 transition-colors cursor-pointer"
              onClick={() => {
                setIsWishlistOpen(false)
                window.location.hash = "products"
              }}
            >
              Browse Catalog
            </button>
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto py-4 divide-y divide-neutral-100">
            {wishlist.map((item, idx) => (
              <div
                key={item.id}
                className="sidebar-stagger-right py-4 flex gap-4 items-center"
                style={{
                  transitionDelay: isWishlistOpen
                    ? `${140 + idx * 30}ms`
                    : "0ms",
                }}
              >
                <div className="w-20 h-24 bg-neutral-100 overflow-hidden flex-shrink-0 border border-neutral-200">
                  <img
                    src={item.image.startsWith("http") || item.image.startsWith("/") ? item.image : `${ASSETS_PATH}/${item.image}`}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <span className="text-[10px] uppercase tracking-wider text-neutral-400 block truncate">
                    {item.category}
                  </span>
                  <h3 className="text-xs font-semibold tracking-wide text-neutral-900 truncate">
                    {item.name}
                  </h3>
                  <strong className="text-xs font-bold text-neutral-900 block mt-1">
                    {formatPrice(item.price)}
                  </strong>
                  <div className="flex items-center gap-3 mt-3">
                    <button
                      type="button"
                      className="text-[11px] uppercase tracking-wider font-semibold text-black underline hover:opacity-70 cursor-pointer"
                      onClick={() => {
                        addToCart({ name: item.name, image: item.image })
                        removeFromWishlist(item.id)
                      }}
                    >
                      Move to Cart
                    </button>
                    <span className="text-neutral-300">|</span>
                    <button
                      type="button"
                      className="text-[11px] uppercase tracking-wider text-neutral-400 hover:text-red-600 transition-colors cursor-pointer"
                      onClick={() => removeFromWishlist(item.id)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {wishlist.length > 0 && (
          <div
            className="sidebar-stagger-right pt-4 border-t border-neutral-200"
            style={{ transitionDelay: isWishlistOpen ? "250ms" : "0ms" }}
          >
            <button
              type="button"
              className="w-full py-3 bg-black text-white text-xs uppercase tracking-[2px] font-semibold hover:bg-neutral-800 transition-colors cursor-pointer"
              onClick={() => {
                wishlist.forEach((item) => {
                  addToCart({ name: item.name, image: item.image })
                })
                setIsWishlistOpen(false)
                window.location.hash = "cart"
              }}
            >
              <span className="text-white">Add All to Shopping Bag</span>
            </button>
          </div>
        )}
      </aside>
    </div>
  )
}
