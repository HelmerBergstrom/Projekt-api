const mongoose = require("mongoose");

// Schema för bokningar. "Created" ligger bara i databasen, visas ej på webbplatsen.
const BookingSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
    },
    phone: {
        type: Number,
        required: true
    },
    email: {
        type: String
    },
    date: {
        type: Date,
        required: true
    },
    time: {
        type: String,
        required: true
    },
    guests: {
        type: Number,
        required: true
    },
    message: {
        type: String
    },
    created: {
        type: Date,
        default: Date.now
    }
});

// Exporterar schemat.
module.exports = mongoose.model("bookings", BookingSchema);