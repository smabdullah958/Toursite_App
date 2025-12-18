require("dotenv").config()

let mongoose=require("mongoose")

let ConnectDb=async(req,res)=>{
    try{
        await mongoose.connect(process.env.Connection)
        console.log("connection is establish")
    }
    catch(error){
        console.log("Connection of a DB is not establish",error.message)
        process.exit(1) //stop server
    }
}

module.exports=ConnectDb