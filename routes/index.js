const express = require("express");
const router = express.Router();
require('dotenv').config();

// Samlar alla routes.
const menuRoutes = require("./menuRoutes");
router.use("/menu", menuRoutes);

const bookingRoutes = require("./bookingRoutes");
router.use("/bookings", bookingRoutes);

const authRoutes = require("./authRoutes");
router.use("/login", authRoutes);


module.exports = router;