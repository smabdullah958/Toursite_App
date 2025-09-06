import  { createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios";

let GetFirstTwentyImage=createAsyncThunk(
    "getdestination",
    async({page,limit},{rejectWithValue})=>{
        try{
            let response=await axios.get(`${process.env.NEXT_PUBLIC_BackendURL}/Destination/twenty?page=${page}&limit=${limit}`);
           console.log(response.data.result)
            return response.data.result
        }
        catch(error){   
             console.log("internal error")
           return rejectWithValue(error.response?.data?.message || "Internal error");

        }
    }
)
export default GetFirstTwentyImage