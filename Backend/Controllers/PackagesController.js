let express=require("express");
let App=express.Router()

let PostDestination=require("../Packages/PostPackages")
//here it is also used to upload multiple images in a destination
let upload=require("../MiddleWare/DestinationMiddleware")


App.post("/postpackage",upload.array("Image",5),PostDestination) // uplaod multiple images

module.exports=App
