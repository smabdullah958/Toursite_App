import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

let GetPackageBookingByIDThunck=createAsyncThunk(
    "GetPackageByID",
    async(id,{rejectWithValue})=>{
        try{
            let response=await axios.get(`${process.env.NEXT_PUBLIC_BackendURL}/PackageBooking/getByID/${id}`)
            return response.data.UserDetail
        }
        catch(error){
              return rejectWithValue(error.response?.data?.message || "internal error");
        }
    }
)

export default GetPackageBookingByIDThunck