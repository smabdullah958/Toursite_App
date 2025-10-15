import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

let UpdateTeam=createAsyncThunk(
    "updateteamthunck",
    async({id,data},{rejectWithValue})=>{
        try{     
     let response=await axios.put(`${process.env.NEXT_PUBLIC_BackendURL}/About/UpdateTeam/${id}`,data,{
        headers:{"Content-Type":"multipart/form-data"},
        withCredentials:true
     })
    
        }
        catch(error){
            return rejectWithValue(error.response?.data?.message ||"internal error")
        }
    }
)
export default UpdateTeam