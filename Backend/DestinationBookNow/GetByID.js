let DataBase=require("../Models/DestinationBookNow")

let GetByID=async(req,res)=>{
    try{
        let {id}=req.params

        let UserDetail=await DataBase.findOne({_id:id})
        .populate("UserID","Name Email")
        .populate("DestinationID","Title BookingOption")
        .select(" ContactNumber WhatsAppNumber PickUpAddress Days TravelTime TotalPrice PaymentMethod PaymentStatus Date NumberOfAdultChild NumberOfNoneAdultChild")
        
    console.log(UserDetail,"end")
    return res.status(200).json({message:"user detail",UserDetail})
    }
    catch(error){
        console.log("internal error",error)
        return res.status(500).json({message:"internal error",error})
    }
}

module.exports=GetByID