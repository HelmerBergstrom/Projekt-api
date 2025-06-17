const express = require("express");
const router = express.Router();
const MenuItem = require("../models/MenuItem");

// Hämtar alla Menyobjekt
router.get("/", async (req, res) => {
    try {
        const items = await MenuItem.find();
        res.json(items);
    } catch(err) {
        res.status(500).json({ message: err.message });
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
        res.status(500).json({ message: err.message });
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
        res.status(400).json({ message: err.message });
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
        res.status(400).json({ message: err.message });
    }
});

// Radera befintligt menyobjekt via id.
router.delete("/:id", async (req, res) => {
    try {
        await MenuItem.findByIdAndDelete(req.params.id);
        res.json({ message: "Menyobjektet raderat!" });
    } catch(err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;