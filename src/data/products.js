export const products = [
  {
    id: 1,
    name: "Classic Espresso",
    category: "Espresso",
    price: 149,
    oldPrice: 179,
    image: "https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?auto=format&fit=crop&w=800&q=80",
    rating: 4.9,
    reviews: 148,
    description: "A rich, full-bodied single or double shot of pure specialty Arabica with velvety golden crema and intense cocoa undertones.",
    ingredients: [
      "100% Grade-A Arabica Beans",
      "Triple Filtered Water"
    ],
    featured: true,
    available: true,
    roastLevel: "Dark Roast",
    origin: "Chikmagalur, India",
    brewTime: "25-30 secs"
  },
  {
    id: 2,
    name: "Velvet Cappuccino",
    category: "Hot Coffee",
    price: 189,
    oldPrice: 220,
    image: "https://images.unsplash.com/photo-1534778101976-62847782c213?auto=format&fit=crop&w=800&q=80",
    rating: 4.8,
    reviews: 210,
    description: "Harmonious balance of dark roasted espresso, steamed silky milk, and a thick microfoam cushion dusted with raw Dutch cocoa.",
    ingredients: [
      "Espresso Roast",
      "Steamed Whole Milk",
      "Artisan Foam",
      "Dutch Cocoa Dusting"
    ],
    featured: true,
    available: true,
    roastLevel: "Medium-Dark",
    origin: "Coorg Estate",
    brewTime: "3 mins"
  },
  {
    id: 3,
    name: "Café Latte Royale",
    category: "Hot Coffee",
    price: 199,
    oldPrice: 239,
    image: "https://images.unsplash.com/photo-1570968915860-54d5c301fa9f?auto=format&fit=crop&w=800&q=80",
    rating: 4.9,
    reviews: 320,
    description: "Smooth, mellow espresso poured over luscious steamed milk, topped with delicate barista latte art.",
    ingredients: [
      "Fresh Espresso",
      "Organic Steamed Milk",
      "Delicate Microfoam"
    ],
    featured: true,
    available: true,
    roastLevel: "Medium Roast",
    origin: "Wayanad Hills",
    brewTime: "3 mins"
  },
  {
    id: 4,
    name: "Smoky Americano",
    category: "Espresso",
    price: 139,
    oldPrice: 169,
    image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=80",
    rating: 4.7,
    reviews: 95,
    description: "Two shots of intense espresso lengthened with hot pure spring water to preserve crisp crema and nutty aroma.",
    ingredients: [
      "Double Espresso",
      "Boiling Spring Water"
    ],
    featured: false,
    available: true,
    roastLevel: "Dark Roast",
    origin: "Araku Valley",
    brewTime: "2 mins"
  },
  {
    id: 5,
    name: "Belgian Dark Mocha",
    category: "Specialty",
    price: 229,
    oldPrice: 269,
    image: "https://images.unsplash.com/photo-1578314675249-a6910f80cc4e?auto=format&fit=crop&w=800&q=80",
    rating: 5.0,
    reviews: 412,
    description: "Decadent melted 70% Belgian chocolate ganache swirled with bold espresso and velvety steamed milk, finished with whip.",
    ingredients: [
      "Belgian Dark Chocolate",
      "Espresso Roast",
      "Full Cream Milk",
      "Vanilla Whipped Cream"
    ],
    featured: true,
    available: true,
    roastLevel: "Medium-Dark",
    origin: "Blend & Belgian Cacao",
    brewTime: "4 mins"
  },
  {
    id: 6,
    name: "Caramel Macchiato",
    category: "Specialty",
    price: 219,
    oldPrice: 259,
    image: "https://images.unsplash.com/photo-1485808191679-5f86510681a2?auto=format&fit=crop&w=800&q=80",
    rating: 4.8,
    reviews: 184,
    description: "Steamed vanilla-infused milk marked with bold espresso and crosshatched with homemade buttery caramel drizzle.",
    ingredients: [
      "Espresso Shot",
      "Madagascar Vanilla Milk",
      "Golden Caramel Drizzle"
    ],
    featured: true,
    available: true,
    roastLevel: "Medium Roast",
    origin: "Coorg Heritage",
    brewTime: "3 mins"
  },
  {
    id: 7,
    name: "Brewora Signature Cold Coffee",
    category: "Cold Coffee",
    price: 189,
    oldPrice: 229,
    image: "https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?auto=format&fit=crop&w=800&q=80",
    rating: 4.9,
    reviews: 530,
    description: "Our legendary thick-blend cold brew espresso churned with organic condensed milk and dairy ice cream.",
    ingredients: [
      "Espresso Concentrate",
      "Creamy Milk",
      "Vanilla Gelato",
      "Brown Sugar Syrup"
    ],
    featured: true,
    available: true,
    roastLevel: "Dark Roast",
    origin: "Estate Reserve",
    brewTime: "3 mins"
  },
  {
    id: 8,
    name: "Iced Spanish Latte",
    category: "Cold Coffee",
    price: 219,
    oldPrice: 249,
    image: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&w=800&q=80",
    rating: 4.9,
    reviews: 267,
    description: "Chilled fresh milk sweetened with condensed milk, crowned with a floating layer of slow-extracted double espresso over clear ice.",
    ingredients: [
      "Espresso Float",
      "Sweetened Condensed Milk",
      "Chilled Milk",
      "Crystal Ice"
    ],
    featured: true,
    available: true,
    roastLevel: "Medium Roast",
    origin: "Shevaroy Hills",
    brewTime: "2 mins"
  },
  {
    id: 9,
    name: "Roasted Hazelnut Latte",
    category: "Specialty",
    price: 209,
    oldPrice: 249,
    image: "https://images.unsplash.com/photo-1541167760496-1628856ab772?auto=format&fit=crop&w=800&q=80",
    rating: 4.7,
    reviews: 139,
    description: "A warming hug of toasted Turkish hazelnut syrup, aromatic espresso, and frothy steamed farm milk with crushed praline topping.",
    ingredients: [
      "Toasted Hazelnut Syrup",
      "Dark Espresso",
      "Steamed Milk",
      "Hazelnut Crumbs"
    ],
    featured: false,
    available: true,
    roastLevel: "Medium-Dark",
    origin: "Chikmagalur",
    brewTime: "3 mins"
  },
  {
    id: 10,
    name: "Madagascar Vanilla Latte",
    category: "Hot Coffee",
    price: 209,
    oldPrice: 239,
    image: "https://images.unsplash.com/photo-1529892485617-25f63cd7b1e9?auto=format&fit=crop&w=800&q=80",
    rating: 4.8,
    reviews: 162,
    description: "Real Madagascar vanilla bean caviar infused into gently steamed milk and enveloped with medium roast espresso.",
    ingredients: [
      "Pure Vanilla Bean Extract",
      "Espresso",
      "Steamed Whole Milk"
    ],
    featured: false,
    available: true,
    roastLevel: "Medium Roast",
    origin: "Coorg Blend",
    brewTime: "3 mins"
  },
  {
    id: 11,
    name: "Affogato al Caffè",
    category: "Specialty",
    price: 179,
    oldPrice: 209,
    image: "https://images.unsplash.com/photo-1594911772125-07fc7a2d8d9f?auto=format&fit=crop&w=800&q=80",
    rating: 4.9,
    reviews: 198,
    description: "A scoop of handcrafted artisanal Italian fior di latte gelato drowned in a piping hot shot of freshly pulled espresso.",
    ingredients: [
      "Artisan Vanilla Gelato",
      "Fresh Ristretto Shot",
      "Dark Cocoa Nibs"
    ],
    featured: true,
    available: true,
    roastLevel: "Dark Roast",
    origin: "Single Estate",
    brewTime: "2 mins"
  },
  {
    id: 12,
    name: "Double Chocolate Frappé",
    category: "Cold Coffee",
    price: 239,
    oldPrice: 279,
    image: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=800&q=80",
    rating: 4.9,
    reviews: 310,
    description: "Blended ice, espresso, rich dark cocoa fudge, topped with airy whipped cream and chocolate curl shavings.",
    ingredients: [
      "Espresso Shot",
      "Dark Fudge Sauce",
      "Milk & Crushed Ice",
      "Whipped Cream"
    ],
    featured: true,
    available: true,
    roastLevel: "Medium Roast",
    origin: "House Blend",
    brewTime: "4 mins"
  },
  {
    id: 13,
    name: "18-Hour Kyoto Cold Brew",
    category: "Cold Coffee",
    price: 199,
    oldPrice: 230,
    image: "https://images.unsplash.com/photo-1517256064527-09c73fc73e38?auto=format&fit=crop&w=800&q=80",
    rating: 5.0,
    reviews: 285,
    description: "Slow-dripped for 18 hours using icy mineral water. Ultra smooth, low acidity with bright notes of black cherry and dark chocolate.",
    ingredients: [
      "Kyoto Drip Arabica",
      "Mineral Water",
      "Orange Peel Twist"
    ],
    featured: true,
    available: true,
    roastLevel: "Light-Medium",
    origin: "Ethiopia Yirgacheffe & Coorg",
    brewTime: "Slow Drip 18h"
  },
  {
    id: 14,
    name: "Premium Arabica Whole Beans (250g)",
    category: "Beans",
    price: 499,
    oldPrice: 599,
    image: "https://images.unsplash.com/photo-1587734195503-904fca47e0e9?auto=format&fit=crop&w=800&q=80",
    rating: 5.0,
    reviews: 490,
    description: "Estate-grown 100% Arabica shade-grown beans freshly roasted in small batches. Notes of roasted hazelnut, caramel, and berry zest.",
    ingredients: [
      "100% Shade-Grown Arabica Beans"
    ],
    featured: true,
    available: true,
    roastLevel: "Medium-Dark Roast",
    origin: "Bababudangiri Hills",
    brewTime: "Whole Beans"
  },
  {
    id: 15,
    name: "Single-Origin Dark Roast Beans (250g)",
    category: "Beans",
    price: 549,
    oldPrice: 649,
    image: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?auto=format&fit=crop&w=800&q=80",
    rating: 4.8,
    reviews: 175,
    description: "Intense, smoky dark roast for Moka pot, French Press, or automatic espresso machines. Thick crema and persistent bittersweet finish.",
    ingredients: [
      "Select Monsooned Malabar & Arabica"
    ],
    featured: false,
    available: true,
    roastLevel: "French Dark Roast",
    origin: "Malabar Coast",
    brewTime: "Whole Beans"
  },
  {
    id: 16,
    name: "Cortado Golden Velvet",
    category: "Espresso",
    price: 169,
    oldPrice: 199,
    image: "https://images.unsplash.com/photo-1534040385558-450f36798031?auto=format&fit=crop&w=800&q=80",
    rating: 4.8,
    reviews: 110,
    description: "Equal parts intense espresso and warm silky milk to cut the acidity while keeping the deep coffee character front and center.",
    ingredients: [
      "Ristretto Espresso",
      "Warm Steamed Milk (1:1 Ratio)"
    ],
    featured: false,
    available: true,
    roastLevel: "Dark Roast",
    origin: "Coorg Reserve",
    brewTime: "2 mins"
  }
];
