const userSchema = require("../models/userSchema");
const { emailVerifyTem } = require("../services/emailTemp");
const { sendEmail } = require("../services/emaiServices");
const { generateOTP } = require("../services/helpers");
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
    return responseHandler(res, 400, "Enter a valid email address");
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
    res.status(500).send({ message: "Internal Server issue" });
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
    res.status(500).send({ message: "Internal Server issue" });
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
    res.status(200).send({ message: "Login Successfylly" })
  } catch (error) {
    res.status(500).send({ message: "Internal Server issue" });
  }
}

module.exports = { signupUser, verifyOtp, resendOTP, signInUser };
