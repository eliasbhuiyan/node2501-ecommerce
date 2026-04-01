const express = require("express");
const app = express();
const port = 8000;
const cors = require("cors");
var cookieParser = require("cookie-parser");
const dbConfig = require("./dbConfig");
const route = require("./router");
const cloudinaryConfig = require("./services/cloudinaryConfig");
const dns = require('dns');
const { webhook } = require("./controllers/orderController");
dns.setServers(['8.8.8.8', '8.8.4.4']);
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser());
require("dotenv").config();
app.use(cors());
dbConfig();
cloudinaryConfig();

app.post("/webhook", express.raw({ type: 'application/json' }), webhook)
app.use(express.json());

app.use(route);

app.listen(port, () => {
  console.log("Server is running");
});
