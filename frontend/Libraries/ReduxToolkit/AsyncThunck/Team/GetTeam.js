import  { createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios";

let GetAboutThunck=createAsyncThunk(
    "GetTeamthunck",
    async(_,{rejectWithValue})=>{
        try{
            let response=await axios.get(`${process.env.NEXT_PUBLIC_BackendURL}/About/Get`);
            return response.data.result
        }
        catch(error){   
             console.log("internal error")
           return rejectWithValue(error.response?.data?.message || "Internal error");

        }
    }
)
export default GetAboutThunck