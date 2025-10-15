import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

let GetSixPackagesThunck=createAsyncThunk(
"getSix",
    async(_,{rejectWithValue})=>{
    try{
        let response=await axios.get(`${process.env.NEXT_PUBLIC_BackendURL}/Packages/getsix`)
        return response.data.result
    }
    catch(error){
        return rejectWithValue(error.response?.data?.message || "An error occurred" );
    }
})
export default GetSixPackagesThunck