import { useState } from "react"

interface SizeGuideModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function SizeGuideModal({
  isOpen,
  onClose,
}: SizeGuideModalProps) {
  const [unit, setUnit] = useState<"in" | "cm">("cm")

  const SIZES_CM = [
    {
      size: "XS",
      chest: "92 cm",
      shoulder: "44 cm",
      length: "68 cm",
      sleeve: "21 cm",
    },
    {
      size: "S",
      chest: "98 cm",
      shoulder: "46 cm",
      length: "70 cm",
      sleeve: "22 cm",
    },
    {
      size: "M",
      chest: "104 cm",
      shoulder: "48 cm",
      length: "72 cm",
      sleeve: "23 cm",
    },
    {
      size: "L",
      chest: "110 cm",
      shoulder: "50 cm",
      length: "74 cm",
      sleeve: "24 cm",
    },
    {
      size: "XL",
      chest: "116 cm",
      shoulder: "52 cm",
      length: "76 cm",
      sleeve: "25 cm",
    },
    {
      size: "2X",
      chest: "122 cm",
      shoulder: "54 cm",
      length: "78 cm",
      sleeve: "26 cm",
    },
  ]

  const SIZES_IN = [
    {
      size: "XS",
      chest: "36.2 in",
      shoulder: "17.3 in",
      length: "26.8 in",
      sleeve: "8.3 in",
    },
    {
      size: "S",
      chest: "38.6 in",
      shoulder: "18.1 in",
      length: "27.5 in",
      sleeve: "8.7 in",
    },
    {
      size: "M",
      chest: "40.9 in",
      shoulder: "18.9 in",
      length: "28.3 in",
      sleeve: "9.1 in",
    },
    {
      size: "L",
      chest: "43.3 in",
      shoulder: "19.7 in",
      length: "29.1 in",
      sleeve: "9.4 in",
    },
    {
      size: "XL",
      chest: "45.7 in",
      shoulder: "20.5 in",
      length: "29.9 in",
      sleeve: "9.8 in",
    },
    {
      size: "2X",
      chest: "48.0 in",
      shoulder: "21.3 in",
      length: "30.7 in",
      sleeve: "10.2 in",
    },
  ]

  const data = unit === "cm" ? SIZES_CM : SIZES_IN

  return (
    <div
      className={`luxury-drawer-root ${
        isOpen ? "is-open" : ""
      } flex items-center justify-center p-4`}
      aria-hidden={!isOpen}
    >
      <div className="luxury-drawer-backdrop" onClick={onClose} />

      <div
        className="luxury-modal-content relative z-10 w-full max-w-lg bg-white border border-neutral-300 p-6 sm:p-8 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
        style={{ letterSpacing: "1px" }}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-neutral-200">
          <div>
            <span className="text-[10px] uppercase font-bold tracking-[2px] text-neutral-400">
              NOIRÉ Fit Guide
            </span>
            <h2 className="text-base font-bold uppercase tracking-[2px]">
              Garment Dimensions
            </h2>
          </div>
          <button
            type="button"
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-neutral-100 text-neutral-400 hover:text-black transition-all cursor-pointer text-xl"
            onClick={onClose}
            aria-label="Close Size Guide"
          >
            ✕
          </button>
        </div>

        {/* Unit Selector */}
        <div className="flex items-center justify-between my-4 text-xs uppercase tracking-wider">
          <p className="text-[11px] text-neutral-500">
            Measurements taken laid flat
          </p>
          <div className="inline-flex border border-neutral-300 rounded-xs overflow-hidden">
            <button
              type="button"
              className={`px-3 py-1 text-[11px] transition-colors cursor-pointer ${
                unit === "cm"
                  ? "bg-black text-white font-bold"
                  : "text-neutral-600 hover:text-black"
              }`}
              onClick={() => setUnit("cm")}
            >
              CM
            </button>
            <button
              type="button"
              className={`px-3 py-1 text-[11px] transition-colors cursor-pointer ${
                unit === "in"
                  ? "bg-black text-white font-bold"
                  : "text-neutral-600 hover:text-black"
              }`}
              onClick={() => setUnit("in")}
            >
              INCHES
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead>
              <tr className="border-b border-neutral-200 text-[10px] uppercase tracking-wider text-neutral-400">
                <th className="py-2.5 font-bold">Size</th>
                <th className="py-2.5 font-bold">Chest</th>
                <th className="py-2.5 font-bold">Shoulder</th>
                <th className="py-2.5 font-bold">Length</th>
                <th className="py-2.5 font-bold">Sleeve</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100 font-mono text-[11px]">
              {data.map((row) => (
                <tr
                  key={row.size}
                  className="hover:bg-neutral-50 transition-colors"
                >
                  <td className="py-2.5 font-sans font-bold text-black">
                    {row.size}
                  </td>
                  <td className="py-2.5 text-neutral-700">{row.chest}</td>
                  <td className="py-2.5 text-neutral-700">{row.shoulder}</td>
                  <td className="py-2.5 text-neutral-700">{row.length}</td>
                  <td className="py-2.5 text-neutral-700">{row.sleeve}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Fit note */}
        <div className="mt-6 pt-4 border-t border-neutral-100 text-[11px] text-neutral-500 space-y-1">
          <p>
            ✦ <strong>Fit advice:</strong> Cut for a relaxed silhouette with
            dropped shoulders. Take your true size for the intended drape, or
            size down for a slimmer tailored cut.
          </p>
          <p>
            ✦ Model is 6&apos;2&quot; (188 cm) with a 38&quot; chest, wearing
            size <strong>Medium</strong>.
          </p>
        </div>
      </div>
    </div>
  )
}
