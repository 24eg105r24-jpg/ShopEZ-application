const asyncHandler = require("express-async-handler");
const Product = require("../models/Product");

// @route GET /api/products
// Supports ?category=Lighting  ?sort=low|high|featured  ?search=lamp
const getProducts = asyncHandler(async (req, res) => {
  const { category, sort, search } = req.query;

  const filter = {};
  if (category && category !== "All") filter.category = category;
  if (search) {
    filter.$or = [
      { name: { $regex: search, $options: "i" } },
      { material: { $regex: search, $options: "i" } },
      { tagline: { $regex: search, $options: "i" } },
    ];
  }

  let query = Product.find(filter);

  const products = await query.exec();

  const withFinal = products.map((p) => p.toObject());
  if (sort === "low") withFinal.sort((a, b) => a.finalPrice - b.finalPrice);
  if (sort === "high") withFinal.sort((a, b) => b.finalPrice - a.finalPrice);

  res.json(withFinal);
});

// @route GET /api/products/categories
const getCategories = asyncHandler(async (req, res) => {
  res.json(["All", ...Product.CATEGORIES]);
});

// @route GET /api/products/:slug
const getProductBySlug = asyncHandler(async (req, res) => {
  const product = await Product.findOne({ slug: req.params.slug });
  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }
  res.json(product);
});

// @route POST /api/products  (seller only)
const createProduct = asyncHandler(async (req, res) => {
  const body = req.body;
  const product = await Product.create({
    ...body,
    seller: req.user._id,
  });
  res.status(201).json(product);
});

// @route PUT /api/products/:slug  (seller only, must own the product)
const updateProduct = asyncHandler(async (req, res) => {
  const product = await Product.findOne({ slug: req.params.slug });
  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }
  if (product.seller && String(product.seller) !== String(req.user._id)) {
    res.status(403);
    throw new Error("Not authorized to edit this product");
  }

  Object.assign(product, req.body);
  await product.save();
  res.json(product);
});

// @route DELETE /api/products/:slug  (seller only, must own the product)
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findOne({ slug: req.params.slug });
  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }
  if (product.seller && String(product.seller) !== String(req.user._id)) {
    res.status(403);
    throw new Error("Not authorized to delete this product");
  }
  await product.deleteOne();
  res.json({ message: "Product removed" });
});

// @route POST /api/products/:slug/reviews  (any authenticated user)
const addReview = asyncHandler(async (req, res) => {
  const { rating, title, body } = req.body;
  if (!rating || !title || !body) {
    res.status(400);
    throw new Error("Rating, title, and body are required");
  }

  const product = await Product.findOne({ slug: req.params.slug });
  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }

  product.reviews.push({
    user: req.user._id,
    author: req.user.name,
    rating,
    title,
    body,
    date: new Date().toISOString().slice(0, 7), // e.g. 2026-07
  });

  await product.save();
  res.status(201).json(product);
});

module.exports = {
  getProducts,
  getCategories,
  getProductBySlug,
  createProduct,
  updateProduct,
  deleteProduct,
  addReview,
};
