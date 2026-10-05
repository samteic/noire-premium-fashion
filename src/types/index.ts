export interface Product {
  category: string
  name: string
  price: string
  image: string
  hoverImage?: string
  views?: string[]
  colors: string[]
  position?: string
  addIcon?: string
  fit?: string
  modelSpec?: string
}

export interface CatalogProduct {
  category: string
  name: string
  price: string
  image: string
  hoverImage?: string
  views?: string[]
  position?: string
  scale?: number
  color?: string
  count?: string
  fit?: string
  modelSpec?: string
}

export interface CartItemType {
  id: number
  image: string
  name: string
  price?: number
  size?: string
  color?: string
  quantity?: number
}

export interface HeroMobileProduct {
  image: string
  position: string
}
