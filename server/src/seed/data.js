// Product catalog seed data — mirrors the original frontend mock catalog
// (src/lib/products.ts) so the app looks identical once wired to the API.
// `imageKey` matches each product's `slug`; the frontend keeps a local map
// of slug -> bundled image asset so we don't need an image upload pipeline.

const products = [
  {
    slug: "monolith-stool",
    code: "OBJ_001",
    name: "Monolith Stool",
    material: "Solid White Oak",
    category: "Furniture",
    price: 450,
    discount: 20,
    imageKey: "monolith-stool",
    tagline: "A single mass, hand-turned.",
    description:
      "The Monolith is machined from a single billet of white oak and finished with a hard-wax oil that deepens with use. Sits low. Reads heavy. Moves easily.",
    specs: [
      { label: "Dimensions", value: "H 46 · Ø 32 cm" },
      { label: "Weight", value: "6.4 kg" },
      { label: "Origin", value: "Kyoto, JP" },
      { label: "Lead time", value: "2–3 weeks" },
    ],
    stock: 8,
    reviews: [
      { author: "M. Aurelius", rating: 5, title: "Feels inevitable.", body: "Heavier than expected — in the best way. The finish is exceptional.", date: "Sep 2024" },
      { author: "E. Hadid", rating: 5, title: "Sculptural.", body: "Doubles as a plinth for a heavy vase. No creaks, no wobble.", date: "Aug 2024" },
    ],
  },
  {
    slug: "fracture-vase",
    code: "OBJ_002",
    name: "Fracture Vase",
    material: "Hand-thrown Clay",
    category: "Ceramics",
    price: 185,
    imageKey: "fracture-vase",
    tagline: "Two-tone slip, uneven on purpose.",
    description:
      "Each vase is thrown by hand and dip-glazed in two passes, leaving a horizon line no two pieces share. Water-tight for cut stems.",
    specs: [
      { label: "Dimensions", value: "H 34 · Ø 22 cm" },
      { label: "Finish", value: "Matte / raw" },
      { label: "Origin", value: "Porto, PT" },
      { label: "Care", value: "Hand-wash only" },
    ],
    stock: 3,
    reviews: [
      { author: "D. Rams", rating: 5, title: "Quiet.", body: "The proportion is unusually correct. Sits well empty.", date: "Oct 2024" },
      { author: "S. Whitaker", rating: 4, title: "Beautiful.", body: "Arrived with more character than the photo suggests.", date: "Jul 2024" },
    ],
  },
  {
    slug: "axis-task-light",
    code: "OBJ_003",
    name: "Axis Task Light",
    material: "Machined Aluminum",
    category: "Lighting",
    price: 890,
    discount: 10,
    imageKey: "axis-task-light",
    tagline: "One pivot. One purpose.",
    description:
      "A single articulated arm and a weighted brass foot. Dimmable, warm-white, and quiet in a room. Designed to work at a table for a decade.",
    specs: [
      { label: "Dimensions", value: "H 52 cm reach" },
      { label: "Bulb", value: "LED 2700K, dimmable" },
      { label: "Origin", value: "Milan, IT" },
      { label: "Warranty", value: "10 years" },
    ],
    stock: 12,
    reviews: [
      { author: "K. Werner", rating: 5, title: "Best desk lamp I own.", body: "The dimmer curve is genuinely thoughtful.", date: "Sep 2024" },
      { author: "J. Moretti", rating: 5, title: "Worth it.", body: "Feels like a tool, not a decoration.", date: "Aug 2024" },
    ],
  },
  {
    slug: "atlas-throw",
    code: "OBJ_004",
    name: "Atlas Throw",
    material: "Undyed Linen",
    category: "Textiles",
    price: 220,
    imageKey: "atlas-throw",
    tagline: "Woven raw, softens with time.",
    description:
      "A generous throw in undyed linen from a single mill in northern Portugal. Hand-knotted fringe. Softens dramatically after the first wash.",
    specs: [
      { label: "Dimensions", value: "130 × 180 cm" },
      { label: "Weight", value: "820 g" },
      { label: "Fiber", value: "100% European linen" },
      { label: "Care", value: "Machine wash cold" },
    ],
    stock: 2,
    reviews: [
      { author: "L. Bourgeois", rating: 5, title: "Perfect weight.", body: "Drapes beautifully over the arm of a sofa.", date: "Oct 2024" },
    ],
  },
  {
    slug: "field-notebook",
    code: "OBJ_005",
    name: "Field Notebook",
    material: "Full-grain Leather",
    category: "Stationery",
    price: 96,
    discount: 15,
    imageKey: "field-notebook",
    tagline: "Brass corners. 240 pages. Refillable.",
    description:
      "A working notebook — full-grain leather, brass reinforced corners, and a refillable dot-grid insert stitched in Portugal.",
    specs: [
      { label: "Dimensions", value: "A5, 21 × 14 cm" },
      { label: "Pages", value: "240, dot grid" },
      { label: "Origin", value: "Lisbon, PT" },
      { label: "Refill", value: "Included × 1" },
    ],
    stock: 24,
    reviews: [
      { author: "T. Chalamet", rating: 5, title: "Ages well.", body: "The leather has developed a genuinely good patina.", date: "Jun 2024" },
      { author: "A. Salomon", rating: 4, title: "Solid.", body: "Elastic could be tighter. Otherwise, no complaints.", date: "May 2024" },
    ],
  },
  {
    slug: "arch-bookend",
    code: "OBJ_006",
    name: "Arch Bookend",
    material: "Carved Limestone",
    category: "Objects",
    price: 145,
    imageKey: "arch-bookend",
    tagline: "Sold as a single. Buy two.",
    description:
      "A hand-carved limestone arch set into a rough-hewn base. Each is quarried and finished by a single mason in the south of France.",
    specs: [
      { label: "Dimensions", value: "H 18 · L 24 cm" },
      { label: "Weight", value: "3.2 kg" },
      { label: "Origin", value: "Provence, FR" },
      { label: "Sold as", value: "Single unit" },
    ],
    stock: 15,
    reviews: [
      { author: "R. Koolhaas", rating: 5, title: "Bought two.", body: "The pair bookends a shelf of monographs perfectly.", date: "Sep 2024" },
    ],
  },
  {
    slug: "amber-carafe",
    code: "OBJ_007",
    name: "Amber Carafe",
    material: "Smoked Glass · Cork",
    category: "Kitchen",
    price: 78,
    imageKey: "amber-carafe",
    tagline: "Mouth-blown, corked by hand.",
    description:
      "A smoked-glass carafe with a hand-fitted cork stopper. Holds one liter. Made to sit on a table, not in a cabinet.",
    specs: [
      { label: "Volume", value: "1.0 L" },
      { label: "Height", value: "26 cm" },
      { label: "Origin", value: "Bohemia, CZ" },
      { label: "Care", value: "Hand-wash" },
    ],
    stock: 18,
    reviews: [
      { author: "P. Zumthor", rating: 5, title: "Warm object.", body: "The smoked glass reads different against every light.", date: "Oct 2024" },
    ],
  },
  {
    slug: "meridian-clock",
    code: "OBJ_008",
    name: "Meridian Wall Clock",
    material: "Brass · Glass",
    category: "Objects",
    price: 340,
    discount: 10,
    imageKey: "meridian-clock",
    tagline: "Mechanical. Silent. Serviceable.",
    description:
      "A German mechanical movement housed in a solid brass case. Winds once per week. Serviceable for a lifetime.",
    specs: [
      { label: "Diameter", value: "28 cm" },
      { label: "Movement", value: "Mechanical, 8-day" },
      { label: "Origin", value: "Schwarzwald, DE" },
      { label: "Warranty", value: "Lifetime service" },
    ],
    stock: 9,
    reviews: [
      { author: "A. Loos", rating: 5, title: "Precise.", body: "The tick is quiet enough for a bedroom. Beautiful case.", date: "Sep 2024" },
      { author: "T. Ando", rating: 4, title: "Serious.", body: "Heavier than the photo suggests. Anchor-mounts included.", date: "Aug 2024" },
    ],
  },
  {
    slug: "grain-board",
    code: "OBJ_009",
    name: "Grain Cutting Board",
    material: "Solid Walnut",
    category: "Kitchen",
    price: 130,
    imageKey: "grain-board",
    tagline: "One plank. Deep juice groove.",
    description:
      "Cut from a single plank of American walnut and finished with mineral oil. Deep juice groove. Reversible face.",
    specs: [
      { label: "Dimensions", value: "45 × 28 × 3 cm" },
      { label: "Weight", value: "2.1 kg" },
      { label: "Origin", value: "Vermont, US" },
      { label: "Care", value: "Oil monthly" },
    ],
    stock: 20,
    reviews: [
      { author: "C. Boulud", rating: 5, title: "Kitchen anchor.", body: "Heavy enough to sit still under a knife.", date: "Oct 2024" },
    ],
  },
  {
    slug: "travertine-holder",
    code: "OBJ_010",
    name: "Travertine Incense Holder",
    material: "Raw Travertine",
    category: "Objects",
    price: 62,
    discount: 25,
    imageKey: "travertine-holder",
    tagline: "Rough base. Turned well.",
    description:
      "A single well turned into a rough travertine offcut. Sold as-is — every stone reads slightly different.",
    specs: [
      { label: "Dimensions", value: "L 14 × W 9 cm" },
      { label: "Weight", value: "1.1 kg" },
      { label: "Origin", value: "Tivoli, IT" },
      { label: "Fits", value: "Standard incense stick" },
    ],
    stock: 30,
    reviews: [
      { author: "N. Foster", rating: 5, title: "Grounding.", body: "The rough underside is the whole point. Beautiful piece.", date: "Sep 2024" },
    ],
  },
  {
    slug: "hearth-slippers",
    code: "OBJ_011",
    name: "Hearth Slippers",
    material: "Boiled Wool Felt",
    category: "Apparel",
    price: 88,
    imageKey: "hearth-slippers",
    tagline: "Cut on a single last. Warm.",
    description:
      "Made from a single piece of boiled Merino felt, hand-cut and stitched to a natural rubber sole. Sized to break in.",
    specs: [
      { label: "Sizes", value: "EU 36–46" },
      { label: "Sole", value: "Natural rubber" },
      { label: "Origin", value: "Alto Adige, IT" },
      { label: "Care", value: "Spot clean" },
    ],
    stock: 16,
    reviews: [
      { author: "F. Wright", rating: 5, title: "Winter uniform.", body: "Warm without being hot. Wear these every evening.", date: "Nov 2024" },
      { author: "M. Barragán", rating: 5, title: "Beautiful cut.", body: "They mold to the foot within a week.", date: "Oct 2024" },
    ],
  },
  {
    slug: "verde-kettle",
    code: "OBJ_012",
    name: "Verde Kettle",
    material: "Enameled Cast Iron",
    category: "Kitchen",
    price: 195,
    discount: 15,
    imageKey: "verde-kettle",
    tagline: "Cast iron. Slow to boil. Warm forever.",
    description:
      "A 1.6L kettle in deep enameled green. Slow to heat, glacial to cool. Stove or hearth. Chip-resistant enamel.",
    specs: [
      { label: "Volume", value: "1.6 L" },
      { label: "Weight", value: "2.4 kg" },
      { label: "Origin", value: "Iwate, JP" },
      { label: "Compatible", value: "Gas · Induction · Electric" },
    ],
    stock: 11,
    reviews: [
      { author: "J. Chan", rating: 5, title: "Rain-day object.", body: "The whistle is soft — no drama. Loves being on the stove.", date: "Oct 2024" },
      { author: "I. Chipperfield", rating: 4, title: "Beautiful green.", body: "Deeper than the photo. Handles heat well.", date: "Sep 2024" },
    ],
  },
];

module.exports = { products };
