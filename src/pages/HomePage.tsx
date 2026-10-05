import Navbar from "@/components/layout/Navbar"
import SiteFooter from "@/components/layout/SiteFooter"
import HeroSection from "@/components/home/HeroSection"
import CuratedCollectionSection from "@/components/home/CuratedCollectionSection"
import AtelierConciergeSection from "@/components/home/AtelierConciergeSection"
import BrandStorySection from "@/components/home/BrandStorySection"

export default function HomePage() {
  return (
    <main className="page-transition">
      <Navbar page="home" />

      {/* 1. Storefront Runway Hero */}
      <HeroSection />

      {/* 2. Product Presentation: 10 Featured Pieces */}
      <CuratedCollectionSection />

      {/* 3. WhatsApp Ordering & Support Guide */}
      <AtelierConciergeSection />

      {/* 4. About Noiré & Heritage */}
      <BrandStorySection />

      <SiteFooter />
    </main>
  )
}
