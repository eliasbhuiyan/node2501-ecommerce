const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "gmail",
  port: 587,
  secure: false, // Use true for port 465, false for port 587
  auth: {
    user: "maddison53@ethereal.email",
    pass: "jn7jnAPss4f63QBp6D",
  },
});

const sendEmail = async ({ email, subject, otp }) => {
  await transporter.sendMail({
    from: '"E-Commerce" <maddison53@ethereal.email>',
    to: email,
    subject: subject,
    html: `<b>Email verification OTP: ${otp}</b>`, // HTML version of the message
  });
};

module.exports = { sendEmail };
