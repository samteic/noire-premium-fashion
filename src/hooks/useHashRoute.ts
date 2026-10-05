import { useEffect, useState } from "react"

export type AppRoute = "home" | "products" | "product" | "checkout" | "cart"

export function useHashRoute(): {
  route: AppRoute
  hash: string
  navigate: (target: string) => void
} {
  const [hash, setHash] = useState(() => window.location.hash)

  useEffect(() => {
    const handleHashChange = () => {
      setHash(window.location.hash)
    }

    window.addEventListener("hashchange", handleHashChange)
    return () => window.removeEventListener("hashchange", handleHashChange)
  }, [])

  const navigate = (target: string) => {
    const formatted = target.startsWith("#") ? target : `#${target}`
    window.location.hash = formatted
  }

  let route: AppRoute = "home"
  if (hash.startsWith("#products")) {
    route = "products"
  } else if (hash.startsWith("#product")) {
    route = "product"
  } else if (hash.startsWith("#checkout")) {
    route = "checkout"
  } else if (hash.startsWith("#cart")) {
    route = "cart"
  }

  return { route, hash, navigate }
}

export default useHashRoute
