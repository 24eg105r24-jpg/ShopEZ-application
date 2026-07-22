const express = require("express");
const { getSummary, getInventory } = require("../controllers/dashboardController");
const { protect, authorize } = require("../middleware/auth");

const router = express.Router();

router.use(protect, authorize("seller"));
router.get("/summary", getSummary);
router.get("/inventory", getInventory);

module.exports = router;
