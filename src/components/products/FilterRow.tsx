import { ASSETS_PATH } from "@/data/products"

interface FilterRowProps {
  children: string
}

export default function FilterRow({ children }: FilterRowProps) {
  return (
    <button className="filter-row" type="button">
      <span>{children}</span>
      <img src={`${ASSETS_PATH}/05ba9.svg`} alt="" />
      <img className="filter-line" src={`${ASSETS_PATH}/2e5b5.svg`} alt="" />
    </button>
  )
}
