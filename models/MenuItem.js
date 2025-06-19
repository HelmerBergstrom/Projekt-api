const mongoose = require("mongoose");

const MenuItemSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
    },
    price: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        required: true,
        enum: ["Förrätt", "Varmrätt", "Efterrätt", "Dryck"]
    },
});

module.exports = mongoose.model("menu", MenuItemSchema);