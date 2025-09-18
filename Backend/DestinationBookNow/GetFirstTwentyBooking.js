let DataBase=require("../Models/DestinationBookNow")

let GetBooking=async(req,res)=>{
    try{
        let page=parseInt(req.query.page)||1;
        let limit=parseInt(req.query.limit)||20;
        let skip=(page-1)*20;

        let GetBooking=await DataBase.find()
        .populate("UserID","Name Email")
        .populate("DestinationID","Title")
        .select("TotalPrice PaymentMethod PaymentStatus Date NumberOfAdultChild NumberOfNoneAdultChild")
        .sort({createdAt:-1}).skip(skip).limit(limit)
        
    console.log(GetBooking,GetBooking.length)
    return res.status(200).json({message:"all the booking are get",GetBooking,page,limit})
    }
    catch(error){
        console.log("internal error",error)
        return res.status(500).json({message:"internal error",error})
    }
}

module.exports=GetBooking