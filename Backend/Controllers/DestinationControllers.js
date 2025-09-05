let express=require("express");
let App=express.Router();
let PostDestination=require("../Destination/PostImage")
let upload=require("../MiddleWare/DestinationMiddleware")
let GetTwentyImage=require("../Destination/GetImages/GetTwentyImage")
let GetToursByID=require("../Destination/GetImages/GetByID")

//here the Image is a field name in a database bro
App.post("/Post",upload.single("Image"),PostDestination)
App.get("/twenty",GetTwentyImage);
App.get("/GetById/:_id",GetToursByID)

module.exports=App