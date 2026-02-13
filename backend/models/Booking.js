const mongoose = require("mongoose");

const GuestSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  address: String
});

const BookingSchema = new mongoose.Schema({
  hotelName: { type: String, required: true },
  checkInDate: { type: Date, required: true },
  checkOutDate: { type: Date, required: true },
  checkInTime: { type: String, required: true },
  checkOutTime: { type: String, required: true },
  numRooms: { type: Number, required: true },
  numPeople: { type: Number, required: true },
  guests: [GuestSchema]
}, { timestamps: true });

module.exports = mongoose.model("Booking", BookingSchema);
