const express = require("express");
const router = express.Router();
const Booking = require("../models/Booking");

// Hämta alla bokningar (ADMIN)
router.get("/", async (req, res) => {
    try {
        const bookings = await Booking.find().sort({ date: 1 });
        res.json(bookings);
    } catch(err) {
        res.status(500).json({ message: err.message });
    }
});

// Skapa ny bokning
router.post("/", async (req, res) => {
    try {
        const { fullName, phone, date, time, guests } = req.body;

        if(!fullName || !phone || !date || !time || !guests || guests > 6) {
            return res.status(400).json({ message: "Namn, telefonnummer, datum, tid och antal gäster måste fyllas i!"});
        }

        const booking = new Booking(req.body);
        const savedBooking = await booking.save();

        res.status(201).json(savedBooking);
    } catch(err) {
        res.status(400).json({ message: err.message });
    }
});

// Ta bort enskild bokning.
router.delete("/:id", async (req, res) => {
    try {
        await Booking.findByIdAndDelete(req.params.id);
        res.json({ message: "Bokning borttagen!"});
    } catch(err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;