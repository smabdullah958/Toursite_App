let multer=require("multer")
let {CloudinaryStorage}=require("multer-storage-cloudinary");
let cloudinary=require("../cloudinaryConfig")
let storage=new CloudinaryStorage({
cloudinary,
params:{
folder:"DestinationImages",
allowed_formats:["jpg","png","jpeg"], //only these files are allowed

    public_id:(req,file)=>{
           return   Date.now() + "-" + Math.round(Math.random() * 1e9) // unique file name
            },
        },
        });

// file or images extension validation

 let fileFilter=(req,file,cb)=>{
     let allowedType=/jpg|jpeg|png/;
           const mimetype = allowedType.test(file.mimetype);
         if(mimetype){
             cb(null,true)
         }
         else{
                 cb(new Error("Only images (jpeg, jpg, png)  are allowed!"));

         }

 }


let upload=multer({
    storage,
    fileFilter,
    limits:{fileSize:300*1024} // file size is 300kb is allowed 
})


module.exports=upload