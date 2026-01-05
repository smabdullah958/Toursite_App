let DataBase=require("../../Models/PackagesDatabase")

let GetByID=async(req,res)=>{
    try{
        let {id}=req.params
        if(!id){
            return res.status(400).json({message:"id is required"})
        }
        let result=await DataBase.findOne({_id:id})
        if(!result){
            return res.status(400).json({message:"invalid id "})
        }
        console.log(result)
        return res.status(200).json({message:"package is found",result})
    }
    catch(error){
        console.log("internal error",error)
        return res.status(500).json({message:"internal error "})
    }
}

module.exports=GetByID