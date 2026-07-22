require("dotenv").config();
const connectDB = require("../config/db");
const User = require("../models/User");
const Product = require("../models/Product");
const Order = require("../models/Order");
const { products } = require("./data");

async function run() {
  await connectDB();

  const destroy = process.argv.includes("--destroy");

  if (destroy) {
    await Promise.all([Product.deleteMany({}), Order.deleteMany({}), User.deleteMany({})]);
    console.log("All data destroyed.");
    process.exit(0);
  }

  // Wipe existing catalog/orders so the seed is idempotent, but keep it simple
  await Order.deleteMany({});
  await Product.deleteMany({});
  await User.deleteMany({ email: { $in: ["seller@shopez.com", "buyer@shopez.com"] } });

  const seller = await User.create({
    name: "Julia — Studio Monolith",
    email: "seller@shopez.com",
    password: "password123",
    role: "seller",
    studioName: "Studio Monolith",
  });

  await User.create({
    name: "Demo Buyer",
    email: "buyer@shopez.com",
    password: "password123",
    role: "buyer",
  });

  const withSeller = products.map((p) => ({ ...p, seller: seller._id }));
  await Product.insertMany(withSeller);

  console.log(`Seeded ${products.length} products.`);
  console.log("Demo accounts:");
  console.log("  seller@shopez.com / password123  (role: seller)");
  console.log("  buyer@shopez.com  / password123  (role: buyer)");
  process.exit(0);
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
