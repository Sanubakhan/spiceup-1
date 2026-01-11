const express = require("express");
const router = express.Router();

const upload = require("../middleware/upload.middleware");
const { addFoodItem, getFoodItems } = require("../controllers/food.controller");
const { foodpartnermiddleware } = require("../middleware/auth.middleware");

// ✅ UPLOAD ROUTE (THIS SAVES FILES)
router.post(
  "/addfooditem",
  foodpartnermiddleware,
  upload.single("vedio"), // 👈 MUST MATCH frontend key
  addFoodItem
);

// ✅ FETCH REELS
router.get("/reels", getFoodItems);

module.exports = router;
