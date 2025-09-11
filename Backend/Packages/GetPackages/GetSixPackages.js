let database=require("../../Models/PackagesDatabase");
let GetSixPackages=async(req,res)=>{
    try{
        let result=await database.find().sort({createdAt:-1}).limit(6)
        console.log(result,result.length)
        res.status(200).json({message:"api is working",result})
    }
    catch(error){
            console.log("internal error",error)
    }
}
module.exports=GetSixPackages