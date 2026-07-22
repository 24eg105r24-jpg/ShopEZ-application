const express = require("express");
const {
  getProducts,
  getCategories,
  getProductBySlug,
  createProduct,
  updateProduct,
  deleteProduct,
  addReview,
} = require("../controllers/productController");
const { protect, authorize } = require("../middleware/auth");

const router = express.Router();

router.get("/", getProducts);
router.get("/categories", getCategories);
router.get("/:slug", getProductBySlug);
router.post("/", protect, authorize("seller"), createProduct);
router.put("/:slug", protect, authorize("seller"), updateProduct);
router.delete("/:slug", protect, authorize("seller"), deleteProduct);
router.post("/:slug/reviews", protect, addReview);

module.exports = router;
