//this file is usded to check that user is login or not bro 
let jwt=require("jsonwebtoken");
require("dotenv").config()

let CheckLogIn=(req,res)=>{
    try{
        let token=req.cookies.token;
        if(!token){
            return res.status(400).json({message:"user is a not Login",CheckLogin:false})
        }
        console.log(process.env.SecretKey)
        let decode=jwt.verify(token,process.env.SecretKey)
        console.log("decode successfully",decode,decode.Role)
        
        return res.status(200).json({message:' Login button hide',CheckLogin:true,decode})
    }
    catch(error){
        console.log("internal errror bro ",error)
        res.status(500).json({message:"internal error bro ",error,CheckLogin:false})
    }
}
module.exports=CheckLogIn