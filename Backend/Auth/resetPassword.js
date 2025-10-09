//here we send the password

//this file is used to open a route when we click ona link which si send to a email bro
 //and also here we can send only and only passowrd and also confirmpassword

 let  bcrypt=require( "bcrypt");
    let JWT=require("jsonwebtoken")
    console.log(process.env.SecretKey)
    require("dotenv").config({path:"../.env"})
    
let Database=require("../Models/UserDatabase")

let ResetPassword=async(req,res)=>{
    try{
        let {token}=req.params;
        let {Password}=req.body
        if (!token || !Password||Password.length<6) {
      return res.status(400).json({ message: "Token and password are required" });
}


        let user=await Database.findOne({
            resetPasswordToken:token,
            resetPasswordExpire:{$gte:Date.now()}
        });
        if(!user){
            return res.status(400).json({message:"Link is expire"})
        }
        user.Password=await  bcrypt.hash(Password,10);


        //ccreate token for a login or signup bro
        let JWTToken=JWT.sign({
            id:user._id,
            Role:user.Role
        },
            process.env.SecretKey,
            {expiresIn:"1w"}
        )
        console.log(JWTToken)

        //now send cookie to a frontend
        res.cookie("token",JWTToken,
            {
        httpOnly: true,
        secure: false, 
    sameSite: "Lax",       // ✅ "Lax" works well on local project
          maxAge: 7 * 24 * 60 * 60 * 1000
        })
        //save in password in a databse
        await user.save()
        
        console.log("toek",token,"pas",user.Password,user.Role)
   return     res.status(200).json({message:"Password reset Successfully",Role:user.Role})
        }
        catch(error){
            console.log("internal error bro ",error)
            return res.status(500).json({message:"internal error bro ",error})
        }
}

module.exports=ResetPassword