const express = require("express");
const app = express();
const port = 8000;
const cors = require("cors");
var cookieParser = require("cookie-parser");
const dbConfig = require("./dbConfig");
const route = require("./router");
const crypto = require("crypto");
app.use(express.json());
app.use(cookieParser());
require("dotenv").config();
app.use(cors());
dbConfig();
app.use(route);
// console.log(crypto.randomBytes(2).toString("hex"));

app.listen(port, () => {
  console.log("Server is running");
});
