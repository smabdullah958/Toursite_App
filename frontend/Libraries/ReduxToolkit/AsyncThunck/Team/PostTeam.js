import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

let PostAboutThunck=createAsyncThunk(
        "postDestination",
async(Data)=>{
    try{
            let formData=new FormData()
            formData.append("Title",Data.Title);
            formData.append("Name",Data.Name);
            formData.append("Description",Data.Description);
            formData.append("Slots",Data.Slots);
            formData.append("Img",Data.Img[0]);
            formData.append("Facebook",Data.Facebook);
            formData.append("Linkedin",Data.Linkedin);
            formData.append("Email",Data.Email);
            
     let response=await axios.post(`${process.env.NEXT_PUBLIC_BackendURL}/About/Post`,formData,{
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
export default PostAboutThunck