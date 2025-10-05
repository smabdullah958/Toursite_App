let mongoose=require("mongoose")

//this is for a booking Schema bro
let BookingOptionSchema=new mongoose.Schema({
//per person or Fixed Unit for  a private booking
    PricingModel:{
        type:String,
        required:true,
        enum:["PerPerson","FixedUnit"]
    },
    BasePrice:{
        type:Number,
        required:true
    },
    //for capcity of a car like 10 seater , 5 seater
    CarCapacity:{
        type:Number,
    },
    //for full number of slots or a car 
    Slots:{
        type:Number,
        required:true
    },
    Category:{
        type:String,
        required:true
    },
    //this is used fora  how much duartion of a trip like 3 hour 8 hour etc
    Duration:{
        type:String,
        required:true
    }
})


let Sch=new mongoose.Schema({
    Title:{
        type:String,
        required:true
    },
    Description:{
        type:String,    
        required:true,
        max:10000
    },
    Image:{
        type:[String],
        required:true,
        min:2,
        max:5
    },
     BookingOption:{
        type:[BookingOptionSchema],
        required:true
    },
    //hre we use a arrya of a object becuase for a future purpose like in a futre if we want to also add a pickup address bus nmber plate etc than it is easy to add here 

    //here we can also use a simple array of string which work fine only for a time but here if we in a future here we want to add further fields than it is difficult
    TravelTimes:{
        type: [{ time: { type: String, required: true } }],
        required:true
    },
        //this is used fora  how much duartion of a trip like 3 hour 8 hour etc

}
    ,{timestamps:true}
)

let model=mongoose.model("PostPackage",Sch)

module.exports = model