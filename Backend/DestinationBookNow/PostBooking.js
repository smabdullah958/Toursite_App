require("dotenv").config()
    let {validationResult} = require("express-validator")
    let Database=require("../Models/DestinationBookNow");
    let DestinationDatabase=require("../Models/DestinationDataBase")

    let Stripe=require("stripe");
    let stripe=new Stripe(process.env.Stirpe_Secret_key)
    let GetDubaiDate=require("../DubaiTimeZone")

    let SendEmail=require("../GmailTranporter")

    let DestinationBookNow=async(req,res)=>{
        try{
    //for validation
            let error=validationResult(req);
            console.log('hello')
        if(!error.isEmpty()){
            console.log("internal error")
            return res.status(401).json({message:"validation error bro",error:error.array()})
        }
    console.log("daa is receit")
        let {DestinationID}=req.params
    // ✅ comes from token/middleware here it contain the id of a user 
        let   UserID=req.user._id
        //for UserName
        let Name=req.user.Name

        //Email
        let Email=req.user.Email
        console.log("user id is ",UserID,Name,Email)
    if(!DestinationID){
        return res.status(400).json({message:"destination id is required"})
    }

    console.log(DestinationID)
    //find destination 
    let destination=await DestinationDatabase.findOne({_id:DestinationID});
    if(!destination){
        return res.status(401).json({message:"invalid destination"})
    }

    console.log("desitnation is found")

            let {ContactNumber,WhatsAppNumber,
                PickUpAddress,NumberOfNoneAdultChild,
                NumberOfAdultChild,CarCapacity,
                Duration,Category,
                TravelTime,TotalPrice,
                Date:BookingDate,PaymentMethod}=req.body

            console.log('data is recieve from a body',req.body)

        
            let totalslots=NumberOfAdultChild+NumberOfNoneAdultChild;

                    //  Find the SPECIFIC Booking Option for Slot Check ---
        const selectedBookingOption = destination.BookingOption.find(
            opt => opt.Category === Category && opt.Duration === Duration
        );

        if (!selectedBookingOption) {
            return res.status(400).json({ message: "Invalid category or duration selected." });
        }


        let todayDate=GetDubaiDate();
        const BookingForToday = BookingDate === todayDate;
        console.log(`📅 [Dubai Time] Booking Date: ${BookingDate}`);
        console.log(`📅 [Dubai Time] Today's date: ${todayDate}`);;

                // SLOT AVAILABILITY CHECK
        let availableSlots;

        if (BookingForToday) {
            // Check TODAY's slots (Slots field)
            availableSlots = selectedBookingOption.Slots;
        } else {
            // Check FUTURE date slots (SlotByDate array)
            const dateSlot = selectedBookingOption.SlotByDate?.find(
                slot => slot.Date === BookingDate
            );

            if (dateSlot) {
                availableSlots = dateSlot.RemainingSlots;
            } else {
                // If date not found, use OriginalSlots (first booking for this date)
                availableSlots = selectedBookingOption.OriginalSlots;
            }
        }

        // Determine slots to decrement based on pricing model
        const slotsToDecrement = selectedBookingOption.PricingModel === "PerPerson" 
            ? totalslots 
            : 1;

        //if no slots are available
        if(availableSlots===0){
            return res.status(400).json({message:"No slots available for the selected date."})
        }

        if (availableSlots < slotsToDecrement) {
            return res.status(400).json({ 
                message: `Only ${availableSlots} slots remaining for ${BookingDate}.` 
            });
        }

        
                let booking = new Database({
                ContactNumber,
                WhatsAppNumber,
                PickUpAddress,
                NumberOfNoneAdultChild,
                NumberOfAdultChild,
                Duration,Category,
                TravelTime,
                TotalPrice,
                DestinationID,
                UserID,
                Date:BookingDate,
                PaymentMethod,
                Duration,Category,
                CarCapacity
            })

            console.log("domcunet is created")

            let result=await booking.save()


            //payement method through stripe

            if(PaymentMethod==="Stripe"){
                let paymentIntent =await stripe.paymentIntents.create({
                    amount:TotalPrice*100, 
                    //here in a amount we must be convert the total price into a currency smallest unit like pasia
                    currency:"aed",
                automatic_payment_methods: { enabled: true }, // ✅ allow card & link

                    metadata:{ 
                        bookingId:result._id.toString(),
                        UserName:Name,  
                        UserEmail:Email
                    },
                });
                

                console.log(paymentIntent)


                return res.status(200).json({message:"booking created , processed with stripe payement method",result,
                    clientSecret:paymentIntent.client_secret,
                    
                })
            }


            let Destination=await DestinationDatabase.findOne({_id:DestinationID})


            //if payement is cash
            
            //Send Email
    let EmailHTML = `
  <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #e0e0e0; border-radius: 10px; overflow: hidden; box-shadow: 0 4px 10px rgba(0,0,0,0.1);">
    <!-- Header -->
    <div style="background: linear-gradient(90deg, #4e73df, #1cc88a); color: white; text-align: center; padding: 20px;">
  <p style="font-size: 15px;">Your destination booking has been successfully created. Please note that your payment is <b>not yet completed</b>. Below are your booking details:</p>

    </div>

    <!-- Body -->
    <div style="padding: 20px; color: #333;">
      <h4 style="margin-top: 0;">Hello <b>${Name}</b>,</h4>
      <p style="font-size: 15px;">We’re excited to let you know that  destination booking has been confirmed. Below are your booking details:</p>

      <table style="width: 100%; border-collapse: collapse; margin-top: 15px;">
        <tr>
          <td style="padding: 8px; border-bottom: 1px solid #eee;"><b>Destination:</b></td>
          <td style="padding: 8px; border-bottom: 1px solid #eee;">${Destination.Title}</td>
        </tr>
        <tr>
          <td style="padding: 8px; border-bottom: 1px solid #eee;"><b>Booking Date:</b></td>
          <td style="padding: 8px; border-bottom: 1px solid #eee;"> ${BookingDate}</td>
        </tr>

                <tr>
          <td style="padding: 8px; border-bottom: 1px solid #eee;"><b>Duration</b></td>
          <td style="padding: 8px; border-bottom: 1px solid #eee;">${Duration}</td>
        </tr>

        
       ${selectedBookingOption.PricingModel==="PerPerson" ?
       `
       <tr>
        <td style="padding: 8px; border-bottom: 1px solid #eee;"><b>Total Seats Booking:</b>
        </td>
           <td style="padding: 8px; border-bottom: 1px solid #eee;">${totalslots}
           </td>  
            </tr>
           `:""
          }

            ${selectedBookingOption.PricingModel==="FixedUnit" ?
`
        <tr>
          <td style="padding: 8px; border-bottom: 1px solid #eee;"><b>Total Car Capcity:
          </b></td>
          <td style="padding: 8px; border-bottom: 1px solid #eee;">
          ${CarCapacity}
          </td>
        </tr>`:""}

       
        <tr>
          <td style="padding: 8px; border-bottom: 1px solid #eee;"><b>Total Price:</b></td>
          <td style="padding: 8px; border-bottom: 1px solid #eee;">${TotalPrice} AED</td>
        </tr>
        <tr>
          <td style="padding: 8px;"><b>Status:</b></td>
        <td style="padding: 8px; color: #e74a3b; font-weight: bold;">Unpaid (Cash on Travel)</td>
          </tr>
      </table>

      <p style="margin-top: 20px; font-size: 15px;">Thank you for booking with us! We look forward to making your trip memorable. 🌍✈️</p>
    </div>

    <!-- Footer -->
    <div style="background: #f8f9fc; text-align: center; padding: 15px; font-size: 13px; color: #666;">
      © ${new Date().getFullYear()} <strong> IBN SAHRA TRAVELS </strong> All rights reserved.
    </div>
     </div>
        `;


               


         let updateSlots ;  

            if (BookingForToday) {
            // Decrement TODAY's Slots field
            updateSlots = await DestinationDatabase.findOneAndUpdate(
                {
                    _id: DestinationID,
                    BookingOption: {
                        $elemMatch: {
                            Category: Category,
                            Duration: Duration,
                            PricingModel: selectedBookingOption.PricingModel,
                            CarCapacity:CarCapacity
                        }
                    }
                },
                {
                    $inc: { "BookingOption.$.Slots": -slotsToDecrement }
                },
                { new: true }
            );
            // Decrement FUTURE date slots in SlotByDate array
        } else {
            const dateSlotExists = selectedBookingOption.SlotByDate?.some(
                slot => slot.Date === BookingDate
            );

            if (dateSlotExists) {
                // Date exists, decrement RemainingSlots
                updateSlots = await DestinationDatabase.findOneAndUpdate(
                    {
                        _id: DestinationID,
                        BookingOption: {
                            $elemMatch: {
                                Category: Category,
                                Duration: Duration,
                                PricingModel: selectedBookingOption.PricingModel,
                                CarCapacity:CarCapacity,
                                "SlotByDate.Date": BookingDate
                            }
                        }
                    },
                    {
                        $inc: { "BookingOption.$[opt].SlotByDate.$[dateSlot].RemainingSlots": -slotsToDecrement }
                    },
                    {
                        arrayFilters: [
                            { "opt.Category": Category, "opt.Duration": Duration },
                            { "dateSlot.Date": BookingDate }
                        ],
                        new: true
                    }
                );
            } else {
                // Date doesn't exist, create new date entry
                updateSlots = await DestinationDatabase.findOneAndUpdate(
                    {
                        _id: DestinationID,
                        BookingOption: {
                            $elemMatch: {
                                Category: Category,
                                Duration: Duration,
                                PricingModel: selectedBookingOption.PricingModel,
                                CarCapacity:CarCapacity,
                            }
                        }
                    },
                    {
                        $push: {
                            "BookingOption.$.SlotByDate": {
                                Date: BookingDate,
                                RemainingSlots: selectedBookingOption.OriginalSlots - slotsToDecrement
                            }
                        }
                    },
                    { new: true }
                );
            }
        }
        console.log("updated slots",updateSlots)
        
        //send email after updating slots
         await SendEmail(Email,"Booking  successful",EmailHTML);
            return res.status(200).json({message:"booking successfully",result,updateSlots})

        }
        catch(error){
    console.log("internal errror",error)
    return res.status(500).json({message:"internal errror",error})
        }
    }

    module.exports=DestinationBookNow