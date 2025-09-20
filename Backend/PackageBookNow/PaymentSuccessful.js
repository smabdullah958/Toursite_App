// if payement gateway is a stripe and if payment is successfully reciveve than send email


let Database = require("../Models/PackagesBookNow");
let SendEmail = require("../GmailTranporter");

let PaymentSuccess = async (req, res) => {
  try {
    let { bookingId } = req.body;
    let user = req.user; // from middleware

    let booking = await Database.findById(bookingId).populate("PackageID");
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    booking.PaymentStatus = "Paid";
    await booking.save();


    //Send Email
    let EmailHTML = `
  <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #e0e0e0; border-radius: 10px; overflow: hidden; box-shadow: 0 4px 10px rgba(0,0,0,0.1);">
    <!-- Header -->
    <div style="background: linear-gradient(90deg, #4e73df, #1cc88a); color: white; text-align: center; padding: 20px;">
      <h2 style="margin: 0; font-size: 24px;">🎉 Payment Successful</h2>
    </div>

    <!-- Body -->
    <div style="padding: 20px; color: #333;">
      <h4 style="margin-top: 0;">Hello <b>${user.Name}</b>,</h4>
      <p style="font-size: 15px;">We’re excited to let you know that your payment for your Package booking has been confirmed. Below are your booking details:</p>

      <table style="width: 100%; border-collapse: collapse; margin-top: 15px;">
        <tr>
          <td style="padding: 8px; border-bottom: 1px solid #eee;"><b>Destination:</b></td>
          <td style="padding: 8px; border-bottom: 1px solid #eee;">${booking.PackageID.Title}</td>
        </tr>
        <tr>
          <td style="padding: 8px; border-bottom: 1px solid #eee;"><b>Booking Date:</b></td>
          <td style="padding: 8px; border-bottom: 1px solid #eee;">${booking.Date}</td>
        </tr>
        <tr>
          <td style="padding: 8px; border-bottom: 1px solid #eee;"><b>Total Days:</b></td>
          <td style="padding: 8px; border-bottom: 1px solid #eee;">${booking.Days}</td>
        </tr>
        <tr>
          <td style="padding: 8px; border-bottom: 1px solid #eee;"><b>Total Seats/Slots:</b></td>
          <td style="padding: 8px; border-bottom: 1px solid #eee;">${booking.NumberOfAdultChild + booking.NumberOfNoneAdultChild}</td>
        </tr>
        <tr>
          <td style="padding: 8px; border-bottom: 1px solid #eee;"><b>Total Price:</b></td>
          <td style="padding: 8px; border-bottom: 1px solid #eee;">${booking.TotalPrice} RS</td>
        </tr>
        <tr>
          <td style="padding: 8px;"><b>Status:</b></td>
          <td style="padding: 8px; color: green; font-weight: bold;">Paid ✅</td>
        </tr>
      </table>

      <p style="margin-top: 20px; font-size: 15px;">Thank you for booking with us! We look forward to making your trip memorable. 🌍✈️</p>
    </div>

    <!-- Footer -->
    <div style="background: #f8f9fc; text-align: center; padding: 15px; font-size: 13px; color: #666;">
      © ${new Date().getFullYear()} Your Company Name. All rights reserved.
    </div>
     </div>
        `;


    await SendEmail(user.Email, "Payment Successful", EmailHTML);

    return res.status(200).json({ message: "Payment confirmed & email sent", booking });
  } catch (error) {
    console.error("Payment success error:", error);
    return res.status(500).json({ message: "Internal error", error });
  }
};

module.exports = PaymentSuccess;
