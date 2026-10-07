import { useState, useEffect } from "react"
import CheckoutItem from "@/components/checkout/CheckoutItem"
import { useShop } from "@/context/ShopContext"
import type { CartItemType } from "@/types"

type CheckoutStep = "information" | "shipping" | "payment"

interface OrderDetails {
  orderNumber: string
  orderDate: string
  items: CartItemType[]
  subtotal: number
  shipping: number
  discount: number
  total: number
  customer: {
    email: string
    phone: string
    firstName: string
    lastName: string
    address: string
    suite: string
    city: string
    postalCode: string
    country: string
  }
  courierMethod: string
  paymentMethod: string
}

export default function CheckoutPage() {
  const { cartItems, cartSubtotal, formatPrice, clearCart } = useShop()

  const [step, setStep] = useState<CheckoutStep>("information")
  const [isOrdered, setIsOrdered] = useState(false)
  const [completedOrder, setCompletedOrder] = useState<OrderDetails | null>(null)
  const [showMobileSummary, setShowMobileSummary] = useState(false)

  // Form Fields
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [marketingConsent, setMarketingConsent] = useState(true)
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [address, setAddress] = useState("")
  const [suite, setSuite] = useState("")
  const [city, setCity] = useState("")
  const [postalCode, setPostalCode] = useState("")
  const [country, setCountry] = useState("France")
  const [courierMethod, setCourierMethod] = useState<"express" | "white-glove" | "atelier">(
    "express",
  )

  // Card details
  const [cardNumber, setCardNumber] = useState("")
  const [cardExpiry, setCardExpiry] = useState("")
  const [cardCvc, setCardCvc] = useState("")
  const [cardName, setCardName] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Promo code
  const [promoCode, setPromoCode] = useState("")
  const [appliedDiscount, setAppliedDiscount] = useState(0)
  const [promoMessage, setPromoMessage] = useState<{
    text: string
    type: "success" | "error"
  } | null>(null)

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" })
  }, [step, isOrdered])

  // Courier cost calculation
  const baseShippingCost =
    cartSubtotal >= 300 || cartItems.length === 0 ? 0 : 15

  const courierCost =
    courierMethod === "white-glove"
      ? 45
      : courierMethod === "atelier"
      ? 0
      : baseShippingCost

  const discountedSubtotal = Math.max(0, cartSubtotal - appliedDiscount)
  const total = discountedSubtotal + (cartItems.length > 0 ? courierCost : 0)

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault()
    const clean = promoCode.trim().toUpperCase()
    if (!clean) return

    if (clean === "NOIRE10" || clean === "VIP10") {
      const discount = Math.round(cartSubtotal * 0.1)
      setAppliedDiscount(discount)
      setPromoMessage({
        text: `10% Privilege Code Applied (-${formatPrice(discount)})`,
        type: "success",
      })
    } else if (clean === "FREESHIP") {
      setAppliedDiscount(courierCost)
      setPromoMessage({
        text: "Complimentary Courier Applied",
        type: "success",
      })
    } else {
      setPromoMessage({
        text: "Code not recognized. Please verify your atelier voucher.",
        type: "error",
      })
    }
  }

  const handleInformationSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setStep("shipping")
  }

  const handleShippingSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setStep("payment")
  }

  const handleFinalOrder = (e?: React.FormEvent) => {
    if (e) e.preventDefault()
    setIsSubmitting(true)

    setTimeout(() => {
      const orderNum = `NOIRE-${Math.floor(100000 + Math.random() * 900000)}`
      const orderDate = new Date().toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      })

      const details: OrderDetails = {
        orderNumber: orderNum,
        orderDate,
        items: [...cartItems],
        subtotal: cartSubtotal,
        shipping: courierCost,
        discount: appliedDiscount,
        total,
        customer: {
          email: email || "client@atelier-noire.com",
          phone: phone || "+33 6 12 34 56 78",
          firstName: firstName || "Valued",
          lastName: lastName || "Client",
          address: address || "14 Rue Saint-Honoré",
          suite,
          city: city || "Paris",
          postalCode: postalCode || "75001",
          country,
        },
        courierMethod:
          courierMethod === "white-glove"
            ? "Premium White Glove Delivery & Fitting"
            : courierMethod === "atelier"
            ? "Paris Place Vendôme Atelier Collection"
            : "Worldwide Express Courier (Carbon Neutral)",
        paymentMethod: cardNumber
          ? `Encrypted Card (•••• ${cardNumber.slice(-4) || "4242"})`
          : "Verified Digital Express Pay",
      }

      setCompletedOrder(details)
      setIsOrdered(true)
      setIsSubmitting(false)
      clearCart()
    }, 600)
  }

  // Pre-formatted WhatsApp order message
  const generateWhatsAppOrderUrl = () => {
    const itemsList = cartItems
      .map(
        (item) =>
          `• ${item.name} (${item.size || "M"}, Qty: ${item.quantity || 1}) - ${formatPrice(
            (item.price || 199) * (item.quantity || 1),
          )}`,
      )
      .join("\n")

    const text = encodeURIComponent(
      `Hello Noiré Atelier Concierge, I would like to place an order directly with your Paris team:\n\n${itemsList}\n\nDelivery Destination: ${firstName} ${lastName}, ${city}, ${country}\nTotal Amount: ${formatPrice(
        total,
      )}\n\nCould you please send me the direct invoice / wire payment instructions?`,
    )
    return `https://wa.me/33140205050?text=${text}`
  }

  // =========================================================================
  // VIEW: ORDER CONFIRMATION / POST-CHECKOUT RECEIPT PAGE
  // =========================================================================
  if (isOrdered && completedOrder) {
    return (
      <main className="min-h-screen bg-white text-neutral-900 pb-24 font-sans animate-in fade-in duration-300">
        {/* Header */}
        <header className="border-b border-neutral-200 py-6 px-4 sm:px-8 text-center bg-white sticky top-0 z-30">
          <div className="max-w-[1200px] mx-auto flex items-center justify-between">
            <button
              type="button"
              onClick={() => {
                window.location.hash = "products"
              }}
              className="text-xs uppercase tracking-wider text-neutral-500 hover:text-black transition-colors cursor-pointer"
            >
              ← Return to Collections
            </button>
            <div className="flex flex-col items-center">
              <span className="brand-wordmark-title text-base sm:text-lg">
                NOIRÉ
              </span>
              <span className="brand-wordmark-subtitle text-[7px]">
                PARIS
              </span>
            </div>
            <button
              type="button"
              onClick={() => window.print()}
              className="text-xs uppercase tracking-wider text-neutral-500 hover:text-black transition-colors cursor-pointer hidden sm:block"
            >
              Print Receipt ⎙
            </button>
          </div>
        </header>

        <div className="max-w-3xl mx-auto px-4 sm:px-6 pt-12 space-y-8">
          {/* Confirmation Hero */}
          <div className="text-center space-y-3 pb-8 border-b border-neutral-200">
            <div className="w-16 h-16 rounded-full bg-black text-white flex items-center justify-center mx-auto text-2xl mb-4 shadow-md">
              ✓
            </div>
            <span className="text-[10px] uppercase font-bold tracking-[3px] text-neutral-400 block">
              Order Confirmed
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold uppercase tracking-[2px] text-neutral-900">
              Merci Pour Votre Commande
            </h1>
            <p className="text-xs sm:text-sm text-neutral-600 max-w-lg mx-auto leading-relaxed">
              Your order has been received by our Paris atelier. A confirmation email and private tracking number have been sent to{" "}
              <strong className="text-neutral-900 font-semibold">{completedOrder.customer.email}</strong>.
            </p>

            <div className="inline-flex items-center gap-3 px-4 py-2 bg-neutral-100 border border-neutral-200 text-xs font-mono tracking-widest text-neutral-800 uppercase mt-4">
              <span>Order Reference:</span>
              <strong className="text-black font-bold">
                {completedOrder.orderNumber}
              </strong>
            </div>
          </div>

          {/* Status Timeline Card */}
          <div className="p-6 bg-neutral-50 border border-neutral-200 space-y-4">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold uppercase tracking-wider text-neutral-900">
                Atelier Fulfillment Status
              </span>
              <span className="text-neutral-500 font-mono">
                {completedOrder.orderDate}
              </span>
            </div>

            <div className="relative pt-2">
              <div className="w-full h-1 bg-neutral-200 rounded-full overflow-hidden mb-3">
                <div className="w-1/3 h-full bg-black" />
              </div>
              <div className="grid grid-cols-3 text-center text-[10px] sm:text-[11px] uppercase tracking-wider">
                <div className="font-bold text-black">1. Order Logged</div>
                <div className="text-neutral-500">2. Atelier Inspection</div>
                <div className="text-neutral-400">3. Express Dispatch</div>
              </div>
            </div>

            <p className="text-xs text-neutral-600 pt-2 border-t border-neutral-200/80">
              ✦ Estimated Delivery: <strong>3 – 4 Business Days</strong> via {completedOrder.courierMethod}.
            </p>
          </div>

          {/* Itemized Order Summary */}
          <div className="p-6 bg-white border border-neutral-200 space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-[2px] text-neutral-900 pb-3 border-b border-neutral-200">
              Ordered Garments ({completedOrder.items.length})
            </h3>

            <div className="divide-y divide-neutral-100">
              {completedOrder.items.map((item, idx) => (
                <div
                  key={`${item.id}-${idx}`}
                  className="py-3 flex items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-16 bg-neutral-100 border border-neutral-200 overflow-hidden flex-shrink-0">
                      <img
                        src={
                          item.image.startsWith("http") || item.image.startsWith("/")
                            ? item.image
                            : `/assets/${item.image}`
                        }
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="text-xs font-semibold text-neutral-900">
                        {item.name}
                      </h4>
                      <p className="text-[10px] text-neutral-500 uppercase mt-0.5">
                        Size: {item.size || "M"} • Qty: {item.quantity || 1}
                      </p>
                    </div>
                  </div>
                  <strong className="text-xs font-mono font-bold text-neutral-900">
                    {formatPrice((item.price || 199) * (item.quantity || 1))}
                  </strong>
                </div>
              ))}
            </div>

            {/* Price Totals */}
            <div className="pt-4 border-t border-neutral-200 space-y-2 text-xs">
              <div className="flex justify-between text-neutral-600">
                <span>Subtotal</span>
                <span className="font-mono">{formatPrice(completedOrder.subtotal)}</span>
              </div>
              {completedOrder.discount > 0 && (
                <div className="flex justify-between text-green-700">
                  <span>Atelier Privilege Applied</span>
                  <span className="font-mono">-{formatPrice(completedOrder.discount)}</span>
                </div>
              )}
              <div className="flex justify-between text-neutral-600">
                <span>Courier Service</span>
                <span className="font-mono">
                  {completedOrder.shipping === 0
                    ? "Complimentary"
                    : formatPrice(completedOrder.shipping)}
                </span>
              </div>
              <div className="flex justify-between text-neutral-600">
                <span>Duties & Taxes</span>
                <span className="text-[11px] uppercase">Included</span>
              </div>
              <div className="flex justify-between text-sm font-bold text-neutral-900 pt-3 border-t border-neutral-200">
                <span>Total Paid</span>
                <span className="font-mono">{formatPrice(completedOrder.total)}</span>
              </div>
            </div>
          </div>

          {/* Shipping & Payment Destination Card */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-5 bg-neutral-50 border border-neutral-200 text-xs space-y-1.5">
              <span className="text-[10px] uppercase font-bold tracking-[2px] text-neutral-400 block mb-2">
                Delivery Destination
              </span>
              <p className="font-semibold text-neutral-900">
                {completedOrder.customer.firstName} {completedOrder.customer.lastName}
              </p>
              <p className="text-neutral-600">{completedOrder.customer.address}</p>
              {completedOrder.customer.suite && (
                <p className="text-neutral-600">{completedOrder.customer.suite}</p>
              )}
              <p className="text-neutral-600">
                {completedOrder.customer.city}, {completedOrder.customer.postalCode}
              </p>
              <p className="text-neutral-600 font-medium">{completedOrder.customer.country}</p>
              <p className="text-neutral-500 pt-1">{completedOrder.customer.phone}</p>
            </div>

            <div className="p-5 bg-neutral-50 border border-neutral-200 text-xs space-y-1.5">
              <span className="text-[10px] uppercase font-bold tracking-[2px] text-neutral-400 block mb-2">
                Payment & Courier
              </span>
              <p className="font-medium text-neutral-900">
                Payment: <span className="font-normal text-neutral-700">{completedOrder.paymentMethod}</span>
              </p>
              <p className="font-medium text-neutral-900">
                Method: <span className="font-normal text-neutral-700">{completedOrder.courierMethod}</span>
              </p>
              <p className="text-[11px] text-neutral-500 pt-2 leading-relaxed">
                All garments will arrive packaged in the Noiré signature rigid box, wrapped in archival tissue paper with ribbon.
              </p>
            </div>
          </div>

          {/* Post-Checkout Concierge Actions */}
          <div className="flex flex-col sm:flex-row items-center gap-4 pt-4">
            <a
              href={`https://wa.me/33140205050?text=${encodeURIComponent(
                `Hello Noiré Atelier Concierge, I am inquiring about my order ${completedOrder.orderNumber}. Could you provide me with priority dispatch updates?`,
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:flex-1 py-4 bg-black text-white hover:bg-neutral-800 text-xs uppercase tracking-[2px] font-semibold text-center transition-all cursor-pointer shadow-md hover:shadow-lg flex items-center justify-center gap-2"
            >
              <svg className="w-4 h-4 fill-green-500" viewBox="0 0 24 24">
                <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.598 2.669-.699c.969.54 1.772.82 2.791.82 3.181 0 5.767-2.586 5.768-5.766 0-3.18-2.586-5.766-5.768-5.766zm9.969 5.766c0 5.485-4.484 9.969-9.969 9.969-1.748 0-3.385-.453-4.819-1.246l-5.212 1.369 1.393-5.088c-.896-1.492-1.402-3.237-1.402-5.004 0-5.485 4.485-9.969 9.97-9.969 5.485 0 9.969 4.484 9.969 9.969z" />
              </svg>
              <span>Track via WhatsApp Concierge</span>
            </a>

            <button
              type="button"
              onClick={() => {
                setIsOrdered(false)
                setCompletedOrder(null)
                window.location.hash = "products"
              }}
              className="w-full sm:flex-1 py-4 bg-white text-black border border-neutral-300 hover:bg-neutral-100 text-xs uppercase tracking-[2px] font-semibold text-center transition-all cursor-pointer"
            >
              Discover More Pieces
            </button>
          </div>
        </div>
      </main>
    )
  }

  // =========================================================================
  // VIEW: CHECKOUT FORM FLOW (Information -> Shipping -> Payment)
  // =========================================================================
  return (
    <main className="min-h-screen bg-white text-neutral-900 pb-24 font-sans">
      {/* Top Atelier Bar */}
      <header className="border-b border-neutral-200 py-5 px-4 sm:px-8 bg-white sticky top-0 z-30">
        <div className="max-w-[1360px] mx-auto flex items-center justify-between">
          <button
            type="button"
            onClick={() => {
              window.location.hash = "cart"
            }}
            className="inline-flex items-center gap-2 text-xs uppercase tracking-wider text-neutral-600 hover:text-black transition-colors cursor-pointer"
          >
            <span>←</span> Return to Shopping Bag
          </button>

          <div
            onClick={() => {
              window.location.hash = "home"
            }}
            className="flex flex-col items-center cursor-pointer transition-opacity hover:opacity-75"
          >
            <span className="brand-wordmark-title text-base sm:text-lg">
              NOIRÉ
            </span>
            <span className="brand-wordmark-subtitle text-[7px]">
              PARIS
            </span>
          </div>

          <div className="flex items-center gap-1.5 text-[11px] text-neutral-500 uppercase tracking-wider">
            <svg
              className="w-3.5 h-3.5 text-neutral-700"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
            <span className="hidden sm:inline">Secure Atelier Checkout</span>
          </div>
        </div>
      </header>

      {/* Mobile Collapsible Order Summary Accordion */}
      <div className="lg:hidden border-b border-neutral-200 bg-neutral-50 px-4 py-3.5">
        <button
          type="button"
          onClick={() => setShowMobileSummary(!showMobileSummary)}
          className="w-full flex items-center justify-between text-xs cursor-pointer font-medium"
        >
          <span className="flex items-center gap-2 text-neutral-700">
            <span>{showMobileSummary ? "Hide" : "Show"} Order Summary</span>
            <span className="text-[10px] text-neutral-400">({cartItems.length} items)</span>
            <span>{showMobileSummary ? "▲" : "▼"}</span>
          </span>
          <strong className="font-mono text-sm font-bold text-neutral-900">
            {formatPrice(total)}
          </strong>
        </button>

        {showMobileSummary && (
          <div className="pt-4 mt-3 border-t border-neutral-200 space-y-4 animate-in fade-in duration-200">
            <div className="max-h-60 overflow-y-auto space-y-2 pr-1">
              {cartItems.map((item, idx) => (
                <CheckoutItem key={`${item.id}-${idx}`} item={item} />
              ))}
            </div>

            <div className="pt-3 border-t border-neutral-200 space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-neutral-600">Subtotal</span>
                <span className="font-mono">{formatPrice(cartSubtotal)}</span>
              </div>
              {appliedDiscount > 0 && (
                <div className="flex justify-between text-green-700">
                  <span>Discount</span>
                  <span className="font-mono">-{formatPrice(appliedDiscount)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-neutral-600">Courier</span>
                <span className="font-mono">
                  {courierCost === 0 ? "Complimentary" : formatPrice(courierCost)}
                </span>
              </div>
              <div className="flex justify-between pt-2 border-t border-neutral-200 font-bold text-sm">
                <span>Total</span>
                <span className="font-mono">{formatPrice(total)}</span>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="max-w-[1360px] mx-auto px-4 sm:px-8 pt-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-start">
          {/* Left Column: Checkout Steps & Forms */}
          <div className="lg:col-span-7 xl:col-span-8 space-y-8">
            {/* Step Breadcrumb Bar */}
            <nav className="flex items-center gap-3 sm:gap-6 text-xs uppercase tracking-wider border-b border-neutral-200 pb-4">
              <button
                type="button"
                onClick={() => setStep("information")}
                className={`transition-colors cursor-pointer pb-1 ${
                  step === "information"
                    ? "font-bold text-black border-b-2 border-black"
                    : "text-neutral-400 hover:text-black"
                }`}
              >
                01. Details
              </button>
              <span className="text-neutral-300">/</span>
              <button
                type="button"
                onClick={() => setStep("shipping")}
                className={`transition-colors cursor-pointer pb-1 ${
                  step === "shipping"
                    ? "font-bold text-black border-b-2 border-black"
                    : "text-neutral-400 hover:text-black"
                }`}
              >
                02. Shipping
              </button>
              <span className="text-neutral-300">/</span>
              <button
                type="button"
                onClick={() => setStep("payment")}
                className={`transition-colors cursor-pointer pb-1 ${
                  step === "payment"
                    ? "font-bold text-black border-b-2 border-black"
                    : "text-neutral-400 hover:text-black"
                }`}
              >
                03. Payment
              </button>
            </nav>

            {/* Quick Express Luxury Checkout Bar */}
            {step === "information" && (
              <div className="p-5 bg-neutral-50 border border-neutral-200 space-y-3">
                <span className="text-[10px] uppercase font-bold tracking-[2px] text-neutral-400 block text-center">
                  Express Luxury Checkout
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {/* Apple Pay / Card Quick Authorize */}
                  <button
                    type="button"
                    onClick={() => handleFinalOrder()}
                    className="py-3.5 bg-black text-white hover:bg-neutral-800 text-xs font-semibold tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer shadow-xs hover:shadow-md"
                  >
                    <svg
                      className="w-3.5 h-3.5 fill-current text-white inline-block -mt-0.5"
                      viewBox="0 0 170 170"
                    >
                      <path d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.19-2.12-9.97-3.17-14.34-3.17-4.58 0-9.49 1.05-14.75 3.17-5.26 2.13-9.5 3.24-12.74 3.35-4.35.13-9.16-1.9-14.42-6.08-3.69-3.04-7.67-7.81-11.96-14.32-5.74-8.71-10.28-18.7-13.62-29.98-3.34-11.27-5.01-22.19-5.01-32.74 0-14.37 3.53-26.47 10.59-36.29 7.07-9.82 16.14-14.86 27.22-15.14 4.8 0 10.15 1.25 16.06 3.75 5.91 2.5 9.77 3.86 11.58 4.08 2.02-.33 6.13-1.8 12.33-4.42 6.2-2.61 11.64-3.79 16.32-3.53 12.56.65 22.84 5.34 30.84 14.07-10.99 6.64-16.37 15.77-16.14 27.38.22 9.04 3.75 16.65 10.59 22.84 6.84 6.19 14.99 9.69 24.44 10.49-1.96 5.88-4.4 11.87-7.33 17.97zM119.22 33.15c0-7.39 2.67-14.4 8.01-21.03 5.34-6.64 12.01-10.99 20.02-13.06.33 1.09.49 2.18.49 3.26 0 7.39-2.83 14.51-8.5 21.36-5.67 6.85-12.56 11.09-20.67 12.72-.44-1.08-.66-2.16-.66-3.25z" />
                    </svg>
                    <span>Express Apple Pay</span>
                  </button>

                  {/* WhatsApp Quick Concierge Order */}
                  <a
                    href={generateWhatsAppOrderUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-3.5 bg-white text-neutral-900 hover:bg-neutral-100 border border-neutral-300 text-xs font-semibold tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer shadow-xs hover:shadow-md"
                  >
                    <svg className="w-4 h-4 fill-green-600" viewBox="0 0 24 24">
                      <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.598 2.669-.699c.969.54 1.772.82 2.791.82 3.181 0 5.767-2.586 5.768-5.766 0-3.18-2.586-5.766-5.768-5.766zm9.969 5.766c0 5.485-4.484 9.969-9.969 9.969-1.748 0-3.385-.453-4.819-1.246l-5.212 1.369 1.393-5.088c-.896-1.492-1.402-3.237-1.402-5.004 0-5.485 4.485-9.969 9.97-9.969 5.485 0 9.969 4.484 9.969 9.969z" />
                    </svg>
                    <span>Order via WhatsApp</span>
                  </a>
                </div>

                <div className="flex items-center gap-3 pt-2">
                  <div className="flex-1 h-px bg-neutral-200" />
                  <span className="text-[10px] uppercase font-bold tracking-widest text-neutral-400">
                    Or Enter Atelier Shipping Details
                  </span>
                  <div className="flex-1 h-px bg-neutral-200" />
                </div>
              </div>
            )}

            {/* STEP 1: INFORMATION */}
            {step === "information" && (
              <form onSubmit={handleInformationSubmit} className="space-y-8">
                {/* Contact Info */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h2 className="text-sm font-bold uppercase tracking-[2px] text-neutral-900">
                      Contact Information
                    </h2>
                    <span className="text-xs text-neutral-500">
                      Required for tracking
                    </span>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <label
                        htmlFor="email-field"
                        className="block text-[11px] uppercase tracking-wider text-neutral-500 mb-1"
                      >
                        Email Address for Order Confirmation *
                      </label>
                      <input
                        id="email-field"
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="client@domain.com"
                        className="w-full text-base sm:text-xs h-11 px-4 bg-white border border-neutral-300 outline-none focus:border-black transition-colors"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="phone-field"
                        className="block text-[11px] uppercase tracking-wider text-neutral-500 mb-1"
                      >
                        Mobile Phone for Courier SMS Updates
                      </label>
                      <input
                        id="phone-field"
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+33 6 12 34 56 78"
                        className="w-full text-base sm:text-xs h-11 px-4 bg-white border border-neutral-300 outline-none focus:border-black transition-colors"
                      />
                    </div>

                    <label className="flex items-center gap-2 cursor-pointer text-xs text-neutral-600 pt-1">
                      <input
                        type="checkbox"
                        checked={marketingConsent}
                        onChange={(e) => setMarketingConsent(e.target.checked)}
                        className="w-4 h-4 accent-black cursor-pointer rounded-xs"
                      />
                      <span className="text-[11px]">
                        Notify me of discreet seasonal archives & private atelier salons
                      </span>
                    </label>
                  </div>
                </div>

                {/* Delivery Address */}
                <div className="space-y-4 pt-6 border-t border-neutral-200">
                  <h2 className="text-sm font-bold uppercase tracking-[2px] text-neutral-900">
                    Delivery Address
                  </h2>

                  <div className="space-y-3">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label
                          htmlFor="first-name"
                          className="block text-[11px] uppercase tracking-wider text-neutral-500 mb-1"
                        >
                          First Name *
                        </label>
                        <input
                          id="first-name"
                          required
                          value={firstName}
                          onChange={(e) => setFirstName(e.target.value)}
                          placeholder="First Name"
                          className="w-full text-base sm:text-xs h-11 px-4 bg-white border border-neutral-300 outline-none focus:border-black transition-colors"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="last-name"
                          className="block text-[11px] uppercase tracking-wider text-neutral-500 mb-1"
                        >
                          Last Name *
                        </label>
                        <input
                          id="last-name"
                          required
                          value={lastName}
                          onChange={(e) => setLastName(e.target.value)}
                          placeholder="Last Name"
                          className="w-full text-base sm:text-xs h-11 px-4 bg-white border border-neutral-300 outline-none focus:border-black transition-colors"
                        />
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="country-select"
                        className="block text-[11px] uppercase tracking-wider text-neutral-500 mb-1"
                      >
                        Country / Territory *
                      </label>
                      <select
                        id="country-select"
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                        className="w-full text-base sm:text-xs h-11 px-4 bg-white border border-neutral-300 outline-none focus:border-black transition-colors cursor-pointer"
                      >
                        <option value="France">France</option>
                        <option value="Sweden">Sweden</option>
                        <option value="United Kingdom">United Kingdom</option>
                        <option value="United States">United States</option>
                        <option value="Germany">Germany</option>
                        <option value="Switzerland">Switzerland</option>
                        <option value="Italy">Italy</option>
                        <option value="Japan">Japan</option>
                        <option value="United Arab Emirates">United Arab Emirates</option>
                        <option value="Canada">Canada</option>
                      </select>
                    </div>

                    <div>
                      <label
                        htmlFor="address-field"
                        className="block text-[11px] uppercase tracking-wider text-neutral-500 mb-1"
                      >
                        Street Address *
                      </label>
                      <input
                        id="address-field"
                        required
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        placeholder="House Number and Street Name"
                        className="w-full text-base sm:text-xs h-11 px-4 bg-white border border-neutral-300 outline-none focus:border-black transition-colors"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="suite-field"
                        className="block text-[11px] uppercase tracking-wider text-neutral-500 mb-1"
                      >
                        Apartment, Suite, Unit (Optional)
                      </label>
                      <input
                        id="suite-field"
                        value={suite}
                        onChange={(e) => setSuite(e.target.value)}
                        placeholder="Apartment, Studio, Floor"
                        className="w-full text-base sm:text-xs h-11 px-4 bg-white border border-neutral-300 outline-none focus:border-black transition-colors"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label
                          htmlFor="city-field"
                          className="block text-[11px] uppercase tracking-wider text-neutral-500 mb-1"
                        >
                          City *
                        </label>
                        <input
                          id="city-field"
                          required
                          value={city}
                          onChange={(e) => setCity(e.target.value)}
                          placeholder="City"
                          className="w-full text-base sm:text-xs h-11 px-4 bg-white border border-neutral-300 outline-none focus:border-black transition-colors"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="postal-field"
                          className="block text-[11px] uppercase tracking-wider text-neutral-500 mb-1"
                        >
                          Postal Code *
                        </label>
                        <input
                          id="postal-field"
                          required
                          value={postalCode}
                          onChange={(e) => setPostalCode(e.target.value)}
                          placeholder="Postal Code"
                          className="w-full text-base sm:text-xs h-11 px-4 bg-white border border-neutral-300 outline-none focus:border-black transition-colors"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-6 border-t border-neutral-200">
                  <button
                    type="button"
                    onClick={() => {
                      window.location.hash = "cart"
                    }}
                    className="text-xs uppercase tracking-wider underline hover:text-black text-neutral-500 cursor-pointer"
                  >
                    ← Back to Shopping Bag
                  </button>

                  <button
                    type="submit"
                    className="px-8 py-3.5 bg-black text-white hover:bg-neutral-800 text-xs uppercase tracking-[2px] font-semibold transition-all cursor-pointer shadow-md hover:shadow-lg flex items-center gap-2"
                  >
                    <span>Continue to Shipping</span>
                    <span>→</span>
                  </button>
                </div>
              </form>
            )}

            {/* STEP 2: SHIPPING / COURIER METHOD */}
            {step === "shipping" && (
              <form onSubmit={handleShippingSubmit} className="space-y-6">
                {/* Summary of Step 1 */}
                <div className="p-4 bg-neutral-50 border border-neutral-200 text-xs space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-neutral-500">Contact:</span>
                    <span className="font-medium text-neutral-900 truncate max-w-xs">
                      {email || "client@domain.com"}
                    </span>
                    <button
                      type="button"
                      onClick={() => setStep("information")}
                      className="text-neutral-500 hover:text-black underline uppercase text-[10px] cursor-pointer"
                    >
                      Change
                    </button>
                  </div>
                  <div className="flex items-center justify-between pt-2 border-t border-neutral-200/80">
                    <span className="text-neutral-500">Ship To:</span>
                    <span className="font-medium text-neutral-900 truncate max-w-xs">
                      {address || "14 Rue Saint-Honoré"}, {city || "Paris"}, {country}
                    </span>
                    <button
                      type="button"
                      onClick={() => setStep("information")}
                      className="text-neutral-500 hover:text-black underline uppercase text-[10px] cursor-pointer"
                    >
                      Change
                    </button>
                  </div>
                </div>

                <h2 className="text-sm font-bold uppercase tracking-[2px] text-neutral-900 pt-2">
                  Select Courier Method
                </h2>

                <div className="space-y-3">
                  {/* Option 1: Express Worldwide */}
                  <label
                    className={`flex items-center justify-between p-4 border transition-all cursor-pointer ${
                      courierMethod === "express"
                        ? "border-black bg-neutral-50/80 shadow-xs"
                        : "border-neutral-200 hover:border-neutral-400 bg-white"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="courier"
                        checked={courierMethod === "express"}
                        onChange={() => setCourierMethod("express")}
                        className="w-4 h-4 accent-black cursor-pointer"
                      />
                      <div>
                        <strong className="text-xs uppercase tracking-wider block text-neutral-900">
                          Worldwide Express Courier
                        </strong>
                        <span className="text-[11px] text-neutral-500">
                          2–3 Business Days • Carbon Neutral Air Freight • Fully Insured
                        </span>
                      </div>
                    </div>
                    <strong className="text-xs font-mono font-bold text-neutral-900">
                      {baseShippingCost === 0
                        ? "Complimentary"
                        : formatPrice(baseShippingCost)}
                    </strong>
                  </label>

                  {/* Option 2: White Glove */}
                  <label
                    className={`flex items-center justify-between p-4 border transition-all cursor-pointer ${
                      courierMethod === "white-glove"
                        ? "border-black bg-neutral-50/80 shadow-xs"
                        : "border-neutral-200 hover:border-neutral-400 bg-white"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="courier"
                        checked={courierMethod === "white-glove"}
                        onChange={() => setCourierMethod("white-glove")}
                        className="w-4 h-4 accent-black cursor-pointer"
                      />
                      <div>
                        <strong className="text-xs uppercase tracking-wider block text-neutral-900">
                          Premium White Glove Delivery & Private Fitting
                        </strong>
                        <span className="text-[11px] text-neutral-500">
                          Scheduled in-person delivery with personal garment inspection
                        </span>
                      </div>
                    </div>
                    <strong className="text-xs font-mono font-bold text-neutral-900">
                      {formatPrice(45)}
                    </strong>
                  </label>

                  {/* Option 3: Atelier Collection */}
                  <label
                    className={`flex items-center justify-between p-4 border transition-all cursor-pointer ${
                      courierMethod === "atelier"
                        ? "border-black bg-neutral-50/80 shadow-xs"
                        : "border-neutral-200 hover:border-neutral-400 bg-white"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="courier"
                        checked={courierMethod === "atelier"}
                        onChange={() => setCourierMethod("atelier")}
                        className="w-4 h-4 accent-black cursor-pointer"
                      />
                      <div>
                        <strong className="text-xs uppercase tracking-wider block text-neutral-900">
                          Paris Place Vendôme Atelier Collection
                        </strong>
                        <span className="text-[11px] text-neutral-500">
                          Ready within 24 hours at our Place Vendôme showroom
                        </span>
                      </div>
                    </div>
                    <strong className="text-xs font-mono font-bold text-neutral-900">
                      Complimentary
                    </strong>
                  </label>
                </div>

                <div className="flex items-center justify-between pt-6 border-t border-neutral-200">
                  <button
                    type="button"
                    onClick={() => setStep("information")}
                    className="text-xs uppercase tracking-wider underline hover:text-black text-neutral-500 cursor-pointer"
                  >
                    ← Back to Details
                  </button>

                  <button
                    type="submit"
                    className="px-8 py-3.5 bg-black text-white hover:bg-neutral-800 text-xs uppercase tracking-[2px] font-semibold transition-all cursor-pointer shadow-md hover:shadow-lg flex items-center gap-2"
                  >
                    <span>Proceed to Payment</span>
                    <span>→</span>
                  </button>
                </div>
              </form>
            )}

            {/* STEP 3: PAYMENT */}
            {step === "payment" && (
              <form onSubmit={handleFinalOrder} className="space-y-6">
                {/* Summary of Step 1 & 2 */}
                <div className="p-4 bg-neutral-50 border border-neutral-200 text-xs space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-neutral-500">Contact:</span>
                    <span className="font-medium text-neutral-900 truncate max-w-xs">
                      {email || "client@domain.com"}
                    </span>
                    <button
                      type="button"
                      onClick={() => setStep("information")}
                      className="text-neutral-500 hover:text-black underline uppercase text-[10px] cursor-pointer"
                    >
                      Change
                    </button>
                  </div>
                  <div className="flex items-center justify-between pt-2 border-t border-neutral-200/80">
                    <span className="text-neutral-500">Ship To:</span>
                    <span className="font-medium text-neutral-900 truncate max-w-xs">
                      {address || "14 Rue Saint-Honoré"}, {city || "Paris"}
                    </span>
                    <button
                      type="button"
                      onClick={() => setStep("information")}
                      className="text-neutral-500 hover:text-black underline uppercase text-[10px] cursor-pointer"
                    >
                      Change
                    </button>
                  </div>
                  <div className="flex items-center justify-between pt-2 border-t border-neutral-200/80">
                    <span className="text-neutral-500">Method:</span>
                    <span className="font-medium text-neutral-900">
                      {courierMethod === "white-glove"
                        ? "White Glove Delivery ($45)"
                        : courierMethod === "atelier"
                        ? "Paris Atelier Collection (Free)"
                        : "Express Worldwide Courier"}
                    </span>
                    <button
                      type="button"
                      onClick={() => setStep("shipping")}
                      className="text-neutral-500 hover:text-black underline uppercase text-[10px] cursor-pointer"
                    >
                      Change
                    </button>
                  </div>
                </div>

                <div className="space-y-4 pt-2">
                  <div className="flex items-center justify-between">
                    <h2 className="text-sm font-bold uppercase tracking-[2px] text-neutral-900">
                      Payment Method
                    </h2>
                    <span className="text-[11px] text-neutral-400">
                      256-Bit Encrypted
                    </span>
                  </div>

                  {/* Card Entry Fields */}
                  <div className="p-5 border border-neutral-300 bg-white space-y-4">
                    <div className="flex items-center justify-between pb-3 border-b border-neutral-100">
                      <span className="text-xs font-semibold uppercase tracking-wider text-neutral-900">
                        Credit or Debit Card
                      </span>
                      <div className="flex items-center gap-2 text-xs font-semibold text-neutral-400">
                        <span>VISA</span>
                        <span>•</span>
                        <span>MASTERCARD</span>
                        <span>•</span>
                        <span>AMEX</span>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div>
                        <label
                          htmlFor="card-num"
                          className="block text-[11px] uppercase tracking-wider text-neutral-500 mb-1"
                        >
                          Card Number *
                        </label>
                        <input
                          id="card-num"
                          required
                          value={cardNumber}
                          onChange={(e) => setCardNumber(e.target.value)}
                          placeholder="•••• •••• •••• ••••"
                          maxLength={19}
                          className="w-full text-base sm:text-xs h-11 px-4 bg-white border border-neutral-300 outline-none focus:border-black font-mono tracking-wider transition-colors"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label
                            htmlFor="card-exp"
                            className="block text-[11px] uppercase tracking-wider text-neutral-500 mb-1"
                          >
                            Expiration Date *
                          </label>
                          <input
                            id="card-exp"
                            required
                            value={cardExpiry}
                            onChange={(e) => setCardExpiry(e.target.value)}
                            placeholder="MM / YY"
                            maxLength={5}
                            className="w-full text-base sm:text-xs h-11 px-4 bg-white border border-neutral-300 outline-none focus:border-black font-mono tracking-wider transition-colors"
                          />
                        </div>
                        <div>
                          <label
                            htmlFor="card-cvc"
                            className="block text-[11px] uppercase tracking-wider text-neutral-500 mb-1"
                          >
                            Security Code (CVC) *
                          </label>
                          <input
                            id="card-cvc"
                            required
                            value={cardCvc}
                            onChange={(e) => setCardCvc(e.target.value)}
                            placeholder="CVC"
                            maxLength={4}
                            className="w-full text-base sm:text-xs h-11 px-4 bg-white border border-neutral-300 outline-none focus:border-black font-mono tracking-wider transition-colors"
                          />
                        </div>
                      </div>

                      <div>
                        <label
                          htmlFor="card-name"
                          className="block text-[11px] uppercase tracking-wider text-neutral-500 mb-1"
                        >
                          Name on Card *
                        </label>
                        <input
                          id="card-name"
                          required
                          value={cardName}
                          onChange={(e) => setCardName(e.target.value)}
                          placeholder="Full Name on Card"
                          className="w-full text-base sm:text-xs h-11 px-4 bg-white border border-neutral-300 outline-none focus:border-black uppercase tracking-wider transition-colors"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Alternative: Order on WhatsApp */}
                  <div className="p-4 bg-neutral-50 border border-neutral-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
                    <div>
                      <strong className="block font-bold text-neutral-900">
                        Prefer to Order Directly with our Paris Atelier?
                      </strong>
                      <span className="text-neutral-500 text-[11px]">
                        Order via WhatsApp for private wire, boutique invoice, or personal fitting.
                      </span>
                    </div>
                    <a
                      href={generateWhatsAppOrderUrl()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 bg-white hover:bg-neutral-100 text-neutral-900 border border-neutral-300 font-semibold text-[11px] uppercase tracking-wider transition-colors flex-shrink-0"
                    >
                      Inquire via WhatsApp
                    </a>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-6 border-t border-neutral-200">
                  <button
                    type="button"
                    onClick={() => setStep("shipping")}
                    className="text-xs uppercase tracking-wider underline hover:text-black text-neutral-500 cursor-pointer"
                  >
                    ← Back to Shipping
                  </button>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-8 py-4 bg-black text-white hover:bg-neutral-800 text-xs uppercase tracking-[2px] font-semibold transition-all cursor-pointer shadow-md hover:shadow-lg flex items-center gap-2"
                  >
                    {isSubmitting ? (
                      <span>Authorizing Payment...</span>
                    ) : (
                      <>
                        <span>Authorize & Place Order • {formatPrice(total)}</span>
                        <span>✓</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* Right Column: Sticky Live Order Summary (Desktop) */}
          <div className="hidden lg:block lg:col-span-5 xl:col-span-4">
            <aside className="sticky top-28 bg-neutral-50 border border-neutral-200 p-6 sm:p-8 space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-neutral-200">
                <h3 className="text-sm font-bold uppercase tracking-[2px] text-neutral-900">
                  Your Order
                </h3>
                <span className="text-xs text-neutral-500 font-mono">
                  {cartItems.length} {cartItems.length === 1 ? "Item" : "Items"}
                </span>
              </div>

              {/* Garment List */}
              <div className="max-h-72 overflow-y-auto divide-y divide-neutral-100 pr-1">
                {cartItems.length === 0 ? (
                  <p className="text-xs text-neutral-400 py-6 text-center">
                    No items in bag
                  </p>
                ) : (
                  cartItems.map((item, idx) => (
                    <CheckoutItem key={`${item.id}-${idx}`} item={item} />
                  ))
                )}
              </div>

              {/* Promo Code Input */}
              <form onSubmit={handleApplyPromo} className="pt-4 border-t border-neutral-200">
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Gift or Promo Code"
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

              {/* Totals Breakdown */}
              <div className="pt-4 border-t border-neutral-200 space-y-2.5 text-xs">
                <div className="flex justify-between text-neutral-600">
                  <span>Subtotal</span>
                  <span className="font-mono font-semibold text-neutral-900">
                    {formatPrice(cartSubtotal)}
                  </span>
                </div>

                {appliedDiscount > 0 && (
                  <div className="flex justify-between text-green-700 font-medium">
                    <span>Atelier Privilege Applied</span>
                    <span className="font-mono">-{formatPrice(appliedDiscount)}</span>
                  </div>
                )}

                <div className="flex justify-between text-neutral-600">
                  <span>Courier Delivery</span>
                  <span className="font-mono font-semibold text-neutral-900">
                    {courierCost === 0 ? "Complimentary" : formatPrice(courierCost)}
                  </span>
                </div>

                <div className="flex justify-between text-neutral-600">
                  <span>Duties & Import Taxes</span>
                  <span className="text-[11px] uppercase text-neutral-500 font-medium">
                    Included (DDP)
                  </span>
                </div>

                <div className="pt-3 border-t-2 border-black flex items-baseline justify-between text-neutral-900">
                  <div>
                    <strong className="text-xs uppercase tracking-[2px] block">
                      Total
                    </strong>
                    <span className="text-[10px] text-neutral-400">
                      All taxes included
                    </span>
                  </div>
                  <strong className="text-xl font-bold font-mono tracking-tight">
                    {formatPrice(total)}
                  </strong>
                </div>
              </div>

              {/* Concierge Assistance Link */}
              <div className="pt-4 border-t border-neutral-200 text-center">
                <a
                  href="https://wa.me/33140205050?text=Hello%20Noire%20Concierge%2C%20I%20have%20a%20question%20regarding%20my%20checkout"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-neutral-500 hover:text-black underline uppercase tracking-wider inline-flex items-center gap-1.5"
                >
                  <span>Need assistance? Chat with Noiré Concierge</span>
                </a>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </main>
  )
}
