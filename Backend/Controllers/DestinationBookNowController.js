let express=require("express");
let route=express.Router()

let DestinationBookNow=require("../Features/DestinationBookNow/PostBooking")

//if payment is successfully reciveve than through stripe send email
let PaymentSuccess=require("../Features/DestinationBookNow/PayementSuccess")
let GetFirstTwenty=require("../Features/DestinationBookNow/GetFirstTwentyBooking")
let GetByID=require("../Features/DestinationBookNow/GetByID")
let MarkAsPaidBooking=require("../Features/DestinationBookNow/MarkAsPaidBooking");
let SearchBar=require("../Features/DestinationBookNow/SearchBar")

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