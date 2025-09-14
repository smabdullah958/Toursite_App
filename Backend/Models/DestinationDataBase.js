// require("dotenv").config({path:"../.env"})
// console.log(process.env.Connection)
let mongoose=require("mongoose")
// mongoose.connect(`${process.env.Connection}`)

let Sche=new mongoose.Schema({
    Title:{
        type:String,
        required:true
    },
    BasePrice:{
        type:Number,
        required:true
    },
    Slots:{
        type:Number,
        required:true
    },
    Description:{
        type:String,
        required:true,
        max:10000
    },
    Image:{
        type:String,
        required:true
    },
        //hre we use a arrya of a object becuase for a future purpose like in a futre if we want to also add a pickup address bus nmber plate etc than it is easy to add here 

    //here we can also use a simple array of string which work fine only for a time but here if we in a future here we want to add further fields than it is difficult
    TravelTimes:{
        type: [{ time: { type: String, required: true } }],
        required:true
    }

},{timestamps:true})

let model=mongoose.model("PostDestination",Sche)

module.exports = model