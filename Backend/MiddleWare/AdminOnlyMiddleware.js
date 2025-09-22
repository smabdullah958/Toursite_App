let AdminOnly=(req,res,next)=>{
    
        if(req.user?.Role!=="Admin"){
                return res.status(403).json({ message: "Only admin can acces" });
        }
        next()
    }

    module.exports=AdminOnly