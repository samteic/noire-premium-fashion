export default function BrandStorySection() {
  return (
    <section
      className="brand-story-section section-shell py-20 sm:py-28 bg-white border-t border-neutral-200"
      id="story"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section Header with Simple, Clear Words */}
        <div className="text-center max-w-2xl mx-auto mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 text-[10px] uppercase font-bold tracking-[2px] text-neutral-400 mb-3">
            <span>✦ ABOUT NOIRÉ</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold uppercase tracking-[2px] leading-tight text-neutral-900 mb-6">
            Simple, Quality Fashion
          </h2>
          <p className="text-xs sm:text-sm leading-relaxed text-neutral-600 font-sans">
            Founded in Paris, NOIRÉ makes modern clothing designed to last. We focus on quality fabrics, comfortable fit, and clean design.
          </p>
        </div>

        {/* 3 Simple Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-10 mb-20">
          {/* Pillar 1 */}
          <div className="p-8 bg-neutral-50/70 border border-neutral-200/80 hover:border-black transition-colors duration-300 flex flex-col justify-between">
            <div>
              <span className="text-xs font-mono font-bold text-neutral-400 block mb-4">
                01 / FABRICS
              </span>
              <h3 className="text-base font-bold uppercase tracking-wider text-black mb-3">
                Quality Materials
              </h3>
              <p className="text-xs leading-relaxed text-neutral-600 font-sans">
                We select soft cashmere, pure wool, and fine cotton from trusted mills in France and Italy for lasting comfort and durability.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-neutral-200 text-[10px] uppercase tracking-wider text-neutral-400 font-semibold">
              ✦ 100% Natural Fibers
            </div>
          </div>

          {/* Pillar 2 */}
          <div className="p-8 bg-neutral-50/70 border border-neutral-200/80 hover:border-black transition-colors duration-300 flex flex-col justify-between">
            <div>
              <span className="text-xs font-mono font-bold text-neutral-400 block mb-4">
                02 / TAILORING
              </span>
              <h3 className="text-base font-bold uppercase tracking-wider text-black mb-3">
                Made in Small Batches
              </h3>
              <p className="text-xs leading-relaxed text-neutral-600 font-sans">
                Each piece is carefully cut and stitched by experienced tailors in our studio with clean seams and natural shoulder drape.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-neutral-200 text-[10px] uppercase tracking-wider text-neutral-400 font-semibold">
              ✦ Studio Hand-Finished
            </div>
          </div>

          {/* Pillar 3 */}
          <div className="p-8 bg-neutral-50/70 border border-neutral-200/80 hover:border-black transition-colors duration-300 flex flex-col justify-between">
            <div>
              <span className="text-xs font-mono font-bold text-neutral-400 block mb-4">
                03 / LONGEVITY
              </span>
              <h3 className="text-base font-bold uppercase tracking-wider text-black mb-3">
                Built to Last
              </h3>
              <p className="text-xs leading-relaxed text-neutral-600 font-sans">
                We design timeless pieces that you can wear season after season. Every order includes lifetime care advice and repair support.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-neutral-200 text-[10px] uppercase tracking-wider text-neutral-400 font-semibold">
              ✦ Free Seam Repair
            </div>
          </div>
        </div>

        {/* Visual Story Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-neutral-900 text-white p-8 sm:p-12 md:p-16 border border-neutral-800 shadow-2xl">
          <div className="lg:col-span-7 space-y-6">
            <span className="text-[10px] uppercase tracking-[2px] font-bold text-neutral-400 block">
              ✦ OUR PHILOSOPHY
            </span>
            <blockquote className="text-lg sm:text-2xl font-serif italic text-neutral-200 leading-snug">
              “True luxury is about well-made clothes that fit comfortably and look effortless.”
            </blockquote>
            <p className="text-xs sm:text-[13px] text-neutral-400 leading-relaxed max-w-xl font-sans">
              From our studio in Paris to customers worldwide, NOIRÉ believes in clean aesthetics. No loud logos, just great fabric, clean lines, and an honest fit.
            </p>

            {/* Metric Counters */}
            <div className="grid grid-cols-3 gap-6 pt-6 border-t border-neutral-800">
              <div>
                <strong className="block text-2xl sm:text-3xl font-mono font-bold text-white">
                  100%
                </strong>
                <span className="text-[10px] uppercase tracking-wider text-neutral-400">
                  Natural Fibers
                </span>
              </div>
              <div>
                <strong className="block text-2xl sm:text-3xl font-mono font-bold text-white">
                  Paris
                </strong>
                <span className="text-[10px] uppercase tracking-wider text-neutral-400">
                  Studio Design
                </span>
              </div>
              <div>
                <strong className="block text-2xl sm:text-3xl font-mono font-bold text-white">
                  Zero
                </strong>
                <span className="text-[10px] uppercase tracking-wider text-neutral-400">
                  Plastic Bags
                </span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 grid grid-cols-2 gap-3 sm:gap-4">
            <div className="aspect-[3/4] overflow-hidden border border-neutral-800 bg-neutral-950">
              <img
                src="https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=800&q=85"
                alt="NOIRÉ Atelier Fabric"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="aspect-[3/4] overflow-hidden border border-neutral-800 bg-neutral-950 mt-6">
              <img
                src="https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=800&q=85"
                alt="NOIRÉ Tailoring"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
