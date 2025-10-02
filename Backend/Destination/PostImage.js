let Database=require("../Models/DestinationDataBase")
let {validationResult}=require("express-validator")
let PostDestination=async(req,res)=>{
    try{
            //for validation through a express validator
    let error=validationResult(req);
    if(!error.isEmpty()){
        return res.status(401).json({message:"validation error bro",error:error.array()})
    }

   let {BasePrice,Title,Description,Slots,TravelTimes,Category,Duration,PricingModel,CarCapacity}=req.body
 

    let result=new Database({
        BasePrice,
        Title,
        Category,
        Description,
        Slots,
        TravelTimes,
        Image:req.file ? req.file.path:null ,
        Duration,
        //for a per person or a private booking
        PricingModel,
        //for a private bookinglike ina car it has a 4 seater 6 seater etc
          CarCapacity
    })
    let display=await result.save()
    console.log("data is store ina database",display)
    return res.status(200).json({message:"Data is store ",display})
    }
    catch(error){
        console.log("internal error bro",error)
        res.status(500).json({message:"internal error",error})
    }
}
module.exports=PostDestination