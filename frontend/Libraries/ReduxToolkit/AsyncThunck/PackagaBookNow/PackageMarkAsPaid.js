import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

let PackageMarkAsPaid=createAsyncThunk(
    "Markthunck",
    async({id},{rejectWithValue})=>{
        try{     
     let response=await axios.put(`${process.env.NEXT_PUBLIC_BackendURL}/PackageBooking/Update/${id}`,        { PaymentStatus: "Paid" },
        {
        withCredentials:true
     })
     return response.data   
    
        }
        catch(error){
            return rejectWithValue(error.response?.data?.message ||"internal error")
        }
    }
)
export default PackageMarkAsPaid