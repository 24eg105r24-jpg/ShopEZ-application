const mongoose = require("mongoose");

const orderItemSchema = new mongoose.Schema(
  {
    product: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
    slug: { type: String, required: true },
    name: { type: String, required: true },
    price: { type: Number, required: true }, // unit price at time of purchase
    quantity: { type: Number, required: true, min: 1 },
    imageKey: { type: String },
  },
  { _id: false },
);

const orderSchema = new mongoose.Schema(
  {
    orderNumber: { type: String, required: true, unique: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    items: { type: [orderItemSchema], validate: (v) => v.length > 0 },
    subtotal: { type: Number, required: true },
    shipping: { type: Number, required: true, default: 0 },
    total: { type: Number, required: true },
    status: {
      type: String,
      enum: ["Processing", "Shipped", "Delivered", "Cancelled"],
      default: "Processing",
    },
    shippingAddress: {
      fullName: String,
      line1: String,
      city: String,
      postalCode: String,
      country: String,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Order", orderSchema);
