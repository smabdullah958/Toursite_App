let Database=require("../Models/PackagesDatabase");

let DeletePackage=async(req,res)=>{
    try{
        let {id}=req.params
        if(!id){
            return res.status(400).json({message:"id is required"})
        }
        let result=await Database.findOneAndDelete({_id:id})
        if(!result){
            return res.status(400).json({message:"id is invalid"})
        }
        console.log("package is remove",result)
        return res.status(200).json({message:"package is deleted successfully"})
    }
    catch(error){
        console.log("internal error ",error)
        return res.status(500).json({message:"internal error",error})
    }
}

module.exports=DeletePackage