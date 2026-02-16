const express = require("express");
const app = express();
const port = 8000;
const cors = require("cors");
var cookieParser = require("cookie-parser");
const dbConfig = require("./dbConfig");
const route = require("./router");
const cloudinaryConfig = require("./services/cloudinaryConfig");

app.use(express.json());
app.use(cookieParser());
require("dotenv").config();
app.use(cors());
dbConfig();
cloudinaryConfig();
app.use(route);

app.listen(port, () => {
  console.log("Server is running");
});
