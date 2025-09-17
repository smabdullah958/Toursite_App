let bcrypt=require("bcrypt")
let JWT=require("jsonwebtoken")
require("dotenv").config()
let DataBase=require("../Models/UserDatabase")

let LogInAuth=async(req,res)=>{
    try{
        let {Email,Password}=req.body;
        if(!Email||!Password){
            return res.status(402).json({message:"all fields are mandatory"})
        }
        let ExistUser=await DataBase.findOne({Email})
        if(!ExistUser){
            return res.status(401).json({message:"email or password is invalid"})
        }
        //comapare and hash and simple password
        let MatchPassword=await bcrypt.compare(Password,ExistUser.Password)
        if(!MatchPassword){
            return res.status(402).json({message:"invalid email or password"})
        }

        // if password match than generate token
        let token=JWT.sign({Email,Role:ExistUser.Role,_id:ExistUser._id,Name:ExistUser.Name},process.env.SecretKey,
{           expiresIn: '1w'     }) 
//send token to a frontend 
res.cookie("token",token,{      httpOnly: true,
  secure: false, 
    sameSite: "Lax",       // ✅ "Lax" works well on local project
          maxAge: 7 * 24 * 60 * 60 * 1000
})
console.log(token)
return res.status(200).json({message:"User is Login",Role:ExistUser.Role})
}
    catch(error){
        console.log("internal error",error)
        res.status(500).json({message:"internal error",error})
    }
}
module.exports=LogInAuth