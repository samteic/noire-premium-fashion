export default function HeroSection() {
  return (
    <section className="section-shell py-8 sm:py-12 lg:py-16 bg-white" id="top">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        {/* Left Column: Atelier Statement & Direct Action */}
        <div className="lg:col-span-5 flex flex-col justify-between h-full">
          <div>
            <div className="flex items-center gap-3 text-xs tracking-[2px] font-semibold text-neutral-400 mb-6">
              <span className="text-black">CLOTHING</span>
              <span>•</span>
              <span className="text-black">COATS</span>
              <span>•</span>
              <span className="text-black">SUITS</span>
            </div>

            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-neutral-200 bg-neutral-50 text-[10px] uppercase tracking-[2px] font-bold text-neutral-600 mb-4">
              <span>✦ NOIRÉ PARIS</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold uppercase tracking-[2px] leading-[0.95] text-neutral-900 mb-5">
              Luxury
              <br />
              Fashion
            </h1>

            <p className="text-xs sm:text-sm text-neutral-600 tracking-[1px] leading-relaxed max-w-md mb-8 font-sans">
              High quality clothing designed in Paris. Clean tailoring, premium fabrics, and timeless pieces made to fit you comfortably.
            </p>
          </div>

          {/* Primary Action Button */}
          <div className="max-w-md">
            <a
              href="#collection"
              className="w-full py-4 px-6 bg-black hover:bg-neutral-800 text-white text-xs font-semibold uppercase tracking-[2px] flex items-center justify-between transition-all cursor-pointer rounded-xs shadow-md hover:shadow-lg"
            >
              <span>View Collection</span>
              <span className="text-white text-base">↓</span>
            </a>
          </div>
        </div>

        {/* Right Gallery: Two Clean Fashion Images */}
        <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6">
          <div
            className="cursor-pointer group relative overflow-hidden bg-neutral-100 aspect-[3/4] rounded-xs shadow-md border border-neutral-200"
            onClick={() => {
              window.location.hash = "collection"
            }}
            title="View our collection"
          >
            <img
              src="/assets/products/trench_side.jpg"
              alt="Cashmere Trench Coat"
              className="w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500" />
            <div className="absolute bottom-4 left-4 bg-black/85 backdrop-blur-xs text-white text-[10px] uppercase tracking-[1.5px] px-3 py-1 font-semibold">
              Cashmere Trench Coat
            </div>
          </div>

          <div
            className="cursor-pointer group relative overflow-hidden bg-neutral-100 aspect-[3/4] rounded-xs shadow-md border border-neutral-200"
            onClick={() => {
              window.location.hash = `product?name=${encodeURIComponent("Double-Faced Cashmere Trench")}`
            }}
            title="View Double-Faced Cashmere Trench"
          >
            <img
              src="/assets/products/trench_front.jpg"
              alt="Tailored in Paris"
              className="w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
              style={{ objectPosition: "50% 20%" }}
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500" />
            <div className="absolute bottom-4 left-4 bg-black/85 backdrop-blur-xs text-white text-[10px] uppercase tracking-[1.5px] px-3 py-1 font-semibold">
              Tailored in Paris
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
