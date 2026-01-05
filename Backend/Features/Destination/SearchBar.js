let Database=require('../Models/DestinationDataBase');

let SearchBar=async(req,res)=>{
    try{
        let {SearchByAnyThing,SortByCategory}=req.query;
        console.log(SearchByAnyThing,SortByCategory)
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
        if(SortByCategory){
        if(SortByCategory==="0"){
            SortQuery.BasePrice=1
        }
        else if(SortByCategory==="a"){
            SortQuery.Title=1
        }
       else if(SortByCategory==="time"){
            SortQuery.createdAt=-1
        }
        else{
            SortQuery.createdAt=-1
        }
    }
        let SearchResult=await Database.find(SearchClient).sort(SortQuery)
        res.status(200).json(SearchResult)
    }
    catch(error){
        console.log(error)
        res.status(500).json({message:"Internal Server Error"})
    }
}
module.exports=SearchBar;