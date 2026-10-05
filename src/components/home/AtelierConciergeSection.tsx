import { getGeneralWhatsAppUrl } from "@/utils/whatsapp"

export default function AtelierConciergeSection() {
  const whatsappUrl = getGeneralWhatsAppUrl()

  const conciergeServices = [
    {
      step: "01",
      title: "Direct WhatsApp Chat",
      desc: "Ask questions, request additional photos, or get advice on any garment directly from our team in Paris.",
    },
    {
      step: "02",
      title: "Personal Size & Fit Advice",
      desc: "Tell us your measurements and we will help you choose the exact right size before you order.",
    },
    {
      step: "03",
      title: "Free Express Delivery",
      desc: "Complimentary worldwide shipping with tracking and signature black gift packaging.",
    },
    {
      step: "04",
      title: "Easy 30-Day Exchanges",
      desc: "Shop with peace of mind. If the fit is not ideal, exchanges are completely free.",
    },
  ]

  return (
    <section
      id="concierge"
      className="section-shell py-20 sm:py-28 bg-[#111111] text-white relative overflow-hidden"
    >
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-8 border-b border-neutral-800 gap-6">
          <div>
            <div className="inline-flex items-center px-3 py-1 rounded-full border border-neutral-700 bg-neutral-900/80 text-[10px] uppercase tracking-[2px] font-bold text-neutral-300 mb-4">
              <span>WHATSAPP SUPPORT</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold uppercase tracking-[2px] leading-tight text-white">
              How to Order on WhatsApp
            </h2>
            <p className="text-xs sm:text-sm text-neutral-400 mt-2 max-w-xl leading-relaxed font-sans">
              Ordering is personal and direct. Click any piece in our collection, choose your size, and chat with us on WhatsApp to order or ask any questions.
            </p>
          </div>

          <div className="flex-shrink-0">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-8 py-4 bg-white hover:bg-neutral-200 text-black text-xs font-bold uppercase tracking-[2px] transition-all duration-300 rounded-xs shadow-md hover:scale-[1.02] active:scale-95 cursor-pointer"
            >
              <svg className="w-5 h-5 fill-[#25D366]" viewBox="0 0 24 24">
                <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.03 14.69 2 12.04 2ZM12.05 20.15C10.57 20.15 9.12 19.75 7.85 19L7.55 18.82L4.43 19.64L5.26 16.6L5.07 16.29C4.24 14.97 3.81 13.46 3.81 11.91C3.81 7.37 7.5 3.68 12.04 3.68C14.25 3.68 16.31 4.54 17.87 6.1C19.42 7.66 20.28 9.72 20.28 11.92C20.28 16.46 16.59 20.15 12.05 20.15ZM16.56 14.36C16.31 14.23 15.09 13.63 14.86 13.55C14.63 13.46 14.47 13.42 14.3 13.67C14.14 13.91 13.67 14.47 13.53 14.63C13.39 14.79 13.25 14.81 13 14.69C12.75 14.56 11.95 14.3 11 13.45C10.26 12.79 9.76 11.97 9.62 11.72C9.48 11.47 9.6 11.34 9.73 11.22C9.84 11.11 9.98 10.93 10.1 10.79C10.22 10.65 10.26 10.54 10.34 10.38C10.42 10.22 10.38 10.07 10.32 9.95C10.26 9.83 9.77 8.63 9.57 8.13C9.37 7.65 9.17 7.71 9.02 7.71C8.88 7.7 8.71 7.7 8.55 7.7C8.38 7.7 8.12 7.76 7.89 8.01C7.66 8.26 7.02 8.86 7.02 10.08C7.02 11.3 7.91 12.48 8.03 12.64C8.16 12.81 9.78 15.31 12.27 16.38C12.86 16.64 13.32 16.79 13.68 16.9C14.27 17.09 14.81 17.06 15.24 17C15.72 16.93 16.71 16.4 16.91 15.82C17.12 15.24 17.12 14.75 17.06 14.65C17 14.54 16.82 14.48 16.56 14.36Z" />
              </svg>
              <span>Chat with us on WhatsApp</span>
            </a>
          </div>
        </div>

        {/* 4 Simple Points */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {conciergeServices.map((svc) => (
            <div
              key={svc.step}
              className="p-6 border border-neutral-800/80 bg-neutral-900/40 hover:border-neutral-600 transition-all duration-300"
            >
              <span className="text-xs font-mono font-bold text-neutral-500 block mb-3">
                {svc.step}
              </span>
              <h3 className="text-sm font-bold uppercase tracking-wider text-white mb-2">
                {svc.title}
              </h3>
              <p className="text-xs text-neutral-400 leading-relaxed font-sans">
                {svc.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Live Status Indicator */}
        <div className="mt-12 pt-6 border-t border-neutral-800/80 flex flex-col sm:flex-row items-center justify-between text-[11px] text-neutral-400 gap-3">
          <div className="flex items-center gap-2">
            <span className="uppercase tracking-[1.5px] font-semibold text-neutral-300">
              Paris Team Online
            </span>
            <span className="text-neutral-600">•</span>
            <span>Typical reply within a few minutes</span>
          </div>

          <div className="text-neutral-500">
            Paris Studio • +33 1 42 68 00 00 • Rue Saint-Honoré, Paris
          </div>
        </div>
      </div>
    </section>
  )
}
