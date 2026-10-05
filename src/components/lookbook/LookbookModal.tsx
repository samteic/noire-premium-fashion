import { useState, useEffect } from "react"
import { createPortal } from "react-dom"
import { ASSETS_PATH } from "@/data/products"
import { useShop } from "@/context/ShopContext"

interface LookbookModalProps {
  isOpen: boolean
  onClose: () => void
  initialLook?: number
}

const LOOKBOOK_ITEMS = [
  {
    lookNumber: "01",
    title: "Double-Faced Cashmere Silhouette",
    location: "Palais-Royal, Paris",
    fabric: "580gsm Double-Faced Virgin Wool & Mongolian Cashmere",
    image: "/assets/products/trench_front.jpg",
    pieces: [
      { name: "Double-Faced Cashmere Trench", price: 2450, target: "product" },
      { name: "Pleated Fluid Wool Trousers", price: 890, target: "products" },
    ],
  },
  {
    lookNumber: "02",
    title: "Heron Embroidered Minimalist Silhouette",
    location: "Via Montenapoleone, Milan",
    fabric: "280 GSM Mercerized Organic Cotton & Botanical Embroidery",
    image: "/assets/7488e.png",
    pieces: [
      { name: "Heron Embroidered Minimalist Tee", price: 460, target: "products" },
      { name: "Pleated High-Rise Fluid Trousers", price: 890, target: "products" },
    ],
  },
  {
    lookNumber: "03",
    title: "Tailored Navy Poplin Silhouette",
    location: "Gamla Stan, Stockholm",
    fabric: "Giza Egyptian Cotton Poplin & Mother-of-Pearl Placket",
    image: "/assets/f1432.png",
    pieces: [
      { name: "Tailored Navy Poplin Shirt", price: 680, target: "products" },
      { name: "Pleated High-Rise Fluid Trousers", price: 890, target: "products" },
    ],
  },
  {
    lookNumber: "04",
    title: "Textured Waffle Knit & Trousers",
    location: "Aoyama, Tokyo",
    fabric: "High-Twist Organic Cotton & Mulberry Silk Waffle Weave",
    image: "/assets/c5a30.png",
    pieces: [
      { name: "Textured Waffle Knit Crewneck", price: 750, target: "products" },
      { name: "Pleated High-Rise Fluid Trousers", price: 890, target: "products" },
    ],
  },
]

export default function LookbookModal({
  isOpen,
  onClose,
  initialLook = 0,
}: LookbookModalProps) {
  const [currentIdx, setCurrentIdx] = useState(initialLook)
  const { addToCart, showToast } = useShop()

  useEffect(() => {
    setCurrentIdx(initialLook)
  }, [initialLook])

  // Lock body scroll and handle keyboard events
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") onClose()
        if (e.key === "ArrowRight") {
          setCurrentIdx((prev) => (prev + 1) % LOOKBOOK_ITEMS.length)
        }
        if (e.key === "ArrowLeft") {
          setCurrentIdx(
            (prev) => (prev - 1 + LOOKBOOK_ITEMS.length) % LOOKBOOK_ITEMS.length,
          )
        }
      }
      window.addEventListener("keydown", handleKeyDown)
      return () => {
        document.body.style.overflow = ""
        window.removeEventListener("keydown", handleKeyDown)
      }
    } else {
      document.body.style.overflow = ""
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  const look = LOOKBOOK_ITEMS[currentIdx]

  return createPortal(
    <div
      className="fixed inset-0 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-200"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: "100vw",
        height: "100vh",
        zIndex: 99999,
      }}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Lookbook Campaign Modal"
    >
      <div
        className="relative w-full max-w-5xl bg-neutral-900 border border-neutral-800 shadow-2xl overflow-hidden flex flex-col md:flex-row max-h-[92vh] animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 z-30 w-9 h-9 rounded-full bg-black/60 hover:bg-black text-white flex items-center justify-center text-lg transition-colors cursor-pointer border border-white/20"
          aria-label="Close Lookbook Modal"
        >
          ✕
        </button>

        {/* Large Editorial Image Viewport */}
        <div className="relative flex-1 bg-black min-h-[350px] md:min-h-[580px] overflow-hidden flex items-center justify-center">
          <img
            src={
              look.image.startsWith("http") || look.image.startsWith("/")
                ? look.image
                : `${ASSETS_PATH}/${look.image}`
            }
            alt={look.title}
            className="w-full h-full object-cover max-h-[70vh] md:max-h-full"
          />

          {/* Look Number Watermark */}
          <div className="absolute bottom-4 left-4 bg-black/70 backdrop-blur-xs px-3.5 py-1.5 border border-white/20 text-white text-xs font-mono font-bold tracking-widest uppercase">
            Look {look.lookNumber} / 0{LOOKBOOK_ITEMS.length}
          </div>

          {/* Navigation Arrows */}
          <button
            type="button"
            onClick={() =>
              setCurrentIdx(
                (prev) =>
                  (prev - 1 + LOOKBOOK_ITEMS.length) % LOOKBOOK_ITEMS.length,
              )
            }
            className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/70 hover:bg-black text-white flex items-center justify-center border border-white/20 transition-all cursor-pointer hover:scale-105"
            aria-label="Previous Look"
          >
            ←
          </button>
          <button
            type="button"
            onClick={() =>
              setCurrentIdx((prev) => (prev + 1) % LOOKBOOK_ITEMS.length)
            }
            className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/70 hover:bg-black text-white flex items-center justify-center border border-white/20 transition-all cursor-pointer hover:scale-105"
            aria-label="Next Look"
          >
            →
          </button>
        </div>

        {/* Look Meta & Shop the Look Details */}
        <div className="w-full md:w-88 p-6 sm:p-8 bg-neutral-950 text-white flex flex-col justify-between overflow-y-auto">
          <div>
            <span className="text-[10px] uppercase font-bold tracking-[3px] text-neutral-400 block mb-2">
              ✦ SS24 Runway Archive
            </span>
            <h3 className="text-xl font-extrabold uppercase tracking-[2px] leading-snug mb-2 text-white">
              {look.title}
            </h3>
            <p className="text-xs text-neutral-400 mb-1">
              Location: {look.location}
            </p>
            <p className="text-[11px] text-neutral-500 italic mb-6">
              {look.fabric}
            </p>

            {/* Shop the Pieces in This Look */}
            <div className="space-y-3 pt-4 border-t border-neutral-800">
              <span className="text-[10px] uppercase font-bold tracking-[2px] text-neutral-400 block mb-2">
                Pieces in this Silhouette:
              </span>
              {look.pieces.map((piece, i) => (
                <div
                  key={i}
                  className="p-3 bg-neutral-900 border border-neutral-800 flex items-center justify-between gap-3"
                >
                  <div className="min-w-0">
                    <h4 className="text-xs font-semibold text-white truncate">
                      {piece.name}
                    </h4>
                    <span className="text-xs text-neutral-400 font-mono">
                      ${piece.price}.00
                    </span>
                  </div>
                  <button
                    type="button"
                    className="px-3 py-1.5 bg-white !text-black text-[10px] uppercase font-bold tracking-wider hover:bg-neutral-200 transition-colors cursor-pointer flex-shrink-0"
                    style={{ color: "#000000" }}
                    onClick={() => {
                      addToCart({
                        name: piece.name,
                        price: piece.price,
                        image: look.image,
                      })
                      showToast(`Added ${piece.name} to Shopping Bag`)
                    }}
                  >
                    <span style={{ color: "#000000" }} className="text-black font-bold">+ Bag</span>
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Lookbook Thumbnails */}
          <div className="pt-6 border-t border-neutral-800 mt-6">
            <span className="text-[9.5px] uppercase font-bold tracking-[2px] text-neutral-500 block mb-2">
              Browse Campaign Looks:
            </span>
            <div className="flex gap-2">
              {LOOKBOOK_ITEMS.map((item, idx) => {
                const thumbSrc =
                  item.image.startsWith("http") || item.image.startsWith("/")
                    ? item.image
                    : `${ASSETS_PATH}/${item.image}`
                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setCurrentIdx(idx)}
                    className={`w-12 h-14 overflow-hidden border transition-all cursor-pointer ${
                      currentIdx === idx
                        ? "border-white ring-1 ring-white scale-105"
                        : "border-neutral-700 opacity-50 hover:opacity-100"
                    }`}
                  >
                    <img
                      src={thumbSrc}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                  </button>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.body
  )
}
