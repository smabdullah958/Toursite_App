    require("dotenv").config()
    let {validationResult} = require("express-validator")
    let Database=require("../Models/PackagesBookNow");
    let PackageDatabase=require("../Models/PackagesDatabase")

    let Stripe=require("stripe");
    let stripe=new Stripe(process.env.Stirpe_Secret_key)

    let SendEmail=require("../GmailTranporter")

   let GetDubaiDate=require("../DubaiTimeZone")
    

    let PackageBookNow=async(req,res)=>{
        try{
    //for validation
            let error=validationResult(req);
            console.log('hello')
        if(!error.isEmpty()){
            console.log("internal error")
            return res.status(401).json({message:"validation error bro",error:error.array()})
        }
    console.log("daa is receit")

//hre we recive the package id
    let {PackageID}=req.params
    // ✅ comes from token/middleware here it contain the id of a user 
        let   UserID=req.user._id
        //for UserName
        let Name=req.user.Name

        //Email
        let Email=req.user.Email
        console.log("user id is ",UserID,Name,Email)
    if(!PackageID){
        return res.status(400).json({message:"destination id is required"})
    }

    console.log(PackageID)
//find package
    let package=await PackageDatabase.findOne({_id:PackageID});
    if(!package){
        return res.status(401).json({message:"invalid Package"})
    }

    console.log("Package is found")

            let {ContactNumber,WhatsAppNumber,
                Category,Duration,
                CarCapacity,
                PickUpAddress,NumberOfNoneAdultChild,
                NumberOfAdultChild,
                TravelTime,TotalPrice,
                Date:BookingDate,PaymentMethod}=req.body

            console.log('data is recieve from a body')

                        let totalslots=NumberOfAdultChild+NumberOfNoneAdultChild;

                        //  Find the SPECIFIC Booking Option for Slot Check ---
        const selectedBookingOption = package.BookingOption.find(
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
                Duration,
                Category,
                CarCapacity,
                TravelTime,
                TotalPrice,
                PackageID,
                UserID,
                Date:BookingDate,
                PaymentMethod,
            })

            console.log("domcunet is created")

            let result=await booking.save()
            console.log(result,"successfull");



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

         let Package=await PackageDatabase.findOne({_id:PackageID})
            

            //if payement is cash
            
            //Send Email

            let EmailHTML = `
<div style="font-family: 'Segoe UI', Tahoma, sans-serif; max-width: 650px; margin: auto; background: #fffdf5; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 16px rgba(0,0,0,0.1); border: 1px solid #f5e6c8;">
  
  <!-- Header -->
  <div style="background: linear-gradient(90deg, #d4af37, #b68c2a); color: white; text-align: center; padding: 25px 10px;">
    <h2 style="margin: 0; font-size: 22px;">🌴 IBN SAHRA TRAVELS</h2>
    <p style="font-size: 15px; margin-top: 5px;">Your trusted travel partner across the Emirates</p>
  </div>

  <!-- Body -->
  <div style="padding: 25px; color: #3d3d3d; background: #fffaf0;">
    <h3 style="margin-top: 0; color: #b68c2a;">Hello <b>${Name}</b>,</h3>

    <p style="font-size: 15px; line-height: 1.7;">
      We're delighted to confirm your recent <b>destination booking</b> with 
      <strong style="color:#b68c2a;">IBN SAHRA TRAVELS</strong>. Please note that your payment is 
      <span style="color:#e74a3b; font-weight: bold;">pending</span>.
    </p>

    <div style="margin: 20px 0;">
      <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
        <tr>
          <td style="padding: 10px; border-bottom: 1px solid #f0e6d2;"><b>Destination:</b></td>
          <td style="padding: 10px; border-bottom: 1px solid #f0e6d2;">${Package.Title}</td>
        </tr>
        <tr>
          <td style="padding: 10px; border-bottom: 1px solid #f0e6d2;"><b>Booking Date:</b></td>
          <td style="padding: 10px; border-bottom: 1px solid #f0e6d2;">${BookingDate}</td>
        </tr>
        <tr>
          <td style="padding: 10px; border-bottom: 1px solid #f0e6d2;"><b>Duration:</b></td>
          <td style="padding: 10px; border-bottom: 1px solid #f0e6d2;">${booking.Duration}</td>
        </tr>

        ${
          selectedBookingOption.PricingModel === "PerPerson" &&`
          <tr>
            <td style="padding: 10px; border-bottom: 1px solid #f0e6d2;"><b>Total Seats Booked:</b></td>
            <td style="padding: 10px; border-bottom: 1px solid #f0e6d2;">${totalslots}</td>
          </tr>`
        }

        ${
          selectedBookingOption.PricingModel === "FixedUnit"&&`
          <tr>
            <td style="padding: 10px; border-bottom: 1px solid #f0e6d2;"><b>Vehicle Capacity:</b></td>
            <td style="padding: 10px; border-bottom: 1px solid #f0e6d2;">${selectedBookingOption.CarCapacity}</td>
          </tr>`
        }

        <tr>
          <td style="padding: 10px; border-bottom: 1px solid #f0e6d2;"><b>Total Price:</b></td>
          <td style="padding: 10px; border-bottom: 1px solid #f0e6d2;"><b>${TotalPrice} AED</b></td>
        </tr>
        <tr>
          <td style="padding: 10px;"><b>Status:</b></td>
          <td style="padding: 10px; color: #e74a3b; font-weight: bold;">Unpaid (Cash on Travel)</td>
        </tr>
      </table>
    </div>

  <p style="margin-top: 30px; font-size: 14px; text-align: center; color: #5c5c5c;">
      Thank you for choosing <strong style="color:#b68c2a;">IBN SAHRA TRAVELS</strong>.<br>
      We look forward to making your UAE journey truly unforgettable. 🇦🇪✨
    </p>
    </div>

  <!-- Footer -->
  <div style="background: #b68c2a; color: white; text-align: center; padding: 15px; font-size: 13px;">
    © ${new Date().getFullYear()} <b>IBN SAHRA TRAVELS</b> — All Rights Reserved.<br>
  </div>
</div>
`;

           let updateSlots ;
    
                if (BookingForToday) {
                // Decrement TODAY's Slots field
                updateSlots = await PackageDatabase.findOneAndUpdate(
                    {
                        _id: PackageID,
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
            } else {
                // Decrement FUTURE date slots in SlotByDate array
                const dateSlotExists = selectedBookingOption.SlotByDate?.some(
                    slot => slot.Date === BookingDate
                );
    
                if (dateSlotExists) {
                    // Date exists, decrement RemainingSlots
                    updateSlots = await PackageDatabase.findOneAndUpdate(
                        {
                            _id: PackageID,
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
                    updateSlots = await PackageDatabase.findOneAndUpdate(
                        {
                            _id: PackageID,
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
    
    
    //send email
                await SendEmail(Email,"payement is successful",EmailHTML);

            return res.status(200).json({message:"booking successfully",result,updateSlots})

        }
        catch(error){
    console.log("internal errror",error)
    return res.status(500).json({message:"internal errror",error})
        }
    }

    module.exports=PackageBookNow