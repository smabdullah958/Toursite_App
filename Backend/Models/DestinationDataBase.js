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


//for a main schema bro 
let Sche=new mongoose.Schema({
    Title:{
        type:String,
        required:true
    },
    BookingOption:{
        type:[BookingOptionSchema],
        required:true
    },
    Description:{
        type:String,
        required:true,
        max:90000000
    },
    Image:{
        type:String,
        required:true
    },
     
    //here we can also use a simple array of string which work fine only for a time but here if we in a future here we want to add further fields than it is difficult
    TravelTimes:{
         type: [{ time: { type: String, required: true } }],
        required:true
    }
},{timestamps:true})

let model=mongoose.model("PostDestination",Sche)

module.exports = model