let Database=require("../Models/TeamDatabase");

let GetAbout=async(req,res)=>{
    try{
        let result=await Database.find()
        console.log(result);
        return res.status(200).json({message:"get all the data",result})
    }
    catch(error){
        console.log("internal error",error)
        return  res.status(500).json({message:"internal error"})
    }
}
module.exports=GetAbout