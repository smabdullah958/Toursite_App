
//hre we send only and only email

//this file main work si to generate a unique string and send to a user email when its click than it will redirect to a route wher eit will reset the password
//this is a forget password popup backend where we only write the email bro 

require("dotenv").config({path:"../.env"})
console.log(process.env.My_Gmail, process.env.App_Password)
let Database=require("../Models/UserDatabase")
const crypto = require("crypto");
const nodemailer = require("nodemailer");

// helper for transporter
const createTransporter = () => {
  return nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.My_Gmail, //my gmail
      pass: process.env.App_Password, // App password recommended
    },
  });
};


let ForgetPassword=async(req,res)=>{
    try{
        let {Email}=req.body

        if(!Email){
            return res.status(400).json({message:"email is required"})
        }

        let FindUser=await Database.findOne({Email})
            if(!FindUser){
                return res.status(400).json({message:"User is not found"})
            }

                // generate token
    const resetToken = crypto.randomBytes(32).toString("hex");

    // store token + expirys
    FindUser.resetPasswordToken = resetToken;
    FindUser.resetPasswordExpire = Date.now() + 1 * 60 * 1000; // 1 minutes
    await FindUser.save();

    // link
     const resetUrl = `${process.env.FrontendURL}/Reset_password/${resetToken}`;

    // send email
    const transporter = createTransporter();
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: Email,
      subject: "Password Reset Request",
    //   text: `You requested a password reset. Click the link to reset your password:\n\n${resetUrl}\n\nLink expires in 15 minutes.`,
       text: `Click here to reset your password: ${resetUrl}`,

    };

    await transporter.sendMail(mailOptions);
       
    return res.json({ message: " reset link sent",
     });

    }
    catch(error){
            console.log("internal error ",error)
            res.status(500).json({message:"internal error bro"})
    }
}
module.exports = ForgetPassword