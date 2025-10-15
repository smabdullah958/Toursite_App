import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

let GetFiveImage=createAsyncThunk(
    "name",
    async(_,{rejectWithValue})=>{
        try{
            let response=await axios.get(`${process.env.NEXT_PUBLIC_BackendURL}/Destination/Six`)
            return response.data.result
        }
        catch(error){
            return rejectWithValue(error.response?.data?.message||"internal error")
        }
    }
)
export default GetFiveImage