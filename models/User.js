const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
require('dotenv').config();

// Schema för användare/admin.
const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

// Krypterar lösenordet innan det sparas i databasen.
UserSchema.pre("save", async function(next) {
    try {
        if(this.isNew || this.isModified("password")) {
            const hashedPass = await bcrypt.hash(this.password, 10)
            this.password = hashedPass;
        }
        next();
    } catch(error) {
        next(error)
    };
});

// Metod för att jämföra lösenord vid inloggning till Admin-sidan.
UserSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};

module.exports = mongoose.model("User", UserSchema);