import { useRef, useEffect } from "react"
import { CURRENCIES, type CurrencyCode, useShop } from "@/context/ShopContext"

interface CurrencyDropdownProps {
  isOpen: boolean
  onClose: () => void
}

export default function CurrencyDropdown({
  isOpen,
  onClose,
}: CurrencyDropdownProps) {
  const { currency, setCurrency } = useShop()
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        onClose()
      }
    }
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside)
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div
      ref={dropdownRef}
      className="absolute right-0 top-full mt-3 w-48 bg-white border border-neutral-200 shadow-xl rounded-none py-2 z-50 animate-in fade-in zoom-in-95 duration-150"
      style={{ letterSpacing: "1.5px" }}
    >
      <div className="px-4 py-2 border-b border-neutral-100 text-[10px] uppercase font-bold text-neutral-400">
        Select Currency
      </div>
      {(Object.keys(CURRENCIES) as CurrencyCode[]).map((code) => {
        const item = CURRENCIES[code]
        const isSelected = currency === code
        return (
          <button
            key={code}
            type="button"
            className={`w-full text-left px-4 py-2.5 text-xs flex items-center justify-between transition-colors ${
              isSelected
                ? "bg-neutral-100 font-bold text-black"
                : "hover:bg-neutral-50 text-neutral-600"
            }`}
            onClick={() => {
              setCurrency(code)
              onClose()
            }}
          >
            <span>{item.code}</span>
            <span className="text-neutral-400 text-[11px] font-mono">
              {item.symbol}
            </span>
          </button>
        )
      })}
    </div>
  )
}
