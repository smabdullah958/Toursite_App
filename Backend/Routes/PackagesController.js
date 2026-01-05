let express=require("express");
let App=express.Router()

//here it is also used to upload multiple images in a destination
let upload=require("../MiddleWare/DestinationMiddleware")

//here it is also used to update the images of a packages
let UpdatePackageMiddleWare =require("../MiddleWare/UpdatePackageMiddleWare")
//post
let PostDestination=require("../Controllers/Packages/PostPackages")
//get first 20 packages
let GetFirst12Packages=require("../Controllers/Packages/GetPackages/GetFirst12Packages")
let GetByID=require("../Controllers/Packages/GetPackages/GetByIDPackages")
let GetSixPackages=require("../Controllers/Packages/GetPackages/GetSixPackages")
let UpdatePackage=require("../Controllers/Packages/UpdatePackage")
let DeletePackage = require("../Controllers/Packages/DeletePackage")
let SearchBar =require("../Controllers/Packages/SearchBar")

App.post("/postpackage",upload.array("Image",5),PostDestination) // uplaod multiple images
App.get("/getpackages",GetFirst12Packages)
App.get("/getbyid/:id",GetByID)
App.get("/getsix",GetSixPackages)
App.delete("/DeletePackage/:id",DeletePackage)
App.put("/UpdatePackage/:id",UpdatePackageMiddleWare,UpdatePackage)
App.get("/Searching",SearchBar)

module.exports=App
