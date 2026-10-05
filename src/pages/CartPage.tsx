import { useState, useEffect } from "react"
import Navbar from "@/components/layout/Navbar"
import CartItem from "@/components/cart/CartItem"
import { useShop } from "@/context/ShopContext"

const FREE_SHIPPING_THRESHOLD_USD = 300

export default function CartPage() {
  const {
    cartItems,
    cartCount,
    cartSubtotal,
    removeFromCart,
    updateCartQuantity,
    clearCart,
    formatPrice,
    setIsWishlistOpen,
    wishlistCount,
  } = useShop()

  const [accepted, setAccepted] = useState(true)
  const [giftBox, setGiftBox] = useState(false)
  const [giftNote, setGiftNote] = useState("")
  const [promoCode, setPromoCode] = useState("")
  const [appliedDiscount, setAppliedDiscount] = useState<number>(0)
  const [promoMessage, setPromoMessage] = useState<{
    text: string
    type: "success" | "error"
  } | null>(null)

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" })
  }, [])

  const shipping = cartSubtotal >= FREE_SHIPPING_THRESHOLD_USD || cartItems.length === 0 ? 0 : 15
  const discountedSubtotal = Math.max(0, cartSubtotal - appliedDiscount)
  const total = discountedSubtotal + (cartItems.length > 0 ? shipping : 0)

  const amountNeeded = Math.max(0, FREE_SHIPPING_THRESHOLD_USD - cartSubtotal)
  const shippingProgress = Math.min(
    100,
    Math.round((cartSubtotal / FREE_SHIPPING_THRESHOLD_USD) * 100),
  )

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault()
    const clean = promoCode.trim().toUpperCase()
    if (!clean) return

    if (clean === "NOIRE10" || clean === "VIP10") {
      const discount = Math.round(cartSubtotal * 0.1)
      setAppliedDiscount(discount)
      setPromoMessage({
        text: `10% Atelier Privilege Applied (-${formatPrice(discount)})`,
        type: "success",
      })
    } else if (clean === "FREESHIP") {
      setAppliedDiscount(shipping)
      setPromoMessage({
        text: "Complimentary Express Courier Applied",
        type: "success",
      })
    } else {
      setPromoMessage({
        text: "Code not recognized. Please verify your atelier voucher.",
        type: "error",
      })
    }
  }

  // Pre-formatted WhatsApp bag inquiry message
  const generateWhatsAppUrl = () => {
    const itemsList = cartItems
      .map(
        (item) =>
          `• ${item.name} (${item.size || "M"}, Qty: ${item.quantity || 1}) - ${formatPrice(
            (item.price || 199) * (item.quantity || 1),
          )}`,
      )
      .join("\n")

    const text = encodeURIComponent(
      `Hello Noiré Concierge, I would like to inquire about ordering the items in my shopping bag:\n\n${itemsList}\n\nEstimated Total: ${formatPrice(
        total,
      )}\n\nCould you assist me with personal styling, sizing, and priority dispatch?`,
    )
    return `https://wa.me/33140205050?text=${text}`
  }

  return (
    <main className="cart-page page-transition min-h-screen bg-white pb-24 text-neutral-900 font-sans">
      <Navbar page="cart" />

      <div className="max-w-[1360px] mx-auto px-4 sm:px-8 pt-8">
        {/* Breadcrumb Navigation & Continue Shopping */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6 text-xs">
          <div className="flex items-center gap-2 text-neutral-400">
            <button
              type="button"
              onClick={() => {
                window.location.hash = "home"
              }}
              className="hover:text-black transition-colors cursor-pointer"
            >
              Home
            </button>
            <span>/</span>
            <button
              type="button"
              onClick={() => {
                window.location.hash = "products"
              }}
              className="hover:text-black transition-colors cursor-pointer"
            >
              Collections
            </button>
            <span>/</span>
            <span className="text-black font-semibold">Shopping Bag</span>
          </div>

          <button
            type="button"
            onClick={() => {
              window.location.hash = "products"
            }}
            className="inline-flex items-center gap-2 text-neutral-600 hover:text-black font-medium transition-colors cursor-pointer uppercase tracking-wider text-[11px]"
          >
            <span>←</span> Continue Shopping
          </button>
        </div>

        {/* Page Title & Tab Selector */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-5 border-b border-neutral-200">
          <div>
            <span className="text-[10px] uppercase font-bold tracking-[3px] text-neutral-400 block mb-1">
              Atelier Selection
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold uppercase tracking-[2px] text-neutral-900">
              Shopping Bag
              <span className="ml-3 text-lg font-normal text-neutral-400 font-mono">
                ({cartCount} {cartCount === 1 ? "piece" : "pieces"})
              </span>
            </h1>
          </div>

          <div className="flex items-center gap-6 text-xs uppercase tracking-wider">
            <span className="font-bold text-black border-b-2 border-black pb-1">
              Bag ({cartCount})
            </span>
            <button
              type="button"
              onClick={() => setIsWishlistOpen(true)}
              className="text-neutral-400 hover:text-black transition-colors pb-1 flex items-center gap-1.5 cursor-pointer"
            >
              <svg
                className="w-3.5 h-3.5 fill-none stroke-current"
                viewBox="0 0 24 24"
                strokeWidth="1.75"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                />
              </svg>
              Saved Favourites ({wishlistCount})
            </button>
          </div>
        </div>

        {/* Complimentary Express Courier Progress Banner */}
        <div className="my-6 p-4 sm:p-5 bg-neutral-50 border border-neutral-200">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs uppercase tracking-wider mb-2.5">
            {amountNeeded > 0 ? (
              <span className="text-neutral-700 font-medium">
                Add <strong className="text-black font-bold">{formatPrice(amountNeeded)}</strong> more to unlock <span className="font-bold text-black">Complimentary Worldwide Express Courier</span>
              </span>
            ) : (
              <span className="text-black font-bold">
                Complimentary Worldwide Express Courier Unlocked
              </span>
            )}
            <span className="text-neutral-500 font-mono text-[11px]">
              {shippingProgress}% to Free Shipping
            </span>
          </div>
          <div className="w-full h-1.5 bg-neutral-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-black transition-all duration-500 ease-out"
              style={{ width: `${shippingProgress}%` }}
            />
          </div>
        </div>

        {/* Main 2-Column Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start mt-8">
          {/* Left Column: Bag Items & Guarantees */}
          <div className="lg:col-span-7 xl:col-span-8 space-y-6">
            {cartItems.length === 0 ? (
              /* Empty Bag State */
              <div className="py-20 px-6 text-center border border-dashed border-neutral-300 bg-neutral-50/50">
                <div className="w-16 h-16 rounded-full bg-white border border-neutral-200 flex items-center justify-center mx-auto mb-5 shadow-xs">
                  <svg
                    className="w-7 h-7 text-neutral-400"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                    <line x1="3" y1="6" x2="21" y2="6" />
                    <path d="M16 10a4 4 0 0 1-8 0" />
                  </svg>
                </div>
                <h2 className="text-lg font-bold uppercase tracking-[2px] text-neutral-900 mb-2">
                  Your shopping bag is currently empty
                </h2>
                <p className="text-xs text-neutral-500 max-w-md mx-auto mb-8 leading-relaxed">
                  Explore our seasonal runway collections, outerwear, and tailored essentials to add pieces to your personal atelier bag.
                </p>
                <div className="flex flex-wrap items-center justify-center gap-4">
                  <button
                    type="button"
                    onClick={() => {
                      window.location.hash = "products"
                    }}
                    className="px-8 py-3.5 bg-black text-white text-xs uppercase tracking-[2px] font-semibold hover:bg-neutral-800 transition-all cursor-pointer shadow-md hover:shadow-lg"
                  >
                    Explore Collections
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      window.location.hash = "home"
                    }}
                    className="px-6 py-3.5 bg-white text-black border border-neutral-300 text-xs uppercase tracking-[2px] font-semibold hover:bg-neutral-100 transition-all cursor-pointer"
                  >
                    View Lookbook
                  </button>
                </div>
              </div>
            ) : (
              /* Populated Items */
              <div className="space-y-4">
                <div className="flex items-center justify-between pb-2 text-[11px] uppercase tracking-wider text-neutral-400 border-b border-neutral-100 px-1">
                  <span>Selected Pieces ({cartCount})</span>
                  <button
                    type="button"
                    onClick={clearCart}
                    className="hover:text-red-600 transition-colors cursor-pointer underline lowercase tracking-normal text-xs"
                  >
                    clear bag
                  </button>
                </div>

                <div className="space-y-4">
                  {cartItems.map((item) => (
                    <CartItem
                      key={`${item.id}-${item.size || "M"}`}
                      item={item}
                      onRemove={() => removeFromCart(item.id)}
                      onUpdateQuantity={(delta) => updateCartQuantity(item.id, delta)}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Atelier Guarantees / Service Notes */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 border-t border-neutral-200">
              <div>
                <h4 className="text-[11px] font-bold uppercase tracking-[1.5px] text-neutral-900 mb-1">
                  Complimentary Returns
                </h4>
                <p className="text-[11px] text-neutral-500 leading-relaxed">
                  30-day effortless worldwide returns and exchanges on all unworn garments.
                </p>
              </div>

              <div>
                <h4 className="text-[11px] font-bold uppercase tracking-[1.5px] text-neutral-900 mb-1">
                  Signature Packaging
                </h4>
                <p className="text-[11px] text-neutral-500 leading-relaxed">
                  Hand-placed in our rigid presentation box with bespoke tissue and ribbon.
                </p>
              </div>

              <div>
                <h4 className="text-[11px] font-bold uppercase tracking-[1.5px] text-neutral-900 mb-1">
                  Insured Express Delivery
                </h4>
                <p className="text-[11px] text-neutral-500 leading-relaxed">
                  Carbon-neutral courier transit with full insurance and tracking.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Sticky Order Summary */}
          <div className="lg:col-span-5 xl:col-span-4">
            <aside className="sticky top-28 bg-neutral-50 border border-neutral-200 p-6 sm:p-8 space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-neutral-200">
                <h2 className="text-sm font-bold uppercase tracking-[2px] text-neutral-900">
                  Order Summary
                </h2>
                <span className="text-xs text-neutral-500 font-mono">
                  {cartCount} {cartCount === 1 ? "Item" : "Items"}
                </span>
              </div>

              {/* Price Breakdown */}
              <div className="space-y-3 text-xs tracking-wide">
                <div className="flex items-center justify-between">
                  <span className="text-neutral-600">Subtotal</span>
                  <strong className="font-mono text-neutral-900 text-sm font-semibold">
                    {formatPrice(cartSubtotal)}
                  </strong>
                </div>

                {appliedDiscount > 0 && (
                  <div className="flex items-center justify-between text-green-700">
                    <span>Atelier Privilege Discount</span>
                    <strong className="font-mono font-semibold">
                      -{formatPrice(appliedDiscount)}
                    </strong>
                  </div>
                )}

                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-neutral-600 block">Express Courier</span>
                    <small className="text-[10px] text-neutral-400">
                      {shipping === 0 ? "Unlocked (> $300)" : "Standard Worldwide"}
                    </small>
                  </div>
                  <strong
                    className={`font-mono text-sm ${
                      shipping === 0 ? "text-neutral-900 font-bold" : "text-neutral-700"
                    }`}
                  >
                    {shipping === 0 ? "Complimentary" : formatPrice(shipping)}
                  </strong>
                </div>

                <div className="flex items-center justify-between pt-1">
                  <span className="text-neutral-600">Duties & Import Taxes</span>
                  <span className="text-neutral-500 text-[11px] uppercase tracking-wider font-medium">
                    Included (DDP)
                  </span>
                </div>
              </div>

              {/* Complimentary Signature Gift Packaging Option */}
              <div className="pt-4 border-t border-neutral-200 space-y-2">
                <label className="flex items-start gap-2.5 cursor-pointer text-xs text-neutral-800">
                  <input
                    type="checkbox"
                    checked={giftBox}
                    onChange={(e) => setGiftBox(e.target.checked)}
                    className="mt-0.5 w-4 h-4 accent-black cursor-pointer rounded-xs"
                  />
                  <div>
                    <span className="font-medium block">
                      Noiré Signature Gift Packaging (Complimentary)
                    </span>
                    <span className="text-[10px] text-neutral-500 block">
                      Includes handmade presentation box, ribbon, and personalized card.
                    </span>
                  </div>
                </label>

                {giftBox && (
                  <div className="pt-2 animate-in fade-in duration-200">
                    <textarea
                      placeholder="Write your bespoke gift note for the recipient..."
                      value={giftNote}
                      onChange={(e) => setGiftNote(e.target.value)}
                      maxLength={200}
                      rows={3}
                      className="w-full text-base sm:text-xs p-3 bg-white border border-neutral-300 outline-none resize-none font-sans focus:border-black transition-colors"
                    />
                    <div className="text-right text-[10px] text-neutral-400 mt-1">
                      {giftNote.length} / 200 characters
                    </div>
                  </div>
                )}
              </div>

              {/* Atelier Promo / Gift Voucher Code */}
              <form onSubmit={handleApplyPromo} className="pt-4 border-t border-neutral-200">
                <label
                  htmlFor="promo-input"
                  className="block text-[10px] uppercase font-bold tracking-[2px] text-neutral-500 mb-2"
                >
                  Promo / Gift Voucher Code
                </label>
                <div className="flex gap-2">
                  <input
                    id="promo-input"
                    type="text"
                    placeholder="e.g. NOIRE10"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    className="flex-1 text-base sm:text-xs px-3 py-2 bg-white border border-neutral-300 uppercase font-mono tracking-wider outline-none focus:border-black transition-colors"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-neutral-900 hover:bg-black text-white text-xs uppercase tracking-wider font-semibold cursor-pointer transition-colors"
                  >
                    Apply
                  </button>
                </div>
                {promoMessage && (
                  <p
                    className={`text-[11px] mt-2 font-medium ${
                      promoMessage.type === "success" ? "text-green-700" : "text-red-600"
                    }`}
                  >
                    {promoMessage.text}
                  </p>
                )}
              </form>

              {/* Total Row */}
              <div className="pt-4 border-t-2 border-black flex items-baseline justify-between">
                <div>
                  <span className="text-xs uppercase font-bold tracking-[2px] text-neutral-900 block">
                    Total
                  </span>
                  <span className="text-[10px] text-neutral-400">
                    Including all duties & local sales taxes
                  </span>
                </div>
                <strong className="text-xl sm:text-2xl font-bold font-mono text-neutral-900 tracking-tight">
                  {formatPrice(total)}
                </strong>
              </div>

              {/* Terms Agreement */}
              <label className="flex items-center gap-2 cursor-pointer text-xs text-neutral-600">
                <input
                  type="checkbox"
                  checked={accepted}
                  onChange={(e) => setAccepted(e.target.checked)}
                  className="w-4 h-4 accent-black cursor-pointer rounded-xs"
                />
                <span className="text-[11px]">
                  I agree to the Terms of Service & Privacy Policy
                </span>
              </label>

              {/* Primary Action: Continue to Checkout */}
              <div className="space-y-3 pt-2">
                <button
                  type="button"
                  disabled={cartItems.length === 0 || !accepted}
                  onClick={() => {
                    window.location.hash = "checkout"
                  }}
                  className={`w-full py-4 bg-black text-white text-xs uppercase tracking-[2px] font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md hover:shadow-lg ${
                    cartItems.length === 0 || !accepted
                      ? "opacity-50 cursor-not-allowed"
                      : "hover:bg-neutral-800"
                  }`}
                >
                  <span className="text-white">Proceed to Checkout</span>
                  <span className="text-white text-sm">→</span>
                </button>

                {/* Secondary Action: WhatsApp Concierge Bag Inquiry */}
                {cartItems.length > 0 && (
                  <a
                    href={generateWhatsAppUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3 bg-white hover:bg-neutral-100 text-neutral-900 border border-neutral-300 text-xs uppercase tracking-[1.5px] font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer text-center"
                  >
                    <svg
                      className="w-4 h-4 fill-green-600"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.598 2.669-.699c.969.54 1.772.82 2.791.82 3.181 0 5.767-2.586 5.768-5.766 0-3.18-2.586-5.766-5.768-5.766zm9.969 5.766c0 5.485-4.484 9.969-9.969 9.969-1.748 0-3.385-.453-4.819-1.246l-5.212 1.369 1.393-5.088c-.896-1.492-1.402-3.237-1.402-5.004 0-5.485 4.485-9.969 9.97-9.969 5.485 0 9.969 4.484 9.969 9.969z" />
                    </svg>
                    <span>Inquire Bag via WhatsApp</span>
                  </a>
                )}
              </div>

              {/* Payment Trust & Security Footnote */}
              <div className="pt-4 border-t border-neutral-200 text-center space-y-2">
                <div className="flex items-center justify-center gap-3 text-neutral-400 text-xs">
                  <span className="font-semibold text-neutral-600">VISA</span>
                  <span>•</span>
                  <span className="font-semibold text-neutral-600">MASTERCARD</span>
                  <span>•</span>
                  <span className="font-semibold text-neutral-600">AMEX</span>
                  <span>•</span>
                  <span className="font-semibold text-neutral-600">APPLE PAY</span>
                </div>
                <p className="text-[10px] text-neutral-400 uppercase tracking-wider">
                  256-Bit SSL Encrypted & Protected Checkout
                </p>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </main>
  )
}
