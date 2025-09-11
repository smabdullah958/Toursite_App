require("dotenv").config()

let mongoose=require("mongoose")

let ConnectDb=async(req,res)=>{
    try{
        let result=await mongoose.connect(process.env.Connection,{
            useNewUrlParser: true,
  useUnifiedTopology: true,
        })
        console.log("connection is establish")
    }
    catch(error){
        console.log("Connection of a DB is not establish",error.message)
        process.exit(1) //stop server
    }
}

module.exports=ConnectDb