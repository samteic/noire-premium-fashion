import { useState, useEffect } from "react"
import { useShop } from "@/context/ShopContext"

export default function AccountModal() {
  const { isAccountOpen, setIsAccountOpen, showToast } = useShop()
  const [tab, setTab] = useState<"signin" | "register">("signin")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  useEffect(() => {
    if (isAccountOpen) {
      document.body.style.overflow = "hidden"
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") setIsAccountOpen(false)
      }
      window.addEventListener("keydown", handleKeyDown)
      return () => {
        document.body.style.overflow = ""
        window.removeEventListener("keydown", handleKeyDown)
      }
    } else {
      document.body.style.overflow = ""
    }
  }, [isAccountOpen, setIsAccountOpen])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return
    showToast(
      tab === "signin"
        ? `Welcome back, ${email.split("@")[0]}`
        : "Account registered successfully",
    )
    setIsAccountOpen(false)
  }

  return (
    <div
      className={`luxury-drawer-root ${
        isAccountOpen ? "is-open" : ""
      } flex items-center justify-center p-4`}
      aria-hidden={!isAccountOpen}
    >
      <div
        className="luxury-drawer-backdrop"
        onClick={() => setIsAccountOpen(false)}
      />
      <div
        className="luxury-modal-content relative z-10 w-full max-w-md bg-white border border-neutral-300 p-8 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
        style={{ letterSpacing: "1px" }}
      >
        <button
          type="button"
          className="absolute top-5 right-5 text-neutral-400 hover:text-black transition-colors text-xl font-light leading-none cursor-pointer"
          onClick={() => setIsAccountOpen(false)}
          aria-label="Close"
        >
          ✕
        </button>

        <div className="text-center mb-6">
          <span className="text-[10px] uppercase font-bold tracking-[3px] text-neutral-400 block mb-1">
            NOIRÉ PRIVÉ
          </span>
          <h2 className="text-xl font-bold uppercase tracking-[2px]">
            {tab === "signin" ? "Member Sign In" : "Create Account"}
          </h2>
        </div>

        <div className="flex border-b border-neutral-200 mb-6 text-xs uppercase tracking-wider">
          <button
            type="button"
            className={`flex-1 py-3 text-center transition-colors cursor-pointer ${
              tab === "signin"
                ? "border-b-2 border-black font-bold text-black"
                : "text-neutral-400 hover:text-black"
            }`}
            onClick={() => setTab("signin")}
          >
            Sign In
          </button>
          <button
            type="button"
            className={`flex-1 py-3 text-center transition-colors cursor-pointer ${
              tab === "register"
                ? "border-b-2 border-black font-bold text-black"
                : "text-neutral-400 hover:text-black"
            }`}
            onClick={() => setTab("register")}
          >
            Register
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-[11px] uppercase tracking-wider text-neutral-500 mb-1">
              Email Address
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="client@noire.com"
              className="w-full px-3 py-2.5 border border-neutral-300 text-base sm:text-sm outline-none focus:border-black transition-colors"
            />
          </div>

          <div>
            <label className="block text-[11px] uppercase tracking-wider text-neutral-500 mb-1">
              Password
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-3 py-2.5 border border-neutral-300 text-base sm:text-sm outline-none focus:border-black transition-colors"
            />
          </div>

          <div className="flex items-center justify-between text-[11px] text-neutral-500 pt-1">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" className="accent-black" />
              <span>Remember me</span>
            </label>
            <a
              href="#top"
              className="underline hover:text-black"
              onClick={(e) => e.preventDefault()}
            >
              Forgot password?
            </a>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-black text-white text-xs uppercase tracking-[2px] font-semibold hover:bg-neutral-800 transition-colors cursor-pointer mt-4"
          >
            <span className="text-white">
              {tab === "signin" ? "Sign In" : "Join NOIRÉ"}
            </span>
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-neutral-100 flex items-center justify-around text-[10px] text-neutral-400 uppercase tracking-widest">
          <span>VIP Concierge</span>
          <span>•</span>
          <span>Complimentary Delivery</span>
          <span>•</span>
          <span>Discreet Packaging</span>
        </div>
      </div>
    </div>
  )
}
