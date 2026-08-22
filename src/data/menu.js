export const menuCategories = [
  { id: "all", name: "Full Café Menu" },
  { id: "hot-coffee", name: "Hot Coffees" },
  { id: "cold-coffee", name: "Cold Brews & Iced" },
  { id: "specialty", name: "Signature Specialties" },
  { id: "tea", name: "Artisan Teas & Infusions" },
  { id: "bakery", name: "Bakery & Savory" },
  { id: "dessert", name: "Gourmet Desserts" }
];

export const fullMenuItems = [
  {
    id: "m-1",
    name: "Classic Single / Double Espresso",
    category: "hot-coffee",
    price: 149,
    calories: "5 kcal",
    tag: "Signature",
    description: "Pure Arabica extract with rich hazelnut crema and chocolate aroma.",
    image: "https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "m-2",
    name: "Velvet Silk Cappuccino",
    category: "hot-coffee",
    price: 189,
    calories: "120 kcal",
    tag: "Popular",
    description: "Equal parts espresso, hot milk, and deep velvety microfoam with cocoa dust.",
    image: "https://images.unsplash.com/photo-1534778101976-62847782c213?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "m-3",
    name: "Café Latte Art",
    category: "hot-coffee",
    price: 199,
    calories: "140 kcal",
    tag: "Artisan",
    description: "Delicate espresso poured over creamy steamed milk with free-pour latte art.",
    image: "https://images.unsplash.com/photo-1570968915860-54d5c301fa9f?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "m-4",
    name: "Smoky Long Black / Americano",
    category: "hot-coffee",
    price: 139,
    calories: "5 kcal",
    tag: "Classic",
    description: "Espresso stretched over pristine mineral hot water to maintain clean crema.",
    image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "m-5",
    name: "Brewora Thick Cold Coffee",
    category: "cold-coffee",
    price: 189,
    calories: "220 kcal",
    tag: "Must Try",
    description: "Espresso blended with full cream milk and creamy vanilla gelato.",
    image: "https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "m-6",
    name: "Iced Spanish Condensed Latte",
    category: "cold-coffee",
    price: 219,
    calories: "190 kcal",
    tag: "Bestseller",
    description: "Cold milk layered with sweet condensed milk and topped with rich double espresso.",
    image: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "m-7",
    name: "18-Hour Kyoto Slow Cold Brew",
    category: "cold-coffee",
    price: 199,
    calories: "10 kcal",
    tag: "Single Origin",
    description: "Slow-dripped drop by drop over 18 hours for natural sweetness and floral notes.",
    image: "https://images.unsplash.com/photo-1517256064527-09c73fc73e38?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "m-8",
    name: "Belgian Dark Chocolate Mocha",
    category: "specialty",
    price: 229,
    calories: "280 kcal",
    tag: "Decadent",
    description: "70% melted Belgian chocolate ganache with espresso and whipped cream.",
    image: "https://images.unsplash.com/photo-1578314675249-a6910f80cc4e?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "m-9",
    name: "Toasted Hazelnut Macchiato",
    category: "specialty",
    price: 219,
    calories: "180 kcal",
    tag: "Chef Special",
    description: "Vanilla steamed milk marked with espresso shot and hazelnut crunch.",
    image: "https://images.unsplash.com/photo-1485808191679-5f86510681a2?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "m-10",
    name: "Artisanal Affogato al Caffè",
    category: "specialty",
    price: 179,
    calories: "160 kcal",
    tag: "Italian Classic",
    description: "Fresh pulled double ristretto over a rich scoop of Madagascar vanilla gelato.",
    image: "https://images.unsplash.com/photo-1594911772125-07fc7a2d8d9f?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "m-11",
    name: "Kashmiri Kahwa & Saffron Infusion",
    category: "tea",
    price: 149,
    calories: "45 kcal",
    tag: "Heritage",
    description: "Whole green tea leaves brewed with Kashmiri saffron, crushed almonds, and green cardamom.",
    image: "https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "m-12",
    name: "Hibiscus Berry Iced Tisane",
    category: "tea",
    price: 169,
    calories: "35 kcal",
    tag: "Refreshing",
    description: "Ruby red organic dried hibiscus blossoms infused with fresh mint and citrus peel.",
    image: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "m-13",
    name: "French Butter Croissant",
    category: "bakery",
    price: 139,
    calories: "240 kcal",
    tag: "Freshly Baked",
    description: "Flaky, multi-layered golden French pastry made with cultured Brittany butter.",
    image: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "m-14",
    name: "Sourdough Avocado & Sundried Toast",
    category: "bakery",
    price: 249,
    calories: "280 kcal",
    tag: "Healthy",
    description: "Toasted country sourdough with hass avocado mash, cherry tomatoes, and microgreens.",
    image: "https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "m-15",
    name: "Classic Italian Coffee Tiramisu",
    category: "dessert",
    price: 229,
    calories: "320 kcal",
    tag: "House Special",
    description: "Espresso-soaked Savoiardi ladyfingers layered with whipped mascarpone cream and dark cocoa.",
    image: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "m-16",
    name: "Warm Belgian Molten Lava Cake",
    category: "dessert",
    price: 239,
    calories: "390 kcal",
    tag: "Decadent",
    description: "Rich dark chocolate sponge with an oozing warm center, served with vanilla bean ice cream.",
    image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=600&q=80"
  }
];
