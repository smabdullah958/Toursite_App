    require("dotenv").config()
    let {validationResult} = require("express-validator")
    let Database=require("../Models/PackagesBookNow");
    let PackageDatabase=require("../Models/PackagesDatabase")

    let Stripe=require("stripe");
    let stripe=new Stripe(process.env.Stirpe_Secret_key)

    let SendEmail=require("../GmailTranporter")

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
                PickUpAddress,NumberOfNoneAdultChild,
                NumberOfAdultChild,Days,
                TravelTime,TotalPrice,
                Date:BookingDate,PaymentMethod}=req.body

            console.log('data is recieve from a body')

            let booking = new Database({
                ContactNumber,
                WhatsAppNumber,
                PickUpAddress,
                NumberOfNoneAdultChild,
                NumberOfAdultChild,
                Days,
                TravelTime,
                TotalPrice,
                PackageID,
                UserID,
                Date:BookingDate,
                PaymentMethod
            })

            console.log("domcunet is created")

            let result=await booking.save()
            console.log(result,"successfull");

                        let totalslots=NumberOfAdultChild;
//if adult child is greater than the slots than show message
            if(totalslots>package.Slots){
              return res.status(400).json({message:"we have not enough slots available"})
            }

            console.log("successfull",result);


            //payement method through stripe

            if(PaymentMethod==="Stripe"){
                let paymentIntent =await stripe.paymentIntents.create({
                    amount:TotalPrice*100, 
                    //here in a amount we must be convert the total price into a currency smallest unit like pasia
                    currency:"usd",
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


            //if payement is cash
            
            //Send Email
    let EmailHTML = `
  <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #e0e0e0; border-radius: 10px; overflow: hidden; box-shadow: 0 4px 10px rgba(0,0,0,0.1);">
    <!-- Header -->
    <div style="background: linear-gradient(90deg, #4e73df, #1cc88a); color: white; text-align: center; padding: 20px;">
  <p style="font-size: 15px;">Your Package booking has been successfully created. Please note that your payment is <b>not yet completed</b>. Below are your booking details:</p>

    </div>

    <!-- Body -->
    <div style="padding: 20px; color: #333;">
      <h4 style="margin-top: 0;">Hello <b>${Name}</b>,</h4>
      <p style="font-size: 15px;">We’re excited to let you know that  your Package booking has been confirmed. Below are your booking details:</p>

      <table style="width: 100%; border-collapse: collapse; margin-top: 15px;">
        <tr>
          <td style="padding: 8px; border-bottom: 1px solid #eee;"><b>Destination:</b></td>
          <td style="padding: 8px; border-bottom: 1px solid #eee;">${package.Title}</td>
        </tr>
        <tr>
          <td style="padding: 8px; border-bottom: 1px solid #eee;"><b>Booking Date:</b></td>
          <td style="padding: 8px; border-bottom: 1px solid #eee;"> ${BookingDate}</td>
        </tr>
        <tr>
          <td style="padding: 8px; border-bottom: 1px solid #eee;"><b>Total Days:</b></td>
          <td style="padding: 8px; border-bottom: 1px solid #eee;">${Days}</td>
        </tr>
        <tr>
          <td style="padding: 8px; border-bottom: 1px solid #eee;"><b>Total Seats/Slots:</b></td>
          <td style="padding: 8px; border-bottom: 1px solid #eee;">${NumberOfAdultChild +NumberOfNoneAdultChild}</td>
        </tr>
        <tr>
          <td style="padding: 8px; border-bottom: 1px solid #eee;"><b>Total Price:</b></td>
          <td style="padding: 8px; border-bottom: 1px solid #eee;">${TotalPrice} RS</td>
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
      © ${new Date().getFullYear()} Your Company Name. All rights reserved.
    </div>
     </div>
        `;

                //send email
                await SendEmail(Email,"payement is successful",EmailHTML);

                
                              //if adult child is smaller than a slots than subtract and send to  frontend  
                         let  updateSlots=  await PackageDatabase.findByIdAndUpdate(PackageID,
                              {$inc:{Slots:-totalslots}},
                              {new:true}
                            )

            return res.status(200).json({message:"booking successfully",result,updateSlots})

        }
        catch(error){
    console.log("internal errror",error)
    return res.status(500).json({message:"internal errror",error})
        }
    }

    module.exports=PackageBookNow