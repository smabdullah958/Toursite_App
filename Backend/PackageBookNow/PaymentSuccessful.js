// if payement gateway is a stripe and if payment is successfully reciveve than send email


let Database = require("../Models/PackagesBookNow");
let SendEmail = require("../GmailTranporter");
let PackageDatabase =require("../Models/PackagesDatabase")

let GetDubaiDate=require("../DubaiTimeZone")
let PaymentSuccess = async (req, res) => {

  try {
     let { bookingId } = req.body;
     let user = req.user; // from middleware

     let booking = await Database.findById(bookingId).populate("PackageID");
     if (!booking) {
       return res.status(404).json({ message: "Booking not found" });
     }
//check the toal price 
     if(booking.TotalPrice > 999999.99){
 return res.status(400).json({message:"You cannot do a transaction more than 999,999."})
 } 


    // 1. Find the package and the specific booking option
    let destination = booking.PackageID; // Already populated, so use it directly
    if (!destination) {
      return res.status(404).json({ message: "Destination details missing." });
    }

    // Find the correct BookingOption using Category/Duration saved on the booking
    const selectedBookingOption = destination.BookingOption.find(
      opt => opt.Category === booking.Category && opt.Duration === booking.Duration 
      
    );

    if (!selectedBookingOption) {
      return res.status(402).json({ message: "Matching booking option not found on destination." });
    }



    // Calculate total slots being booked
    let totalSeatsBooked = booking.NumberOfAdultChild + booking.NumberOfNoneAdultChild ;


         let todayDate=GetDubaiDate();
            const BookingForToday = booking.Date === todayDate;
             console.log(`📅 [Dubai Time] Booking Date: ${booking.Date}`);
             console.log(`📅 [Dubai Time] Today's date: ${todayDate}`);;

                // SLOT AVAILABILITY CHECK
        let availableSlots;

        if (BookingForToday) {
            // Check TODAY's slots (Slots field)
            availableSlots = selectedBookingOption.Slots;
        } else {
            // Check FUTURE date slots (SlotByDate array)
            const dateSlot = selectedBookingOption.SlotByDate?.find(
                slot => slot.Date === booking.Date
            );
  // If no entry for that date yet, use OriginalSlots
  availableSlots = dateSlot
    ? dateSlot.RemainingSlots
    : selectedBookingOption.OriginalSlots;
}

//  decrement based on pricing model
        const slotsToDecrement = selectedBookingOption.PricingModel === "PerPerson" 
            ? totalSeatsBooked 
            : 1;


              if (availableSlots === 0) {
      return res.status(400).json({
        message: "No slots available for the selected date.",
      });
    }

    if (availableSlots < slotsToDecrement) {
      return res.status(400).json({
        message: `Only ${availableSlots} slots remaining for ${booking.Date}.`,
      });
    }

            
    // ✅ Mark payment as Paid
    booking.PaymentStatus = "Paid";
    await booking.save();

    let updateSlots;

    if (BookingForToday) {
      //  Decrement today's Slots field
      updateSlots = await PackageDatabase.findOneAndUpdate(
        {
          _id: booking.PackageID._id,
          BookingOption: {
            $elemMatch: {
              Category: booking.Category,
              Duration: booking.Duration,
              PricingModel: selectedBookingOption.PricingModel,
              CarCapacity: booking.CarCapacity,
            },
          },
        },
        {
          $inc: { "BookingOption.$.Slots": -slotsToDecrement },
        },
        { new: true }
      );
    } else {
      //  Decrement in SlotByDate array for future date
      const dateSlotExists = selectedBookingOption.SlotByDate?.some(
        (slot) => slot.Date === booking.Date
      );

      if (dateSlotExists) {
        // If date already exists than  decrement RemainingSlots
        updateSlots = await PackageDatabase.findOneAndUpdate(
          {
            _id: booking.PackageID._id,
            BookingOption: {
              $elemMatch: {
                Category: booking.Category,
                Duration: booking.Duration,
                PricingModel: selectedBookingOption.PricingModel,
                CarCapacity: booking.CarCapacity,
                "SlotByDate.Date": booking.Date,
              },
            },
          },
          {
            $inc: {
              "BookingOption.$[opt].SlotByDate.$[dateSlot].RemainingSlots":
                -slotsToDecrement,
            },
          },
          {
            arrayFilters: [
              {
                "opt.Category": booking.Category,
                "opt.Duration": booking.Duration,
              },
              { "dateSlot.Date": booking.Date },
            ],
            new: true,
          }
        );
      } else {
        // If date doesn't exist than create new entry in SlotByDate
        updateSlots = await PackageDatabase.findOneAndUpdate(
          {
            _id: booking.PackageID._id,
            BookingOption: {
              $elemMatch: {
                Category: booking.Category,
                Duration: booking.Duration,
                PricingModel: selectedBookingOption.PricingModel,
                CarCapacity: booking.CarCapacity,
              },
            },
          },
          {
            $push: {
              "BookingOption.$.SlotByDate": {
                Date: booking.Date,
                RemainingSlots:
                  selectedBookingOption.OriginalSlots - slotsToDecrement,
              },
            },
          },
          { new: true }
        );
      }
    }

    //Send Email

    let EmailHTML = `
<div style="font-family: 'Segoe UI', Tahoma, sans-serif; max-width: 650px; margin: auto; background: #fffdf5; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 16px rgba(0,0,0,0.1); border: 1px solid #f5e6c8;">
  
  <!-- Header -->
  <div style="background: linear-gradient(90deg, #d4af37, #b68c2a); color: white; text-align: center; padding: 25px 10px;">
    <h2 style="margin: 0; font-size: 24px;">💳 Payment Successful</h2>
    <p style="margin: 5px 0 0; font-size: 15px;">Your booking has been confirmed — Let the adventure begin!</p>
  </div>

  <!-- Body -->
  <div style="padding: 25px; color: #3d3d3d; background: #fffaf0;">
    <h3 style="margin-top: 0; color: #b68c2a;">Hello <b>${user.Name}</b>,</h3>

    <p style="font-size: 15px; line-height: 1.7;">
      We’re delighted to confirm your recent <b>destination booking</b> with 
      <strong style="color:#b68c2a;">IBN SAHRA TRAVELS</strong>. Your payment has been successfully received. 🎉
    </p>

    <div style="margin: 20px 0;">
      <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
        <tr>
          <td style="padding: 10px; border-bottom: 1px solid #f0e6d2;"><b>Destination:</b></td>
          <td style="padding: 10px; border-bottom: 1px solid #f0e6d2;">${booking.PackageID.Title}</td>
        </tr>
        <tr>
          <td style="padding: 10px; border-bottom: 1px solid #f0e6d2;"><b>Booking Date:</b></td>
          <td style="padding: 10px; border-bottom: 1px solid #f0e6d2;">${booking.Date}</td>
        </tr>
        <tr>
          <td style="padding: 10px; border-bottom: 1px solid #f0e6d2;"><b>Duration:</b></td>
          <td style="padding: 10px; border-bottom: 1px solid #f0e6d2;">${booking.Duration}</td>
        </tr>

        ${
          selectedBookingOption.PricingModel === "PerPerson" &&`
          <tr>
            <td style="padding: 10px; border-bottom: 1px solid #f0e6d2;"><b>Total Seats Booked:</b></td>
            <td style="padding: 10px; border-bottom: 1px solid #f0e6d2;">${totalSeatsBooked}</td>
          </tr>`
        }

        ${
          selectedBookingOption.PricingModel === "FixedUnit" && `
          <tr>
            <td style="padding: 10px; border-bottom: 1px solid #f0e6d2;"><b>Vehicle Capacity:</b></td>
            <td style="padding: 10px; border-bottom: 1px solid #f0e6d2;">${selectedBookingOption.CarCapacity}</td>
          </tr>`
        }

        <tr>
          <td style="padding: 10px; border-bottom: 1px solid #f0e6d2;"><b>Total Price:</b></td>
          <td style="padding: 10px; border-bottom: 1px solid #f0e6d2;"><b>${booking.TotalPrice} AED</b></td>
        </tr>
        <tr>
          <td style="padding: 10px;"><b>Status:</b></td>
          <td style="padding: 10px; color: #16a34a; font-weight: bold;">Paid ✅</td>
        </tr>
      </table>
    </div>

        <p style="margin-top: 30px; font-size: 14px; text-align: center; color: #5c5c5c;">
      Thank you for trusting <strong style="color:#b68c2a;">IBN SAHRA TRAVELS</strong>.<br>
      Your journey begins here — enjoy the Emirates in style. 🇦🇪✨
    </p>
  </div>

  <!-- Footer -->
  <div style="background: #b68c2a; color: white; text-align: center; padding: 15px; font-size: 13px;">
    © ${new Date().getFullYear()} <b>IBN SAHRA TRAVELS</b> — All Rights Reserved.<br>
  </div>
</div>
`;

    await SendEmail(user.Email, "Payment Successful", EmailHTML);

    return res.status(200).json({ message: "Payment confirmed & email sent", booking,updateSlots });
  } catch (error) {
    console.error("Payment success error:", error);
    return res.status(500).json({ message: "Internal error", error });
  }
};

module.exports = PaymentSuccess;
