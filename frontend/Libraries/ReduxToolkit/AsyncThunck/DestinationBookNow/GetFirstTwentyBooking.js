import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

let GetFistTwentyBooking=createAsyncThunk(
    "GetSlice",
    async({page,limit},{rejectWithValue})=>{
        try{
            let respone=await axios.get(`${process.env.NEXT_PUBLIC_BackendURL}/DestinationBooking/GetBooking?page=${page}&limit=${limit}`)

            return respone.data.GetBooking
        }
        catch(error){
            console.log("internal error",error)
            return rejectWithValue(error.response?.data?.message || "Internal error");
        }
    }
)

export default GetFistTwentyBooking