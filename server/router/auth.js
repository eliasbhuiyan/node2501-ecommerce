const express = require("express");
const {
  signupUser,
  verifyOtp,
  resendOTP,
  signInUser,
  forgatePass,
  resetPassword,
} = require("../controllers/authController");
const authMiddleWare = require("../middleware/authMiddleware");
const route = express.Router();

route.post("/signup", signupUser);
route.post("/verifyotp", verifyOtp);
route.post("/resendotp", resendOTP);
route.post("/signin", signInUser);
route.post("/forgatepass", forgatePass);
route.post("/resetpass/:token", resetPassword);
module.exports = route;
