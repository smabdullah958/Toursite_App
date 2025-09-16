require("dotenv").config()
console.log(process.env.SecretKey)
let DataBase=require("../Models/UserDatabase");
let {validationResult}=require("express-validator");
let bcrypt=require("bcrypt")
let JWT=require("jsonwebtoken")

let SignUpAuth=async(req,res)=>{
try{
let MySecretKey=process.env.SecretKey

    let {Name,Email,Password,Role}=req.body
        if(!Name||!Email||!Password){
            return res.status(401).json({message:"all fields must be filled"})
        }
    let error=validationResult(req);
    if(!error.isEmpty()){
        return res.status(401).json({message:"validation error",error:error.array()})
    }
    let existEmail=await DataBase.findOne({Email})
    if(existEmail){
        return res.status(402).json({message:"email is already exist"})
    }
//generate salt
    let salt=await bcrypt.genSalt(10)
    //convert password to a hash
    let hashPassword=await bcrypt.hash(Password,salt)
    //create document to streo a hash password 
    let result=new DataBase({
        Name,
        Email,
        Password:hashPassword,
        Role
    })
    console.log("hashPassword",hashPassword)
    //create token
    const token = JWT.sign(
        { Email,Role,_id},
        MySecretKey,
        { expiresIn: '1w' });
    console.log('Token', token, '\n')
//send token to afrontend
    res.cookie("token",token,
    {
        httpOnly: true,
        secure: false, 
    sameSite: "Lax",       // ✅ "Lax" works well on local project
          maxAge: 7 * 24 * 60 * 60 * 1000
    }
)


//save ina databse bro 
    await result.save()
    console.log(Password,Role)
    res.status(200).json({message:"account is created successfully",result})
}
catch(error){
    console.log("internal error",error)
        res.status(500).json({message:"internal error",error})
    }
}
module.exports=SignUpAuth