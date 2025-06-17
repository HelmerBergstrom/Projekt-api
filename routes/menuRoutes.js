const express = require("express");
const router = express.Router();
const MenuItem = require("../models/MenuItem");

// Hämtar alla Menyobjekt
router.get("/", async (req, res) => {
    try {
        const items = await MenuItem.find();
        res.json(items);
    } catch(err) {
        res.status(500).json({ message: "Menyobjekten gick inte att hämta. Vänligen försök igen senare. " });
    }
});

// Hämtar enskilda menyobjekt baserat på id.
router.get("/:id", async (req, res) => {
    try {
        const item = await MenuItem.findById(req.params.id);
        if(!item) {
            return res.status(404).json({ message: "Menyobjektet hittades inte!" });
        }
        res.json(item);
    } catch(err) {
        res.status(500).json({ message: "Det specifika menyobjektet gick inte att hämta. " });
    }
});

// Lägger till ett menyobjekt.
router.post("/", async (req, res) => {
    const { title, description, price, category } = req.body;
    if(!title || !description || !price || !category) {
        return res.status(400).json({ message: "Titel, beskrivning, pris och kategori måste fyllas i!"});
    }

    const menuItem = new MenuItem({ title, description, price, category });

    try {
        const newItem = await menuItem.save();
        res.status(201).json(newItem);
    } catch(err) {
        res.status(400).json({ message: "Det gick inte att lägga till menyobjekt. Kontrollera att alla fält fyllts i korrekt eller försök igen sennare. " });
    }
});

// Ändra befintligt menyobjekt via id.
router.put("/:id", async (req, res) => {
    try {
        const updatedItem = await MenuItem.findByIdAndUpdate(req.params.id, req.body, { new: true });

        if(!updatedItem) {
            return res.status(404).json({ message: "Menyobjektet hittades inte!"});
        }
        
        res.json(updatedItem);
    } catch(err) {
        res.status(400).json({ message: "Det gick inte att ändra menyobjektet. Kontrollera inmatningen eller försök igen senare. " });
    }
});

// Radera befintligt menyobjekt via id.
router.delete("/:id", async (req, res) => {
    try {
        await MenuItem.findByIdAndDelete(req.params.id);
        res.json({ message: "Menyobjektet raderat!" });
    } catch(err) {
        res.status(500).json({ message: "Borttagning av menyobjektet nekades. Vänligen försök igen senare. " });
    }
});

module.exports = router;