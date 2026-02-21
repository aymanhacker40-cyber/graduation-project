const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const carRoutes = require("./routes/carRoutes");

connectDB();

const app = express();

app.use(cors());
app.use(express.json());

// Auth routes
app.use("/api/auth", require("./routes/authRoutes"));

// Hotels / Cars routes
app.use("/api/hotels", require("./routes/hotels-routes"));
// Car Booking routes
app.use("/api/car-bookings", require("./routes/carBookingRoutes"));
// Contact routes
app.use("/api", require("./routes/contactRoutes"));

app.use("/api/cars", carRoutes);
app.use("/api/carsar", carRoutes);

app.get("/", (req, res) => {
  res.send("Working");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
