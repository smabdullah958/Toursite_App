let Database=require("../Models/DestinationDataBase")
let {validationResult}=require("express-validator")
let PostDestination=async(req,res)=>{
    try{
            //for validation through a express validator
    let error=validationResult(req);
    if(!error.isEmpty()){
        return res.status(401).json({message:"validation error bro",error:error.array()})
    }

   let {Title,Description,TravelTimes,BookingOption}=req.body
 

    let result=new Database({
        Title,
        Description,
        TravelTimes,
        Image:req.file ? req.file.path:null ,
        //here inside it has a detail of a destination like slots, price duration etc
        BookingOption
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