let database=require("../Models/PackagesDatabase")
let {validationResult}=require("express-validator")
let PostPackage=async(req,res)=>{
    try{
            //for validation through a express validator
    let error=validationResult(req);
    if(!error.isEmpty()){
        return res.status(401).json({message:"validation error bro",error:error.array()})
    }
    let {BasePrice,Title,Description,Slots,TravelTimes,Duration,Category}=req.body

    let result=new database({
        BasePrice,
        Title,
        Description,
        Slots,
        TravelTimes,
        Image:req.files ? req.files.map(file=>file.path):null,
        Duration,
        Category
    })
    if(result.Image.length<2){
        return res.status(401).json({message:"minimum 2 images are required"})
    }
    
    let display=await result.save()
    console.log("data is store ina database",display)
    return res.status(200).json({message:"Data is store ",display})
    }
    catch(error){
        console.log("internal error bro",error)
        res.status(500).json({message:"internal error",error})
    }
}
module.exports=PostPackage