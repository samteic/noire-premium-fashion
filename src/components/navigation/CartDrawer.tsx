import { useEffect } from "react"
import { useShop } from "@/context/ShopContext"
import { ASSETS_PATH } from "@/data/products"

const FREE_SHIPPING_THRESHOLD_USD = 300

export default function CartDrawer() {
  const {
    isCartOpen,
    setIsCartOpen,
    cartItems,
    cartCount,
    cartSubtotal,
    removeFromCart,
    updateCartQuantity,
    formatPrice,
  } = useShop()

  // Lock body scroll and handle Escape key
  useEffect(() => {
    if (isCartOpen) {
      document.body.style.overflow = "hidden"
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") setIsCartOpen(false)
      }
      window.addEventListener("keydown", handleKeyDown)
      return () => {
        document.body.style.overflow = ""
        window.removeEventListener("keydown", handleKeyDown)
      }
    } else {
      document.body.style.overflow = ""
    }
  }, [isCartOpen, setIsCartOpen])

  const amountNeeded = Math.max(0, FREE_SHIPPING_THRESHOLD_USD - cartSubtotal)
  const shippingProgress = Math.min(
    100,
    Math.round((cartSubtotal / FREE_SHIPPING_THRESHOLD_USD) * 100),
  )

  return (
    <div
      className={`luxury-drawer-root ${isCartOpen ? "is-open" : ""}`}
      aria-hidden={!isCartOpen}
    >
      {/* Dimmed Blur Backdrop */}
      <div
        className="luxury-drawer-backdrop"
        onClick={() => setIsCartOpen(false)}
      />

      {/* Drawer Panel */}
      <aside
        className="luxury-sidebar-right p-6 sm:p-8"
        onClick={(e) => e.stopPropagation()}
        style={{ letterSpacing: "1px" }}
        role="dialog"
        aria-modal="true"
        aria-label="Shopping Bag"
      >
        {/* Drawer Header */}
        <div
          className="sidebar-stagger-right flex items-center justify-between pb-5 border-b border-neutral-200"
          style={{ transitionDelay: isCartOpen ? "90ms" : "0ms" }}
        >
          <div>
            <span className="text-[10px] uppercase font-bold tracking-[2px] text-neutral-400">
              Your Selection
            </span>
            <h2 className="text-lg font-bold uppercase tracking-[2px]">
              Shopping Bag ({cartCount})
            </h2>
          </div>
          <button
            type="button"
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-neutral-100 text-neutral-400 hover:text-black transition-all cursor-pointer text-xl"
            onClick={() => setIsCartOpen(false)}
            aria-label="Close Shopping Bag"
          >
            ✕
          </button>
        </div>

        {/* Free Express Shipping Meter */}
        <div
          className="sidebar-stagger-right my-4 p-3 bg-neutral-50 border border-neutral-200"
          style={{ transitionDelay: isCartOpen ? "140ms" : "0ms" }}
        >
          <div className="flex items-center justify-between text-[11px] uppercase tracking-wider mb-2 font-medium">
            {amountNeeded > 0 ? (
              <span>
                Add{" "}
                <strong className="text-black">
                  {formatPrice(amountNeeded)}
                </strong>{" "}
                for Free Express Courier
              </span>
            ) : (
              <span className="text-black font-bold flex items-center gap-1.5">
                <span>✦</span> Complimentary Express Courier Unlocked
              </span>
            )}
            <span className="text-neutral-500 font-mono text-[10px]">
              {shippingProgress}%
            </span>
          </div>
          <div className="w-full h-1.5 bg-neutral-200 overflow-hidden rounded-full">
            <div
              className="h-full bg-black transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
              style={{ width: `${shippingProgress}%` }}
            />
          </div>
        </div>

        {/* Items List */}
        {cartItems.length === 0 ? (
          <div
            className="sidebar-stagger-right flex-1 flex flex-col items-center justify-center text-center p-8"
            style={{ transitionDelay: isCartOpen ? "180ms" : "0ms" }}
          >
            <div className="w-14 h-14 rounded-full bg-neutral-100 flex items-center justify-center mb-4">
              <svg
                className="w-6 h-6 text-neutral-400"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <path d="M16 10a4 4 0 0 1-8 0" />
              </svg>
            </div>
            <p className="text-sm font-semibold uppercase tracking-widest text-neutral-800 mb-2">
              Your bag is empty
            </p>
            <p className="text-xs text-neutral-400 max-w-xs mb-6">
              Discover the latest silhouettes from the SS24 Silent Archives
              collection.
            </p>
            <button
              type="button"
              className="px-6 py-3 bg-black text-white text-xs uppercase tracking-[2px] font-semibold hover:bg-neutral-800 transition-all cursor-pointer"
              onClick={() => {
                setIsCartOpen(false)
                window.location.hash = "products"
              }}
            >
              Explore Collection
            </button>
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto py-2 divide-y divide-neutral-100 pr-1">
            {cartItems.map((item, idx) => {
              const itemPrice = item.price || 199
              const itemQty = item.quantity || 1
              return (
                <div
                  key={`${item.id}-${item.size || "M"}-${idx}`}
                  className="sidebar-stagger-right py-4 flex gap-4 items-center group"
                  style={{
                    transitionDelay: isCartOpen ? `${160 + idx * 30}ms` : "0ms",
                  }}
                >
                  <div className="w-20 h-24 bg-neutral-100 overflow-hidden flex-shrink-0 border border-neutral-200">
                    <img
                      src={item.image.startsWith("http") || item.image.startsWith("/") ? item.image : `${ASSETS_PATH}/${item.image}`}
                      alt={item.name}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="text-xs font-semibold tracking-wide text-neutral-900 truncate">
                        {item.name}
                      </h3>
                      <button
                        type="button"
                        className="text-neutral-400 hover:text-red-600 transition-colors text-sm cursor-pointer p-0.5"
                        onClick={() => removeFromCart(item.id)}
                        aria-label="Remove item"
                        title="Remove"
                      >
                        ✕
                      </button>
                    </div>

                    <div className="flex items-center gap-2 mt-1 text-[10px] uppercase text-neutral-400">
                      <span>
                        Size:{" "}
                        <strong className="text-neutral-700">
                          {item.size || "M"}
                        </strong>
                      </span>
                      <span>•</span>
                      <span>
                        Color:{" "}
                        <strong className="text-neutral-700">
                          {item.color || "Noir"}
                        </strong>
                      </span>
                    </div>

                    <div className="flex items-center justify-between mt-3">
                      {/* Quantity Stepper */}
                      <div className="flex items-center border border-neutral-200">
                        <button
                          type="button"
                          className="w-6 h-6 flex items-center justify-center hover:bg-neutral-100 text-xs font-semibold transition-colors cursor-pointer"
                          onClick={() => updateCartQuantity(item.id, -1)}
                          aria-label="Decrease quantity"
                        >
                          −
                        </button>
                        <span className="w-7 text-center text-xs font-semibold font-mono">
                          {itemQty}
                        </span>
                        <button
                          type="button"
                          className="w-6 h-6 flex items-center justify-center hover:bg-neutral-100 text-xs font-semibold transition-colors cursor-pointer"
                          onClick={() => updateCartQuantity(item.id, 1)}
                          aria-label="Increase quantity"
                        >
                          +
                        </button>
                      </div>

                      <strong className="text-xs font-bold text-neutral-900">
                        {formatPrice(itemPrice * itemQty)}
                      </strong>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}

        {/* Footer & Checkout */}
        {cartItems.length > 0 && (
          <div
            className="sidebar-stagger-right pt-4 border-t border-neutral-200 space-y-3 mt-auto"
            style={{ transitionDelay: isCartOpen ? "260ms" : "0ms" }}
          >
            {/* Subtotal */}
            <div className="flex items-center justify-between text-xs uppercase tracking-wider">
              <span className="font-semibold text-neutral-600">Subtotal</span>
              <strong className="text-base font-bold text-neutral-900 font-mono">
                {formatPrice(cartSubtotal)}
              </strong>
            </div>

            <p className="text-[10px] text-neutral-400 uppercase tracking-widest text-center">
              Duties & Taxes calculated at checkout • Noiré Signature Box
              included
            </p>

            <button
              type="button"
              className="w-full py-3.5 bg-black text-white text-xs uppercase tracking-[2px] font-semibold hover:bg-neutral-800 transition-all cursor-pointer shadow-md hover:shadow-lg flex items-center justify-center gap-2"
              onClick={() => {
                setIsCartOpen(false)
                window.location.hash = "checkout"
              }}
            >
              <span className="text-white">Proceed to Checkout</span>
              <span className="text-white">→</span>
            </button>

            <button
              type="button"
              className="w-full py-2.5 bg-neutral-100 text-neutral-800 text-xs uppercase tracking-[2px] font-semibold hover:bg-neutral-200 transition-all cursor-pointer text-center"
              onClick={() => {
                setIsCartOpen(false)
                window.location.hash = "cart"
              }}
            >
              View Full Shopping Bag
            </button>
          </div>
        )}
      </aside>
    </div>
  )
}
