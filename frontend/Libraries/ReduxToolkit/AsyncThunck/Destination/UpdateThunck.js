import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

let UpdateThunck=createAsyncThunk(
    "updatethunck",
    async({id,data},{rejectWithValue})=>{
        try{
    //           let formData=new FormData()
    //         formData.append("Title", data.get("Title"));
    //   formData.append("BasePrice", data.get("BasePrice"));
    //   formData.append("Description", data.get("Description"));
    //   formData.append("Slots", data.get("Slots"));

    //   // Check if a new image is provided; otherwise, use the existing image URL
    //   const image = data.get("Image");
    //   const existingImage = data.get("ExistingImage");
    //   if (image && image instanceof File) {
    //     formData.append("Image", image); //user upload new image
    //   } else if (existingImage) {
    //     formData.append("Image", existingImage); // keep old image
    //   }
              // formData.append("Title",data.Title);
            // formData.append("BasePrice",data.BasePrice);
            // formData.append("Description",data.Description);
            // formData.append("Slots",data.Slots);
            // formData.append("Image",data.Image[0]);
     
     let response=await axios.put(`${process.env.NEXT_PUBLIC_BackendURL}/Destination/update/${id}`,data,{
        headers:{"Content-Type":"multipart/form-data"},
        withCredentials:true
     })
     return response.data   
    
        }
        catch(error){
            console.log(error)
            return rejectWithValue(error.response?.data?.message ||"internal error")
        }
    }
)
export default UpdateThunck