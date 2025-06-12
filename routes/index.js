const express = require("express");
const router = express.Router();

const menuRoutes = require("./menuRoutes");
const Booking = require("../models/Booking");

router.use("/menu", menuRoutes);
router.use("/booking", Booking);

module.exports = router;