import { useState } from "react"
import type { Product } from "@/types"
import { ASSETS_PATH, detailSizes } from "@/data/products"
import { useShop } from "@/context/ShopContext"

interface ProductCardProps {
  product: Product
  compact?: boolean
}

export default function ProductCard({
  product,
  compact = false,
}: ProductCardProps) {
  const { addToCart, toggleWishlist, isInWishlist, formatPrice } = useShop()
  const rawNumericPrice = parseInt(product.price.replace(/[^0-9]/g, "")) || 99
  const isWishlisted = isInWishlist(product.name)
  const [selectedColor, setSelectedColor] = useState(
    product.colors[0] || "#fff",
  )

  const handleSizeClick = (e: React.MouseEvent, size: string) => {
    e.preventDefault()
    e.stopPropagation()
    addToCart({
      name: product.name,
      image: product.image,
      size,
      price: rawNumericPrice,
      color: selectedColor,
    })
  }

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    toggleWishlist({
      id: `prod-${product.name}`,
      name: product.name,
      price: rawNumericPrice,
      image: product.image,
      category: product.category,
    })
  }

  const mainImgSrc =
    product.image.startsWith("http") || product.image.startsWith("/")
      ? product.image
      : `${ASSETS_PATH}/${product.image}`

  const hoverImgSrc = product.hoverImage
    ? product.hoverImage.startsWith("http") || product.hoverImage.startsWith("/")
      ? product.hoverImage
      : `${ASSETS_PATH}/${product.hoverImage}`
    : null

  return (
    <article
      className={`product-card group relative ${
        compact ? "product-card--compact" : ""
      }`}
      onClick={() => {
        window.location.hash = `product?name=${encodeURIComponent(product.name)}`
      }}
    >
      <div className="product-image relative overflow-hidden cursor-pointer bg-neutral-100">
        {/* Main studio front shot */}
        <img
          src={mainImgSrc}
          alt={product.name}
          className="w-full h-full object-cover transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
          style={{ objectPosition: product.position || "50% 25%" }}
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

        {/* Studio View Badge */}
        {hoverImgSrc && (
          <div className="absolute top-2.5 left-2.5 z-20 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <span className="bg-black/75 backdrop-blur-xs text-white text-[8px] uppercase tracking-[1.5px] px-2 py-0.5 rounded-full font-semibold">
              Back View
            </span>
          </div>
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

        {/* Quick Size Selector Bar (Slides up on desktop hover) */}
        <div
          className="absolute bottom-0 inset-x-0 z-20 bg-white/95 backdrop-blur-sm px-2 py-2.5 border-t border-neutral-200 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] flex items-center justify-between shadow-lg"
          onClick={(e) => e.stopPropagation()}
        >
          <span className="text-[9px] uppercase font-bold tracking-[1.5px] text-neutral-400 pl-1">
            Quick Add:
          </span>
          <div className="flex items-center gap-1">
            {detailSizes.slice(0, 5).map((size) => (
              <button
                key={size}
                type="button"
                className="w-6 h-6 flex items-center justify-center text-[10px] font-semibold tracking-wider border border-neutral-300 hover:border-black hover:bg-black hover:text-white transition-all cursor-pointer rounded-xs"
                onClick={(e) => handleSizeClick(e, size)}
                title={`Quick add ${size}`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        {/* Default plus button */}
        <button
          className="add-button cursor-pointer transition-transform hover:scale-110 active:scale-95 z-10"
          type="button"
          aria-label={`Add ${product.name} to cart`}
          onClick={(e) => {
            e.stopPropagation()
            addToCart({
              name: product.name,
              image: product.image,
              price: rawNumericPrice,
            })
          }}
        >
          <img
            src={`${ASSETS_PATH}/${product.addIcon ?? "36ff0.svg"}`}
            alt=""
          />
        </button>
      </div>

      <div className="product-meta">
        <div>
          <div className="product-category">
            <span>{product.category}</span>
            <span className="swatches" aria-hidden="true">
              {product.colors.map((color, index) => (
                <i
                  key={`${color}-${index}`}
                  style={{ background: color }}
                  className={`cursor-pointer transition-transform ${
                    selectedColor === color
                      ? "scale-125 ring-1 ring-black"
                      : "opacity-80 hover:opacity-100"
                  }`}
                  onClick={(e) => {
                    e.stopPropagation()
                    setSelectedColor(color)
                  }}
                  title={`Select ${color}`}
                />
              ))}
              <small>+{product.colors.length + 1}</small>
            </span>
          </div>
          <h3 className="hover:text-black transition-colors">{product.name}</h3>
          {product.fit && (
            <p className="text-[10px] text-neutral-400 uppercase tracking-[1.5px] mt-0.5">
              {product.fit}
            </p>
          )}
        </div>
        <strong>{formatPrice(rawNumericPrice)}</strong>
      </div>
    </article>
  )
}
