let express=require("express");
let route=express.Router()

let DestinationBookNow=require("../DestinationBookNow/PostBooking")

//this file is used to send user id , name and email to a destination booking and a package booking bro 
let AuthMiddleWare=require("../MiddleWare/AuthMiddleWare")

route.post("/Booking/:DestinationID",AuthMiddleWare,DestinationBookNow)

module.exports=route