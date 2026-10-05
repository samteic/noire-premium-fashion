import { useState } from "react"
import type { CatalogProduct } from "@/types"
import { ASSETS_PATH } from "@/data/products"
import { useShop } from "@/context/ShopContext"

interface CatalogCardProps {
  product: CatalogProduct
  featured?: boolean
  index: number
}

export default function CatalogCard({
  product,
  featured = false,
  index,
}: CatalogCardProps) {
  const { toggleWishlist, isInWishlist, formatPrice } = useShop()
  const rawNumericPrice = parseInt(product.price.replace(/[^0-9]/g, "")) || 199
  const isWishlisted = isInWishlist(product.name)
  const [selectedColor] = useState(product.color || "#000")

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    toggleWishlist({
      id: `catalog-${index}-${product.name}`,
      name: product.name,
      price: rawNumericPrice,
      image: product.image,
      category: product.category,
    })
  }

  const mainImg =
    product.image.startsWith("http") || product.image.startsWith("/")
      ? product.image
      : `${ASSETS_PATH}/${product.image}`

  const hoverImgSrc = product.hoverImage
    ? product.hoverImage.startsWith("http") || product.hoverImage.startsWith("/")
      ? product.hoverImage
      : `${ASSETS_PATH}/${product.hoverImage}`
    : null

  return (
    <article className={`catalog-card catalog-card--${index} group relative cursor-pointer`}>
      <a
        className="catalog-link z-0"
        href={`#product?name=${encodeURIComponent(product.name)}`}
        onClick={() => {
          window.scrollTo({ top: 0, left: 0, behavior: "instant" })
        }}
        aria-label={`View ${product.name}`}
      />

      <div className="catalog-image relative overflow-hidden bg-neutral-100">
        {/* Main Front Studio Image */}
        <img
          src={mainImg}
          alt={product.name}
          className="w-full h-full object-cover transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
          style={{
            objectPosition: product.position || "50% 25%",
            transform: product.scale ? `scale(${product.scale})` : undefined,
          }}
        />

        {/* Back / Alternate Studio View on Hover */}
        {hoverImgSrc && (
          <img
            src={hoverImgSrc}
            alt={`${product.name} back view`}
            aria-hidden="true"
            className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] pointer-events-none"
            style={{ objectPosition: product.position || "50% 25%" }}
          />
        )}

        {/* Wishlist Heart Button */}
        <button
          type="button"
          className={`absolute top-2.5 right-2.5 z-20 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 cursor-pointer ${
            isWishlisted
              ? "bg-black text-white shadow-md scale-105"
              : "bg-white/80 hover:bg-white text-neutral-600 hover:text-black shadow-xs hover:scale-110"
          }`}
          aria-label={
            isWishlisted ? "Remove from wishlist" : "Save to wishlist"
          }
          onClick={handleWishlistClick}
          title={isWishlisted ? "Saved" : "Save to Wishlist"}
        >
          <span
            className={`text-xs ${isWishlisted ? "text-white font-bold" : ""}`}
          >
            {isWishlisted ? "♥" : "♡"}
          </span>
        </button>
      </div>

      <div className="catalog-meta">
        <div>
          <span>
            {product.category}
            {product.color && (
              <i
                style={{ background: selectedColor }}
                aria-hidden="true"
                className="transition-transform duration-200 hover:scale-125"
              />
            )}
            {product.count && <small>{product.count}</small>}
          </span>
          <h3 className="hover:text-black transition-colors">{product.name}</h3>
          {product.fit && (
            <p className="text-[10px] text-neutral-400 uppercase tracking-[1.5px] mt-0.5">
              {product.fit}
            </p>
          )}
        </div>
        <strong>{formatPrice(rawNumericPrice)}</strong>
      </div>

      {/* Clean Bottom Prompt */}
      <div className="mt-2 pt-2 border-t border-neutral-100 flex items-center justify-between text-[11px] text-neutral-500 group-hover:text-black transition-colors">
        <span className="uppercase tracking-wider font-semibold">View Sizes & Details</span>
        <span className="font-bold">→</span>
      </div>
    </article>
  )
}
