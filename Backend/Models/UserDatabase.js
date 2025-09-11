// require("dotenv").config();
// console.log("connection",process.env.Connection)
let mongoose=require("mongoose");
// mongoose.connect(`${process.env.Connection}`)
let Sch=new mongoose.Schema({
    Name:{
        type:String,
        required:true
    },
    Email:{
        type:String,
        required:true,
        unique:true
    },
    Role:{
            type:String,
            required:true,
            enum:["User","Admin"],
            default:"User"
    },
    Password:{
        type:String,
        required:true,
        min:6
    },
    resetPasswordToken:{
        type:String
    },
    resetPasswordExpire:{
        type:Date
    }
})

let Model=mongoose.model("User",Sch)
module.exports=Model