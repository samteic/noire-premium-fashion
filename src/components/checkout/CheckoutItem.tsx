import { ASSETS_PATH } from "@/data/products"
import { useShop } from "@/context/ShopContext"
import type { CartItemType } from "@/types"

interface CheckoutItemProps {
  item: CartItemType
}

export default function CheckoutItem({ item }: CheckoutItemProps) {
  const { formatPrice } = useShop()
  const itemPrice = item.price || 199
  const itemQuantity = item.quantity || 1
  const itemTotal = itemPrice * itemQuantity

  const imageSrc =
    item.image.startsWith("http") || item.image.startsWith("/")
      ? item.image
      : `${ASSETS_PATH}/${item.image}`

  return (
    <article className="flex items-center gap-3.5 py-3 border-b border-neutral-100 last:border-b-0">
      {/* Thumbnail with quantity indicator badge */}
      <div className="relative w-14 h-18 bg-neutral-100 border border-neutral-200 flex-shrink-0 overflow-hidden">
        <img
          src={imageSrc}
          alt={item.name}
          className="w-full h-full object-cover object-center"
        />
        <span className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-black text-white text-[10px] font-bold rounded-full flex items-center justify-center font-mono shadow-xs">
          {itemQuantity}
        </span>
      </div>

      {/* Garment Details */}
      <div className="flex-1 min-w-0 pr-2">
        <h4 className="text-xs font-semibold text-neutral-900 truncate tracking-wide">
          {item.name}
        </h4>
        <div className="flex items-center gap-2 text-[10px] uppercase text-neutral-400 mt-1">
          <span>
            Size: <strong className="text-neutral-700">{item.size || "M"}</strong>
          </span>
          <span>•</span>
          <span>
            Color:{" "}
            <strong className="text-neutral-700">
              {item.color?.startsWith("#") ? "Noir" : item.color || "Noir"}
            </strong>
          </span>
        </div>
      </div>

      {/* Item Calculated Total */}
      <div className="text-right flex-shrink-0">
        <strong className="text-xs font-bold font-mono text-neutral-900">
          {formatPrice(itemTotal)}
        </strong>
      </div>
    </article>
  )
}
