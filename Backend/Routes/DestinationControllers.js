let express=require("express");
let App=express.Router();
let PostDestination=require("../Features/Destination/PostImage")

//upload image
let upload=require("../MiddleWare/DestinationMiddleware")

let GetTwentyImage=require("../Features/Destination/GetImages/GetTwentyImage")
let GetToursByID=require("../Features/Destination/GetImages/GetByID")
let GetSixImage=require("../Features/Destination/GetImages/GetSixImage")
let DeleteTour=require("../Features/Destination/DeleteTour")
let UpdateTour=require("../Features/Destination/UpdateImage")
let SearchBar=require("../Features/Destination/SearchBar")
//here the Image is a field name in a database bro
App.post("/Post",upload.single("Image"),PostDestination)
App.get("/twenty",GetTwentyImage);
App.get("/GetById/:_id",GetToursByID)
App.get("/Six",GetSixImage)
App.delete("/delete/:id",DeleteTour)
App.put("/update/:id",upload.single("Image"),UpdateTour)
App.get("/search",SearchBar)

module.exports=App