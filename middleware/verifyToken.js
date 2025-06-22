const jwt = require("jsonwebtoken");
require('dotenv').config();

// Funktion för att verifiera användare/admin. 
module.exports = function(req, res, next) {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if(!token) {
        return res.status(401).json({ message: "Åtkomst nekad, logga in på nytt för att försöka igen."});
    }

    try {
        const decodedToken = jwt.verify(token, process.env.JWT_KEY);
        req.user = decodedToken;
        next();
    } catch(err) {
        return res.status(403).json({ message: "Ogiltlig token! "});
    }
}