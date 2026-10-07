import { useEffect } from "react"
import { useShop, CURRENCIES, type CurrencyCode } from "@/context/ShopContext"
import { ASSETS_PATH } from "@/data/products"
import { getGeneralWhatsAppUrl } from "@/utils/whatsapp"

interface MobileMenuDrawerProps {
  isOpen: boolean
  onClose: () => void
}

export default function MobileMenuDrawer({
  isOpen,
  onClose,
}: MobileMenuDrawerProps) {
  const {
    currency,
    setCurrency,
    setIsAccountOpen,
    setIsWishlistOpen,
    setIsSearchOpen,
    cartCount,
    wishlistCount,
  } = useShop()

  // Lock body scroll and listen for Escape key
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") onClose()
      }
      window.addEventListener("keydown", handleKeyDown)
      return () => {
        document.body.style.overflow = ""
        window.removeEventListener("keydown", handleKeyDown)
      }
    } else {
      document.body.style.overflow = ""
    }
  }, [isOpen, onClose])

  const navLinks = [
    { label: "Home", href: "#top" },
    { label: "Collection", href: "#collection" },
    { label: "How to Order", href: "#concierge" },
    { label: "About Noiré", href: "#story" },
  ]

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => {
    onClose()
    if (href === "#products") {
      if (window.location.hash === "#products") {
        e.preventDefault()
        window.scrollTo({ top: 0, left: 0, behavior: "smooth" })
      } else {
        window.scrollTo({ top: 0, left: 0, behavior: "instant" })
      }
    } else if (href === "#top") {
      if (window.location.hash === "" || window.location.hash === "#top") {
        e.preventDefault()
        window.scrollTo({ top: 0, left: 0, behavior: "smooth" })
      } else {
        window.scrollTo({ top: 0, left: 0, behavior: "instant" })
      }
    } else if (href.startsWith("#")) {
      const targetId = href.slice(1)
      const el = document.getElementById(targetId)
      if (el) {
        e.preventDefault()
        window.location.hash = href
        el.scrollIntoView({ behavior: "smooth" })
      } else {
        window.location.hash = href
      }
    }
  }

  const departments = [
    "Ready-to-Wear",
    "Outerwear",
    "Tailoring & Suiting",
    "Dresses & Evening",
    "Knitwear",
  ]

  return (
    <div
      className={`luxury-drawer-root ${isOpen ? "is-open" : ""}`}
      aria-hidden={!isOpen}
    >
      {/* Backdrop */}
      <div className="luxury-drawer-backdrop" onClick={onClose} />

      {/* Drawer Panel */}
      <aside
        className="luxury-sidebar-left p-6 sm:p-8"
        onClick={(e) => e.stopPropagation()}
        style={{ letterSpacing: "1.5px" }}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation Menu"
      >
        {/* Header */}
        <div
          className="sidebar-stagger-left flex items-center justify-between pb-5 border-b border-neutral-200"
          style={{ transitionDelay: isOpen ? "90ms" : "0ms" }}
        >
          <div className="flex flex-col">
            <span className="brand-wordmark-title text-base">
              NOIRÉ
            </span>
            <span className="brand-wordmark-subtitle text-[7px] text-neutral-400">
              PARIS
            </span>
          </div>
          <button
            type="button"
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-neutral-100 text-neutral-400 hover:text-black transition-all cursor-pointer text-xl"
            onClick={onClose}
            aria-label="Close Menu"
          >
            ✕
          </button>
        </div>

        {/* Quick Actions Search & Wishlist */}
        <div
          className="sidebar-stagger-left grid grid-cols-2 gap-2.5 my-5"
          style={{ transitionDelay: isOpen ? "140ms" : "0ms" }}
        >
          <button
            type="button"
            className="flex items-center justify-center gap-2.5 py-3 px-3 border border-neutral-200 hover:border-black text-xs uppercase tracking-wider transition-all duration-200 cursor-pointer hover:bg-neutral-50 group"
            onClick={() => {
              onClose()
              setIsSearchOpen(true)
            }}
          >
            <svg
              className="w-3.5 h-3.5 transition-transform duration-200 group-hover:scale-110 opacity-75"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="7" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <span className="font-medium">Search</span>
          </button>
          <button
            type="button"
            className="flex items-center justify-center gap-2.5 py-3 px-3 border border-neutral-200 hover:border-black text-xs uppercase tracking-wider transition-all duration-200 cursor-pointer hover:bg-neutral-50 group"
            onClick={() => {
              onClose()
              setIsWishlistOpen(true)
            }}
          >
            <svg
              className="w-4 h-4 transition-transform duration-200 group-hover:scale-110"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
            <span className="font-medium">Saved ({wishlistCount})</span>
          </button>
        </div>

        {/* Primary Links */}
        <nav
          className="sidebar-stagger-left py-2 space-y-1 border-b border-neutral-100"
          style={{ transitionDelay: isOpen ? "190ms" : "0ms" }}
          aria-label="Mobile Navigation Links"
        >
          {navLinks.map((link, index) => (
            <a
              key={link.label}
              href={link.href}
              className="group flex items-center justify-between py-3 text-sm font-semibold uppercase tracking-[2px] text-neutral-800 hover:text-black transition-all duration-200 hover:translate-x-1"
              style={{
                transitionDelay: isOpen ? `${190 + index * 30}ms` : "0ms",
              }}
              onClick={(e) => handleNavClick(e, link.href)}
            >
              <span className="relative">
                {link.label}
                <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-black transition-all duration-200 group-hover:w-full" />
              </span>
              {typeof link.badge === "number" && link.badge > 0 && (
                <span className="bg-black text-white text-[10px] font-bold px-2 py-0.5 rounded-full animate-badge-pop">
                  {link.badge}
                </span>
              )}
            </a>
          ))}
        </nav>

        {/* Departments */}
        <div
          className="sidebar-stagger-left py-5 border-b border-neutral-100"
          style={{ transitionDelay: isOpen ? "300ms" : "0ms" }}
        >
          <span className="text-[10px] uppercase font-bold text-neutral-400 tracking-[2px] block mb-3">
            Departments
          </span>
          <div className="space-y-2.5">
            {departments.map((dept, index) => (
              <a
                key={dept}
                href="#products"
                className="block text-xs uppercase tracking-wider text-neutral-500 hover:text-black transition-all duration-200 hover:translate-x-1"
                style={{
                  transitionDelay: isOpen ? `${300 + index * 25}ms` : "0ms",
                }}
                onClick={(e) => handleNavClick(e, "#products")}
              >
                {dept}
              </a>
            ))}
          </div>
        </div>

        {/* Currency & VIP Access */}
        <div
          className="sidebar-stagger-left py-5 space-y-4 mt-auto"
          style={{ transitionDelay: isOpen ? "360ms" : "0ms" }}
        >
          <div>
            <span className="text-[10px] uppercase font-bold text-neutral-400 tracking-[2px] block mb-2">
              Currency
            </span>
            <div className="grid grid-cols-4 gap-1.5">
              {(Object.keys(CURRENCIES) as CurrencyCode[]).map((code) => (
                <button
                  key={code}
                  type="button"
                  className={`py-2 text-xs text-center border cursor-pointer transition-all duration-200 ${
                    currency === code
                      ? "border-black bg-black text-white font-bold shadow-sm"
                      : "border-neutral-200 text-neutral-600 hover:border-neutral-400 hover:text-black"
                  }`}
                  onClick={() => setCurrency(code)}
                >
                  {code}
                </button>
              ))}
            </div>
          </div>

          {/* Direct WhatsApp Concierge Action */}
          <a
            href={getGeneralWhatsAppUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-3.5 bg-[#25D366] hover:bg-[#20ba5a] text-black text-xs uppercase tracking-[2px] font-bold flex items-center justify-center gap-2 transition-all duration-200 shadow-xs hover:shadow-md cursor-pointer rounded-xs"
            onClick={onClose}
          >
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
              <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.03 14.69 2 12.04 2ZM12.05 20.15C10.57 20.15 9.12 19.75 7.85 19L7.55 18.82L4.43 19.64L5.26 16.6L5.07 16.29C4.24 14.97 3.81 13.46 3.81 11.91C3.81 7.37 7.5 3.68 12.04 3.68C14.25 3.68 16.31 4.54 17.87 6.1C19.42 7.66 20.28 9.72 20.28 11.92C20.28 16.46 16.59 20.15 12.05 20.15ZM16.56 14.36C16.31 14.23 15.09 13.63 14.86 13.55C14.63 13.46 14.47 13.42 14.3 13.67C14.14 13.91 13.67 14.47 13.53 14.63C13.39 14.79 13.25 14.81 13 14.69C12.75 14.56 11.95 14.3 11 13.45C10.26 12.79 9.76 11.97 9.62 11.72C9.48 11.47 9.6 11.34 9.73 11.22C9.84 11.11 9.98 10.93 10.1 10.79C10.22 10.65 10.26 10.54 10.34 10.38C10.42 10.22 10.38 10.07 10.32 9.95C10.26 9.83 9.77 8.63 9.57 8.13C9.37 7.65 9.17 7.71 9.02 7.71C8.88 7.7 8.71 7.7 8.55 7.7C8.38 7.7 8.12 7.76 7.89 8.01C7.66 8.26 7.02 8.86 7.02 10.08C7.02 11.3 7.91 12.48 8.03 12.64C8.16 12.81 9.78 15.31 12.27 16.38C12.86 16.64 13.32 16.79 13.68 16.9C14.27 17.09 14.81 17.06 15.24 17C15.72 16.93 16.71 16.4 16.91 15.82C17.12 15.24 17.12 14.75 17.06 14.65C17 14.54 16.82 14.48 16.56 14.36Z" />
            </svg>
            <span>Chat on WhatsApp</span>
          </a>


        </div>

        <div
          className="sidebar-stagger-left pt-2 text-[10px] text-neutral-400 uppercase tracking-widest text-center"
          style={{ transitionDelay: isOpen ? "400ms" : "0ms" }}
        >
          NOIRÉ Paris • London • Stockholm
        </div>
      </aside>
    </div>
  )
}
