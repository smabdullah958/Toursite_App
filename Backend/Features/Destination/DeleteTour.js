let DataBase=require("../Models/DestinationDataBase");

let DeleteTour=async(req,res)=>{
    try{
        let {id}=req.params
        if(!id){
            return res.status(400).json({message:"id is invalid"})
        }
        let Delete=await DataBase.findOneAndDelete({_id:id})
        if(!Delete){
            return res.status(400).json({message:"tour is not deleted"})
        }
        res.status(200).json({message:"Tour is deleted successfully"})
       }
       catch(error){
        console.log("internal error",error)
        res.status(500).json({message:"internal error",error})
       }
}
module.exports=DeleteTour