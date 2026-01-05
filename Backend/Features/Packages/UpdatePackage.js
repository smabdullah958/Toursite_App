let Database = require("../Models/PackagesDatabase");
let { validationResult } = require("express-validator");

let UpdatePackage = async (req, res) => {
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
    const Package = await Database.findById(id);
    if (!Package) {
      return res.status(404).json({ message: "Destination not found" });
    }

    // Update text fields
    if (req.body.Title) Package.Title = req.body.Title;
    if (req.body.Description) Package.Description = req.body.Description;
    if (req.body.TravelTimes) Package.TravelTimes = req.body.TravelTimes;

    //  Handle BookingOptions: Update existing + Add new ones
    if (req.body.BookingOption) {
      for (let option of req.body.BookingOption) {
        
        // Check if this is an existing booking option (has _id) or a new one
        if (option._id && option._id !== 'undefined' && option._id !== 'null') {
          //  UPDATE EXISTING BOOKING OPTION
          const booking = Package.BookingOption.id(option._id);
          
  
  
  if (booking) {
  booking.PricingModel = option.PricingModel || booking.PricingModel;
  booking.BasePrice = option.BasePrice || booking.BasePrice;
  booking.Category = option.Category || booking.Category;
  booking.Duration = option.Duration || booking.Duration;

  const newTotalSlots = option.Slots || booking.Slots;
  const oldOriginalSlots = booking.OriginalSlots || newTotalSlots;

  booking.OriginalSlots = newTotalSlots; // Keep the new for calculations
  booking.Slots = newTotalSlots;

  // Handle CarCapacity based on PricingModel
  if (option.PricingModel === "FixedUnit") {
  booking.CarCapacity = option.CarCapacity === "" ? 0 : option.CarCapacity || booking.CarCapacity;
  } else {
    booking.CarCapacity = undefined;
  }

  //  Adjust SlotByDate based on the new Slots value
  if (booking.SlotByDate && booking.SlotByDate.length>0) {
    booking.SlotByDate = booking.SlotByDate.map(slotDate => {

      const totalBooked = oldOriginalSlots - slotDate.RemainingSlots;
      let newRemaining = newTotalSlots - totalBooked;
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
          
          Package.BookingOption.push(newBookingOption);
          console.log(`✅ Added new booking option: ${option.Category} (Slots: ${slots}, OriginalSlots: ${slots})`);
        }
      }
    }

 

     Package.Image = Package.Image || [];

//     // Handle new images
   if (req.files && Object.keys(req.files).length > 0) {
      Object.keys(req.files).forEach((fieldName) => {
         const match = fieldName.match(/Image\[(\d+)\]/);
         if (match) {
           const index = parseInt(match[1], 10);
           Package.Image[index] = req.files[fieldName][0].path; // Cloudinary URL
         }
       });
     }

//     // Handle existing images
     Object.keys(req.body).forEach((key) => {
       const match = key.match(/ExistingImage\[(\d+)\]/);
       if (match) {
         const index = parseInt(match[1], 10);
         if (!Package.Image[index]) {
           Package.Image[index] = req.body[key]; // Keep existing image
         }
       }
     });

//     // Remove undefined slots and validate
     Package.Image = Package.Image.filter((img) => img);
     if (Package.Image.length < 2) {
       return res.status(400).json({ message: "At least 2 images are required" });
     }
     if (Package.Image.length > 5) {
       return res.status(400).json({ message: "Maximum 5 images allowed" });
     }


    //  Save all changes
  let updatedDestination=  await Package.save();

    console.log(" Package updated successfully");
    console.log("BookingOptions:", JSON.stringify(Package.BookingOption, null, 2));
    
    return res.status(200).json({ 
      message: "Data updated successfully", 
      updatedDestination 
    });
    
  } catch (error) {
    console.log("❌ Internal error:", error);
    return res.status(500).json({ 
      message: "Internal error", 
      error: error.message 
    });
  }
};

module.exports = UpdatePackage;