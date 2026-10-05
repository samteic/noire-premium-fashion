import type {
  CartItemType,
  CatalogProduct,
  HeroMobileProduct,
  Product,
} from "@/types"

export const ASSETS_PATH = "/assets"

export const newArrivals: Product[] = [
  {
    category: "Outerwear",
    name: "Double-Faced Cashmere Trench",
    price: "$ 2,450",
    image: "/assets/products/trench_front.jpg",
    hoverImage: "/assets/products/trench_back.jpg",
    views: [
      "/assets/products/trench_front.jpg",
      "/assets/products/trench_back.jpg",
      "/assets/products/trench_side.jpg",
    ],
    fit: "Relaxed Architectural Fit",
    modelSpec: "Model is 178cm / 5'10\" wearing Size S",
    colors: ["#141414", "#d6d0c4"],
    position: "50% 20%",
  },
  {
    category: "Tops",
    name: "Heron Embroidered Minimalist Tee",
    price: "$ 460",
    image: "/assets/7488e.png",
    hoverImage: "/assets/11da2.png",
    views: [
      "/assets/7488e.png",
      "/assets/11da2.png",
      "/assets/b8331.png",
      "/assets/fb04f.png",
    ],
    fit: "Relaxed Heavyweight Drop-Shoulder",
    modelSpec: "Model is 186cm / 6'1\" wearing Size L",
    colors: ["#141414", "#f4f1ea"],
    position: "50% 25%",
  },
  {
    category: "Tops",
    name: "Tailored Navy Poplin Shirt",
    price: "$ 680",
    image: "/assets/f1432.png",
    hoverImage: "/assets/f1432.png",
    views: [
      "/assets/f1432.png",
    ],
    fit: "Sharply Tailored Architectural Collar",
    modelSpec: "Model is 185cm / 6'1\" wearing Size 40",
    colors: ["#172033", "#ffffff"],
    position: "50% 20%",
  },
  {
    category: "Knitwear",
    name: "Textured Waffle Knit Crewneck",
    price: "$ 750",
    image: "/assets/c5a30.png",
    hoverImage: "/assets/c5a30.png",
    views: [
      "/assets/c5a30.png",
    ],
    fit: "Relaxed Waffle Weave Silhouette",
    modelSpec: "Model is 182cm / 6'0\" wearing Size M",
    colors: ["#1a1d1a", "#786d5f"],
    position: "50% 25%",
  },
]

export const collection: Product[] = [
  {
    category: "Trousers",
    name: "Pleated High-Rise Fluid Trousers",
    price: "$ 890",
    image: "/assets/863fb.png",
    hoverImage: "/assets/863fb.png",
    views: [
      "/assets/863fb.png",
    ],
    fit: "High-Rise Wide-Leg Cut",
    modelSpec: "Model is 184cm / 6'0\" wearing Size 38",
    colors: ["#e8e4dc", "#141414"],
    position: "50% 25%",
  },
  {
    category: "Tops",
    name: "Abstract Silk Camp-Collar Shirt",
    price: "$ 920",
    image: "/assets/e3b03.png",
    hoverImage: "/assets/e3b03.png",
    views: [
      "/assets/e3b03.png",
    ],
    fit: "Fluid Silk Camp Silhouette",
    modelSpec: "Model is 187cm / 6'2\" wearing Size L",
    colors: ["#181818", "#d8d4cb"],
    position: "50% 25%",
  },
  {
    category: "Tops",
    name: "Mercerized Minimalist Crewneck",
    price: "$ 480",
    image: "/assets/abf4f.png",
    hoverImage: "/assets/abf4f.png",
    views: [
      "/assets/abf4f.png",
    ],
    fit: "Tailored Second-Skin Cotton",
    modelSpec: "Model is 185cm / 6'1\" wearing Size M",
    colors: ["#8ea8bd", "#1b1e28"],
    position: "50% 25%",
  },
]

export const catalogProducts: CatalogProduct[] = [
  {
    category: "Outerwear",
    name: "Double-Faced Cashmere Trench",
    price: "$ 2,450",
    image: "/assets/products/trench_front.jpg",
    hoverImage: "/assets/products/trench_back.jpg",
    views: [
      "/assets/products/trench_front.jpg",
      "/assets/products/trench_back.jpg",
      "/assets/products/trench_side.jpg",
    ],
    fit: "Relaxed Architectural Fit",
    modelSpec: "Model is 178cm / 5'10\" wearing Size S",
    position: "50% 20%",
    color: "#141414",
    count: "+2",
  },
  {
    category: "Tops",
    name: "Heron Embroidered Minimalist Tee",
    price: "$ 460",
    image: "/assets/7488e.png",
    hoverImage: "/assets/11da2.png",
    views: [
      "/assets/7488e.png",
      "/assets/11da2.png",
      "/assets/b8331.png",
      "/assets/fb04f.png",
    ],
    fit: "Relaxed Heavyweight Drop-Shoulder",
    modelSpec: "Model is 186cm / 6'1\" wearing Size L",
    position: "50% 25%",
    color: "#141414",
    count: "+2",
  },
  {
    category: "Tops",
    name: "Tailored Navy Poplin Shirt",
    price: "$ 680",
    image: "/assets/f1432.png",
    hoverImage: "/assets/f1432.png",
    views: [
      "/assets/f1432.png",
    ],
    fit: "Sharply Tailored Architectural Collar",
    modelSpec: "Model is 185cm / 6'1\" wearing Size 40",
    position: "50% 20%",
    color: "#172033",
  },
  {
    category: "Knitwear",
    name: "Textured Waffle Knit Crewneck",
    price: "$ 750",
    image: "/assets/c5a30.png",
    hoverImage: "/assets/c5a30.png",
    views: [
      "/assets/c5a30.png",
    ],
    fit: "Relaxed Waffle Weave Silhouette",
    modelSpec: "Model is 182cm / 6'0\" wearing Size M",
    position: "50% 25%",
    color: "#1a1d1a",
    count: "+2",
  },
  {
    category: "Trousers",
    name: "Pleated High-Rise Fluid Trousers",
    price: "$ 890",
    image: "/assets/863fb.png",
    hoverImage: "/assets/863fb.png",
    views: [
      "/assets/863fb.png",
    ],
    fit: "High-Rise Wide-Leg Cut",
    modelSpec: "Model is 184cm / 6'0\" wearing Size 38",
    position: "50% 25%",
    color: "#e8e4dc",
    count: "+2",
  },
  {
    category: "Tops",
    name: "Abstract Silk Camp-Collar Shirt",
    price: "$ 920",
    image: "/assets/e3b03.png",
    hoverImage: "/assets/e3b03.png",
    views: [
      "/assets/e3b03.png",
    ],
    fit: "Fluid Silk Camp Silhouette",
    modelSpec: "Model is 187cm / 6'2\" wearing Size L",
    position: "50% 25%",
    color: "#181818",
  },
  {
    category: "Tops",
    name: "Mercerized Minimalist Crewneck",
    price: "$ 480",
    image: "/assets/abf4f.png",
    hoverImage: "/assets/abf4f.png",
    views: [
      "/assets/abf4f.png",
    ],
    fit: "Tailored Second-Skin Cotton",
    modelSpec: "Model is 185cm / 6'1\" wearing Size M",
    position: "50% 25%",
    color: "#8ea8bd",
    count: "+3",
  },
  {
    category: "Tops",
    name: "Heavyweight Boxy Studio Tee",
    price: "$ 420",
    image: "/assets/4ddd2.png",
    hoverImage: "/assets/4ddd2.png",
    views: [
      "/assets/4ddd2.png",
    ],
    fit: "Structured Boxy Cut",
    modelSpec: "Model is 188cm / 6'2\" wearing Size XL",
    position: "50% 25%",
    color: "#111111",
  },
  {
    category: "Tops",
    name: "Abstract Botanical Resort Shirt",
    price: "$ 640",
    image: "/assets/b895e.png",
    hoverImage: "/assets/2f687.png",
    views: [
      "/assets/b895e.png",
      "/assets/2f687.png",
    ],
    fit: "Relaxed Camp Collar",
    modelSpec: "Archival Garment View",
    position: "50% 25%",
    color: "#c8cbbe",
    count: "+2",
  },
  {
    category: "Tops",
    name: "Mineral-Dyed Raw-Edge Tee",
    price: "$ 490",
    image: "/assets/8adfd.png",
    hoverImage: "/assets/1ec81.png",
    views: [
      "/assets/8adfd.png",
      "/assets/1ec81.png",
    ],
    fit: "Relaxed Mineral Wash Silhouette",
    modelSpec: "Model is 183cm / 6'0\" wearing Size L",
    position: "50% 25%",
    color: "#6b6256",
  },
]

export const heroMobileProducts: HeroMobileProduct[] = [
  { image: "/assets/products/trench_front.jpg", position: "50% 20%" },
  { image: "/assets/7488e.png", position: "50% 25%" },
  { image: "/assets/f1432.png", position: "50% 20%" },
]

export const productCategories = [
  "All",
  "Outerwear",
  "Tops",
  "Knitwear",
  "Trousers",
]

export const detailThumbnails = [
  "/assets/products/trench_front.jpg",
  "/assets/products/trench_back.jpg",
  "/assets/products/trench_side.jpg",
]

export const detailColors = [
  "#111111",
  "#282725",
  "#7a6b5d",
  "#d6d0c4",
  "#f7f5ef",
]

export const detailSizes = ["XS", "S", "M", "L", "XL"]

export const initialCartItems: CartItemType[] = [
  {
    id: 1,
    image: "/assets/products/trench_front.jpg",
    name: "Double-Faced Cashmere Trench",
    price: 2450,
    size: "M",
    color: "#111111",
    quantity: 1,
  },
  {
    id: 2,
    image: "/assets/7488e.png",
    name: "Heron Embroidered Minimalist Tee",
    price: 460,
    size: "L",
    color: "#141414",
    quantity: 1,
  },
]

