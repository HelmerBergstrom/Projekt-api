const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();
const mongoose = require("mongoose");

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(bodyParser.json());

mongoose.connect("mongodb://127.0.0.1:27017/giffers").then(() => {
    console.log("Connected to MongoDB :)")
}).catch((error) => {
    console.log("Error connecting to database: " + error); 
});

const routes = require("./routes/index");
app.use("/api", routes);


app.listen(port, () => {
    console.log("Server running on http://localhost:" + port)
});