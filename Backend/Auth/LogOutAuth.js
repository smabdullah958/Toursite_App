let LogOut=async(req,res)=>{
    try{
        res.clearCookie("token",{
            path:"/",
            httpOnly:true,
            sameSite: "Lax",  secure: false
        });
        
        console.log("Logout Successfully")
        res.status(200).json({message:"LogOut successfully"})
    }
    catch(error){
        console.log("internal error ")
        res.status(500).json({message:"internal error"})
    }
}
module.exports=LogOut