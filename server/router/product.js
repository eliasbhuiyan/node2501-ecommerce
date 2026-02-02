const express = require("express");
const { createProduct } = require("../controllers/productController");
const authMiddleWare = require("../middleware/authMiddleware");
const roleCheckMiddleware = require("../middleware/roleCheckMiddleware");
const multer = require("multer");
const route = express.Router();
const upload = multer()

route.post("/create", authMiddleWare, roleCheckMiddleware("admin", "editor"), upload.fields([{ name: 'thumbnail', maxCount: 1 }, { name: 'images', maxCount: 4 }]), createProduct)


module.exports = route;
