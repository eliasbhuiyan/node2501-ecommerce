const express = require("express");
const { addToCart, getUserCart } = require("../controllers/CartController");
const route = express.Router();

route.post("/add", addToCart)
route.get(getUserCart);

module.exports = route;
