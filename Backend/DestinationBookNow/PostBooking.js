require("dotenv").config()
let {validationResult} = require("express-validator")
let Database=require("../Models/DestinationBookNow");
let DestinationDatabase=require("../Models/DestinationDataBase")

let Stripe=require("stripe");
let stripe=new Stripe(process.env.Stirpe_Secret_key)

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
let destination=await DestinationDatabase.findOne({_id:DestinationID});
if(!destination){
    return res.status(401).json({message:"invalid destination"})
}

console.log("desitnation is found")

         let {ContactNumber,WhatsAppNumber,PickUpAddress,NumberOfNoneAdultChild,NumberOfAdultChild,Days,TravelTime,TotalPrice,Date,PaymentMethod}=req.body

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
            DestinationID,
            UserID,
            Date,
            PaymentMethod
        })

        console.log("domcunet is created")

        let result=await booking.save()
        console.log("successfull",result);

        //payement method through stripe

        if(PaymentMethod==="Stripe"){
            let paymentIntent =await stripe.paymentIntents.create({
                amount:TotalPrice*100, 
                //here in a amount we must be convert the total price into a currency smallest unit like pasia
                currency:"pkr",
              automatic_payment_methods: { enabled: true }, // ✅ allow card & link

                metadata:{
                    bookingId:result._id.toString(),
                    UserName:Name,  
                    UserEmail:Email
                },
            });
            console.log(paymentIntent)
            return res.status(200).json({message:"booking created , processed with stripe payement method",result,
                clientSecret:paymentIntent.client_secret
            })
        }

        //if payement is cash
        return res.status(200).json({message:"booking successfully",result})

    }
    catch(error){
console.log("internal errror",error)
return res.status(500).json({message:"internal errror",error})
    }
}

module.exports=DestinationBookNow