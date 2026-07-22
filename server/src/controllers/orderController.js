const asyncHandler = require("express-async-handler");
const Product = require("../models/Product");
const Order = require("../models/Order");

function makeOrderNumber() {
  return "EZ-" + Math.floor(1000 + Math.random() * 9000);
}

// @route POST /api/orders  (buyer, authenticated)
// body: { items: [{ slug, quantity }], shippingAddress }
const createOrder = asyncHandler(async (req, res) => {
  const { items, shippingAddress } = req.body;

  if (!Array.isArray(items) || items.length === 0) {
    res.status(400);
    throw new Error("Cannot place an order with no items");
  }

  const orderItems = [];
  let subtotal = 0;

  for (const line of items) {
    const product = await Product.findOne({ slug: line.slug });
    if (!product) {
      res.status(404);
      throw new Error(`Product not found: ${line.slug}`);
    }
    const quantity = Math.max(1, Number(line.quantity) || 1);
    if (product.stock < quantity) {
      res.status(400);
      throw new Error(`Not enough stock for ${product.name}`);
    }

    const unitPrice = product.discount
      ? +(product.price * (1 - product.discount / 100)).toFixed(2)
      : product.price;

    orderItems.push({
      product: product._id,
      slug: product.slug,
      name: product.name,
      price: unitPrice,
      quantity,
      imageKey: product.imageKey,
    });

    subtotal += unitPrice * quantity;
    product.stock -= quantity;
    await product.save();
  }

  const shipping = subtotal > 300 || subtotal === 0 ? 0 : 18;
  const total = +(subtotal + shipping).toFixed(2);

  const order = await Order.create({
    orderNumber: makeOrderNumber(),
    user: req.user._id,
    items: orderItems,
    subtotal: +subtotal.toFixed(2),
    shipping,
    total,
    shippingAddress,
  });

  res.status(201).json(order);
});

// @route GET /api/orders/mine  (authenticated buyer)
const getMyOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 });
  res.json(orders);
});

// @route GET /api/orders  (seller only) — all orders, for the seller portal
const getAllOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({})
    .populate("user", "name email")
    .sort({ createdAt: -1 });
  res.json(orders);
});

// @route GET /api/orders/:id  (owner or seller)
const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate("user", "name email");
  if (!order) {
    res.status(404);
    throw new Error("Order not found");
  }
  const isOwner = String(order.user._id) === String(req.user._id);
  if (!isOwner && req.user.role !== "seller") {
    res.status(403);
    throw new Error("Not authorized to view this order");
  }
  res.json(order);
});

// @route PATCH /api/orders/:id/status  (seller only)
const updateOrderStatus = asyncHandler(async (req, res) => {
  const { status } = req.body;
  const allowed = ["Processing", "Shipped", "Delivered", "Cancelled"];
  if (!allowed.includes(status)) {
    res.status(400);
    throw new Error(`Status must be one of: ${allowed.join(", ")}`);
  }

  const order = await Order.findById(req.params.id);
  if (!order) {
    res.status(404);
    throw new Error("Order not found");
  }

  order.status = status;
  await order.save();
  res.json(order);
});

module.exports = {
  createOrder,
  getMyOrders,
  getAllOrders,
  getOrderById,
  updateOrderStatus,
};
