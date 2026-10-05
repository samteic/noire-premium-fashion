import Navbar from "./Navbar"

interface ProductsHeaderProps {
  filtersOpen?: boolean
  closeFilters?: () => void
}

export default function ProductsHeader(_props?: ProductsHeaderProps) {
  return <Navbar page="products" />
}
