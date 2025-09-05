import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

let PostImageThunck=createAsyncThunk(
        "user",
async(Data)=>{
    try{
            let formData=new FormData()
            formData.append("Title",Data.Title);
            formData.append("BasePrice",Data.BasePrice);
            formData.append("Description",Data.Description);
            formData.append("Slots",Data.Slots);
            formData.append("Image",Data.Image[0]);

     let response=await axios.post(`${process.env.NEXT_PUBLIC_BackendURL}/Destination/Post`,formData,{
        headers:{"Content-Type":"multipart/form-data"},
        withCredentials:true
     })
     return response.data   
    }
    catch(error){
        console.log(error)
    }
}
)
export default PostImageThunck