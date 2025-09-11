// require("dotenv").config({path:"../.env"})
// console.log(process.env.Connection)
let mongoose=require("mongoose")
// mongoose.connect(`${process.env.Connection}`)

let Sch=new mongoose.Schema({
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
        type:[String],
        required:true,
        min:2,
        max:5
    }}
    ,{timestamps:true}
)

let model=mongoose.model("PostPackage",Sch)

module.exports = model