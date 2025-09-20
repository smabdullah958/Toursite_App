let express=require("express");
let route=express.Router()

let PackageBookNow=require("../PackageBookNow/PostPackages");



//if payment is successfully reciveve than through stripe send email
let PaymentSuccess=require("../PackageBookNow/PaymentSuccessful")


//this file is used to send user id , name and email to a destination booking and a package booking bro 
let AuthMiddleWare=require("../MiddleWare/AuthMiddleWare")

route.post("/Booking/:PackageID",AuthMiddleWare,PackageBookNow)
//if payment is successfully reciveve than through stripe send email
route.post("/payment/success", AuthMiddleWare, PaymentSuccess);


module.exports=route