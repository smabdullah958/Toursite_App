let express=require("express")
let App=express.Router()
let SignUpAuth=require("../Controllers/Auth/SignUpAuth")
let validation=require("../Validator/AuthValidate")
let LogInAuth=require("../Controllers/Auth/LogInAuth")
let LogOut = require("../Controllers/Auth/LogOutAuth")
//it is used to check the user is login or not bro 
let CheckLogIn=require("../Controllers/Auth/CheckLogIn")

//here we send the email 

//this file main work si to generate a unique string and send to a user email when its click than it will redirect to a route wher eit will reset the password
//this is a forget password popup backend where we only write the email bro 
const ForgetPassword = require("../Controllers/Auth/ForgetPassword")

//here we send the password

//this file is used to open a route when we click ona link which si send to a email bro
 //and also here we can send only and only passowrd and also confirmpassword
let ResetPassword = require("../Controllers/Auth/resetPassword")

App.post("/SignUpAuth",validation,SignUpAuth)
App.post("/LogInAuth",LogInAuth)
App.post("/LogOutAuth",LogOut)
App.get("/checkLogin",CheckLogIn)
App.post("/ForgetPassword",ForgetPassword)
App.post("/reset-password/:token",ResetPassword)
module.exports=App