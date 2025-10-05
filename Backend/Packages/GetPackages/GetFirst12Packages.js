let DataBase=require("../../Models/PackagesDatabase");

let GetFirst12Packages=async(req,res)=>{
    try{ 
        let limit=parseInt(req.query.limit)||12
        let page=parseInt(req.query.page)||1
        let skip=(page-1)*limit
        let result=await DataBase.find()
        .select("Title Image BookingOption.BasePrice BookingOption.Slots _id")
        .sort({createdAt:-1})
        .skip(skip).limit(limit)
        console.log(result,result.length)
        console.log(result,result.length)
        return res.status(200).json({message:"first twenty packages",result})
    }
    catch(error){
        console.log("internal error",error)
        return res.status(500).json({message:"internal error",error})
    }
}
module.exports=GetFirst12Packages