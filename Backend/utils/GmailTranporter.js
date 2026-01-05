const { Resend } = require('resend');
require("dotenv").config();
// Initialize Resend with your API key
const resend = new Resend(process.env.Resend_API_Key);

const sendEmail = async (to, subject, html) => {
  try {
    const { data, error } = await resend.emails.send({
      from: 'Travel Booking <onboarding@resend.dev>', // Free email they provide
      to: to,
      subject: subject,
      html: html,
    });

    if (error) {
      console.error(" Resend error:", error);
      return null;
    }

    console.log("✅ Email sent:", data.id);
    return data;

  } catch (error) {
    console.error(" Email send error:", error);
    throw error;
  }
};

module.exports = sendEmail;