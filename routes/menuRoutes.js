const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const MenuItem = require("../models/MenuItem");

// Hämtar alla Menyobjekt
router.get("/menu", async (req, res) => {
    try {
        const items = await MenuItem.find();
        res.json(items);
    } catch(err) {
        res.status(500).json({ message: err.message });
    }
});

// Hämtar enskilda menyobjekt baserat på id.
router.get("/menu/:id", async (req, res) => {
    try {
        const item = await MenuItem.findById(req.params.id);
        if(!item) {
            return res.status(404).json({ message: "Menyobjekt ej funnet!" });
        }
        res.json(item);
    } catch(err) {
        res.status(500).json({ message: err.message });
    }
});

// Lägger till ett menyobjekt.
router.post("/menu", async (req, res) => {
    const { title, description, price, category } = req.body;
    const menuItem = new MenuItem({ title, description, price, category });

    try {
        const newItem = await menuItem.save();
        res.status(201).json(newItem);
    } catch(err) {
        res.status(400).json({ message: err.message });
    }
});

// Ändra befintligt menyobjekt via id.
router.put("/menu/:id", async (req, res) => {
    try {
        const updatedItem = await MenuItem.findByIdAndUpdate(req.params.id, { new: true });
        res.json(updatedItem);
    } catch(err) {
        res.status(400).json({ message: err.message });
    }
});

// Radera befintligt menyobjekt via id.
router.delete("/menu/:id", async (req, res) => {
    try {
        await MenuItem.findByIdAndDelete(req.params.id);
        res.json({ message: "Menyobjekt raderat!"});
    } catch(err) {
        res.status(500).json({ message: err.message });
    }
});