import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

let PackageBookNowFormThunck=createAsyncThunk(
    "booknowthunck",
    async({Data,PackageID},{rejectWithValue})=>{
        try{
            let response=await axios.post(`${process.env.NEXT_PUBLIC_BackendURL}/PackageBooking/Booking/${PackageID}`,Data,{
                withCredentials:true
            });
            console.log(response.data)
            return response.data
        }
        catch(error){
            return rejectWithValue(error.response.data?.message||"internal errror")
        }
    }
)

export default PackageBookNowFormThunck