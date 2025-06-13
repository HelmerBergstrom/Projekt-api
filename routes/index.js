const express = require("express");
const router = express.Router();

const menuRoutes = require("./menuRoutes");
router.use("/menu", menuRoutes);

const bookingRoutes = require("./bookingRoutes");
router.use("/booking", bookingRoutes);

const authRoutes = require("./authRoutes");
router.use("/auth", authRoutes);


module.exports = router;