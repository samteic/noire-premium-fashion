import { useState, useEffect } from "react"
import { useShop } from "@/context/ShopContext"
import { ASSETS_PATH } from "@/data/products"
import CurrencyDropdown from "@/components/navigation/CurrencyDropdown"
import AnnouncementTicker from "@/components/layout/AnnouncementTicker"

interface NavbarProps {
  page?: "home" | "products" | "detail" | "cart"
}

export default function Navbar({ page = "home" }: NavbarProps) {
  const {
    cartCount,
    wishlistCount,
    currency,
    setIsMenuOpen,
    setIsCartOpen,
    setIsWishlistOpen,
    setIsSearchOpen,
  } = useShop()

  const [currencyDropdownOpen, setCurrencyDropdownOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 15)
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const isDetailPage = page === "detail"
  const isCartPage = page === "cart"

  return (
    <div className="sticky top-0 z-40 w-full">
      <AnnouncementTicker />
      <header
        className={`site-header relative w-full h-16 sm:h-[72px] lg:h-[80px] flex items-center justify-between px-3.5 sm:px-6 lg:px-10 transition-all duration-300 ${
          scrolled
            ? "bg-white/95 backdrop-blur-md shadow-[0_4px_20px_-4px_rgba(0,0,0,0.06)] border-b border-neutral-100"
            : "bg-white/90 backdrop-blur-sm border-b border-neutral-100"
        }`}
      >
        {/* Left Zone: Back button (on detail/cart) OR Hamburger + Desktop Nav (on home/products) */}
        <div className="header-left flex items-center min-w-0 flex-1 z-30">
          {isDetailPage ? (
            <button
              type="button"
              className="header-back-button group flex items-center gap-2 cursor-pointer py-1.5 px-2 hover:bg-neutral-100 rounded-sm transition-all"
              onClick={() => {
                window.scrollTo({ top: 0, left: 0, behavior: "instant" })
                window.location.hash = "products"
              }}
              aria-label="Back to collection"
            >
              <span className="transition-transform duration-200 group-hover:-translate-x-1 font-bold text-sm">
                ←
              </span>
              <span className="hidden sm:inline text-xs font-semibold tracking-[1.5px] uppercase">
                Back to Collection
              </span>
              <span className="inline sm:hidden text-xs font-semibold tracking-[1.5px] uppercase">
                Back
              </span>
            </button>
          ) : isCartPage ? (
            <button
              type="button"
              className="header-back-button group flex items-center gap-2 cursor-pointer py-1.5 px-2 hover:bg-neutral-100 rounded-sm transition-all"
              onClick={() => {
                window.scrollTo({ top: 0, left: 0, behavior: "instant" })
                window.location.hash = "products"
              }}
              aria-label="Continue shopping"
            >
              <span className="transition-transform duration-200 group-hover:-translate-x-1 font-bold text-sm">
                ←
              </span>
              <span className="hidden sm:inline text-xs font-semibold tracking-[1.5px] uppercase">
                Continue Shopping
              </span>
              <span className="inline sm:hidden text-xs font-semibold tracking-[1.5px] uppercase">
                Shop
              </span>
            </button>
          ) : (
            <button
              className="menu-button cursor-pointer flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 p-1 rounded-sm hover:bg-neutral-100 transition-colors"
              type="button"
              aria-label="Open Navigation Menu"
              onClick={() => setIsMenuOpen(true)}
              title="Menu & Departments"
            >
              <img
                src={`${ASSETS_PATH}/4cc08.svg`}
                alt="Menu"
                className="w-5 h-auto"
              />
            </button>
          )}
        </div>

        {/* Center Zone: Brand NOIRÉ (Strictly dead-centered inside header) */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
          <a
            className="brand flex flex-col items-center justify-center cursor-pointer pointer-events-auto transition-transform duration-200 hover:scale-105 select-none"
            href="#top"
            aria-label="NOIRÉ home"
            onClick={(e) => {
              if (window.location.hash === "" || window.location.hash === "#top") {
                e.preventDefault()
                window.scrollTo({ top: 0, left: 0, behavior: "smooth" })
              } else {
                window.scrollTo({ top: 0, left: 0, behavior: "instant" })
              }
            }}
          >
            <picture className="flex items-center justify-center">
              <source
                media="(max-width: 640px)"
                srcSet={`${ASSETS_PATH}/cb75f.svg`}
              />
              <img
                src={`${ASSETS_PATH}/5fbaf.svg`}
                alt="NOIRÉ"
                className="w-7 h-7 sm:w-8 sm:h-8 lg:w-9 lg:h-9 object-contain block"
              />
            </picture>
            <span className="font-extrabold tracking-[3.5px] sm:tracking-[4px] text-[10px] sm:text-[11px] uppercase mt-1 leading-none pl-[3.5px]">
              NOIRÉ
            </span>
          </a>
        </div>

        {/* Right Zone: Actions (Currency, Search, Wishlist, Shopping Bag) */}
        <div className="header-actions flex items-center justify-end gap-1.5 sm:gap-2 flex-1 min-w-0 z-30">

          {/* Currency Switcher Dropdown (Desktop) */}
          <div className="relative hidden md:block">
            <button
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-full text-[11px] font-semibold tracking-[1.5px] uppercase text-neutral-600 hover:text-black hover:bg-neutral-100 transition-colors cursor-pointer select-none"
              type="button"
              aria-label={`Currency: ${currency}`}
              onClick={() => setCurrencyDropdownOpen((prev) => !prev)}
              title={`Select Currency (${currency})`}
            >
              <span>{currency}</span>
              <svg
                className="w-3 h-3 text-neutral-400"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M6 9l6 6 6-6" />
              </svg>
            </button>
            <CurrencyDropdown
              isOpen={currencyDropdownOpen}
              onClose={() => setCurrencyDropdownOpen(false)}
            />
          </div>

          {/* Instant Search Button */}
          <button
            className="group relative w-8.5 h-8.5 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-neutral-800 hover:text-black hover:bg-neutral-100 transition-all duration-200 cursor-pointer active:scale-95"
            type="button"
            aria-label="Search garments"
            onClick={() => setIsSearchOpen(true)}
            title="Search catalog"
          >
            <svg
              className="w-4.5 h-4.5 sm:w-5 sm:h-5 transition-transform duration-200 group-hover:scale-105"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <circle cx="11" cy="11" r="7" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </button>


          {/* Wishlist Button with Clean Counter Badge */}
          <button
            className="group relative w-8.5 h-8.5 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-neutral-800 hover:text-black hover:bg-neutral-100 transition-all duration-200 cursor-pointer active:scale-95"
            type="button"
            aria-label={`Wishlist (${wishlistCount})`}
            onClick={() => setIsWishlistOpen(true)}
            title={`Wishlist (${wishlistCount})`}
          >
            <svg
              className="w-4.5 h-4.5 sm:w-5 sm:h-5 transition-transform duration-200 group-hover:scale-105"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
            {wishlistCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 min-w-[17px] h-[17px] px-1 bg-black text-white text-[9.5px] font-bold rounded-full flex items-center justify-center leading-none border border-white animate-badge-pop shadow-xs">
                {wishlistCount}
              </span>
            )}
          </button>

          {/* Shopping Bag Button with Clean Counter Badge */}
          <button
            className="group relative w-8.5 h-8.5 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-neutral-800 hover:text-black hover:bg-neutral-100 transition-all duration-200 cursor-pointer active:scale-95"
            type="button"
            onClick={() => {
              if (isCartPage) {
                window.location.hash = "cart"
              } else {
                setIsCartOpen(true)
              }
            }}
            aria-label={`Shopping Bag (${cartCount})`}
            title={`Shopping Bag (${cartCount})`}
          >
            <svg
              className="w-4.5 h-4.5 sm:w-5 sm:h-5 transition-transform duration-200 group-hover:scale-105"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <path d="M16 10a4 4 0 0 1-8 0" />
            </svg>
            {cartCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 min-w-[17px] h-[17px] px-1 bg-black text-white text-[9.5px] font-bold rounded-full flex items-center justify-center leading-none border border-white animate-badge-pop shadow-xs">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </header>
    </div>
  )
}
