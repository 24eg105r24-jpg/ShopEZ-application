const express = require("express");
const {
  createOrder,
  getMyOrders,
  getAllOrders,
  getOrderById,
  updateOrderStatus,
} = require("../controllers/orderController");
const { protect, authorize } = require("../middleware/auth");

const router = express.Router();

router.post("/", protect, createOrder);
router.get("/mine", protect, getMyOrders);
router.get("/", protect, authorize("seller"), getAllOrders);
router.get("/:id", protect, getOrderById);
router.patch("/:id/status", protect, authorize("seller"), updateOrderStatus);

module.exports = router;
