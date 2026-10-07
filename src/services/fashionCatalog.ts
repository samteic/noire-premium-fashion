import {
  catalogProducts,
  newArrivals,
  collection,
  productCategories,
  type ASSETS_PATH,
} from "@/data/products"
import type { CatalogProduct, Product } from "@/types"

export interface FashionGarment extends CatalogProduct {
  id: string
  fabricDescription?: string
  fabricWeight?: string
  provenance?: string
  careInstructions?: string
  garmentLength?: string
  styledWithId?: string
  alternateViews: {
    label: string
    url: string
  }[]
}

export const curatedCatalog: FashionGarment[] = [
  {
    id: "espresso-overcoat",
    category: "Outerwear",
    name: "Tailored Espresso Wool Overcoat",
    price: "$ 2,680",
    image: "/assets/img4.jpg",
    hoverImage: "/assets/img4.jpg",
    position: "50% 15%",
    color: "#3b281f",
    fit: "Full-Length Architectural Cut with Peak Lapels",
    modelSpec: "Model is 188cm / 6'2\" wearing Size 48 (FR 48)",
    fabricDescription: "Heavyweight double-faced melton wool in rich espresso brown, paired with baroque jacquard silk lining and hand-finished horn buttons.",
    fabricWeight: "620 GSM",
    provenance: "Woven & tailored in Paris Atelier",
    garmentLength: "128 cm (Center Back)",
    careInstructions: "Specialist dry clean only • Archival cedar hanger included",
    styledWithId: "pleated-trousers",
    alternateViews: [
      { label: "Full Length Editorial", url: "/assets/img4.jpg" },
    ],
  },
  {
    id: "ivory-blazer",
    category: "Outerwear",
    name: "Double-Breasted Ivory Wool Blazer",
    price: "$ 1,850",
    image: "/assets/img1.jpg",
    hoverImage: "/assets/img1.jpg",
    position: "50% 20%",
    color: "#f7f5ef",
    fit: "Structured Tailored Double-Breasted Silhouette",
    modelSpec: "Model is 179cm / 5'10\" wearing Size 36 (FR 36)",
    fabricDescription: "Crisp virgin wool crepe in warm ivory with hand-hammered gold buttons and embossed lapel detailing.",
    fabricWeight: "460 GSM",
    provenance: "Hand-finished in Lyon, France",
    garmentLength: "76 cm (Center Back)",
    careInstructions: "Specialist dry clean only • Garment dustbag included",
    styledWithId: "pleated-trousers",
    alternateViews: [
      { label: "Studio Portrait", url: "/assets/img1.jpg" },
    ],
  },
  {
    id: "cashmere-trench",
    category: "Outerwear",
    name: "Double-Faced Cashmere Trench",
    price: "$ 2,450",
    image: "/assets/products/trench_front.jpg",
    hoverImage: "/assets/products/trench_back.jpg",
    position: "50% 20%",
    color: "#141414",
    count: "+2",
    fit: "Relaxed Architectural Fit",
    modelSpec: "Model is 178cm / 5'10\" wearing Size S (FR 36)",
    fabricDescription: "Double-faced virgin wool and Mongolian cashmere with unlined interior and hand-finished pick-stitched edges.",
    fabricWeight: "580 GSM",
    provenance: "Woven & tailored in Biella, Italy",
    garmentLength: "124 cm (Center Back)",
    careInstructions: "Specialist dry clean only • Archival cedar hanger included",
    styledWithId: "pleated-trousers",
    alternateViews: [
      { label: "Front Studio", url: "/assets/products/trench_front.jpg" },
      { label: "Back Studio", url: "/assets/products/trench_back.jpg" },
      { label: "Side Profile", url: "/assets/products/trench_side.jpg" },
    ],
  },
  {
    id: "heron-tee",
    category: "Tops",
    name: "Heron Embroidered Minimalist Tee",
    price: "$ 460",
    image: "/assets/7488e.png",
    hoverImage: "/assets/11da2.png",
    position: "50% 25%",
    color: "#141414",
    count: "+2",
    fit: "Relaxed Heavyweight Drop-Shoulder",
    modelSpec: "Model is 186cm / 6'1\" wearing Size L",
    fabricDescription: "Heavyweight 280 GSM mercerized organic cotton jersey with hand-guided chain-stitch botanical and heron embroidery.",
    fabricWeight: "280 GSM Pure Cotton",
    provenance: "Milled in Portugal",
    garmentLength: "74 cm",
    careInstructions: "Machine wash cold delicate • Iron inside out",
    alternateViews: [
      { label: "Front View", url: "/assets/7488e.png" },
      { label: "Back Silhouette", url: "/assets/11da2.png" },
      { label: "Side Profile", url: "/assets/b8331.png" },
      { label: "Embroidery Detail", url: "/assets/fb04f.png" },
    ],
  },
  {
    id: "navy-poplin-shirt",
    category: "Tops",
    name: "Tailored Navy Poplin Shirt",
    price: "$ 680",
    image: "/assets/f1432.png",
    hoverImage: "/assets/f1432.png",
    position: "50% 20%",
    color: "#172033",
    fit: "Sharply Tailored Architectural Collar",
    modelSpec: "Model is 185cm / 6'1\" wearing Size 40",
    fabricDescription: "Crafted from 140/2 double-twist Giza Egyptian cotton poplin with clean French placket and mother-of-pearl buttons.",
    fabricWeight: "135 GSM Crisp Poplin",
    provenance: "Albini Mill, Italy",
    garmentLength: "77 cm",
    careInstructions: "Specialist dry clean or hand wash cold • Crisp press",
    alternateViews: [
      { label: "Front View", url: "/assets/f1432.png" },
    ],
  },
  {
    id: "waffle-crewneck",
    category: "Knitwear",
    name: "Textured Waffle Knit Crewneck",
    price: "$ 750",
    image: "/assets/c5a30.png",
    hoverImage: "/assets/c5a30.png",
    position: "50% 25%",
    color: "#1a1d1a",
    count: "+2",
    fit: "Relaxed Waffle Weave Silhouette",
    modelSpec: "Model is 182cm / 6'0\" wearing Size M",
    fabricDescription: "Intricate textured waffle-knit spun from high-twist organic cotton and mulberry silk for exceptional breathability and structure.",
    fabricWeight: "340 GSM",
    provenance: "Perugia, Italy",
    garmentLength: "70 cm",
    careInstructions: "Dry clean or gentle hand wash flat",
    alternateViews: [
      { label: "Studio Look", url: "/assets/c5a30.png" },
    ],
  },
  {
    id: "pleated-trousers",
    category: "Trousers",
    name: "Pleated High-Rise Fluid Trousers",
    price: "$ 890",
    image: "/assets/863fb.png",
    hoverImage: "/assets/863fb.png",
    position: "50% 25%",
    color: "#e8e4dc",
    count: "+2",
    fit: "High-Rise Wide-Leg Cut",
    modelSpec: "Model is 184cm / 6'0\" wearing Size 38",
    fabricDescription: "High-rise tailored trousers with double forward pleats, internal curtained waistband, and fluid drape.",
    fabricWeight: "310 GSM Worsted Wool",
    provenance: "Normandy Wool Mill",
    garmentLength: "112 cm (Unhemmed for custom tailoring)",
    careInstructions: "Dry clean only",
    alternateViews: [
      { label: "Editorial Studio", url: "/assets/863fb.png" },
    ],
  },
  {
    id: "abstract-silk-shirt",
    category: "Tops",
    name: "Abstract Silk Camp-Collar Shirt",
    price: "$ 920",
    image: "/assets/e3b03.png",
    hoverImage: "/assets/e3b03.png",
    position: "50% 25%",
    color: "#181818",
    fit: "Fluid Silk Camp Silhouette",
    modelSpec: "Model is 187cm / 6'2\" wearing Size L",
    fabricDescription: "Pure silk twill printed with an original monochrome painterly artwork, featuring an unstructured camp collar and split side vents.",
    fabricWeight: "19 Momme Silk Twill",
    provenance: "Como, Italy",
    garmentLength: "73 cm",
    careInstructions: "Specialist dry clean only",
    alternateViews: [
      { label: "Front Look", url: "/assets/e3b03.png" },
    ],
  },
  {
    id: "mercerized-crewneck",
    category: "Tops",
    name: "Mercerized Minimalist Crewneck",
    price: "$ 480",
    image: "/assets/abf4f.png",
    hoverImage: "/assets/abf4f.png",
    position: "50% 25%",
    color: "#8ea8bd",
    count: "+3",
    fit: "Tailored Second-Skin Cotton",
    modelSpec: "Model is 185cm / 6'1\" wearing Size M",
    fabricDescription: "Double-mercerized Egyptian cotton with a subtle silk-like luster and clean bounded collar stitching.",
    fabricWeight: "210 GSM",
    provenance: "Guimarães, Portugal",
    garmentLength: "71 cm",
    careInstructions: "Machine wash cold delicate, line dry in shade",
    alternateViews: [
      { label: "Front Studio", url: "/assets/abf4f.png" },
    ],
  },
  {
    id: "boxy-studio-tee",
    category: "Tops",
    name: "Heavyweight Boxy Studio Tee",
    price: "$ 420",
    image: "/assets/4ddd2.png",
    hoverImage: "/assets/4ddd2.png",
    position: "50% 25%",
    color: "#111111",
    fit: "Structured Boxy Cut",
    modelSpec: "Model is 188cm / 6'2\" wearing Size XL",
    fabricDescription: "Ultra-heavyweight 320 GSM combed cotton with high-density rib neckline and dropped shoulder seams.",
    fabricWeight: "320 GSM",
    provenance: "Osaka, Japan",
    garmentLength: "75 cm",
    careInstructions: "Machine wash cold, tumble dry low",
    alternateViews: [
      { label: "Front Studio", url: "/assets/4ddd2.png" },
    ],
  },
  {
    id: "botanical-resort-shirt",
    category: "Tops",
    name: "Abstract Botanical Resort Shirt",
    price: "$ 640",
    image: "/assets/b895e.png",
    hoverImage: "/assets/2f687.png",
    position: "50% 25%",
    color: "#c8cbbe",
    count: "+2",
    fit: "Relaxed Camp Collar",
    modelSpec: "Archival Garment View",
    fabricDescription: "Textured linen-viscose blend with raised boucle line embroidery across front and back panels.",
    fabricWeight: "240 GSM",
    provenance: "Valencia, Spain",
    garmentLength: "72 cm",
    careInstructions: "Dry clean only",
    alternateViews: [
      { label: "Studio Garment Flat", url: "/assets/b895e.png" },
      { label: "Ivory Variant", url: "/assets/2f687.png" },
    ],
  },
  {
    id: "mineral-raw-edge-tee",
    category: "Tops",
    name: "Mineral-Dyed Raw-Edge Tee",
    price: "$ 490",
    image: "/assets/8adfd.png",
    hoverImage: "/assets/1ec81.png",
    position: "50% 25%",
    color: "#6b6256",
    fit: "Relaxed Mineral Wash Silhouette",
    modelSpec: "Model is 183cm / 6'0\" wearing Size L",
    fabricDescription: "Individually garment-dyed with natural earth pigments featuring laser-cut raw sleeve hems and tonal chest print.",
    fabricWeight: "260 GSM",
    provenance: "Florence, Italy",
    garmentLength: "73 cm",
    careInstructions: "Cold wash separate • Air dry",
    alternateViews: [
      { label: "Model View", url: "/assets/8adfd.png" },
      { label: "Archive Flat", url: "/assets/1ec81.png" },
    ],
  },
]

export const fashionCatalogService = {
  getAll: (): FashionGarment[] => curatedCatalog,
  getByCategory: (category: string): FashionGarment[] => {
    if (!category || category === "All") return curatedCatalog
    return curatedCatalog.filter((g) => g.category === category)
  },
  getById: (id: string): FashionGarment | undefined => {
    return curatedCatalog.find((g) => g.id === id)
  },
  search: (query: string): FashionGarment[] => {
    const q = query.trim().toLowerCase()
    if (!q) return curatedCatalog
    return curatedCatalog.filter(
      (g) =>
        g.name.toLowerCase().includes(q) ||
        g.category.toLowerCase().includes(q) ||
        (g.fit && g.fit.toLowerCase().includes(q))
    )
  },
  getCategories: () => productCategories,
}

export default fashionCatalogService
