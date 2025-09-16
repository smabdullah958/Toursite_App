require("dotenv").config()
console.log("Port No",process.env.Port,process.env.FrontendURL)
let ConnectDB=require("./Connection.js")
let PortNo=process.env.Port
let URL=process.env.FrontendURL
const cookieParser = require("cookie-parser");
let express=require("express");
let App=express()
let cors=require("cors");
App.use(cookieParser());  
App.use(cors({
    origin:URL,
    credentials:true
}))
App.use(express.json())
let AuthController=require("./Controllers/AuthController")
let DestinationController=require("./Controllers/DestinationControllers")
let PackagesController=require("./Controllers/PackagesController")
let DestinationBookingNow=require("./Controllers/DestinationBookNowController.js")

ConnectDB()
App.use("/AuthController",AuthController)
App.use("/Destination",DestinationController)
App.use("/Packages",PackagesController)
App.use("/DestinationBooking",DestinationBookingNow)

App.listen(PortNo)
