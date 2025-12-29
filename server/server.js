const express = require("express");
const app = express();
const port = 8000;
const cors = require("cors");
const dbConfig = require("./dbConfig");
const route = require("./router");
app.use(express.json());
require("dotenv").config();
app.use(cors());
dbConfig();
app.use(route);

app.listen(port, () => {
  console.log("Server is running");
});
