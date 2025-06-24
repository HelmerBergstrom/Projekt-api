const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const User = require("../models/User");
require('dotenv').config();

// Inloggningsroute för Admin. 
router.post("/", async (req, res) => {
    try {
        const { username, password } = req.body;

        // Vid fel användarnamn/lösenord.
        if(!username || !password ) {
            return res.status(400).json({ error: "Felaktigt användarnamn/lösenord! "});
        }

        // Kollar användarnamn och lösenord nedanför.
        const user = await User.findOne({ username });
        if(!user) {
            return res.status(401).json({ error: "Felaktigt användarnamn/lösenord! " });
        }

        const passwordMatch = await user.comparePassword(password);
        if(!passwordMatch) {
            return res.status(401).json({ error: "Felaktigt användarnamn/lösenord! "});
        } else {
            const userString = { username: username };
            const token = jwt.sign(userString, process.env.JWT_KEY, { expiresIn: '2h' }); // Token giltlig i 2 timmar.
            const response = {
                message: "Admin inloggad...",
                token: token
            }

            res.status(200).json(response);
        }

        } catch(err) {
            console.log("Login error:", err)
            res.status(500).json({ message: "Server error!" });
        }
});

module.exports = router;

// Nedan kod är för att skapa en användare. 
// Bortkommenterad då detta endast gjordes för ett admin-inlogg.

// router.post("/register", async (req, res) => {
//     try {
//         const { username, password } = req.body;
//         const newUser = new User({ username, password });
//         await newUser.save();
//         res.status(201).json({ message: "Admin skapad" });
//     } catch (err) {
//         res.status(500).json({ error: "Fel vid skapande av admin" });
//     }
// });