let {validationResult} = require("express-validator")
let Database=require("../Models/DestinationBookNow");
let DestinationDatabase=require("../Models/DestinationDataBase")

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
     console.log(UserID)
if(!DestinationID){
    return res.status(400).json({message:"destination id is required"})
}
console.log(DestinationID)
let destination=await DestinationDatabase.findOne({_id:DestinationID});
if(!destination){
    return res.status(401).json({message:"invalid destination"})
}

console.log("desitnation is found")

         let {ContactNumber,WhatsAppNumber,PickUpAddress,NumberOfNoneAdultChild,NumberOfAdultChild,Days,TravelTime,TotalPrice,Date}=req.body

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
            Date
        })

        console.log("domcunet is created")

        let result=await booking.save()
        console.log("successfull",result);
        return res.status(200).json({message:"booking successfully",result})

    }
    catch(error){
console.log("internal errror",error)
return res.status(500).json({message:"internal errror",error})
    }
}

module.exports=DestinationBookNow