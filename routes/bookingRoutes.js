const express = require("express");
const router = express.Router();
const Booking = require("../models/Booking");
const verifyToken = require("../middleware/verifyToken");
require('dotenv').config();

// Hämta alla bokningar (ADMIN)
router.get("/", verifyToken, async (req, res) => {
    try {
        const bookings = await Booking.find().sort({ date: 1 });
        res.json(bookings);
    } catch(err) {
        res.status(500).json({ message: "Ett serverfel har inträffat. Försök igen senare. " });
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
        // Högst 6 antal gäster.
        if(guests > 6) {
            return res.status(400).json({ message: "Max antal gäster per bokning är 6!" });
        }

        // Bokning framåt i tiden endast eller samma dag.
        if(bookingDate < todaysDate) {
            return res.status(400).json({ message: "Du kan endast boka framåt i tiden eller för senare samma dag!" });
        }

        // Begränsar bokning till mellan 15:00 och 21:00.
        const [hours, minutes] = time.split(":").map(Number);
        
        if(hours < 15 || (hours >= 21 && minutes > 0) || hours >= 22) {
            return res.status(400).json({ message: "Bokningar kan endast göras mellan 15:00 och 21:00."})
        }

        const booking = new Booking(req.body);
        const savedBooking = await booking.save();

        res.status(201).json(savedBooking);
    } catch(err) {
        res.status(400).json({ message: "Bokningen kunde inte skapas. Kontrollera att fälten har fyllts i korrekt och försök igen. " });
    }
});

// Ta bort enskild bokning.
router.delete("/:id", verifyToken, async (req, res) => {
    try {
        await Booking.findByIdAndDelete(req.params.id);
        res.json({ message: "Bokning borttagen!", Booking});
    } catch(err) {
        res.status(500).json({ message: "Fel uppstod vid borttagning av bokning." });
    }
});

module.exports = router;