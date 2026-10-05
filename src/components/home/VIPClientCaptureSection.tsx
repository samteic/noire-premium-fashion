import { useState, type FormEvent } from "react"
import { useShop } from "@/context/ShopContext"
import { getGeneralWhatsAppUrl } from "@/utils/whatsapp"

export default function VIPClientCaptureSection() {
  const [fullName, setFullName] = useState("")
  const [email, setEmail] = useState("")
  const [whatsappNumber, setWhatsappNumber] = useState("")
  const [interest, setInterest] = useState<"All" | "Outerwear" | "Tailoring" | "Evening">("All")
  const [isRegistered, setIsRegistered] = useState(false)
  const { showToast } = useShop()

  const handleRegister = (e: FormEvent) => {
    e.preventDefault()
    if (!email.trim() || !email.includes("@")) {
      showToast("Please enter a valid email address.")
      return
    }

    setIsRegistered(true)
    showToast(`Welcome to NOIRÉ Private Register, ${fullName || "Client"}.`)
  }

  const interests: Array<"All" | "Outerwear" | "Tailoring" | "Evening"> = [
    "All",
    "Outerwear",
    "Tailoring",
    "Evening",
  ]

  return (
    <section
      id="vip-access"
      className="section-shell py-20 sm:py-28 bg-[#0a0a0a] text-white relative overflow-hidden"
    >
      {/* Background Ambience */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-neutral-800/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-2xl mx-auto text-center relative z-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-neutral-700 bg-neutral-900/90 text-[10px] uppercase tracking-[3px] font-bold text-neutral-300 mb-6">
          <span className="text-amber-400">✦</span>
          <span>Customer Capture • Private Client Register</span>
        </div>

        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold uppercase tracking-[2px] leading-tight text-white mb-4">
          Private Archive Access
        </h2>

        <p className="text-xs sm:text-sm text-neutral-400 max-w-lg mx-auto leading-relaxed mb-8">
          Join our client register for private collection allocations, unlisted showroom garments, and personal invitations to Paris & London fitting salons.
        </p>

        {isRegistered ? (
          <div className="p-8 border border-neutral-700 bg-neutral-900/80 rounded-xs shadow-2xl text-center space-y-4 animate-in zoom-in-95 duration-300">
            <span className="text-2xl text-[#25D366] block">✓</span>
            <span className="text-[10px] uppercase font-bold tracking-[3px] text-neutral-400 block">
              Private Register Activated
            </span>
            <h3 className="text-lg sm:text-xl font-bold uppercase tracking-[2px] text-white">
              Welcome, {fullName || "Distinguished Client"}
            </h3>
            <p className="text-xs text-neutral-300 max-w-sm mx-auto leading-relaxed">
              Your dossier has been registered with our Paris atelier. You now have priority allocation for limited drops.
            </p>

            <div className="p-4 bg-black/60 border border-neutral-800 rounded-xs text-left max-w-xs mx-auto space-y-1.5 font-mono text-xs">
              <div className="flex justify-between text-neutral-400 text-[10px] uppercase">
                <span>Client ID</span>
                <span className="text-white font-bold">NOIRE-{Math.floor(10000 + Math.random() * 90000)}</span>
              </div>
              <div className="flex justify-between text-neutral-400 text-[10px] uppercase">
                <span>Privilege Code</span>
                <span className="text-[#25D366] font-bold">NOIRE-PRIVILEGE</span>
              </div>
              <div className="flex justify-between text-neutral-400 text-[10px] uppercase">
                <span>Preference</span>
                <span className="text-white">{interest}</span>
              </div>
            </div>

            <a
              href={getGeneralWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-4 px-6 py-3 bg-[#25D366] text-black text-xs font-bold uppercase tracking-[1.5px] rounded-xs transition-all hover:bg-[#20ba5a] cursor-pointer"
            >
              <span>Connect with your Personal Stylist</span>
              <span>→</span>
            </a>
          </div>
        ) : (
          <form onSubmit={handleRegister} className="text-left space-y-4 max-w-md mx-auto">
            {/* Preferred Wardrobe Interest */}
            <div>
              <label className="block text-[10px] uppercase font-bold tracking-[2px] text-neutral-400 mb-2 text-center">
                Select Wardrobe Interest
              </label>
              <div className="grid grid-cols-4 gap-1.5">
                {interests.map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => setInterest(item)}
                    className={`py-2 text-[10px] font-semibold uppercase tracking-wider border rounded-xs transition-all cursor-pointer text-center ${
                      interest === item
                        ? "bg-white text-black border-white font-bold"
                        : "bg-black/50 text-neutral-400 border-neutral-800 hover:border-neutral-600 hover:text-white"
                    }`}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>

            {/* Client Full Name */}
            <div>
              <label className="block text-[10px] uppercase font-bold tracking-[2px] text-neutral-400 mb-1">
                Client Name
              </label>
              <input
                type="text"
                required
                placeholder="Lord / Lady / First & Last Name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full h-11 px-3.5 bg-neutral-900/90 border border-neutral-700 text-white placeholder-neutral-500 text-base sm:text-xs tracking-wider outline-none focus:border-white transition-colors rounded-xs"
              />
            </div>

            {/* Email Address */}
            <div>
              <label className="block text-[10px] uppercase font-bold tracking-[2px] text-neutral-400 mb-1">
                Discreet Email Address
              </label>
              <input
                type="email"
                required
                placeholder="client@domain.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full h-11 px-3.5 bg-neutral-900/90 border border-neutral-700 text-white placeholder-neutral-500 text-base sm:text-xs tracking-wider outline-none focus:border-white transition-colors rounded-xs"
              />
            </div>

            {/* Optional WhatsApp Number */}
            <div>
              <label className="block text-[10px] uppercase font-bold tracking-[2px] text-neutral-400 mb-1">
                Mobile WhatsApp (Optional for drop alerts)
              </label>
              <input
                type="tel"
                placeholder="+1 / +44 / +33 (Optional)"
                value={whatsappNumber}
                onChange={(e) => setWhatsappNumber(e.target.value)}
                className="w-full h-11 px-3.5 bg-neutral-900/90 border border-neutral-700 text-white placeholder-neutral-500 text-base sm:text-xs tracking-wider outline-none focus:border-white transition-colors rounded-xs"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-4 mt-2 bg-white text-black hover:bg-neutral-200 text-xs uppercase tracking-[2px] font-bold transition-all duration-300 rounded-xs shadow-md hover:shadow-lg cursor-pointer"
            >
              Request Private Archive Access
            </button>

            <p className="text-[10px] text-neutral-500 text-center uppercase tracking-widest pt-2">
              Discreet Communication • Zero Spam • Strict Privacy Policy
            </p>
          </form>
        )}
      </div>
    </section>
  )
}
