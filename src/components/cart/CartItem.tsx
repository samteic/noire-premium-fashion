import { ASSETS_PATH } from "@/data/products"
import { useShop } from "@/context/ShopContext"
import type { CartItemType } from "@/types"

interface CartItemProps {
  item: CartItemType
  onRemove: () => void
  onUpdateQuantity: (delta: number) => void
}

export default function CartItem({
  item,
  onRemove,
  onUpdateQuantity,
}: CartItemProps) {
  const { formatPrice, isInWishlist, toggleWishlist } = useShop()

  const itemPrice = item.price || 199
  const itemQuantity = item.quantity || 1
  const itemTotal = itemPrice * itemQuantity
  const inWishlist = isInWishlist(String(item.id))

  const imageSrc =
    item.image.startsWith("http") || item.image.startsWith("/")
      ? item.image
      : `${ASSETS_PATH}/${item.image}`

  return (
    <article className="group relative flex flex-col sm:flex-row gap-5 p-5 bg-white border border-neutral-200/90 transition-all duration-300 hover:border-black/40 hover:shadow-xs">
      {/* Garment Image */}
      <div className="relative w-full sm:w-28 sm:h-36 aspect-[3/4] sm:aspect-auto overflow-hidden bg-neutral-100 flex-shrink-0 border border-neutral-200">
        <img
          src={imageSrc}
          alt={item.name}
          className="w-full h-full object-cover object-center transition-transform duration-500 ease-out group-hover:scale-105"
        />
        {/* Quick Wishlist Toggle on Image */}
        <button
          type="button"
          onClick={() =>
            toggleWishlist({
              id: String(item.id),
              name: item.name,
              price: itemPrice,
              image: item.image,
              category: "Garment",
            })
          }
          className="absolute top-2 right-2 w-7 h-7 rounded-full bg-white/90 backdrop-blur-xs flex items-center justify-center text-neutral-600 hover:text-black transition-transform active:scale-90 cursor-pointer shadow-xs"
          aria-label={
            inWishlist ? "Remove from favourites" : "Save to favourites"
          }
          title={inWishlist ? "Saved to favourites" : "Save to favourites"}
        >
          <svg
            className={`w-3.5 h-3.5 transition-colors ${
              inWishlist ? "fill-red-600 text-red-600" : "fill-none stroke-current"
            }`}
            viewBox="0 0 24 24"
            strokeWidth="1.75"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
            />
          </svg>
        </button>
      </div>

      {/* Garment Information */}
      <div className="flex-1 flex flex-col justify-between min-w-0">
        <div>
          <div className="flex items-start justify-between gap-3">
            <div>
              <span className="text-[10px] uppercase font-bold tracking-[2px] text-neutral-400 block mb-1">
                Atelier Silhouette
              </span>
              <h3 className="text-sm sm:text-base font-semibold tracking-wide text-neutral-900 leading-snug">
                {item.name}
              </h3>
            </div>

            {/* Remove Button */}
            <button
              type="button"
              onClick={onRemove}
              className="text-neutral-400 hover:text-neutral-900 transition-colors p-1 cursor-pointer"
              aria-label={`Remove ${item.name} from bag`}
              title="Remove item"
            >
              <svg
                className="w-4 h-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Garment Options: Size and Color */}
          <div className="flex flex-wrap items-center gap-3 mt-2.5 text-xs text-neutral-600">
            <span className="inline-flex items-center gap-1.5 px-2 py-0.5 bg-neutral-100 border border-neutral-200 text-[11px] font-medium tracking-wider uppercase">
              Size: <strong className="text-neutral-900">{item.size || "M"}</strong>
            </span>

            <span className="inline-flex items-center gap-1.5 px-2 py-0.5 bg-neutral-100 border border-neutral-200 text-[11px] font-medium tracking-wider uppercase">
              Finish:{" "}
              <strong className="text-neutral-900">
                {item.color?.startsWith("#") ? "Noir" : item.color || "Noir"}
              </strong>
            </span>

            <span className="text-neutral-400 text-xs font-mono">
              {formatPrice(itemPrice)} each
            </span>
          </div>
        </div>

        {/* Bottom Bar: Quantity Stepper & Line Total */}
        <div className="flex items-center justify-between mt-4 pt-4 border-t border-neutral-100">
          {/* Stepper */}
          <div className="flex items-center gap-1">
            <span className="text-[11px] uppercase tracking-wider text-neutral-400 mr-2 hidden sm:inline">
              Qty:
            </span>
            <div className="flex items-center border border-neutral-300 bg-white">
              <button
                type="button"
                onClick={() => onUpdateQuantity(-1)}
                className="w-8 h-8 flex items-center justify-center text-neutral-600 hover:text-black hover:bg-neutral-100 transition-colors cursor-pointer text-sm font-medium"
                aria-label="Decrease quantity"
              >
                −
              </button>
              <span className="w-9 text-center text-xs font-bold font-mono text-neutral-900 select-none">
                {itemQuantity}
              </span>
              <button
                type="button"
                onClick={() => onUpdateQuantity(1)}
                className="w-8 h-8 flex items-center justify-center text-neutral-600 hover:text-black hover:bg-neutral-100 transition-colors cursor-pointer text-sm font-medium"
                aria-label="Increase quantity"
              >
                +
              </button>
            </div>

            <button
              type="button"
              onClick={onRemove}
              className="text-[11px] uppercase tracking-wider text-neutral-400 hover:text-neutral-900 underline ml-3 cursor-pointer"
            >
              Remove
            </button>
          </div>

          {/* Item Subtotal */}
          <div className="text-right">
            <span className="text-[10px] uppercase tracking-wider text-neutral-400 block sm:hidden">
              Total
            </span>
            <strong className="text-sm sm:text-base font-bold text-neutral-900 font-mono tracking-tight">
              {formatPrice(itemTotal)}
            </strong>
          </div>
        </div>
      </div>
    </article>
  )
}
