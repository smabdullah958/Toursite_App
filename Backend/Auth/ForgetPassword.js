
//hre we send only and only email

//this file main work si to generate a unique string and send to a user email when its click than it will redirect to a route wher eit will reset the password
//this is a forget password popup backend where we only write the email bro 

require("dotenv").config({path:"../.env"})
console.log(process.env.My_Gmail, process.env.App_Password)
let Database=require("../Models/UserDatabase")
const crypto = require("crypto");

let sendEmail=require("../GmailTranporter")


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

   
//main mail    
    const EmailHTML = `
  <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #e0e0e0; border-radius: 8px; overflow: hidden;">
    <div style="background: #4f46e5; color: white; padding: 20px; text-align: center;">
      <h2>Password Reset Request</h2>
    </div>
    <div style="padding: 20px; color: #333;">
      <p>Hi <strong>${FindUser.Name || "User"}</strong>,</p>
      <p>We received a request to reset your password. Click the button below to reset it:</p>
      
      <div style="text-align: center; margin: 30px 0;">
        <a href="${resetUrl}" target="_blank" 
           style="background: #4f46e5; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-size: 16px;">
           Reset Password
        </a>
      </div>

      <p>If the button doesn’t work, copy and paste this link into your browser:</p>
      <p style="word-break: break-all; color: #1d4ed8;">${resetUrl}</p>

      <p><strong>Note:</strong> This link will expire in <span style="color: red;">1 minute</span>.</p>

      <p>If you didn’t request a password reset, you can safely ignore this email.</p>
    </div>
    <div style="background: #f3f4f6; padding: 15px; text-align: center; font-size: 12px; color: #555;">
      © ${new Date().getFullYear()} Your Company. All rights reserved.
    </div>
  </div>
  `;


    await sendEmail(Email,"Reset Password Link",EmailHTML);
       
    return res.json({ message: " reset link sent",
     });

    }
    catch(error){ 
            console.log("internal error ",error)
            res.status(500).json({message:"internal error bro"})
    }
}
module.exports = ForgetPassword