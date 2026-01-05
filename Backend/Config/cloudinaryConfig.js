let cloudinary=require("cloudinary").v2
require("dotenv").config()
cloudinary.config({
    cloud_name:process.env.Cloudinary_Cloud_Name,
    api_key:process.env.Cloudinary_API_Key,
    api_secret:process.env.Cloudinary_API_SECRET
})

module.exports=cloudinary;