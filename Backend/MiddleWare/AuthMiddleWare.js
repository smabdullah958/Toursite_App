//this file is used to send user id , name and email to a destination booking and a package booking bro 

let jwt=require("jsonwebtoken")
require("dotenv").config();

let AuthMiddleWare=(req,res,next)=>{
    try{
        let token=req.cookies.token
        if(!token){
            return res.status(400).json({message:"user is not login"})
        }
        let decode=jwt.verify(token,process.env.SecretKey);
        req.user=decode;
        next()
    }
    catch(error){
        console.log("internal error",error)
            return res.status(403).json({ message: "Invalid or expired token", CheckLogin: false });

    }
}

module.exports=AuthMiddleWare