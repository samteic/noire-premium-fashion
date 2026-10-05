import { useShop } from "@/context/ShopContext"

export default function Toast() {
  const { toastMessage } = useShop()

  if (!toastMessage) return null

  return (
    <div className="fixed bottom-22 sm:bottom-24 right-6 z-50 animate-in fade-in slide-in-from-bottom-4 duration-200">
      <div
        className="bg-black text-white px-5 py-3 text-xs uppercase tracking-[2px] shadow-2xl flex items-center gap-3 border border-neutral-700"
        style={{ letterSpacing: "1.5px" }}
      >
        <span className="text-emerald-400 text-xs font-bold">✦</span>
        <span>{toastMessage}</span>
      </div>
    </div>
  )
}
