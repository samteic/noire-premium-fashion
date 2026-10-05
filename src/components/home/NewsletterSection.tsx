import { useState, type FormEvent } from "react"
import { useShop } from "@/context/ShopContext"

export default function NewsletterSection() {
  const [email, setEmail] = useState("")
  const [preference, setPreference] = useState<"all" | "men" | "women">("all")
  const [isSubmitted, setIsSubmitted] = useState(false)
  const { showToast } = useShop()

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (!email.trim() || !email.includes("@")) {
      showToast("Please enter a valid email address")
      return
    }

    setIsSubmitted(true)
    showToast("Welcome to NOIRÉ VIP • Privilege Code: NOIRE-10")
  }

  return (
    <section className="newsletter-section section-shell py-20 sm:py-28 bg-neutral-950 text-white relative overflow-hidden">
      {/* Subtle luxury background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-neutral-800/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-3xl mx-auto text-center relative z-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/20 bg-white/5 text-[9.5px] uppercase tracking-[3px] font-bold text-neutral-300 mb-6">
          <span className="text-amber-400 text-[9px]">✦</span>
          <span>The NOIRÉ Circle</span>
        </div>

        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold uppercase tracking-[2.5px] leading-tight text-white mb-4">
          Private Archive Access
        </h2>

        <p className="text-xs sm:text-sm text-neutral-400 max-w-xl mx-auto leading-relaxed mb-8">
          Join our membership to receive discreet invitations to limited seasonal drops, private collection archives, and complimentary worldwide express delivery on your initial order.
        </p>

        {isSubmitted ? (
          <div className="bg-white/10 border border-white/20 p-6 sm:p-8 rounded-sm max-w-md mx-auto animate-in zoom-in-95 duration-300 text-center">
            <span className="text-2xl block mb-2">✦</span>
            <h3 className="text-sm font-bold uppercase tracking-[2px] text-white mb-2">
              Invitation Confirmed
            </h3>
            <p className="text-xs text-neutral-300 leading-relaxed mb-4">
              Your membership has been registered. Enjoy 10% privilege on your first order with code:
            </p>
            <div className="inline-block px-4 py-2 bg-white text-black font-mono font-bold text-sm tracking-[2px] rounded-xs select-all">
              NOIRE-10
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="max-w-lg mx-auto space-y-4">
            {/* Preference Chips */}
            <div className="flex items-center justify-center gap-2 mb-2">
              {[
                { id: "all", label: "All Silhouettes" },
                { id: "men", label: "Menswear" },
                { id: "women", label: "Womenswear" },
              ].map((chip) => {
                const isActive = preference === chip.id
                return (
                  <button
                    key={chip.id}
                    type="button"
                    onClick={() => setPreference(chip.id as "all" | "men" | "women")}
                    className={`px-3 py-1 text-[10px] uppercase tracking-[1.5px] rounded-full border transition-all cursor-pointer ${
                      isActive
                        ? "border-white bg-white !text-black font-bold"
                        : "border-white/20 text-neutral-400 hover:border-white/60 hover:text-white"
                    }`}
                    style={{ color: isActive ? "#000000" : undefined }}
                  >
                    <span style={{ color: isActive ? "#000000" : undefined }}>
                      {chip.label}
                    </span>
                  </button>
                )
              })}
            </div>

            {/* Email Field & CTA */}
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                required
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 h-12 px-4 bg-white/5 border border-white/20 text-white placeholder-neutral-500 text-base sm:text-xs tracking-wider outline-none focus:border-white transition-colors"
                aria-label="Email address for newsletter"
              />
              <button
                type="submit"
                className="h-12 px-7 bg-white !text-black hover:bg-neutral-200 text-xs uppercase tracking-[2px] font-bold transition-all cursor-pointer shadow-md hover:shadow-lg flex-shrink-0"
                style={{ color: "#000000" }}
              >
                <span style={{ color: "#000000" }} className="text-black font-bold">
                  Join NOIRÉ VIP
                </span>
              </button>
            </div>

            {/* Micro Disclaimers */}
            <div className="flex items-center justify-center gap-4 text-[10px] text-neutral-500 uppercase tracking-widest pt-2">
              <span>✦ Express Delivery</span>
              <span>•</span>
              <span>No Spam, Only Archival Drops</span>
              <span>•</span>
              <span>Unsubscribe Anytime</span>
            </div>
          </form>
        )}
      </div>
    </section>
  )
}
