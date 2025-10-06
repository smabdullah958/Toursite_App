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
        type:Number
    },
    NumberOfNoneAdultChild:{
        type:Number
    },
    Date:{
        type:String,
        required:true
    },
    TravelTime:{
        type:String,
        required:true
    },
    //to extract the destination name and base price
    PackageID:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"PostPackage",
        required:true
    },
    Category: {
        type: String,
        required: true // Must be required to identify the booked option
    },
    Duration: {
        type: String,
        required: true // Must be required to identify the booked option
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
    },
    PaymentMethod:{
        type:String,
        enum:["Stripe","Cash"]
    },
    PaymentStatus:{
        type:String,
        enum:["Paid","Not Paid"],
        default:"Not Paid"
    }
},{
    timestamps:true
})

let model=mongoose.model("PackageBookNow",Sch)

module.exports = model