const express = require("express");
const multer = require("multer");
const upload = multer();
const {
  signupUser,
  verifyOtp,
  resendOTP,
  signInUser,
  forgatePass,
  resetPassword,
  getUserProfile,
  updateUserProfile,
  refreshAccessToken,
} = require("../controllers/authController");
const authMiddleWare = require("../middleware/authMiddleware");
const route = express.Router();

route.post("/signup", signupUser);
route.post("/signin", signInUser);
route.post("/verifyotp", verifyOtp);
route.post("/resendotp", resendOTP);
route.post("/forgatepass", forgatePass);
route.post("/resetpass/:token", resetPassword);
route.get("/profile", authMiddleWare, getUserProfile);
route.put(
  "/profile",
  authMiddleWare,
  upload.single("avatar"),
  updateUserProfile,
);

route.post("/refreshtoken", refreshAccessToken);
module.exports = route;
