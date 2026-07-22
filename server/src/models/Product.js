const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    author: { type: String, required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    title: { type: String, required: true },
    body: { type: String, required: true },
    date: { type: String, default: () => new Date().toISOString().slice(0, 10) },
  },
  { timestamps: true },
);

const specSchema = new mongoose.Schema(
  {
    label: { type: String, required: true },
    value: { type: String, required: true },
  },
  { _id: false },
);

const CATEGORIES = [
  "Furniture",
  "Ceramics",
  "Lighting",
  "Textiles",
  "Stationery",
  "Objects",
  "Kitchen",
  "Apparel",
];

const productSchema = new mongoose.Schema(
  {
    // slug-style id, kept stable so it matches frontend routes/image map
    slug: { type: String, required: true, unique: true, index: true },
    code: { type: String, required: true, unique: true },
    name: { type: String, required: true, trim: true },
    material: { type: String, required: true },
    category: { type: String, required: true, enum: CATEGORIES },
    price: { type: Number, required: true, min: 0 },
    discount: { type: Number, min: 0, max: 90, default: 0 }, // percentage off
    imageKey: { type: String, required: true }, // frontend maps this to a bundled asset
    tagline: { type: String, required: true },
    description: { type: String, required: true },
    specs: [specSchema],
    reviews: [reviewSchema],
    stock: { type: Number, required: true, default: 10, min: 0 },
    seller: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true },
);

productSchema.virtual("finalPrice").get(function computeFinalPrice() {
  return this.discount ? +(this.price * (1 - this.discount / 100)).toFixed(2) : this.price;
});

productSchema.virtual("avgRating").get(function computeAvgRating() {
  if (!this.reviews.length) return 0;
  const total = this.reviews.reduce((sum, r) => sum + r.rating, 0);
  return +(total / this.reviews.length).toFixed(1);
});

productSchema.set("toJSON", { virtuals: true });
productSchema.set("toObject", { virtuals: true });

module.exports = mongoose.model("Product", productSchema);
module.exports.CATEGORIES = CATEGORIES;
