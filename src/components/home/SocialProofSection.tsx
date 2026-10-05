import { ASSETS_PATH } from "@/data/products"
import { useShop } from "@/context/ShopContext"

const PRESS_ACCOLADES = [
  {
    publication: "VOGUE",
    quote:
      "The pinnacle of contemporary quiet luxury and impeccable silhouettes.",
  },
  {
    publication: "GQ",
    quote:
      "Flawless architectural cuts tailored from the world's finest organic cottons.",
  },
  {
    publication: "NUMÉRO",
    quote:
      "Redefining modern luxury craft with unmatched textile precision.",
  },
  {
    publication: "HARPER'S BAZAAR",
    quote: "Subtle, discreet, and unequivocally timeless wardrobe essentials.",
  },
]

const INSTAGRAM_POSTS = [
  {
    image: "/assets/products/trench_front.jpg",
    handle: "@julian.v",
    city: "Paris, FR",
    look: "Double-Faced Cashmere Trench",
    price: "$2,450",
    target: "product?name=Double-Faced%20Cashmere%20Trench",
  },
  {
    image: "/assets/products/smoking_front.jpg",
    handle: "@elena.mode",
    city: "Milan, IT",
    look: "Raw-Edge Smoking Jacket",
    price: "$2,100",
    target: "product?name=Raw-Edge%20Italian%20Crepe%20Smoking%20Jacket",
  },
  {
    image: "/assets/products/blazer_front.jpg",
    handle: "@soren.style",
    city: "Stockholm, SE",
    look: "Structured Wool Blazer",
    price: "$1,650",
    target: "product?name=Sculptural%20Wool%20Gabardine%20Blazer",
  },
  {
    image: "/assets/products/gown_front.jpg",
    handle: "@charlotte_b",
    city: "London, UK",
    look: "Silk Column Gown",
    price: "$1,850",
    target: "product?name=Sculptural%20Silk%20Column%20Gown",
  },
  {
    image: "/assets/products/merino_front.jpg",
    handle: "@kenzo.style",
    city: "Tokyo, JP",
    look: "Seamless Merino Mock-Neck",
    price: "$580",
    target: "product?name=Seamless%20Fine%20Merino%20Mock-Neck",
  },
]

const REVIEWS = [
  {
    quote:
      "The drape of the seersucker and the interior French seams are astonishing. You can immediately feel the exceptional standard in every detail.",
    author: "Maximilian V.",
    location: "Zurich, Switzerland",
    verified: "Verified Collector • 4 Pieces",
  },
  {
    quote:
      "Arrived in the discreet Noiré rigid gift box with certificate of provenance. The fit is true to size and extraordinarily flattering.",
    author: "Claire D.",
    location: "London, United Kingdom",
    verified: "Verified Collector • 2 Pieces",
  },
  {
    quote:
      "Zero branding, pure silhouette. In an era of loud logos, NOIRÉ represents what authentic quiet luxury ought to be.",
    author: "Henri L.",
    location: "Paris, France",
    verified: "VIP Member",
  },
]

export default function SocialProofSection() {
  const { showToast } = useShop()

  return (
    <section className="social-proof-section section-shell py-16 sm:py-24 border-t border-neutral-200/80 bg-neutral-50/50">
      {/* 1. Global Press Marquee */}
      <div className="max-w-6xl mx-auto mb-16 sm:mb-20">
        <span className="text-[10px] sm:text-[11px] uppercase tracking-[3px] font-bold text-neutral-400 block text-center mb-8">
          ✦ Selected Editorial Acclaim
        </span>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {PRESS_ACCOLADES.map((item) => (
            <div
              key={item.publication}
              className="text-center p-4 sm:p-5 bg-white border border-neutral-200/70 shadow-xs hover:shadow-md transition-all duration-300 group"
            >
              <h4 className="font-serif font-black tracking-[3px] text-xs sm:text-sm text-neutral-900 group-hover:text-black mb-2 transition-colors">
                {item.publication}
              </h4>
              <p className="text-[11px] leading-relaxed text-neutral-500 italic">
                “{item.quote}”
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* 2. Instagram & Community Styling Section */}
      <div className="max-w-6xl mx-auto mb-20 sm:mb-24">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 text-[10px] uppercase font-bold tracking-[2.5px] text-neutral-400 mb-1">
              <span>✦ Living Archives</span>
              <span>•</span>
              <span>#NoireFashion</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold uppercase tracking-[2px] text-neutral-900">
              Curated Community Styling
            </h2>
          </div>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-[2px] font-semibold text-neutral-800 hover:text-black transition-colors self-start sm:self-auto group"
            onClick={(e) => {
              e.preventDefault()
              showToast("Following @noire.fashion on Instagram")
              window.open(
                "https://instagram.com",
                "_blank",
                "noopener,noreferrer",
              )
            }}
          >
            <span>Follow @noire.fashion</span>
            <span className="group-hover:translate-x-1 transition-transform">
              ↗
            </span>
          </a>
        </div>

        {/* 5-Column Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
          {INSTAGRAM_POSTS.map((post, idx) => (
            <div
              key={post.handle + idx}
              className="group relative aspect-[3/4] overflow-hidden bg-neutral-200 border border-neutral-200 cursor-pointer shadow-xs hover:shadow-xl transition-all duration-500"
              onClick={() => {
                window.location.hash = post.target
              }}
            >
              <img
                src={post.image.startsWith("http") || post.image.startsWith("/") ? post.image : `${ASSETS_PATH}/${post.image}`}
                alt={`${post.handle} styling`}
                className="w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-110"
              />

              {/* Hover Dark Vignette Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-3.5 text-white">
                <div className="flex items-center justify-between">
                  <span className="text-[9px] uppercase tracking-wider font-semibold bg-white/20 backdrop-blur-xs px-2 py-0.5 rounded-full">
                    {post.city}
                  </span>
                  <span className="text-sm opacity-80">↗</span>
                </div>

                <div>
                  <strong className="block text-[11px] font-semibold tracking-wider mb-0.5">
                    {post.handle}
                  </strong>
                  <p className="text-[10px] text-white/75 truncate mb-2">
                    {post.look} • {post.price}
                  </p>
                  <button
                    type="button"
                    className="w-full py-2 bg-white !text-black text-[9.5px] uppercase font-bold tracking-[1.5px] hover:bg-neutral-100 transition-colors shadow-md cursor-pointer"
                    style={{ color: "#000000" }}
                    onClick={(e) => {
                      e.stopPropagation()
                      window.location.hash = post.target
                    }}
                  >
                    <span style={{ color: "#000000" }} className="font-bold text-black">
                      Shop This Silhouette
                    </span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 3. Verified Client Reviews & Collector Feedback */}
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10">
          <span className="text-[10px] uppercase font-bold tracking-[3px] text-neutral-400 block mb-2">
            ✦ Client Testimonials
          </span>
          <h3 className="text-xl sm:text-2xl font-bold uppercase tracking-[2px] text-neutral-900">
            Collector Experiences
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {REVIEWS.map((review, i) => (
            <div
              key={i}
              className="bg-white p-6 sm:p-7 border border-neutral-200/80 shadow-xs flex flex-col justify-between hover:border-black transition-colors duration-300"
            >
              <div className="flex items-center gap-1 text-amber-500 text-xs mb-3">
                {"★★★★★"}
              </div>
              <p className="text-xs sm:text-[13px] leading-relaxed text-neutral-700 italic mb-6">
                “{review.quote}”
              </p>
              <div className="border-t border-neutral-100 pt-4 flex items-center justify-between">
                <div>
                  <strong className="block text-xs font-bold uppercase tracking-wider text-black">
                    {review.author}
                  </strong>
                  <span className="text-[10px] text-neutral-400">
                    {review.location}
                  </span>
                </div>
                <span className="text-[9px] uppercase font-semibold tracking-wider text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200/60">
                  {review.verified}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
