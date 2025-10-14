
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

const EmailHTML = `
<div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background: #fefce8; margin: 0; padding: 0;">
  <table style="max-width: 600px; margin: 40px auto; background: white; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
    <tr>
      <td style="background: linear-gradient(90deg, #facc15, #eab308); padding: 25px 0; text-align: center; color: #1e293b;">
        <h1 style="margin: 0; font-size: 22px;">🔐 Password Reset Request</h1>
      </td>
    </tr>
    <tr>
      <td style="padding: 30px 40px; color: #334155; background: #fffbeb;">
        <p style="font-size: 16px;">Hi <strong>${FindUser.Name || "User"}</strong>,</p>
        <p style="font-size: 15px; line-height: 1.6;">
          We received a request to reset your password for your <strong>IBN SAHRA TRAVELS</strong> account.
          Click the button below to securely reset it:
        </p>

        <div style="text-align: center; margin: 35px 0;">
          <a href="${resetUrl}" target="_blank"
      style="
        display: inline-block;
        background: linear-gradient(90deg, #fde047, #facc15, #eab308);
        color: #1f2937;
        padding: 14px 32px;
        font-size: 16px;
        font-weight: 600;
        border-radius: 40px;
        text-decoration: none;
        box-shadow: 0 3px 6px rgba(0,0,0,0.25);
        transition: all 0.3s ease;
      "
      onmouseover="this.style.background='linear-gradient(90deg,#facc15,#eab308,#ca8a04)';this.style.transform='scale(1.05)';"
      onmouseout="this.style.background='linear-gradient(90deg,#fde047,#facc15,#eab308)';this.style.transform='scale(1)';">

             Reset My Password
          </a>
        </div>

        <p style="font-size: 14px; color: #475569;">
          If the button above doesn’t work, copy and paste this link into your browser:
        </p>

        <p style="word-break: break-all; background: #fef9c3; padding: 10px; border-radius: 6px; font-size: 13px; color: #1d4ed8;">
          ${resetUrl}
        </p>

        <p style="font-size: 13px; color: #b91c1c;">
          ⚠️ This link will expire in <strong>1 minute</strong>.
        </p>

        <p style="font-size: 14px; color: #475569; margin-top: 20px;">
          If you didn’t request this, you can safely ignore this email.
        </p>
      </td>
    </tr>
    <tr>
      <td style="background: #fef08a; text-align: center; padding: 15px; font-size: 13px; color: #525252;">
        © ${new Date().getFullYear()} <strong>IBN SAHRA TRAVELS</strong> — All Rights Reserved.
      </td>
    </tr>
  </table>
</div>
`;


    await sendEmail(Email," Password Reset Link",EmailHTML);
       
    return res.json({ message: " reset link sent",
     });

    }
    catch(error){ 
            console.log("internal error ",error)
            res.status(500).json({message:"internal error bro"})
    }
}
module.exports = ForgetPassword