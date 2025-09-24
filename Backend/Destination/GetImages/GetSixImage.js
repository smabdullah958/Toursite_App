//this is get first 20 images

let Database=require("../../Models/DestinationDataBase");

let GetSixImage=async(req,res)=>{
    try{
        let result=await Database.find({Slots:{$gt  :0}})
        .select("Title Image BasePrice Slots _id")
        .sort({createdAt:-1}).limit(6);
        console.log(result)
            return res.status(200).json({message:"image is show",result})   
    }
    catch(error){
            console.log("internal error",error)
            return res.status(500).json({message:"internal error",error})
    }
}
module.exports=GetSixImage