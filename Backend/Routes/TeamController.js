let express=require("express")
let route=express.Router()

//Upload image
let uploadTeam=require("../MiddleWare/TeamMiddleWare")

let PostTeam=require("../Controllers/Team/PostTeam")
let GetTeam=require("../Controllers/Team/GetTeam")
let DeleteTeam=require("../Controllers/Team/DeleteTeam")
let UpdateTeam=require("../Controllers/Team/UpdateTeam")

route.post("/Post",uploadTeam.single('Img'),PostTeam)
route.get("/Get",GetTeam)
route.delete('/DeleteTeam/:id',DeleteTeam)
route.put("/UpdateTeam/:id",uploadTeam.single('Img'),UpdateTeam)

module.exports=route
