// if payement gateway is a stripe and if payment is successfully reciveve than send email


let Database = require("../Models/DestinationBookNow");
let SendEmail = require("../GmailTranporter");
let DestinationDatabase =require("../Models/DestinationDataBase")

let PaymentSuccess = async (req, res) => {
  try {

    let { bookingId } = req.body;
    let user = req.user; // from middleware

    let booking = await Database.findById(bookingId).populate("DestinationID");
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }
    

    if(booking.TotalPrice > 999999.99){
      return res.status(401).json({message:"You cannot do a transaction more than 999,999."});
    }

    // 1. Find the destination and the specific booking option
    let destination = booking.DestinationID; // Already populated, so use it directly
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

    let totalSlots = booking.NumberOfAdultChild + booking.NumberOfNoneAdultChild;
    
//     //check slots if a user slots is greater thana  available slots
//     if(totalSlots > booking.DestinationID?.Slots){
//                 return res.status(400).json({message:`we have only ${booking.DestinationID.Slots} slots available `}) 
//  }


                // GET TODAY'S DATE (in YYYY-MM-DD format)
        const todayDate = new Date().toISOString().split('T')[0]; // e.g., "2025-10-10"
        const BookingForToday = booking.Date === todayDate;


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
            ? totalSlots 
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
      updateSlots = await DestinationDatabase.findOneAndUpdate(
        {
          _id: booking.DestinationID._id,
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
        updateSlots = await DestinationDatabase.findOneAndUpdate(
          {
            _id: booking.DestinationID._id,
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
        updateSlots = await DestinationDatabase.findOneAndUpdate(
          {
            _id: booking.DestinationID._id,
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



    //  Determine slots to decrease (logic is based on pricing model)
    // const slotsToDecrement = selectedBookingOption.PricingModel === "PerPerson"
    //   ? totalSlots : 1;

    // 4. ✅ CORRECT SLOT UPDATE LOGIC using $inc and positional operator
    // let updateSlots = await DestinationDatabase.findOneAndUpdate(
    //   {
    //     _id: booking.DestinationID._id,
    //           //decease slots only those which satisfy all the condition
    //     BookingOption: {
    //         $elemMatch: {
    //     Category: booking.Category,
    //     Duration: booking.Duration,
    //     CarCapacity:booking.CarCapacity,
    //     PricingModel: selectedBookingOption.PricingModel,
      
    //         }
    //       }
    //   },
    //   {
    //     // Decrement the Slots field of the matched array element ($)
    //     $inc: { "BookingOption.$.Slots": -slotsToDecrement }
    //   },
    //   { new: true }
    // );

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
      <p style="font-size: 15px;">We’re excited to let you know that your payment for your destination booking has been confirmed. Below are your booking details:</p>

      <table style="width: 100%; border-collapse: collapse; margin-top: 15px;">
        <tr>
          <td style="padding: 8px; border-bottom: 1px solid #eee;"><b>Destination:</b></td>
          <td style="padding: 8px; border-bottom: 1px solid #eee;">${booking.DestinationID.Title}</td>
        </tr>
        <tr>
          <td style="padding: 8px; border-bottom: 1px solid #eee;"><b>Booking Date:</b></td>
          <td style="padding: 8px; border-bottom: 1px solid #eee;">${booking.Date}</td>
        </tr>

        <td style="padding: 8px; border-bottom: 1px solid #eee;"><b>Duration</b></td>
          <td style="padding: 8px; border-bottom: 1px solid #eee;">${booking.Duration}</td>
        </tr>
  
${selectedBookingOption.PricingModel==="PerPerson" ?
`
        <tr>
          <td style="padding: 8px; border-bottom: 1px solid #eee;"><b>Total Seats/Car booking:
          </b></td>
          <td style="padding: 8px; border-bottom: 1px solid #eee;">${totalSlots}</td>
        </tr>`:""}

        ${selectedBookingOption.PricingModel==="FixedUnit" ?
`
        <tr>
          <td style="padding: 8px; border-bottom: 1px solid #eee;"><b>Total Car Capcity:
          </b></td>
          <td style="padding: 8px; border-bottom: 1px solid #eee;">
          ${selectedBookingOption.CarCapacity}
          </td>
        </tr>`:""}


        <tr>
          <td style="padding: 8px; border-bottom: 1px solid #eee;"><b>Total Price:</b></td>
          <td style="padding: 8px; border-bottom: 1px solid #eee;">${booking.TotalPrice} AED</td>
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

    return res.status(200).json({ message: "Payment confirmed & email sent", booking,updateSlots });
  }
   catch (error) {
    console.error("Payment success error:", error);
    return res.status(500).json({ message: "Internal error", error });
  }
};

module.exports = PaymentSuccess;
