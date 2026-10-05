import { ASSETS_PATH } from "@/data/products"

export default function ApproachSection() {
  return (
    <section className="approach section-shell">
      <h2>Our Approach to Fashion Design</h2>
      <p>
        At NOIRÉ, we blend creativity with craftsmanship to create fashion that
        transcends trends and stands the test of time. Each design is
        meticulously crafted, ensuring the highest quality and an exquisite
        finish.
      </p>
      <div className="editorial-grid">
        <figure className="editorial editorial--one group overflow-hidden cursor-pointer bg-neutral-900">
          <img
            src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=85"
            alt="NOIRÉ Architectural Couture Silhouette"
            className="w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
          />
        </figure>
        <figure className="editorial editorial--two group overflow-hidden cursor-pointer bg-neutral-900">
          <img
            src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=800&q=85"
            alt="NOIRÉ Double-Faced Wool Coat"
            className="w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
          />
        </figure>
        <figure className="editorial editorial--three group overflow-hidden cursor-pointer bg-neutral-900">
          <img
            src="https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&w=800&q=85"
            alt="NOIRÉ Fluid Tailoring Detail"
            className="w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
          />
        </figure>
        <figure className="editorial editorial--four group overflow-hidden cursor-pointer bg-neutral-900">
          <img
            src="https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&w=800&q=85"
            alt="NOIRÉ Noble Cashmere Fiber Weave"
            className="w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
          />
        </figure>
      </div>
    </section>
  )
}
