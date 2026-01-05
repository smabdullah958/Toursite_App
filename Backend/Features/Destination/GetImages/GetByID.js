let Database=require("../../Models/DestinationDataBase");
let GetToursByID=async(req,res)=>{
    try{
        let {_id}=req.params
        if(!_id){
            return res.status(400).json({message:"id is required"})
        }
        let result=await Database.findOne({_id})
        if(!result){
            return res.status(400).json({message:"id si not valid"})
        }
        console.log(result)

        return res.status(200).json({message:"Details",result})
    }
    catch(error){
        console.log(error)
        res.status(500).json({message:"internal error",error})
    }
}
module.exports=GetToursByID