const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const User = require("../models/User");

router.post("/login", async (req, res) => {
    try {
        const { username, password } = req.body;

        if(!username || !password ) {
            return res.status(400).json({ error: "Felaktigt användarnamn/lösenord! "});
        }

        const user = await User.findOne({ username });
        if(!user) {
            return res.status(401).json({ error: "Felaktigt användarnamn/lösenord! " });
        }

        const passwordMatch = await user.comparePassword(password);
        if(!passwordMatch) {
            return res.status(401).json({ error: "Felaktigt användarnamn/lösenord! "});
        } else {
            const userString = { username: username };
            const token = jwt.sign(userString, process.env.JWT_KEY, { expiresIn: '2h' });
            const response = {
                message: "Admin inloggad...",
                token: token
            }
            res.status(200).json(response);
        }

        } catch(err) {
            res.status(500).json({ message: "Server error!" });
        }
});

module.exports = router;