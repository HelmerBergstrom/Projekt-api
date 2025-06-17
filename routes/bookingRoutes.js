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

        const bookingDate = new Date(date);
        const todaysDate = new Date();
        todaysDate.setHours(0, 0, 0, 0); // För att sätta tiden i date-objektet till 00:00:00.

        if(!fullName || !phone || !date || !time || !guests ) {
            return res.status(400).json({ message: "Namn, telefonnummer, datum, tid och antal gäster måste fyllas i!"});
        }
        if(guests > 6) {
            return res.status(400).json({ message: "Max antal gäster per bokning är 6!" });
        }

        if(bookingDate < todaysDate) {
            return res.status(400).json({ message: "Du kan endast boka framåt i tiden eller för senare samma dag!" });
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
        res.json({ message: "Bokning borttagen!", Booking});
    } catch(err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;