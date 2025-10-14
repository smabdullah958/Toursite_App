import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

let BookNowFormThunck=createAsyncThunk(
    "booknowthunck",
    async({Data,DestinationID},{rejectWithValue})=>{
        try{
            let response=await axios.post(`${process.env.NEXT_PUBLIC_BackendURL}/DestinationBooking/Booking/${DestinationID}`,Data,{
                withCredentials:true
            });
            return response.data
        }
        catch(error){
            return rejectWithValue(error.response.data?.message)
        }
    }
)

export default BookNowFormThunck