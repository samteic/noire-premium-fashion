import { useState, useEffect } from "react"
import { useShop } from "@/context/ShopContext"

const ANNOUNCEMENTS = [
  {
    desktop: "✦ Complimentary Worldwide Express Courier on Orders Over $300",
    mobile: "✦ Free Express Courier Over $300",
  },
  {
    desktop: "✦ Designed in Paris • High Quality Natural Fibers",
    mobile: "✦ Paris Atelier Quality",
  },
  {
    desktop: "✦ Free 30-Day Exchanges & Returns Worldwide",
    mobile: "✦ Free 30-Day Exchanges",
  },
  {
    desktop: "✦ Direct Orders & Size Advice via WhatsApp",
    mobile: "✦ Direct Orders via WhatsApp",
  },
]

export default function AnnouncementTicker() {
  const [index, setIndex] = useState(0)
  const [visible, setVisible] = useState(true)
  const [animating, setAnimating] = useState(false)

  useEffect(() => {
    const timer = setInterval(() => {
      setAnimating(true)
      setTimeout(() => {
        setIndex((prev) => (prev + 1) % ANNOUNCEMENTS.length)
        setAnimating(false)
      }, 300)
    }, 4500)

    return () => clearInterval(timer)
  }, [])

  if (!visible) return null

  return (
    <aside
      className="bg-black text-white/90 text-[9.5px] sm:text-[11px] tracking-[1.5px] sm:tracking-[2px] uppercase border-b border-white/10 select-none relative z-50 h-7 sm:h-8 flex items-center px-3 sm:px-4 overflow-hidden transition-all duration-300"
      aria-label="NOIRÉ Announcements"
    >
      <div className="flex-1 flex items-center justify-center text-center overflow-hidden min-w-0">
        <span
          className={`transition-all duration-300 transform font-medium whitespace-nowrap truncate px-1 ${
            animating ? "opacity-0 -translate-y-2" : "opacity-100 translate-y-0"
          }`}
        >
          <span className="hidden sm:inline">
            {ANNOUNCEMENTS[index].desktop}
          </span>
          <span className="inline sm:hidden">
            {ANNOUNCEMENTS[index].mobile}
          </span>
        </span>
      </div>

      <div className="flex items-center gap-2 text-[9px] tracking-[2px] opacity-90 flex-shrink-0">
        <button
          type="button"
          className="hover:opacity-100 cursor-pointer text-xs leading-none p-1 text-white/70 hover:text-white"
          onClick={() => setVisible(false)}
          aria-label="Dismiss banner"
          title="Dismiss"
        >
          ✕
        </button>
      </div>
    </aside>
  )
}
