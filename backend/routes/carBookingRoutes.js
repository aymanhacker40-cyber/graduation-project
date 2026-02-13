const express = require("express");
const router = express.Router();

const { createCarBooking } = require("../controllers/carBookingController");
const protect = require("../middleware/authMiddleware");

// 🔒 route محمي
router.post("/", protect, createCarBooking);

module.exports = router;
