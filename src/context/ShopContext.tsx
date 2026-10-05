import React, { createContext, useContext, useEffect, useState } from "react"
import { initialCartItems } from "@/data/products"
import type { CartItemType, Product } from "@/types"

export type CurrencyCode = "USD" | "EUR" | "GBP" | "SEK"

interface CurrencyConfig {
  code: CurrencyCode
  symbol: string
  rate: number
  label: string
}

export const CURRENCIES: Record<CurrencyCode, CurrencyConfig> = {
  USD: { code: "USD", symbol: "$", rate: 1, label: "USD ($)" },
  EUR: { code: "EUR", symbol: "€", rate: 0.92, label: "EUR (€)" },
  GBP: { code: "GBP", symbol: "£", rate: 0.79, label: "GBP (£)" },
  SEK: { code: "SEK", symbol: "kr", rate: 10.45, label: "SEK (kr)" },
}

export interface WishlistItem {
  id: string
  name: string
  price: number
  image: string
  category: string
}

interface ShopContextType {
  // Cart
  cartItems: CartItemType[]
  cartCount: number
  cartSubtotal: number
  addToCart: (
    item: {
      name: string
      image: string
      id?: number
      price?: number
      size?: string
      color?: string
      quantity?: number
    },
    openDrawer?: boolean,
  ) => void
  removeFromCart: (id: number) => void
  updateCartQuantity: (id: number, delta: number) => void
  clearCart: () => void

  // Wishlist
  wishlist: WishlistItem[]
  wishlistCount: number
  toggleWishlist: (item: WishlistItem) => void
  isInWishlist: (id: string) => boolean
  removeFromWishlist: (id: string) => void

  // Currency
  currency: CurrencyCode
  setCurrency: (code: CurrencyCode) => void
  formatPrice: (amountInUSD: number) => string

  // Modals & Drawers
  isMenuOpen: boolean
  setIsMenuOpen: (open: boolean) => void
  isCartOpen: boolean
  setIsCartOpen: (open: boolean) => void
  isWishlistOpen: boolean
  setIsWishlistOpen: (open: boolean) => void
  isAccountOpen: boolean
  setIsAccountOpen: (open: boolean) => void
  isSearchOpen: boolean
  setIsSearchOpen: (open: boolean) => void
  searchQuery: string
  setSearchQuery: (query: string) => void

  // Toast / notification
  toastMessage: string | null
  showToast: (msg: string) => void
}

const ShopContext = createContext<ShopContextType | undefined>(undefined)

const INITIAL_WISHLIST: WishlistItem[] = [
  {
    id: "wishlist-1",
    name: "Embroidered Seersucker Shirt",
    price: 99,
    image: "b895e.png",
    category: "V-Neck T-Shirt",
  },
]

export function ShopProvider({ children }: { children: React.ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItemType[]>(() => {
    try {
      const saved = localStorage.getItem("noire_cart")
      return saved ? JSON.parse(saved) : initialCartItems
    } catch {
      return initialCartItems
    }
  })

  const [wishlist, setWishlist] = useState<WishlistItem[]>(() => {
    try {
      const saved = localStorage.getItem("noire_wishlist")
      return saved ? JSON.parse(saved) : INITIAL_WISHLIST
    } catch {
      return INITIAL_WISHLIST
    }
  })

  const [currency, setCurrencyState] = useState<CurrencyCode>(() => {
    try {
      const saved = localStorage.getItem("noire_currency") as CurrencyCode
      return saved && CURRENCIES[saved] ? saved : "USD"
    } catch {
      return "USD"
    }
  })

  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [isWishlistOpen, setIsWishlistOpen] = useState(false)
  const [isAccountOpen, setIsAccountOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [toastMessage, setToastMessage] = useState<string | null>(null)

  const cartCount = cartItems.reduce(
    (acc, item) => acc + (item.quantity || 1),
    0,
  )
  const cartSubtotal = cartItems.reduce(
    (acc, item) => acc + (item.price || 199) * (item.quantity || 1),
    0,
  )

  useEffect(() => {
    try {
      localStorage.setItem("noire_cart", JSON.stringify(cartItems))
    } catch {
      // Ignore storage errors
    }
  }, [cartItems])

  useEffect(() => {
    try {
      localStorage.setItem("noire_wishlist", JSON.stringify(wishlist))
    } catch {
      // Ignore storage errors
    }
  }, [wishlist])

  const setCurrency = (code: CurrencyCode) => {
    setCurrencyState(code)
    try {
      localStorage.setItem("noire_currency", code)
    } catch {
      // Ignore storage errors
    }
    showToast(`Currency changed to ${CURRENCIES[code].label}`)
  }

  const showToast = (msg: string) => {
    setToastMessage(msg)
    setTimeout(() => {
      setToastMessage((current) => (current === msg ? null : current))
    }, 2800)
  }

  const addToCart = (
    item: {
      name: string
      image: string
      id?: number
      price?: number
      size?: string
      color?: string
      quantity?: number
    },
    openDrawer = true,
  ) => {
    const itemPrice = item.price || 199
    const itemSize = item.size || "M"
    const itemQty = item.quantity || 1
    const cleanImage = item.image.includes("/")
      ? item.image.split("/").pop() || item.image
      : item.image

    setCartItems((prev) => {
      const existingIndex = prev.findIndex(
        (ci) => ci.name === item.name && (ci.size || "M") === itemSize,
      )
      if (existingIndex > -1) {
        const copy = [...prev]
        const currentQty = copy[existingIndex].quantity || 1
        copy[existingIndex] = {
          ...copy[existingIndex],
          quantity: currentQty + itemQty,
        }
        return copy
      }

      const newItem: CartItemType = {
        id: item.id || Date.now(),
        name: item.name,
        image: cleanImage,
        price: itemPrice,
        size: itemSize,
        color: item.color || "Noir",
        quantity: itemQty,
      }
      return [newItem, ...prev]
    })

    showToast(`Added "${item.name}" (${itemSize}) to your bag`)
    if (openDrawer) {
      setIsCartOpen(true)
    }
  }

  const updateCartQuantity = (id: number, delta: number) => {
    setCartItems((prev) => {
      return prev
        .map((item) => {
          if (item.id === id) {
            const newQty = (item.quantity || 1) + delta
            return newQty > 0 ? { ...item, quantity: newQty } : null
          }
          return item
        })
        .filter(Boolean) as CartItemType[]
    })
  }

  const removeFromCart = (id: number) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id))
    showToast("Item removed from cart")
  }

  const clearCart = () => {
    setCartItems([])
  }

  const toggleWishlist = (item: WishlistItem) => {
    const exists = wishlist.some(
      (w) => w.id === item.id || w.name === item.name,
    )
    if (exists) {
      setWishlist((prev) =>
        prev.filter((w) => w.id !== item.id && w.name !== item.name),
      )
      showToast(`Removed "${item.name}" from wishlist`)
    } else {
      setWishlist((prev) => [item, ...prev])
      showToast(`Added "${item.name}" to wishlist`)
    }
  }

  const removeFromWishlist = (id: string) => {
    setWishlist((prev) => prev.filter((w) => w.id !== id))
    showToast("Removed from wishlist")
  }

  const isInWishlist = (id: string) => {
    return wishlist.some((w) => w.id === id || w.name === id)
  }

  const formatPrice = (amountInUSD: number) => {
    const { symbol, rate } = CURRENCIES[currency]
    const converted = Math.round(amountInUSD * rate)
    if (currency === "SEK") {
      return `${converted} kr`
    }
    return `${symbol}${converted}`
  }

  return (
    <ShopContext.Provider
      value={{
        cartItems,
        cartCount,
        cartSubtotal,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        wishlist,
        wishlistCount: wishlist.length,
        toggleWishlist,
        isInWishlist,
        removeFromWishlist,
        currency,
        setCurrency,
        formatPrice,
        isMenuOpen,
        setIsMenuOpen,
        isCartOpen,
        setIsCartOpen,
        isWishlistOpen,
        setIsWishlistOpen,
        isAccountOpen,
        setIsAccountOpen,
        isSearchOpen,
        setIsSearchOpen,
        searchQuery,
        setSearchQuery,
        toastMessage,
        showToast,
      }}
    >
      {children}
    </ShopContext.Provider>
  )
}

export function useShop() {
  const context = useContext(ShopContext)
  if (!context) {
    throw new Error("useShop must be used within a ShopProvider")
  }
  return context
}

export default useShop
