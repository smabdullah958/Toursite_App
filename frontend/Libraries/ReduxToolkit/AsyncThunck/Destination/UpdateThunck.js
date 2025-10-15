import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

let UpdateThunck=createAsyncThunk(
    "updatethunck",
    async({id,data},{rejectWithValue})=>{
        try{     
     let response=await axios.put(`${process.env.NEXT_PUBLIC_BackendURL}/Destination/update/${id}`,data,{
        headers:{"Content-Type":"multipart/form-data"},
        withCredentials:true
     })
     return response.data   
    
        }
        catch(error){
            return rejectWithValue(error.response?.data?.message ||"internal error")
        }
    }
)
export default UpdateThunck