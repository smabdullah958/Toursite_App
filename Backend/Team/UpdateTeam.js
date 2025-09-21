let Database=require("../Models/TeamDatabase")
let {validationResult}=require("express-validator")
let UpdateTeam=async(req,res)=>{
    try{
        let {id}=req.params
        if(!id){
            return res.status(401).json({message:"id is required bro"})
        }
       //for validation through a express validator
    let error=validationResult(req);
    if(!error.isEmpty()){
        return res.status(401).json({message:"validation error bro",error:error.array()})
    }

    const updates = {}; // Collect updates

  // Update text fields
  if (req.body.Title) updates.Title = req.body.Title;
  if (req.body.Name) updates.Name = req.body.Name;
  if (req.body.Description) updates.Description = req.body.Description;
  if(req.body.Facebook) updates.Facebook=req.body.Facebook
  if(req.body.Linkedin) updates.Linkedin=req.body.Linkedin
  if(req.body.Email) updates.Email=req.body.Email

  // Only update image if a new file is uploaded
  if (req.file) {
    updates.Img = req.file.path; // Set the new image URL
  }
  else if (req.body.ExistingImage) {
      updates.Image = req.body.ExistingImage; // keep old image
    }
  // Update the document
  const updatedTeam = await Database.findByIdAndUpdate(id, updates, { new: true });

if(!updatedTeam){
    return res.status(404).json({message:"Data is not update"})
}
    console.log("data is store ina database",updatedTeam)
    return res.status(200).json({message:"Data is update SuccessFully",result:updatedTeam})    
    }
    catch(error){
        console.log("internal error bro",error) 
        res.status(500).json({message:"internal error",error})
    }
}
module.exports=UpdateTeam