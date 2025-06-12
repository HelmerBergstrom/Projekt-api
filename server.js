const express = require("express");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const cors = require("cors");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 3003;



app.listen(port, () => {
    console.log("Server running on http://localhost:" + port)
})