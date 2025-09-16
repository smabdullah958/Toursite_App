let mongoose=require("mongoose");

let Sch=new mongoose.Schema({
    ContactNumber:{
        type:String,
        required:true,
  match: [/^\d{11}$/, "Contact number must be exactly 11 digits"]
    },
    WhatsAppNumber:{
        type:String,
         match: [/^\d{11}$/, "Contact number must be exactly 11 digits"],
         default:null
    },
    PickUpAddress:{
        type:String,
        required:true
    },
    NumberOfAdultChild:{
        type:Number,
        required:true
    },
    NumberOfNoneAdultChild:{
        type:Number
    },
    Date:{
        type:String,
        required:true
    },
    Days:{
        type:Number,
        required:true
    },
    TravelTime:{
        type:String,
        required:true
    },
    //to extract the destination name and base price
    DestinationID:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"PostDestination",
        required:true
    },
    
    TotalPrice:{
        type:Number,
        required:true
    },
    //to extract username and email
    UserID:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    }
})

let model=mongoose.model("DestinationBookNow",Sch)

module.exports = model