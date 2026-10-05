import { useState, useRef, useEffect, useMemo } from "react"
import ProductDetailHeader from "@/components/layout/ProductDetailHeader"
import SizeGuideModal from "@/components/product/SizeGuideModal"
import {
  ASSETS_PATH,
  catalogProducts,
  detailColors,
  detailSizes,
} from "@/data/products"
import { useShop } from "@/context/ShopContext"
import { getWhatsAppInquiryUrl } from "@/utils/whatsapp"

export default function ProductDetailPage() {
  const [currentHash, setCurrentHash] = useState(() =>
    typeof window !== "undefined" ? window.location.hash : ""
  )

  useEffect(() => {
    const handleHash = () => setCurrentHash(window.location.hash)
    window.addEventListener("hashchange", handleHash)
    return () => window.removeEventListener("hashchange", handleHash)
  }, [])

  const activeProduct = useMemo(() => {
    const queryPart = currentHash.includes("?") ? currentHash.split("?")[1] : ""
    const params = new URLSearchParams(queryPart)
    const requestedName = params.get("name")
    if (requestedName) {
      const match = catalogProducts.find((p) => p.name.toLowerCase() === requestedName.toLowerCase())
      if (match) return match
    }
    return catalogProducts[0]
  }, [currentHash])

  const productViews = useMemo(() => {
    if (activeProduct.views && activeProduct.views.length > 0) {
      return activeProduct.views
    }
    return [
      activeProduct.image,
      activeProduct.hoverImage || activeProduct.image,
    ]
  }, [activeProduct])

  const [selectedImage, setSelectedImage] = useState(productViews[0])
  const [selectedSize, setSelectedSize] = useState("M")
  const [selectedColor, setSelectedColor] = useState(activeProduct.color || "#111111")
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false)

  // Update selectedImage when product changes and reset scroll to top
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" })
    setSelectedImage(productViews[0])
    setSelectedColor(activeProduct.color || "#111111")
  }, [activeProduct, productViews])

  // Loupe magnifier state
  const [loupe, setLoupe] = useState<{
    show: boolean
    x: number
    y: number
    bgX: number
    bgY: number
  }>({ show: false, x: 0, y: 0, bgX: 50, bgY: 50 })

  const imageContainerRef = useRef<HTMLDivElement>(null)

  const { toggleWishlist, isInWishlist, formatPrice, addToCart, showToast } = useShop()
  const isWishlisted = isInWishlist(activeProduct.name)
  const numericPrice = parseInt(activeProduct.price.replace(/[^0-9]/g, "")) || 990

  const [matchingSize, setMatchingSize] = useState("M")
  const [addedPieceAnim, setAddedPieceAnim] = useState(false)

  const matchingPiece = useMemo(() => {
    if (activeProduct.name.toLowerCase().includes("trouser")) {
      return {
        name: "Double-Faced Cashmere Trench",
        category: "Outerwear",
        price: 2450,
        image: "/assets/products/trench_front.jpg",
        desc: "Relaxed Fit • Cashmere",
      }
    }
    return {
      name: "Pleated High-Rise Fluid Trousers",
      category: "Trousers",
      price: 890,
      image: "/assets/863fb.png",
      desc: "High-Rise Wide-Leg Cut",
    }
  }, [activeProduct])

  const fullOutfitWhatsAppUrl = `https://wa.me/33142680000?text=${encodeURIComponent(
    `Hello NOIRÉ Atelier, I would like to inquire about ordering the complete outfit: ${activeProduct.name} (Size ${selectedSize}) + ${matchingPiece.name} (Size ${matchingSize}).`
  )}`

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!imageContainerRef.current) return
    const rect = imageContainerRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    if (x < 0 || y < 0 || x > rect.width || y > rect.height) {
      setLoupe((prev) => ({ ...prev, show: false }))
      return
    }

    const bgX = (x / rect.width) * 100
    const bgY = (y / rect.height) * 100

    setLoupe({
      show: true,
      x,
      y,
      bgX,
      bgY,
    })
  }

  const handleMouseLeave = () => {
    setLoupe((prev) => ({ ...prev, show: false }))
  }

  const handleAddMatchingPiece = () => {
    // Add piece without opening the cart/checkout drawer to keep the browsing flow seamless
    addToCart(
      {
        name: matchingPiece.name,
        price: matchingPiece.price,
        image: matchingPiece.image,
        size: matchingSize,
      },
      false
    )
    setAddedPieceAnim(true)
    setTimeout(() => setAddedPieceAnim(false), 2500)
    showToast(`✓ Added "${matchingPiece.name}" (${matchingSize}) to your bag`)
  }

  const [addedMainAnim, setAddedMainAnim] = useState(false)
  const [activeTab, setActiveTab] = useState<"details" | "shipping" | null>(null)

  const handleAddToCart = () => {
    addToCart(
      {
        name: activeProduct.name,
        price: numericPrice,
        image: selectedImage,
        size: selectedSize,
      },
      false
    )
    setAddedMainAnim(true)
    setTimeout(() => setAddedMainAnim(false), 2500)
    showToast(`✓ Added "${activeProduct.name}" (${selectedSize}) to your bag`)
  }

  const mainImgSrc =
    selectedImage.startsWith("http") || selectedImage.startsWith("/")
      ? selectedImage
      : `${ASSETS_PATH}/${selectedImage}`

  return (
    <main className="product-detail-page page-transition pb-24 sm:pb-32">
      <ProductDetailHeader />

      {/* Spacious, Elegant Breadcrumb Navigation */}
      <nav className="max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12 py-6 sm:py-8 flex items-center justify-between text-[11px] tracking-[2px] uppercase text-neutral-400">
        <div className="flex items-center gap-2.5">
          <a
            href="#products"
            className="hover:text-black transition-colors font-medium flex items-center gap-1.5"
          >
            <span>←</span> <span>All Ready-To-Wear</span>
          </a>
          <span className="text-neutral-300">/</span>
          <span className="text-neutral-500">{activeProduct.category}</span>
          <span className="text-neutral-300">/</span>
          <span className="text-neutral-900 font-semibold truncate max-w-[200px] sm:max-w-none">
            {activeProduct.name}
          </span>
        </div>
        <div className="hidden sm:flex items-center gap-2 text-[10px] tracking-[2px] text-neutral-400">
          <span>Ref. N-0{productViews.length}42</span>
        </div>
      </nav>

      <section className="detail-content">
        {/* Left Column: Visual Showcase Gallery (Image + Thumbnails underneath) */}
        <div className="detail-gallery">
          {/* Main Image with Fabric Loupe */}
          <div
            ref={imageContainerRef}
            className="detail-main-image relative cursor-crosshair overflow-hidden group select-none bg-neutral-100"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            <img
              src={mainImgSrc}
              alt={activeProduct.name}
              className="w-full h-full object-cover transition-transform duration-300"
              style={{ objectPosition: activeProduct.position || "50% 20%" }}
            />

            {/* Circular Fabric Loupe / Texture Magnifier */}
            {loupe.show && (
              <div
                className="absolute pointer-events-none rounded-full border-2 border-white shadow-[0_10px_35px_rgba(0,0,0,0.35)] z-20 hidden md:block"
                style={{
                  width: "160px",
                  height: "160px",
                  left: `${loupe.x - 80}px`,
                  top: `${loupe.y - 80}px`,
                  backgroundImage: `url(${mainImgSrc})`,
                  backgroundPosition: `${loupe.bgX}% ${loupe.bgY}%`,
                  backgroundSize: "320%",
                  backgroundRepeat: "no-repeat",
                }}
              />
            )}

            {/* Subtle, Minimal View Indicator */}
            <div className="absolute top-4 right-4 bg-white/85 backdrop-blur-md text-neutral-800 text-[10px] tracking-[2px] px-3 py-1 font-medium rounded-full border border-black/5 shadow-2xs pointer-events-none select-none">
              {`0${productViews.indexOf(selectedImage) + 1} / 0${productViews.length}`}
            </div>
          </div>

          {/* Clean, Roomy Thumbnails Rail */}
          <div className="detail-thumbnails" aria-label="Product views">
            {productViews.map((image, idx) => {
              const isSelected = selectedImage === image
              return (
                <button
                  type="button"
                  className={`transition-all duration-200 cursor-pointer overflow-hidden bg-neutral-100 relative group/thumb rounded-xs aspect-[3/4] ${
                    isSelected
                      ? "active ring-1 ring-black ring-offset-2 opacity-100"
                      : "opacity-60 hover:opacity-100"
                  }`}
                  onClick={() => setSelectedImage(image)}
                  key={`${image}-${idx}`}
                  title={`View angle ${idx + 1}`}
                >
                  <img
                    src={image.startsWith("http") || image.startsWith("/") ? image : `${ASSETS_PATH}/${image}`}
                    alt=""
                    className="w-full h-full object-cover"
                    style={{ objectPosition: activeProduct.position || "50% 20%" }}
                  />
                </button>
              )
            })}
          </div>
        </div>

        {/* Right Column: Product Details & Purchase Suite */}
        <section className="detail-info lg:sticky lg:top-28">
          {/* Eyebrow & Wishlist */}
          <div className="flex items-center justify-between">
            <span className="text-[11px] uppercase tracking-[3px] font-medium text-neutral-400">
              NOIRÉ ATELIER • {activeProduct.category.toUpperCase()}
            </span>

            <button
              className={`p-2 -mr-2 cursor-pointer transition-all hover:scale-110 active:scale-95 ${
                isWishlisted ? "opacity-100 text-red-500" : "opacity-40 hover:opacity-100"
              }`}
              type="button"
              aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
              onClick={() =>
                toggleWishlist({
                  id: `prod-${activeProduct.name}`,
                  name: activeProduct.name,
                  price: numericPrice,
                  image: selectedImage,
                  category: activeProduct.category,
                })
              }
              title={isWishlisted ? "In your wishlist" : "Save to wishlist"}
            >
              <img src={`${ASSETS_PATH}/9c374.svg`} alt="" className="w-5 h-5" />
            </button>
          </div>

          {/* Garment Title */}
          <h1 className="text-3xl sm:text-[34px] font-bold tracking-tight text-neutral-900 leading-[1.2] mt-2">
            {activeProduct.name}
          </h1>

          {/* Price & Delivery Note */}
          <div className="mt-3 flex items-baseline gap-3">
            <strong className="text-2xl sm:text-[28px] font-bold text-neutral-900 tracking-tight">
              {formatPrice(numericPrice)}
            </strong>
            <span className="text-xs text-neutral-400 font-normal">Taxes included</span>
          </div>

          <p className="text-xs text-neutral-500 mt-2 font-normal">
            Complimentary Express Courier • Worldwide Delivery
          </p>

          {/* Garment Description */}
          <p className="text-sm leading-relaxed text-neutral-600 mt-6 font-normal">
            {activeProduct.fit ? `${activeProduct.fit}. ` : ""}
            Designed and tailored in our Paris studio using natural high-grade fibers. Clean, fluid drape with hand-finished edges.
          </p>

          {/* Color Selector */}
          <div className="mt-8 pt-7 border-t border-neutral-100">
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase font-bold tracking-[1.5px] text-neutral-900">
                Color —{" "}
                <span className="font-normal text-neutral-500">
                  {selectedColor === "#111111"
                    ? "Obsidian Noir"
                    : selectedColor === "#282725"
                    ? "Charcoal"
                    : selectedColor === "#7a6b5d"
                    ? "Espresso"
                    : "Bone"}
                </span>
              </span>
            </div>
            <div className="flex items-center gap-3.5 mt-3.5">
              {detailColors.map((color) => (
                <button
                  type="button"
                  aria-label={`Select color ${color}`}
                  aria-pressed={selectedColor === color}
                  onClick={() => setSelectedColor(color)}
                  style={{
                    background: color,
                    outline: selectedColor === color ? "2px solid black" : undefined,
                    outlineOffset: "3px",
                  }}
                  key={color}
                  className="w-7 h-7 rounded-full border border-black/10 cursor-pointer transition-transform hover:scale-110 active:scale-95"
                />
              ))}
            </div>
          </div>

          {/* Size Selector */}
          <div className="mt-7">
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase font-bold tracking-[1.5px] text-neutral-900">
                Size — <span className="font-normal text-neutral-500">{selectedSize}</span>
              </span>
              <button
                type="button"
                className="text-[11px] text-neutral-500 underline hover:text-black cursor-pointer transition-colors uppercase tracking-wider font-semibold"
                onClick={() => setIsSizeGuideOpen(true)}
              >
                Size Guide ↗
              </button>
            </div>
            <div className="grid grid-cols-5 gap-2.5 mt-3.5">
              {detailSizes.map((size) => (
                <button
                  type="button"
                  aria-pressed={selectedSize === size}
                  onClick={() => setSelectedSize(size)}
                  key={size}
                  className={`h-11 sm:h-12 text-xs font-semibold uppercase border transition-all cursor-pointer rounded-xs flex items-center justify-center ${
                    selectedSize === size
                      ? "bg-black text-white border-black"
                      : "bg-white text-neutral-800 border-neutral-200 hover:border-black"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Action Buttons: Clean, Clear, Uncongested */}
          <div className="mt-8 space-y-3">
            {/* Primary Action: Direct WhatsApp Order / Inquiry */}
            <a
              href={getWhatsAppInquiryUrl(activeProduct.name, selectedSize, formatPrice(numericPrice))}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full h-13 sm:h-14 bg-[#25D366] hover:bg-[#20ba5a] text-black font-extrabold text-xs uppercase tracking-[2px] transition-all flex items-center justify-center gap-3 rounded-xs shadow-sm hover:shadow-md cursor-pointer active:scale-[0.99]"
            >
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.03 14.69 2 12.04 2ZM12.05 20.15C10.57 20.15 9.12 19.75 7.85 19L7.55 18.82L4.43 19.64L5.26 16.6L5.07 16.29C4.24 14.97 3.81 13.46 3.81 11.91C3.81 7.37 7.5 3.68 12.04 3.68C14.25 3.68 16.31 4.54 17.87 6.1C19.42 7.66 20.28 9.72 20.28 11.92C20.28 16.46 16.59 20.15 12.05 20.15ZM16.56 14.36C16.31 14.23 15.09 13.63 14.86 13.55C14.63 13.46 14.47 13.42 14.3 13.67C14.14 13.91 13.67 14.47 13.53 14.63C13.39 14.79 13.25 14.81 13 14.69C12.75 14.56 11.95 14.3 11 13.45C10.26 12.79 9.76 11.97 9.62 11.72C9.48 11.47 9.6 11.34 9.73 11.22C9.84 11.11 9.98 10.93 10.1 10.79C10.22 10.65 10.26 10.54 10.34 10.38C10.42 10.22 10.38 10.07 10.32 9.95C10.26 9.83 9.77 8.63 9.57 8.13C9.37 7.65 9.17 7.71 9.02 7.71C8.88 7.7 8.71 7.7 8.55 7.7C8.38 7.7 8.12 7.76 7.89 8.01C7.66 8.26 7.02 8.86 7.02 10.08C7.02 11.3 7.91 12.48 8.03 12.64C8.16 12.81 9.78 15.31 12.27 16.38C12.86 16.64 13.32 16.79 13.68 16.9C14.27 17.09 14.81 17.06 15.24 17C15.72 16.93 16.71 16.4 16.91 15.82C17.12 15.24 17.12 14.75 17.06 14.65C17 14.54 16.82 14.48 16.56 14.36Z" />
              </svg>
              <span>Inquire on WhatsApp (Size {selectedSize})</span>
            </a>

            {/* Secondary Action: Add to Bag */}
            <button
              type="button"
              onClick={handleAddToCart}
              className="w-full h-12 bg-black hover:bg-neutral-800 text-white font-semibold text-xs uppercase tracking-[2px] rounded-xs flex items-center justify-center gap-2 transition-all cursor-pointer shadow-xs active:scale-[0.99]"
            >
              <span>{addedMainAnim ? "✓ Added to Bag!" : `+ Add to Bag — ${formatPrice(numericPrice)}`}</span>
            </button>

            <p className="text-[11px] text-neutral-400 text-center pt-1 font-normal">
              Direct atelier size guidance, custom fitting & instant order assistance
            </p>
          </div>

          {/* Atelier Accordion Tabs: Clean Hairline Dividers (Closed by default) */}
          <div className="mt-9 border-t border-b border-neutral-200/80 divide-y divide-neutral-200/60">
            {/* Tab 1: Fabric & Fit */}
            <div>
              <button
                type="button"
                onClick={() => setActiveTab(activeTab === "details" ? null : "details")}
                className="w-full py-4 flex items-center justify-between text-left cursor-pointer group"
              >
                <span className="text-xs font-semibold uppercase tracking-[1.5px] text-neutral-800 group-hover:text-black">
                  Product Details & Sizing
                </span>
                <span className="text-neutral-400 group-hover:text-black text-sm font-semibold transition-transform duration-200">
                  {activeTab === "details" ? "−" : "+"}
                </span>
              </button>
              {activeTab === "details" && (
                <div className="pb-5 pt-1 text-xs text-neutral-600 space-y-2.5">
                  <div className="flex justify-between py-1 border-b border-neutral-100">
                    <span className="font-medium text-neutral-800">Model Measurement</span>
                    <span>178 cm / 5&apos;10&quot; • Wearing Size S</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-neutral-100">
                    <span className="font-medium text-neutral-800">Silhouette</span>
                    <span>Regular atelier fit, true to size</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-neutral-100">
                    <span className="font-medium text-neutral-800">Composition</span>
                    <span>100% Quality Double-Faced Fibers</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="font-medium text-neutral-800">Craftsmanship</span>
                    <span>Tailored in Paris, France</span>
                  </div>
                </div>
              )}
            </div>

            {/* Tab 2: Shipping & Returns */}
            <div>
              <button
                type="button"
                onClick={() => setActiveTab(activeTab === "shipping" ? null : "shipping")}
                className="w-full py-4 flex items-center justify-between text-left cursor-pointer group"
              >
                <span className="text-xs font-semibold uppercase tracking-[1.5px] text-neutral-800 group-hover:text-black">
                  Complimentary Shipping & Returns
                </span>
                <span className="text-neutral-400 group-hover:text-black text-sm font-semibold transition-transform duration-200">
                  {activeTab === "shipping" ? "−" : "+"}
                </span>
              </button>
              {activeTab === "shipping" && (
                <div className="pb-5 pt-1 text-xs text-neutral-600 space-y-2.5">
                  <div className="flex justify-between py-1 border-b border-neutral-100">
                    <span className="font-medium text-neutral-800">Express Delivery</span>
                    <span>Complimentary express courier (2–4 business days)</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-neutral-100">
                    <span className="font-medium text-neutral-800">Packaging</span>
                    <span>Signature NOIRÉ gift box & dustbag</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="font-medium text-neutral-800">Exchanges</span>
                    <span>30-Day complimentary worldwide returns</span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Luxury Atelier Guarantee */}
          <div className="mt-6 pt-5 border-t border-neutral-200/80 text-[10px] uppercase tracking-wider text-neutral-400 space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-black font-bold">✦</span>
              <span>Complimentary Noiré Gift Box & Dustbag</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-black font-bold">✦</span>
              <span>30-Day Complimentary Exchanges Worldwide</span>
            </div>
          </div>
        </section>
      </section>

      {/* Editorial Curated Look / Complete The Outfit (Full-Width, Spacious & Uncongested) */}
      <section className="max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12 mt-16 sm:mt-24 pt-16 border-t border-neutral-200/80">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-2">
          <div>
            <span className="text-[10px] uppercase tracking-[3px] font-bold text-neutral-400">
              Curated Atelier Pairing
            </span>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-neutral-900 uppercase mt-1">
              Complete The Look
            </h2>
          </div>
          <p className="text-xs text-neutral-500 max-w-sm">
            Hand-selected pieces tailored to complement the {activeProduct.name} with effortless Parisian elegance.
          </p>
        </div>

        {/* Pairing Showcase Card with Generous Breathing Room */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 items-center bg-neutral-50/70 p-6 sm:p-10 border border-neutral-200/70 rounded-xs">
          {/* Piece Image */}
          <div className="md:col-span-5 lg:col-span-4 aspect-[3/4] max-h-[460px] overflow-hidden bg-white border border-neutral-200 rounded-xs">
            <a
              href={`#product?name=${encodeURIComponent(matchingPiece.name)}`}
              className="block w-full h-full group/look overflow-hidden cursor-pointer"
            >
              <img
                src={matchingPiece.image}
                alt={matchingPiece.name}
                className="w-full h-full object-cover object-top group-hover/look:scale-105 transition-transform duration-500"
              />
            </a>
          </div>

          {/* Piece Details & Seamless Add to Bag */}
          <div className="md:col-span-7 lg:col-span-8 space-y-6">
            <div>
              <span className="text-[11px] uppercase tracking-[2px] font-bold text-neutral-400">
                {matchingPiece.category.toUpperCase()}
              </span>
              <h3 className="text-2xl sm:text-3xl font-bold text-neutral-900 tracking-tight mt-1">
                {matchingPiece.name}
              </h3>
              <p className="text-xl font-bold text-neutral-900 mt-2">
                {formatPrice(matchingPiece.price)}
              </p>
            </div>

            <p className="text-sm text-neutral-600 leading-relaxed max-w-lg">
              {matchingPiece.desc}. Crafted from matching atelier fabric to seamlessly integrate with your wardrobe.
            </p>

            {/* Size Selector for the Matching Piece */}
            <div>
              <span className="text-xs uppercase tracking-wider font-semibold text-neutral-700 block mb-2.5">
                Size: <span className="font-bold text-black">{matchingSize}</span>
              </span>
              <div className="flex items-center gap-2">
                {["XS", "S", "M", "L", "XL"].map((sz) => (
                  <button
                    key={sz}
                    type="button"
                    onClick={() => setMatchingSize(sz)}
                    className={`w-11 h-10 text-xs font-semibold uppercase border transition-all cursor-pointer rounded-xs flex items-center justify-center ${
                      matchingSize === sz
                        ? "bg-black text-white border-black"
                        : "bg-white text-neutral-700 border-neutral-300 hover:border-black"
                    }`}
                  >
                    {sz}
                  </button>
                ))}
              </div>
            </div>

            {/* Actions: Clean & Simple (No second WhatsApp button!) */}
            <div className="pt-2 flex flex-col sm:flex-row gap-3 w-full sm:max-w-md">
              <button
                type="button"
                onClick={handleAddMatchingPiece}
                className="w-full sm:flex-1 h-12 min-h-[48px] px-6 bg-black hover:bg-neutral-800 text-white text-xs uppercase tracking-[2px] font-bold transition-all rounded-xs cursor-pointer shadow-xs active:scale-[0.99] flex items-center justify-center gap-2"
              >
                <span>{addedPieceAnim ? "✓ Added to Bag!" : `+ Add Piece to Bag (Size ${matchingSize})`}</span>
              </button>

              <a
                href={`#product?name=${encodeURIComponent(matchingPiece.name)}`}
                className="w-full sm:flex-1 h-12 min-h-[48px] px-6 bg-white hover:bg-neutral-100 text-neutral-900 border border-neutral-300 text-xs uppercase tracking-[1.5px] font-bold transition-all rounded-xs flex items-center justify-center text-center hover:border-black"
              >
                View Piece →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Sizing Measurement Modal */}
      <SizeGuideModal
        isOpen={isSizeGuideOpen}
        onClose={() => setIsSizeGuideOpen(false)}
      />
    </main>
  )
}
