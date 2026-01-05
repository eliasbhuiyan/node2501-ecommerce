const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  port: 587,
  secure: false, // Use true for port 465, false for port 587
  auth: {
    user: "elias.cit.bd@gmail.com",
    pass: "faih mgxt chiz iqne",
  },
});

const sendEmail = async ({ email, subject, otp, template }) => {
  await transporter.sendMail({
    from: '"E-Commerce"',
    to: email,
    subject: subject,
    html: template({ otp }), // HTML version of the message
  });
};

module.exports = { sendEmail };
