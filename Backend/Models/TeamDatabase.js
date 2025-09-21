let  mongoose =require ("mongoose");

let sch=new mongoose.Schema({
    Title:{
        type:String,
        required:true
    },
    Name:{
        type:String,
        required:true
    },
    Img:{
        type:String,
        required:true
    },
    Description:{
        type:String,
        required:true,
        min:1,
        max:5000
    },
    Facebook:{
        type:String,
        default:null
    },
    Linkedin:{
        type:String,
        default:null
    },
    Email:{
        type:String,
        default:null
    }
})

let mod=mongoose.model("AboutDatabase",sch)

module.exports=mod