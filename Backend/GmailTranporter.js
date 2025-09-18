const nodemailer = require("nodemailer");
require("dotenv").config();

const sendEmail = async (to, subject, html) => {
  try {
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.My_Gmail,        // your gmail
        pass: process.env.App_Password,    // 16-char App Password
      },
    });

    let info = await transporter.sendMail({
      from: `"Travel Booking" <${process.env.My_Gmail}>`,
      to,
      subject,
      html,
    });

    console.log("✅ Email sent:", info.messageId);
    return info;
  } catch (error) {
    console.error("❌ Email send error:", error);
    throw error;
  }
};

module.exports = sendEmail;
