require("dotenv").config()
console.log("Port No",process.env.Port,process.env.FrontendURL)
let ConnectDB=require("./Config/Connection.js")
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
let AuthController=require("./Routes/AuthController")
let DestinationController=require("./Routes/DestinationControllers")
let PackagesController=require("./Routes/PackagesController")
let DestinationBookingNow=require("./Routes/DestinationBookNowController.js")
let PackageBookNow=require("./Routes/PackageBookNowController.js")
let TeamController=require("./Routes/TeamController.js")

let ResetDestinationDailySlots=require("./Controllers/Destination/resetDailySlots.js")
let ResetPackageDailySlots=require("./Controllers/Packages/resetDailySlots.js")

//reset daily slots for a destination bro
ResetDestinationDailySlots()
//reset daily slots for a package bro
ResetPackageDailySlots()

ConnectDB()
App.use("/AuthController",AuthController)
App.use("/Destination",DestinationController)
App.use("/Packages",PackagesController)
App.use("/DestinationBooking",DestinationBookingNow)
App.use("/PackageBooking",PackageBookNow)
App.use("/About",TeamController)
// this route is only used to wake up the server it means that the server is running 
 App.get('/ping', (req, res) => {
  res.status(200).send("Server is awake");
});
App.listen(PortNo)
