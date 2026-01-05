let express=require("express");
let route=express.Router()

let PackageBookNow=require("../Controllers/PackageBookNow/PostPackages");
let GetFirstTwentyPackageBooking=require("../Controllers/PackageBookNow/GetFirstTwentyPackagesBooking")
let PackageByID=require("../Controllers/PackageBookNow/GetByID")
let MarkAsPaidBooking=require("../Controllers/PackageBookNow/MarkAsPaidBooking")
let SearchBar=require("../Controllers/PackageBookNow/SearchBar")

//if payment is successfully reciveve than through stripe send email
let PaymentSuccess=require("../Controllers/PackageBookNow/PaymentSuccessful")


//this file is used to send user id , name and email to a destination booking and a package booking bro 
let AuthMiddleWare=require("../MiddleWare/AuthMiddleWare")

route.post("/Booking/:PackageID",AuthMiddleWare,PackageBookNow)
//if payment is successfully reciveve than through stripe send email
route.post("/payment/success", AuthMiddleWare, PaymentSuccess);
route.get("/getPackagesBooking",GetFirstTwentyPackageBooking)
route.get("/getByID/:id",PackageByID)
route.put("/Update/:id",MarkAsPaidBooking);
route.get("/SearchBar",SearchBar)

module.exports=route