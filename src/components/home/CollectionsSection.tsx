import { useState } from "react"
import ProductCard from "@/components/product/ProductCard"
import { ASSETS_PATH, collection } from "@/data/products"

export default function CollectionsSection() {
  const [activeTab, setActiveTab] = useState("(All)")
  const tabs = ["(All)", "Women", "Men", "Editions"]

  return (
    <section className="collections section-shell" id="collections">
      <div className="collection-header">
        <h2>
          XIV
          <br />
          Collections
          <br />
          23-24
        </h2>
        <div className="filter-copy">
          <span
            className="cursor-pointer hover:text-black transition-colors"
            onClick={() => {
              window.location.hash = "products"
            }}
          >
            Filters(+)
          </span>
          <span className="cursor-pointer hover:text-black transition-colors">
            Sorts(-)
            <small>
              Less to more
              <br />
              More to less
            </small>
          </span>
        </div>
      </div>
      <div className="tabs" role="tablist" aria-label="Collections">
        {tabs.map((tab) => (
          <button
            key={tab}
            type="button"
            role="tab"
            aria-selected={activeTab === tab}
            onClick={() => setActiveTab(tab)}
            className="cursor-pointer transition-colors hover:text-black"
          >
            {tab}
          </button>
        ))}
        <img className="tab-line" src={`${ASSETS_PATH}/b1f18.svg`} alt="" />
      </div>
      <div className="product-grid product-grid--three">
        {collection.map((product) => (
          <ProductCard product={product} key={product.name + product.image} />
        ))}
      </div>
      <button
        className="more-button group cursor-pointer transition-transform duration-300 hover:scale-105"
        type="button"
        onClick={() => {
          window.location.hash = "products"
        }}
      >
        <span className="group-hover:text-black transition-colors">
          More Garments
        </span>
        <img
          src={`${ASSETS_PATH}/a41d9.svg`}
          alt=""
          className="transition-transform duration-300 group-hover:translate-y-1"
        />
      </button>
    </section>
  )
}
