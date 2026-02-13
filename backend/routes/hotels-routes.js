const express = require("express");
const router = express.Router();
const Booking = require("../models/Booking");

// إنشاء حجز جديد
router.post("/", async (req, res) => {
  try {
    const data = req.body;

    // ✅ تأكيد إن guests Array
    if (data.guests && !Array.isArray(data.guests)) {
      data.guests = [data.guests];
    }

    // 🔍 Validation بسيط
    if (!data.guests || data.guests.length === 0) {
      return res.status(400).json({
        message: "بيانات النزيل مطلوبة"
      });
    }

    const booking = await Booking.create(data);

    res.status(201).json({
      message: "تم الحجز بنجاح",
      booking
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({
      message: "فشل إنشاء الحجز",
      error: error.message
    });
  }
});

module.exports = router;
