//this is get first 20 images

let Database=require("../../Models/DestinationDataBase");

let GetTwentyImage=async(req,res)=>{
    try{
        let page=parseInt(req.query.page)||1
        
        let limit=parseInt(req.query.limit)||20
        
        let skip=(page-1)*limit
        let result=await Database.find({"BookingOption.Slots":{$gt  :0}})
        .select("Title Image BookingOption.BasePrice BookingOption.Slots _id")
        .sort({createdAt:-1})
        .skip(skip).limit(limit);
        console.log(result)
            return res.status(200).json({message:"image is show",result})   
    }
    catch(error){
            console.log("internal error",error)
            return res.status(500).json({message:"internal error",error})
    }
}
module.exports=GetTwentyImage