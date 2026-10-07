import { ASSETS_PATH } from "@/data/products"
import { useShop } from "@/context/ShopContext"

export default function SiteFooter() {
  const { showToast } = useShop()

  return (
    <footer className="site-footer">
      <a className="to-top" href="#top" aria-label="Back to top">
        <img src={`${ASSETS_PATH}/4edf7.svg`} alt="" />
      </a>
      <div className="footer-links">
        <div>
          <h3>Navigation</h3>
          <a href="#top">Home</a>
          <a href="#collection">Collection</a>
          <a href="#concierge">How to Order</a>
          <a href="#story">About Noiré</a>
          <a
            href="https://wa.me/33142680000?text=Hello%20NOIR%C3%89%2C%20I%20have%20a%20question%20about%20an%20order."
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => {
              e.preventDefault()
              showToast("Opening WhatsApp...")
              window.open(
                "https://wa.me/33142680000?text=Hello%20NOIR%C3%89%2C%20I%20have%20a%20question%20about%20an%20order.",
                "_blank",
                "noopener,noreferrer"
              )
            }}
          >
            WhatsApp Support ↗
          </a>
        </div>
        <div>
          <h3>Languages</h3>
          <button type="button">Eng /</button>
          <button type="button">Fr /</button>
          <button type="button">Swe</button>
        </div>
      </div>
      <div className="footer-tech">
        <h3>Craft & Studio</h3>
        <div>
          <strong
            style={{
              fontFamily: "'Cinzel', 'Cormorant Garamond', serif",
              letterSpacing: "0.12em",
            }}
          >
            NOIRÉ
          </strong>
          <span>Paris Atelier</span>
        </div>
        <p>100% Quality Fabrics</p>
      </div>
      <div className="footer-bottom">
        <span>© 2024 NOIRÉ — PARIS • ALL RIGHTS RESERVED</span>
        <a href="#story">Privacy</a>
        <a href="#story">Terms</a>
      </div>
    </footer>
  )
}
