import { useShop } from "@/context/ShopContext"

export default function WhatsAppConcierge() {
  const { showToast } = useShop()

  const handleClick = () => {
    showToast("Connecting to NOIRÉ on WhatsApp...")
    const message = encodeURIComponent(
      "Hello NOIRÉ, I would like personal assistance with my order and sizing."
    )
    window.open(
      `https://wa.me/33142680000?text=${message}`,
      "_blank",
      "noopener,noreferrer"
    )
  }

  return (
    <aside className="group fixed bottom-6 right-6 z-40 flex items-center select-none" aria-label="WhatsApp Support">
      {/* Tooltip on hover */}
      <span className="pointer-events-none mr-3 hidden sm:inline-block opacity-0 translate-x-2 transition-all duration-300 ease-out group-hover:opacity-100 group-hover:translate-x-0 bg-black text-white text-[11px] font-semibold uppercase tracking-[1.5px] px-3.5 py-1.5 rounded-full shadow-xl border border-neutral-700 whitespace-nowrap">
        Chat with us
      </span>

      {/* Round Animated WhatsApp Button */}
      <button
        type="button"
        onClick={handleClick}
        className="group relative flex items-center justify-center w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-[#25D366] text-white shadow-[0_6px_20px_rgba(37,211,102,0.4)] hover:shadow-[0_10px_30px_rgba(37,211,102,0.6)] transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:scale-110 active:scale-95 cursor-pointer whatsapp-float-button"
        aria-label="Chat with NOIRÉ on WhatsApp"
        title="Chat with NOIRÉ on WhatsApp"
      >
        {/* WhatsApp Official Clean Vector Icon */}
        <svg
          className="w-7 h-7 sm:w-7.5 sm:h-7.5 fill-white transition-transform duration-300 group-hover:scale-105"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.03 14.69 2 12.04 2ZM12.05 20.15C10.57 20.15 9.12 19.75 7.85 19L7.55 18.82L4.43 19.64L5.26 16.6L5.07 16.29C4.24 14.97 3.81 13.46 3.81 11.91C3.81 7.37 7.5 3.68 12.04 3.68C14.25 3.68 16.31 4.54 17.87 6.1C19.42 7.66 20.28 9.72 20.28 11.92C20.28 16.46 16.59 20.15 12.05 20.15ZM16.56 14.36C16.31 14.23 15.09 13.63 14.86 13.55C14.63 13.46 14.47 13.42 14.3 13.67C14.14 13.91 13.67 14.47 13.53 14.63C13.39 14.79 13.25 14.81 13 14.69C12.75 14.56 11.95 14.3 11 13.45C10.26 12.79 9.76 11.97 9.62 11.72C9.48 11.47 9.6 11.34 9.73 11.22C9.84 11.11 9.98 10.93 10.1 10.79C10.22 10.65 10.26 10.54 10.34 10.38C10.42 10.22 10.38 10.07 10.32 9.95C10.26 9.83 9.77 8.63 9.57 8.13C9.37 7.65 9.17 7.71 9.02 7.71C8.88 7.7 8.71 7.7 8.55 7.7C8.38 7.7 8.12 7.76 7.89 8.01C7.66 8.26 7.02 8.86 7.02 10.08C7.02 11.3 7.91 12.48 8.03 12.64C8.16 12.81 9.78 15.31 12.27 16.38C12.86 16.64 13.32 16.79 13.68 16.9C14.27 17.09 14.81 17.06 15.24 17C15.72 16.93 16.71 16.4 16.91 15.82C17.12 15.24 17.12 14.75 17.06 14.65C17 14.54 16.82 14.48 16.56 14.36Z" />
        </svg>
      </button>
    </aside>
  )
}
