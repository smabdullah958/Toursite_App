let express=require("express");
let App=express.Router()

//here it is also used to upload multiple images in a destination
let upload=require("../MiddleWare/DestinationMiddleware")

//here it is also used to update the images of a packages
let UpdatePackageMiddleWare =require("../MiddleWare/UpdatePackageMiddleWare")
//post
let PostDestination=require("../Features/Packages/PostPackages")
//get first 20 packages
let GetFirst12Packages=require("../Features/Packages/GetPackages/GetFirst12Packages")
let GetByID=require("../Features/Packages/GetPackages/GetByIDPackages")
let GetSixPackages=require("../Features/Packages/GetPackages/GetSixPackages")
let UpdatePackage=require("../Features/Packages/UpdatePackage")
let DeletePackage = require("../Features/Packages/DeletePackage")
let SearchBar =require("../Features/Packages/SearchBar")

App.post("/postpackage",upload.array("Image",5),PostDestination) // uplaod multiple images
App.get("/getpackages",GetFirst12Packages)
App.get("/getbyid/:id",GetByID)
App.get("/getsix",GetSixPackages)
App.delete("/DeletePackage/:id",DeletePackage)
App.put("/UpdatePackage/:id",UpdatePackageMiddleWare,UpdatePackage)
App.get("/Searching",SearchBar)

module.exports=App
