const express = require("express");
const route = express.Router();
const authRouter = require("./auth");
const productRouter = require("./product");
const order = require("./order")
const authMiddleWare = require("../middleware/authMiddleware");

route.use("/auth", authRouter);
route.use("/product", productRouter);
route.use("/category", require("./category"));
route.use("/cart", authMiddleWare, require("./cart"))

route.use(authMiddleWare, order)

route.get("/", (req, res) => {
  res.send("From Server");
});

module.exports = route;

// DB_URL=mongodb+srv://node2501-ecommerce:node2501-ecommerce@cluster0.hppyt.mongodb.net/node2501-ecommerce?appName=Cluster0
// JWT_SEC=123jskfdhasdf
// CLOUDE_API_SEC=7zDU_v72_tYpT0ojXy0Ogt8ebZI
// CLOUDE_API_KEY=776332758593124
// CLOUDE_NAME=djscrr2gy
// nabata9754@feriwor.com = 123456