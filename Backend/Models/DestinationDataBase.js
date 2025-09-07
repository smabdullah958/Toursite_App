require("dotenv").config({path:"../.env"})
console.log(process.env.Connection)
let mongoose=require("mongoose")
mongoose.connect(`${process.env.Connection}`)

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
    Discount:{
        type:Number
    }

},{timestamps:true})

let model=mongoose.model("PostDestination",Sche)

module.exports = model