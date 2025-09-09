import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

let PostPackageThunck = createAsyncThunk(
    "PostPackageSlice",
    async (Data,{rejectWithValue})=>{
        try{

            let formData=new FormData()
            formData.append("Title",Data.Title);
            formData.append("BasePrice",Data.BasePrice);
            formData.append("Description",Data.Description);
            formData.append("Slots",Data.Slots);
            formData.append("Image",Data.Image1[0]);
            formData.append("Image",Data.Image2[0]);
            // if image 3 is present than append it 
            if(Data.Image3?.length>0){
                formData.append("Image",Data.Image3[0]);
            }
             // if image 4 is present than append it 
            if(Data.Image4?.length>0){
                formData.append("Image",Data.Image4[0]);
            }
             // if image 5 is present than append it 
            if(Data.Image5?.length>0){
                formData.append("Image",Data.Image5[0]);
            }
            let response=await axios.post(`${process.env.NEXT_PUBLIC_BackendURL}/Packages/postpackage`,formData,{
                headers:{
                    "Content-Type":"multipart/form-data"
                }
            });
            console.log("Post Package Response:", response.data);
            return response.data;
        }
        catch(error){
            console.log("Error in PostPackageSlice:", error);
            return rejectWithValue(error.response?.data?.message || "An error occurred" );
        }
    }
)

export default PostPackageThunck;