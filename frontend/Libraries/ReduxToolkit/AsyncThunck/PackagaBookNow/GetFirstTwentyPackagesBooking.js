import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

let GetFistTwentyPackagsBooking=createAsyncThunk(
    "GetPackagesThunck",
    async({page,limit},{rejectWithValue})=>{
        try{
            let respone=await axios.get(`${process.env.NEXT_PUBLIC_BackendURL}/PackageBooking/getPackagesBooking?page=${page}&limit=${limit}`)

            return respone.data.Booking
        }
        catch(error){
            console.log("internal error",error)
            return rejectWithValue(error.response?.data?.message || "Internal error");
        }
    }
)

export default GetFistTwentyPackagsBooking