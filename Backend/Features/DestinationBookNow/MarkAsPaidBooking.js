let Database=require("../Models/DestinationBookNow");

let MarkAsPaidBooking=async(req,res)=>{
    try{
        let {id}=req.params;
        let {PaymentStatus}=req.body;
        if(!PaymentStatus){
            return res.status(400).json({message:"Payment Method is required"})
        }
        let Update=await Database.findOneAndUpdate({_id:id},
                    {$set:{PaymentStatus:PaymentStatus}},
                        {new:true})
        if(!Update){
            return res.status(400).json({message:"User is not updated ",Update})
        }
        console.log("Booking is updated",Update)
        return res.status(200).json({message:"user is updated"})
    }
    catch(error){
        console.log("internal error",error)
        return res.status(500).json({message:"internal error",error})
    }
}

module.exports=MarkAsPaidBooking