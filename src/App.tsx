import { useEffect } from "react"
import useHashRoute from "@/hooks/useHashRoute"
import HomePage from "@/pages/HomePage"
import ProductsPage from "@/pages/ProductsPage"
import ProductDetailPage from "@/pages/ProductDetailPage"
import CartPage from "@/pages/CartPage"
import CheckoutPage from "@/pages/CheckoutPage"
import { ShopProvider, useShop } from "@/context/ShopContext"
import MobileMenuDrawer from "@/components/navigation/MobileMenuDrawer"
import WishlistDrawer from "@/components/navigation/WishlistDrawer"
import CartDrawer from "@/components/navigation/CartDrawer"
import AccountModal from "@/components/navigation/AccountModal"
import SearchModal from "@/components/navigation/SearchModal"
import Toast from "@/components/common/Toast"

function AppContent() {
  const { route, hash } = useHashRoute()
  const { isMenuOpen, setIsMenuOpen } = useShop()

  // Update page title on route changes
  useEffect(() => {
    const titles: Record<string, string> = {
      home: "NOIRÉ — Luxury & Haute Couture",
      products: "Collections — NOIRÉ Paris",
      product: "Product Details — NOIRÉ Paris",
      cart: "Shopping Bag — NOIRÉ Paris",
      checkout: "Private Checkout — NOIRÉ Paris",
    }
    document.title = titles[route] || "NOIRÉ — Luxury & Haute Couture"
  }, [route])

  // Scroll to top on page route changes or scroll to target in-page section
  useEffect(() => {
    if (route === "home" && hash && hash !== "#top" && hash !== "#" && hash !== "") {
      const sectionId = hash.replace("#", "")
      const el = document.getElementById(sectionId)
      if (el) {
        el.scrollIntoView({ behavior: "smooth" })
      } else {
        const timer = setTimeout(() => {
          const delayedEl = document.getElementById(sectionId)
          if (delayedEl) {
            delayedEl.scrollIntoView({ behavior: "smooth" })
          }
        }, 60)
        return () => clearTimeout(timer)
      }
    } else {
      window.scrollTo({ top: 0, left: 0, behavior: "instant" })
    }
  }, [route, hash])

  const renderPage = () => {
    switch (route) {
      case "products":
        return <ProductsPage />
      case "product":
        return <ProductDetailPage />
      case "checkout":
        return <CheckoutPage />
      case "cart":
        return <CartPage />
      case "home":
      default:
        return <HomePage />
    }
  }

  return (
    <>
      {renderPage()}
      <MobileMenuDrawer
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
      />
      <CartDrawer />
      <WishlistDrawer />
      <AccountModal />
      <SearchModal />
      <Toast />
    </>
  )
}

export default function App() {
  return (
    <ShopProvider>
      <AppContent />
    </ShopProvider>
  )
}
