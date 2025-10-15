import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

let FindByIdThunck=createAsyncThunk(
    "user",
    async(result,{rejectWithValue})=>{
        try{
            let response=await axios.get(`${process.env.NEXT_PUBLIC_BackendURL}/Destination/GetById/${result}`)
            return response.data.result
        }
        catch(error){
              return rejectWithValue(error.response?.data || "internal error");

        }
    }
)
export default FindByIdThunck