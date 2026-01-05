
let Database = require("../Models/DestinationDataBase");
let { validationResult } = require("express-validator");
let DubaiTimeZone =require("../DubaiTimeZone")

let UpdateTour = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(401).json({ message: "ID is required" });
    }

    // Validation
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(401).json({ message: "Validation error", error: errors.array() });
    }

    // Fetch the destination
    const destination = await Database.findById(id);
    if (!destination) {
      return res.status(404).json({ message: "Destination not found" });
    }

    // Update text fields
    if (req.body.Title) destination.Title = req.body.Title;
    if (req.body.Description) destination.Description = req.body.Description;
    if (req.body.TravelTimes) destination.TravelTimes = req.body.TravelTimes;

    //  Handle BookingOptions: Update existing + Add new ones
    if (req.body.BookingOption && req.body.BookingOption) {
      for (let option of req.body.BookingOption) {
        
        // Check if this is an existing booking option (has _id) or a new one
        if (option._id && option._id !== 'undefined' && option._id !== 'null') {
          //  UPDATE EXISTING BOOKING OPTION
          const booking = destination.BookingOption.id(option._id);
          
  
  
  if (booking) {
  booking.PricingModel = option.PricingModel || booking.PricingModel;
  booking.BasePrice = option.BasePrice || booking.BasePrice;
  booking.Category = option.Category || booking.Category;
  booking.Duration = option.Duration || booking.Duration;

  const newTotalSlots = option.Slots || booking.Slots;
  const oldOriginalSlots = booking.OriginalSlots || newTotalSlots;

  booking.OriginalSlots = newTotalSlots; // Keep the old for calculations
  booking.Slots = newTotalSlots;

  // Handle CarCapacity based on PricingModel
  if (option.PricingModel === "FixedUnit") {
  booking.CarCapacity = option.CarCapacity === "" ? 0 : option.CarCapacity || booking.CarCapacity;
  } else {
    booking.CarCapacity = undefined;
  }


  //  Adjust SlotByDate based on the new Slots value
  if (booking.SlotByDate && booking.SlotByDate.length > 0 ) {
    
    
    booking.SlotByDate = booking.SlotByDate.map(slotDate => {
      
      const totalBooked = oldOriginalSlots - slotDate.RemainingSlots;
       
      let newRemaining = newTotalSlots - totalBooked;
    // If admin reduced total slots below already booked count
    // keep remaining = 0 but never negative

      if (newRemaining < 0) newRemaining = 0;
      return {
        Date: slotDate.Date,
        RemainingSlots: newRemaining
      };
    });
  }

  console.log(`✅ Updated existing booking option: ${option._id} | Slots adjusted from ${oldOriginalSlots} → ${newTotalSlots}`);
}
        }
  
  
  else {
          //  ADD NEW BOOKING OPTION (no _id)
          const slots = option.Slots || 0;
          
          const newBookingOption = {
            PricingModel: option.PricingModel,
            BasePrice: option.BasePrice || 0,
            Category: option.Category,
            Duration: option.Duration,
            Slots: slots,
            OriginalSlots: slots, //  Set OriginalSlots = Slots for new options
            SlotByDate: [] // ✅Initialize empty array
          };
          
          // Only add CarCapacity for FixedUnit
          if (option.PricingModel === "FixedUnit") {
            newBookingOption.CarCapacity = option.CarCapacity === "" ? 0 : Number(option.CarCapacity) || 0;
          }
          
          destination.BookingOption.push(newBookingOption);
          console.log(`✅ Added new booking option: ${option.Category} (Slots: ${slots}, OriginalSlots: ${slots})`);
        }
      }
    }

    // Update Image
    if (req.file) {
      destination.Image = req.file.path;
    } else if (req.body.ExistingImage) {
      destination.Image = req.body.ExistingImage;
    }

    //  Save all changes
    await destination.save();

    console.log(" Destination updated successfully");
    console.log("BookingOptions:", JSON.stringify(destination.BookingOption, null, 2));
    
    return res.status(200).json({ 
      message: "Data updated successfully", 
      result: destination 
    });
    
  } catch (error) {
    console.log("❌ Internal error:", error);
    return res.status(500).json({ 
      message: "Internal error", 
      error: error.message 
    });
  }
};

module.exports = UpdateTour;