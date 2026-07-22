const asyncHandler = require("express-async-handler");
const Product = require("../models/Product");
const Order = require("../models/Order");

// @route GET /api/dashboard/summary  (seller only)
const getSummary = asyncHandler(async (req, res) => {
  const now = new Date();
  const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

  const orders = await Order.find({});
  const recentOrders = orders.filter((o) => o.createdAt >= thirtyDaysAgo);

  const revenue30d = recentOrders.reduce((sum, o) => sum + o.total, 0);
  const activeOrders = orders.filter((o) => o.status === "Processing" || o.status === "Shipped");

  const buyerCounts = {};
  orders.forEach((o) => {
    const key = String(o.user);
    buyerCounts[key] = (buyerCounts[key] || 0) + 1;
  });
  const buyers = Object.keys(buyerCounts);
  const repeatBuyers = buyers.filter((b) => buyerCounts[b] > 1).length;
  const repeatRate = buyers.length ? Math.round((repeatBuyers / buyers.length) * 100) : 0;

  // Monthly sales for the trailing 12 months
  const months = [];
  for (let i = 11; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    months.push({ label: d.toLocaleString("en-US", { month: "short" })[0], year: d.getFullYear(), month: d.getMonth(), total: 0 });
  }
  orders.forEach((o) => {
    const d = new Date(o.createdAt);
    const bucket = months.find((m) => m.year === d.getFullYear() && m.month === d.getMonth());
    if (bucket) bucket.total += o.total;
  });
  const maxTotal = Math.max(1, ...months.map((m) => m.total));
  const salesBars = months.map((m) => ({
    label: m.label,
    total: +m.total.toFixed(2),
    heightPct: Math.round((m.total / maxTotal) * 100),
  }));

  // Top products by units sold
  const unitsBySlug = {};
  orders.forEach((o) => {
    o.items.forEach((it) => {
      if (!unitsBySlug[it.slug]) unitsBySlug[it.slug] = { name: it.name, units: 0, revenue: 0 };
      unitsBySlug[it.slug].units += it.quantity;
      unitsBySlug[it.slug].revenue += it.price * it.quantity;
    });
  });
  const topProducts = Object.values(unitsBySlug)
    .sort((a, b) => b.units - a.units)
    .slice(0, 5)
    .map((p) => ({ ...p, revenue: +p.revenue.toFixed(2) }));

  res.json({
    revenue30d: +revenue30d.toFixed(2),
    activeOrders: activeOrders.length,
    ordersNeedingAction: orders.filter((o) => o.status === "Processing").length,
    repeatCustomerRate: repeatRate,
    totalOrders: orders.length,
    salesBars,
    topProducts,
  });
});

// @route GET /api/dashboard/inventory  (seller only)
const getInventory = asyncHandler(async (req, res) => {
  const products = await Product.find({}).sort({ stock: 1 });
  res.json(
    products.map((p) => ({
      slug: p.slug,
      code: p.code,
      name: p.name,
      stock: p.stock,
      low: p.stock <= 5,
    })),
  );
});

module.exports = { getSummary, getInventory };
