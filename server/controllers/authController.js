const userSchema = require("../models/userSchema");
const { emailVerifyTem, resetPassEmailTemp } = require("../services/emailTemp");
const { sendEmail } = require("../services/emaiServices");
const { generateOTP, generateAccessToken, generateRefreshToken, generateResetPassToken } = require("../services/helpers");
const { responseHandler } = require("../services/responseHandler");
const { isValidEmail } = require("../services/validation");

const signupUser = async (req, res) => {
  try {
    const { fullName, email, password, phone, address } = req.body;
    if (!email) return res.status(400).send({ message: "Email is required" });
    if (!isValidEmail(email))
      return responseHandler(res, 400, "Enter a valid email address", false);
    if (!password)
      return responseHandler(res, 400, "Password is required", false);

    const existingUser = await userSchema.findOne({ email });
    if (existingUser)
      return responseHandler(res, 400, "Email already exist", false);

    const generatedOtp = generateOTP();
    const user = new userSchema({
      fullName,
      email,
      password,
      phone,
      address,
      otp: generatedOtp,
      otpExpires: Date.now() + 2 * 60 * 1000,
    });
    sendEmail({ email, subject: "Email Verification", otp: generatedOtp, template: emailVerifyTem });

    user.save();
    return responseHandler(res, 200, "Registration Successfylly, verify email", true);
  } catch (error) {
    return responseHandler(res, 500, "Internal Server Error");
  }
};

const verifyOtp = async (req, res) => {
  try {
    const { otp, email } = req.body;

    if (!otp) return res.status(400).send({ message: "OTP is required" })
    if (!email) return res.status(400).send({ message: "Invalid Request" })

    const user = await userSchema.findOne({
      email,
      otp: Number(otp),
      otpExpires: { $gt: new Date() },
      isVerified: false,
    });

    if (!user) {
      return res.status(400).json({
        message: "Invalid or expired OTP",
      });
    }

    user.isVerified = true;
    user.otp = null;
    user.save()

    res.status(200).send({ message: "Verified successfully" })

  } catch (error) {
    return responseHandler(res, 500, "Internal Server Error");
  }
}

const resendOTP = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).send({ message: "Invalid Request" })

    const user = await userSchema.findOne({
      email,
      isVerified: false,
    });
    if (!user) {
      return res.status(400).json({
        message: "Invalid Request",
      });
    }

    const generatedOtp = generateOTP();
    user.otp = generatedOtp;
    user.otpExpires = Date.now() + 2 * 60 * 1000;
    user.save()
    sendEmail({ email, subject: "Email Verification", otp: generatedOtp, template: emailVerifyTem });

    res
      .status(201)
      .send({ message: "OTP send to your email successfully." });
  } catch (error) {
    return responseHandler(res, 500, "Internal Server Error");
  }
}

const signInUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email) return res.status(400).send({ message: "Email is required" });
    if (!isValidEmail(email))
      return res.status(400).send({ message: "Enter a valid email address" });
    if (!password)
      return res.status(400).send({ message: "Password is required" });
    const existingUser = await userSchema.findOne({ email });
    if (!existingUser)
      return res
        .status(400)
        .send({ message: "Email is not registered" });

    const matchPass = await existingUser.comparePassword(password)
    if (!matchPass) {
      return res
        .status(400)
        .send({ message: "Wrong Password" });
    }
    if (!existingUser.isVerified) return responseHandler(res, 400, "Email is not verified.");

    const accToken = generateAccessToken(existingUser)
    const refToken = generateRefreshToken(existingUser)

    res.cookie("X-AS-Token", accToken, {
      httpOnly: false, // Not accessible by client-side JS
      secure: false,   // Only sent over HTTPS
      maxAge: 3600000, // Expires in 1 hour (in milliseconds)
      // sameSite: 'Strict' // Only send for same-site requests
    })
    res.cookie("X-RF-Token", refToken, {
      httpOnly: false, // Not accessible by client-side JS
      secure: false,   // Only sent over HTTPS
      maxAge: 1296000000, // Expires in 1 hour (in milliseconds)
      // sameSite: 'Strict' // Only send for same-site requests
    })
    res.status(200).send({ message: "Login Successfylly" })
  } catch (error) {
    return responseHandler(res, 500, "Internal Server Error");
  }
}

const forgatePass = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).send({ message: "Email is required" });
    if (!isValidEmail(email))
      return res.status(400).send({ message: "Enter a valid email address" });
    const existingUser = await userSchema.findOne({ email });
    if (!existingUser)
      return res
        .status(400)
        .send({ message: "Email is not registered" });

    const resetPassToken = generateResetPassToken(existingUser);

    const RESET_PASSWORD_LINK = `${process.env.CLIENT_URL || "http://localhost:3000"}/resetpass/?sec=${resetPassToken}`
    sendEmail({ email, subject: "Reset Your Password", otp: RESET_PASSWORD_LINK, template: resetPassEmailTemp });
    responseHandler(res, 200, "Find the reset password link in your email", true);
  } catch (error) {
    return responseHandler(res, 500, "Internal Server Error");
  }
}

module.exports = { signupUser, verifyOtp, resendOTP, signInUser, forgatePass };
