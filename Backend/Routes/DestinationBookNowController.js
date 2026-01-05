let express=require("express");
let route=express.Router()

let DestinationBookNow=require("../Controllers/DestinationBookNow/PostBooking")

//if payment is successfully reciveve than through stripe send email
let PaymentSuccess=require("../Controllers/DestinationBookNow/PayementSuccess")
let GetFirstTwenty=require("../Controllers/DestinationBookNow/GetFirstTwentyBooking")
let GetByID=require("../Controllers/DestinationBookNow/GetByID")
let MarkAsPaidBooking=require("../Controllers/DestinationBookNow/MarkAsPaidBooking");
let SearchBar=require("../Controllers/DestinationBookNow/SearchBar")

//this file is used to send user id , name and email to a destination booking and a package booking bro 
let AuthMiddleWare=require("../MiddleWare/AuthMiddleWare")

let AdminOnly=require("../MiddleWare/AdminOnlyMiddleware")

//user routes
route.post("/Booking/:DestinationID",AuthMiddleWare,DestinationBookNow)
//if payment is successfully reciveve than through stripe send email
route.post("/payment/success", AuthMiddleWare, PaymentSuccess);
route.get("/SearchBar",SearchBar)

//admi route
route.get("/GetBooking" ,GetFirstTwenty)
route.get("/GetByID/:id",GetByID)
route.put("/UpdateBooking/:id", MarkAsPaidBooking)


module.exports=route