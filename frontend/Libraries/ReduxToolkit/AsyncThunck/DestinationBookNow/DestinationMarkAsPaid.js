import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

let DestinationMarkAsPaid=createAsyncThunk(
    "updatethunck",
    async({id},{rejectWithValue})=>{
        try{     
     let response=await axios.put(`${process.env.NEXT_PUBLIC_BackendURL}/DestinationBooking/UpdateBooking/${id}`,        { PaymentStatus: "Paid" },
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
export default DestinationMarkAsPaid