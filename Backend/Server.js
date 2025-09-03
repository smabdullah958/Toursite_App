require("dotenv").config()
console.log("Port No",process.env.Port,process.env.FrontendURL)
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
App.use("/AuthController",AuthController)

App.listen(PortNo)
