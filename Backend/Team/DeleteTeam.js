let database=require("../Models/TeamDatabase");

let DeleteTeam=async(req,res)=>{
    try{
        let {id}=req.params
        if(!id){
            return res.status(400).json({message:"id is required"})
        }
        let deleteTeam=await database.findOneAndDelete({_id:id})
        if(!deleteTeam){
            return res.status(400).json({message:"Team is not deleted"})
        }
        console.log("user is deleted",deleteTeam)
        return res.status(200).json({message:"team is deleted"})
    }
    catch(error){
        console.log("internal error",error)
        return res.status(500).json({message:"internal error",error})
    }
}
module.exports=DeleteTeam