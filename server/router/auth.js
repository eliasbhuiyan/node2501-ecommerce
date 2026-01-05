const express = require("express");
const { signupUser, verifyOtp, resendOTP, signInUser } = require("../controllers/authController");
const route = express.Router();

route.post("/signup", signupUser);
route.post("/verifyotp", verifyOtp);
route.post("/resendotp", resendOTP);
route.post("/signin", signInUser);

module.exports = route;
