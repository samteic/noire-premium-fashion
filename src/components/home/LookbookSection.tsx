import { useState } from "react"
import { ASSETS_PATH } from "@/data/products"
import { useShop } from "@/context/ShopContext"
import LookbookModal from "@/components/lookbook/LookbookModal"

const LOOKS = [
  {
    lookNumber: "01",
    name: "The Double-Faced Cashmere Silhouette",
    season: "Autumn / Winter 2024",
    location: "Palais-Royal, Paris",
    image: "/assets/products/trench_front.jpg",
    description:
      "Engineered with 580gsm double-faced virgin wool and Mongolian cashmere. Unlined for natural weight and effortless architectural movement.",
    hotspots: [
      {
        top: "35%",
        left: "48%",
        label: "Double-Faced Cashmere Trench • $2,450",
        target: "product",
      },
      {
        top: "68%",
        left: "55%",
        label: "Pleated Fluid Wool Trousers • $890",
        target: "products",
      },
    ],
    items: [
      { name: "Double-Faced Cashmere Trench", price: 2450, category: "Loro Piana Cashmere" },
      {
        name: "Pleated Fluid Wool Trousers",
        price: 890,
        category: "Virgin Wool Gabardine",
      },
    ],
  },
  {
    lookNumber: "02",
    name: "Heron Embroidered Minimalist Silhouette",
    season: "Permanent Wardrobe Capsule",
    location: "Via Montenapoleone, Milan",
    image: "/assets/7488e.png",
    description:
      "Heavyweight 280 GSM mercerized cotton jersey with hand-guided chain-stitch botanical embroidery, paired with pleated fluid trousers.",
    hotspots: [
      {
        top: "40%",
        left: "52%",
        label: "Heron Minimalist Tee • $460",
        target: "products",
      },
      {
        top: "70%",
        left: "46%",
        label: "Pleated Fluid Trousers • $890",
        target: "products",
      },
    ],
    items: [
      { name: "Heron Embroidered Minimalist Tee", price: 460, category: "Mercerized Jersey" },
      {
        name: "Pleated High-Rise Fluid Trousers",
        price: 890,
        category: "Worsted Wool",
      },
    ],
  },
  {
    lookNumber: "03",
    name: "Architectural Tailoring & Poplin Shirt",
    season: "Permanent Wardrobe Capsule",
    location: "Place Vendôme, Paris",
    image: "/assets/f1432.png",
    description:
      "Sharply tailored architectural collar shirt crafted from Giza Egyptian cotton with mother-of-pearl hardware.",
    hotspots: [
      {
        top: "35%",
        left: "50%",
        label: "Tailored Navy Poplin Shirt • $680",
        target: "products",
      },
      {
        top: "75%",
        left: "48%",
        label: "Pleated High-Rise Fluid Trousers • $890",
        target: "products",
      },
    ],
    items: [
      { name: "Tailored Navy Poplin Shirt", price: 680, category: "Giza Poplin" },
      { name: "Pleated High-Rise Fluid Trousers", price: 890, category: "Fine Worsted Wool" },
    ],
  },
]

export default function LookbookSection() {
  const [activeLookIndex, setActiveLookIndex] = useState(0)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [activeHotspot, setActiveHotspot] = useState<number | null>(null)
  const { addToCart, showToast } = useShop()

  const currentLook = LOOKS[activeLookIndex]

  return (
    <section
      className="lookbook-section section-shell py-20 sm:py-28 border-t border-neutral-200"
      id="lookbook"
    >
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div>
          <div className="flex items-center gap-2 text-[10px] uppercase font-bold tracking-[3px] text-neutral-400 mb-2">
            <span>✦ Editorial Campaign</span>
            <span>•</span>
            <span>Lookbook SS24</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold uppercase tracking-[2px] leading-tight text-neutral-900">
            Silent Archives
          </h2>
        </div>
        <div className="flex items-center gap-4">
          <button
            type="button"
            className="px-5 py-2.5 bg-black text-white hover:bg-neutral-800 text-xs uppercase tracking-[2px] font-semibold transition-all shadow-md cursor-pointer hover:shadow-lg flex items-center gap-2"
            onClick={() => setIsModalOpen(true)}
          >
            <span>Launch Full Campaign</span>
            <span>↗</span>
          </button>
        </div>
      </div>

      {/* Interactive Look Showcase Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        {/* Left: Interactive Image with Hotspots (7 Columns) */}
        <div className="lg:col-span-7 relative aspect-[3/4] sm:aspect-[4/5] bg-neutral-100 overflow-hidden border border-neutral-300 shadow-xl group">
          <img
            src={currentLook.image.startsWith("http") || currentLook.image.startsWith("/") ? currentLook.image : `${ASSETS_PATH}/${currentLook.image}`}
            alt={currentLook.name}
            className="w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-102"
          />

          {/* Look Index Tag */}
          <div className="absolute top-4 left-4 bg-black/80 backdrop-blur-xs px-3.5 py-1.5 text-white text-xs font-mono font-bold tracking-widest uppercase border border-white/20">
            Look {currentLook.lookNumber} / 0{LOOKS.length}
          </div>

          {/* Interactive Hotspots on the Garment */}
          {currentLook.hotspots.map((spot, idx) => (
            <div
              key={idx}
              className="absolute z-20 -translate-x-1/2 -translate-y-1/2"
              style={{ top: spot.top, left: spot.left }}
            >
              <button
                type="button"
                className="relative group/pin flex items-center justify-center cursor-pointer p-2"
                onClick={() =>
                  setActiveHotspot(activeHotspot === idx ? null : idx)
                }
                aria-label={`Hotspot for ${spot.label}`}
              >
                <span className="relative flex items-center justify-center w-5 h-5 rounded-full bg-black text-white border-2 border-white shadow-lg text-[10px] font-bold transition-transform duration-200 group-hover/pin:scale-110">
                  +
                </span>

                {/* Hotspot Floating Tooltip */}
                <div
                  className={`absolute left-7 top-1/2 -translate-y-1/2 whitespace-nowrap bg-black text-white text-[11px] font-medium tracking-wider px-3 py-1.5 shadow-2xl transition-all duration-200 border border-neutral-700 pointer-events-auto ${
                    activeHotspot === idx
                      ? "opacity-100 scale-100"
                      : "opacity-0 scale-95 pointer-events-none group-hover/pin:opacity-100 group-hover/pin:scale-100 group-hover/pin:pointer-events-auto"
                  }`}
                >
                  <span className="block">{spot.label}</span>
                  <span className="text-[9px] text-neutral-400 uppercase tracking-widest block mt-0.5 underline">
                    Click to view ↗
                  </span>
                </div>
              </button>
            </div>
          ))}

          {/* Slide Switchers */}
          <div className="absolute bottom-4 right-4 flex items-center gap-2 bg-white/90 backdrop-blur-xs p-1.5 border border-neutral-300 shadow-md">
            <button
              type="button"
              className="w-8 h-8 flex items-center justify-center hover:bg-black hover:text-white transition-colors cursor-pointer text-xs"
              onClick={() =>
                setActiveLookIndex(
                  (prev) => (prev - 1 + LOOKS.length) % LOOKS.length,
                )
              }
              aria-label="Previous Campaign Look"
            >
              ←
            </button>
            <span className="text-xs font-mono font-bold px-2">
              {currentLook.lookNumber} / 0{LOOKS.length}
            </span>
            <button
              type="button"
              className="w-8 h-8 flex items-center justify-center hover:bg-black hover:text-white transition-colors cursor-pointer text-xs"
              onClick={() =>
                setActiveLookIndex((prev) => (prev + 1) % LOOKS.length)
              }
              aria-label="Next Campaign Look"
            >
              →
            </button>
          </div>
        </div>

        {/* Right: Look Breakdown & Shop Pieces (5 Columns) */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
          <div>
            <div className="flex items-center gap-3 text-xs uppercase tracking-widest text-neutral-500 mb-2">
              <span>{currentLook.season}</span>
              <span>•</span>
              <span>{currentLook.location}</span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-extrabold uppercase tracking-[2px] leading-tight text-neutral-900 mb-4">
              {currentLook.name}
            </h3>

            <p className="text-xs sm:text-[13px] leading-relaxed text-neutral-600 mb-6">
              {currentLook.description}
            </p>

            {/* Pieces breakdown list */}
            <div className="space-y-3 pt-4 border-t border-neutral-200">
              <span className="text-[10px] uppercase font-bold tracking-[2px] text-neutral-400 block mb-1">
                Included in Silhouette:
              </span>
              {currentLook.items.map((item, idx) => (
                <div
                  key={idx}
                  className="p-3.5 bg-neutral-50 border border-neutral-200 flex items-center justify-between gap-3 hover:border-black transition-colors"
                >
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-black">
                      {item.name}
                    </h4>
                    <span className="text-[11px] text-neutral-500">
                      {item.category} • ${item.price}.00
                    </span>
                  </div>
                  <button
                    type="button"
                    className="px-4 py-2 bg-black text-white hover:bg-neutral-800 text-[10px] uppercase font-bold tracking-[1.5px] transition-all cursor-pointer shadow-xs hover:shadow-md flex-shrink-0"
                    onClick={() => {
                      addToCart({
                        name: item.name,
                        price: item.price,
                        image: currentLook.image,
                      })
                      showToast(`Added ${item.name} to Shopping Bag`)
                    }}
                  >
                    + Add to Bag
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Lookbook Navigation Dots */}
          <div className="flex items-center gap-3 pt-6 border-t border-neutral-200">
            {LOOKS.map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setActiveLookIndex(idx)}
                className={`h-1.5 transition-all duration-300 cursor-pointer ${
                  activeLookIndex === idx
                    ? "w-10 bg-black"
                    : "w-3 bg-neutral-300 hover:bg-neutral-500"
                }`}
                aria-label={`Switch to Look 0${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Full Campaign Modal */}
      <LookbookModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        initialLook={activeLookIndex}
      />
    </section>
  )
}
