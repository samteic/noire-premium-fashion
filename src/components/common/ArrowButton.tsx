import { ASSETS_PATH } from "@/data/products"

interface ArrowButtonProps {
  direction: "left" | "right"
  onClick?: () => void
}

export default function ArrowButton({ direction, onClick }: ArrowButtonProps) {
  return (
    <button
      className={`arrow-button arrow-button--${direction}`}
      type="button"
      aria-label={direction}
      onClick={onClick}
    >
      <img
        src={`${ASSETS_PATH}/${
          direction === "left" ? "76a82.svg" : "cfe16.svg"
        }`}
        alt=""
      />
    </button>
  )
}
