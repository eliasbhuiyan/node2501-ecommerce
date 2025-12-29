const userSchema = require("../models/userSchema");
const { sendEmail } = require("../services/emaiServices");
const { generateOTP } = require("../services/helpers");
const { isValidEmail } = require("../services/validation");

const signupUser = async (req, res) => {
  try {
    const { fullName, email, password, phone, address } = req.body;
    if (!email) return res.status(400).send({ message: "Email is required" });
    if (!isValidEmail(email))
      return res.status(400).send({ message: "Enter a valid email address" });
    if (!password)
      return res.status(400).send({ message: "Password is required" });

    const existingUser = await userSchema.findOne({ email });
    if (existingUser)
      return res
        .status(400)
        .send({ message: "User with this email already exist" });

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
    sendEmail({ email, subject: "Email Verification", otp: generatedOtp });
    user.save();
    res
      .status(201)
      .send({ message: "Registration Successfully, please verify your email" });
  } catch (error) {
    res.status(500).send({ message: "Internal Server issue" });
  }
};

module.exports = { signupUser };
