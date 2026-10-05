import ArrowButton from "@/components/common/ArrowButton"
import ProductCard from "@/components/product/ProductCard"
import { newArrivals } from "@/data/products"

export default function NewArrivalsSection() {
  return (
    <section className="new-week section-shell" id="new">
      <div className="section-heading section-heading--inline">
        <h2>
          New
          <br />
          This Week<sup>(04)</sup>
        </h2>
        <a href="#collections">See All</a>
      </div>
      <div className="product-grid product-grid--four">
        {newArrivals.map((product) => (
          <ProductCard product={product} compact key={product.name} />
        ))}
      </div>
      <div className="center-controls">
        <ArrowButton direction="left" />
        <ArrowButton direction="right" />
      </div>
    </section>
  )
}
