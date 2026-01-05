let DataBase=require("../Models/PackagesDatabase");

let SearchBar=async(req,res)=>{
    try{
        let {SearchByAnyThing,SearchBySorting}=req.query
        console.log(SearchByAnyThing,SearchBySorting)
         let SearchClient={}
        if(SearchByAnyThing){
            // Only include BasePrice in the query if SearchByAnyThing is a valid number
            if (!isNaN(SearchByAnyThing) && SearchByAnyThing.trim() !== "") {
               SearchClient.BasePrice=Number(SearchByAnyThing);
            }
            else{
            SearchClient.$or=[
                {Title:{$regex:SearchByAnyThing,$options:"i"}},
                {Description:{$regex:SearchByAnyThing,$options:"i"}},
            ]
        }
        }
        
        let SortQuery={}
        if(SearchBySorting){
        if(SearchBySorting==="0"){
            SortQuery.BasePrice=1
        }
        else if(SearchBySorting==="a"){
            SortQuery.Title=1
        }
       else if(SearchBySorting==="time"){
            SortQuery.createdAt=-1
        }
        else{
            SortQuery.createdAt=-1
        }
    }
        let SearchResult=await DataBase.find(SearchClient).sort(SortQuery)
        res.status(200).json(SearchResult)

    }
    catch(error){
console.log("internal error",error)
return res.status(500).json({message:"internal error"})
    }
}
module.exports=SearchBar